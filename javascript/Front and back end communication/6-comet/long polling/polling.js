var http = require('http'),
    fs = require('fs');
 
http.createServer(function(req, res) {
    checkFile(req, res);
}).listen(8124);

console.log( 'server start at port 8124 ')
 
var filepath = 'E:/Git/FrontEndCode/javascript/Front and back end communication/6-comet/long polling/a.txt';
 
function checkFile(req, res) {
    var reqUrl = req.url;
    var callbackFnName = null;
 
    if (/callback=([^&]+)/.test(reqUrl)) {
        callbackFnName = RegExp['$1'];
    }
    console.log(req.socket._idleStart)
    var date = new Date();
 
    if (date - req.socket._idleStart.getTime() > 60 * 1000) {
        res.writeHead(200, {
            'Content-Type' : 'text/plain',
            'Access-Control-Allow-Origin' : '*'
        });
 
        res.write(callbackFnName + "('ok')", 'utf8');
        res.end();
    }    
 
    fs.stat(filepath, function(err, stats) {
        if (err) {
            res.writeHead(200, {
                'Content-Type' : 'text/plain',
                'Access-Control-Allow-Origin' : '*'
            });
 
            res.write(callbackFnName + "('Error')", 'utf8');
            res.end();
 
            return false;
        }
 
        //文件是在请求过来之后发生更改的
        if (stats.mtime.getTime() > req.socket._idleStart.getTime()) {
            fs.readFile(filepath, 'utf8', function(err, data) {
                res.writeHead(200, {
                    'Content-Type' : 'text/plain',
                    'Access-Control-Allow-Origin' : '*'
                });
 
                res.write(callbackFnName + "('" + data + "')", 'utf8');
                res.end();
 
                return false;
            });
        }
    });
    
    setTimeout(function() {
        checkFile(req, res);        
    }, 10 * 1000);
}
 
/**
 * 时间对象的格式化;
 */
Date.prototype.format = function (format) {
    /*
     * eg:format="YYYY-MM-dd hh:mm:ss";
     */
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
 
    if (/(Y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
 
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}
 
setInterval(function() {
    fs.writeFileSync(filepath, '当前时间：' + new Date().format('YYYY-MM-dd hh:mm:ss'), 'utf8');    
}, 1000 * 1);