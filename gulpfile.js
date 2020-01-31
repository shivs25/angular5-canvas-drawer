const gulp = require('gulp');
const inlineNg2Template = require('gulp-inline-ng2-template');
const sass = require('gulp-sass');

gulp.task('inline-build-templates', () => {
    return gulp.src(['./src/app/drawer/**/*.ts', '!./src/app/drawer/**/**.spec.ts'])
        .pipe(inlineNg2Template({
            target: 'es5',
            useRelativePaths: true
        }))
        .pipe(gulp.dest('./build'));

});

gulp.task('sass', function () {
  return gulp.src('./src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./lib/build/css'));
});

//gulp.task('build-frontend', ['inline-build-templates', 'sass']);

gulp.task('build-frontend', gulp.series('inline-build-templates', function() {
    // default task code here
}),gulp.series('sass', function() {
    // default task code here
}));
