
var goTransition = {
	maTransition: [],
	css3Style:"transform,",
	play: function() {
		setTimeout(function(e) {
			while (goTransition.maTransition.length) {
				//console.log(goTransition.css3Style)
				var toElem = goTransition.maTransition.shift();

				toElem.style.transition = toElem.targetStyle + " 0.5s";
				toElem.style[toElem.targetStyle] = toElem.targetStyleValue;
				if( -1 != goTransition.css3Style.indexOf(toElem.targetStyle) ){
					toElem.style.webkitTransition = "-webkit-"+toElem.targetStyle + " 0.5s";

					tsFirLetter = toElem.targetStyle.substring(0,1).toUpperCase();
					tsRestLetter = toElem.targetStyle.substring(1);
					tsWkitStyle ="webkit" + tsFirLetter + tsRestLetter

					//console.log(tsWkitStyle)

					toElem.style[tsWkitStyle] = toElem.targetStyleValue;
				}
			}
		}, 100);
	}
};

		
var goEffectRolltest = {
		onTransitionEnd: function(poEvent) {
			console.log('onTransitionEnd: ' + this.id);
			//this.style['transition'] = this.style['webkitTransition'] = "none";
			this.parentElement.removeChild(this);
			
		},
		
		init: function(poConf) {
			for (var i = 0; i < poConf.maElem.length; i++) {
				var toElem = poConf.maElem[i];
				// toElem.style.left = "0px";
				// toElem.style.top = "0";
				toElem.style["transform"] = "translateX(0px) translateY(0px)";      
				toElem.style["webkitTransform"] = "translateX(0px) translateY(0px)";
				
				toElem.style.width = "100%";
				toElem.style.height = "100%";
				toElem.style.zIndex = (poConf.maElem.length - i);
				
				//toElem.addEventListener('webkitTransitionEnd', this.onTransitionEnd);
				
				
				toElem.style['transformStyle'] = toElem.style['webkitTransformStyle'] = "preserve-3d";
			}

			poConf.moBoxElem.style["transform"] = "translateX(0px) translateY(0px)";      
			poConf.moBoxElem.style["webkitTransform"] = "translateX(0px) translateY(0px)";
			poConf.moBoxElem.style.width = "100%";
			poConf.moBoxElem.style.height = "100%";
		},
		up: function(poConf, pdLastIdx, pdNowIdx) {

			var toLastElem = poConf.maElem[pdLastIdx];
			var toNowElem = poConf.maElem[pdNowIdx];
			
			toLastElem.style.transition = toNowElem.style.webkitTransition = toNowElem.style.transition = toNowElem.style.webkitTransition = "none";

		    toLastElem.style["transform"] = "translateX(0px) translateY(0px)";      
			toLastElem.style["webkitTransform"] = "translateX(0px) translateY(0px)";

			toNowElem.style["transform"] = "translateX(0px) translateY("+toNowElem.offsetHeight+"px)";      
			toNowElem.style["webkitTransform"] = "translateX(0px) translateY("+toNowElem.offsetHeight+"px)";
			
			toLastElem.targetStyle = 'transform';		
			toLastElem.targetStyleValue = "translateX(0px) translateY(-"+toLastElem.offsetHeight+"px)";
			toNowElem.targetStyle = 'transform';
			toNowElem.targetStyleValue = 'translateX(0px) translateY(0px)';
			
			goTransition.maTransition.push(toLastElem);
			goTransition.maTransition.push(toNowElem);
			goTransition.play();
			
			for( var i = 0; i < toNowElem.childNodes.length; i++ ){
				if( 1 == toNowElem.childNodes[i].nodeType ){

					toNowElem.childNodes[i].style.display = "none";
					var aaaa = toNowElem.childNodes[i];
					setTimeout(function(){
						aaaa.style.display = "block";
					},10)
					

				}
			}

		},
		down: function(poConf, pdLastIdx, pdNowIdx) {

			var toLastElem = poConf.maElem[pdLastIdx];
			var toNowElem = poConf.maElem[pdNowIdx];
			
			toLastElem.style.transition = toNowElem.style.webkitTransition = toNowElem.style.transition = toNowElem.style.webkitTransition = "none";
			
			toLastElem.style["transform"] = "translateX(0px) translateY(0px)";      
			toLastElem.style["webkitTransform"] = "translateX(0px) translateY(0px)";

			toNowElem.style["transform"] = "translateX(0px) translateY(-"+toNowElem.offsetHeight+"px)";      
			toNowElem.style["webkitTransform"] = "translateX(0px) translateY(-"+toNowElem.offsetHeight+"px)";
			
			
			toLastElem.targetStyle = 'transform';
			toLastElem.targetStyleValue = "translateX(0px) translateY("+toLastElem.offsetHeight+"px)";
			toNowElem.targetStyle = 'transform';
			toNowElem.targetStyleValue = 'translateX(0px) translateY(0px)';
			
			goTransition.maTransition.push(toLastElem);
			goTransition.maTransition.push(toNowElem);
			goTransition.play();

			for( var i = 0; i < toNowElem.childNodes.length; i++ ){
				if( 1 == toNowElem.childNodes[i].nodeType ){

					toNowElem.childNodes[i].style.display = "none";
					var aaaa = toNowElem.childNodes[i];
					setTimeout(function(){
						aaaa.style.display = "block";
					},10)

				}
			}
			
		},
		left: function(poConf, pdLastIdx, pdNowIdx) {
			var toLastElem = poConf.maElem[pdLastIdx];
			var toNowElem = poConf.maElem[pdNowIdx];
			
			toLastElem.style.transition = toNowElem.style.webkitTransition = toNowElem.style.transition = toNowElem.style.webkitTransition = "none";
			
			toLastElem.style["transform"] = "translateX(0px) translateY(0px)";      
			toLastElem.style["webkitTransform"] = "translateX(0px) translateY(0px)";

			toNowElem.style["transform"] = "translateX(-"+toNowElem.offsetWidth+"px) translateY(0px)";      
			toNowElem.style["webkitTransform"] = "translateX(-"+toNowElem.offsetWidth+"px) translateY(0px)";
			
			
			toLastElem.targetStyle = 'transform';
			toLastElem.targetStyleValue = "translateX("+toLastElem.offsetWidth+"px) translateY(0px)";
			toNowElem.targetStyle = 'transform';
			toNowElem.targetStyleValue = 'translateX(0px) translateY(0px)';
			
			goTransition.maTransition.push(toLastElem);
			goTransition.maTransition.push(toNowElem);
			goTransition.play();
			for( var i = 0; i < toNowElem.childNodes.length; i++ ){
				if( 1 == toNowElem.childNodes[i].nodeType ){

					toNowElem.childNodes[i].style.display = "none";
					var aaaa = toNowElem.childNodes[i];
					setTimeout(function(){
						aaaa.style.display = "block";
					},10)
					

				}
			}
		},
		right: function(poConf, pdLastIdx, pdNowIdx) {
			var toLastElem = poConf.maElem[pdLastIdx];
			var toNowElem = poConf.maElem[pdNowIdx];
			
			toLastElem.style.transition = toNowElem.style.webkitTransition = toNowElem.style.transition = toNowElem.style.webkitTransition = "none";
			
			toLastElem.style["transform"] = "translateX(0px) translateY(0px)";      
			toLastElem.style["webkitTransform"] = "translateX(0px) translateY(0px)";

			toNowElem.style["transform"] = "translateX("+toNowElem.offsetWidth+"px) translateY(0px)";      
			toNowElem.style["webkitTransform"] = "translateX("+toNowElem.offsetWidth+"px) translateY(0px)";
			
			toLastElem.targetStyle = 'transform';
			toLastElem.targetStyleValue = "translateX(-"+toNowElem.offsetWidth+"px) translateY(0px)";
			toNowElem.targetStyle = "transform";
			toNowElem.targetStyleValue = 'translateX(0px) translateY(0px)';
			
			goTransition.maTransition.push(toLastElem);
			goTransition.maTransition.push(toNowElem);
			goTransition.play();
			for( var i = 0; i < toNowElem.childNodes.length; i++ ){
				if( 1 == toNowElem.childNodes[i].nodeType ){

					toNowElem.childNodes[i].style.display = "none";
					var aaaa = toNowElem.childNodes[i];
					setTimeout(function(){
						aaaa.style.display = "block";
					},10)
					

				}
			}
		}
	}