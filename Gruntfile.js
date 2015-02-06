module.exports = function(grunt) {

  grunt.initConfig({
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'build/css/jpreloader.css': 'assets/scss/jpreloader.css',
          'build/css/main.css': 'assets/scss/main.scss',
        }
      }
    },
    copy: {
      main: {
        files: [
          {expand:true, src: ['index.html'], dest: 'build/'},
        ]
      }
    },
    concat: {
      options:{
        seperator: ';'
      },
      dist: {
        src: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/fullpage.js/jquery.fullPage.min.js',
          'bower_components/foundation/js/foundation.min.js',
          'assets/js/jpreloader.min.js',
          'assets/js/main.js'
        ],
        dest:'build/js/main.js'
      }
    },
    watch: {
      html: {
        files: ['index.html'],
        tasks: ['copy'],
      },
      scss: {
        files: ['assets/scss/*','assets/js/*'],
        tasks: ['sass','concat'],
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['sass','copy','concat']);

};
