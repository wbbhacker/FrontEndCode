define(function(){

	var superMan = function(name){
		this.name = name;
	}

	superMan.prototype = {
		fly:function(){
			console.log('this is fly.')
		}
	}

	return superMan

})