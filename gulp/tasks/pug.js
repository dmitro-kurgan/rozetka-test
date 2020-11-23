const FAVICON_DATA_FILE = 'faviconData.json';

module.exports = function () {
  $.gulp.task("pug", () =>
    $.gulp.src([
      `${$.dir.src}app/index.pug`,
      `${$.dir.src}app/pages/**/*.pug`,
      `!${$.dir.src}app/**/_*.pug`
    ])
      .pipe($.plugins.pug({
        pretty: true,
        locals: {
          nav: JSON.parse($.fs.readFileSync(`${$.dir.src}app/data/nav.json`, 'utf8')),
          content: JSON.parse($.fs.readFileSync(`${$.dir.src}app/data/content.json`, 'utf8')),
          config: JSON.parse($.fs.readFileSync('.config', 'utf8'))
        }
      }))
      .on('error', $.plugins.notify.onError(function (error) {
        return {
          title: 'Pug',
          message: error.message
        }
      }))
      .pipe($.plugins.rename(function (file) {
        file.dirname = $.path.dirname(file.dirname);
      }))
      .pipe($.plugins.realFavicon.injectFaviconMarkups(JSON.parse($.fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
      .pipe($.gulp.dest($.dir.build))
      .pipe($.plugins.size({
        showFiles: true,
        showTotal: false,
        title: 'File size:'
      }))
      .on("end", $.browserSync.reload)
  );
};
