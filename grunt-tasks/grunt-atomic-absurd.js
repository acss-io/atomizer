'use strict';

module.exports = function(grunt) {
    var path = require('path'),
        chalk = require('chalk'),
        Absurd = require('absurd'),
        validateCss = require('css-validator'),
        api;

    grunt.registerMultiTask('atomic-absurd', 'Grunt plugin to compile Atomic.css using Absurdjs', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            require: [],
            morph: null,
            combineSelectors: true,
            minify: false,
            keepCamelCase: false,
            extCSS: '.css'
        });
        var done = this.async();

        function formatMessage (message) {
            return message.replace(/\n+/g,'').
                   trim().
                   replace(/\(.+\)/g,'').
                   replace(/\s*:\s*$/,'').
                   replace(/\s*:\s*/,': ').
                   replace(/\s{2,}/g,' ').
                   replace(/\s{4,}/g,'\n');
        }

        // Iterate over all src-dest file pairs
        this.files.forEach(function(f) {
            // validate src files
            var srcFiles = f.src.filter(function(filepath) {
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file ' + chalk.cyan(filepath) + ' not found.');
                    return false;
                } else {
                    return true;
                }
            });

            if (srcFiles.length === 0) {
                grunt.log.warn('Destination ' + chalk.cyan(f.dest) + ' not written because src files were empty. ');
                return;
            }

            api = Absurd();

            api.morph(options.morph);

            if (options.require.length > 0) {
                api.import(grunt.file.expand(options.require).map(function(file) {
                    return path.resolve(file);
                }));
            }

            api.import(srcFiles.map(function(file) {
                return path.resolve(file);
            }));

            api.compile(function(err, result) {
                if (err) {
                    grunt.log.error('Absurd:' + err);
                    return;
                }

                validateCss(result, function (err, data) {
                    if (err) {
                        grunt.log.error(err);
                        done(false);
                    }
                    else if (!data.validity) {
                        grunt.log.error(chalk.red('CSS file has NOT been created.'));
                        grunt.log.error(chalk.yellow('Please check the errors below:'));
                        data.errors.forEach(function (error) {
                            grunt.log.writeln(chalk.yellow('Line ' + error.line) + ' ' + chalk.cyan(formatMessage(error.message)));
                        });
                        done(false);
                    }
                    else {
                        grunt.file.write(path.resolve(f.dest), result);
                        grunt.verbose.writeln('File ' + chalk.cyan(f.dest) + ' created.');
                        done();
                    }
                });
            }, options);
        });
    });
};
