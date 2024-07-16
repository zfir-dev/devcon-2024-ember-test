import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, settled, waitFor, waitUntil } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

module('Integration | Component | user-info', function (hooks) {
  setupRenderingTest(hooks);

  let clock: sinon.SinonFakeTimers;
  let date: Date;

  hooks.beforeEach(function () {
    date = new Date('1999-01-01T00:00:00Z');
    clock = sinon.useFakeTimers(date.getTime());
  });

  hooks.afterEach(function () {
    clock.restore();
  });

  // Fails
  test('it fails without await settled to show user info', async function (assert) {
    await render(hbs`<UserInfo />`);

    window.parent.postMessage({ name: 'error-message', message: 'unknown user !' });

    const div = find('.user-info') as HTMLDivElement;
    assert.deepEqual(div.textContent?.trim(), 'Error: unknown user !');
  });

  // Passes
  test('it passes with await settled to show user info', async function (assert) {
    await render(hbs`<UserInfo />`);

    window.parent.postMessage({ name: 'error-message', message: 'unknown user !' });
    await settled();

    const div = find('.user-info') as HTMLDivElement;
    assert.deepEqual(div.textContent?.trim(), 'Error: unknown user !');
  });

  test('it passes with waitUntil to show updated text', async function (assert) {
    await render(hbs`<UserInfo />`);
    clock.tick(2000);

    const found = await waitUntil(() => {
      const div = find('.user-info') as HTMLDivElement;
      return div?.textContent?.includes('Welcome John');
    }, { timeout: 3000 });

    assert.strictEqual(found, true);
  });
  
  test('it passes with waitFor to show date', async function (assert) {
    await render(hbs`<UserInfo />`);
    clock.tick(2000);

    await waitFor('.date', { timeout: 3000 });
    const div = find('.date') as HTMLDivElement;

    assert.true(div.textContent?.includes("Fri Jan 01 1999 04:00:02 GMT+0400 (Mauritius Standard Time)"));
  });
});
