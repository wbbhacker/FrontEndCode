#!/usr/bin/env node
var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(8080, function() {
    console.log(' Server is listening on port 8080');
});

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

wsServer.on('request', function(request) {

    var connection = request.accept('echo-protocol', request.origin);

    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            if(message.utf8Data == 'date'){
                setInterval(function(){
                    connection.sendUTF('服务器：'+new Date());
                },1000)
            }

            if(message.utf8Data == 'year'){
                connection.sendUTF('服务器：'+new Date().getFullYear());
            }
        }
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });

});