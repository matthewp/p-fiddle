var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var str2jsify = require('string-to-jsify');
var traceur = require('gulp-traceur');

gulp.task('scripts', function() {
  gulp.src('lib/fiddle.js')
    .pipe(traceur())
    .pipe(browserify({
      debug: true,
      transform: [
        'debowerify',
        str2jsify.configure({extensions: '.mustache'})
      ],
      shim: {
        'codemirror': {
          path: 'bower_components/codemirror/lib/codemirror.js',
          exports: 'CodeMirror',
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
    .pipe(gulp.dest('dist'));
});

gulp.task('styles', function() {
  gulp.src(['bower_components/codemirror/lib/codemirror.css'])
    .pipe(concat('fiddle.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('lib/**/*.js', ['scripts']);
});

gulp.task('default', ['scripts', 'watch']);
