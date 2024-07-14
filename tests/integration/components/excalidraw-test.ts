// tests/integration/components/input-modal-test.ts
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, find, render, settled, triggerKeyEvent, waitFor, waitUntil } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | excalidraw', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders iframe with excalidraw', async function (assert) {
    await render(hbs`<Excalidraw />`);
    await settled();
    assert.dom('iframe').exists();
    assert.dom('iframe').hasAttribute('src', 'https://excalidraw.com');

  });

  test('it renders an iframe and selects rectangle tool', async function (assert) {
    await render(hbs`<Excalidraw />`);

    const iframe = find('iframe') as HTMLIFrameElement;

    await new Promise((resolve) => {
      iframe.onload = resolve;
    });

    const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
    const label = iframeDocument?.querySelector('label[title="Rectangle — R or 2"]');
    
    console.log('iframe', label, iframeDocument);
    
    await click(label as Element);


  });
});
