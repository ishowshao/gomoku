var http = require('http');
var url = require('url');

var Matrix = require('./Matrix');
var Schema = require('./Schema');
var Ai = require('./Ai');
var m = new Matrix(15);
console.time('build');
var schemas = Schema.build();
console.timeEnd('build');

var games = {};

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    var query = url.parse(request.url, true).query;
    if (query.session) {
        console.log(query);
        var session = query.session;
        if (!session in games) {
            games[session] = new Ai();
        }
        var ai = games[session];
        ai.setColor(color);
        ai.getResponse(opponent);
    }
    response.end(request.url);
}).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');