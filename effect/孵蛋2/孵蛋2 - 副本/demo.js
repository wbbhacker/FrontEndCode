/*
		poConf{
			bind:Dom,
			onloadover:function(){},	每加载完一张图片的回调函数
			onloadAll:function(){}		所有图片加载完的回调函数
		}
*/
var loading = function( poConf ){
			poConf.sumImg = 0;
			poConf.count = 0;
			poConf.over = true; // 所有图片加载完成时，为true
			poConf.handle = function(){
				this.sumImg = poConf.bind.getElementsByTagName("img").length;
				for( var i = 0; i < this.sumImg; i++ ){
					if( this.sumImg.complete = false )
						poConf.over = false
				}
				if( false == poConf.over ){
					poConf.load(poConf.bind,this.sumImg);
				}else{
					poConf.onloadAll();
				}
			}
			poConf.load = function(poElem,piSum){
				var toChild = poElem.childNodes;
				if( "IMG" == poElem.nodeName ){
					poElem.onload = function(){
							poConf.over = true;
							poConf.onloadover();
							if( piSum-1 == poConf.count ){
								poConf.onloadAll();
							}

							poConf.count++
					}
				}	
				if( 0 != toChild.length ){
					for( var i = 0; i < toChild.length; i++){
						poConf.load(toChild[i],piSum);
					}
				}	
			}
			poConf.handle();
			return poConf;
};

var anim = function( poConf ){
	poConf.page2Con = 0;
	poConf.page1 = function(){
		var $ = this.$;
		$("p1_one").className = "fade";
		$("p1_two").className = "up_in";
		$("p1_three").className = "fade1";
		$("p1_four").getElementsByTagName("img")[0].className = "rl";
		$("p1_five").className = "down_in";
		$("p1_four").addEventListener('click',function(){
			setTimeout(function(){
				$("page1").style.display = "none";
				$("p2_2").className = "up_in3";

			},2000)
			
			$("p1_four").className = "up_in2";

		},false)
	};
	poConf.page2 = function(){

		var $ = this.$;
		
		$("p2_1").addEventListener("click",function(){
				var num = Math.ceil(Math.random()*8);
				if( 0 == poConf.page2Con ){
					this.className = "fade3";
					poConf.page2Con = 1;
				}else{
					$("p2_2").style.display = "none";
					$("p2_1").style.display = "none";
					$("p2_3").className  = "fade2";
					$("p2_4").style.display = "block";
					$("p2_5").style.display = "block";

					setTimeout(function(){

						$("p2_4").style.display = "none";
						$("p2_5").style.display = "none";

						$("p2_6").getElementsByTagName("img")[0].src = "p2/s"+num+".png";
						$("p2_7").getElementsByTagName("img")[0].src = "p2/ss"+num+".png";
						$("p2_8").getElementsByTagName("img")[0].src = "p2/sss"+num+".png";

						$("p2_6").style.display = "block";
						$("p2_7").style.display = "block";
						$("p2_8").style.display = "block";

					},500);

					setTimeout(function(){
						$("p2_9").style.display = "block";
						$("p2_9").addEventListener("click",function(){
							$("Eject").style.display = "block";
							$("p2_3").className = '';
							$("p2_3").style.opacity = '1';
							$("p2_one").style.opacity = '1';
							$("p2_one").className = '';

						},false);
					},6000)
				}
		},false);

		$("p2_4").addEventListener("click",function(){
			
		},false);
	
	};
	poConf.do = function(){
		poConf.page1();
		poConf.page2();
	}
	poConf.$ =function(){
		if( arguments[0] ){
			var toElem = document.getElementById(arguments[0]);
			return toElem;
		}
	}
	return poConf
}
var anim = anim({});


var page1 = loading({
			bind:document.getElementById("stage"),
			onloadover:function(){},	//每加载完一张图片的回调函数
			onloadAll:function(){
				anim.do();
			}	
})





