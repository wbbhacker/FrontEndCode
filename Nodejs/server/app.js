// 静态服务器搭建

// 浏览器发送URL，服务器解析URL，对应到硬盘上的文件。如果文件存在，返回200状态码，并发送文件到浏览器端；如果文件不存在，返回404状态码，发送一个404的文件到浏览器端。


var PORT = 8000;
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

var server = http.createServer(function(request,response){

	var pathname = url.parse(request.url).pathname;

	var realPath = "assets" + pathname;


	fs.exists(realPath, function(exists){
		if( !exists ){
			response.writeHead(404,{'Content-Type':'text/plain'});
			response.write("this request URL" + pathname + "was not found on this server.");
			response.end()
		}else{
			fs.readFile(realPath, "binary", function(err, file){
				if(err){
					response.write(500,{'Content-Type':'text/plain'});

					response.end(err);
				}else{
					response.writeHead(200,{'Content-Type':'text/html'});

					response.write(file,"binary");
					response.end();
				}

			})
		}
	})
	

})

server.listen(PORT);

console.log("Server runing at port: " + PORT + ".")