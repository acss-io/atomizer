/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

'use strict';

var atomizer = require('atomizer');
var rules = require('atomizer/src/rules');
var path = require('path');
var _ = require('lodash');

module.exports = function (grunt) {

    /**
     * Get the unit of a length.
     * @param  {string}  value The length to be parsed.
     * @return {string|false}  The unit of the string or false if length is not a number.
     */
    function getUnit(value) {
        if (isNaN(parseFloat(value, 10))) {
            return false;
        }
        return value.replace(/^[\d\.\s]+/, '');
    }

    /**
     * Tells wether a value is a length unit or not
     * @param  {string}  value The value to be tested.
     * @return {Boolean}
     */
    function isLength(value) {
        return parseInt(value, 10) === 0 || (/^-?(?:\d+)?\.?\b\d+[a-z]+$/.test(value) && ['em', 'ex', 'ch', 'rem', 'vh', 'vw', 'vmin', 'vmax', 'px', 'mm', 'cm', 'in', 'pt', 'pc'].indexOf(getUnit(value)) >= 0);
    }

    /**
     * Tells wether a value is a percentage or not
     * @param  {string}  value The value to be tested.
     * @return {Boolean}
     */
    function isPercentage(value) {
        return /^-?(?:\d+)?\.?\b\d+%$/.test(value);
    }

    /**
     * Tells wether a value is a hex value or not
     * @param  {string}  value The value to be tested.
     * @return {Boolean}
     */
    function isHex(value) {
        return /^[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(value);
    }

    /**
     * Tells wether a value is an integer or not
     * @param  {string}  value The value to be tested.
     * @return {Boolean}
     */
    function isInteger(value) {
        value = parseInt(value, 10);
        return !isNaN(value) && (value % 1) === 0;
    }

    /**
     * Tells wether a value is a float or not
     * @param  {string}  value The value to be tested.
     * @return {Boolean}
     */
    function isFloat(value) {
        value = parseFloat(value, 10);
        return (!isNaN(value) && value.toString().indexOf('.') !== -1);
    }

    /**
     * Look for atomic class names in text and add to class names object.
     * @param  {string} src The text to be parsed.
     * @param  {regexp} atomicRegex The regular expression to find class names.
     * @param  {object} classNamesObj The classNames object.
     * @return {array} An array of class names.
     */
    function findAtomicClasses(src, atomicRegex, classNamesObj) {
        var match = atomicRegex.exec(src);
        while (match !== null) {
            classNamesObj[match[0]] = classNamesObj[match[0]] ? classNamesObj[match[0]] + 1 : 1;
            match = atomicRegex.exec(src);
        }
    }

    /**
     * Used to log warning messages about missing classes in the config
     * @param  {string} className The missing class name.
     * @param  {string} id        The id of the pattern.
     * @param  {string} suffix    The suffix of the class.
     * @void
     */
    function warnMissingClassInConfig(className, patternId, suffix) {
        grunt.log.warn('Class `' + className + '` should be manually added to the config file:');
        grunt.log.writeln('\'' + patternId + '\'' + ':' + '{');
        grunt.log.writeln('    custom: [');
        grunt.log.writeln('        {suffix: \'' + suffix + '\', values: [\'YOUR-CUSTOM-VALUE\']}');
        grunt.log.writeln('    ]');
        grunt.log.writeln('}');
    }

    /**
     * Used by getConfigRule to handle custom config rules
     * @param  {object} configRule    The config rule object being built.
     * @param  {string} className     The class name of the custom class to be evaluated.
     * @param  {object} pattern       The pattern that matches this class in atomic css.
     * @param  {string} suffix        The suffix of the class.
     * @param  {object} currentConfig The current config we have in grunt.
     * @return {object}               The custom config rule.
     */
    function handleCustomConfigRule(configRule, className, pattern, suffix, currentConfig) {
        var value;

        if (pattern.allowSuffixToValue) {
            if (!configRule[pattern.id].custom) {
                configRule[pattern.id].custom = [];
            }

            if (!isPercentage(suffix) && !isLength(suffix) && !isHex(suffix) && !isInteger(suffix) && !isFloat(suffix)) {
                grunt.log.warn('Class ' + className + ' cannot be automatically generated because it doesn\'t have a valid value: ' + suffix);
                return false;
            }
            value = isHex(suffix) ? '#' + suffix : suffix;
            configRule[pattern.id].custom.push({
                suffix: suffix,
                values: [value]
            });
            grunt.log.writeln('Found `' + className + '`, rule has been added.');
        } else {
            if (!currentConfig[pattern.id] || !currentConfig[pattern.id].custom) {
                warnMissingClassInConfig(className, pattern.id, suffix);
                return false;
            }
            currentConfig[pattern.id].custom.some(function (custom) {
                if (custom.suffix !== suffix) {
                    warnMissingClassInConfig(className, pattern.id, suffix);
                    return true;
                }
            });
        }

        return configRule;
    }

    /**
     * Get an atomic config rule given an atomic class name
     * @param  {string} className     An atomic class name
     * @param  {object} currentConfig The current config.
     * @return {object}               The config rule for the given class name.
     */
    function getConfigRule(className, currentConfig) {
        var sepIndex = className.indexOf('-') + 1;
        var prefix = '.' + className.substring(0, sepIndex);
        var suffix = className.substring(sepIndex);
        var configRule = {};
        var value;        

        // iterate rules to find the pattern that the className belongs to
        rules.some(function (pattern) {
            var patternRulesLength = 0;

            // filter to the prefix we're looking for
            if (pattern.prefix === prefix) {
                // set the id in the config rule
                configRule[pattern.id] = {};

                // if the pattern has rules, let's find the suffix
                if (pattern.rules) {
                    patternRulesLength = pattern.rules.length;
                    pattern.rules.some(function (rule, index) {
                        // found the suffix, place it in the config
                        if (rule.suffix === suffix) {
                            configRule[pattern.id][suffix] = true;
                            return true;
                        }
                        // it's a custom suffix
                        else if (patternRulesLength === index + 1) {
                            configRule = handleCustomConfigRule(configRule, className, pattern, suffix, currentConfig);
                            return true;
                        }
                    });
                }
                // no pattern.rules, then it's a custom suffix
                else {
                    configRule = handleCustomConfigRule(configRule, className, pattern, suffix, currentConfig);
                }
                return true;
            }
        });

        return configRule;
    }

    /**
     * Get config object given an array of atomic class names.
     * @param  {object} classNamesObj   The object of atomic class names.
     * @param  {object} currentConfig   The current config.
     * @return {object}                 The atomic config object.
     */
    function getConfig(classNamesObj, currentConfig) {
        var config = {},
            className,
            occurrences;

        for (className in classNamesObj) {
            if (classNamesObj.hasOwnProperty(className)) {
                occurrences = classNamesObj[className];
                grunt.verbose.writeln('Found `' + className + '`, occurrences: ' + occurrences);
                config = _.merge(config, getConfigRule(className, currentConfig));
            }
        }

        return config;
    }

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
     * Escapes special regular expression characters
     * @param  {string} str The regexp string.
     * @return {string}     The escaped regexp string.
     */
    function escapeRegExp(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }

    /**
     * Returns a regular expression with atomic classes based on the rules from atomizer.
     * Making it as a function for better separation (code style).
     * @return {RegExp} The regular expression containing the atomic classes.
     */
    function getAtomicRegex() {
        var regexes = [];

        rules.forEach(function (pattern) {
            var prefix = pattern.prefix || '';
            prefix = prefix.replace('.', '');

            if (pattern.rules) {
                pattern.rules.forEach(function (rule) {
                    regexes.push(escapeRegExp(prefix + rule.suffix) + '\\b');
                });
            } else {
                // custom-only patterns with no rules
            }
            if (pattern.prefix) {
                regexes.push(escapeRegExp(prefix) + '(?:(?:neg)?[0-9]+(?:\.[0-9]+)?(?:[a-zA-Z%]+)?|[0-9a-f]{3}(?:[0-9a-f]{3})?)');
            }
        });
        return new RegExp('(' + regexes.join('|') + ')', 'g');
    }
    var atomicRegex = getAtomicRegex();

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
            var classNamesObj = {};
            var config;
            var content;

            if (f.src) {
                f.src.forEach(function (filePath) {
                    var src = grunt.file.read(filePath);
                    findAtomicClasses(src, atomicRegex, classNamesObj);
                });
            }

            // get the config object given an array of atomic class names
            config = getConfig(classNamesObj, gruntConfig);

            // merge the config we have with the grunt config
            config = _.merge(config, gruntConfig, function(a, b) {
                if (_.isArray(a) && _.isArray(b)) {
                    a.forEach(function(item){
                        if(_.findIndex(b, item) === -1) {
                            b.push(item);
                        }
                    });
                    return b;
                }
            });

            // run atomizer with the config we got
            content = atomizer(config, options);

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
