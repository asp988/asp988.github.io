'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Watch for changes and trigger compass, jshint, uglify and livereload
    watch: {
      compass: {
        files: ['sass/*.{scss,sass}'],
        tasks: ['compass:dev']
      },
      js: {
        files: ['js/src/**/*.js'],
        tasks: ['jshint', 'uglify:dev']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          '*.html',
          'css/style.css',
          'js/src/*.js',
          'js/*.js',
          'images/{,**/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // Connect
    connect: {
      server: {
        options: {
          port: 8000
        }
      }
    },

    // Compass and scss
    compass: {
      options: {
        //bundleExec: true,
        httpPath: './',
        cssDir: 'css',
        sassDir: 'sass',
        imagesDir: 'images',
        javascriptsDir: 'js',
        fontsDir: 'fonts',
        assetCacheBuster: 'none',
        // require: [
        //   'sass-globbing'
        // ]
      },
      dev: {
        options: {
          environment: 'development',
          outputStyle: 'expanded',
          relativeAssets: true,
          raw: 'line_numbers = :true\n'
        }
      },
      dist: {
        options: {
          environment: 'production',
          outputStyle: 'compact',
          force: true
        }
      }
    },
 
    // Javascript linting with jshint
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'js/src/*.js'
      ]
    },

    // Concat & minify
    uglify: {
      dev: {
        options: {
          mangle: false,
          compress: false,
          preserveComments: 'all',
          beautify: true
        },
        files: {
          'js/script.min.js': [
            'js/src/app.js',
            'js/src/models/TicketModel.js',
            'js/src/collections/TicketCollection.js',
            'js/src/views/TicketView.js',
            'js/src/views/CreateTicketView.js',
            'js/src/views/EditTicketView.js',
            'js/src/views/AppView.js'
          ]
        }
      },
      dist: {
        options: {
          mangle: true,
          compress: true
        },
        files: {
          'js/script.min.js': [
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/underscore/underscore-min.js',
            'bower_components/backbone/backbone-min.js',
            'bower_components/backbone.localStorage/backbone.localStorage-min.js',
            'bower_components/FileSaver/FileSaver.js',
            'js/src/app.js',
            'js/src/models/TicketModel.js',
            'js/src/collections/TicketCollection.js',
            'js/src/views/TicketView.js',
            'js/src/views/CreateTicketView.js',
            'js/src/views/EditTicketView.js',
            'js/src/views/AppView.js'
          ],
          'js/print.js': [
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/underscore/underscore-min.js'
          ]
        }
      }
    },

    critical: {
      dist: {
        options: {
          base: './',
          minify: true
        },
        src: ['*.html', '*/*.html', '!critical-path-html/*'],
        dest: 'critical-path-html/',
      }
    },

    'string-replace': {
      dist: {
        files: {
          'critical-path-html/': ['critical-path-html/**/*.html'],
        },
        options: {
          replacements: [{
            pattern: /@import url\([\s\S]+?\);/g,
            replacement: ''
          }]
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-critical');
  grunt.loadNpmTasks('grunt-string-replace');

  grunt.registerTask('build', [
    'jshint',
    'uglify:dist',
    'compass:dist'
  ]);

  grunt.registerTask('default', [
    'connect',
    'jshint',
    'uglify:dev',
    'compass:dev',
    'watch'
  ]);

  grunt.registerTask('crit', ['critical']);

  grunt.registerTask('replace', ['string-replace']);

};