module.exports = function () {
  $.gulp.task("json", ()=> (
    $.gulp.src("./data/*.json")
  ));
};
