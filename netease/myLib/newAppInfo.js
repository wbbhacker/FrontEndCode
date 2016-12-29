
/************************************获取网易新闻客户端用户信息************************************************/ 

//  必须放在全局环境下，在网易新闻客户端会自动执行__newsapp_userinfo_done和__newsapp_login_done 函数
var userData = {};
function __newsapp_userinfo_done(info){  
	if(info && info.name){
        userData.head_portrait = info.head;
        userData.nickname = info.nickname;
        userData.newemail = info.name;    
      
    }else{
        window.location.href="login://";
    }
}
function __newsapp_login_done(info){  //登录完成后

    if(info && info.name){
      	userData.head_portrait = info.head;
        userData.nickname = info.nickname;
        userData.newemail = info.name;

    }
    else{
        window.location.href="login://";
    }
}
window.addEventListener("load",function(){
	if(navigator.userAgent.indexOf("NewsApp")>=0){
	    window.location="userinfo://";
	}
},false);

/************************************跳转网易新闻app************************************************/ 

// url 参数为要在网易新闻app打开的url

window.location.href = 'http://m.163.com/newsapp/applinks.html?url=http://go.163.com/2017/0101/ksf2017cny/index.html';
