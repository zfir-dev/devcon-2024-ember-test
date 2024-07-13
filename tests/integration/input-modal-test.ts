// tests/integration/components/input-modal-test.ts
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | input-modal', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders input fields and a save button', async function(assert) {
    await render(hbs`<InputModal @closeModal={{action (mut this.isModalOpen) false}} />`);
    assert.dom('input[type="text"]:nth-of-type(1)').exists();
    assert.dom('input[type="text"]:nth-of-type(2)').exists();
    assert.dom('input[type="email"]').exists();
    assert.dom('button:nth-of-type(1)').hasText('X');
    assert.dom('button:nth-of-type(2)').hasText('Save');
  });
});