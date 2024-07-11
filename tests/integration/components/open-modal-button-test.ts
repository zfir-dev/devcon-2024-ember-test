// tests/integration/components/open-modal-button-test.ts
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | open-modal-button', function(hooks) {
  setupRenderingTest(hooks);

  test('it opens the modal on click', async function(assert) {
    await render(hbs`<OpenModalButton />`);
    assert.dom('.input-modal').doesNotExist();

    await click('button');
    assert.dom('.input-modal').exists();
  });

  test('it closes the modal when close button is clicked', async function(assert) {
    await render(hbs`<OpenModalButton />`);
    await click('button');
    assert.dom('.input-modal').exists();

    await click('.close-button');
    assert.dom('.input-modal').doesNotExist();
  });

  test('it closes the modal when save button is clicked', async function(assert) {
    await render(hbs`<OpenModalButton />`);
    await click('button');
    assert.dom('.input-modal').exists();

    await click('button[type="submit"]');
    assert.dom('.input-modal').doesNotExist();
  });
});
