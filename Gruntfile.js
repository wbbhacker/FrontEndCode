module.exports = function(grunt) {
    var lrPort = 35729;
    var lrSnippet = require('connect-livereload')({port:lrPort});

 var lrMiddleware = function(connect, options) {
    // console.log(connect.static)
    // console.log(options.base[0])
    console.log(connect)
    return [
      // 把脚本，注入到静态文件中
      lrSnippet,
      // 静态文件服务器的路径
      connect.static(options.base[0]),
      // 启用目录浏览(相当于IIS中的目录浏览)
      connect.directory(options.base[0])
    ];
  };








  
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch:{
       
    	Questions:{
    		files:'javascript/ajax/*.*',
            options: {
              livereload: lrPort
            }
    	}
    },
    connect: {
        
        server: {
            port:8000,
            options: {
                middleware:lrMiddleware
            }
        }
    }
 
  });

  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['connect','watch']);

};