define(function(){

	var xMan = function(name){
		this.name = name;
	}
	xMan.prototype.crit = function(){
			console.log('this is cirt.')
	}


	return xMan;

})