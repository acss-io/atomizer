'use strict';

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    require('./grunt-tasks/grunt-acss')(grunt);

    // Configurable paths for the application
    var appConfig = {
        src: 'src',
        docs: 'docs',
        dist: 'dist',
        examples: 'examples',
        pkg: grunt.file.readJSON('package.json')
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // -- Project Config -------------------------------------------------------
        project: appConfig,

        // -- Atomic.css -----------------------------------------------------------
        acss: {
            dist: {
                options: {
                    minify: false,
                    banner: [
                        '/*!',
                        'Atomic.css v<%= project.pkg.version %>',
                        'Copyright 2014 Yahoo! Inc. All rights reserved.',
                        'Licensed under the BSD License.',
                        'https://github.com/yahoo/atomic.css/blob/master/LICENSE.md',
                        '*/\n'
                    ].join('\n')
                },
                rules: '<%= project.src %>/rules.js',
                src: '<%= project.examples %>/example-config.js',
                dest: '<%= project.dist %>/atomic.css'
            }
        },

        // -- Clean ----------------------------------------------------------------
        clean: {
            dist: {
                files: [{
                    src: '<%=project.dist%>',
                    dot: true
                }]
            }
        },

        // -- Minify ---------------------------------------------------------------
        cssmin: {
            dist: {
                options: {
                    report: 'gzip'
                },
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['**/*.css', '!**/*.min.css'],
                    dest: 'dist/',
                    ext: '.min.css'
                }]
            }
        }
    });

    grunt.registerTask('default', [
        'clean',
        'acss:dist',
        'cssmin:dist'
    ]);
};
