/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

'use strict';

var Atomizer = require('atomizer');
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var crypto = require('crypto');
var utils = require('atomizer/src/lib/utils');

function hash(config, options) {
    var src = JSON.stringify(config) + JSON.stringify(options);
    return crypto.createHash('sha1').update(src, 'utf8').digest('hex');
}

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
        var options = this.options();
        var gruntConfig = {}; // the config if passed directly via the grunt task
        var configFile;
        var cacheFile = path.join('./.atomic-cache/', this.target || 'atomic');

        if (options.rules && options.rules.length > 0) {
            options.rules = grunt.file.expand(options.rules);
        }

        if (options.require && options.require.length > 0) {
            options.require = grunt.file.expand(options.require);
        }

        if (options.configFile && grunt.file.exists(options.configFile)) {
            configFile = require(path.resolve(options.configFile));
            validateConfig(configFile, 'options.configFile');
            gruntConfig = _.cloneDeep(configFile);
        }

        if (options.config) {
            validateConfig(options.config, 'options.config');
            gruntConfig = utils.mergeConfigs([gruntConfig, options.config]);
        }

        if (options.namespace && grunt.util.kindOf(options.namespace) !== 'string') {
            grunt.fail.warn('`options.namespace` must be a string.');
        }

        if (options.rtl) {
            if (grunt.util.kindOf(options.rtl) !== 'boolean') {
                grunt.fail.warn('`options.rtl` must be a boolean.');
            }
        }

        if (options.ie) {
            if (grunt.util.kindOf(options.ie) !== 'boolean') {
                grunt.fail.warn('`options.ie` must be a boolean.');
            }
        }

        var atomizer = new Atomizer({ verbose: (grunt.option.flags().indexOf('--verbose') > -1) });

        if (options.rules && options.rules.length > 0) {
            options.rules.forEach(function (ruleFile) {
                grunt.log.writeln('Adding rules found in ' + ruleFile);
                atomizer.addRules(require(path.resolve(ruleFile)));
            });
        }

        this.files.forEach(function (f) {
            var config = {};
            var content;
            var cacheContent;
            var contentLength = 0;

            if (f.src) {
                var classNames = [];
                grunt.log.writeln('Parsing ' + f.src.length + ' files for Atomic classes');
                f.src.forEach(function (filePath) {
                    var foundClasses = atomizer.findClassNames(grunt.file.read(filePath));
                    classNames = _.union(classNames, foundClasses);
                    grunt.log.debug('+ ' + filePath + ' (' + foundClasses.length + ' classes found)');
                });
                grunt.log.writeln(classNames.length + ' unique classes found');

                // get the config object given an array of atomic class names
                config = atomizer.getConfig(classNames, gruntConfig);
            } else {
                config = gruntConfig;
            }

            // cacheContent is a hash of config and options
            cacheContent = hash(config, options);

            // run atomizer with the config we got
            // first check if we already know the output of this file in cache
            if (options.cache && grunt.file.exists(cacheFile) && grunt.file.read(cacheFile) === cacheContent) {
                grunt.log.oklns('Skipping CSS generation because nothing has changed.');
                return;
            } else {
                grunt.log.writeln('Creating CSS...');
                content = atomizer.getCss(config, options);

                // write file
                if (options.configOutput) {
                    grunt.file.write(options.configOutput, JSON.stringify(config, null, 2));
                    grunt.log.oklns('Writing configuration to ' + options.configOutput);
                }
                grunt.file.write(f.dest, content);
                var stats = fs.statSync(f.dest);
                if (stats.size > 0) {
                    contentLength = (stats.size / 1024).toFixed(2);
                }
                grunt.log.oklns('Writing Atomic CSS to ' + f.dest + ' (' + contentLength + ' kb)');

                // cache it
                if (options.cache) {
                    // clean cache file
                    if (grunt.file.exists(cacheFile)) {
                        grunt.file.delete(cacheFile);
                    }
                    // write
                    grunt.file.write(cacheFile, cacheContent);
                    grunt.log.oklns('Cache file: ' + cacheFile + ' successfully created.');
                }
            }
        }, this);

        done();
    });
};
