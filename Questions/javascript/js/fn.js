 // ***一***
 // console.log(["10","20","30"].map(parseInt))

 // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map 讲解的很好

 // ***二***
 // body 标签里面有10个button  ， 绑定click事件，点击那个button弹出是点击的第几个button

 var btns = document.getElementById('button');
 document.addEventListener('click',function(e){

 	if( e.target.nodeName == 'BUTTON' ){

 		var self = e.target;

 		return function(a){
 			


 			
 		}(self)

 	}

 },false)


