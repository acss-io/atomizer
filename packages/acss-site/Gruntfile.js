/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

// format `*.[chunkhash].min.js`
var CHUNK_REGEX = /^([A-Za-z0-9_\-]+)\..*/;

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

        // copy images to build
        copy: {
            app: {
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: '<%= project.app %>/assets/images/',
                    src: '**',
                    dest: '<%= project.build %>/images/',
                    filter: 'isFile'
                }]
            }
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
                    ext: 'js,md',
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
                options: {
                    configFile: './config/atomic-config.js'
                },
                files: [
                    {
                        src: ['./app/components/*.jsx', './app/docs/*.md'],
                        dest: '<%= project.build %>/css/atomic.css'
                    }
                ]
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
                        '<%= project.app %>/assets/css/mq.css',
                        '<%= project.app %>/assets/css/syntax.css'
                    ],
                    '<%= project.build %>/css/ie.css': '<%= project.app %>/assets/css/ie.css'
                }
            }
        },

        // webpack
        webpack: {
            dev: {
                resolve: {
                    extensions: ['', '.js', '.jsx']
                },
                externals: {
                    absurd: "Absurd"
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
            },
            prod: {
                resolve: {
                    extensions: ['', '.js', '.jsx']
                },
                externals: {
                    absurd: "Absurd"
                },
                entry: '<%= project.app %>/client.js',
                output: {
                    path: '<%= project.build %>/js',
                    publicPath: 'http://l.yimg.com/os/acss/js/',
                    filename: '[name].[chunkhash].min.js',
                    chunkFilename: '[name].[chunkhash].min.js'
                },
                module: {
                    loaders: [
                        { test: /\.jsx$/, loader: 'jsx-loader' }
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
                    new webpack.optimize.CommonsChunkPlugin('common.[hash].min.js', 2),

                    // This ensures requires for `react` and `react/addons` normalize to the same requirement
                    new webpack.NormalModuleReplacementPlugin(/^react(\/addons)?$/, require.resolve('react/addons')),

                    new webpack.optimize.UglifyJsPlugin({
                        compress: {
                            warnings: false
                        }
                    }),

                    // generates webpack assets config to use hashed assets in production mode
                    function webpackStatsPlugin() {
                        this.plugin('done', function(stats) {
                            var data = stats.toJson();
                            var assets = data.assetsByChunkName;
                            var output = {
                                assets: {},
                                cdnPath: this.options.output.publicPath
                            };

                            Object.keys(assets).forEach(function eachAsset(key) {
                                var value = assets[key];

                                // if `*.[chunkhash].min.js` regex matched, then use file name for key
                                var matches = key.match(CHUNK_REGEX);
                                if (matches) {
                                    key = matches[1];
                                }

                                output.assets[key] = value;
                            });

                            fs.writeFileSync(
                                path.join(process.cwd(), 'app', 'build', 'assets.json'),
                                JSON.stringify(output, null, 4)
                            );
                        });
                    }
                ],

                // removes verbosity from builds
                progress: false
            }
        }
    });

    grunt.registerTask('default', ['clean', 'concat:app', 'atomizer:app', 'copy:app', 'webpack:dev', 'concurrent:dev']);
    grunt.registerTask('build', ['clean', 'atomizer:app', 'webpack:prod']);
};
