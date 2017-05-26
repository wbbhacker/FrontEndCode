(function(){
	function Stack(){
		this.dataStore = [];
		this.top = 0;
	}

	Stack.prototype = {
		constructor:Stack,
		push:function(elem){
			this.dataStore.push(elem);
			this.top++;
		},
		pop:function(elem){
			this.top--;
			return this.dataStore.pop(elem);
		},
		peek:function(){
			return this.dataStore[this.top-1];
		},
		clear:function(){
			this.dataStore = [];
			this.top = 0;
		}

	}

	//  将数字转为二进制和八进制
	
	console.log(mulbase(101,2))

	function mulbase(num,base){
		var instance = new Stack();

		do{

			instance.push(num % base);
			num = Math.floor(num/base);

		}while( num > 0) 
		
		return instance.dataStore.reverse().join('');
		
	}






})()