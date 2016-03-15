var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

gulp.task('uglify', function(){
    gulp.src('./js/script.js') //what do we want our gulp files to consume?
      .pipe(plumber())
      .pipe(jscs())
      .pipe(jscs.reporter())
      .pipe(jshint())
      .pipe(uglify({errorHandler: notify.onError("Error: <%= error.message %>")}))
      .pipe(rename('main.min.js')) //call the uglify function on these files
      .pipe(gulp.dest('./build/js'));          //where do we put the new files? (build folder)
});

gulp.task('sass', function() {
   gulp.src('./sass/*.scss')
      .pipe(sass())
      .pipe(autoprefixer({
         browsers: ['last 2 versions']
       }))
      .pipe(minifyCSS())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('./build/css'));
});

gulp.task('browser-sync', function(){
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./sass/*.scss', ['sass']);
  gulp.watch('./js/*js', ['uglify']);
  gulp.watch(['./build/js/main.min.js','./build/css/style.min.css','./index.html']).on('change', browserSync.reload);
});

gulp.task('default', ['uglify', 'sass', 'browser-sync']);
