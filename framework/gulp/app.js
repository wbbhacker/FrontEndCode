var express = require('express');

var app = module.exports.app = exports.app = express();

app.use(require('connect-livereload')());
app.listen(3000,function(){
	console.log('server start');
})
app.get('',function(req,res){
	
	res.end()
})
