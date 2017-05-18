(function(){

	/*
	*	autoTab Plug
	*	Author；xiaobin 2015-1-10
	*	Version: 1.0 
	*/ 

	function autoTab(o){

		this.toTabCons = getChild($(o.tabShow),o.tabShow_child) || null;

		this.gotoNext = function(index){
			var toTabCons =  this.toTabCons;
			if( null != toTabCons ){
				for( var i = 0, len = toTabCons.length; i < len; i++ ){
					toTabCons[i].style.display = "none";
				}
			}
			toTabCons[index].style.display = "block";
		};

		this.gotoNext(0);

		this.menuHinder = function(){
			_this = this;
			var toTabMune = getChild($(o.tabMune),o.tabMune_child) || null;
			if( null != toTabMune ){
				for( var i = 0, len = toTabMune.length; i < len; i++  ){
					var hinder = function(p){
						var a = p;
						return function(){
							_this.gotoNext(a);
						}
					}
					bind(toTabMune[i],'mouseover',hinder(i));
				}
			}
		}
		this.menuHinder();
	}

	function bind(elem,type,hinder){
		if(elem.addEventListener){
			elem.addEventListener(type,hinder,false);
		}else if(elem.attachEvent){
			 elem.attachEvent("on" + type, handler);
			}else{
				elem["on" + type] = handler;
			}
	}
	function $(id){
		return document.getElementById(id);
	}

	function getChild(elem,classname){
		var toChildren = elem.childNodes,
			arr = [];
		for( var i = 0, len = toChildren.length; i < len; i++ ){
			if( 1 == toChildren[i].nodeType ){
				if( -1 != toChildren[i].className.indexOf(classname) ){
					arr.push(toChildren[i]);
				}
			}
		}
		return arr;
	}
	window.autoTab = autoTab;
})();