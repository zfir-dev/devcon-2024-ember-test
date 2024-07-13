// tests/integration/components/input-modal-test.ts
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, findAll, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | open-modal-button', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the open modal button', async function (assert) {
    await render(hbs`<OpenModalButton />`);
    assert.dom('button').hasText('Open Modal');
  });

  test('it opens the modal when the button is clicked', async function (assert) {
    await render(hbs`<OpenModalButton />`);
    assert.dom('input[type="text"]:nth-of-type(1)').doesNotExist();
    assert.strictEqual(
      findAll('button').filter((btn) => btn.textContent?.trim() === 'Save')
        .length,
      0,
      'Save button does not exist before clicking',
    );
    await click('button');
    assert.dom('input[type="text"]:nth-of-type(1)').exists();
    assert.strictEqual(
      findAll('button').filter((btn) => btn.textContent?.trim() === 'Save')
        .length,
      1,
      'Save button exists after clicking',
    );
  });
});
