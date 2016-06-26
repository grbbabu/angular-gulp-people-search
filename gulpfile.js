'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var Server = require('karma').Server;
var browserSync = require('browser-sync').create();

gulp.task('sass', function () {
    return gulp.src('./client/site.scss')
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass())
        .pipe(plugins.sourcemaps.write('./maps'))
        .pipe(gulp.dest('./client'));
});

gulp.task('clean', function() {
    return del.sync(['./dist', './client/**/*.css', './client/maps']);
});

gulp.task('lint', function() {
    return gulp.src('./client/**/*.js')
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('build', ['clean', 'sass', 'lint'], function() {
    return gulp.src(['./client/**/*.js',
                './client/data/data.json',
                './client/images/*.png',
                './client/**/*.css',
                './client/**/*.html',
                '!./client/**/*.spec.js',
                '!./client/maps'], {base: './client'})
        .pipe(gulp.dest('./dist'));
});


gulp.task('test', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('test:debug', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        browsers: ['Chrome'],
        singleRun: false
    }, done).start();
});

gulp.task('serve', ['sass'], function () {
    browserSync.init({
        port: 8081,
        server: {
            baseDir: "client",
            routes: {
                "/bower_components": "bower_components"
            }
        }
    });

    gulp.watch("client/**/*.scss", ['sass']);
    gulp.watch("client/*.html").on('change', browserSync.reload);
});