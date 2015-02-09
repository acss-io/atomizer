/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
module.exports = function (grunt) {
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        copy: {
            app: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/assets/',
                        src: ['**/*.css'],
                        dest: 'app/build/'
                    }
                ]
            }
        },
        webpack: {
            app: {
                resolve: {
                    extensions: ['', '.js', '.jsx']
                },
                entry: './app/client.js',
                output: {
                    path: './app/build/js',
                    filename: 'client.js'
                },
                module: {
                    loaders: [
                        { test: /\.css$/, loader: 'style!css' },
                        { test: /\.jsx$/, loader: 'jsx-loader' }
                    ]
                },
                watch: true
            }
        },
        nodemon: {
            app: {
                script: './app/server.js',
                options: {
                    ignore: ['build/**'],
                    ext: 'js,jsx'
                }
            }
        },
        getsassvars: {
            builder: {
                files: {
                    './app/build/js/reference.js': ['./parser/*.scss'],
                }
            }
        }
    });

    grunt.task.loadTasks('grunt/');
    grunt.registerTask('default', ['copy:app', 'getsassvars:builder', 'webpack:app', 'nodemon:app']);
};