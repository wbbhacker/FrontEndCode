/*****************测试一*******************/

var start = new Date();

var end = 0;

setTimeout(function() {

    console.log(new Date() - start);

}, 500);

while (new Date() - start <= 1000) {}


/*****************测试二*******************/
// 实时获取输入框的内容 方法一
document.querySelector('#one input').onkeydown = function() {

    document.querySelector('#one span').innerHTML = this.value;

};

document.querySelector('#second input').onkeydown = function() {
    setTimeout(function() {

        document.querySelector('#second span').innerHTML = document.querySelector('#second input').value;

    }, 0);

};

// 当你往两个表单输入内容时，你会发现未使用setTimeout函数的只会获取到输入前的内容，而使用setTimeout函数的则会获取到输入的内容。

// 这是为什么呢？

// 因为当按下按键的时候，JavaScript 引擎需要执行 keydown 的事件处理程序，然后更新文本框的 value 值，这两个任务也需要按顺序来，事件处理程序执行时，更新 value值（是在keypress后）的任务则进入队列等待，所以我们在 keydown 的事件处理程序里是无法得到更新后的value的，而利用 setTimeout(fn, 0)，我们把取 value 的操作放入队列，放在更新 value 值以后，这样便可获取出文本框的值。

// 未使用setTimeout函数，执行顺序是：onkeydown => onkeypress => onkeyup

// 使用setTimeout函数，执行顺序是：onkeydown => onkeypress => function => onkeyup


// 方法二  长按的话就不会实时同步了

document.querySelector('#third input').addEventListener('keyup', function() {
    document.querySelector('#third span').innerHTML = document.querySelector('#third input').value;

});

/*****************测试四*******************/

document.querySelector('#test').addEventListener('keydown', function() {
    console.log('keydown')
})
document.querySelector('#test').addEventListener('keypress', function() {
    console.log('keypress')
})
document.querySelector('#test').addEventListener('keyup', function() {
    console.log('keyup')
})

/*****************测试五*******************/
// setTimeout 传参数
setTimeout(function(a, b) {

    console.log(a); // 3

    console.log(b); // 4

}, 0, 3, 4);
