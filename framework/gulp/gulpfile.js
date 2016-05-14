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

var gulp = require('gulp');
var server = require('gulp-express');
 
gulp.task('server', function () {
    // Start the server at the beginning of the task 
    server.run(['app.js']);
 	// server.stop();
    // Restart the server when file changes 
    gulp.watch(['views/*.html'], server.notify);

    gulp.watch(['views/*.html'],server.run);
    gulp.watch(['app/styles/**/*.scss'], ['styles:scss']);
    //gulp.watch(['{.tmp,app}/styles/**/*.css'], ['styles:css', server.notify]); 
    //Event object won't pass down to gulp.watch's callback if there's more than one of them. 
    //So the correct way to use server.notify is as following: 
    gulp.watch(['{.tmp,app}/styles/**/*.css'], function(event){
        gulp.run('styles:css');
        server.notify(event);
        //pipe support is added for server.notify since v0.1.5, 
        //see https://github.com/gimm/gulp-express#servernotifyevent 
    });
 
    gulp.watch(['app/scripts/**/*.js'], ['jshint']);
    gulp.watch(['app/images/**/*'], server.notify);
    gulp.watch(['app.js', 'routes/**/*.js'], [server.run]);
});
