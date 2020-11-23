module.exports = function () {
  $.gulp.task("watch", () => (
    $.gulp.watch(
      [
        `${$.dir.src}app/**/*.pug`,
        `${$.dir.src}app/data/*.json`
      ],
      $.gulp.series($.gulp.parallel("html", "json"))
    ),
    $.gulp.watch(
      [
        `${$.dir.src}app/**/*.scss`,
        `${$.dir.src}styles/**/*.scss`
      ],
      $.gulp.series("css")
    ),
    $.gulp.watch(`${$.dir.src}app/**/*.js`, $.gulp.series("libsJS", "js")),
    $.gulp.watch(`${$.dir.src}assets/images/**/*`, $.gulp.series("images")),
    $.gulp.watch(`${$.dir.src}assets/fonts/**/*`, $.gulp.series("fonts")),
    $.gulp.watch(`${$.dir.src}assets/images/svg/*.svg`, $.gulp.series("svg"))
  ));
};
