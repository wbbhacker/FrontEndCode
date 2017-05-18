function netease_loadimg(imgs,callback){
    if(!imgs){return false};
    var img=[];
    var len=imgs.length;
    var loadedCount = 0;
    for(var i=0;i<len;i++){
        img[i]=new Image();
        img[i].src=imgs[i];
        img[i].onload = function(){
            loadedCount++;
            $('.netease-loader .load_data').html(Math.floor(loadedCount/len*100)+"%").attr('title',Math.floor(loadedCount/len*100));
            if (loadedCount>=len){
                $('.netease-loader').fadeOut(600,function(){
                    $(this).remove();
                });
                callback ? callback() : null;
            }
        };
    }
}
var loadImgsArr=[
        //将需要loading的图片放到此数组
    ];
netease_loadimg(loadImgsArr,function(){
    //loading结束后的回调函数
});