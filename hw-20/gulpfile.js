const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');
const concatCss = require('gulp-concat-css');
const concatJs = require('gulp-concat');
const uglifyJs = require('gulp-uglify');
const minifyCss = require('gulp-clean-css');
const webp = require('gulp-webp');

function defaultTask(cb) {
    console.log('gulp works');
    cb();
}

function cleaner(cb) {
    return del('./dist', { force : true}, cb);
}

function buildCss() {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass())
        .pipe(concatCss('style.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist'));
}

function buildJs() {
    return gulp.src('./js/**/*.js')
        .pipe(concatJs('all.js'))
        .pipe(uglifyJs())
        .pipe(gulp.dest('./dist'))
}

function follow() {
    gulp.watch('./sass/**/*.scss', gulp.series(buildCss));
    gulp.watch('./js/**/*.js', gulp.series(buildJs));
}

function imgToWebp(cb) {
    return gulp.src('./img/*.png')
        .pipe(webp())
        .pipe(gulp.dest('./dist/img'), cb);
}

exports.follow = follow;
exports.buildCss = buildCss;
exports.buildJs = buildJs;
exports.imgToWebp = imgToWebp;
exports.default = defaultTask;
exports.cleaner = gulp.series(cleaner);
exports.build = gulp.series(cleaner, gulp.parallel(buildCss, buildJs, imgToWebp));