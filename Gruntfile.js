module.exports = function(grunt) {
  "use strict";

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      main: "docs/js/jquery.<%= pkg.name %>.js"
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> version: <%= pkg.version %>\n*  <%= grunt.template.today("yyyy-mm-dd") %>\n*  Author: Tim Nelson\n*  Website: http://eltimn.github.com/jquery-bs-alerts\n*  MIT License http://www.opensource.org/licenses/mit-license.php\n*/\n'
      },
      build: {
        src: 'docs/js/jquery.<%= pkg.name %>.js',
        dest: 'build/jquery.<%= pkg.name %>.min.js'
      }
    },
    compress: {
      docs: {
        options: {
          archive: 'docs.zip'
        },
        files: [
          {expand: true, cwd: 'docs/', src: ['**'], dest: '/'}
        ]
      }
    },
    connect: {
      server: {
        options: {
          base: "docs",
          keepalive: true,
          open: true
        }
      }
    },
    watch: {
      main: {
        files: '<%= jshint.main %>',
        tasks: ['jshint']
      }
    }
  });

  // Tasks
  grunt.registerTask('build', ['jshint', 'uglify']);

  // Default task(s).
  grunt.registerTask('default', ['build', 'compress']);

};
