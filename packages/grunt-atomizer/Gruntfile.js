/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt, {
        config: '../../package.json',
        requireResolution: true,
    });

    grunt.initConfig({
        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp'],
        },

        // Configuration to be run (and then tested).
        atomizer: {
            // here we test without passing a config, just the src files
            noConfigWithParsing: {
                files: [
                    {
                        src: ['test/fixtures/*.html'],
                        dest: 'tmp/noConfigWithParsing.css',
                    },
                ],
            },
            // here we test if passing a configFile works as expected
            configFileOnly: {
                options: {
                    configFile: 'test/fixtures/sample-config.js',
                },
                files: [
                    {
                        dest: 'tmp/configFileOnly.css',
                    },
                ],
            },
            // here we test if passing config to grunt task directly works as expected
            configGruntOnly: {
                options: {
                    namespace: '#atomic',
                    config: {
                        classNames: ['D(ib)'],
                    },
                },
                files: [
                    {
                        dest: 'tmp/configGruntOnly.css',
                    },
                ],
            },
            // here we test which one has precedence (config declared in grunt task directly first then configFile second)
            configBoth: {
                options: {
                    namespace: '#atomic',
                    configFile: 'test/fixtures/sample-config.js',
                    config: {
                        classNames: ['D(ib)'],
                        custom: {
                            1: '10px solid #ccc',
                        },
                    },
                },
                files: [
                    {
                        dest: 'tmp/configBoth.css',
                    },
                ],
            },
            // here we test both cases and also parsing the HTML files
            // Grunt task should warn about 'Bdb(1)' missing in config (found in parsing)
            configBothWithParsing: {
                options: {
                    namespace: '#atomic',
                    configFile: 'test/fixtures/sample-config.js',
                    configOutput: 'tmp/configOutput.json',
                    config: {
                        classNames: ['D(b)'],
                    },
                },
                files: [
                    {
                        src: ['test/fixtures/*.html'],
                        dest: 'tmp/configBothWithParsing.css',
                    },
                ],
            },
            // Grunt task should warn about 'Bdb(1)' missing in config (found in parsing)
            customRulesets: {
                options: {
                    namespace: '#atomic',
                    configFile: 'test/fixtures/sample-config.js',
                    rules: ['test/fixtures/customRules.js'],
                    config: {
                        classNames: ['FooBar()'],
                    },
                },
                files: [
                    {
                        dest: 'tmp/customRuleset.css',
                    },
                ],
            },
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js'],
        },
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['atomizer', 'nodeunit', 'clean']);
};
