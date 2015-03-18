/*
 * Copyright (c) 2015, Yahoo Inc. All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

'use strict';

var _ = require('lodash');
var utils = require('./utils');

/**
 * AtomicBuilder manage build object given an atomic object and a config object.
 * @class
 * @param {Array} rules       An array of atomic objects describing atomic.css.
 *                            It is the reference to the config object that tells
 *                            which rules it wants from this list.
 * @param {Object} configObj  Tells what it wants from the atomic.css (the atomic
 *                            rules) and it is used to to generate a custom build 
 *                            of atomic.css.
 * @param {Object} optionsObj Options used in rendering the CSS.
 */
function AtomicBuilder (rules, config, options) {
    this.loadRules(rules);
    this.loadConfig(config);
    this.loadOptions(options);

    // create our build obj
    this.build = {};

    // populate build
    this.run();
}

/**
 * Adds an atomic object array to the instance.
 * 
 * @method loadRules
 * @param {Array} rules (Required) The array of atomic objects to be loaded
 */
AtomicBuilder.prototype.loadRules = function (rules) {
    if (!rules) {
        throw new Error('`rules` param is required');
    }
    if (rules.constructor !== Array) {
        throw new TypeError('The `rules` param must be an Array.');
    }
    this.rulesObj = rules;
};

/**
 * Adds a config object and stores additional information to the instance.
 * 
 * @method loadConfig
 * @param {Object} config (Required) The config object to be loaded
 */
AtomicBuilder.prototype.loadConfig = function (config) {
    if (!config) {
        throw new Error('`config` param is required');
    }
    if (config.constructor !== Object) {
        throw new TypeError('The `config` param must be an Object.');
    }
    if (config.breakPoints) {
        if (config.breakPoints.constructor !== Object) {
            throw new TypeError('`config.breakPoints` must be an Object');
        }
        /* istanbul ignore else  */
        if (_.size(config.breakPoints) > 0) {
            this.mediaQueries = {};
            for(var bp in config.breakPoints) {
                if (!/^@media/.test(config.breakPoints[bp])) {
                    throw new Error('Breakpoint `' + bp + '` must start with `@media`.');
                }
                this.mediaQueries[bp] = config.breakPoints[bp];
            }
        }
    }
    this.configObj = config;
};

/**
 * Loads options
 * 
 * @method loadOptions
 * @param {Object} config (Required) The options object to be loaded
 */
AtomicBuilder.prototype.loadOptions = function (options) {
    if (!options) {
        throw new Error('`options` param is required');
    }
    if (options.constructor !== Object) {
        throw new TypeError('The `options` param must be an Object.');
    }
    this.optionsObj = options;
};

/**
 * Starts the building process of the final CSS by iterating through the atomic object array
 * and checking them against the config object.
 * 
 * @method run
 */
AtomicBuilder.prototype.run = function () {

    var atomicObjs = this.atomicObjs,
        configObj = this.configObj,
        self = this;

    // iterate atomicObjs because we need them to be in order
    atomicObjs.forEach(function (atomicObj) {
        var currentConfigObj;

        // check if we have some basic required keys in the atomic object
        if (!atomicObj.id || atomicObj.id.constructor !== String) {
            throw new TypeError('Key `id` of atomic object is required and must be a String. Object: ' + atomicObj);
        }
        if (!atomicObj.type || atomicObj.type.constructor !== String) {
            throw new TypeError('Key `type` of atomic object is required and must be a String. Object: ' + atomicObj.id);
        }

        // return if this group is not wanted by the config
        currentConfigObj = configObj[atomicObj.id];
        if (!currentConfigObj) {
            return;
        }

        // if the atomic object is a pattern
        if (atomicObj.type === 'pattern') {
            // if `rules` has been passed
            if (atomicObj.rules) {
                if (atomicObj.rules.constructor !== Array) {
                    throw new TypeError('`atomicObj.rules` must be an Array. AtomicObject id: ' + atomicObj.id);
                }
                // add each rule, if present in the config
                atomicObj.rules.forEach(function (rule) {
                    // check if rule is wanted by the config
                    if (currentConfigObj[rule.suffix]) {
                        self.addPatternRule(rule, atomicObj, currentConfigObj[rule.suffix]);
                    }
                });
            }
            // if `fraction` has been passed
            if (currentConfigObj.fraction) {
                if (!atomicObj.allowFraction) {
                    throw new Error('Fraction has been passed but it is not allowed for this rule. Config key: ' + atomicObj.id + '.');
                }
                self.addFractionRules(currentConfigObj.fraction, atomicObj);
            }
            // if `custom` has been passed
            if (currentConfigObj.custom) {
                if (!atomicObj.allowCustom) {
                    throw new Error('Custom has been passed but it is not allowed for this rule. Config key: ' + atomicObj.id + '.');
                }
                if (currentConfigObj.custom.constructor !== Array) {
                    throw new TypeError('`Config ' + atomicObj.id + '.custom` must be an Array.');
                }
                currentConfigObj.custom.forEach(function (rule) {
                    self.addPatternRule(rule, atomicObj, currentConfigObj);
                });
            }
            // if `custom-auto-suffix` has been passed
            if (currentConfigObj['custom-auto-suffix']) {
                if (!atomicObj.allowCustomAutoSuffix) {
                    throw new Error('`custom-auto-suffix` has been passed but it is not allowed for this rule. Config key: ' + atomicObj.id + '.');
                }
                if (currentConfigObj['custom-auto-suffix'].constructor !== Array) {
                    throw new TypeError('`Config ' + atomicObj.id + '.custom` must be an Array.');
                }
                currentConfigObj['custom-auto-suffix'].forEach(function (rule, index) {
                    if (rule.constructor !== Object) {
                        throw new TypeError('`custom-auto-suffix` rule must be an Object.');
                    }
                    rule.suffix = atomicObj.suffixType === 'numerical' ? index + 1 : String.fromCharCode(97 + index);
                    self.addPatternRule(rule, atomicObj, currentConfigObj);
                });
            }
        }
        // if the atomic object is a rule
        else if (atomicObj.type === 'rule') {
            // check if `rule` is present
            if (!atomicObj.rule || atomicObj.rule.constructor !== Object) {
                throw new TypeError('Key `rule` of atomic object is required and must be an Object. Object: ' + atomicObj.id);
            }
           self.addRule(atomicObj.rule, atomicObj.id);
        }
        // type is not any of the ones listed above
        else {
            throw new Error('Key `type` must be a `rule` or a `pattern`.');
        }
    });
};

/**
 * Add a rule written in pattern format to the build obj.
 * 
 * @method addPatternRules
 * @param {Object}  rule                 (Required) The rule object containg the following keys: `suffix` and `values`.
 * @param {String}  rule.suffix          (Required) The suffix of the rule.
 * @param {Array}   rule.values          (Required) An array of values that will be mapped to the properties array.
 * @param {Object}  atomicObj            (Required) The atomic object that is being evaluated.
 * @param {String}  atomicObj.id         (Required) The 'id' of pattern.
 * @param {String}  atomicObj.prefix     (Required) The prefix string of the class name.
 * @param {Array}   atomicObj.properties (Required) The array of CSS properties to be added to this pattern.
 */
AtomicBuilder.prototype.addPatternRule = function (rule, atomicObj, currentConfigObj) {
    var self = this,
        className,
        suffix;

    // validate rule
    if (!rule || rule.constructor !== Object) {
        throw new TypeError('The `rule` param is required and must be an Object.');
    }
    if (!rule.values || rule.values.constructor !== Array) {
        throw new TypeError('The `rule.values` param is required and must be an Array.');
    }
    // auto suffix does not require a suffix
    if (!rule.suffix || (rule.suffix.constructor !== String && rule.suffix.constructor !== Number)) {
        throw new TypeError('The `rule.suffix` param is required and must be a String or a Number.');
    }
    // validate atomicObj
    if (!atomicObj || atomicObj.constructor !== Object) {
        throw new TypeError('The `atomicObj` param is required and must be an Object.');
    }
    if (!atomicObj.id || atomicObj.id.constructor !== String) {
        throw new TypeError('The `atomicObj.id` param is required and must be a String.');
    }
    if (!atomicObj.prefix || atomicObj.prefix.constructor !== String) {
        throw new TypeError('The `atomicObj.prefix` param is required and must be a String.');
    }
    if (!atomicObj.properties || atomicObj.properties.constructor !== Array) {
        throw new TypeError('The `atomicObj.properties` param is required and must be an Array.');
    }

    if (!currentConfigObj || (currentConfigObj.constructor !== Object && currentConfigObj.constructor !== Boolean)) {
        throw new TypeError('The `currentConfigObj` param is required and must be an Object or a Boolean.');
    }

    suffix = rule.suffix;
    className = atomicObj.prefix + suffix;

    // iterate properties
    atomicObj.properties.forEach(function (property) {
        var values = rule.values;

        // values could be specified in the config as well
        if (currentConfigObj.values && currentConfigObj.values.constructor === Array) {
            values = currentConfigObj.values;
        }
        // iterate values
        values.forEach(function (value) {
            var breakPoints;

            // add BreakPoints
            if (rule.breakPoints && rule.breakPoints.constructor === Array) {
                breakPoints = rule.breakPoints;
            }
            if (currentConfigObj.breakPoints && currentConfigObj.breakPoints.constructor === Array) {
                breakPoints = currentConfigObj.breakPoints;
            }

            // finally, assign
            self.addCssRule(className, property, value, breakPoints);
        });
    });
};

/**
 * Add CSS rule to the build object
 * 
 * @method addCssRule
 * @param {String} className  (Required) The class name of the rule.
 * @param {String} property   (Required) The property of the rule.
 * @param {String} value      (Required) The value associated with the property passed.
 * @param {Array} breakPoints (Optional) An array of breakpoints if required by this rule.
 * @return {Boolean} True if the rule has been added, false otherwise.
 */
AtomicBuilder.prototype.addCssRule = function (className, property, value, breakPoints) {
    var build = {},
        mqs = this.mediaQueries || {};

    if (!className || className.constructor !== String) {
        throw new TypeError('addCssRule(): `className` param is required and must be a String.');
    }
    if (!property || property.constructor !== String) {
        throw new TypeError('addCssRule(): `property` param is required and must be a String.');
    }
    if (!value && value !== 0) {
        throw new TypeError('addCssRule(): `value` param is required.');
    }

    className = this.escapeSelector(this.placeConstants(className));
    property = this.placeConstants(property);
    value = this.placeConstants(value);

    build[className] = {};
    build[className][property] = value;

    if (breakPoints) {
        breakPoints.forEach(function (breakPoint) {
            var bpClassName = className + '--' + breakPoint;

            // check if breakPoint is valid
            if (!mqs[breakPoint]) {
                throw new Error('Breakpoint is not valid: ' + breakPoint + '. Valid breakPoint values: ' + Object.keys(mqs));
            }

            build[bpClassName] = {};
            build[bpClassName][mqs[breakPoint]] = {};
            build[bpClassName][mqs[breakPoint]][property] = value;
        });
    }

    _.merge(this.build, build);
    return true;
};

/**
 * Escape CSS selectors with a backslash
 * e.g. ".W-100%" => ".W-100\%"
 * 
 * @param  {String} str The string to be processed.
 * @return {String} The processed string.
 */
AtomicBuilder.prototype.escapeSelector = function (str) {
    if (!str && str !== 0) {
        throw new TypeError('str must be present');
    }

    if (str.constructor !== String) {
        return str;
    }

    // TODO: maybe find a better regex? (-?) is here because '-' is considered a word boundary
    // so we get it and put it back to the string.
    return str.replace(/\b(-?)([^-_a-zA-Z0-9\s]+)/g, function (str, dash, characters) {
        return dash + characters.split('').map(function (character) {
            return ['\\', character].join('');
        }).join('');
    });
};

/**
 * Replace symbols such as $START and $END with the constants set in the config.
 * e.g. border-$START => "border-left"
 * 
 * @param  {String} str The string to be processed.
 * @return {String} The processed string.
 */
AtomicBuilder.prototype.placeConstants = function (str) {
    var configObj = this.configObj;
    var optionsObj = this.optionsObj;
    var start = optionsObj && optionsObj.rtl ? 'right' : 'left';
    var end = optionsObj && optionsObj.rtl ? 'left' : 'right';

    if (!str && str !== 0) {
        throw new TypeError('str must be present');
    }
    if (str.constructor !== String) {
        return str;
    }
    if (!configObj || configObj.constructor !== Object) {
        throw new TypeError('configObj is required and must be an Object.');
    }
    str = str.replace(/\$START/g, start).replace(/\$END/g, end);
    return str;
};

/**
 * Cleans up the build of this instance (no CSS rules).
 * 
 * @method flush
 * @return {Object} The build object
 */
AtomicBuilder.prototype.flush = function () {
    this.build = {};
};

/**
 * Returns the build object
 *
 * @method getBuild
 * @return {Object} The build object
 */
AtomicBuilder.prototype.getBuild = function () {
    var build = {},
        configObj = this.configObj,
        namespace;

    if (!configObj || configObj.constructor !== Object) {
        throw new TypeError('Expecting config object to be set in this instance.');
    }

    namespace = this.optionsObj.namespace;

    if (namespace) {
        build[namespace] = this.build;
    } else {
        build = this.build;
    }

    return build;
};

module.exports = AtomicBuilder;