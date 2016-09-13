	(function(){
		/**
		 * @param  	{DOM}		poNode      	父元素
		 * @param  	{Callback}	imgLoad      	每张图片加载完毕的回调
		 * @param	{Callback}  allImgLoad		全部图片加载完毕的回调
		 */
		var imgLoadOver = function( pconf ){
			this.wrap = pconf.poNode;
			this.onff = true;
			this._imgSum = undefined;
			this.imgLoad = pconf.imgLoad;
			this.allImgLoad = pconf.allImgLoad;
			this.init();
		}	
		imgLoadOver.prototype = {
			init:function(){
				this.allImg();
			},
			allImg:function(){
				var self = this;
				var paElem = this.wrap,
					chElem = self.imgSum = paElem.getElementsByTagName("img");
				var i = 0, 
					len = self._imgSum = chElem.length;
				for( ; i < len; i++ ){
					if( false == chElem[i].complete )
						self.onff = false;
				}
				if( true == self.onff ){
					self.allImgLoad();
				}else{
					self.eachImg(chElem);
				}
			},
			eachImg:function( poElem ){
				var self = this;
				var i = 0,
					len = poElem.length;
				for( ; i < len; i++ ){
					poElem[i].onload = function(){
						self.imgLoad();
						--self._imgSum;
						if( 0 == self._imgSum )
							self.allImgLoad();
					}
				}

			}
		}
		window.imgLoadOver = imgLoadOver;
	}())