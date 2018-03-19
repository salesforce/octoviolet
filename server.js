/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

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
        "sampleValues": ["dr cla", "violet conversations", "docker file image update"]
    }
});

violet.respondTo({
    expecting: [
        'How many repos does the [[org]] org have?',
        'How many repos are in the [[org]] org?'
    ],
    resolve: async function (response) {
        const num = await github.numPublicRepos(response.get('org'));
        response.say(`The [[org]] org has ${num} public repos`);
    }
});

violet.respondTo({
    expecting: [
        'How many stars does the [[repo]] project have?',
        'How many stars does the [[repo]] repo have?'
    ],
    resolve: async function (response) {

        const num = await github.numStarsForProject(response.get('repo'));
        if (num === -1) {
            response.say(`[[repo]] not found on github, please try again`);
        } else {
            response.say(`[[repo]] has ${num} stars`);
        }
    }
});
