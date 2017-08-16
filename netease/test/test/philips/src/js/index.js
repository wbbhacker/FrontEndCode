$(function(){
	// loading

	var imgArr = ['img/arrow.png','img/bg.jpg','img/btn.jpg','img/icon2.png','img/icon1.png','img/pic1.png','img/pic2.png','img/pic3.png','img/pic4.png','img/pic5.png'];
	netease.loading(imgArr);

	// main swiper
	var swiperMain = new Swiper('.swiper-main', {
		scrollbar: '.swiper-scrollbar',
        direction: 'vertical',     
        slidesPerView: 'auto',
        freeMode: true
	});

	// swiper1
	var swiper1 = new Swiper('.swiper1',{
		onSlideChangeStart:function(swiper){
			$('.swiper1-b span').text(swiper.activeIndex+1)
		}
	});

	// swiper2
	var swiper2 = new Swiper('.swiper2',{
		onSlideChangeStart:function(swiper){
			$('.swiper2-b span').text(swiper.activeIndex+1)
		}
	});
	handle(swiper1,$('.swiper1-l'),$('.swiper1-r'));
	handle(swiper2,$('.swiper2-l'),$('.swiper2-r'));


	function handle(swiper,left,right,text){
		left.on('click',function(){
			swiper.slidePrev();
		});
		right.on('click',function(){
			swiper.slideNext();
		});
	}

	// 阻止
	document.addEventListener('touchmove',function(e){
		e.preventDefault();
	});

});