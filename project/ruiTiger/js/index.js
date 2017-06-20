(function($){
		// 提示用户锁定为竖屏
	var orient= "onorientationchange" in window ? "orientationchange" : "resize";
	window.addEventListener(orient, adaptation, false);

	var w  =  $(window).height();
	adaptation();



	function adaptation(){
		var $popuptips = $('.vertical-tips');
	    if(window.orientation==180||window.orientation==0){ 

	    	if( w < 1136 ){
	    		
	    		$('.kv .kv-title').css('margin-right',1136-w+28);
	    		$('.arrow').css('left',(1136-100)/2);
	    		$('.kv .content').css('background-position-x',-(1136-w));
	    		$('.page1 .content').css('top',248-(1136-w)/2);

	    		$('.game-tips').css('top',-(1136-w)/2);
	    		$('.game-go').css('top',-(1136-w)/2);
	    		$('.game-over').css('top',-(1136-w)/2);
	    		// $('.popup-form').css('top',-(1136-w)/2);

	    	}
	    	
	    	$popuptips.hide();
	    } 
		if(window.orientation==90||window.orientation==-90){    
			$popuptips.show();
	    }
	};
	//

	

	var loadImgsArr=[
        //将需要loading的图片放到此数组
        'img/arrow.png',
        'img/form-bg.png',
        'img/game-bg.png',
        'img/game-car-body.png',
        'img/game-cloud.png',
        'img/game-control.png',
        'img/game-how.png',
        'img/game-over-bg.png',
        'img/game-road1.png',
        'img/game-top.png',
        'img/kv-bg.jpg',
        'img/kv-title.png',
        'img/page1-bg-bg.png',
        'img/page1-btn.png',
        'img/page1-car1.png',
        'img/page1-car2.png',
        'img/page1-car3.png',
        'img/page1-car4.png'
    ];

    netease_loadimg(loadImgsArr,function(){
    	
	});

	// kv --> page1 
	var $kv = $('.kv'),
		$page1 = $('.page1');
	$kv.swipeRight(function(){
		$kv.addClass('swipeUp');
		$page1.show();
	});

	// page1 焦点图
	
	var SuperType = function (o){	
		this.curIdx = 0;  //当前值默认为0
		this.loop = true;  // 是否循环
		this.numAll = 4;  //总共几页
		this.init();
		this.active = o.active;
	};

	SuperType.prototype = {
		init:function(){
			this.layer();
		},
		layer:function(){},
		goTo:function(n){
			this.jisuancurIdx(n);
			this.active(this.curIdx);
		},
		active:function(n){},
		jisuancurIdx:function(n){
			var numAll = this.numAll,
				loop = this.loop;
			if(loop){
				if( n >= numAll ){
					n = 0;
				}
				if( n < 0 ){
					n = numAll-1;
				}
			}else{
				if( n >= numAll ){
					n = numAll-1;
				}
				if( n < 0 ){
					n = 0;
				}
			}
			this.curIdx = n;
		}
	};

	var instance =  new SuperType({
		active:function(idx){
			$('.car').eq(idx).addClass('scaleTop')
				.siblings().removeClass('scaleTop');
		}
	});

	instance.active(0);

	$('.left').tap(function(){
		instance.curIdx--;
		instance.goTo(instance.curIdx);
	});

	$('.right').tap(function(){
		instance.curIdx++;
		instance.goTo(instance.curIdx);
	});

	$('.page1').swipeUp(function(){
		instance.curIdx--;
		instance.goTo(instance.curIdx);
	});
	$('.page1').swipeDown(function(){
		instance.curIdx++;
		instance.goTo(instance.curIdx);
	});
	$('.btn').tap(function(){
		$('.page1').hide();
		$('.game-tips').show();
	});

	//game-over
	$('.game-over .close').tap(function(){
		$('.game-over').hide();
	});

	// game-tips
	$('.tips-btn').tap(function(){
		$('.game-tips').hide();
		$('.game-go').show();
		instanceInit.gameInit();
	});
	$('.game-tips .close').tap(function(){
		$('.game-tips').hide();
		$('.game-go').show();
		instanceInit.gameInit();
	});

	$('.go-sao').on('webkitAnimationEnd',function(){
		$('.game-go').hide();
		instanceInit.gameInit();
		instanceInit.gameFlag();
	});


	//  分享按钮
	$('#shareBtn').tap(function(){
	 	$('.share-tips').show();
	 });
	$('.share-tips').tap(function(){
		$('.share-tips').hide();
	});



	//  重新开始游戏
	$('.play-again').tap(function(){
		$('.game-over').hide();
		instanceInit.gameInit();
		instanceInit.gameFlag();
	});



	// 弹出表单
	$('.btn-form').tap(function(){
		$('.game-over').hide();
		$('.popup-form').show();
	});



	// 提交表单
		getSheng('province');

		$('#province').on('change',function(){
			getShi('city',$(this).get(0).value);
		
		});
		$('#city').on('change',function(){
			getShop('dealer',$(this).get(0).value);	
		});
		var flag10 = true;
		$('.form-btn').tap(function(){
			if(!flag10) return;
				var data = getData();
				if(data){
					flag10 = false;
					$.ajax({
			            url:"http://test.go.163.com/auto/2016/1110/chery/common.php?act=subMessage",
			            type:'POST',
			            data:data,
			            dataType:'json',
			            success: function(res){
			            	if( res.retCode == 1){
			            		alert(res.retInfo);
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
			// Data.buycartime = $('#bugTime').get(0).value;
			Data.source = '2';
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
	// game                     

	function game(){

		var stage,self,tool;
		var manifest = [
							{src: 'game-control.png', id: 'control'},
							{src: 'game-click.png', id: 'click'},
							{src: 'game-click-h.png', id: 'click-h'},
							{src: 'game-road1.png', id: 'road'},
							{src: 'game-bg.png', id: 'bg'},
							{src: 'game-top.png', id: 'gameTop'},
							{src: 'game-car-body.png', id: 'carBoyd'},
							{src: 'game-car-wheel.png', id: 'wheel'},
							{src: 'game-time1.png', id: 'time'},
							{src: 'game-brand.png', id: 'brand'},

					],
			preload;

		var control,ctl_l,ctl_r,ctl_lh,ctl_rh,alpha,time,brand,text1,brand_t,text2;   
		var road,bg,gameTop,car,wheel_l,wheel_r,carBoyd,bgClone,roadClone;
		var carSpeed,wheelSpeed,bgSpeed,roadSpeed;
		var carLeg,wheelDeg,bgLeg,roadLeg;
		var stop , timeout;
		var flag , fpsWheelStopNum , roadReduceSpeed, bgReduceSpeed; //  停止点击按钮时的加速度: fpsWheelStopNum为轮胎的加速度  carReduceSpeed公路的加速度
		var gameOver;   //判断游戏是否结束
		var brandRepeat;
		var sumLeg;
		var gameFlag;


		self 	 = this;
		tool 	 = self.tool;
		calcAP   = tool.calcAP;
		stage 	 = new createjs.Stage('myCanvas');
		preload  = new createjs.LoadQueue();

		createjs.Touch.enable(stage);
		preload.on('complete',handleComplete);
		preload.loadManifest(manifest, true, 'img/');


		function handleComplete(){
			layout();
			gameInit();
			ctl_l.on('click',function(){
				ctl_l.alpha = 0;
				ctl_lh.alpha = 1;
				upSpeed();
			});

			ctl_r.on('click',function(){
				ctl_r.alpha = 0;
				ctl_rh.alpha = 1;
				upSpeed();
			});

			createjs.Ticker.addEventListener("tick", tick);

			function upSpeed(){
				stop = false;  // 判断是否停止点击加速按钮

				wheelSpeed = calcAP(wheelSpeed,1,25); 
				carSpeed =  calcAP(carSpeed,0.2,5);
				roadSpeed = calcAP(roadSpeed,2,40);
				bgSpeed = calcAP(bgSpeed,1,25);
				clearTimeout(timeout);
				timeout = setTimeout(later, 1000);
			}


			function later(){ stop = true; flag = true;}

			var FPS = createjs.Ticker.framerate; 
			console.log('FPS为:',FPS);

		};

		function tick(){

			if(!gameFlag) return;
			// game-over
			if( time.scaleX < 0 ){
				if(gameOver) return;
				gameOver = true;
			}

			if( gameOver ){
				$('.game-over').show();
				$('.game-over span').text(text2.text);
				return;	
			}

			time.scaleX -= 1.2/30/20; //  30s 20FPS

			//  car
			car.x = carLeg + 50;
				//车速的变化
			if(stop){
					//0.05 为 汽车的减速度  
				if( flag ){
					flag = false;
					fpsWheelStopNum = wheelSpeed/(carSpeed/0.05);  // carSpeed/0.05  计算carSpeed减到0的帧数
					roadReduceSpeed = roadSpeed/(carSpeed/0.05);
					bgReduceSpeed = bgSpeed/(carSpeed/0.05);
				}
				carSpeed = carSpeed < 0 ? 0 : carSpeed - 0.05;
			}	

				// 行驶距离的变化
			carLeg = stop ?  (carLeg < 0 ? 0 : (carLeg == 0 ? carLeg : carLeg - carSpeed )) :  (carLeg > 525 ? carLeg : carLeg + carSpeed);
			

			// 轮胎
			wheel_l.rotation = wheelDeg;
			wheel_r.rotation = wheelDeg;
				//轮胎的转动的速率变化
			if(stop){ 
				wheelSpeed = wheelSpeed < 0 ?  0 : wheelSpeed - fpsWheelStopNum;
			}
				// 轮胎转动的角度
			wheelDeg += wheelSpeed;



			//公路
			road.x = roadLeg;
				//公路重复滚动
			if( roadLeg < -(13603 - 1136)){
				roadClone.alpha = 1;
				roadClone.x -= roadSpeed;
			}	
				//公路速度变化
			if( stop ){
				roadSpeed = roadSpeed < 0 ? 0 : roadSpeed - roadReduceSpeed;
			}
			roadLeg -= roadSpeed;
			// 总的路程
			sumLeg += roadSpeed;
			// console.log(sumLeg);


			// 背景

			bg.x = bgLeg;

				//背景重复
			if( bgLeg < -(13603 - 1136)){
				bgClone.alpha = 1;
				bgClone.x -= bgSpeed;
			}

				//背景速度变化
			if( stop ){
				bgSpeed = bgSpeed < 0 ? 0 : bgSpeed - bgReduceSpeed;
			}

			bgLeg -= bgSpeed;


			// 路牌
			brand.x -= roadSpeed;

				//路牌重复  //********* a month later ,  i will forget this code  ~。~ 16/11/15**********//
			var num = parseInt(sumLeg/2000);   // 2000 每隔2000像素出现路牌
				
					// 1 进来只有操作一次, 2 进来之后操作一次.....  所以用到了数组 brandRepeat

			if( num == 1 || num == 2 || num == 3 || num == 4 || num == 5 || num == 6 || num == 7 || num == 8 || num == 9 || num == 10 || num == 11 || num == 12 || num == 13 || num == 14 ){

				if( brandRepeat[num] !== 0 ){ // 第一次进来不为 0;

					brand.x = brandRepeat[num].x; // 路牌定位
					text1.text = num*5;       // 文字变化
					tool.textCenter(text1,80);  // 文字居中

				}

				brandRepeat[num] = 0;    // 第一次进来操作后赋值为0，来防止每次进来操作; 

			}

			// 行驶的千米数
			text2.text = tool.toDecimal(sumLeg/2000*5);
			tool.textCenter(text2,177);
			text2.x = text2.x + 758;

			// 点击按钮
			ctl_l.alpha += 0.2;
			ctl_lh.alpha -= 0.2;
			ctl_r.alpha += 0.2;
			ctl_rh.alpha -= 0.2;
			stage.update();

		}
		function gameInit(){

				carSpeed = wheelSpeed = brandSpeed = bgSpeed = roadSpeed = 0;
				carLeg   = wheelDeg = brandLeg = bgLeg = roadLeg = 0;
				stop = false;
				flag = false;
				fpsWheelStopNum = 0;
				gameOver = false;
				sumLeg = 0;
				gameFlag = false;

				brandRepeat = [
					{},
					{text:'5',x:1216},
					{text:'10',x:1216},
					{text:'15',x:1216},
					{text:'20',x:1216},
					{text:'25',x:1216},
					{text:'30',x:1216},
					{text:'35',x:1216},
					{text:'40',x:1216},
					{text:'45',x:1216},
					{text:'50',x:1216},
					{text:'55',x:1216},
					{text:'60',x:1216},
					{text:'65',x:1216},
					{text:'70',x:1216},
				];

				control.set({x:0,y:383});

				ctl_l.set({x:158,y:418});
				ctl_lh.set({x:165,y:422});
				ctl_l.alpha = 1;
				ctl_lh.alpha = 0;

				ctl_r.set({x:768,y:418});
				ctl_rh.set({x:775,y:422});
				ctl_r.alpha = 1;
				ctl_rh.alpha = 0;

				road.set({x:0,y:337});

				wheel_l.set({x:71.5,y:116.5,regX:32.5,regY:32.5});
				wheel_r.set({x:312.5,y:116.5,regX:32.5,regY:32.5});

				car.set({x:50,y:251});
				time.set({x:132,y:26});

				text1.set({y:20});
				text1.lineWidth = 50;
				text2.set({y:1});

				brand.set({x:450,y:135});

				time.scaleX = 1.2;

				text1.text = '0';
				tool.textCenter(text1,80);

				text2.text = '0';
				tool.textCenter(text2,177);
				text2.x = text2.x + 758;

				bgClone.x = 1136;
				bgClone.alpha = 0;
				roadClone.set({x:1136,y:337});
				roadClone.alpha = 0;
				stage.update();	


		}
		function layout(){
				var w = $(window).height();

				stage.rotation = 90;
					
					stage.regY = 640; 
				if( w < 1136 ){
					stage.regX = (1136-w)/2;
				}


				control  = new createjs.Bitmap(preload.getResult('control'));
				ctl_l    = new createjs.Bitmap(preload.getResult('click'));
				ctl_lh   = new createjs.Bitmap(preload.getResult('click-h'));
				road     = new createjs.Bitmap(preload.getResult('road'));
				bg       = new createjs.Bitmap(preload.getResult('bg'));
				gameTop  = new createjs.Bitmap(preload.getResult('gameTop'));
				carBoyd  = new createjs.Bitmap(preload.getResult('carBoyd'));
				wheel_l  = new createjs.Bitmap(preload.getResult('wheel'));
				car      = new createjs.Container();
				time 	 = new createjs.Bitmap(preload.getResult('time'));
				brand    = new createjs.Container();
				brand_t  = new createjs.Bitmap(preload.getResult('brand'));
				text1	 = new createjs.Text('0', "40px 微软雅黑 blod", "#000000");
				text2    = new createjs.Text('105.8', "48px 微软雅黑 blod", "#c30200");

				wheel_r  = wheel_l.clone();
				ctl_r    = ctl_l.clone();
				ctl_rh	 = ctl_lh.clone();
				car.addChild(carBoyd,wheel_l,wheel_r);
				brand.addChild(brand_t,text1);
				bgClone = bg.clone();
				roadClone = road.clone();
				

				stage.addChild(road,roadClone,bg,bgClone,control,ctl_l,ctl_r,gameTop,brand,car,time,text2,ctl_lh,ctl_rh);
				stage.update();

		}
		return {
			gameInit:gameInit,
			gameFlag:function(){
				gameFlag = true;
			}
		};
	};

	game.prototype = {
		constructor:game,
		tool:{
			textCenter:function(text,num){
				//居中
				text.x = (num - text.getBounds().width)/2;
			},
			toDecimal:function(x){
				//保留一位小数
				var f,rs;
					f = parseFloat(x); 

		            if (isNaN(f)) return;

           			f = Math.round(x*10)/10;  

           			rs = f.toString().indexOf('.');  

		            if (rs < 0) {  
		                f = f + '.0';
		            }  

            		return f;  
			},
			calcAP:function(sp,ap,maxSp){
				// sp 速度  ap 加速度  maxSp 最大速度
				sp += ap;
				if( sp > maxSp ){
					sp = maxSp;
				}
				return sp;
			}
		}
	}; 
	var instanceInit = new game();



	//解决滑动事件冲突
	document.addEventListener("touchmove",function(e){
		e.preventDefault();
		e.stopPropagation();
	},false);

	

})(Zepto)
