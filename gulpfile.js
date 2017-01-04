"use strict";

const del = require("del");
const gulp = require("gulp");
const jshint = require("gulp-jshint");
const pkg = require("./package.json");
const pump = require("pump");
const rename = require("gulp-rename");
const runSequence = require("run-sequence");
const serve = require("gulp-serve");
const uglify = require("gulp-uglify");

gulp.task("default", ["build", "serve", "watch"]);

gulp.task("build", ["js"]);

gulp.task("dist", ["clean"], (callback) => {
  runSequence("build", callback);
});

gulp.task("js", (callback) => {
  pump([
    gulp.src("docs/js/jquery.bsAlerts.js"),
    jshint(".jshintrc"),
    jshint.reporter("default"),
    jshint.reporter("fail"),
    uglify(),
    rename({ suffix: ".min" }),
    gulp.dest("dist/")
  ], callback);
});

gulp.task("serve", serve({
  root: "docs",
  port: 8888
}));

gulp.task("clean", () => {
  return del(["dist/*"]);
});

gulp.task("watch", function() {
  gulp.watch("docs/js/jquery.bsAlerts.js", ["build"]);
})
