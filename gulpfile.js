const gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
const del = require('del');
const runSequence = require('run-sequence');

console.dir(plugins); // pour récuperer le nom des plugins dans l'objet plugins

// vider le dossier dist
gulp.task('clean:dist', function () {
  del(['dist/**/*', 'dist/*']);
});

// concatener les fichiers sources dans l'index.html
gulp.task('useref', function () {
  return gulp.src('app/*.html')
    .pipe(plugins.useref())
    .pipe(plugins.if('*.js',plugins.uglify())) // minifier seulement les scripts js
    .pipe(gulp.dest('dist'));
});

gulp.task('cssMin', function () {
  return gulp.src('app/css/**')
  .pipe(plugins.if('*.css',plugins.cleanCss({compatibility: 'ie8'}))) // minifier seulement les scripts css
  .pipe(gulp.dest('dist/css/'));
});

// copier les fichiers qui n'ont pas besoin de changement
gulp.task('noChange', function () {
  return gulp.src('app/lib/**')
  .pipe(gulp.dest('dist/lib/'));
});

// exécuter des taches, d'abord clean:dist puis useref et noChange en meme temps
gulp.task('default', function () {
  runSequence(['useref','cssMin','noChange']);
});
