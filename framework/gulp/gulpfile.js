// //导入工具包 require('node_modules里对应模块')
// var gulp = require('gulp'), //本地安装gulp所用到的地方
//     less = require('gulp-less');
 
// //定义一个testLess任务（自定义任务名称）
// gulp.task('testLess', function () {
//     gulp.src('src/less/index.less') //该任务针对的文件
//         .pipe(less()) //该任务调用的模块
//         .pipe(gulp.dest('src/css')); //将会在src/css下生成index.css
//     gulp.watch('src/less/index.less',['testLess']);
// });

// gulp.task('default',['testLess']); //定义默认任务
 
// //gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
// //gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
// //gulp.dest(path[, options]) 处理完后文件生成路径

// gulpfile.js 
var gulp = require('gulp');
  var gls = require('gulp-live-server');
  gulp.task('server', function() {
  //1. serve with default settings 
  var server = gls.static('views'); //equals to gls.static('public', 3000); 
  server.start();
 
  //2. serve at custom port 
  // var server = gls.static('dist', 8888);
  // server.start();
 
  //3. serve multi folders 
  // var server = gls.static(['dist', '.tmp']);
  // server.start();
 
  //use gulp.watch to trigger server actions(notify, start or stop) 
  gulp.watch(['views/*.html'], function (file) {
    console.log("this")
    server.notify.apply(server, [file]);
  });
});