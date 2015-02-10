/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
module.exports = function(grunt) {
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        // project variables
        project: {
            app: './app',
            build: '<%= project.app %>/build'
        },

        // clean build
        clean: ['<%= project.build %>'],

        // run nodemon and watch concurrently
        concurrent: {
            dev: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        // watch for changes in static files (does not require a server restart) run tasks then reload
        // .rebooted is written by the nodemon task, it's written to force a browser reload
        watch: {
            atomizer: {
                files: ['config/atomic-config.js', '.rebooted', '<%= project.app %>/assets/css/*.css'],
                tasks: ['atomizer', 'concat'],
                options: {
                    interrupt: true,
                    livereload: true
                }
            },
        },

        // nodemon to restart server if files change
        nodemon: {
            dev: {
                script: '<%= project.app %>/server.js',
                options: {
                    args: ['--dev'],
                    env: {
                        PORT: '3000'
                    },
                    callback: function(nodemon) {
                        nodemon.on('log', function(event) {
                            console.log(event.colour);
                        });

                        // opens browser on initial server start
                        nodemon.on('config:update', function() {
                            // Delay before server listens on port
                            setTimeout(function() {
                                require('open')('http://localhost:3000');
                            }, 1000);
                        });

                        // refreshes browser when server reboots
                        nodemon.on('restart', function() {
                            // Delay before server listens on port
                            setTimeout(function() {
                                require('fs').writeFileSync('.rebooted', 'rebooted');
                            }, 1000);
                        });
                    }
                }
            }
        },

        // atomizer: initial task to generate the config
        atomizer: {
            app: {
                files: {
                    '<%= project.build %>/css/atomic.css': './config/atomic-config.js'
                }
            }
        },

        // concat: concatenate CSS files
        concat: {
            app: {
                files: {
                    '<%= project.build %>/css/bundle.css': [
                        '<%= project.app %>/assets/css/base.css',
                        '<%= project.app %>/assets/css/helpers.css',
                        '<%= project.app %>/assets/css/custom.css',
                        '<%= project.app %>/assets/css/mq.css'
                    ]
                }
            }
        },

        // webpack
        webpack: {
            dev: {
                resolve: {
                    extensions: ['', '.js', '.jsx']
                },
                entry: '<%= project.app %>/client.js',
                output: {
                    path: '<%= project.build %>/js',
                    filename: 'client.js'
                },
                module: {
                    loaders: [{
                        test: /\.jsx$/,
                        loader: 'jsx-loader'
                    }]
                },
                watch: true
            }
        }
    });

    grunt.registerTask('default', ['clean', 'concat:app', 'atomizer:app', 'webpack:dev', 'concurrent:dev']);
    // TODO: grunt.registerTask('build', ['clean', 'atomizer:app', 'webpack:prod']);
};
