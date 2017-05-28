(function(){
	function Queue(){
		this.dataStore = [];
	}

	Queue.prototype = {
		constructor:Queue,
		enqueue:function(elem){
			return this.dataStore.push(elem);
		},
		dequeue:function(){
			return this.dataStore.shift();
		},
		front:function(){
			return this.dataStore[0]
		},
		end:function(){
			return this.dataStore[this.dataStore.length-1]
		},
		show:function(){
			return this.dataStore
		},
		empty:function(){
			return this.dataStore.length == 0 ? true : false;
		}

	}


	var instance = new Queue();
	instance.enqueue(1)
	instance.enqueue(2)
	instance.enqueue(3)
	console.log(instance.show())
	console.log(instance.end())

})()