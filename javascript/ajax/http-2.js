var PORT = 4000;
var webRootFile = 'web-2';

var http = require('http');
var url=require('url');
var fs=require('fs');
var path=require('path');
var querystring=require('querystring')
var data = {'name':'wbb','sex':'man'};


var server = http.createServer(function (request, response) {
    var params = url.parse(request.url);


    var qs = querystring.parse(params.query);


    // var json = JSON.stringify(data);
    var str =  qs.callback+'('+JSON.stringify(data)+')';


    console.log(str)

    response.writeHead(500,{'Content-Type':'application/json'});


    // response.write(str)

    response.end(str);
    // var pathname = params.pathname;

    // console.log("url解析之后",url.parse(request.url))
    // console.log(url.parse(request.url).query.callback)
    // var realPath = path.join(webRootFile, pathname);

    // console.log(realPath);

    // var ext = path.extname(realPath);
    // ext = ext ? ext.slice(1) : 'unknown';1
    // console.log(params.query.callback)
    // if( params.query && params.query.callback ){

    // }

    // fs.exists(realPath, function (exists) {
    //     if (!exists) {
    //         response.writeHead(404, {
    //             'Content-Type': 'text/plain'
    //         });

    //         response.write("This request URL " + pathname + " was not found on this server.");
    //         response.end();
    //     } else {
    //         fs.readFile(realPath, "binary", function (err, file) {
    //             if (err) {
    //                 response.writeHead(500, {
    //                     'Content-Type': 'text/plain'
    //                 });
    //                 response.end(err);
    //             } else {
    //                 var contentType = mine[ext] || "text/plain";
    //                 response.writeHead(200, {
    //                     'Content-Type': contentType
    //                 });
    //                 response.write(file, "binary");
    //                 response.end();
    //             }
    //         });
    //     }
    // });

});
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");