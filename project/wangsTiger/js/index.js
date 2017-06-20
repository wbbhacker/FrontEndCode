(function($){


	// 提示用户锁定为竖屏
	var orient= "onorientationchange" in window ? "orientationchange" : "resize";
	window.addEventListener(orient, adaptation, false);

	adaptation();

	var screenH = document.body.clientHeight;  
		// 居中显示
		if( screenH <  1136 ){
			var v = (1136 - screenH)/2;
			var str = 'translateY(-'+v+'px)';
			document.getElementById('stage').style['webkitTransform'] = str;
		}
	var gameFlag1 = false;
	var gameFlag2 = false;
	function adaptation(){
		var $popuptips = $('.popup-tips');
	    if(window.orientation==180||window.orientation==0){ 
	    	// $('.tips').hide();
	    	$('.tips').tap(function(){
	    		// gameBegin = true;
				$(this).hide();
				$('.page3').addClass('swipeRight');
				$('.popup-game').show();
			});
	    } 
		if(window.orientation==90||window.orientation==-90){ 
			if( gameFlag1 && gameFlag2 ){
				
				$('.tips').show();
				$('.tips').off('tap');
			}   
	    }
	}



	// game begin

	var game = function(){

		this.car = {
			name:['极地银','瀚海蓝','丹霞红','古堡灰','峡谷棕','沙漠金','熔岩黑','雪山白','盐湖白'],
			list:['img/page2-car1.png','img/page2-car2.png','img/page2-car3.png','img/page2-car4.png','img/page2-car5.png','img/page2-car6.png','img/page2-car7.png','img/page2-car8.png','img/page2-car9.png'],
			selected:['img/game-car1.png','img/game-car2.png','img/game-car3.png','img/game-car4.png','img/game-car5.png','img/game-car6.png','img/game-car7.png','img/game-car8.png','img/game-car9.png']
		};

		this.curCar = 0;
		this.music = 0;
		this.gameMusic = 0;

	}

	game.prototype = {
		construction:game,
		init:function(){
			
			var self = this;

			this.chooseWhichCar(self.curCar);
			this.eventBind();
			this.gameGo = false;   //调试
  			this.gameInit();

			this.chooseMusic(0);  //调试

		},
		eventBind:function(){
			var self = this;

			var $page1 = $('.page1'),
				$page2 = $('.page2'),
				$page3 = $('.page3')

			// page 页面切换
				// $page1.hide();   //调试
				// $page2.hide();   //调试
				// $page3.hide();   //调试

			// page1 -> page2
			$page1.swipeUp(function(){
				$page1.addClass('swipeUp');
				$page2.show();
				gameFlag1 = true;
			});
			$('.page1-btn').tap(function(){
				$page1.addClass('swipeUp');
				$page2.show();
				gameFlag1 = true;	
			});

			// page2 -> page3

			$('.page2-btn').tap(function(){
				$page2.addClass('scale');
				$page3.show();
				self.gameInit.Initialization();
				gameFlag2 = true;
			});


			//page3 -> game
			$('.page3-btn').tap(function(){
				// $page3.addClass('swipeRight');
				// $('.popup-game').show();
				// if(!gameBegin){

				// }
				$('.tips').show();

				// self.chooseMusic(3);	
			});

			// next
			$('.next-step').tap(function(){
				$('.popup-game').hide();
				$('.popup-game-acc').show();
			});

			// 完成
			$('.next-step-1').tap(function(){
				$('.popup-game-acc').hide();
				$('.pupup-go').show();
			})

			// ready go
			$('.go-sao').on('webkitAnimationEnd',function(){
				$('.pupup-go').hide();
				self.gameGo = true;
				// self.chooseMusic(self.gameMusic);
			});

			// 选择车型
			$('.page2 li').each(function(idx,item){
				$(this).click(function(){
					self.chooseWhichCar(idx);
					self.curCar = idx;
				});
			});

			// 选择音乐	
			$('.page3 li').each(function(idx,item){
				$(this).click(function(){

					var imgUrl = ['img/page3-solid-circle.png','img/page3-hollow-circle.png'];

					self.chooseMusic(idx+1);
					self.gameMusic = idx+1;
					$('.page3 li').each(function(num,item){
						var n = num == idx ? 1 : 0;
						$(this).find('img').attr('src',imgUrl[n]);
					});
				});
			});

			

			// GAME OVER 弹层
			$('.popup-close').tap(function(){
				$('.popup-game-over').hide();
			});


			//  game again 
			$('.game-again').tap(function(){
				self.chooseWhichCar(0);
				$page2.removeClass('scale');
				$page3.removeClass('swipeRight');
				$('.popup-game-over').hide();
			});

			// game-form
			$('.game-form').tap(function(){
				$('.popup-game-over').hide();
				$('.popup-form').show();
			});

			// form-close
			$('.popup-close-1').tap(function(){
				$('.popup-form').hide();
				$('.popup-game-over').show();
			});
			
			// 分享按钮
			$('#shareBtn').tap(function(){
				// $('.share-tips').show();
			});

			$('.share-tips').tap(function(){
				$(this).hide();
			});

			
		},
		chooseWhichCar:function(n){
			var self = this;
			$('.page2-car-name').text(self.car.name[n]);
			$('.page2-car1').attr('src',self.car.list[n]);
			$('.page2 li').eq(n).addClass('selected')
				.siblings().removeClass('selected');
		},
		chooseMusic:function(n){
			// 0 背景音乐 1 歌曲1   2 歌曲2   3 全部停止
			var self = this;
			self.music = n;
			if( n == 3 ){
				$('.song').each(function(idx,item){
					item.pause();
				});
				return;
			};
			$('.song').each(function(idx,item){
			
				if(idx == n){
					item.play();
					return;
				}
				item.pause();
			});
		},
		gameInit:function(){

			var self = this;
			var curCar = this.curCar + 1;   // 车型
			var bg,                         // 背景实例
				bgLeg = 0,                  // 背景移动的距离
				bgSpeed = 20,			    // 背景的速度
				road,
				roadLeg = 0,
				roadSpeed = 10;
			var	car,                        // 车
				wheelL,wheelR, carBody,     // 左右轮胎 车身
				carLeg = 0,                 // 车移动的距离
			 	carSpeed = 1,               // 车移动的速度
			 	deg = 0,                     // 轮胎转动的角度
			 	degSpeed = 5;               // 轮胎转动的速度
			var control,ctl_l,ctl_r,ctl_l_h,ctl_r_h;        //控制器
			var map,                            		//地图
				spot,spotPos,  							//红点点
				text1,text21,text22,text3,text41,text42,text51,text52,  //城市文字
				explain,tips,tipsOk,arc,opacity;
			var sW,carW;     
			var timeout; 
			var flag = false;  
			var isStart = false; // ACC 启动开关
			var isClick = false;		

			var stage = new createjs.Stage('myCanvas');
			var preload = new createjs.LoadQueue();
			var manifest = [
								{src: 'road1.jpg', id: 'road'},
								{src: 'bg.jpg', id: 'bg'},
								{src: 'game-car-wheel.png',id:'wheel'},
								{src: 'game-car1.png',id:'car1'},
								{src: 'game-car2.png',id:'car2'},
								{src: 'game-car3.png',id:'car3'},
								{src: 'game-car4.png',id:'car4'},
								{src: 'game-car5.png',id:'car5'},
								{src: 'game-car6.png',id:'car6'},
								{src: 'game-car7.png',id:'car7'},
								{src: 'game-car8.png',id:'car8'},
								{src: 'game-car9.png',id:'car9'},
								{src:'game-control.png',id:'control'},
								{src:'game-click.png',id:'click'},
								{src:'game-click-h.png',id:'clickH'},
								{src:'game-map.png',id:'map'},
								{src:'game-map-spot.png',id:'spot'},
								{src:'explain-circle.png',id:'explain'},
								{src:'explain-tips.png',id:'tips'},
								{src:'explain-tips1.png',id:'tipsOk'}
							];
			sW = document.body.clientHeight;   

			// sW = 1136 //测试

			opacity = 1;

			createjs.Touch.enable(stage);	  // 支持触屏，否则在wap端会出现抖动
			

			preload.on('complete', handleComplete);
			preload.loadManifest(manifest, true, 'img/');

			spotPos = [{x:819,y:24},{x:1026,y:86},{x:941,y:141},{x:830,y:181},{x:817,y:114}];

				// 图片全部加载完的回调
			function handleComplete(event){

					gameLayout();

					self.gameInit.Initialization = function(){

						bgLeg = 0;
						bgSpeed = 20;
						roadLeg = 0;
						roadSpeed = 10;
						carLeg = 0;
						carSpeed = 1;
						deg = 0;
						degSpeed = 5;
						flag = false;
						isStart = false;
						isClick = false;
						car.removeChild(carBody);
						curCar = 'car'+(self.curCar + 1);
						carBody = new createjs.Bitmap(preload.getResult(curCar));

						car.addChild(carBody,wheelR,wheelL);
					
						if( stage.getChildIndex(explain) > -1 ){
							stage.removeChild(explain)
						} 
						if( stage.getChildIndex(tipsOk) > -1 ){
							stage.removeChild(tipsOk)
						} 
						if( stage.getChildIndex(tips) > -1 ){
							stage.removeChild(tips)
						} 
						if( stage.getChildIndex(arc) > -1 ){
							stage.removeChild(arc)
						} 
						opacity = 1;
						stage.update();
					};
					


				 	carW = sW - car.getBounds().width - 100;
				 	
					ctl_l.on('click',function(){
						if( self.isStart ) return;
						ctl_l.alpha = 0;
						ctl_l_h.alpha = 1;
						speedUp();
					});

					ctl_r.on('click',function(){
						if( self.isStart ) return;
						ctl_r.alpha = 0;
						ctl_r_h.alpha = 1;						
						speedUp();
					});
					explain.on('click',startUp)

					createjs.Ticker.addEventListener("tick", handleTick);

					function startUp(){
						flag = false;
						stage.addChild(arc);
						stage.update();
						self.isStart = self.isStart ? false : true;
					}
					
					function speedUp(){
					
						flag = false;

						bgSpeed = bgSpeed < 75 ? bgSpeed + 2: bgSpeed;
						carSpeed = carSpeed < 3.8 ? carSpeed + 0.1 :carSpeed;
						degSpeed = degSpeed < 18.5 ? degSpeed + 0.5 : degSpeed;
						roadSpeed = roadSpeed < 37 ? roadSpeed + 1 : roadSpeed;

						clearTimeout(timeout);
						timeout = setTimeout(later, 1000);
					}
					function later(){
						flag = true;
					}
			}
				//  滴答事件回调
			function handleTick(event) {

					if( !self.gameGo ) return;

					if( bgLeg < -46300 ) {
					// if( bgLeg < -500 ) { //调试

						self.gameGo = false;
						$('.popup-game-over').show();
						self.chooseMusic(3);

					}

					mapEffect();
					runEffect();
					tipss();

					// 提示效果
					function tipss(){

						if( bgLeg < -26300 ){
						// if( bgLeg < -400 ){  // 调试
								if(self.isStart){
									stage.removeChild(tips);
									stage.addChild(explain,tipsOk,arc);
								}else{
									if(stage.getChildIndex(tipsOk) > -1){
										stage.removeChild(tipsOk)
									}
									tips.alpha  = opacity;
									opacity -= 0.1;
									if( opacity <= 0 ) opacity = 1;
									stage.addChild(explain,tips);
								}
								stage.update();
						}

					}
					
						// 地图效果
					
					function mapEffect(){
							
							if( bgLeg < -7500 && bgLeg > -14700){

								spot.x = spotPos[1].x;
								spot.y = spotPos[1].y;
								text1.color = '#ffffff';
								// text21.color = '#c32100';
								text22.color = '#c32100';

							}
							if( bgLeg < -14700 && bgLeg > -26300){

								spot.x = spotPos[2].x;
								spot.y = spotPos[2].y;
								// text21.color = '#ffffff';
								text22.color = '#ffffff';
								text3.color = '#c32100';
									
							
							}
							if( bgLeg < -26300 && bgLeg > -31800){
							

								spot.x = spotPos[3].x;
								spot.y = spotPos[3].y;
								text3.color = '#ffffff';
								text41.color = '#c32100';
								text42.color = '#c32100';
							}
							if( bgLeg < -31800 && bgLeg > -40700){
								spot.x = spotPos[4].x;
								spot.y = spotPos[4].y;
								
								text41.color = '#ffffff';
								text42.color = '#ffffff';
								text51.color = '#c32100';
								text52.color = '#c32100';
								
							}
							if( bgLeg < - 40700 ){
								spot.x = spotPos[0].x;
								spot.y = spotPos[0].y;
								text51.color = '#ffffff';
								text52.color = '#ffffff';
								text1.color = '#c32100';
							}

							
					}

					  // 背景、路、汽车、轮胎跑动效果
					function runEffect(){

						wheelL.rotation = deg;
						wheelR.rotation = deg;
						// 轮胎
						if( flag ){
							degSpeed = degSpeed > 5 ? degSpeed - 0.2 : 5;
							deg += degSpeed;
						}else{
							deg += degSpeed;
						}

						// 公路
						road.x = roadLeg;
						roadLeg -= roadSpeed;
						if( flag ){
							roadSpeed = roadSpeed > 10 ? roadSpeed - 0.3 : 10;
							roadLeg -= roadSpeed;
						}else{
							roadLeg -= roadSpeed;
						}
						// 背景 
						bg.x = bgLeg;
						if( flag ){
							bgSpeed = bgSpeed > 20 ? bgSpeed - 0.3 : 20;
							bgLeg -= bgSpeed;
						}else{
							bgLeg -= bgSpeed;
						}

						// 车
						car.x = carLeg;
						if( !self.isStart ){						
							if( flag ){			
								carSpeed = carSpeed > 1 ? carSpeed - 0.1 : 1;
								carLeg = carLeg - carSpeed;
								if(carLeg < 0 ){
									carLeg = 0;
								}
								
							}else{
								carLeg = (carLeg  < carW) ? carLeg + carSpeed : carLeg;
							}
						}else{
							if( carLeg < carW/2 ){
								carLeg += 10;
								if(carLeg >= carW/2 ){
									carLeg = carW/2;
								}
							} else if(carLeg > carW/2)  {
								carLeg -= 10;
								if(carLeg <= carW/2 ){
									carLeg = carW/2;
								}
							}

						}
						ctl_l_h.alpha -= 0.2;
						ctl_l.alpha += 0.2;
						ctl_r_h.alpha -= 0.2;
						ctl_r.alpha += 0.2;

						stage.update();
					}

					
					
			}

			function gameLayout(){

					stage.rotation = 90;
					stage.regX = 0;
					stage.regY = 640;

					bg = new createjs.Bitmap(preload.getResult('bg'));
					road = new createjs.Bitmap(preload.getResult('road'));
					bg.x = 0;
					bg.y = 0;
					road.x = 0;
					road.y = 363;

					wheelL  = new createjs.Bitmap(preload.getResult('wheel'));
					wheelR = wheelL.clone();
					carBody = new createjs.Bitmap(preload.getResult('car1'));
					wheelL.x = 87;
					wheelL.y = 155;
					wheelL.regX = 29;
					wheelL.regY = 27;
					wheelR.x = 370;
					wheelR.y = 155;
					wheelR.regX = 29;
					wheelR.regY = 27;
					car = new createjs.Container();
					car.addChild(carBody);
					car.addChild(wheelL,wheelR);
					car.y = 200;

					control = new createjs.Bitmap(preload.getResult('control'));
					ctl_l = new createjs.Bitmap(preload.getResult('click'));
					ctl_r = ctl_l.clone();
					ctl_l_h = new createjs.Bitmap(preload.getResult('clickH'));
					ctl_r_h = ctl_l_h.clone();
					control.cache(0, 0, 1136, 258);

					control.y = 385;
					ctl_l.x = 136;
					ctl_l.y = 420;

					ctl_l_h.x = 141;
					ctl_l_h.y = 424;
					ctl_l_h.alpha = 0;


					ctl_r.x = 746;
					ctl_r.y = 420;
					ctl_r_h.x = 751;
					ctl_r_h.y = 424;
					ctl_r_h.alpha = 0;

					explain = new createjs.Bitmap(preload.getResult('explain'));
					tips = new createjs.Bitmap(preload.getResult('tips'));
					tipsOk = new createjs.Bitmap(preload.getResult('tipsOk'));
					arc = new createjs.Shape();
					arc.graphics.setStrokeStyle(3).beginStroke("#fff000").arc(90,90,86,0,Math.PI*2);
					explain.x = 938; 
					explain.y = 190;
					tips.y = 342;
					tips.x = 936;
					tipsOk.y = 342;
					tipsOk.x = 936;
					arc.x = 936; 
					arc.y = 188;
					if( sW < 1136 ){
						var xxx = 1136 - (1136-sW)/2 - 50 - 176;
						explain.x = xxx; 
						tips.x = xxx-2;
						tipsOk.x = xxx-2;
						arc.x = xxx-2;
					}



					map = new createjs.Bitmap(preload.getResult('map'));
					map.x = 800;
					map.y = 10;
					// if( sW < 1136 ){
					// 	var xxxx = 1136 - (1136-sW)/2 - 50 - 303;
					// 	console.log(xxxx)
					// 	// map.x = xxxx;
					// }

					spot = new createjs.Bitmap(preload.getResult('spot'));
					spot.x = spotPos[0].x;
					spot.y = spotPos[0].y;

					text1 = new createjs.Text('洛杉矶', "20px 微软雅黑", "#ffffff");
					text1.x = 750;
					text1.y = 17;
					text1.color = '#c32100';

					// text21 = new createjs.Text('乡村音乐之都', "20px 微软雅黑", "#ffffff");
					text22 = new createjs.Text('阿拉伯名马场', "20px 微软雅黑", "#ffffff");
					// text21.x = 978;
					// text21.y = 28;
					text22.x = 1005;
					text22.y = 50;

					text3 = new createjs.Text('66号公路', "20px 微软雅黑", "#ffffff");
					text3.x = 909;
					text3.y = 161;

					text41 = new createjs.Text('白沙遗址', "20px 微软雅黑", "#ffffff");
					text42 = new createjs.Text('国家公园', "20px 微软雅黑", "#ffffff");
					text41.x = 739;
					text41.y = 170;
					text42.x = 739;
					text42.y = 193;
					text51 = new createjs.Text('瓜达卢普山', "20px 微软雅黑", "#ffffff");
					text52 = new createjs.Text('国家公园', "20px 微软雅黑", "#ffffff");
					text51.x = 708;
					text51.y = 90;
					text52.x = 719;
					text52.y = 111;
					var mapss = new createjs.Container();
						mapss.addChild(map,spot,text1,text22,text3,text41,text42,text51,text52);
					if( sW < 1136 ){
						var xxxx = 1136 - (1136-sW)/2 - 50 - 303 - 800;
					
						mapss.x = xxxx;
					}
					stage.addChild(bg,road,car,control,ctl_l,ctl_r,ctl_l_h,ctl_r_h,mapss);
					// stage.addChild(bg,road,car,control,ctl_l,ctl_r,ctl_l_h,ctl_r_h,map,spot,text1,text21,text22,text3,text41,text42,text51,text52);
					stage.setChildIndex(road,1);
					stage.setChildIndex(car,2);
					stage.update();
			}
			
		}

	}



	var instanceGame = new game();
	instanceGame.chooseMusic(0);

	// loading 

	var loadImgsArr=[
        //将需要loading的图片放到此数组
        'img/bg.jpg',
        'img/explain-bg1.jpg',
        'img/explain-bg2.jpg',
        'img/explain-circle.png',
        'img/explain-hand-l.png',
        'img/explain-hand-r.png',
        'img/explain-layer.png',
        'img/explain-tips.png',
        'img/explain-tips1.png',
        'img/game-car1.png',
        'img/game-car2.png',
        'img/game-car3.png',
        'img/game-car4.png',
        'img/game-car5.png',
        'img/game-car6.png',
        'img/game-car7.png',
        'img/game-car8.png',
        'img/game-car9.png',
        'img/game-click.png',
        'img/game-click-h.png',
        'img/game-control.png',
        'img/game-map.png',
        'img/go-bg.png',
        'img/page1-bg.jpg',
        'img/page1-bg-1.png',
        'img/page1-car.png',
        'img/page1-title.png',
        'img/page1-woman.png',
        'img/page2-bg.jpg',
        'img/page2-btn.png',
        'img/page2-car1.png',
        'img/page2-car2.png',
        'img/page2-car3.png',
        'img/page2-car4.png',
        'img/page2-car5.png',
        'img/page2-car6.png',
        'img/page2-car7.png',
        'img/page2-car8.png',
        'img/page2-car9.png',
        'img/popup-bg1.png',
        'img/popup-bg2.png',
        'img/popup-title.png',
        'img/tips.png',
        'img/tips-1.png'
    ];
  	
	netease_loadimg(loadImgsArr,function(){
	    //loading结束后的回调函数
	    instanceGame.init();
	});



	// 提交表单
	getSheng('province');

	$('#province').on('change',function(){
		getShi('city',$(this).get(0).value);
	
	});
	$('#city').on('change',function(){
		getShop('dealer',$(this).get(0).value);	
	});
	var flag10 = true;  //防止用户多次提交
	$('.popup-btn-1').click(function(){
				if(!flag10) return;
				var data = getData();
				console.log(data)
				if(data){
					flag10 = false;
					$.ajax({
			            url:"common.php?act=subMessage",
			            type:'POST',
			            data:data,
			            dataType:'json',
			            success: function(res){
			            	if( res.retCode == 1){
			            		alert(res.retInfo);
			            		$('.popup-form').hide();
			            		$('.share-tips').show();
			            	}else{
			            		flag10 = true;
			            		alert(res.retData.error);
			            	}
			            }
			        });
				}
				
		});

		// 获取数据
	function getData(){

			var Data = {
					name:$('#name').val(),
					phone:$('#phone').val(),
					province:$('#province').get(0).value
				};
			var myreg = /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/; 
			Data.city = Data.province != '' ?  $('#city').get(0).value : '';
			Data.dealer = Data.city != '' ? $('#dealer').get(0).value : '';
			Data.buycartime = $('#bugTime').get(0).value;
			Data.source = 'wap';
			if(Data.name == ''){
				alert('请输入姓名！'); 
			    return false;
			}
			if(!myreg.test(Data.phone)) { 
			    alert('请输入有效的手机号码！'); 
			    return false; 
			} 

			if(Data.province == ''){
				alert('请选择省份！');
				return false;
			}
			if(Data.city == ''){
				alert('请选择市！');
				return false;
			}
			if(Data.dealer == ''){
				alert('请选择经销商！');
				return false;
			}
			if(Data.buycartime == ''){
				alert('请选择预计购车时间')
				return false;
			}
			return Data;

	}
	// 分享按钮

	//解决滑动事件冲突
	document.addEventListener("touchmove",function(e){
		e.preventDefault();
		e.stopPropagation();
	},false);

})(Zepto);