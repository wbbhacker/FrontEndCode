module.exports = function(grunt){
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),
		watch:{
			Questions:{
				files:'Questions/*'
			}
		}
	})

	// 加载任务插件

	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default',['watch']);

}