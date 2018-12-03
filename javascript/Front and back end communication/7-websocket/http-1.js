var PORT = 3000;
var webRootFile = 'web-1';

var http = require('http');
var url=require('url');
var fs=require('fs');
var mine=require('./mine').types;
var path=require('path');

var server = http.createServer(function (request, response) {

    var pathname = url.parse(request.url).pathname;

    var realPath = path.join(webRootFile, pathname);
    var ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';1
    fs.exists(realPath, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            response.write('This request URL ' + pathname + ' was not found on this server.');
            response.end();
        } else {
            console.log('路径:'+ webRootFile+'/demo.html');
            fs.readFile(webRootFile+'/demo.html',function (err, file) {
                if (err) {
                    console.log('错误');
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    console.log(err);
                    response.end(JSON.stringify(err));

                } else {
                    var contentType = mine[ext] || 'text/plain';
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.write(file, 'binary');
                    response.end();
                }
            });
        }
    });

});
server.listen(PORT);
console.log('Server runing at port: ' + PORT + '.');