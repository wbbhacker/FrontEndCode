$(function(){

	// main swiper

	var swiperMain = new Swiper('.swiper-main', {
		autoplay:5000,
		fadeScrollbars:true
	});
	$('.arrow-l').click(function(){
		swiperMain.slidePrev();
	});
	$('.arrow-r').click(function(){
		swiperMain.slideNext();
	});


    var swiperPic = new Swiper('.article-pic', {
        autoplay:5000,
        fadeScrollbars:true
    });


    $('.pic-l').click(function(){
        swiperPic.slidePrev();
    });
    $('.pic-r').click(function(){
        swiperPic.slideNext();
    });


    $('.article-1').click(function(){
          console.log('this')
         $('.popup').show();
         $('.popup .content img').eq(0).hide();
         $('.popup .content img').eq(1).show();

    });

    $('.article-2').click(function(){
        console.log('this')
         $('.popup').show();
         $('.popup .content img').eq(0).show();
         $('.popup .content img').eq(1).hide();
    });

    $('.close').click(function(){
        $('.popup').hide();
    });

	// 表单提交
    getSheng('province');

    $('#province').on('change', function() {
        getShi('city', $(this).get(0).value);

    });
    $('#city').on('change', function() {
        getShop('dealer', $(this).get(0).value);
    });

    var flag10 = true;

    $('.submit').click(function() {
        if (!flag10) return;
        var data = getData();
        if (data) {
            flag10 = false;
            $.ajax({
                url: "http://s.auto.163.com/api/2017/0822/escort/common.php?act=subMessage",
                type: 'POST',
                data: data,
                dataType: 'json',
                success: function(res) {
                	flag10 = true;
                	if(typeof res == 'string'){
                		res = JSON.parse(res);
                	}
                	if(res.retCode == -1){
                		alert(res.retData.error);
                	}else if(res.retCode == 1){
                		alert(res.retInfo)
                	}else{
                		alert(res.retInfo)
                	}
                }
            });
        }

    });


	// 获取数据
    function getData() {
        var Data = {
            name: $('#name').val(),
            phone: $('#phone').val(),
            province: $('#province').get(0).value
        };
        Data.city  = Data.province != '' ? $('#city').get(0).value : '';
        Data.dealer = Data.city != '' ? $('#dealer').get(0).value : '';
        Data.source = 'pc';
        Data.buycartime = $('#buytime').get(0).value;
        return Data;
    }

    handle();
    $(window).resize(handle);


    function handle(){
        var w = document.body.offsetWidth;
        var h1 = w*4039/1920;
        $('.mian').css({
            'background-size':w+'px'+' '+h1+'px',
            'height':h1+'px'
        });
        $('.scale').css({
            'transform':'scale('+w/1920+')'
        });
    }

	// 阻止
	document.addEventListener('touchmove',function(e){
		e.preventDefault();
	});

});