'use strict';

const github = require('octonode').client(process.env.GITHUB_ACCESSTOKEN);
const path = require('path');
const defaultOrg = 'salesforce';

function numPublicRepos(org) {
    return github.org(org).infoAsync().then(info => info[0].public_repos);
}

function tryGetRepo(repo) {
    return github.repo(path.join(defaultOrg, repo));
}

async function repoExists(ghrepo) {
    var result = false;

    ghrepo.infoAsync().then(function(err, data, headers) {
        if (err === null || err === 'undefined') {
            result = true;
        }
    }).catch(function(err) {
        //result = false;
    });

    return await result;
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

async function numStarsForProject(repo) {
    var repoWithDashes = repo.replaceAll(" ", "-");
    var repoWithUnderscores = repo.replaceAll(" ", "_");
    var repoWithNoSpaces = repo.replaceAll(" ", "");

    console.info(`Trying ${repoWithDashes}`);
    var ghrepo = tryGetRepo(repoWithDashes);
    //console.info(repoExists(ghrepo));

    if (await repoExists(ghrepo) === false) {
        // TODO: We are screwed we have dashes and underscores mixed
        console.info(`Trying ${repoWithUnderscores}`);
        ghrepo = tryGetRepo(repoWithUnderscores);
    }

    if (await repoExists(ghrepo) === false) {
        console.info(`Trying ${repoWithNoSpaces}`);
        ghrepo = tryGetRepo(repoWithNoSpaces);
    }

    return ghrepo.stargazersAsync().then(function(stars) {
        return stars[0].length;
    }).catch(function(err) {
        console.error(`Error (${err}) on "${repo}".stargazersAsync`);

        return -1;
    });
}

module.exports = {numPublicRepos, numStarsForProject};
