const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');

const bundleCSS = () => {
    return gulp.src('./src/styles/styles.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('./public/styles'))
}

exports.bundleCSS = bundleCSS