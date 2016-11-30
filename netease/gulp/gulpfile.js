var gulp    	= require('gulp');
var sourcemaps 	= require('gulp-sourcemaps');
var sass  		= require('gulp-sass');
var jslint  	= require('gulp-jslint');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');


var reload      = browserSync.reload;

// var path 		= '/go/2016/1117/feihe';

// var path = '/auto/2016/1125/nissan-1';

var path = '/auto/2016/1125/nissan_wap';


// var path = '/workspace/demo'

var PORT 		= '3000';

// --参数---------------------------------------

var cssPath 	= path + '/css',
	scssPath    = path + '/scss/*.scss',
	htmlPath 	= path + '/*.html',
    jsPath      = path + '/js/*.js';
var basePath    = path;


//--静态服务器---------------------------------------

gulp.task('server',function() {
    browserSync.init({
        server: {
            baseDir: basePath,
            index: 'index.html',
        },
        port:PORT,
        open: 'external'
    });
});


//  --监视任务------------------------------------------------


gulp.watch(htmlPath).on('change', reload);
gulp.watch(jsPath).on('change', function(){
     gulp.src(jsPath)
        .pipe(reload({stream: true}));
});
gulp.watch(scssPath,['sass']);
// gulp.watch(jsPath,['jslint']);




//  --构建相关任务---------------------------------------


gulp.task('sass',function(){
	 gulp.src(scssPath)
	 	.pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({
              browsers: ['>5%'],
              cascade: true,
              remove:true
        }))
        .pipe(gulp.dest(cssPath))
        .pipe(reload({stream: true}))
});



gulp.task('csslint',function(){
	gulp.src('public/**/*.css')
	    .pipe(csslint())
	    .pipe(csslint.formatter());
});

gulp.task('jslint', function () {

    return gulp.src([jsPath])
            .pipe(jslint({
                node: true,
                nomen: true,
                sloppy: true,
                plusplus: true,
                unparam: true,
                stupid: true
            }))
            .pipe(jslint.reporter('default'))
});


// --打包任务------------------------------------------------



gulp.task('default',['server']);



gulp.task('pack',['']);
