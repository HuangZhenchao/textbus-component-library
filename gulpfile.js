const gulp = require('gulp');

gulp.task('copy', function () {
  return gulp.src('./textbus/assets/**/*').pipe(gulp.dest('./compile/textbus/scss/'));
});

gulp.task('default', gulp.series('copy'));