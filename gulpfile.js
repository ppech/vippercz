var gulp = require('gulp'),
    sass = require('gulp-sass'),
    debug = require('gulp-debug'),
    cssmin = require('gulp-cssmin'),
    ignore = require('gulp-ignore'),
    jsmin = require('gulp-jsmin'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('compile-sass', function (done) {

    gulp.src(['./styles/*.scss'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./docs/css/"));

    done();
});

gulp.task('watch-sass', function (done) {
    gulp.watch(['./styles/*.scss'], gulp.series('compile-sass'));

    done();
});