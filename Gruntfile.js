'use strict';

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

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

        absurd: {
            buildCss: {
                src: 'src/absurd/atomic.js',
                dest: 'dist/atomic.absurd.css',
                options: {
                    minify: false
                }
            }
        },

        // -- SASS Config -------------------------------------------------------
        // sass: {
        //     options: {
        //         sourcemap: 'none',
        //         style: 'expanded',
        //         banner: [
        //             '/*!',
        //             'Atomic.css v<%= project.pkg.version %>',
        //             'Copyright 2014 Yahoo! Inc. All rights reserved.',
        //             'Licensed under the BSD License.',
        //             'https://github.com/yahoo/atomic.css/blob/master/LICENSE.md',
        //             '*/\n'
        //         ].join('\n')
        //     },
        //     atomic: {
        //         files: [{
        //             expand: true,
        //             cwd: '<%=project.src %>',
        //             src: ['**/*.scss'],
        //             dest: './dist',
        //             ext: '.css'
        //         }]
        //     }
        // },

        // -- SCSS Lint Config -------------------------------------------------------
        scsslint: {
            all: [
                '<%= project.src %>/**/*.scss'
            ],
            options: {
                config: '.scss-lint.yml',
                reporterOutput: 'scss-lint-report.xml',
                colorizeOutput: true
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
        },

        // -- Shell Config -------------------------------------------------------
        shell: {
            bower: {
                command: 'bower install'
            }
        }
    });

    grunt.registerTask('default', [
        'clean',
//        'lint',
        'absurd'
    ]);

//    grunt.registerTask('lint', [
//        'scsslint'
//    ]);
};
