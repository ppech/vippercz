var gulp = require('gulp'),
    sass = require('gulp-sass'),
    debug = require('gulp-debug'),
    //cssmin = require('gulp-cssmin'),
    //ignore = require('gulp-ignore'),
    jsmin = require('gulp-jsmin'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    nunjucksRender = require('gulp-nunjucks-render')
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

gulp.task('compile-js', function (done) {

    gulp.src(['./scripts/*.js'])
        .pipe(plumber())
        .pipe(jsmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("./docs/js/"));

    done();
});

gulp.task('compile-html', function (done) {

    gulp.src(['./pages/**/*.njk'])
        .pipe(plumber())
        .pipe(nunjucksRender({
            path: './templates/' // String or Array
        }))
        .pipe(gulp.dest("./docs/"));

    done();
});


gulp.task('watch-sass', function (done) {
    gulp.watch(['./styles/*.scss'], gulp.series('compile-sass'));

    done();
});

gulp.task('watch-js', function (done) {
    gulp.watch(['./scripts/*.js'], gulp.series('compile-js'));

    done();
});

gulp.task('watch-html', function (done) {
    gulp.watch(['./pages/**/*.njk'], gulp.series('compile-html'));

    done();
});