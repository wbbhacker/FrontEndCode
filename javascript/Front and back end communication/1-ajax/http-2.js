var PORT = 4000;
var webRootFile = 'web-2';
var http = require('http');
var url=require('url');
var fs=require('fs');
var path=require('path');
var querystring=require('querystring');


var data = {'name':'wbb','sex':'man'};


var server = http.createServer(function (request, response) {

    var params = url.parse(request.url);
    var qs = querystring.parse(params.query);
    var json = JSON.stringify(data);


    // cors 解决ajax跨域问题

 
    // response.writeHead(200,{"Content-Type":'application/json','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});//可以解决跨域的请求
    // response.write(json)
    // response.end();



    

    // jsonp 解决跨域问题
    var str =  qs.callback+'('+JSON.stringify(data)+')';

    console.log(str)
    
    response.writeHead(200,{'Content-Type':'application/javascript'});

    response.write(str)

    response.end();



});
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");