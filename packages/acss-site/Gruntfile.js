/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
module.exports = function (grunt) {
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
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
        }
    });

    grunt.task.loadTasks('grunt/');
    grunt.registerTask('default', ['webpack:app', 'nodemon:app']);
};