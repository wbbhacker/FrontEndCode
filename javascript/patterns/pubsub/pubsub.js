define(function() {
    var pubsub = {};

    (function(p) {
        var topics = {},
            subUid = -1;



        p.publish = function(topic, args) {

            if (!topics[topic]) {
                return false;
            }

            var subscribes = topics[topic]; 
            len = subscribes.length;
      
            while ( --len >= 0 ) {
                topics[topic][len].func(args);
            }

        };

        p.subscribe = function(topic, func) {
        	if (!topics[topic]) {
        		topics[topic] = [];
        	}
            var token = (++subUid).toString();

            topics[topic].push({
                token: token,
                func: func
            });

            return token;

        };

        p.unsubscribe = function(token) {
            for (var n in topics) {
            	var	i = 0, 
            		len = topics[n].length;
            	for ( ;i<len; i++) {
            		if (topics[n][i].token === token) {
            			topics[n].splice(i,1);
            			return token;
            		}
            	}
            }
        };

        
    })(pubsub)



    return pubsub;
})
