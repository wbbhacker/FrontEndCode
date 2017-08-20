// *** 一 ***
// var n = 0;
// function a(){
// 	var n = 10;
// 	function b(){
// 		n++;
// 		console.log(n)
// 		// console.log('1')
// 	}
// 	b();
// 	// console.log('2')
// 	return b;
// }
// var c = a();
// c();
// console.log(n);

// 词法作用域规则：函数的嵌套关系是定义时决定的，而非调用时决定的，即词法作用域，即嵌套关系是由词法分析时确定的，而非运行时决定。

// *** 二 ***
// var name = 'wang';

// function echo(){
// 	console.log(name);
// }

// function env(){
// 	var name = 'eve';
// 	echo();
// }

// env();

// 一和二对比可知函数在那个作用域下定义，那此函数就在那个作用域下开始往作用域链上找变量;


// *** 三 ***

// function b(x,y,a){
// 	arguments[2] = 10;
// 	console.log(a);
// }
// b(1,2,3)

// *** 四 ***

// if(!("a" in window)){
// 	var a = 1;
// }
// console.log(a)
/*首先会解析所有函数，其次是var声明的变量，但是不会赋值;因为javascript没有块的概念，像
	for(var i in array)这里的i依然是全局变量。因此，这几行代码的执行顺序是：
	1.var a; //声明一个变量，但是不会赋值
	2.if语句，全局变量相当于window的属性，所以"a" in window为真，取反为假。故不会执行大括号里面的语句
	3.console.log(a) // undefined	
*/


// *** 五 ***

// var a = 10;

// function test(){
// 	a = 100;
// 	b = 10;

// 	console.log(this);
// 	console.log(a);
// 	console.log(this.a);
// 	var a;
// 	console.log(a)
// }
// test();




// *** 六 ***
// var name = "The window";
// var object = {
// 	name:"My Object",
// 	getNameFunc:function(){
// 		var a = 1;
// 		return function(){
// 			console.log(a)
// 			console.log(this)
// 			return this.name;
// 		};
// 	}
// };
// console.log(this.name);
// console.log(object.getNameFunc()());




// *** 七 ***

// var a = "a";
// function say(word) {

// }

// function execute(someFunction, value) {
// 	var  a = "b";
//     someFunction(a);
// }

// execute(say, "Hello");


// ***八***

// var a = 1;

// function demo(){
// 	console.log(a)
// }
// function test(conf){
// 	var a = 2;
// 	conf();
// }
// test(demo);
// 见 一、二

// ***九***
// 请写出下面代码段结果
// function fun(n,o){

// 	console.log(o);

// 	return {
// 		fun:function(m){
// 			return fun(m,n);
// 		}
// 	};
// };
// var a = fun(0); a.fun(1); a.fun(2); a.fun(3);   
// var b = fun(0).fun(1).fun(2).fun(3);   
// var c = fun(0).fun(1); c.fun(2); c.fun(3); 


// 闭包的作用：
// 1.匿名自执行函数
// 2.延长作用域链
// 3.封装  实现对象的私有方法，等 （隐藏对象的细节）
// 4.

// ***十***
// 非严格模式下执行以下代码段， 请输出最终结果
// function fn(){
// 	prop = function (){ console.log(1); };
// 	return this;
// }
// fn.prop = function (){ console.log(2); };
// fn.prototype.prop = function (){ console.log(3); };
// var prop = function (){ console.log(4); };
// function prop() {console.log(5)};

// // 连续代码段， 不是独立的

// fn.prop();  //2
// prop();  //  4
// fn().prop(); //1
// prop(); // 1
// new fn.prop();
// new fn().prop();
// new new fn().prop();

// ***十一***
// console.log(x);//输出：function x(){}
// var x=1;
// function x(){}



// ***十二***

// function a(){

// 	console.log(this)

// 	console.log("我是内部");

// 	this.name = function(){
// 		console.log("我是内部的方法")
// 	}();

//  	console.log(this)

// 	// return this
// 	// return "c"
// 	// return {}
// 	// 没有return 的情况下返回什么

// }

// a.prototype.say = function(){

// 	console.log("我是原型链")

// }();

// console.log( new a() );


// 如果 return "c"
//    console.log(new a())  打印值为？
//  如果没有return 
// 	console.log(new a())  打印值为？




// ***十三***

// 写一个add函数实现以下结果
// add(2,5);   // 结果是7
// add(2)(5);  // 结果为7

// function add(){
// 	var a = arguments[0];
// 	if(arguments.length == 2){
// 		return arguments[0] + arguments[1] ;
// 	}else{
// 		return function(){
// 			return a + arguments[0];
// 		}
// 	}
// }

// function add(x,y){
// 	var len = arguments.length;
// 	var c = x;
// 	if( len == 2 ){
// 		return x + y;
// 	}
// 	if( len == 1 ){
// 		return function(x){
// 			return c + x;
// 		}
// 	}
// }
// console.log(add(2,5))
// console.log(add(2)(5))


// ***十四***
// 下面函数存在的问题？

// function point(x,y){
// 	if(!x){
// 		x = 320;
// 	}
// 	if(!y){
// 		y = 240;
// 	}
// 	return {x:x,y:y}
// }
// // point(2,3)
// console.log(point(2,3))




// ***十五***
// 说说下面输出的原因
// var s1 = new String('hello');
// var s2 = new String('hello');

// console.log(s1 === s2)
// console.log(s1)
// console.log(s2)

// var s3 = 'hello';
// var s4 = 'hello';


// var a = 'sssss';
// var b = a;
// console.log(s3 === s4)
// console.log(s3)
// console.log(s4)

// console.log([1,2] == [1,2])

// var s5 = String('hello');
// var s6 = String('hello');

// console.log(this)
// console.log(typeof s3)


// ***十六***
// 尾递归 和 递归
// 二叉树 搞计算器  evel（）

// ***十七***

// console.log(undefined == null);
// console.log(undefined === null);
// console.log(undefined == NaN);
// console.log(undefined === NaN);
// console.log( null == NaN );
// console.log( null === NaN );
// console.log( undefined == 0)
// console.log( undefined === 0)
// console.log( null == 0 )
// console.log(++undefined)
// console.log( null === 0 )

// console.log(Number(null))

// console.log(var undefined);
// console.log([] == false );
// console.log( [] == ![] );

// console.log(2+true)
// console.log(!!(0 == false))
// console.log(!!( 0 == undefined ))
// console.log(undefined == null )
// console.log(isNaN("1312") == NaN )
// console.log(typeof 1 == true ? 1 : 0) 
// console.log(typeof [] == "array")
// console.log([] instanceof Array )


// console.log(2&3)
// 	console.log(2|3)
// 	console.log(~true)    //true boolean   -2
// 	console.log(NaN == NaN)    //true boolean   -2
// 	console.log(undefined == undefined)    //true boolean   -2
// 	console.log(null == null)    //true boolean   -2
// 	console.log( typeof(NaN) )    
// 	console.log( typeof(undefined) )    
// 	console.log( typeof(null) )    
// 	console.log( typeof([]) )    

// ***十八***

// for(var i=0; i<3; i++ ){
// 	setTimeout(function(){
// 		console.log(i);	
// 	},(function(){
// 		var b = i*1000;
// 		console.log(b);
// 		return b;
// 	})())
// }

// ***十九***

// function Person(){
// 	this.sex = "man"
// }
// function animation(){
 
// }
// function goods(){
// 	this.name = '冰激淋';
// 	this.say = function(){
// 		console.log('ss')
// 	}
// }
// function sun(){

// }
// console.log(Person.prototype)

// Person.prototype = {
// 	constructor:Person,
// 	name:"N"
// }
// goods.prototype = {
// 	name:"goods",
// 	say:function(){
// 		console.log('www')
// 	}
// }
// animation.prototype.run = {
// 	name:"animation"
// }

// var friend = new Person();
// var goodss = new goods();

// var runs = new animation();

// console.log(sun.prototype)

// console.log(friend.__proto__)	 //
// console.log(goodss.__proto__)    //  这就是有无constructor

// console.log(friend.sex)
// console.log(goodss.name)
// goodss.say(); 

// console.log(Function.__proto__ == Person.__proto__)

// console.log(typeof Person)

// console.log(animation.prototype)

// console.log(friend.prototype)

// 为什么new 出来的实例 的prototype 为undefined
// console.log({}.prototype)
// console.log({}.__proto__)
// console.log({}.__proto__.__proto__)

// console.log(runs.__proto__)	     //
// console.log(goodss instanceof goods)
// console.log(goodss.__proto__ === goods.prototype )
// console.log(goods.prototype)
// console.log(goods.prototype)


// console.log(friend.__proto__ === Person.prototype )
// console.log(friend.__proto__ )


// console.log(friend instanceof Object )
// console.log(friend instanceof Person )
// console.log(friend.constructor)
// console.log( friend.constructor == Person )
// console.log( friend.constructor == Object )

// function Person(){

// }
// Person.prototype = {
// 	constructor:Person,
// 	name:"N"
// }
// var friend = new Person();
// console.log( friend.constructor == Person )
// console.log( Person.prototype )
// console.log( friend.constructor == Object )
// console.log(friend)
// console.log(document.getElementsByTagName('div'))

// ***二十***

// var foo = {},
//     F = function(){};

// Object.prototype.a = 'value a';
// Function.prototype.b = 'value b';

// console.log(foo.a)    // value a
// console.log(foo.b)    // undefined
// console.log(F.a)      // value a
// console.log(F.b)      // value b
// console.log(Object.prototype.__proto__)

// console.log(Function.__proto__)

// foo.a的查找路径: foo自身: 没有 ---> foo.__proto__(Object.prototype): 找到value a
// foo.b的查找路径: foo自身: 没有 ---> foo.__proto__(Object.prototype): 没有 ---> foo.__proto__.__proto__ (Object.prototype.__proto__): 没有
// F.a的查找路径: F自身: 没有 ---> F.__proto__(Function.prototype): 没有 ---> F.__proto__.__proto__(Object.prototype): 找到value a
// F.b的查找路径: F自身: 没有 ---> F.__proto__(Function.prototype): 找到value b


// function a(){
// 	this.name = "wang";

// }
// var b = new a();
// console.log(b.__proto__)
// console.log(a.__proto__.__proto__)
// console.log(Object.__proto__)

// console.log(Object.prototype)

// console.log(Object.prototype == Object.__proto__)

// console.log({}.__proto__ === Object.prototype )


// 关于instanceof的结果不要仅从字面上理解, 它的计算规则是: 如果右侧构造函数的prototype属性能在左侧的对象的原型链中找到, 那么就返回true, 否则就返回false

// Object intanceof Function: Object.__proto__ === Function.prototype, 因为结果为true
// Function instanceof Object: Function.__proto__.__proto__ === Object.prototype, 因为结果也为true

// ***二十***

// function foo(){this.value =42;}

// foo.prototype = {method:function(){return false}};

// function bar(){
// 	var value = 1;
// 	return {method:function(){ return value}};
// }

// foo.prototype = new bar();

// console.log(foo.prototype.constructor);
// console.log(foo.prototype instanceof bar);

// var test = new foo();

// console.log(test instanceof foo);

// console.log(test.__proto__)
// console.log(test instanceof bar);



// console.log(test.method())




// ***二十一***

// function SuperType(){
// 	this.colors = ["red","blue"];
// }
// function SubType(){
// 	this.name="s";
// 	SuperType.call(this);
// }
// var instance1 = new SubType();

// console.log(instance1.__proto__)                                //原型链是对象
// console.log(SubType.__proto__)
// console.log(instance1.__proto__.__proto__.__proto__)            //

// var a = {};
// var b = function(){};
// var c = 'hello';
// console.log(a.prototype)
// console.log(b.prototype)
// console.log(c.prototype)
// console.log(typeof Object)

// var Person = function(){};  
// Person.prototype.type = 'Person';  
// Person.prototype.maxAge = 100;

// var p = new Person();  
// p.name = 'rainy';

// console.log(Person.prototype.constructor === Person);  //=> true  
// console.log(p.__proto__ === Person.prototype);         //=> true  
// console.log(p.prototype);                 //=> undefined  

// ***二十二***
//
// var color = "red";
// var o = {
// 	color:"blue"
// }

// function getColor(){
// 	console.log(this.color)	
// }


// getColor();     		//call和apply真正强大的地方是能够扩充函数赖以运行的作用域。
// getColor.call(o);       //在使用call方法时，传递给函数的参数必须逐个列举出来。
// getColor.apply(o);		//在使用apply方法时，传递给函数的第二个参数是Array实例。


// ***二十三***

// function b(x, y, a) {

// 	arguments[2] = 10;         //它的值永远与对应名字参数的值保持同步。
// 	console.log(a)

// }
// b(1, 2, 3);  //  10
// function c(x, y, a) {

// 	a = 10;          
// 	console.log(arguments[2] )  //它的值永远与对应名字参数的值保持同步。

// }
// c(1,2,3)


// ***二十四***
// n = 1;
// var n = 4
// console.log(n)
// var n = 4
// n = 1; 
// console.log(n)



// ***二十五***
  // n = 1;
	 //  function f1(){
	 //  	test = 10;
	 //  	var n = 999;
	 //  	nAdd = function(){ n += 1 }
	 //  	function f2(){
	 //  		return n;
	 //  	}
	 //  	return f2;
	 //  }
	 //  var result = f1()();
	 //  console.log(result)

// ***二十六***
// 	  	var n = 888;
// 		function f1(){
// 	　　　　var n=999;
// 	　　　  nAdd=function(){n+=1}   // var nAdd=function(){n+=1}
// 	　　　　function f2(){
// 				console.log(n);
// 	　　　　}
// 	　　　　return f2;
// 　　    }
// 	　　var result=f1();
// 	　　result(); // 999
// 	　　nAdd();
// 	　　result(); // 1000

// ***二十七***
// var name = "The Window";

// 	   var object = {
// 		   	name : "My Object",
// 		   	getNameFunc : function(){
// 		   		return function(){
// 		   			return this.name;
// 		   		}
// 		   	}
// 	   }


// 	   console.log(object.getNameFunc()());


   // var name = "The Window";

   // var object = {
	  //  	name : "My Object",
	  //  	getNameFunc : function(){
	  //  		console.log("this")
	  //  		var that = this;
	  //  		return function(){
	  //  			console.log('this')
	  //  			return that.name;
	  //  		}
	  //  	}
   // }

   // console.log(object.getNameFunc()());


// ***二十七***

// for( var i=0,j=0; j < 10,i < 6; i++, j++ ){
// 	k = i +j;
// }
// console.log(k)

// ***二十八***
// var x = 1;
// 	var y = 0;
// 	var z = 0;
// 	function add(n){ 
// 		n = n+1;
// 		return n;
// 	};
// 	y = add(x);
// 	function add(n){ 
// 		n = n+4;
// 	};
// 	z = add(x);
// 	console.log(y);
// 	console.log(z);



// ***二十九***
// var Obj=function(msg){

// 		this.msg=msg;

// 		this.shout=function(){
// 		              console.log(this.msg);
// 		}

// 		this.waitAndShout=function(){

// 					var aaa = function(ss){
// 						var b = ss;
// 						return function(){
// 							console.log(b);
// 						}
// 					}

// 		            setTimeout(aaa(this.msg), 2000);
// 		}
// 	}
// var aa=new Obj("abc");
// aa.waitAndShout();


// ***二十九***  
// var t=true;                 //js 是单线程语言
// setTimeout(function(){
//    console.log(123);
//     t=false;
// },1000);

// while(t)
// { }
// console.log('end');


// ***三十*** 

// if (typeof Object.beget !== 'function') {
//     Object.beget = function(o) {
//         var F = function() {};
//         F.prototype = o;
//         return new F();
//     };
// }


// window.onload = function() {
//     var Dog = {
//         wow: function() {
//             console.log('wow');
//         },
//         yelp: function() {
//             return this.wow();
//         }
//     };

//     var MadDog = Object.beget(Dog);

//     console.log(MadDog.__proto__ )

//         MadDog = {
// 	        madYelp: function() {
// 	         var _self = this;
// 	            setInterval(function() {              
// 	                return _self.wow();
// 	            }, 2000);
// 	        }
// 	    };

// 	    MadDog.madYelp = function() {
// 	         var _self = this;
// 	            setInterval(function() {              
// 	                return _self.wow();
// 	            }, 2000);
// 	    }


//     //test xiaoXian
//     var xiaoXian = Object.beget(Dog);
//     var xiaoXianBtn = document.getElementById('xiaoXianBtn');
//     xiaoXianBtn.onclick = function() {
//         xiaoXian.yelp();
//     };

//     //test xiaoMang
//     var xiaoMang = Object.beget(MadDog);
//     var xiaoMangBtn = document.getElementById('xiaoMangBtn');
//     xiaoMangBtn.onclick = function() {
//         xiaoMang.madYelp();
//     };
// };	


// ***三十一*** 
// var x = 100;  
// var inc = function(){  
//   var x = 0;
//   return function(){
//     console.log(x++);
//   };
// };

// var inc1 = inc();  
// var inc2 = inc();

// inc1();  // -> 0  
// inc1();  // -> 1  
// inc2();  // -> 0  
// inc1();  // -> 2  
// inc2();  // -> 1  
// x;       // -> 100  


// ***三十二*** 

// var name = "global";  
// var oo = {  
//   name: "oo",
//   getNameFunc: function(){
//     return function(){
//       return this.name;
//     };
//   }
// }
// var ooo = {  
//   name: "ooo",
//   getName: oo.getNameFunc() // 此时闭包函数的this被绑定到新的Object
// };

// console.log(ooo.getName())


// ***三十三*** 
// function Foo(){
//     Foo.a=function(){ console.log(4,this)}
    
//     this.a=function(){ console.log(3,this)}

//     a=function(){ console.log(1,this)}
//     return this;
// }

// Foo.a=function(){ console.log(10)}
// Foo.prototype.a=function(){ console.log(13)}
// var a=function(){ console.log(11)}
// function a(){console.log(12)}


// Foo()
// Foo.a()
// a()
// Foo().a()
// new Foo().a()
// new Foo.a()