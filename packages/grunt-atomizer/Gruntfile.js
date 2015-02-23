/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                'test/'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        atomizer: {
            // here we test if passing a configFile works as expected
            configFileOnly: {
                options: {
                    configFile: 'test/fixtures/sample-config.js'
                },
                files: [
                    {
                        dest: 'tmp/configFileOnly.css'
                    }
                ]
            },
            // here we test if passing config to grunt task directly works as expected
            configGruntOnly: {
                options: {
                    config: {
                        config: {
                            namespace: '#atomic',
                            start: 'left',
                            end: 'right'
                        },
                        display: {
                            ib: true
                        }
                    }
                },
                files: [
                    {
                        dest: 'tmp/configGruntOnly.css'
                    }
                ]
            },
            // here we test which one has precedence (config declared in grunt task directly first then configFile second)
            configBoth: {
                options: {
                    configFile: 'test/fixtures/sample-config.js',
                    config: {
                        config: {
                            namespace: '#atomic',
                            start: 'left',
                            end: 'right'
                        },
                        'border-top': {
                            custom: [
                                {suffix: '1', values: ['10px solid #ccc']}
                            ]
                        },
                        display: {
                            ib: true
                        }
                    }
                },
                files: [
                    {
                        dest: 'tmp/configBoth.css'
                    }
                ]
            },
            // here we test both cases and also parsing the HTML files
            // Grunt task should warn about 'Bdb-1' missing in config (found in parsing)
            configBothWithParsing: {
                options: {
                    configFile: 'test/fixtures/sample-config.js',
                    config: {
                        config: {
                            namespace: '#atomic',
                            start: 'left',
                            end: 'right'
                        },
                        display: {
                            b: true
                        }
                    }
                },
                files: [
                    {
                        src: ['test/fixtures/*.html'],
                        dest: 'tmp/configBothWithParsing.css'
                    }
                ]
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'atomizer', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
