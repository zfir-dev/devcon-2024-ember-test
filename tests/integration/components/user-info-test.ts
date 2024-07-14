import { module, test } from 'qunit';
import { setupRenderingTest } from 'devcon-2024-ember-test/tests/helpers';
import { find, render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | user-info', function (hooks) {
  setupRenderingTest(hooks);

  test('it fails without await settled', async function (assert) {
    await render(hbs`<UserInfo />`);

    window.parent.postMessage({ name: 'error-message', message: 'unknown user !' });

    const div = find('.user-info') as HTMLDivElement;
    assert.deepEqual(div.textContent?.trim(), 'Error: unknown user !');
  });

  test('it passes with await settled', async function (assert) {
    await render(hbs`<UserInfo />`);

    window.parent.postMessage({ name: 'error-message', message: 'unknown user !' });
    await settled();

    const div = find('.user-info') as HTMLDivElement;
    assert.deepEqual(div.textContent?.trim(), 'Error: unknown user !');
  });
});
