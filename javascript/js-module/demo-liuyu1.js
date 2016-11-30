var Duck = function(poConf){

	poConf.A = function(){

	}
	poConf.B = function(){
		console.log(this.name)
	}


	poConf.sex = '';

	return conf;

}

var a = Duck({
	name:'wang'
});

