import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { click, find, settled, visit, waitFor, waitUntil } from '@ember/test-helpers';

module('Acceptance | application | app', function (hooks) {
  setupApplicationTest(hooks);

  test('I can fill form', async function (assert) {
    await visit('/');
    await settled();

    const h2 = find('h2') as HTMLElement; // get first h2 element
    assert.deepEqual(h2.textContent, 'Welcome to DevCon 2024 Ember.js Test Demo');

    assert.dom('[data-test-modal-btn]').exists(); // assert open modal button exists

    const hasUserName = await waitUntil(() => {
        const div = find('.user-info') as HTMLDivElement;
        return div?.textContent?.includes('Welcome John');
      }, { timeout: 3000 });
  
    assert.strictEqual(hasUserName, true); // assert welcome user name exists

    await waitFor('.date', { timeout: 3000 });
    assert.dom('[data-test-date]').containsText(new Date() as unknown as string); // assert date exists

    await click('[data-test-modal-btn]');
    assert.dom('[data-test-modal]').exists(); // assert modal opens
    assert.dom('[data-test-close-btn]').exists(); // assert close button exists
    assert.dom('[data-test-save-btn]').exists(); // assert save button exists

    await click('[data-test-close-btn]');
    assert.dom('[data-test-modal]').doesNotExist(); // assert modal is closed
  });
});
