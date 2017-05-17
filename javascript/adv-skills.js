//******************************************************************************************
// 作用域安全的构造函数

	// 场景一
function Person(name,age,job){
	if(this instanceof Person){
		this.name = name;
		this.age = age;
		this.job = job;
	}else{
		return new Person(name,age,job);
	}
}
	// 场景二
function Polygon(sides){
	if (this instanceof Polygon) {
		this.sides = sides;
		this.getArea = function(){
			return 0;
		};
	} else {
		return new Polygon(sides);
	}
}

function Rectangle(width, height){
	Polygon.call(this, 2);
	this.width = width;
	this.height = height;
	this.getArea = function(){
		return this.width * this.height;
	};
}

Rectangle.prototype = new Polygon();   //加上这句话才正确，要不继承会出错误

//******************************************************************************************
// 惰性载入函数
	// 方法一
	function createXHR(){
		if(typeof XMLHttpRequest != "undefined"){
			createXHR = function(){

			}
		}else if(typeof ActiveXObject != "undefined"){
			createXHR = function(){

			}
		}else{
			createXHR = function(){

			}
		}
	}
	// 方法二
	var createXHR = (function(){
		if(typeof XMLHttpRequest != "undefined"){
			return function(){

			}
		}else if(typeof ActiveXObject != "undefined"){
			return function(){

			}
		}else{
			return function(){

			}
		}
	})()

//******************************************************************************************
// 数组分块技术 (array chunking)


function chunk(array,process,context){
	setTimeout(function(){
		var item = array.shift();
		process.call(context,item);
		if(array.length > 0 ){
			setTimeout(arguments.callee,100);
		}
	},100);
}

var data = [12,123,1234,453,436,23,23,5,4123,45,346,5634,2234,345,342];
function printValue(item){
	var div = document.getElementById("myDiv");
	div.innerHTML += item + "<br>";
}
// chunk(data, printValue);
// for(var i=0; i<data.length; i++){
// 	printValue(data[i])
// }
var a = data.concat();
console.log(data)
console.log(a)

data.shift();
console.log(data)
console.log(a)


