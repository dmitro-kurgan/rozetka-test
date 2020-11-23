module.exports = function () {
  $.gulp.task("svg", () => {
    return $.gulp.src(`${$.dir.src}assets/images/svg/*.svg`)
      .pipe($.plugins.svgmin({
        js2svg: {
          pretty: true
        }
      }))
      .pipe($.plugins.cheerio({
        parserOptions: {
          xmlMode: true
        }
      }))
      .pipe($.plugins.replace("&gt;", ">"))
      .pipe($.plugins.svgSprite({
        mode: {
          symbol: {
            sprite: "sprite.svg"
          }
        }
      }))
      .pipe($.gulp.dest(`${$.dir.build}assets/images/svg/`))
      .pipe($.plugins.size({
        showFiles: true,
        showTotal: false,
        title: 'File size:'
      }))
  });
};
