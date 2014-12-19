'use strict';

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    require('./grunt-tasks/grunt-atomic-absurd')(grunt);

    // Configurable paths for the application
    var appConfig = {
        src: 'src',
        docs: 'docs',
        dist: 'dist',
        pkg: grunt.file.readJSON('package.json')
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // -- Project Config -------------------------------------------------------
        project: appConfig,

        'atomic-absurd': {
            buildCss: {
                src: '<%= project.src %>/atomic.js',
                dest: '<%= project.dist %>/atomic.css',
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
                }
            }
        },

        // -- SCSS Lint Config -------------------------------------------------------
        clean: {
            dist: {
                files: [{
                    src: '<%=project.dist%>',
                    dot: true
                }]
            }
        }
    });

    grunt.registerTask('default', [
        'clean',
        'atomic-absurd'
    ]);
};
