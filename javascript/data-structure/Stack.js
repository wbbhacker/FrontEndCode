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

	// 数制间的相互转换

	function mulbase(num,base){
		

		
		
	}






})