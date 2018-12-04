var fs=require('fs');

fs.readFile('web-1/demo.html',function(err,file){
    console.log(err);
    console.log(file);
})