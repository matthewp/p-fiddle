var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var serve = require('gulp-serve');
var str2jsify = require('string-to-jsify');
var traceur = require('gulp-traceur');

gulp.task('es6', function() {
  gulp.src('lib/**/*.js')
    .pipe(traceur())
    .pipe(gulp.dest('tmp'));
});

gulp.task('templates', function() {
  gulp.src('lib/**/*.mustache')
    .pipe(gulp.dest('tmp'));
});

gulp.task('scripts', function() {
  gulp.src('tmp/index.js')
    .pipe(browserify({
      debug: true,
      transform: [
        'debowerify',
        str2jsify.configure({extensions: '.mustache'})
      ],
      shim: {
        'codemirror': {
          path: 'bower_components/codemirror/lib/codemirror.js',
          exports: 'CodeMirror'
        },
        'xmlmode': {
          path: 'bower_components/codemirror/mode/xml/xml.js',
          exports: 'CodeMirror'
        },
        'cssmode': {
          path: 'bower_components/codemirror/mode/css/css.js',
          exports: 'CodeMirror'
        },
        'jsmode': {
          path: 'bower_components/codemirror/mode/javascript/javascript.js',
          exports: 'CodeMirror'
        },
        'htmlmode': {
          path: 'bower_components/codemirror/mode/htmlmixed/htmlmixed.js',
          exports: 'CodeMirror'
        }
      }
    }))
    .pipe(concat('fiddle.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('styles', function() {
  gulp.src(['bower_components/codemirror/lib/codemirror.css'])
    .pipe(concat('fiddle.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('serve', serve({
  root: [__dirname],
  port: 7000
}));

gulp.task('watch', function() {
  gulp.watch('lib/**/*.js', ['es6', 'templates', 'scripts']);
});

gulp.task('default', ['es6', 'templates', 'scripts', 'watch', 'serve']);
