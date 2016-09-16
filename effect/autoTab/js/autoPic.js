(function($){
	/*
	* poconf{
	* 	@param {number}	  	nowIdx,				//当前播放的下标；
	* 	@param {int}     	msec,			  	//多少毫秒播放一次；
	* 	@param {boolean}  	autoPlay,			//是否自动播放；
	* 	@param {Dom}	  	wrap				//轮播外层Dom；
	* 	@param {Fn(SUM_IMG)}  	layoutBK, 		//布局回调函数, SUM_IMG为图片的总数；
	* 	@param {Fn(nowIdx)} runBK           	//点击事件回调函数，nowIdx为当前图片下标
	*  }
	*  Author:binbinWang;
	*/ 
	var autoPic = function( poconf ){

		var autoPic = this;

		var conf = o = poconf || {};

			this.conf = conf = {
				nowIdx: 	o.nowIdx || 0,
				msec: 		o.msec || 3e3,
				autoPlay: 	o.autoPlay || false,
				wrap: 		o.wrap || $("#autoPic"),
				layoutBK: 	o.layoutBK,
				runBK: 		o.runBK,
				WIDTH:  	function(){ 
								return (this.wrap || $("#autoPic")).width(); 
							}.call(conf),
				SUM_IMG:    o.wrap || $("#autoPic").find("img").length
			};

			o = {
				init:function(){
					this.layout();
					this.isPlay();
				},	
				layout:function(){
					var h = conf.wrap.height();
					$(conf.wrap).find('img').wrapAll('<div class="stage" />')
						.css({"width":conf.WIDTH,"height":h,"float":"left"})
							.parent().css({"width":conf.WIDTH*conf.SUM_IMG,"height":h,"-webkit-transition":"all 1s"});
					if( conf.layoutBK )
						conf.layoutBK( conf.SUM_IMG );
				},
				isPlay:function(){
					var self = this;
					if( conf.autoPlay ){
						var time = void 0;
						time = setInterval(function(){
							autoPic.control("-");
							autoPic.run();
						},conf.msec);
						conf.wrap.on('mouseenter',function(){
							clearInterval(time);
						})
						conf.wrap.on('mouseleave',function(){
							time = setInterval(function(){
								autoPic.control("-");
								autoPic.run();
							},conf.msec);
						})
					}
				}
			}
			o.init();

	}

	autoPic.prototype = {
		goto:function( pinum){
			conf.nowIdx = pinum;
			this.run();
		},
		run:function(){
			var self = this,
				conf = this.conf;
			conf.wrap.find(".stage").css("margin-left",-conf.nowIdx*conf.WIDTH);
			if( conf.runBK )
				conf.runBK();
		},
		control:function( psconf ){
					var conf = this.conf;
					var nowIdx = conf.nowIdx,
						SUM_IMG = conf.SUM_IMG;

					switch( psconf ){
						case "+":
							if( nowIdx >= SUM_IMG-1 ){
								conf.nowIdx = 0;
							}else{
								conf.nowIdx++;
							}
							break;
						case "-":
							if( nowIdx <= 0 ){
								conf.nowIdx = SUM_IMG-1;
							}else{
								conf.nowIdx--;
							}
							break;

					}
		}
	}

	window.autoPic = autoPic;

}(jQuery || Zepto))