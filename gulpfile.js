'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-cssmin'),
    rimraf = require('rimraf'),
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util');

var path = {
    build: { // Where to put built files
        js: 'web/js/',
        css: 'web/css/'
    },
    src: { // Where to get src files
        js: 'assets/js/all.js', // Taking main.js file (everything else is included as parts)
        style: 'assets/sass/all.scss' // Taking main.scss file (everything else is @imported)
    },
    watch: { // What files to watch
        js: 'assets/js/**/*.js',
        style: 'assets/sass/**/*.scss'
    }
};

gulp.task('js:build', function () {
    gulp.src(path.src.js) // Taking our main.js file
        .pipe(rigger()) // Inserting parts
        .pipe(uglify()) // Compress
        .pipe(gulp.dest(path.build.js)); // Put to build folder
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(plumber(function (error) {
            gutil.log(gutil.colors.red(error.message));
            this.emit('end');
        }))
        .pipe(sass().on('error', sass.logError)) // Compile SCSS
        .pipe(prefixer()) // Adding CSS prefixes, like -moz, -webkit
        .pipe(cssmin()) // Compress CSS
        .pipe(gulp.dest(path.build.css))
});

// gulp build will build everything
gulp.task('build', [
    'style:build',
    'js:build'
]);

// Watching file changes
gulp.task('watch', function () {
    watch([path.watch.style], function (event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function (event, cb) {
        gulp.start('js:build');
    });
});

// Default command "gulp" will build all files, start a local server with browser synchronization and start watching
gulp.task('default', ['build', 'watch']);