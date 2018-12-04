$(function() {


	var wh = document.body.offsetHeight,
		ww = document.body.offsetWidth;

	var app = new PIXI.Application(ww,wh,{antialias:true}),
		loader = new PIXI.loaders.Loader();

    var container = new PIXI.Container();
    var scroller;
    var flag = {};
    var p = pixiUtil;

    document.getElementById('main').appendChild(app.view);
    loader.add(pixiData.imgData);

    // loading
	loader.onProgress.add(function(e){
        
		// var text = document.getElementById('text');
  		// text.innerText = Math.round(e.progress) + '%';
  		// console.log(Math.round(e.progress) + '%')

	});

	loader.onComplete.add(function() {
        // var loading = document.getElementById('loading');
        // loading.style.display = 'none';
        // console.log('加载完毕!');

    });

    loader.load(handleLoaded);
    

    function handleLoaded(loader, resources){
    	// 代码

    	console.log( p)
    	p.layout(container,pixiData.objData);
    	console.log(container)
    	app.stage.addChild(container);
    	console.log(pixiData.objData)


    	function scrollbc(left, top, zoom){
    		console.log(left)
    		container.y = -top;
    	}

    	// 滚动
    	scroller = new Scroller(scrollbc,{bouncing:false});
    	scroller.setDimensions(app.view.width, app.view.height, container.width, container.height);
    		// 手势滚动
    	flag.run = true;  //控制是否滚动
		var mousedown = false;
	    document.addEventListener("touchstart", function(e) {
	    	if(!flag.run) return;
	        var pageX = e.touches[0].pageX,
	            pageY = e.touches[0].pageY;
	        scroller.doTouchStart(e.touches, e.timeStamp);
	        mousedown = true;
	    }, false);

	    document.addEventListener("touchmove", function(e) {
	    	if(!flag.run) return;
	        var pageX = e.touches[0].pageX,
	            pageY = e.touches[0].pageY;
	        if (!mousedown) {
	            return;
	        }
	        scroller.doTouchMove(e.touches, e.timeStamp);
	        mousedown = true;
	    }, false);

	    document.addEventListener("touchend", function(e) {
	    	if(!flag.run) return;
	        if (!mousedown) {
	            return;
	        }
	        scroller.doTouchEnd(e.timeStamp);
	        mousedown = false;
	    }, false);

    }


    // 阻止
    document.addEventListener('touchmove', function(e) {
        e.preventDefault();
    },{ passive: false });

});