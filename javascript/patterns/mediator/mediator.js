var mediator = function(){
	//存储可被广播或监听的topic
	var topics = {};

	//订阅一个topic，提供一个回调函数，一旦topic被广播就执行该回调

	var subscribe = function (topic,fn){

		if(!topics[topics]){
			topics[topic] = [];
		}

		topics[topic].push({ context : this, callback : fn });

		return this;

	}

	// 发布/广播事件到程序的剩余部分
	var publish = function(topic){

		var args;

		if(!topics[topic]){
			return false;
		}

		args = Array.prototype.slice.call(arguments,1);

		for(var i=0 ; i < topics[topic].length; i++){

			var subscription = topics[topic][i];
			subscription.callback.apply(subscription.context, args);

		}
		return this;

	}

	return {
		Publish: publish,
		Subscribe: subscribe,
		installTo: function(obj){

			obj.subscribe = subscribe;
			obj.publish = publish;

		}
	}

}()