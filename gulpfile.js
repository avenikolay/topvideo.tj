"use strict";

var gulp = require('gulp'),
	notify = require("gulp-notify"),
	watch = require('gulp-watch'),
	htmlInjector = require("bs-html-injector");

var	pug = require('gulp-pug'),
	gulpif = require('gulp-if'),
	filter = require('gulp-filter'),
	emitty = require('emitty').setup('src/pug', 'pug'),

	sass = require('gulp-sass'),
	rigger = require("gulp-rigger"),
	del = require('del'),
	uglify = require('gulp-uglify'),
	cleanCSS = require('gulp-clean-css'),
	browserSync = require('browser-sync').create();

var postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	mqpacker = require("css-mqpacker"),
	sorting = require('postcss-sorting'),
	combineSelectors = require('postcss-combine-duplicated-selectors');



gulp.task('templates', () =>
	new Promise((resolve, reject) => {
		emitty.scan(global.emittyChangedFile).then(() => {
			gulp.src('src/pug/*.pug')
				.pipe(gulpif(global.watch, emitty.filter(global.emittyChangedFile)))
				.pipe(pug({ pretty: true }))
				.pipe(gulp.dest('dist'))
				.on('end', resolve)
				.on('error', reject);
		});
	})
);



gulp.task('styles', function() {
	var plugins = [
		combineSelectors({removeDuplicatedProperties: true}),
		mqpacker(),
        autoprefixer({browsers: ['last 15 versions', '>1%', 'ie 11']}),
        sorting()
    ];
	return gulp.src('src/scss/**/*.scss')
	.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
	.pipe(postcss(plugins))
	//.pipe(cleanCSS())
	.pipe(gulp.dest('dist/css'));
});
gulp.task('scripts', function() {
	return gulp.src('src/js/main.js')
	.pipe(rigger())
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});
gulp.task('pages', function() {
	return gulp.src('src/pug/*.pug')
		.pipe(pug({pretty: true}).on("error", notify.onError())) 
		.pipe(gulp.dest('dist'));
});
gulp.task('images', function() {
	return gulp.src('src/img/**/*.*')
		.pipe(gulp.dest('dist/img/'));
});
gulp.task('fonts', function() {
	return gulp.src('src/fonts/**/*.*')
		.pipe(gulp.dest('dist/fonts/'));
});



//создаем слежку
gulp.task('watch', function(){
	global.watch = true;

	gulp.watch('src/pug/**/*.pug', gulp.series('templates'))
		.on('all', (event, filepath) => {
			global.emittyChangedFile = filepath;
		});

	//gulp.watch('src/pug/**/*.pug', gulp.series('pages'));
	

	gulp.watch('src/scss/**/*.scss', gulp.series('styles'));
	gulp.watch('src/js/**/*.js', gulp.series('scripts'));
	gulp.watch('src/img/**/*.*', gulp.series('images'));
	gulp.watch('src/fonts/**/*.*', gulp.series('fonts'));

	//gulp.watch("dist/*.html", gulp.series(htmlInjector));
});

//сервер
gulp.task('serve', function(){
	/*browserSync.use(htmlInjector, {
	    files: ["dist/*.html"]
	});*/
	browserSync.init({
		server: 'dist',
		notify: false
	});
	browserSync.watch('dist/**/*.*').on('change', browserSync.reload);
});


gulp.task('clean', function(){
	return del('dist');
});

//запускаем действие по умолчанию
gulp.task('default', gulp.series('clean', 'styles', 'scripts', 'images', 'fonts', 'templates', gulp.parallel('watch', 'serve')));