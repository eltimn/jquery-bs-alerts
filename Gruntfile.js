module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      main: "src/jquery.<%= pkg.name %>.js"
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> version: <%= pkg.version %>\n*  <%= grunt.template.today("yyyy-mm-dd") %>\n*  Author: Tim Nelson\n*  Website: http://eltimn.github.com/jquery-bs-alerts\n*  MIT License http://www.opensource.org/licenses/mit-license.php\n*/\n'
      },
      build: {
        src: 'src/jquery.<%= pkg.name %>.js',
        dest: 'build/jquery.<%= pkg.name %>.min.js'
      }
    },
    watch: {
      main: {
        files: '<%= jshint.main %>',
        tasks: ['jshint']
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Tasks
  grunt.registerTask('build', ['jshint', 'uglify']);

  // Default task(s).
  grunt.registerTask('default', ['build']);

};
