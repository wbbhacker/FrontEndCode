// *** 一 ***
// var n = 0;
// function a(){
// 	var n = 10;
// 	function b(){
// 		n++;
// 		console.log(n)
// 		console.log('1')
// 	}
// 	b();
// 	console.log('2')
// 	return b;
// }
// var c = a();
// c();
// console.log(n);



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
//   console.log(a);
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
// fn.prop();
// prop();
// fn().prop();
// prop();
// new fn.prop();
// new fn().prop();
// new new Foo().getName();

// ***十一***
// console.log(x);//输出：function x(){}
// var x=1;
// function x(){}

// console.log(undefined == null);
// console.log(undefined === null);
// console.log(undefined == NaN);
// console.log(undefined === NaN);
// console.log( null == NaN );
// console.log( null === NaN );
// console.log( undefined == 0)
// console.log( undefined === 0)
// console.log( null == 0 )
// console.log( null === 0 )

// console.log(Number(null))

// console.log(var undefined);
// console.log([] == false );
// console.log( [] == ![] );

// console.log(2+true)

// ***十二***
// function a(){
// 	console.log(this)
// 	console.log("我是内部");
// 	this.name = function(){
// 		console.log("我是内部的方法")
// 	}();

//  	console.log(this)

// 	return {
// 		b:"c"
// 	}
// 	// return "c"
// 	// 没有return 的情况下返回什么

// }
// a.prototype.say = function(){
// 	console.log("我是原型链")
// }();

// console.log(new a());

// 如果 return "c"
   // console.log(new a())  打印值为？
//  如果没有return 
	// console.log(new a())  打印值为？




// ***十三***
// 写一个add函数实现以下结果
// add(2,5);   // 结果是7
// add(2)(5);  // 结果为7
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
下面函数存在的问题？
function point(x,y){
	if(!x){
		x = 320;
	}
	if(!y){
		y = 240;
	}
	return {x:x,y:y}
}
point(0,0)
console.log(point(0,0))




// ***十五***
// 说说下面输出的原因
var s1 = new String('hello');
var s2 = new String('hello');

console.log(s1 === s2)
console.log(s1)
console.log(s2)

var s3 = 'hello';
var s4 = 'hello';
console.log(s3 === s4)
console.log(s3)
console.log(s4)


// ***十六***
// 尾递归 和 递归
// 二叉树 搞计算器  evel（）