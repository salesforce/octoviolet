const assert = require('assert');
const github = require('./github');

describe('github', () => {
    describe('numPublicRepos', () => {
        it('work with the salesforce org', async function() {
            const num = await github.numPublicRepos('salesforce');
            assert(num > 70, "Salesforce org has less than 70 repos...where'd they all go? Found " + num);
        });
        it('work with the forcedotcom org', async function() {
            const num = await github.numPublicRepos('forcedotcom');
            assert(num < 160, "Forcedotcom org has less than 160 repos. Found " + num);
        });
        it('work with the forcedotcom org when it has spaces', async function() {
            const num = await github.numPublicRepos('force dot com');
            assert(num < 160, "Forcedotcom org has less than 160 repos. Found " + num);
        });
    });
});

describe('github', () => {
    describe('numStarsForProject', () => {
        it('find stars for dockerfile image update', async function() {
            const num = await github.numStarsForProject('dockerfile-image-update');
            assert(num >= 10, "dockerfile-image-update should have at least 10 stars. We found " + num);
        });
        it('find stars for dockerfile image update spaces', async function() {
            const num = await github.numStarsForProject('dockerfile image update');
            assert(num >= 10, "dockerfile image update should have at least 10 stars. We found " + num);
        });
        it('find stars for mavenparent', async function() {
            const num = await github.numStarsForProject('mavenparent');
            assert(num >= 2, "maven parent should have at least 2 stars. We found " + num);
        });
        it('find stars for maven parent', async function() {
            const num = await github.numStarsForProject('maven parent');
            assert(num >= 2, "maven parent should have at least 2 stars. We found " + num);
        });
        it('find stars for salesforce_flo', async function() {
            const num = await github.numStarsForProject('salesforce flo');
            assert(num >= 0, "salesforce_flo should have at least 0 stars. We found " + num);
        });
        it('find stars for does not exist', async function() {
            const num = await github.numStarsForProject('does-not-exist');
            assert(num === -1, "Expected doesn't exist error code -1. We get " + num);
        });
        it('find stars for does not exist', async function() {
            const num = await github.numStarsForProject('does not exist');
            assert(num === -1, "Expected doesn't exist error code -1. We get " + num);
        });
      it('find stars for cove', async function() {
        const num = await github.numStarsForProject('cove');
        assert(num > 235, "Expected the cove repo to have over 235 stars. We get " + num);
      });
    });
});
