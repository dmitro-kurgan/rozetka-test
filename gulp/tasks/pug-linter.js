module.exports = function() {
  const pugLintStylish = require('puglint-stylish');

  $.gulp.task("lint:pug", () => (
    $.gulp.src(`${$.dir.src}app/**/*.pug`)
      .pipe($.plugins.pugLinter({ reporter: pugLintStylish }))
  ));
};
