 // ***一***
 // console.log(["10","20","30"].map(parseInt))

 // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map 讲解的很好

 // ***二***
 // body 标签里面有10个button  ， 绑定click事件，点击那个button弹出是点击的第几个button

 // var btns = document.getElementById('button');
 // document.addEventListener('click',function(e){

 // 	if( e.target.nodeName == 'BUTTON' ){

 // 		var self = e.target;

 // 		return function(a){
 			



 // 		}(self)

 // 	}

 // },false)


  //比较函数
 // function createComparison(propertyName) {
 // 		console.log('this')
 //      return function (obj1, obj2) {
 //          var item1 = obj1[propertyName];
 //          var item2 = obj2[propertyName];
 //          console.log("ss")
 //         if (item1 < item2)
 //             return -1;

 //         if (item1 > item2)
 //             return 1;

 //         if (item1 == item2)
 //             return 0;
 //     }
 // }

 // //比较name
 // var compare = createComparison("name");

 // var result = compare({ name: "d", age: 20 }, { name: "c", age: 27 });


