'use strict';

const violet = require('violet').script();

// Alexa, how many Pull Requests did the Salesforce GitHub org get last month?
violet.respondTo({
  expecting: "Whats next on my todo",
  resolve: function(response) {
    response.say("hello, world");
  }
});

// Alexa, how many stars does the "foo" project have?
