function doshare(type,title,link,image) {
	title = encodeURIComponent(title);
	link = encodeURIComponent(link);
	image = encodeURIComponent(image);
	if (type == "163") {
		window.open("http://t.163.com/article/user/checkLogin.do?info="+title+" "+link+"&togImg=true&images="+image);
	}
	if (type == "sina") {
		window.open("http://v.t.sina.com.cn/share/share.php?url="+link+"&title="+title+"&content=utf8&pic="+image);
	}
	if (type == "qt") {
		window.open("http://v.t.qq.com/share/share.php?url="+link+"&title="+title+"&pic="+image);
	}

	if (type == "qqz") {
		window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+link+"&title="+title+"&pics="+image);
	}
	
	if (type == "wx") {
		window.open('https://chart.googleapis.com/chart?cht=qr&chs=192x192&choe=UTF-8&chld=L|0&chl='+link);
	}

	if (type == "sohu") {
		window.open("http://t.sohu.com/third/post.jsp?content=utf-8&url="+link+"&title="+title+"&pic="+image);
	}

	if (type == "kaixin") {
		window.open("http://www.kaixin001.com/rest/records.php?starid=&aid=&style=11&content="+title+"&url="+link+"&pic="+image);
	}
	
	if (type == "renren") {
		window.open("http://widget.renren.com/dialog/share?resourceUrl="+link+"&pic="+image+"&title="+title+"&description="+title);
	}

	if (type == "douban") {
		window.open("http://www.douban.com/recommend/?url="+link+"&title="+title);
	}
	return false;
}

// ****************************用法*********************************

<html>
    <body>
        ...
        <div class="share">
            <a href="javascript:;" onClick="share('163')"></a>
            <a href="javascript:;" onClick="share('sina')"></a>
            <a href="javascript:;" onClick="share('qt')"></a>
        </div>
    </body>
</html>


var function share(type){
        var title='',       //分享标题
            _link='',       //分享链接
            _img='',        //分享缩略图
            type=type || "";    
        if(!!doshare && typeof(doshare)=="function"){
            var a=doshare(type,title,_link,_img);
        }
    }
});

