var Duck = function(poConf){

	Duck.A = function(){

	}
	Duck.B = function(){
		console.log(poConf.name)
	}

	return poConf;

}

var a = Duck({
	name:'wang'
});

console.log( Duck.B() )

