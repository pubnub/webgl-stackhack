var express = require('express');

var pubnub = require('pubnub').init({
  subscribe_key: 'sub-c-4b585794-ced1-11e2-9fea-02ee2ddab7fe',
  publish_key: 'pub-c-6907155e-52de-48cc-9e33-3eb5b82573f3'
});

var objects = {},
    objectCache = [];

// Simple hash function to ensure we only have unique blocks
function computeHash(x, y, z) {
  var p1 = 73856093,
      p2 = 19349663,
      p3 = 83492791,
      n = 5000;

  return ((x * p1) ^ (y * p2) ^ (z * p3)) % n;
}

// Caches the objects so we can easily return them
function cacheObjects() {
  objectCache = [];
  for(var n in objects) {
    objectCache.push(objects[n]);
  }
}

pubnub.subscribe({
  channel: 'stackhack',
  callback: function (message) {
    if (message.action == "add") {
      var position = message.position;
      var hash = computeHash(position.x, position.y, position.z).toString();
      objects[hash] = position;
      cacheObjects();
    } else if (message.action == "remove") {
      var position = message.position;
      var hash = computeHash(position.x, position.y, position.z).toString();
      delete objects[hash];
      cacheObjects();
    }
  }
});

// server.get-stacks
// { uuid: '12345' }
pubnub.subscribe({
  channel: 'get-stacks',
  callback: function (message) {
    pubnub.publish({
      channel: message.uuid,
      message: objectCache
    });
  }
});

// Basic web server
var app = express();

app.get('/*', function (req, res) {
  res.send("Hello World!");
});

app.listen(process.env.PORT || 8080);
console.log("Server listening on port:", process.env.PORT || 8080);