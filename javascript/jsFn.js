
// it only does '%s', and return '' when arguments are undefined

// var sprintf = function (str) {
//     var args = arguments,
//         flag = true,
//         i = 1;

//     str = str.replace(/%s/g, function () {
//         var arg = args[i++];

//         if (typeof arg === 'undefined') {
//             flag = false;
//             return '';
//         }
//         return arg;
//     });
//     return flag ? str : '';
// };



// 判断数组的方法

// var ObjProto = Object.prototype;
// var toString = ObjProto.toString;
// var nativeIsArray = Array.isArray;

// _.isArray = nativeIsArray || function(obj){
//     return toString.call(obj) === '[object Array]';
// };


// 深度克隆

// function clone(obj)
// {
//     var o,i,j,k;
//     if(typeof(obj)!="object" || obj===null)return obj;
//     if(obj instanceof(Array))
//     {
//         o=[];
//         i=0;j=obj.length;
//         for(;i<j;i++)
//         {
//             if(typeof(obj[i])=="object" && obj[i]!=null)
//             {
//                 o[i]=arguments.callee(obj[i]);
//             }
//             else
//             {
//                 o[i]=obj[i];
//             }
//         }
//     }
//     else
//     {
//         o={};
//         for(i in obj)
//         {
//             if(typeof(obj[i])=="object" && obj[i]!=null)
//             {
//                 o[i]=arguments.callee(obj[i]);
//             }
//             else
//             {
//                 o[i]=obj[i];
//             }
//         }
//     }
 
//     return o;
// }


//兼容IE8及以下版本 bind 方法

// Function.prototype.bind = Function.prototype.bind || function (oThis) {

//     if (typeof this !== "function") {

//       // closest thing possible to the ECMAScript 5 internal IsCallable function
//       throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");

//     }

//     var aArgs = Array.prototype.slice.call(arguments, 1),     

//         fToBind = this,

//         fNOP = function () {},

//         fBound = function () {

//                     return fToBind.apply(this instanceof fNOP && oThis

//                             ? this

//                             : oThis || window,

//                     aArgs.concat(Array.prototype.slice.call(arguments)));

//                 };

//     fNOP.prototype = this.prototype;

//     fBound.prototype = new fNOP();

//     return fBound;

// };



// bind的实现思想是： 1. 利用apply 改变对象
                //    2. 要实现继承



// 函数去抖
//对于高耗能事件，debounce 函数是一种不错解决方案。如果你不对 scroll、resize、和 key* 事件使用 debounce  函数，
//那么你几乎等同于犯了错误。下面的 debounce 函数能让你的代码保持高效：
//  返回一个函数，如果它被不间断地调用，它将不会得到执行。该函数在停止调用 N 毫秒后，
//再次调用它才会得到执行。如果有传递 ‘immediate’ 参数，会马上将函数安排到执行队列中，而不会延迟。

 // function debounce(func, wait, immediate) {
 //        var timeout;
 //        return function() {

 //            var context = this, args = arguments;
 //            var later = function() {
 //                timeout = null;
 //                if (!immediate) func.apply(context, args);
 //            };
 //            var callNow = immediate && !timeout;

 //            clearTimeout(timeout);
 //            timeout = setTimeout(later, wait);
            
 //            if (callNow) func.apply(context, args);


 //        };
 //    };
     
function debounce(func,wait,immediate){

    var imeout;

    return function (){

        clearTimeout(timeout);

        timeout = setTimeout(func,wait)
    }
}



    // 用法
    var myEfficientFn = debounce(function() {
            console.log("dd")
    }, 1000);
    window.addEventListener('resize', myEfficientFn);

// 函数节流 throttle

//　　如果将水龙头拧紧直到水是以水滴的形式流出，那你会发现每隔一段时间，就会有一滴水流出。
//　也就是会说预先设定一个执行周期，当调用动作的时刻大于等于执行周期则执行该动作，然后进入下一个新周期。

var throttle = function(delay, action){
    var last = 0;
    return function(){

        var curr = +new Date()

        if (curr - last > delay){
            action.apply(this, arguments)
            last = curr 
        }
    }
}