var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();


// Servidor Estático + Escuchar cambios en HTML, CSS y JS
gulp.task('default', ['css','javascript'], function() {
    browserSync.init({
        server: "./"
    });
    gulp.watch("js/*.js", ["javascript"]).on('change', browserSync.reload);
    gulp.watch("scss/*.scss", ['css']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});


// Optimizar Imagenes (No incluida en Default)
gulp.task('imagenes', function() {
    gulp.src('img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('img'));
});


// Comprimir achivos Javascript
gulp.task('javascript', function () {
    gulp.src('js/*.js')
       	.pipe(uglify())
        .pipe(gulp.dest('js/dist')); // reemplazar por el directorio de distribución final
});


// Preprocesar SASS, Minificar CSS, Autoprefijar - Luego pasa el stream a BrowserSync
gulp.task('css', function() {
	return gulp.src('scss/*.scss') // buscar en folders hijos = scss/**/*.scss
		.pipe(sass())
		.pipe(cssnano())
		.pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
		.pipe(gulp.dest('css'))
		.pipe(browserSync.stream());
});

