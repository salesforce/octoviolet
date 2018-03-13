'use strict';

const violet = require('violet').script();
const github = require('./github');

violet.respondTo({
  expecting: 'How many repos does the [[org]] org have?',
  resolve: async function(response) {
    const num = await github.numPublicRepos(response.get('org'));
    response.say(`The [[org]] org has ${num} public repos`);
  }
});

// Alexa, how many stars does the "foo" project have?
