$(function(){
	//禁止页面触屏
	//document.addEventListener('touchmove', function (e) {   e.preventDefault(); }, false);
	//document.body.style.mozUserSelect = document.body.style.webkitUserSelect = 'none';
	document.body.style.mozUserDrag = document.body.style.webkitUserDrag = 'none';
	//初始化容器
	var w_init=$(window).width();
	var h_init=$(window).height();
	$(".swiper-container").css({"width":w_init,"height":h_init});
	$(".swiper-slide").css({"width":w_init,"height":h_init});
	$(".reel").css({"height":h_init});
		var mySwiper = new Swiper(".swiper-container",{
			mode: 'horizontal',
			onSlideNext:function(){
				//alert($(".swiper-slide").length)
				if(mySwiper.activeIndex==($(".swiper-slide").length-1)){
					$.ajax({
					dataType:"json",
					url:"js/ex.js",
					success:function(data){
	                    var strings="<div class='reel'><div class='left'>";
	                    for(i in data){
	                       if(i<10){
	                        // alert(data[i].src)
	                       	 s="<div class='com_con'><img src='"+data[i].src+"'><div class='bg'></div>"+
					         	"<p class='p'>"+data[i].title+"</p></div>";
					        strings=strings+s;
	                       }	
	                    }
	                    strings=strings+"</div></div><div class='reel' style='left:50%;top:0'>"
					         +"<div class='right'>"
					    for(i in data){
					    	if(i>=10){
					    		ss="<div class='com_con'><img src='"+data[i].src+"'><div class='bg'></div>"+
					         	"<p class='p'>"+data[i].title+"</p></div>";
					         	strings=strings+ss;
					    	}
					    }
					    strings=strings+"</div></div>";
					    var newSlide = mySwiper.createSlide(""+strings+"");
                        newSlide.append();
                        mySwiper.reInit();
                        //alert("插入最后"); 
					}
				})  
				}
                  
			},
		})
})