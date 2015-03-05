/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

'use strict';

var atomizer = require('atomizer');
var path = require('path');
var _ = require('lodash');

module.exports = function (grunt) {

    /**
     * Validates an atomizer config file.
     * @param  {object} config        The config file.
     * @param  {string} configObjPath A string representing the config file object. Used to show the error message.
     * @void
     */
    function validateConfig(config, configObjPath) {
        if (grunt.util.kindOf(config) !== 'object') {            
            grunt.fail.warn('`' + configObjPath + '` must be an object.');
        }
    }

    /**
     * TASKS
     */
    grunt.registerMultiTask('atomizer', 'Grunt plugin to execute Atomizer given a config file', function () {
        var done = this.async();
        var options = this.options({
            configFile: null,
            configOutput: null,
            config: null
        });
        var gruntConfig = {}; // the config if passed directly via the grunt task
        var configFile;

        if (options.require && options.require.length > 0) {
            options.require = grunt.file.expand(options.require);
        }

        if (!options.configFile && !options.config) {
            grunt.fail.warn('`options.config` or `options.configFile` is required.');
        }

        if (options.configFile) {
            configFile = require(path.resolve(options.configFile));
            validateConfig(configFile, 'options.configFile');
            gruntConfig = _.clone(configFile, true);
        }

        if (options.config) {
            validateConfig(options.config, 'options.config');
            gruntConfig = _.merge(gruntConfig, options.config);
        }

        if (options.namespace && grunt.util.kindOf(options.namespace) !== 'string') {
            grunt.fail.warn('`options.namespace` must be a string.');
        }

        if (options.end) {
            if (grunt.util.kindOf(options.end) !== 'string') {
                grunt.fail.warn('`options.end` must be a string.');
            }

            if (options.end !== 'left' && options.end !== 'right') {
                grunt.fail.warn('`options.end` must be either `left` or `right`.');
            }
        }

        if (options.start) {
            if (grunt.util.kindOf(options.end) !== 'string') {
                grunt.fail.warn('`options.start` must be a string.');
            }

            if (options.start !== 'left' && options.start !== 'right') {
                grunt.fail.warn('`options.start` must be either `left` or `right`.');
            }
        }

        this.files.forEach(function (f) {
            var config = {};
            var content;

            if (f.src) {
                var classNamesObj = {};
                f.src.forEach(function (filePath) {
                    atomizer.parse(grunt.file.read(filePath), classNamesObj);
                });

                // Logging
                for (var className in classNamesObj) {
                    grunt.verbose.writeln('Found `' + className + '`, occurrences: ' + classNamesObj[className]);
                }

                // get the config object given an array of atomic class names
                config = atomizer.getConfig(_.keys(classNamesObj), gruntConfig, grunt.option.flags().indexOf('--verbose') > -1);
            } else {
                config = gruntConfig;
            }

            // run atomizer with the config we got
            content = atomizer.createCSS(config, options);

            // write file
            if (options.configOutput) {
                grunt.file.write(options.configOutput, JSON.stringify(config, null, 2));
            }
            grunt.file.write(f.dest, content);

            grunt.log.oklns('File ' + f.dest + ' successfully created.');
        });

        done();
    });
};
