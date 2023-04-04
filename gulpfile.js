const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');
const uglify = require('gulp-uglify');


gulp.task('cleanCSS', () => {
    return gulp.src('src/styles/*.css')
      .pipe(cleanCSS())
      .pipe(gulp.dest('./public/styles'));
});

// gulp.task('compressSW', function() {
//     gulp.src(['src/service-worker.js'])
//       .pipe(minify())
//       .pipe(gulp.dest('./public'))
// });

gulp.task('compressSW', function() {
  return gulp.src('src/service-worker.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public/'))
});

gulp.task('default', gulp.series(['cleanCSS', 'compressSW']))