
// it only does '%s', and return '' when arguments are undefined
var sprintf = function (str) {
    var args = arguments,
        flag = true,
        i = 1;

    str = str.replace(/%s/g, function () {
        var arg = args[i++];

        if (typeof arg === 'undefined') {
            flag = false;
            return '';
        }
        return arg;
    });
    return flag ? str : '';
};




// 判断数组的方法

var ObjProto = Object.prototype;
var toString = ObjProto.toString;
var nativeIsArray = Array.isArray;

_.isArray = nativeIsArray || function(obj){
    return toString.call(obj) === '[object Array]';
};


// 



