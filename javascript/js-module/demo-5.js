/**
 * 定义原型的方法
 *
 */
var Calculaotr = function(x, y) {
    this.x = x;
    this.y = y;
};
Calculaotr.prototype = function() {
    add = function(x, y) {
        return x + y;
    };
    subtract = function(x, y) {
        return x - y;
    }
    return {
        A: add,
        S: subtract
    }
}();
