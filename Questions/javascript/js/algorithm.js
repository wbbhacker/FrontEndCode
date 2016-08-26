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
  //    			var c = arr[i];
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