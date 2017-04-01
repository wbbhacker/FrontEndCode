// 解决横竖屏反转时候，页面不能复原问题;  
// <meta name="viewport" content="width=640,user-scalable=no"/>   主要是这句代码在微信里面兼容不好

var elem = document.createElement('meta');
var h = window.screen.width/640;
elem.name = 'viewport';
elem.content = 'width=device-width,user-scalable=no,initial-scale='+h;
document.getElementsByTagName('head')[0].appendChild(elem);


