/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

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
    const repoWithDashes = repo.replaceAll(" ", "-");

    console.info(`Trying ${repoWithDashes}`);
    const ghrepo = tryGetRepo(repoWithDashes);

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
