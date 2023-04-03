console.log("linked")

// import { calcForm } from "./modules/calcForm.js"
import { enableCamera } from "./modules/turnCamera.js";
import { disableCamera } from "./modules/turnCamera.js";

const cameraOn = document.querySelector('#start')
const cameraOff = document.querySelector('#stop')

if (window.location.pathname === "/scanner") {
    enableCamera();
}

// cameraOn.addEventListener('click', enableCamera)
// cameraOff.addEventListener('click', disableCamera)

const date = new Date().getFullYear();
document.querySelector('time').innerHTML = date;

const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
 
gulp.task('minify-css', () => {
  return gulp.src('styles/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});