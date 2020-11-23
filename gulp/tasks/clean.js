module.exports = function () {
  $.gulp.task('clean', () => (
    $.del([$.dir.build])
  ))
};
