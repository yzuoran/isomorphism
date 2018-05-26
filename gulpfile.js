var gulp = require('gulp');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');
var sequence = require('run-sequence');

gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['compile']);
    gulp.watch('src/view/*.html', ['copy']);
});

gulp.task('compile', function() {
    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('copy', function() {
    return gulp.src('src/view/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('start', function() {
    nodemon({
        watch: 'dist',
        script: 'dist/index.js',
        ext: 'js',
        env: {  'NODE_DEV': 'development' }
    });
});

gulp.task('default', function(callback) {
    sequence(['compile', 'watch', 'copy'], 'start', callback);
});
