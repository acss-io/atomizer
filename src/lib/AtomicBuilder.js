'use strict';

var _ = require('lodash');
var utils = require('./utils');

// perf of approaches used:
// object has key: http://jsperf.com/hasownproperty-vs-in-vs-undefined/72

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
        if (atomicObj.id.constructor !== String) {
            throw new TypeError('Key `id` of atomic object must be a String. Object: ' + atomicObj);
        }
        if (atomicObj.type.constructor !== String) {
            throw new TypeError('Key `type` of atomic object must be a String. Object: ' + atomicObj.id);
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
            // if `custom-sequenced-suffix` has been passed
            if (currentConfigObj['custom-sequenced-suffix']) {
                if (!atomicObj.allowCustomSequencedSuffix) {
                    throw new Error('`custom-sequenced-suffix` has been passed but it is not allowed for this rule. Config key: ' + atomicObj.id + '.');
                }
                self.addCustomSequencedSuffixRules(currentConfigObj['custom-sequenced-suffix'], atomicObj);
            }
        }
        // if the atomic object is custom-pattern and we have rules or properties
        // else if (atomicObj.type === 'custom-pattern' && (atomicObj.rules || atomicObj.properties)) {
        //     self.addCustomPatternRules(currentConfigObj, atomicObj.rules, atomicObj.properties, atomicObj.id, atomicObj.prefix, atomicObj.suffixType, atomicObj.format);
        // }
        // if the atomic object is a rule
        else if (atomicObj.type === 'rule') {
            // check if `rule` is present
            if (atomicObj.rule.constructor !== Object) {
                throw new TypeError('Key `rule` of atomic object must be an Object. Object: ' + atomicObj.id);
            }
           self.addRule(atomicObj.rule, atomicObj.id);
        }
    });
};

/**
 * Add a rule written in pattern format to the build obj.
 * 
 * @method addPatternRules
 * @param {Object} rule                 (Required) The rule object containg the following keys: `suffix` and `values`.
 * @param {String} rule.suffix          (Required) The suffix of the rule.
 * @param {Array}  rule.values          (Required) An array of values that will be mapped to the properties array.
 * @param {Object} atomicObj            (Required) The atomic object that is being evaluated.
 * @param {String} atomicObj.id         (Required) The 'id' of pattern.
 * @param {String} atomicObj.prefix     (Required) The prefix string of the class name.
 * @param {Array}  atomicObj.properties (Required) The array of CSS properties to be added to this pattern.
 * @param {Array}  atomicObj.format     (Optional) An array of functions that tests each word of a value passed
 *                                      in the config for custom patterns. Recommended for custom patterns.
 * @param {Boolean} isCustom            (Optional) Wether or not this is a custom pattern.
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
    if (!rule.suffix || rule.suffix.constructor !== String) {
        throw new TypeError('The `rule.suffix` param is required and must be a String.');
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

            // breakPoints is declared differently if the rule is custom within this pattern
            if (isCustom && rule.breakPoints) {
                breakPoints = rule.breakPoints;
            }
            // if it's not custom, it can be an object containing the breakPoints
            else if (currentConfigObj.breakPoints && currentConfigObj.breakPoints.constructor === Array) {
                breakPoints = currentConfigObj.breakPoints;
            }

            // finally, assign
            self.addCssRule(className, property, value, breakPoints);
        });
    });
};

/**
 * Add rules that should follow an alphabetical sequence suffix.
 * This method only validates the array passed by the config object (configCustom param).
 * It iterates the array and calls addCustomSequenceSuffixRule() to add each rule.
 * 
 * @method addCustomSequencedSuffixRules
 * @see  addCustomSequencedSuffixRule
 * @param {Array}        configCustom                    (Required) An array of array of objects with keys that match
 *                                                       suffixes of the passed rules. Each key should have an array of 
 *                                                       values that will be added to each suffix property.
 * e.g.
 * 
 * // array of arrays of objects:
 * // used when a pattern produces multi-purpose rules.
 * // such as ".Bd-t--a", ".Bd-b--a", ".Bd-x--a", ".Bd-y--a", etc.
 * // objects require a suffix to map to the correct suffix of the pattern.
 * [
 *     // a
 *     [
 *         {suffix: 't', values: ['1px solid #000'], breakPoints: ['sm', 'md', 'lg']},
 *         {suffix: 'b', values: ['3px solid #f00']},
 *         {suffix: 'x', values: ['1px solid #f00', '3px solid #000']}
 *     ],
 *     // b
 *     [
 *         {suffix: 't', values: ['1px solid #fff']},
 *         {suffix: 'b', values: ['3px solid transparent']}
 *     ]
 * ]
 *  
 *  // array of objects
 *  // used when a pattern produces a single rule.
 *  // such as ".Bgc--a", ".Bgc--b", ".Bgc--c", etc.
 *  // objects don't require a "suffix" since it maps already to the prefix of the pattern.
 *  [
 *      // a
 *      {values: ['#000'], breakPoints: ['sm', 'md', 'lg']},
 *      // b
 *      {values: ['#fff']}
 *  ],
 *  
 * @param {Object}       atomicObj                       (Required) The atomicObj that is being evaluated.
 * @param {Array}        atomicObj.properties            (Required) The array of CSS properties to be added to this pattern.
 *                                                       It can also be an array of objects containing `suffix` and `properties` keys.
 * @param {String}       atomicObj.id                    (Required) The id of the pattern.
 * @param {String}       atomicObj.prefix                (Required) The prefix string of the class name.
 * @param {String}       atomicObj.suffixType            (Required) The type of the suffix to be appended to the custom class pattern.
 * @param {Array}        atomicObj.format                (Required) An array containing a function that tests each word passed on each item of class values.
 *
 *
 */
AtomicBuilder.prototype.addCustomSequencedSuffixRules = function (configCustom, atomicObj) {
    var self = this,
        properties;

    // validate configCustom
    if (!configCustom || configCustom.constructor !== Array) {
        throw new TypeError('The `configCustom` param is required and must be an Object.');
    }
    // opinionated limit. this should not even go as far as 26.
    // this is the hard limit based on the letters of the alphabet.
    // this also applies to numerical suffixes.
    if (configCustom.length > 26) {
        throw new RangeError('The limit for total custom pattern rules is 26.');
    }

    // validate atomicObj
    if (!atomicObj || atomicObj.constructor !== Object) {
        throw new TypeError('The `atomicObj` param is required and must be an Object.');
    }
    if (!atomicObj.id || atomicObj.id.constructor !== String) {
        throw new TypeError('The `atomicObj.id` param must be a String.');
    }
    properties = atomicObj.properties;
    if (!properties || properties.constructor !== Array) {
        throw new TypeError('The atomicObj.properties param is required and must be an Array or an Object.');
    }
    if (!atomicObj.prefix || atomicObj.prefix.constructor !== String) {
        throw new TypeError('The `atomicObj.prefix` param must be a String.');
    }
    if (!atomicObj.format || atomicObj.format.constructor !== Array) {
        throw new TypeError('The `atomicObj.format` param must be an Array.');
    }

    // don't continue if either one of these is empty
    if (!configCustom.length || !properties.length) {
        return false;
    }

    if (atomicObj.format.some(function (formatFragment) {
        return formatFragment.constructor !== Function;
    })) {
        throw new TypeError('The `format` array must be an array of Functions.');
    }

    // iterate atomicObj.properties first, since it needs to go in order
    properties.forEach(function (property) {

        // validate rule if it's not a property
        if (property.constructor === Object) {
            if (!property.suffix || !property.properties) {
                throw new Error('Atomic object rule should have keys `suffix` and `properties`.');
            }
            if (property.suffix.constructor !== String) {
                throw new TypeError('atomicObj.properties.suffix must be a String.');
            }
            if (property.properties.constructor !== Array) {
                throw new TypeError('atomicObj.properties.properties must be an Array.');
            }
        }

        // iterate configCustom so we can produce the class if wanted by the config
        configCustom.forEach(function (customRule, index) {
            // at this point, customRule can either be an Array of Objects (multi-purpose patterns) or an Object (single-purpose patterns)
            if (customRule.constructor === Object) {
                self.addCustomSequencedSuffixRule(property, index, atomicObj, customRule);
            }
            else if (customRule.constructor === Array) {
                customRule.forEach(self.addCustomSequencedSuffixRule.bind(self, property, index, atomicObj));
            }
            else {
                throw TypeError('`customRule` must be an Object or an Array.');
            }
        });
    });
};

/**
 * Add rules that should follow an alphabetical sequence suffix.
 * Used by addCustomSequencedSuffixRules() to add a css rule using addCssRule().
 * 
 * @method  addCustomSequencedSuffixRule
 * @see     addCustomSequencedSuffixRules
 * @param {Array|String} property             (Required) The CSS property that will be added to this rule. It can be a 
 *                                            String or an Array of objects containing the keys `suffix` and `property`.
 * @param {Integer}      index                (Required) The index of the config array. Used to generate the sequetial 
 *                                            alphabetical letters.
 * @param {Object}       atomicObj            (Required) The atomicObj that is being evaluated.
 * @param {Object}       customRule           (Required) The config object that is present in the array of custom rules.
 * @param {Object}       customRule.suffix    (Optional) Used by multi-purpose patterns to map the values to the desired rule via suffix.
 * @param {Object}       customRule.values    (Required) The CSS values to be added to each CSS property in this rule.
 * @private
 */
AtomicBuilder.prototype.addCustomSequencedSuffixRule = function (property, index, atomicObj, customRule) {
    var className = '',
        ruleSuffix = '',
        patternSuffix = '',
        separator = '-',
        properties = [],
        self = this;

    // required
    if (!customRule || customRule.constructor !== Object) {
        throw new TypeError('`customRule` is required and must be an Object');
    }
    if (!customRule.values || customRule.values.constructor !== Array) {
        throw new TypeError('`customRule.values` is required and must be an Array.');
    }
    // optional
    if (customRule.suffix) {
        // return if it's not wanted by the config
        if(property.suffix !== customRule.suffix) {
            return;
        }
        ruleSuffix = property.suffix;
        properties = property.properties;
    } else {
        properties = [property];
    }

    // 1. build the class name
    // suffix type is alphabetical by default
    patternSuffix += atomicObj.suffixType === 'numerical' ? index + 1 : String.fromCharCode(97 + index);
    if (ruleSuffix) {
        separator += separator;
    }
    className = atomicObj.prefix + ruleSuffix + separator + patternSuffix;

    // 2. add the properties by iterating the rule values (which are the property names)
    properties.forEach(function (ruleProperty, rulePropertyIndex) {
        // validate format of propertyValue passed in the config
        var invalid,
            propertyValue = customRule.values[rulePropertyIndex] || '',
            propertyValueParts = propertyValue.split(' ');

        invalid = propertyValueParts.length !== atomicObj.format.length || propertyValueParts.some(function (propertyValuePart, wordIndex) {
            return !atomicObj.format[wordIndex].call('undefined', propertyValuePart);
        });

        if (invalid) {
            throw new Error('Invalid value format in `' + atomicObj.id + '`. Property value: ' + propertyValue);
        }
        self.addCssRule(className, ruleProperty, propertyValue, customRule.breakPoints);
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

    if (rule.constructor !== Object) {
        throw new TypeError('The `rule` param must be an Object.');
    }
    if (id.constructor !== String) {
        throw new TypeError('The `id` param must be a String.');
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
        if (rule.hasOwnProperty(className)) {
            for (var property in rule[className]) {
                if (rule[className].hasOwnProperty(property)) {
                    if (configObj[id].constructor === Object) {
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
        className = atomicObj.prefix + i + '\\/' + denominator;
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

    className = this.placeConstants(className);
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

    if (!_.size(build)) {
        return false;
    }

    _.merge(this.build, build);
    return true;
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