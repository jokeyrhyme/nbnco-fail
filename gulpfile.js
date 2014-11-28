/*eslint-env node*/
/*eslint no-sync:0*/ // sync is okay in build files, relax!
'use strict';

// Node.JS built-ins

var fs = require('fs');
var path = require('path');

// this module

var gulp = require('gulp');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var htmlreplace = require('gulp-html-replace');
var uncss = require('gulp-uncss');

var cssGlob = [
'node_modules/normalize.css/normalize.css',
'src/vendor/*.css',
'src/main.css',
'src/*.css'
];

var htmlGlob = [
  'src/*.html'
];

gulp.task('css', function () {
  return gulp.src(cssGlob)
    .pipe(uncss({
      html: [ 'src/index.html' ]
    }))
    .pipe(concat('styles.css'))
    .pipe(cssmin({ keepSpecialComments: 0 }))
    .pipe(gulp.dest('dist'));
});

gulp.task('html', [ 'css' ], function () {
  return gulp.src(htmlGlob)
    .pipe(htmlreplace({
      css: {
        src: [''],
        tpl: '<style>' + fs.readFileSync(path.join(__dirname, 'dist', 'styles.css')) + '</style>'
      }
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['html', 'css'], function () {});
