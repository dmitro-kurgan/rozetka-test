module.exports = function () {
  $.gulp.task("html:validation", () => (
    $.gulp.src(`${$.dir.build}*.html`)
      .pipe($.plugins.w3cHtmlValidator())
  ));
};
