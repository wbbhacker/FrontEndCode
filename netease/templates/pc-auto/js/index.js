$(function(){

	// main swiper
	

	handle();
    $(window).resize(handle);
    

    function handle(){
        // 11108 psd高度 1680psd 宽度
        var w = document.body.offsetWidth;
        var h1 = w*11108/1680;
        $('.mian').css({
            'background-size':w+'px'+' '+h1+'px',
            'height':h1+'px'
        });
        $('.scale').css({
            'transform':'scale('+w/1680+')'
        });
    }


});