const gulp = require('gulp');
// const pug = require('gulp-pug');
// const replace = require('gulp-replace');
const watch = require('gulp-watch');
// const path = require('path');
// const through2 = require('through2');
// const log = require('gulp-util').log;
// const cssMin = require('gulp-css');
// const plumber = require('gulp-plumber');

const {recompileCSS} = require('./dev-ops/compile-scss.js');

gulp.task('watch-css', () => {
  watch('./server/web/public/**/*.scss', {ignoreInitial: true}, recompileCSS);
});

gulp.task('default', ['watch-css']);
