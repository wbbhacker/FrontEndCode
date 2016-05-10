var http = require('http');
var options = {
	host:'127.0.0.1',
	port:'8000',
	path:'/wang'
};
var request = http.request(options,function(res){

	res.setEncoding('utf8')
	res.on('data',function(chunk){
		console.log(chunk)
	})

})
request.write('');
request.end();