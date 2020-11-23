module.exports = function () {
  $.gulp.task("eslint", () =>
    $.gulp.src([
      `${$.dir.src}app/**/*.js`
    ])
      .pipe($.plugins.eslint())
      .pipe($.plugins.eslint.formatEach('compact', process.stderr))
      .pipe($.plugins.eslint.result(result => {
        console.log(`ESLint result: ${result.filePath}`);
        console.log(`# Messages: ${result.messages.length}`);
        console.log(`# Warnings: ${result.warningCount}`);
        console.log(`# Errors: ${result.errorCount}`);
      }))
      .pipe($.plugins.eslint.failAfterError())
      .on('error', $.plugins.notify.onError(function (error) {
        return {
          title: 'ES linter',
          message: error.message
        }
      }))
  )
};
