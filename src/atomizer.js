/*
 * Copyright (c) 2015, Yahoo Inc. All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

'use strict';

var _ = require('lodash');
var Absurd = require('absurd');
var AtomicBuilder = require('./lib/AtomicBuilder.js');
var objectAssign = require('object-assign');
var rules = require('./rules.js');
var utils = require('./lib/utils');

var atomicRegex;
var verbose = false;

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
function getAtomicRegex(rules) {
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
            regexes.push('\\b' + escapeRegExp(prefix) + '(?:(?:neg)?[0-9]+(?:\.[0-9]+)?(?:[a-zA-Z%]+)?|[0-9a-f]{3}(?:[0-9a-f]{3})?|[a-zA-Z0-9%\.]+\\b)');
        }
    });
    return new RegExp('(' + regexes.join('|') + ')', 'g');
}

/**
 * Get an atomic config rule given an atomic class name
 * @param  {string} className     An atomic class name
 * @param  {object} currentConfig The current config.
 * @param  {array}  warnings      An array of warnings generated while processing custom config rules
 * @return {object}               The config rule for the given class name.
 */
function getConfigRule(className, currentConfig, warnings) {
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
                        configRule = handleCustomConfigRule(configRule, className, pattern, suffix, currentConfig, warnings);
                        return true;
                    }
                });
            }
            // no pattern.rules, then it's a custom suffix
            else {
                configRule = handleCustomConfigRule(configRule, className, pattern, suffix, currentConfig, warnings);
            }
            return true;
        }
    });

    return configRule;
}

/**
 * Used by getConfigRule to handle custom config rules
 * @param  {object} configRule    The config rule object being built.
 * @param  {string} className     The class name of the custom class to be evaluated.
 * @param  {object} pattern       The pattern that matches this class in atomic css.
 * @param  {string} suffix        The suffix of the class.
 * @param  {object} currentConfig An existing config to merge with
 * @param  {array}  warnings      An array of warnings generated while processing custom config rules
 * @return {object}               The custom config rule.
 */
function handleCustomConfigRule(configRule, className, pattern, suffix, currentConfig, warnings) {
    var value;

    if (pattern.allowSuffixToValue && (
        utils.isPercentage(suffix) || 
        utils.isLength(suffix) || 
        utils.isHex(suffix) || 
        utils.isInteger(suffix) || 
        utils.isFloat(suffix))) {

        if (!configRule[pattern.id].custom) {
            configRule[pattern.id].custom = [];
        }

        value = utils.isHex(suffix) ? '#' + suffix : suffix;
        configRule[pattern.id].custom.push({
            suffix: suffix,
            values: [value]
        });
        if (verbose) { 
            console.warn('Found `' + className + '`, config has been added.'); 
        }
    } else {
        if (!currentConfig[pattern.id] || !currentConfig[pattern.id].custom) {
            warnMissingClassInConfig(className, pattern.id, suffix, warnings);
        } else if (currentConfig[pattern.id].custom.every(function (custom) {
            return custom.suffix !== suffix;
        })) {
            warnMissingClassInConfig(className, pattern.id, suffix, warnings);            
        };
        return false;
    }

    return configRule;
}


/**
 * Used to log warning messages about missing classes in the config
 * @param  {string} className The missing class name.
 * @param  {string} id        The id of the pattern.
 * @param  {string} suffix    The suffix of the class.
 * @param  {array}  warnings  An array of warnings to be displayed to the user
 * @void
 */
function warnMissingClassInConfig(className, patternId, suffix, warnings) {
    warnings.push([
        'Warning: Class `' + className + '` is ambiguous, and must be manually added to your config file:',
        '\'' + patternId + '\'' + ':' + '{',
        '    custom: [',
        '        {suffix: \'' + suffix + '\', values: [\'YOUR-CUSTOM-VALUE\']}',
        '    ]',
        '}'
        ].join("\n"));
}

module.exports = {

    /**
     * Merge atomizer configs into a single config
     * @param {Array} configs An array of Atomizer config objects
     * @return {object} An atomizer config object
     */
    mergeConfigs: function (configs) {
        return _.isArray(configs) && configs.length > 0 ? _.merge.apply(null, configs.concat(utils.handleMergeArrays)) : {};
    },

    /**
     * Look for atomic class names in text and add to class names object.
     * @param  {string} src The text to be parsed.
     * @param  {object} classNamesObj (Optional) A hash of classnames -> number instances found
     * @return {array} An array of class names.
     */
    parse: function (src, classNamesObj) {
        classNamesObj = classNamesObj || {};

        if (!atomicRegex) {
            atomicRegex = getAtomicRegex(rules);
        }

        var match = atomicRegex.exec(src);
        while (match !== null) {
            classNamesObj[match[0]] = classNamesObj[match[0]] ? classNamesObj[match[0]] + 1 : 1;
            match = atomicRegex.exec(src);
        }

        return _.keys(classNamesObj);
    },

    /**
     * Get config object given an array of atomic class names.
     * @param  {array}   classNames     Array of atomic class names.
     * @param  {object}  currentConfig  The current config.
     * @param  {boolean} verboseLogging Verbose logging (default = false)
     * @return {object}                 The atomic config object.
     */
    getConfig: function (classNames, currentConfig, verboseLogging) {
        var config = {},
            warnings = [];

        verbose = !!verboseLogging;

        for (var i = 0, iLen = classNames.length; i < iLen; i++) {
            config = _.merge(config, getConfigRule(classNames[i], currentConfig, warnings), utils.handleMergeArrays);
            // config = this.mergeConfigs([config, getConfigRule(classNames[i], currentConfig, warnings)]);
        }

        // Merge the existing config with the new config
        config = this.mergeConfigs([config, currentConfig]);

        // Now that we've processed all the configuration, notify the user
        // if any custom classnames were found that were too ambiguous to 
        // have their config auto-generated.
        if (warnings.length) {
            warnings.forEach(function (w) {
                console.warn(w);
            });
        }

        return config;
    },

    /** 
     * createCSS()
     * 
     * Converts configuration JSON into CSS
     */
    createCSS: function (config, options) {
        var content;

        options = objectAssign({}, {
            require: [],
            morph: null,
            combineSelectors: true,
            minify: false,
            keepCamelCase: false,
            extCSS: '.css',
            banner: '',
            namespace: '#atomic',
            rtl: false,
            // TODO: Verify these are good defaults
            breakPoints: {
                'sm': '767px',
                'md': '992px',
                'lg': '1200px'
            }
        }, options);

        if (!config) {
            throw new Error('No configuration provided.');
        }

        var api = Absurd();

        api.morph(options.morph);

        if (options.require.length > 0) {
            api.import(options.require);
        }

        var atomicBuilder = new AtomicBuilder(rules, config, options);
        var build = atomicBuilder.getBuild();

        api.add(build);

        api.compile(function(err, result) {
            /* istanbul ignore if else */
            if (err) {
                throw new Error('Failed to compile atomic css:' + err);
            }
            content = options.banner + result;
        }, options);

        return content;
    }

};
