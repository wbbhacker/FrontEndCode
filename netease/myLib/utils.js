(function(){

	var root = this;
	var utils = {};
	root.utils =  utils;

	// 判断设备类型

	utils.parseUA = function() {
	    var u = navigator.userAgent;
	    var u2 = navigator.userAgent.toLowerCase();
	    return { //移动终端浏览器版本信息
	        trident: u.indexOf('Trident') > -1, //IE内核
	        presto: u.indexOf('Presto') > -1, //opera内核
	        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
	        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
	        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
	        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
	        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
	        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
	        iPad: u.indexOf('iPad') > -1, //是否iPad
	        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
	        iosv: u.substr(u.indexOf('iPhone OS') + 9, 3),
	        weixin: u2.match(/MicroMessenger/i) == "micromessenger",  // 微信
	        ali: u.indexOf('AliApp') > -1,
	        NewsApp:u.indexOf('NewsApp') > -1,   //网易新闻客户端
	        weibo:u.indexOf('weibo') > -1,        // 微博
	    };
	}
	
	// 拼接字符串
	utils.sprintf = function (str) {
	    var args = arguments,
	        flag = true,
	        i = 1;

	    str = str.replace(/%s/g, function () {
	        var arg = args[i++];

	        if (typeof arg === 'undefined') {
	            flag = false;
	            return '';
	        }
	        return arg;
	    });
	    return flag ? str : '';
	};

	// 函数去抖
	utils.debounce = function(func, wait, immediate) {
        var timeout;
        return function() {

            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;

            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            
            if (callNow) func.apply(context, args);
        };
    };

    // 函数节流
    utils.throttle = function(delay, action){
	    var last = 0;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
	    return function(){
	        var curr = +new Date();
	        if (curr - last > delay){
	            action.apply(this, arguments)
	            last = curr 
	        }
	    }
	}

	utils.getQueryString = function(url,name){
		var reg = new RegExp('(^|&|\\?)'+ name +'=([^&]*)(&|$)');
	    var arr = url.match(reg);
	    return arr === null ? null : arr[2];
	}



	utils.parseUrlToObj = function(url){


		var arr = url.split('?');

		// var reg = new RegExp('(^|&|\\?)=([^&])(&|$)');

		var reg = new RegExp('([^&=]+)=([\w\W]*?)(&|$)','g');

		var arr2 = reg.exec(arr[1]);

		var arr3 = reg.exec(url)

		var arr1 = arr[1].match(reg);

		console.log(arr2)

		console.log(arr1)

		console.log(arr3)

		return null;

	}
	// 字符串去空
	utils.trim = function(str){
		return str.replace(/\s/g,'');
	}

	// 判断是否原生数组
	utils.isArray = function(value){
		return Object.prototype.toString.call(value) == '[object Array]';
	}

	// 打乱数组顺序

	utils.shuffle = function(arr){
		return arr.sort(function(){return 0.5 - Math.random()})
	}


	



}.call(this))