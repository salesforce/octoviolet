'use strict';

const github = require('octonode').client(process.env.GITHUB_ACCESSTOKEN);

function numPublicRepos(org) {
  return github.org(org).infoAsync().then(info => info[0].public_repos);
}

module.exports = {numPublicRepos};
