//  公用插件 及  列表效果

(function($){

	
	/** radio 美化插件
     *
     * @param radioClassName     radio类名
     * @param activeClassName    radio active时类名
     * @param nowIndex  默认选中第几个
     * @param clickCallback 点击时执行的回调
    */

	$.fn.radioPlug = function(options){

		var defaults = {
			nowIdx:0,                
			prevObj:null,		//上一个操作对象
			prevIdx:undefined   //上个对象的idx
		};

		var setting = $.extend({},defaults,options);

		var radioPlug = function(e){	
			
			this.tJqAs = $("."+setting.radioClassName);
			this.init();

		}

		radioPlug.prototype = {

			init:function(){

				// 添加标示 区分点击对象
				$("."+setting.radioClassName).each(function(index,elem){
					$(elem).attr("data-index",index);
				});

				// 默认选择项
				this.handle(setting.nowIdx,setting.activeClassName);

				//  添加事件
				this.event();
			},

			handle:function(index,activeClassName){

				var  nowObj = this.tJqAs.eq(index);
			
				nowObj.addClass(activeClassName);

				// 上一个对象的序号
				setting.prevIdx = setting.prevIdx == undefined ? setting.nowIdx : setting.prevObj.attr("data-index");
				
				//执行回调
				if( setting.clickCallback ) 
					setting.clickCallback(index,setting.prevIdx);

				// 判断上个对象是否存在并且不等于当前点击的对象
				if( setting.prevObj && nowObj.attr("data-index") !== setting.prevObj.attr("data-index") ){					
					setting.prevObj.removeClass(activeClassName);
				}
				
				//把当前对象赋值给上一个对象
				setting.prevObj = nowObj;
			},
			
			event:function(){

				var _slef = this;

				this.tJqAs.click(function(){

					var acitveIdx = $(this).attr("data-index");

					_slef.handle(acitveIdx,setting.activeClassName);

				})
				
			}
		}
		
		var instance = new radioPlug();

		return instance;
	}

})(jQuery)
