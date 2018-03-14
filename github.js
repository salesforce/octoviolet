'use strict';

const github = require('octonode').client(process.env.GITHUB_ACCESSTOKEN);
const path = require('path');
const defaultOrg = 'salesforce';

function numPublicRepos(org) {
    const canonicalName = org.replaceAll(" ", "");
    return github.org(canonicalName).infoAsync().then(info => info[0].public_repos);
}

function tryGetRepo(repo) {
    return github.repo(path.join(defaultOrg, repo));
}

String.prototype.replaceAll = function(search, replacement) {
    return this.split(search).join(replacement);
};

function numStarsForProject(repo) {
    var repoWithDashes = repo.replaceAll(" ", "-");

    console.info(`Trying ${repoWithDashes}`);
    var ghrepo = tryGetRepo(repoWithDashes);

    return ghrepo.infoAsync().then( (info) => {
        return info[0].stargazers_count;
    }).catch( (err) => {
        // Try against, but with no spaces
        if (repo.indexOf(' ') !== -1) {
            return numStarsForProject(repo.replaceAll(" ", ""));
        }
        console.error(`Error (${err}) on "${repo}".stargazersAsync`);
        return -1;
    });
}

module.exports = {numPublicRepos, numStarsForProject};
