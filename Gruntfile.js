/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

const path = require('path');
const webpack = require('webpack');

module.exports = function (grunt) {
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        // project variables
        project: {
            app: './app',
            docs: './docs',
        },

        // atomizer: initial task to generate the config
        atomizer: {
            docs: {
                options: {
                    configFile: './config/atomic.config.js',
                    configOutput: './build/atomizer.json',
                },
                files: [
                    {
                        src: [
                            '<%= project.app %>/components/**/*.jsx',
                            '<%= project.app %>/assets/js/*.js',
                            '<%= project.docs %>/**/*.md',
                            '<%= project.docs %>/**/*.html'
                        ],
                        dest: '<%= project.docs %>/assets/css/atomic.css',
                    },
                ],
            },
            examples: {
                options: {
                    configFile: './examples/atomizer.config.js'
                },
                files: [{
                    src: ['./examples/**/*.html'],
                    dest: './examples/css/atomic.css'
                }]
            }
        },

        // simple connect server for examples
        connect: {
            examples: {
                options: {
                    port: 3000,
                    base: 'examples',
                    open: true
                }
            }
        },

        // cssmin for production (atomizer needs to run first)
        cssmin: {
            docs: {
                options: {
                    report: 'gzip',
                    sourceMap: false,
                },
                files: [
                    {
                        src: [
                            '<%= project.app %>/assets/css/base.css',
                            '<%= project.docs %>/assets/css/atomic.css',
                            '<%= project.app %>/assets/css/helpers.css',
                            '<%= project.app %>/assets/css/custom.css',
                            '<%= project.app %>/assets/css/mq.css',
                            '<%= project.app %>/assets/css/syntax.css',
                            '<%= project.app %>/assets/css/repl.css',
                        ],
                        dest: '<%= project.docs %>/assets/css/main.css',
                    },
                ],
            },
        },

        postcss: {
            docs: {
                options: {
                    processors: [require('autoprefixer')()],
                },
                files: [
                    {
                        src: ['<%= project.docs %>/assets/css/main.css'],
                        dest: '<%= project.docs %>/assets/css/main.css',
                    },
                ],
            },
        },

        watch: {
            docs: {
                files: [
                    '<%= project.app %>/**/*',
                    '<%= project.docs %>/**/*',
                    '!<%= project.docs %>/_site/**/*',
                    'packages/atomizer/src/**/*'
                ],
                tasks: ['dev'],
                options: {
                    spawn: false,
                },
            },
            examples: {
                options: {
                    livereload: true
                },
                files: [
                    './examples/**/*.html',
                    './examples/**/*.js',
                    './examples/**/*.css'
                ],
                tasks: ['atomizer:examples']
            }
        },

        // webpack
        webpack: {
            dev: {
                mode: 'development',
                resolve: {
                    extensions: ['', '.js', '.jsx'],
                },
                entry: {
                    main: '<%= project.app %>/client-reference.js',
                    repl: '<%= project.app %>/assets/js/repl.js',
                    search: '<%= project.app %>/assets/js/search.js',
                },
                output: {
                    path: path.resolve(__dirname, 'docs', 'assets', 'js'),
                    publicPath: '/public/js/',
                    filename: '[name].js',
                    chunkFilename: '[name].js',
                },
                module: {
                    rules: [{ test: /\.jsx?$/, exclude: /node_modules/, use: { loader: 'babel-loader' } }],
                },
                plugins: [
                    new webpack.DefinePlugin({
                        'process.env': {
                            NODE_ENV: JSON.stringify('development'),
                        },
                    }),
                ],
                devtool: 'source-map',
                stats: {
                    colors: true,
                },
                watch: false,
            },
            prod: {
                mode: 'production',
                resolve: {
                    extensions: ['', '.js', '.jsx'],
                },
                entry: {
                    main: '<%= project.app %>/client-reference.js',
                    repl: '<%= project.app %>/assets/js/repl.js',
                    search: '<%= project.app %>/assets/js/search.js',
                },
                output: {
                    path: path.resolve(__dirname, 'docs', 'assets', 'js'),
                    publicPath: '/public/js/',
                    filename: '[name].js',
                    chunkFilename: '[name].js',
                },
                module: {
                    rules: [{ test: /\.jsx?$/, exclude: /node_modules/, use: { loader: 'babel-loader' } }],
                },
                plugins: [
                    new webpack.DefinePlugin({
                        'process.env': {
                            NODE_ENV: JSON.stringify('production'),
                        },
                    }),
                ],
                progress: false,
                stats: 'errors-only',
            },
        },
    });

    grunt.registerTask('default', ['atomizer:docs', 'cssmin:docs', 'postcss:docs', 'webpack:prod']);
    grunt.registerTask('dev', ['atomizer:docs', 'cssmin:docs', 'postcss:docs', 'webpack:dev']);
    grunt.registerTask('examples', ['atomizer:examples', 'connect:examples', 'watch:examples']);
};
