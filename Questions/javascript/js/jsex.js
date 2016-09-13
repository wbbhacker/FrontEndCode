// ***一***
// 数组去重
// function Bubble( arr ){
// 	var i = 0;
// 		len = arr.length;
// 	var newArr = [];
// 	for( ; i<len; i++ ){
// 		var flag = true;
// 		for( var j = i+1; j < len; j++ ){
// 			if( arr[j] == arr[i] ){
// 				flag = false;
// 			}
// 		}
// 		if(flag){
// 			newArr.push(arr[i]);
// 		}
// 	}
// 	return newArr;
// }
// var a = [2,3,1,5,2,3,8,8,8,8,8,8];
// var b = Bubble(a);

// ***二***


// 计算斐波那契(1、1、2、3、5......)的第几个数是几?
// function getNthFibonacci(count) {
// 	var fibonacci = [1,1];
// 	if( count > 1 ){
// 		for(var i = 1; i < count; i++ ){
// 			fibonacci.push(fibonacci[fibonacci.length-1]+fibonacci[fibonacci.length-2]);
// 		}
// 	}
// 	return fibonacci[count];
// }



// function getNthFibonacci(count) {

//     if(count<0) return 0;
//     if(count<=1) return 1;
//     var first = 1;
//     var second = 1;
//     var third = 0;
//     for(var i = 2; i <= count; i++) {

//         third = first + second;
//         first = second;
//         second = third;
//     }

//     return third;
// }


// var a = getNthFibonacci(4);
// console.log(a)


// function fib(count) { 
// 	//参数判断
// 	var count = parseInt(count);
// 	if (isNaN(count) || count < 0) {
// 	    return 0;
// 	}
	 
// 	function f(count) {
// 	    if (count <= 1)
// 	        return 1;
// 	    return arguments.callee(count - 1) + arguments.callee(count - 2);    //callee是装逼用的，直接用f也行
// 	}
// 	return f(count);
// }

	// var a = fib(3);
 //    console.log(a)




///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// foo();
// function foo(){
// 	console.log(1)
// }
// var foo = function(){
// 	console.log(2)
// }

// function foo(){
// 	console.log(3)
// }




// function bindClick(){
//     var allP = document.getElementById("test").getElementsByTagName("p"),
//         i=0,
//         len = allP.length;
    
//     for( ;i<len;i++){
//         AlertP(allP[i],i);
//     }
    
//     function AlertP(obj,i){
//         obj.onclick = function(){
//             alert("you click the "+i+" P tag!");
//         }
//     }
// }
// bindClick();

