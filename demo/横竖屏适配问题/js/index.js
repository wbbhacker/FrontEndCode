(function($){

	
	var orient= "onorientationchange" in window ? "orientationchange" : "resize";
	window.addEventListener(orient, adaptation, false);

	adaptation();

	function adaptation(){ 
		    if(window.orientation==180||window.orientation==0){ 
		    	calcCanvas();
		    } 
			if(window.orientation==90||window.orientation==-90){    
				calcCanvas();
		    } 
	} 


	function calcCanvas(){
		$('#myCanvas').get(0).width = document.body.clientWidth;
		$('#myCanvas').get(0).height = document.body.clientHeight;
		// alert(document.body.clientWidth)
		var img = new Image();
		img.src='img/car-0.png';
		img.onload = function(){
			jc.start('myCanvas',true);
			jc.image(img,0,0).id('img1');
		}
	}

})(Zepto);