var exec = require("child_process").exec;

function start(){
	console.log("Request handler 'start' was called.");
	var content = "empty";
	// function sleep(millSeconds){
	// 	var startTime = new Date().getTime();
	// 	while ( new Date().getTime() < startTime + millSeconds );
	// }
	// sleep(10000)
	exec("ls -lah",function(error,stdout,stderr){
		content = stdout;
	})
	return content;
}

function upload(arguments){
	console.log("Request handler 'upload' was called.");
	return "Hello Upload";
}

exports.start = start;
exports.upload = upload;