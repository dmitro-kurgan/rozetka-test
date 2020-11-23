module.exports = function () {
  $.gulp.task("libsJS", () =>
    $.gulp.src($.libsJS)
      .pipe($.plugins.concat("libs.js"))
      .pipe($.gulp.dest(`${$.dir.build}js`))
      .pipe($.plugins.size({
        showFiles: true,
        showTotal: false,
        title: 'File size:'
      }))
  );

  $.gulp.task("js:expanded", () =>
    $.gulp.src(`${$.dir.src}app/app.js`)
      .pipe($.plugins.include())
      .pipe($.plugins.babel({
        presets: ["@babel/env"]
      }))
      .pipe($.plugins.rename("main.js"))
      .pipe($.plugins.prettier({ singleQuote: true }))
      .pipe($.gulp.dest(`${$.dir.build}js`))
      .pipe($.plugins.size({
        showFiles: true,
        showTotal: false,
        title: 'File size:'
      }))
      .pipe($.browserSync.reload({
        stream: true
      }))
  );

  $.gulp.task("libsJS:min", () => (
    $.gulp.src(`${$.dir.build}js/libs.js`)
      .pipe($.plugins.uglifyjs())
      .pipe($.gulp.dest(`${$.dir.build}js`))
      .pipe($.plugins.size({
        showFiles: true,
        showTotal: false,
        title: 'File size:'
      }))
  ));

  $.gulp.task("js:min", () => (
    $.gulp.src(`${$.dir.build}js/main.js`)
      .pipe($.plugins.uglifyjs())
      .pipe($.gulp.dest(`${$.dir.build}js`))
      .pipe($.plugins.size({
        showFiles: true,
        showTotal: false,
        title: 'File size:'
      }))
  ));
};
