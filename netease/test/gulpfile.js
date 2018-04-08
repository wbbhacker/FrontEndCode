var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var jslint = require('gulp-jslint');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var mozjpeg = require('imagemin-mozjpeg');
var cache = require('gulp-cached');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var browserSync = require('browser-sync').create();
var clean = require('gulp-clean');
var changed = require('gulp-changed');

var uglify = require('gulp-uglify');
var pump = require('pump');

var concat = require('gulp-concat');

var cleanCSS = require('gulp-clean-css');


var merge = require('merge-stream');

var reload = browserSync.reload;
var path = 'test/philips';
var PORT = '4000';


// --参数---------------------------------------

var cssPath = path + '/src/css/',
    scssPath = path + '/src/scss/*.scss',
    htmlPath = path + '/src/*.html',
    jsPath = path + '/src/js/*.js',
    imgPath = path + '/src/img/*.*';


var basePath = path;


//--静态服务器---------------------------------------

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: basePath,
            index: 'index.html',
        },
        port: PORT,
        open: 'external'
    });
});


//  --监视任务------------------------------------------------


gulp.watch(htmlPath).on('change', reload);

gulp.watch(jsPath).on('change', function() {
    gulp.src(jsPath)
        .pipe(reload({ stream: true }));
});
gulp.watch(scssPath, ['sass']);


//  --开发相关任务---------------------------------------

// 编译sass
gulp.task('sass', function() {

    gulp.src(scssPath)
        .pipe(changed(cssPath))
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({
            browsers: ['>5%'],
            cascade: true,
            remove: true
        }))

        .pipe(gulp.dest(cssPath))
        .pipe(reload({ stream: true }))

});

// js检测
gulp.task('jslint', function() {

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

// css检测

gulp.task('csslint', function() {
    gulp.src()
        .pipe(csslint())
        .pipe(csslint.formatter());
});


//  --打包相关任务---------------------------------------


gulp.task('clean',function(){

    var stream =   gulp.src([path+'/dist/*',path+'/rev/*'])
         .pipe(clean());

    return stream;

});


// img:压缩、添加版本号

gulp.task('img', ['clean'], function() {
    console.log('打包开始:')
    console.log('img:压缩、添加版本号中......')
    var stream = gulp.src(path + '/src/img/*.{png,gif,ico,jpg}')
        .pipe(changed(path + '/dist/img'))
            // 压缩图片
        .pipe(imagemin([
                imagemin.gifsicle(), 
                imagemin.jpegtran(), 
                imagemin.optipng(), 
                imagemin.svgo(), 
                pngquant({quality:'80'}),
                mozjpeg({quality:'60'})
                ],{verbose:true}))
            // 添加版本号
        .pipe(rev())
        .pipe(gulp.dest(path + '/dist/img'))
        .pipe(rev.manifest())
        .pipe(gulp.dest(path + '/rev/img'))
    
    return stream;

});

// js,css：替换图片、添加版本号、压缩

gulp.task('rev', function() {

    console.log('js,css：替换图片、添加版本号、压缩中......')
    var b = gulp.src([path + '/rev/img/*.json', path + '/src/js/*.js'])
        .pipe(changed(path + '/dist/js'))
        .pipe(revCollector({
            replaceReved: true,
            dirReplacements: {
                'img': 'img',
                '../img': '../img'
            }
        }))
        .pipe(rev())
        .pipe(uglify())
        .pipe(gulp.dest(path + '/dist/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest(path + '/rev/js'));

    var c = gulp.src([path + '/rev/img/*.json', path + '/src/css/*.css'])
        .pipe(changed(path + '/dist/css'))
        .pipe(revCollector({
            replaceReved: true,
            dirReplacements: {                
                'img': 'img',
                '../img': '../img'
            }
        }))
        .pipe(rev())
        .pipe(cleanCSS())
        .pipe(gulp.dest(path + '/dist/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest(path + '/rev/css'));

    var d = gulp.src(path+'/src/lib/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(path + '/dist/lib'));
        
    console.log('压缩完毕！！！！！！！')
    return merge(b,c,d);

});


// html: 替换css、js、img
gulp.task('html',function(){
    console.log('html: 替换css、js、img中......')

    var a = gulp.src([path + '/rev/**/*.json', path + '/src/*.html'])
        .pipe(changed(path + '/dist/*.html'))
        .pipe(revCollector({
            replaceReved: true,
            dirReplacements: {
                'css':'css',
                'js':'js',
                'img': 'img',
                '../img': '../img'
            }
        }))
        .pipe(gulp.dest(path + '/dist/'));
    console.log('^ _ ^ 打包成功！！！！')
    return a;
});



// --打包任务------------------------------------------------


gulp.task('first-step',['img'],function(){

    gulp.start('rev'); 

});

gulp.task('pack',['first-step'],function(){

    setTimeout(function(){

        gulp.start('html');
    },1000)


});

// --命令------------------------------------------------

gulp.task('default', ['server']);







