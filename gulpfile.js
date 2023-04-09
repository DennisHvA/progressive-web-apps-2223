const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');

gulp.task('cleanCSS', () => {
    return gulp.src('src/styles/*.css')
      .pipe(cleanCSS())
      .pipe(gulp.dest('./public/styles'));
});

gulp.task('compressSW', function() {
  return gulp.src('src/service-worker.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public/'))
});

gulp.task('compressJS', function() {
  return gulp.src('src/scripts/index.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public/scripts'))
});

gulp.task('default', gulp.series(['cleanCSS', 'compressSW', 'compressJS']))