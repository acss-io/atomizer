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
 * @param {Array} atomicObjs  An array of atomic objects describing atomic.css.
 *                            It is the reference to the config object that tells
 *                            which rules it wants from this list.
 * @param {Object} configObj  Tells what it wants from the atomic.css (the atomic
 *                            rules) and it is used to to generate a custom build 
 *                            of atomic.css.
 */
function AtomicBuilder (atomicObjs, configObj) {
    this.loadObjects(atomicObjs);
    this.loadConfig(configObj);

    // create our build obj
    this.build = {};

    // populate build
    this.run();
}

/**
 * Adds an atomic object array to the instance.
 * 
 * @method loadObjects
 * @param {Array} objs (Required) The array of atomic objects to be loaded
 */
AtomicBuilder.prototype.loadObjects = function (objs) {
    if (!objs) {
        throw new Error('`objs` param is required');
    }
    if (objs.constructor !== Array) {
        throw new TypeError('The `objs` param must be an Array.');
    }
    this.atomicObjs = objs;
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
    if (!config.config || config.config.constructor !== Object) {
        throw new TypeError('`config` must have a `config` key');
    }
    if (config.config.breakPoints) {
        if (config.config.breakPoints.constructor !== Object) {
            throw new TypeError('`config.breakpoints` must be an Object');
        }
        if (!config.config.breakPoints.sm && !config.config.breakPoints.md && !config.config.breakPoints.lg) {
            throw new Error('`config.breakpoints` must be an Object containing at least one of the following keys: sm, md, lg.');
        }
        this.mediaQueries = {};
        if (config.config.breakPoints.sm) {
            this.mediaQueries.sm = '@media(min-width:' + config.config.breakPoints.sm + ')';
        }
        if (config.config.breakPoints.md) {
            this.mediaQueries.md = '@media(min-width:' + config.config.breakPoints.md + ')';
        }
        if (config.config.breakPoints.lg) {
            this.mediaQueries.lg = '@media(min-width:' + config.config.breakPoints.lg + ')';
        }
    }
    this.configObj = config;
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
                    self.addPatternRule(rule, atomicObj, currentConfigObj, true);
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
                    self.addPatternRule(rule, atomicObj, currentConfigObj, true);
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
 * @param {Boolean} isCustom             (Optional) Wether or not this is a custom pattern.
 */
AtomicBuilder.prototype.addPatternRule = function (rule, atomicObj, currentConfigObj, isCustom) {
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
            if (currentConfigObj.breakPoints && currentConfigObj.breakPoints.constructor === Array) {
                breakPoints = currentConfigObj.breakPoints;
            }

            // finally, assign
            self.addCssRule(className, property, value, breakPoints);
        });
    });
};

/**
 * Parses an object of type "rule"
 * 
 * @method  addRule
 * @param {Object} rule        (Required) The rule to be added.
 * @param {String} id          (Required) The id of the rule to be added.
 * @param {Object} breakPoints (Optional) The breakPoints object to be grouped in media queries.
 * @return {Boolean} True if the rule has been added, false otherwise.
 */
AtomicBuilder.prototype.addRule = function (rule, id) {
    var configObj = this.configObj,
        breakPoints;

    if (!rule || rule.constructor !== Object) {
        throw new TypeError('The `rule` param is required and must be an Object.');
    }
    if (!id || id.constructor !== String) {
        throw new TypeError('The `id` param is required and must be a String.');
    }
    if (!configObj || configObj.constructor !== Object) {
        throw new TypeError('Expecting config object to be set in this instance.');
    }

    // check if this rule is wanted by the config
    if (!configObj[id]) {
        return;
    }

    // iterate through the rule so we can send it to addCssRule
    for (var className in rule) {
        /* istanbul ignore else  */
        if (rule.hasOwnProperty(className)) {
            for (var property in rule[className]) {
                /* istanbul ignore else  */
                if (rule[className].hasOwnProperty(property)) {
                    if (configObj[id].constructor === Object && configObj[id].breakPoints) {
                        breakPoints = configObj[id].breakPoints;
                    }
                    this.addCssRule(className, property, rule[className][property], breakPoints);
                }
            }
        }
    }
};

/**
 * Adds fraction rules (in percentage values) that are written in pattern format to the build obj.
 *
 * @method  addFractionRules
 * @param {Object}  fractionObj             (Required) An object containing information about the fraction rules to be added.
 * @param {Integer} fractionObj.denominator (Required) The denominator of the fraction (how many equal parts it will be divided).
 * @param {Array}   fractionObj.breakPoints (Optional) An array containing the media queries that will be added to each rule.
 * @param {String}  atomicObj               (Required) The atomic object containing the following keys:
 * @param {String}  atomicObj.id            (Required) The 'id' of the pattern.
 * @param {Array}   atomicObj.properties    (Required) The array of properties of the pattern.
 * @param {String}  atomicObj.prefix        (Required) The prefix string of the class name.
 */
AtomicBuilder.prototype.addFractionRules = function (fractionObj, atomicObj) {
    var denominator,
        className = '',
        value = '',
        self = this;

    if (!fractionObj || fractionObj.constructor !== Object) {
        throw new TypeError('fractionObj in config must be an Object.');
    }
    denominator = fractionObj.denominator;
    if (!denominator || !utils.isInteger(denominator)) {
        throw new TypeError('fractionObj.denominator in config must be a Number.');
    }
    if (!atomicObj || atomicObj.constructor !== Object) {
        throw new TypeError('The `atomicObj` param is required and must be a String.');
    }
    if (!atomicObj.id || atomicObj.id.constructor !== String) {
        throw new TypeError('The `atomicObj.id` param is required and must be a String.');
    }
    if (!atomicObj.properties || atomicObj.properties.constructor !== Array) {
        throw new TypeError('The `atomicObj.properties` param is required and must be an Array.');
    }
    if (!atomicObj.prefix || atomicObj.prefix.constructor !== String) {
        throw new TypeError('The `atomicObj.prefix` param is required and must be a String.');
    }

    function add(property) {
        self.addCssRule(className, property, value, fractionObj.breakPoints);
    }

    for (var i = 1; i <= denominator; i += 1) {
        className = atomicObj.prefix + i + '\/' + denominator;
        // multiplying by 100 then by 10000 on purpose to show more clearly that we want:
        // percentage: (i / denominator * 100)
        // 4 decimal places:  (Math.round(percentage * 10000) / 10000)
        value = Math.round(i / denominator * 100 * 10000) / 10000 + '%';
        atomicObj.properties.forEach(add);
    }
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
                throw new Error('BreakPoint is not valid: ' + breakPoint + '. Valid BreakPoint values: ' + Object.keys(mqs));
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
    if (!str && str !== 0) {
        throw new TypeError('str must be present');
    }
    if (str.constructor !== String) {
        return str;
    }
    if (!configObj || configObj.constructor !== Object) {
        throw new TypeError('configObj is required and must be an Object.');
    }
    if (configObj.config) {
        if (configObj.config.start) {
            str = str.replace(/\$START/g, configObj.config.start);
        }
        if (configObj.config.end) {
            str = str.replace(/\$END/g, configObj.config.end);
        }
    }
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

    namespace = configObj.config && configObj.config.namespace;

    if (namespace) {
        build[namespace] = this.build;
    } else {
        build = this.build;
    }

    return build;
};

module.exports = AtomicBuilder;