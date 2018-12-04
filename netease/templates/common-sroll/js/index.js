$(function(){

	// main swiper
	var swiperMain = new Swiper('.swiper-main', {
		// direction : 'vertical',
	});


	// 阻止
	document.addEventListener('touchmove',function(e){
		e.preventDefault();
	},{ passive: false });

});