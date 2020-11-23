module.exports = function () {
  $.gulp.task("fonts", () => (
    $.gulp.src(`${$.dir.src}assets/fonts/**/*`)
      .pipe($.gulp.dest(`${$.dir.build}assets/fonts`))
  ));
};
