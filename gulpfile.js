'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var imageminWebp = require('imagemin-webp');
var imageResize = require('gulp-image-resize');
var notify = require('gulp-notify');
var os = require('os');
var parallel = require('concurrent-transform');
var pipes = require('gulp-pipes');


var resizeImageTasks = [];

[360, 640, 960, 2000].forEach(function(size) {
  var resizeImageTask = 'resize_' + size;
  gulp.task(resizeImageTask, function() {
    return gulp.src('public/Assets/images/src/**/*.{jpg,png,tiff}')
      .pipe(imageResize({
         width:  size,
         height: size,
         upscale: false
       }))
      .pipe(pipes.image.optimize())
      .pipe(gulp.dest('./public/Assets/images/dist/' + size + '/'))
      .pipe(gulp.dest('./public/Assets/images/dist/' + size + '/'))
  });
  resizeImageTasks.push(resizeImageTask);
});

gulp.task('resize_images', resizeImageTasks);

gulp.task('sass', function () {
 return gulp.src('./sass/**/*.scss')
   .pipe(sourcemaps.init())
   .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
   .pipe(sourcemaps.write())
   .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});
