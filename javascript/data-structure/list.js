(function() {

    function List() {
        this.listSize = 0;
        this.pos = 0;
        this.dataStore = [];
    }

    List.prototype = {

        constructor: List,
        clear: function() {
            this.dataStore = [];
            this.listSize = this.pos = 0;
        },
        getElement: function() {
            return this.dataStore[this.pos]
        },
        insert: function(n, elem) {
            this.dataStore.splice(n, 0, elem);
            this.listSize++;
        },
        append: function() {
            var args = Array.prototype.slice.call(arguments);
            var len = args.length;
            if (len == 0) return;
            for (var i = 0; i < len; i++) {
                this.dataStore.push(args[i]);
                this.listSize++;
            }
        },
        remove: function(elem) {

            this.forEach(function(v, i) {
                if (v == elem) {
                    this.dataStore.splice(i, 1);
                    this.listSize--;
                }
            }.bind(this));

        },
        find: function(elem) {

            var num;
            this.forEach(function(v, i) {
                if (v == elem) {
                    num = i;
                }
            });

            return num == undefined ? false : num;

        },
        front: function() {
            this.pos = 0;
        },
        end: function() {
            this.pos = this.listSize - 1;
        },
        prev: function() {
            this.pos = this.pos - 1 < 0 ? 0 : this.pos - 1;
        },
        next: function() {
            this.pos = this.pos + 1 > this.listSize - 1 ? this.listSize - 1 : this.pos + 1;

        },
        moveTo: function(n) {
            this.pos = n;
        },
        forEach: function(fn) {
            for (var i = 0, len = this.listSize; i < len; i++) {
                fn(this.dataStore[i], i);
            }
        }

    }
})()
