'use strict';

var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  del = require('del'),
  lib = ['api/controllers/**/*.js', 'api/models/**/*.js', 'api/services/**/*.js'];


gulp.task('coverage', ['clean'], function(){
  return gulp.src(lib)
    .pipe($.istanbul())
    .pipe($.istanbul.hookRequire());
});

gulp.task('jshint', function () {
  var src = lib;
  src.push('test/**/*.js', 'scripts/**/*.js');
  return gulp.src(src)
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

function mochaStream(){
  return gulp.src('test/**/*.js', {read: false})
    .pipe($.mocha({
      reporter: 'spec'
    }).on('error', function (error) {
      console.log('error caught');
    }));
}

gulp.task('mocha', ['coverage'], function () {
  return mochaStream()
    .pipe($.istanbul.writeReports());
});

gulp.task('mocha:nocov', function(){
  return mochaStream();
});

gulp.task('clean', del.bind(null, ['test/css', 'coverage/**/*']));

gulp.task('default', ['mocha', 'jshint']);
