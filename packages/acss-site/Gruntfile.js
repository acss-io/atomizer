/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

// format `*.[chunkhash].min.js`
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};



module.exports = function(grunt) {
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        // project variables
        project: {
            app: './app',
            build: '<%= project.app %>/build',
            public: '/public',
            cdnPath: 'http://l.yimg.com/os/acss/'
        },

        // clean build
        clean: {
            'build': '<%= project.build %>',
            'cdntrash': {
                files: [{
                    expand: true,
                    extDot: 'last',
                    cwd: '<%= project.build %>',
                    src: ['**/*.{css,js}', '!**/*.*.{css,js}']
                }]
            },
            'cdnimagestrash': {
                files: [{
                    expand: true,
                    extDot: 'last',
                    cwd: '<%= project.build %>',
                    src: ['images/*', '!images/*.*.*']
                }]
            }
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
                tasks: ['atomizer', 'cssmin:dev', 'devmanifest'],
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

        // ------------------------------------------------------------------------------
        // PROD/DEV ---------------------------------------------------------------------
        // ------------------------------------------------------------------------------
        
        copy: {
            images: {
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

        // cssmin for production (atomizer needs to run first)
        cssmin: {
            dev: {
                options: {
                    report: 'gzip',
                    compatibility: 'ie7',
                    sourceMap: true
                },
                files: [{
                    src: [
                        '<%= project.build %>/css/atomic.css',
                        '<%= project.app %>/assets/css/base.css',
                        '<%= project.app %>/assets/css/helpers.css',
                        '<%= project.app %>/assets/css/custom.css',
                        '<%= project.app %>/assets/css/mq.css',
                        '<%= project.app %>/assets/css/syntax.css'
                    ],
                    dest: '<%= project.build %>/css/bundle.css'
                }, {
                    src: [ '<%= project.app %>/assets/css/ie.css'],
                    dest: '<%= project.build %>/css/ie.css'
                }]
            },
            prod: {
                options: {
                    report: 'gzip',
                    compatibility: 'ie7',
                    sourceMap: false
                },
                files: [{
                    src: [
                        '<%= project.build %>/css/atomic.css',
                        '<%= project.app %>/assets/css/base.css',
                        '<%= project.app %>/assets/css/helpers.css',
                        '<%= project.app %>/assets/css/custom.css',
                        '<%= project.app %>/assets/css/mq.css',
                        '<%= project.app %>/assets/css/syntax.css'
                    ],
                    dest: '<%= project.build %>/css/bundle.css'
                }, {
                    src: [ '<%= project.app %>/assets/css/ie.css'],
                    dest: '<%= project.build %>/css/ie.css'
                }]
            },
        },

        // has files for caching on cdn
        hash: {
            options: {
                mapping: '<%= project.build %>/assets.json',
                srcBasePath: 'app/build/', // the base Path you want to remove from the `key` string in the mapping file
                destBasePath: 'app/build/', // the base Path you want to remove from the `value` string in the mapping file
                flatten: false, // Set to true if you don't want to keep folder structure in the `key` value in the mapping file
                hashLength: 8, // hash length, the max value depends on your hash function
                hashFunction: function(source, encoding){ // default is md5
                    return require('crypto').createHash('sha1').update(source, encoding).digest('hex');
                }
            },
            css: {
                src: '<%= project.build %>/css/*.css',
                dest: '<%= project.build %>/css/'
            },
            js: {
                src: '<%= project.build %>/js/*.js',
                dest: '<%= project.build %>/js/'
            },
            images: {
                options: {
                    mapping: '<%= project.build %>/images.json'
                },
                src: '<%= project.build %>/images/*',
                dest: '<%= project.build %>/images/'
            }
        },

        // replace paths in css
        replaceimg: {
            images: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        extDot: 'last',
                        src: ['<%= project.build %>/css/*.css'],
                        dest: '<%= project.build %>/css/'
                    }
                ]
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
                    publicPath: '/public/js/',
                    filename: '[name].js',
                    chunkFilename: '[name].js'
                },
                module: {
                    loaders: [
                        { test: /\.jsx$/, loader: 'jsx-loader' },
                        { test: /\.json$/, loader: 'json-loader'}
                    ]
                },
                plugins: [
                    new webpack.optimize.CommonsChunkPlugin('common.js', undefined, 2),
                    new webpack.NormalModuleReplacementPlugin(/^react(\/addons)?$/, require.resolve('react/addons'))
                ],
                stats: {
                    colors: true
                },
                devtool: 'source-map',
                watch: true
            },
            prod: {
                resolve: {
                    extensions: ['', '.js', '.jsx']
                },
                externals: {
                    absurd: 'Absurd'
                },
                entry: '<%= project.app %>/client.js',
                output: {
                    path: '<%= project.build %>/js',
                    publicPath: 'http://l.yimg.com/os/acss/js/',
                    filename: '[name].js',
                    chunkFilename: '[name].js'
                },
                module: {
                    loaders: [
                        { test: /\.jsx$/, loader: 'jsx-loader' },
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
                    new webpack.optimize.CommonsChunkPlugin('common.js', 2),

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

    // replace image paths with images.json generated by hash:images
    grunt.registerMultiTask('replaceimg', function () {
        var images = require(grunt.config.get('project.build') + '/images.json');

        this.files.forEach(function (f) {
            var src;

            if (f.src) {
                f.src.forEach(function (filePath) {
                    src = grunt.file.read(filePath);
                    // replace
                    for (var image in images) {
                        if (images.hasOwnProperty(image)) {                            
                            src = src.replace(new RegExp(escapeRegex(image), 'g'), images[image]);
                        }
                    }
                });
            }
            grunt.file.write(f.dest, src);
            grunt.log.oklns('File ' + f.dest + ' successfully created.');
        });
    });

    // used to normalize how we get assets on runtime
    grunt.registerTask('devmanifest', function () {
        var images = {},
            assets = {},
            build = grunt.config.get('project.build'),
            public = grunt.config.get('project.public');

        grunt.file.recurse(build, function (abspath, rootdir, subdir, filename) {
            var path = subdir + '/' + filename;
            if (subdir === 'images') {
                images[path] = public + '/' + path;
            } else if (!/\.map/.test(filename)) {
                assets[path] = public + '/' + path;
            }
        });

        grunt.file.write(path.join(build, 'images.json'), JSON.stringify(images, null, 4));
        grunt.file.write(path.join(build, 'assets.json'), JSON.stringify(assets, null, 4));
        grunt.log.oklns('Files assets.json and images.json successfully created.');
    });

    grunt.registerTask('prodmanifest', function () {
        var images = {},
            assets = {},
            build = grunt.config.get('project.build'),
            cdnPath = grunt.config.get('project.cdnPath'),
            images = require('./app/build/images.json'),
            assets = require('./app/build/assets.json');

        for (var key in images) {
            if (images.hasOwnProperty(key)) {
                images[key] = cdnPath + images[key];
            }
        }

        for (var key in assets) {
            if (assets.hasOwnProperty(key)) {
                assets[key] = cdnPath + assets[key];
            }
        }

        grunt.file.write(path.join(build, 'images.json'), JSON.stringify(images, null, 4));
        grunt.file.write(path.join(build, 'assets.json'), JSON.stringify(assets, null, 4));
        grunt.log.oklns('Files assets.json and images.json successfully created.');
    });

    // dev
    grunt.registerTask('default', [
        'clean:build',
        'copy:images',
        'atomizer:app',
        'cssmin:dev',
        'devmanifest',
        'webpack:dev',
        'devmanifest',
        'concurrent:dev'
    ]);

    // build assets for prod
    grunt.registerTask('build', [
        'clean:build',
        'atomizer:app',
        'cssmin:prod',
        'copy:images',
        'hash:images',
        'clean:cdnimagestrash',
        'replaceimg:images',
        'hash:css',
        'webpack:prod',
        'hash:js',
        'clean:cdntrash',
        'prodmanifest'
    ]);
};
