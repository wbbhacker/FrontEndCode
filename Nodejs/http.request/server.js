var http = require('http');
var path = require('path');
var qs = require('querystring');
var fs = require('fs');
var url = require('url');


var server = http.createServer(function(req,res){

	var pathname = url.parse(req.url).pathname;
	
	res.end('kaishi')
	
}).listen(8000)
// server.listen(8000)

console.log('Server running')