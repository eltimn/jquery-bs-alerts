"use strict";

const banner = require("gulp-banner");
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

var comment = `/*! ${pkg.name} v${pkg.version} (${pkg.homepage})
  * Copyright 2013-${new Date().getFullYear()} eltimn
  * @license ${pkg.license}
  */\n`;

gulp.task("js", (callback) => {
  pump([
    gulp.src("docs/js/jquery.bsAlerts.js"),
    jshint(".jshintrc"),
    jshint.reporter("default"),
    jshint.reporter("fail"),
    uglify(),
    rename({ suffix: ".min" }),
    banner(comment, { pkg: pkg }),
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
