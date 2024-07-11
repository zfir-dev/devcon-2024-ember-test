// tests/integration/components/input-modal-test.ts
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | input-modal', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders input fields and a save button', async function(assert) {
    await render(hbs`<InputModal @closeModal={{action (mut this.isModalOpen) false}} />`);
    assert.dom('input[type="text"]:nth-of-type(1)').exists();
    assert.dom('input[type="text"]:nth-of-type(2)').exists();
    assert.dom('input[type="email"]').exists();
    assert.dom('button').hasText('Save');
  });

  test('it updates input values and saves data', async function(assert) {
    await render(hbs`<InputModal @closeModal={{action (mut this.isModalOpen) false}} />`);
    
    await fillIn('input[type="text"]:nth-of-type(1)', 'John');
    await fillIn('input[type="text"]:nth-of-type(2)', 'Doe');
    await fillIn('input[type="email"]', 'john.doe@example.com');

    assert.dom('input[type="text"]:nth-of-type(1)').hasValue('John');
    assert.dom('input[type="text"]:nth-of-type(2)').hasValue('Doe');
    assert.dom('input[type="email"]').hasValue('john.doe@example.com');

    // Mock the alert function
    window.alert = () => {};

    await click('button');
    assert.dom('.input-modal').doesNotExist();
  });
});
