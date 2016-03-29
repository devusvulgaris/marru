# marru

This is example of my front web development environment, which I implemented recently into my workflow

I'm trying to keep up with new trends in web development and learn something new, so this year I have tuned my working environment and added new tools to speed up development process of front-end.

I use Gulp for several tasks:
- compiling sass to css
- placing all js scripts into one (concatenating) and scripts minifying \
- image optimization
- css minifying
- BrowserSync for browser live reload 

These tools allow to speed up front end development and keep the project organized. 

I added files to this repository to show how I organize the projects now

And here is explanation of gulpfile settings:

```javascript

var gulp         = require('gulp'), //add Gulp 
sass         = require('gulp-sass'), //add Sass
browserSync  = require('browser-sync'), //add Browser Sync
concat       = require('gulp-concat'),  // support of file concatenation
uglify       = require('gulp-uglifyjs'), //minify JS
cssnano      = require('gulp-cssnano'), // minify CSS
rename       = require('gulp-rename'),  //module for renaming
del          = require('del');  //module for file deleting  
imagemin     = require('gulp-imagemin'),  //image optimization
pngquant     = require('imagemin-pngquant'),  //png optimization
cache        = require('gulp-cache'),  //cache for images
autoprefixer = require('gulp-autoprefixer');  //add prefixes for wider browser support


gulp.task('sass', function() {   //Gulp task
return gulp.src('app/sass/**/*.sass')  //Get source
.pipe(sass())  //Compile to css
.pipe(autoprefixer(['last 15 versions', '>1%', 'ie 8', 'ie 7'], { cascade: true }))  //Make prefixes
.pipe(gulp.dest('app/css'))  //Place result to this folder
.pipe(browserSync.reload({stream: true}))  //Reload CSS
});

gulp.task('scripts', function() {
return gulp.src([   //Grab all js files in libs folder
'app/libs/jquery/dist/jquery.min.js',
'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
'app/libs/mixitup/build/jquery.mixitup.min.js',
'app/libs/owl-carousel/owl-carousel/owl.carousel.min.js',
'app/libs/slick-carousel/slick/slick.min.js',
])
.pipe(concat('libs.min.js'))  //Make one file JS
.pipe(uglify())   //Minify JS
.pipe(gulp.dest('app/js'))  //Place ready file to js folder
});

//Minify CSS and add suffix .min to filename
gulp.task('css-libs',['sass'] , function() {
return gulp.src('app/css/libs.css')
.pipe(cssnano())
.pipe(rename({suffix: '.min'}))
.pipe(gulp.dest('app/css'));

});

//Minify custom css for production
gulp.task('minify-css', ['sass'], function() {
return gulp.src('app/css/main.css')
.pipe(cssnano())
.pipe(rename({suffix: '.min'}))
.pipe(gulp.dest('app/css'));
});

//Launch BrowserSync
gulp.task('browser-sync', function() {
browserSync({
server: {
baseDir: 'app'   //Directory to serve
},
notify: false		
});
});

//Delete production folder
gulp.task('clean', function() {
return del.sync('dist');
});

//Clear image cache
gulp.task('clear', function() {
return cache.clearAll();
});

//IMage optimization
gulp.task('img', function() {
return gulp.src('app/img/**/*')
.pipe(cache(imagemin({
interlaced: true,
progressive: true,
svgoPlugins: [{removeViewBox: false}],
use: [pngquant()]
})))
.pipe(gulp.dest('dist/img'));  // Place optimized images to dist folder
});

gulp.task('watch', ['browser-sync','css-libs', 'minify-css','scripts'], function() {
gulp.watch('app/sass/**/*.sass',['sass']);  //watch sass folder changes
gulp.watch('app/*.html', browserSync.reload);  //watch html files change
gulp.watch('app/js/**/*.js', browserSync.reload);  //watch js folder
});

//Moving files to production 
gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {
var buildCss = gulp.src([
'app/css/main.min.css',
'app/css/libs.min.css',
])
.pipe(gulp.dest('dist/css'));  //moving css

var buildJs = gulp.src('app/js/**.*')  moving js
.pipe(gulp.dest('dist/js'));

var buildHtml = gulp.src('app/*.html')  moving html
.pipe(gulp.dest('dist'));

});
```
File structure:

app folder - for development files
dist folder - for prodction files (upload on hosting)
.bowerrc - package maager configuration
gulpfile.js - Gulp settings
package.json - Node modules configuration

