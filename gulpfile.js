var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('gulp-browserify');
var traceur = require('gulp-traceur');

gulp.task('scripts', function() {
  gulp.src('lib/fiddle.js')
    .pipe(traceur())
    .pipe(browserify({debug: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('lib/**/*.js', ['scripts']);
});

gulp.task('default', ['scripts', 'watch']);
