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
