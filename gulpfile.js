const gulp = require('gulp'),
plumber = require('gulp-plumber'),
sass = require('gulp-sass'),
webserver = require('gulp-webserver'),
opn = require('opn'),
glob = require('glob'),
rename = require('gulp-rename'),
uglify = require('gulp-uglify'),
babel = require('gulp-babel'),
browserify = require('browserify'),
source = require('vinyl-source-stream'),
runSequence = require('run-sequence'),
$ = require('gulp-load-plugins')(),
autoprefixer = require('gulp-autoprefixer'),
buffer = require('vinyl-buffer'),
data = require('gulp-data');


const sourcePaths = {
  styles: ['styles/*.scss'],
  html: ['index.html'],
  js: ['js/*.js']
};

const distPaths = {
  styles: './'
};

const server = {
  host: 'localhost',
  port: '8001'
}

const localUrl = `http://localhost:${server.port}`;
const logSeperator = /*$.util.colors.grey*/(
    ' ----------------------------------------');

gulp.task('sass', () =>
  gulp.src( sourcePaths.styles )
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 1%', 'ie 8'],
            cascade: false
    }))
    .pipe(gulp.dest( distPaths.styles )));

gulp.task('webserver', () =>
  gulp.src('./')
    .pipe(webserver({
      host:             server.host,
      port:             server.port,
      livereload:       true,
      directoryListing: false
    })));

gulp.task('browserify', (cb) => {
    var b = browserify({
        entries: ['js/index.js'],
        styles: ['js/vendor/*.js'],
    })

    // bundle all our file into one file
    // conerts it to a node.js stream
    b.bundle()
        // convert node.js stream to vinyl stream
        .pipe( source('app.js'))
        // convert from chunked stream to buffered stream
        .pipe( buffer())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .on('end', () => cb())
        .pipe(gulp.dest('./'))
});

gulp.task('openbrowser', () =>
  opn( 'http://' + server.host + ':' + server.port ));

gulp.task('watch', ['webserver'], () => {
  gulp.watch(sourcePaths.styles, ['sass']);
  gulp.watch(sourcePaths.js, ['browserify']);
});

gulp.task('build', (cb) =>
  runSequence(
    ['sass'],
    ['browserify'],
    () => cb()
  ));

gulp.task('serve', ['build'], (cb) =>
  runSequence(
    ['watch'],
    // ['openbrowser'],
    () => {
        console.log();
        console.log(('     Server Urls:'));
        console.log(logSeperator);
        console.log(`     Local: ${(localUrl)}`);
        console.log(logSeperator);
        return cb()}
  ));

gulp.task('default', ['build']);
