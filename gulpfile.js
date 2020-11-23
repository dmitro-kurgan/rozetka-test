global.$ = {
  dir: {
    src: "src/",
    build: "build/"
  },
  libsJS: [
    "node_modules/svg4everybody/dist/svg4everybody.js"
  ],
  config: {
    tasks: require("./gulp/config/tasks.js")
  },
  gulp: require("gulp"),
  fs: require("fs"),
  del: require("del"),
  path: require('path'),
  plugins: require("gulp-load-plugins")(),
  browserSync: require("browser-sync").create(),
};

$.config.tasks.forEach((taskPath) => {
  require(taskPath)()
});

$.gulp.task("html", $.gulp.series(["pug", "lint:pug"]));

$.gulp.task("css", $.gulp.series(["css:expanded", "stylelint"]));

$.gulp.task("css:prod", $.gulp.series(["css:min", "stylelint"]));

$.gulp.task("js", $.gulp.series(["js:expanded", "eslint"]));

$.gulp.task("js:prod", $.gulp.series(["js:expanded", "eslint", "js:min"]));

$.gulp.task("libsJS:prod", $.gulp.series(["libsJS", "libsJS:min"]));

$.gulp.task("build", $.gulp.series(
  "clean",
  $.gulp.parallel("css", "libsJS", "js", "images", "svg", "fonts"),
  "html",
  "json",
  "favicon",
  "html:validation",
  "check-size"
));

$.gulp.task("build:prod", $.gulp.series(
  "clean",
  $.gulp.parallel("css:prod", "libsJS:prod", "js:prod", "images:prod", "svg", "fonts"),
  "html",
  "favicon",
  "html:validation",
  "check-size"
));

$.gulp.task("default", $.gulp.series(
  'build',
  $.gulp.parallel("watch", "serve")
));
