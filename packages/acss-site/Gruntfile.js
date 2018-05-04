/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var webpack = require('webpack');

module.exports = function(grunt) {
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        // project variables
        project: {
            app: './app',
            docs: './docs'
        },

        // ------------------------------------------------------------------------------
        // DEV TASKS --------------------------------------------------------------------
        // ------------------------------------------------------------------------------

        // lint files
        jshint: {
            all: [
                '*.js',
                '{app/actions,app/components,app/services,app/stores,/app/utils}/**/*.js'
            ],
            options: {
                jshintrc: true
            }
        },

        // ------------------------------------------------------------------------------
        // PROD/DEV ---------------------------------------------------------------------
        // ------------------------------------------------------------------------------

        // atomizer: initial task to generate the config
        atomizer: {
            docs: {
                options: {
                    ie: true,
                    configFile: './config/atomic-config.js',
                    configOutput: './build/atomizer.json'
                },
                files: [
                    {
                        src: [
                            './app/components/**/*.jsx',
                            './docs/**/*.md',
                            './docs/**/*.html'
                        ],
                        dest: '<%= project.docs %>/assets/atomic.css'
                    }
                ]
            }
        },

        // cssmin for production (atomizer needs to run first)
        cssmin: {
            docs: {
                options: {
                    report: 'gzip',
                    compatibility: 'ie7',
                    sourceMap: false
                },
                files: [{
                    src: [
                        '<%= project.app %>/assets/css/base.css',
                        '<%= project.docs %>/assets/atomic.css',
                        '<%= project.app %>/assets/css/helpers.css',
                        '<%= project.app %>/assets/css/custom.css',
                        '<%= project.app %>/assets/css/mq.css',
                        '<%= project.app %>/assets/css/syntax.css'
                    ],
                    dest: '<%= project.docs %>/assets/main.css'
                }, {
                    src: [ '<%= project.app %>/assets/css/ie.css'],
                    dest: '<%= project.docs %>/assets/ie.css'
                }]
            },
        },

        postcss: {
           docs: {
               options: {
                   processors: [
                       require('autoprefixer-core')({
                           browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'iOS 5']
                       })
                   ]
               },
               files: [{
                   src: ['<%= project.docs %>/assets/main.css'],
                   dest: '<%= project.docs %>/assets/main.css'
               }, {
                   src: ['<%= project.app %>/assets/css/ie.css'],
                   dest: '<%= project.docs %>/assets/ie.css'
               }]
           }
        },

        // webpack
        webpack: {
            "dev": {
                resolve: {
                    extensions: ['', '.js', '.jsx']
                },
                entry: '<%= project.app %>/client-reference.js',
                output: {
                    path: '<%= project.docs %>/assets/js',
                    publicPath: '/public/js/',
                    filename: '[name].js',
                    chunkFilename: '[name].js'
                },
                module: {
                    loaders: [
                        { test: /\.jsx?$/, exclude: /node_modules/, loader: require.resolve('babel-loader') },
                        { test: /\.json$/, loader: 'json-loader'}
                    ]
                },
                plugins: [
                    new webpack.IgnorePlugin(/vertx/),
                    // new webpack.optimize.CommonsChunkPlugin('common.js', undefined, 2),
                    new webpack.NormalModuleReplacementPlugin(/^react(\/addons)?$/, require.resolve('react/addons'))
                ],
                stats: {
                    colors: true
                },
                devtool: 'source-map',
                watch: true
            },
            "prod": {
                resolve: {
                    extensions: ['', '.js', '.jsx']
                },
                entry: '<%= project.app %>/client-reference.js',
                output: {
                    path: '<%= project.docs %>/assets/js',
                    publicPath: '/public/js/',
                    filename: '[name].js',
                    chunkFilename: '[name].js'
                },
                module: {
                    loaders: [
                        { test: /\.jsx?$/, exclude: /node_modules/, loader: require.resolve('babel-loader') },
                        { test: /\.json$/, loader: 'json-loader'}
                    ]
                },
                plugins: [
                    new webpack.DefinePlugin({
                        'process.env': {
                            NODE_ENV: JSON.stringify('production')
                        }
                    }),

                    // These are performance optimizations for your bundles
                    new webpack.optimize.DedupePlugin(),
                    new webpack.optimize.OccurenceOrderPlugin(),

                    // This ensures requires for `react` and `react/addons` normalize to the same requirement
                    new webpack.NormalModuleReplacementPlugin(/^react(\/addons)?$/, require.resolve('react/addons')),

                    new webpack.optimize.UglifyJsPlugin({
                        compress: {
                            warnings: false
                        }
                    })
                ],

                // removes verbosity from builds
                progress: false
            }
        }
    });

    // dev
    grunt.registerTask('default', [
        'atomizer:docs',
        'cssmin:docs',
        'postcss:docs',
        'webpack:dev'
    ]);

    grunt.registerTask('build', [
        'atomizer:docs',
        'cssmin:docs',
        'postcss:docs',
        'webpack:prod'
    ]);
};
