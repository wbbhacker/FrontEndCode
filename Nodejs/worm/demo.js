var requestAndwrite = function(url, callback) {
    request.get(url).end(function(err, res) {
        if (err) {
            console.log(err);
            console.log("有一张图片请求失败啦...");
        } else {
            var fileName = path.basename(url);
            fs.writeFile("./img/" + fileName, res.body, function(err) {
                if (err) {
                    console.log(err);
                    console.log("有一张图片写入失败啦...");
                } else {
                    console.log("图片下载成功啦");
                    callback(null, "successful !");
                    /*callback貌似必须调用，第二个参数将传给下一个回调函数的result，result是一个数组*/
                }
            });
        }
    });
}
var downloadImg = function(asyncNum) {
    /*有一些图片链接地址不完整没有“http:”头部,帮它们拼接完整*/
    for (var i = ; i < photos.length; i++) {
        if (photos[i].indexOf("http") === -) {
            photos[i] = "http:" + photos[i];
        }
    }
    console.log("即将异步并发下载图片，当前并发数为:" + asyncNum);
    async.mapLimit(photos, asyncNum, function(photo, callback) {
        console.log("已有" + asyncNum + "张图片进入下载队列");
        requestAndwrite(photo, callback);
    }, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            // console.log(result);<=会输出一个有万多个“successful”字符串的数组
            console.log("全部已下载完毕！");
        }
    });
};
