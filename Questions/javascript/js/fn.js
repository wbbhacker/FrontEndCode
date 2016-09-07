 // ***一***
 // console.log(["10","20","30"].map(parseInt))

 // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map 讲解的很好

 // ***二***
 // 函数bind(上下文参数,普通参数1，普通参数2。。。。);
 var dom = document.getElementById('ab');
 dom.onclick = (function(){
 	console.log(this);
 }).bind(this);

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
