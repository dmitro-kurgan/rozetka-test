module.exports = function () {
  const nodeSassTildeImporter = require("node-sass-tilde-importer");
  const autoprefixer = require("autoprefixer");
  const postcssPresetEnv  = require("postcss-preset-env");
  const postcssColorFunction = require('postcss-color-function');
  const postcssColorModFunction = require('postcss-color-mod-function');
  const postcssSCSS = require("postcss-scss");
  const postcssShort = require("postcss-short");
  const postcssAssets = require("postcss-assets");
  const processors = [
    postcssPresetEnv({
      stage: 0
    }),
    postcssColorFunction(),
    postcssColorModFunction(),
    postcssShort(),
    postcssAssets({
      loadPaths: [
        `${$.dir.src}assets/images/`,
        `${$.dir.src}assets/fonts/`
      ],
      relative: `${$.dir.src}styles`
    }),
    autoprefixer()
  ];
  $.gulp.task("css:expanded", () =>
    $.gulp.src(`${$.dir.src}styles/main.scss`)
      .pipe($.plugins.sourcemaps.init({
        largeFile: true,
        loadMaps: true
      }))
      .pipe($.plugins.sass.sync({
        importer: require("node-sass-tilde-importer"),
        outputStyle: "expanded"
      }))
      .on('error', $.plugins.notify.onError(function (error) {
        return {
          title: 'Sass',
          message: error.message
        }
      }))
      .pipe($.plugins.postcss(processors, {syntax: postcssSCSS}))
      .pipe($.plugins.sourcemaps.write('./'))
      .pipe($.gulp.dest(`${$.dir.build}css`))
      .pipe($.plugins.size({
        showFiles: true,
        showTotal: false,
        title: 'File size:'
      }))
      .pipe($.browserSync.reload({
        stream: true
      }))
  );

  $.gulp.task("css:min", () =>
    $.gulp.src(`${$.dir.src}styles/main.scss`)
      .pipe($.plugins.sass.sync({
        importer: nodeSassTildeImporter
      }))
      .on('error', $.plugins.notify.onError(function (error) {
        return {
          title: 'Sass',
          message: error.message
        }
      }))
      .pipe($.plugins.postcss(processors, {syntax: postcssSCSS}))
      .pipe($.plugins.cssnano({
        preset: 'default'
      }))
      .pipe($.gulp.dest(`${$.dir.build}css`))
      .pipe($.plugins.size({
        showFiles: true,
        showTotal: false,
        title: 'File size:'
      }))
  );
};
