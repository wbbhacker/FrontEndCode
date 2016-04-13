module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch:{
       
    	Questions:{
    		files:'javascript/ajax/*.*',
            options: {
              livereload: 35729
            }
    	}
    },
    connect: {
        
        server: {
            port:8000,
            options: {
              livereload: 35729
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