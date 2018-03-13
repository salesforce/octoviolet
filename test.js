const assert = require('assert');
const github = require('./github');

describe('github', () => {
  describe('numPublicRepos', () => {
    it('work with the salesforce org', async function() {
      const num = await github.numPublicRepos('salesforce');
      assert(num > 70);
    });
  });
});
