const http = require('http');

var server = http.createServer(function(request, response) {
  if (request.method === 'GET') {
    if (request.url === '/') {
      response.setHeader('Content-Type', 'text/html');
      return response.end(fs.readFileSync(__dirname + '/client/index.html'));
    }
    if (request.url.match(/.js$|.html$|.css$|.woff|.woff2|.tff$/)) {
      return response.end(fs.readFileSync(__dirname + "/client/assets/" + request.url));
    }
  }
}).listen(3000)
