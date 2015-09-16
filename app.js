var http = require('http');
var url = require('url');

var Ai = require('./Ai');
var games = {};

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    var query = url.parse(request.url, true).query;
    if (query.session) {
        //console.log(query);
        var session = query.session;
        console.log(session);
        if (!(session in games)) {
            console.log('new ai');
            games[session] = new Ai();
        }
        var ai = games[session];
        var move = ai.getMyMove(query.move === 'start' ? 'start' : [Number(query.move.split('-')[0]), Number(query.move.split('-')[1])]);
        response.end('go(' + JSON.stringify(move) + ');');
    } else {
        response.end('');
    }
}).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');