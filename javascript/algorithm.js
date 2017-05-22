// ***一***
// ***冒泡排序***

// function bubbleSort(arr){
// 	console.time('改进后冒泡排序耗时');
// 	var len = arr.length;
// 	for( var i=0; i < len; i++ ){
// 		for( var j=0; j < len-1-i; j++ ){
// 			if(arr[j] > arr[j+1]){
// 				var temp = arr[j];
// 					arr[j] = arr[j+1];
// 					arr[j+1] = temp; 
// 			}
// 		}
// 	}
// 	console.timeEnd('改进后冒泡排序耗时');
// 	return arr;
// }
               
// var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
// console.log(bubbleSort(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]

// function bubbleSort2(arr) {
//     console.time('改进后冒泡排序耗时');
//     var i = arr.length-1;  //初始时,最后位置保持不变
//     while ( i> 0) {
//         var pos= 0; //每趟开始时,无记录交换
//         for (var j= 0; j< i; j++){
//             if (arr[j]> arr[j+1]) {
//                 pos= j; //记录交换的位置
//                 var tmp = arr[j]; 
// 	                arr[j]=arr[j+1];
// 	                arr[j+1]=tmp;
//             }
//         }
//         i= pos; //为下一趟排序作准备
//      }
//      console.timeEnd('改进后冒泡排序耗时');
//      return arr;
// }
// var arr1=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
// console.log(bubbleSort2(arr1));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
// // var a = [2,3,4,1,8,3,4];
// //  var b = bubbleSort(a);
// //  console.log(b);                    


// function bubbleSort3(arr3) {
//     var low = 0;
//     var high= arr.length-1; //设置变量的初始值
//     var tmp,j;
//     console.time('2.改进后冒泡排序耗时');
//     while (low < high) {
//         for (j= low; j< high; ++j) //正向冒泡,找到最大者
//             if (arr[j]> arr[j+1]) {
//                 tmp = arr[j]; arr[j]=arr[j+1];arr[j+1]=tmp;
//             }
//         --high;                 //修改high值, 前移一位
//         for (j=high; j>low; --j) //反向冒泡,找到最小者
//             if (arr[j]<arr[j-1]) {
//                 tmp = arr[j]; arr[j]=arr[j-1];arr[j-1]=tmp;
//             }
//         ++low;                  //修改low值,后移一位
//     }
//     console.timeEnd('2.改进后冒泡排序耗时');
//     return arr3;
// }
// var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
// console.log(bubbleSort3(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       


// ***二***
// ***选择排序***
// function selectionSort(arr) {
//     var len = arr.length;
//     var minIndex, temp;
//     console.time('选择排序耗时');
//     for (var i = 0; i < len - 1; i++) {
//         minIndex = i;
//         for (var j = i + 1; j < len; j++) {
//             if (arr[j] < arr[minIndex]) {     //寻找最小的数
//                 minIndex = j;                 //将最小数的索引保存
//             }
//         }
//         temp = arr[i];
//         arr[i] = arr[minIndex];
//         arr[minIndex] = temp;
//     }
//     console.timeEnd('选择排序耗时');
//     return arr;
// }
// var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
// console.log(selectionSort(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]


// ***三***
// ***插入排序***
// function insertionSort(array) {
//     if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
//         console.time('插入排序耗时：');
//         for (var i = 1; i < array.length; i++) {
//             var key = array[i];
//             var j = i - 1;
//             while (j >= 0 && array[j] > key) {
//                 array[j + 1] = array[j];
//                 j--;
//             }
//             array[j + 1] = key;
//         }
//         console.timeEnd('插入排序耗时：');
//         return array;
//     } else {
//         return 'array is not an Array!';
//     }
// }

// ***四***
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

// ***四***
// ***希尔排序***

// function shellSort(arr) {
//     var len = arr.length,
//         temp,
//         gap = 1;
//     console.time('希尔排序耗时:');
//     while(gap < len/5) {          //动态定义间隔序列
//         gap =gap*5+1;

//     }
//     for (gap; gap > 0; gap = Math.floor(gap/5)) {
//         console.log(gap)
//         for (var i = gap; i < len; i++) {
//             temp = arr[i];
//             for (var j = i-gap; j >= 0 && arr[j] > temp; j-=gap) {
//                 arr[j+gap] = arr[j];
//             }
//             arr[j+gap] = temp;
//         }
//     }
//     console.timeEnd('希尔排序耗时:');
//     return arr;
// }
// var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
// console.log(shellSort(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 

// ***五***
// ***归并排序***
function merge(left,right){

    var result = [];
    while(left.length > 0 && right.length > 0){

        if(left[0] < right[0]){
            result.push(left.shift());
        }else{
            result.push(right.shift());
        }
        
    }
    return result.concat(left,right);
}

function mergeSort(item){

    if(item.length == 1) return item;

    var middle = Math.floor(item.length/2);
    var left,right;
    left = item.slice(0,middle);
    right = item.slice(middle);

    return merge(mergeSort(left),mergeSort(right));

}

var testdata = [9,2,14,44,1,0];

console.log(mergeSort(testdata))






