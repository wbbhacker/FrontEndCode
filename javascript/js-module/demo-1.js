this.Animal  =  this.Animal || {};
(function(){

	// 私有变量
	var _duckNum = 0;

	var _duckColor = '#fff';

	function Duck(){

		throw "Duck被做为单例来使用，不能被实例化";

	}

	Duck.WEIGHT = '5kg';

	Duck.say = function(){

	}


	function calcDuck(){

	}

	Animal.Duck = Duck;

}());
