

gulp.task('imagemin', function() {

    var imagemin = gulp.src(path + '/src/img/*.{png,gif,ico,jpg}')
        .pipe(changed(path + '/dist/imgMin'))
        .pipe(imagemin([
                imagemin.gifsicle(), 
                imagemin.jpegtran(), 
                imagemin.optipng(), 
                imagemin.svgo(), 
                pngquant({quality:'80'}),
                mozjpeg({quality:'60'})
                ],{verbose:true}))
        .pipe(gulp.dest(path + '/dist/imgMin'));

    return imagemin;


});