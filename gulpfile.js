const gulp = require ('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// compile sass & inject into Browser

gulp.task('sass', function (){
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/SCSS/*.scss'])
      .pipe(sass())
      .pipe(gulp.dest("src/css"))
      .pipe(browserSync.stream());

});

//Move .js files to src/js

gulp.task('js', function(){
  return gulp.src(['node_modules/bootstrap/dist/js/bootrap.min.js', 'node_modules/jquery/dist/jquery.min.js','node_modules/popper.js/dist/umd/popper.min.js'])
      .pipe(gulp.dest("src/js"))
      .pipe(browserSync.stream());

});

//Watch Sass & serve
gulp.task('serve', ['sass'], function(){
  browserSync.init({
    server: "./src"
  });

  gulp.watch(['node_modules/bootrap/scss/bootstrap.scss','src/SCSS/*.scss'], ['sass']);
  gulp.watch("src/*.html").on('change', browserSync.reload);

});

//Move Fonts Folder to src
gulp.task('fonts', function(){
  return gulp.src('node_modules/font-awesome/fonts/*')
  .pipe(gulp.dest("src/fonts"));

});

//Move Font-Awsome Css to src/css

gulp.task('fa', function(){
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
      .pipe(gulp.dest("src/css"));

});

gulp.task('default', ['js', 'serve', 'fa', 'fonts']);
