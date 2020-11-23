const map = require('map-stream');

module.exports = function () {
  $.gulp.task("css:validation", () => (
    $.gulp.src(`${$.dir.build}**/*.css`)
      .pipe($.plugins.w3cCss())
      .pipe(map(function(file, done) {
        if (file.contents.length === 0) {
          console.log('Success: ' + file.path);
          console.log($.plugins.util.colors.green('No errors or warnings\n'));
        } else {
          const results = JSON.parse(file.contents.toString());
          results.errors.forEach(function(error) {
            console.log('Error: ' + file.path + ': line ' + error.line);
            console.log($.plugins.util.colors.red(error.message) + '\n');
          });
          results.warnings.forEach(function(warning) {
            console.log('Warning: ' + file.path + ': line ' + warning.line);
            console.log($.plugins.util.colors.yellow(warning.message) + '\n');
          });
        }
        done(null, file);
      }))
  ));
};
