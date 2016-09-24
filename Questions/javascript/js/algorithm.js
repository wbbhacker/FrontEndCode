// ***一***
// ***快速排序***

// function qSort(list){
// 	if( list.length == 0){
// 		return [];
// 	}
// 	var lesser = [],
// 		greater = [],
// 		pivot = list[0];
// 	for( var i=1; i<list.length; i++ ){
// 		if( list[i] < pivot ){
// 			lesser.push(list[i]);
// 		}else{
// 			greater.push(list[i]);
// 		} 
// 	}
// 	return qSort(lesser).concat(pivot,qSort(greater));
// }

// var a = [2,3,4,1,8,3,4];
// var b = qSort(a);
// console.log(b);



// ***二***
// ***冒泡排序***
 // function bubbleSort( arr ){

 // 	var len = arr.length;
 //    for( var i=0; i<len; i++ ){
 //    	for( var j=i+1; j<len; j++ ){
 //    		if( arr[i] - arr[j] >= 0 ){
  //    		var c = arr[i];
	// 			arr[i] = arr[j];
	// 			arr[j] = c;
 //    		}
 //    	}
 //    }
 //    return arr;
 // }
 // var a = [2,3,4,1,8,3,4];
 // var b = bubbleSort(a);
 // console.log(b);

function bubbleSort(arr){
	console.time('改进后冒泡排序耗时');
	var len = arr.length;
	for( var i=0; i < len; i++ ){
		for( var j=0; j < len-1-i; j++ ){
			if(arr[j] > arr[j+1]){
				var temp = arr[j];
					arr[j] = arr[j+1];
					arr[j+1] = temp; 
			}
		}
	}
	console.timeEnd('改进后冒泡排序耗时');
	return arr;
}
               
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(bubbleSort(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
function bubbleSort2(arr) {
    console.time('改进后冒泡排序耗时');
    var i = arr.length-1;  //初始时,最后位置保持不变
    while ( i> 0) {
        var pos= 0; //每趟开始时,无记录交换
        for (var j= 0; j< i; j++){
            if (arr[j]> arr[j+1]) {
                pos= j; //记录交换的位置
                var tmp = arr[j]; 
	                arr[j]=arr[j+1];
	                arr[j+1]=tmp;
            }
        }
        i= pos; //为下一趟排序作准备
     }
     console.timeEnd('改进后冒泡排序耗时');
     return arr;
}
var arr1=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(bubbleSort2(arr1));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
// var a = [2,3,4,1,8,3,4];
//  var b = bubbleSort(a);
//  console.log(b);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
