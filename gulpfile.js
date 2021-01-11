/*jshint esversion: 6 */
const gulp = require('gulp');
const jeditor = require('gulp-json-editor');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const deletelines = require('gulp-delete-lines');
const { doesIntersect } = require('tslint');

gulp.task('geo:fixOL', done => {
  gulp
    .src(['./node_modules/ol/package.json'])
    .pipe(
      jeditor({
        sideEffects: true
      })
    )
    .pipe(gulp.dest('./node_modules/ol/'));

  done();
});

gulp.task('geo:clean', done => {
  return gulp.src('./projects/geo/src/lib', { read: false, allowEmpty: true })
    .pipe(clean());
});

gulp.task('geo:copyFiles', done => {
  gulp
    .src('./src/app/**')
    .pipe(gulp.dest('./projects/geo/src/lib'));

  done();
});


gulp.task('geo:copyAssets', done => {
  gulp
    .src('./src/assets/**/*')
    .pipe(gulp.dest('./projects/geo/src/assets'));

  done();
});

gulp.task('geo:copyStyle', done => {
  gulp
    .src('./src/style/**/*')
    .pipe(gulp.dest('./projects/geo/src/style'));

  done();
});

gulp.task('geo:addTheming', done => {
  gulp
  .src('./projects/geo/src/lib/app.theming.scss')
    .pipe(gulp.dest('./dist/geo/lib'));
    
  gulp
  .src('./projects/geo/src/lib/pages/portal/portal.theming.scss')
    .pipe(gulp.dest('./dist/geo/lib/pages/portal'));

  gulp
  .src('./projects/geo/src/lib/pages/portal/sidenav/sidenav.theming.scss')
    .pipe(gulp.dest('./dist/geo/lib/pages/portal/sidenav'));
    
  gulp
  .src('./projects/geo/src/lib/pages/portal/welcome-window/welcome-window.theming.scss')
    .pipe(gulp.dest('./dist/geo/lib/pages/portal/welcome-window'));
  
  

  done();
});

gulp.task('geo:addStyle', done => {
  gulp
    .src('./projects/geo/src/style/**/*')
    .pipe(gulp.dest('./dist/geo/style'));

  done();
})

gulp.task('geo:addAssets', done => {
  gulp
    .src('./projects/geo/src/assets/**/*')
    .pipe(gulp.dest('./dist/geo/assets'));

  done();
})

gulp.task('geo:removePrepublish', done => {
  gulp
    .src('./dist/geo/package.json')
    .pipe(deletelines({
      'filters': [
        /['"]prepublishOnly['"]/i      ]
    })).pipe(gulp.dest('./dist/geo', {
      overwrite: true
    }));

  done();
})

gulp.task('geo:copyConfig', done => {
  gulp
    .src('./src/config/**/*')
    .pipe(gulp.dest('./projects/geo/src/config'));

  done();
});

gulp.task('geo:copyLocale', done => {
  gulp
    .src('./src/locale/**/*')
    .pipe(gulp.dest('./projects/geo/src/locale'));

  done();
});

gulp.task('geo:copyFonts', done => {
  gulp
    .src('./src/fonts/**/*')
    .pipe(gulp.dest('./projects/geo/src/fonts'));

  done();
});

gulp.task('geo:copyEnvironments', done => {
  gulp
    .src('./src/environments/**/*')
    .pipe(gulp.dest('./projects/geo/src/environments'));

  done();
});
gulp.task('geo:copyContexts', done => {
  gulp
    .src('./src/contexts/**/*')
    .pipe(gulp.dest('./projects/geo/src/contexts'));

  done();
});

gulp.task(
  'geo-lib',
  gulp.series(
    'geo:copyFiles',
    'geo:copyStyle',
    'geo:copyAssets',
    'geo:copyEnvironments',
    'geo:copyLocale',
    'geo:copyFonts'
  )
);

gulp.task(
  'geo',
  gulp.series(
    gulp.parallel(['geo:addStyle', 'geo:addAssets', 'geo:addTheming']),
  )
);
