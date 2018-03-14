'use strict';

const violet = require('violet').script();
const github = require('./github');

violet.addInputTypes({
  "org": {
    "type": "AMAZON.LITERAL",
    "sampleValues": ["salesforce", "force dot com"]
  },
  "repo": {
    "type": "AMAZON.LITERAL",
    "sampleValues": ["dr cla", "violet conversations", "docker fileimage update"]
  }
});

violet.respondTo({
    expecting: 'How many repos does the [[org]] org have?',
    resolve: async function (response) {
        const num = await github.numPublicRepos(response.get('org'));
        response.say(`The [[org]] org has ${num} public repos`);
    }
});

violet.respondTo({
    expecting: 'Alexa, how many stars does the [[repo]] project have?',
    resolve: async function (response) {
        const num = await github.numStarsForProject(response.get('repo'));
        if (num === -1) {
            response.say(`[[repo]] not found on github, please try again`);
        } else {
            response.say(`[[repo]] has ${num} stars`);
        }
    }
});
