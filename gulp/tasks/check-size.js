module.exports = function() {
  $.gulp.task("check-size", () => (
    $.gulp.src(`${$.dir.build}**/*`)
      .pipe($.plugins.size({
        showFiles: true,
        title: "Size:"
      }))
      .pipe($.gulp.dest($.dir.build))
  ));
};
