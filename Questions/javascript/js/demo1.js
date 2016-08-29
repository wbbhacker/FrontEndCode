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


