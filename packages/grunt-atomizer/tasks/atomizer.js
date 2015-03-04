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
        if (!config.config || grunt.util.kindOf(config.config) !== 'object') {
            grunt.fail.warn('If `' + configObjPath + '` has been passed, it must be an object.');
        }
        if (!config.config.namespace || grunt.util.kindOf(config.config.namespace) !== 'string') {
            grunt.fail.warn('`' + configObjPath + '.config.namespace` is required and must be a string.');
        }
        if (!config.config.end || grunt.util.kindOf(config.config.end) !== 'string') {
            grunt.fail.warn('`' + configObjPath + '.config.end` is required and must be a string.');
        }
        if (config.config.end !== 'left' && config.config.end !== 'right') {
            grunt.fail.warn('`' + configObjPath + '.config.end` must be either `left` or `right`.');
        }
        if (!config.config.start || grunt.util.kindOf(config.config.end) !== 'string') {
            grunt.fail.warn('`' + configObjPath + '.config.start` is required and must be a string.');
        }
        if (config.config.start !== 'left' && config.config.start !== 'right') {
            grunt.fail.warn('`' + configObjPath + '.config.start` must be either `left` or `right`.');
        }
    }

    /**
     * helper function to handle merging array of objects
     * @param  {mixed} a Data of the first merge param
     * @param  {mixed} b Data of the second merge param
     * @return {mixed}   The merged object
     */
    function handleMergeArrays (a, b) {
        if (_.isArray(a) && _.isArray(b)) {
            a.forEach(function(item){
                if(_.findIndex(b, item) === -1) {
                    b.push(item);
                }
            });
            return b;
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
            }

            // merge the config we have with the grunt config
            config = _.merge(config, gruntConfig, handleMergeArrays);

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
