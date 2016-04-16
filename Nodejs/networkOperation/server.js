var http = require("http");
var url = require("url");

function start(route,handle){

	function onRequest(request,response){

		var postDate = "";

		var pathname = url.parse(request.url).pathname;

			console.log("Request for "+ pathname +" received.");


		request.setEncoding("utf8");
		request.addListener("data",function(postDataChunk){
			postDate += postDataChunk;
			console.log("Received POST data chunk"+postDataChunk+".");
		});
		request.addListener("end",function(){
			route(handle,pathname,response,postDate);
		})

		// response.writeHead(200,{"Content-Type":"text/plain"});
		// var content = route(handle,pathname,response);
		// console.log(content)
		// response.write(content); 
		// response.end();
		
	}

	http.createServer(onRequest).listen(8888);
	console.log("Server has started");
	
}
exports.start = start;