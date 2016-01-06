'use strict';

var browserSync = require('browser-sync');
var path = require('path');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del'],
});

var conf = require('./conf');

gulp.task('webcomponents:scripts', [], function() {
  return gulp
    .src(path.join(conf.paths.src, 'app/webcomponents/**/*.js'), {base: conf.paths.src})
    .pipe($.babel())
    .pipe(gulp.dest(path.join(conf.paths.tmp, 'serve')));
});

gulp.task('webcomponents:scripts:build', ['webcomponents:scripts'], function() {
  var serveDir = path.join(conf.paths.tmp, 'serve');

  return gulp
    .src(path.join(serveDir, 'app/webcomponents/**/*.js'), {base: serveDir})
    .pipe(gulp.dest(path.join(conf.paths.tmp)));
});

gulp.task('webcomponents:scripts:reload', ['webcomponents:scripts'], function() {
  browserSync.reload();
});

gulp.task('webcomponents:watch', ['webcomponents:scripts'], function() {
  gulp.watch(
    path.join(conf.paths.src, '/app/webcomponents/**/*.js'),
    ['webcomponents:scripts:reload']
  );
});

gulp.task('webcomponents:vulcanize', ['webcomponents:scripts:build'], function() {
  var components =
    gulp
    .src(
      path.join(conf.paths.src, 'app/webcomponents/**/*.{html,css}'),
      {base: conf.paths.src}
    )
    .pipe(gulp.dest(path.join(conf.paths.tmp)))
    .pipe($.filter('**/*.html'));

  var injectOptions = {
    addRootSlash: false,
    relative: true,
  };

  return gulp.src([], {base: conf.paths.tmp})
    .pipe($.file(
      path.join(conf.paths.tmp, 'webcomponents.html'),
      '<!-- inject:html --><!-- endinject -->'
    ))
    .pipe(gulp.dest('.'))
    .pipe($.inject(components, injectOptions))
    .pipe(gulp.dest('.'))
    .pipe($.vulcanize({
      inlineScripts: true,
      inlineCSS: true,
    }))
    .pipe($.crisper())
    .pipe(gulp.dest('.'));
});

gulp.task('webcomponents:rev', ['webcomponents:vulcanize'], function() {
  var revManifest = gulp
    .src(path.join(conf.paths.tmp, 'webcomponents.js'))
    .pipe($.rev())
    .pipe(gulp.dest(conf.paths.dist))
    .pipe($.rev.manifest());

  return gulp
    .src(path.join(conf.paths.tmp, 'webcomponents.html'))
    .pipe($.revReplace({manifest: revManifest}))
    .pipe(gulp.dest(conf.paths.tmp));
});

gulp.task('webcomponents:build', ['webcomponents:rev'], function() {

});
