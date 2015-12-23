var http = require('http');
var tinder = require('tinderjs');
var client = new tinder.TinderClient();
var sentiment = require('sentiment');
var _ = require('underscore');
var horoscope = require('horoscope');
var fs = require('fs');
var login = require('./login');

var server = http.createServer(function(request, response) {
  if (request.method === 'GET') {
    if (request.url === '/') {
      response.setHeader('Content-Type', 'text/html');
      return response.end(fs.readFileSync(__dirname + '/../client/index.html'));
    }
    if (request.url.match(/.js$|.html$|.css$|.woff|.woff2|.tff$/)) {
      return response.end(fs.readFileSync(__dirname + "/../client/assets/" + request.url));
    }

  }
  if (request.method === 'POST' && request.url === '/login'){
    return login.login(response, request);
  }
}).listen(3000)
