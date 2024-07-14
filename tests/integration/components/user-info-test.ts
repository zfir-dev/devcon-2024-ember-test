import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, settled, waitFor, waitUntil } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | user-info', function (hooks) {
  setupRenderingTest(hooks);

  // Fails
  // test('it fails without await settled to show user info', async function (assert) {
  //   await render(hbs`<UserInfo />`);

  //   window.parent.postMessage({ name: 'error-message', message: 'unknown user !' });

  //   const div = find('.user-info') as HTMLDivElement;
  //   assert.deepEqual(div.textContent?.trim(), 'Error: unknown user !');
  // });

  // Passes
  test('it passes with await settled to show user info', async function (assert) {
    await render(hbs`<UserInfo />`);

    window.parent.postMessage({ name: 'error-message', message: 'unknown user !' });
    await settled();

    const div = find('.user-info') as HTMLDivElement;
    assert.deepEqual(div.textContent?.trim(), 'Error: unknown user !');
  });

  // Fails
  // test('it fails without waitUntil to show updated text', async function (assert) {
  //   await render(hbs`<UserInfo />`);

  //   const div = document.querySelector('.user-info') as HTMLDivElement;
  //   assert.true(div.textContent?.includes('Welcome John'));
  // });

  // Passes
  test('it passes with waitUntil to show updated text', async function (assert) {
    await render(hbs`<UserInfo />`);

    const found = await waitUntil(() => {
      const div = find('.user-info') as HTMLDivElement;
      return div?.textContent?.includes('Welcome John');
    }, { timeout: 3000 });

    assert.strictEqual(found, true);
  });

  // Fails
  // test('it fails without waitFor to show date', async function (assert) {
  //   await render(hbs`<UserInfo />`);

  //   const div = find('.date') as HTMLDivElement;
  //   assert.true(div.textContent?.includes(new Date() as unknown as string));
  // });

  // Passes
  test('it passes with waitFor to show date', async function (assert) {
    await render(hbs`<UserInfo />`);

    await waitFor('.date', { timeout: 3000 });
    const div = find('.date') as HTMLDivElement;

    assert.true(div.textContent?.includes(new Date() as unknown as string));
  });
});
