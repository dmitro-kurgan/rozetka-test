module.exports = function () {
  $.gulp.task('images', () =>
    $.gulp.src([
      `${$.dir.src}assets/images/**/*.{png,jpg,gif,svg}`,
      `!${$.dir.src}assets/images/svg/*.svg`
    ])
    .pipe($.gulp.dest(`${$.dir.build}assets/images`))
    .pipe($.plugins.size({
      showFiles: true,
      showTotal: false,
      title: 'Image size:'
    }))
    );

    $.gulp.task('images:prod', () => (
      $.gulp.src([
        `${$.dir.src}assets/images/**/*.{png,jpg,gif,svg}`,
        `!${$.dir.src}assets/images/svg/*.svg`
      ])
      .pipe($.plugins.imagemin([
        $.plugins.imagemin.svgo({
          plugins: [
            {
              removeViewBox: true
            }
          ]
        })
      ], {
        verbose: true
      }))
      .pipe($.gulp.dest(`${$.dir.build}assets/images`))
      .pipe($.plugins.size({
        showFiles: true,
        showTotal: false,
        title: 'Image size:'
      }))
    ));
};
