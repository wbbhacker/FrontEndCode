
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


// 深度克隆

function clone(obj)
{
    var o,i,j,k;
    if(typeof(obj)!="object" || obj===null)return obj;
    if(obj instanceof(Array))
    {
        o=[];
        i=0;j=obj.length;
        for(;i<j;i++)
        {
            if(typeof(obj[i])=="object" && obj[i]!=null)
            {
                o[i]=arguments.callee(obj[i]);
            }
            else
            {
                o[i]=obj[i];
            }
        }
    }
    else
    {
        o={};
        for(i in obj)
        {
            if(typeof(obj[i])=="object" && obj[i]!=null)
            {
                o[i]=arguments.callee(obj[i]);
            }
            else
            {
                o[i]=obj[i];
            }
        }
    }
 
    return o;
}


//兼容IE8及以下版本 bind 方法
Function.prototype.bind = Function.prototype.bind || function (oThis) {

    if (typeof this !== "function") {

      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");

    }

    var aArgs = Array.prototype.slice.call(arguments, 1),     

        fToBind = this,

        fNOP = function () {},

        fBound = function () {

                    return fToBind.apply(this instanceof fNOP && oThis

                            ? this

                            : oThis || window,

                    aArgs.concat(Array.prototype.slice.call(arguments)));

                };

    fNOP.prototype = this.prototype;

    fBound.prototype = new fNOP();

    return fBound;

};
 



