/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

'use strict';

var Atomizer = require('atomizer');
var path = require('path');
var _ = require('lodash');
var crypto = require('crypto');

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
            gruntConfig = _.clone(configFile, true);
        }

        if (options.config) {
            validateConfig(options.config, 'options.config');
            gruntConfig = _.merge(gruntConfig, options.config, handleMergeArrays);
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

            if (f.src) {
                var classNames = [];
                grunt.log.writeln('Finding classes...');
                f.src.forEach(function (filePath) {
                    classNames = _.union(classNames, atomizer.findClassNames(grunt.file.read(filePath)));
                });

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
                    grunt.log.oklns('Config file ' + options.configOutput + ' successfully created.');
                }
                grunt.file.write(f.dest, content);
                grunt.log.oklns('File ' + f.dest + ' successfully created.');

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
