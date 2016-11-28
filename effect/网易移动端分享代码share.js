/**
 * Created by kFC on 2016/1/8.
 */
var isYiXin = window.navigator.userAgent.search(/YiXin/)>=0;
var isNewsApp = window.navigator.userAgent.search(/NewsApp/)>=0;
var isCloudMusic = window.location.search.search(/from=cloudmusic/)>=0;
var isWeiXin = window.navigator.userAgent.search(/MicroMessenger/)>=0;
var isRead = window.navigator.userAgent.toUpperCase().search(/PRIS/)>=0;
function NeteaseShareInit(){
    NeteaseShareUpdate();
    if(isWeiXin)NeteasesShareInit_weixin();
}
function NeteaseShareUpdate(){
    NeteasesShareInit_yixin();
    NeteasesShareInit_yuedu();
    NeteasesShareInit_music();
    NeteasesShareInit_news();
    NeteasesShareInit_sina();

}
function NeteaseShare(popupCallBack,noSina){
    NeteaseShareUpdate();
    if(isYiXin){
        if(popupCallBack)popupCallBack();
    }else if(isNewsApp){
        window.location='share://';
    }else if(isCloudMusic){
        window.open(window.shareData.music);
    }else if(isWeiXin){
        if(popupCallBack)popupCallBack();
    }else if(isRead){
        window.open(window.shareData.yuedu);
    }else{
        if(noSina){
            if(popupCallBack)popupCallBack();
        }else{
            window.open(window.shareData.sina);
        }
    }
}
//易信
function NeteasesShareInit_yixin(){
    //分享图片
    window.shareData.imgUrl=window.shareData.MsgImg;//图片链接
    window.shareData.tImgUrl=window.shareData.MsgImg;//分享到朋友圈的图片
    window.shareData.fImgUrl=window.shareData.MsgImg;//分享给好友的图片
    window.shareData.wImgUrl=window.shareData.MsgImg;//分享到微博的图片
    //分享链接
    window.shareData.timeLineLink=window.shareData.link;//分享到微博的图片
    window.shareData.sendFriendLink=window.shareData.link;//分享给好友的链接
    window.shareData.weiboLink=window.shareData.link;//分享到微博的连接
    //分享标题
    window.shareData.tTitle=window.shareData.fText;//分享到朋友圈的标题
    window.shareData.fTitle=window.shareData.title;//分享给好友的标题
    //分享内容
    window.shareData.tContent=window.shareData.fText;//分享到朋友圈的描述
    window.shareData.fContent=window.shareData.desc;//分享给好友的描述
    window.shareData.wContent=window.shareData.desc;//分享到微博的内容
}
//云阅读
function NeteasesShareInit_yuedu(){
    // data.data必须随便传一个值,否则安卓无法回调
    window.shareData.yuedu ="web:getclientsharemodule;data="+encodeURIComponent("{\"activityId\":\"" + (window.shareData.activityId||'') + "\",\"moduleType\":\"['_share_weixin','_share_weixinquan','_share_yixin','_share_yixinquan','_share_tsina','_share_qzone']\",\"site\":\"网易云阅读官方网站\","+"\"url\":\"" + window.shareData.link + "\",\"title\":\"" + window.shareData.title + "\",\"pics\":\"" + window.shareData.MsgImg + "\","+"\"summary\":\"" + window.shareData.desc + "\",\"shareType\":\"1\",\"data\":{\"activityId\":\"" + (window.shareData.activityId||'') + "\"}}");
    if(window.active)window.active.shareCompleted = window.shareData.callback;
}
//云音乐
function NeteasesShareInit_music(){
    window.shareData.music='orpheus://share/';
    window.shareData.music += encodeURIComponent(window.shareData.title)+'/';
    window.shareData.music += encodeURIComponent(window.shareData.MsgImg)+'/';
    window.shareData.music += encodeURIComponent(window.shareData.link)+'/';
    window.shareData.music += encodeURIComponent(window.shareData.title)+'/';
    window.shareData.music += encodeURIComponent(window.shareData.desc);
}
//新闻客户端
function NeteasesShareInit_news(){
    if(document.getElementById('__newsapp_sharetext')){
        document.getElementById('__newsapp_sharetext').innerHTML=window.shareData.desc+window.shareData.link;
        document.getElementById('__newsapp_sharephotourl').innerHTML=window.shareData.MsgImg;
        document.getElementById('__newsapp_sharewxtitle').innerHTML=window.shareData.title;
        document.getElementById('__newsapp_sharewxtext').innerHTML=window.shareData.desc;
        document.getElementById('__newsapp_sharewxurl').innerHTML=window.shareData.link;
        document.getElementById('__newsapp_sharewxthumburl').innerHTML=window.shareData.MsgImg;
    }else{
        var div = document.createElement('div');
        div.style.display='none';
        var __newsapp_sharetext= document.createElement('code');
        __newsapp_sharetext.innerHTML= window.shareData.desc+window.shareData.link;
        __newsapp_sharetext.id= '__newsapp_sharetext';
        div.appendChild(__newsapp_sharetext);
        var __newsapp_sharephotourl= document.createElement('code');
        __newsapp_sharephotourl.innerHTML= window.shareData.MsgImg;
        __newsapp_sharephotourl.id= '__newsapp_sharephotourl';
        div.appendChild(__newsapp_sharephotourl);
        var __newsapp_sharewxtitle= document.createElement('code');
        __newsapp_sharewxtitle.innerHTML= window.shareData.title;
        __newsapp_sharewxtitle.id= '__newsapp_sharewxtitle';
        div.appendChild(__newsapp_sharewxtitle);
        var __newsapp_sharewxtext= document.createElement('code');
        __newsapp_sharewxtext.innerHTML= window.shareData.desc;
        __newsapp_sharewxtext.id= '__newsapp_sharewxtext';
        div.appendChild(__newsapp_sharewxtext);
        var __newsapp_sharewxurl= document.createElement('code');
        __newsapp_sharewxurl.innerHTML= window.shareData.link;
        __newsapp_sharewxurl.id= '__newsapp_sharewxurl';
        div.appendChild(__newsapp_sharewxurl);
        var __newsapp_sharewxthumburl= document.createElement('code');
        __newsapp_sharewxthumburl.innerHTML= window.shareData.MsgImg;
        __newsapp_sharewxthumburl.id= '__newsapp_sharewxthumburl';
        div.appendChild(__newsapp_sharewxthumburl);
        document.body.appendChild(div);
    }
    window.__newsapp_share_done = window.shareData.callback;
}
//微信
function NeteasesShareInit_weixin(){
    var onBridgeReady=function(){
        WeixinJSBridge.call('showOptionMenu');
        WeixinJSBridge.call('hideToolbar');
        // 发送给好友;
        WeixinJSBridge.on('menu:share:appmessage', function(argv){
            WeixinJSBridge.invoke('sendAppMessage',{
                "appid":window.shareData.appId,
                "img_url":window.shareData.MsgImg,
                "img_width":"120",
                "img_height":"120",
                "link":window.shareData.link,
                "desc":window.shareData.desc,
                "title":window.shareData.title
            }, window.shareData.callback);
        });
        // 分享到朋友圈;
        WeixinJSBridge.on('menu:share:timeline', function(argv){
            (shareData.callback)();
            WeixinJSBridge.invoke('shareTimeline',{
                "img_url":window.shareData.MsgImg,
                "img_width":"120",
                "img_height":"120",
                "link":window.shareData.link,
                "desc":window.shareData.fText,
                "title":window.shareData.fText
            },window.shareData.callback);
        });
    };
    if(document.addEventListener){
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    }else if(document.attachEvent){
        document.attachEvent('WeixinJSBridgeReady'   , onBridgeReady);
        document.attachEvent('onWeixinJSBridgeReady' , onBridgeReady);
    }
}
//新浪
function NeteasesShareInit_sina(){
    window.shareData.sina="http://v.t.sina.com.cn/share/share.php?url="+encodeURIComponent(window.shareData.link)+"&title="+encodeURIComponent(window.shareData.fText)+"&content=utf8&pic="+encodeURIComponent(window.shareData.MsgImg);
}