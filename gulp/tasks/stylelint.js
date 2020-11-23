module.exports = function () {
  $.gulp.task("stylelint", () =>
    $.gulp.src([
      `${$.dir.src}app/**/*.scss`,
      `${$.dir.src}styles/**/*.scss`
    ])
      .pipe($.plugins.stylelint({
        failOnError: false,
        emitErrors: true,
        quiet: false,
        syntax: "scss",
        reporters: [
          {
            formatter: 'string',
            console: true
          }
        ]
      }))
      .on('error', $.plugins.notify.onError(function (error) {
        return {
          title: 'Stylelint',
          message: error.message
        }
      }))
  );
};
