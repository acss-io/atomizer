'use strict';

var _ = require('lodash');
var utils = require('./utils');

// perf of approaches used:
// object has key: http://jsperf.com/hasownproperty-vs-in-vs-undefined/72

/**
 * AtomicBuilder manage build object given an atomic object and a config object.
 * @class AtomicBuilder
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
            if (atomicObj.properties.constructor !== Array) {
                throw new TypeError('Key `properties` of atomic object must be an Array. Object: ' + atomicObj.id);
            }
            if (atomicObj.prefix.constructor !== String) {
                throw new TypeError('Key `prefix` of atomic object must be a String. Object: ' + atomicObj.id);
            }
            // if `rules` has been passed
            if (atomicObj.rules) {
                self.addPatternRules(atomicObj.rules, atomicObj.id, atomicObj.properties, atomicObj.prefix);
            }
            // if `fraction` has been passed
            if (currentConfigObj.fraction) {
                if (!atomicObj.allowFraction) {
                    throw new Error('Fraciton has been passed but it is not allowed for this rule. Config key: ' + atomicObj.id + '.');
                }
                self.addFractionRules(currentConfigObj.fraction, atomicObj.id, atomicObj.properties, atomicObj.prefix);
            }
            // if `custom` has been passed
            if (currentConfigObj.custom) {
                if (!atomicObj.allowCustom) {
                    throw new Error('Custom has been passed but it is not allowed for this rule. Config key: ' + atomicObj.id + '.');
                }
                if (currentConfigObj.custom.constructor !== Array) {
                    throw new TypeError('Custom in config must be an Array. Config key: ' + atomicObj.id + '.');
                }
                self.addPatternRules(currentConfigObj.custom, atomicObj.id, atomicObj.properties, atomicObj.prefix, true);
            }
        }
        // if the atomic object is custom-properties and we have rules
        else if (atomicObj.type === 'custom-pattern' && atomicObj.rules) {
            self.addCustomPatternRules(currentConfigObj, atomicObj.rules, atomicObj.id, atomicObj.prefix, atomicObj.suffixType, atomicObj.format);
        }
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
 * Add rules that are written in pattern format to the build obj.
 * 
 * @method addPatternRules
 * @param {Array}    rules             (Required) The array of rule objects containing the following keys: suffix and values.
 * @param {String}   rules.suffix      (Required) The suffix of the rule.
 * @param {Array}    rules.values      (Required) An array of values that will be mapped to the properties array.
 * @param {String}   id                (Required) The 'id' of the pattern.
 * @param {Array}    properties        (Required) The array of properties of the pattern.
 * @param {String}   prefix            (Required) The prefix string of the class name.
 * @param {Boolean}  isCustom          (Optional) Wether or not this rule is a custom rule.
 * @return {Boolean} True if the rules have been added, false otherwise.
 */
AtomicBuilder.prototype.addPatternRules = function (rules, id, properties, prefix, isCustom) {
    var configObj = this.configObj;
    var self = this;

    if (rules.constructor !== Array) {
        throw new TypeError('The `rules` param must be an Array.');
    }
    if (!rules.length) {
        return false;
    }
    if (id.constructor !== String) {
        throw new TypeError('The `id` param must be a String.');
    }
    if (properties.constructor !== Array) {
        throw new TypeError('The `properties` param must be an Array.');
    }
    if (prefix.constructor !== String) {
        throw new TypeError('The `prefix` param must be a String.');
    }
    if (!configObj || configObj.constructor !== Object) {
        throw new TypeError('Expecting config object to be set in this instance.');
    }

    rules.forEach(function (rule) {
        if (!rule.suffix || !rule.values) {
            throw new Error('Rule should have keys `suffix` and `values`.');
        }
        if (rule.suffix.constructor !== String) {
            throw new TypeError('rule.suffix must be a String.');
        }
        if (rule.values.constructor !== Array) {
            throw new TypeError('rule.values must be an Array.');
        }
        // check if this rule is wanted by the config
        // allow pattern to be written if it's a custom rule
        if (!isCustom && (configObj[id] && !configObj[id][rule.suffix])) {
            return;
        }

        var className = prefix + rule.suffix;

        // iterate properties
        properties.forEach(function (property) {
            // iterate values
            rule.values.forEach(function (value) {
                var breakPoints;

                // breakPoints is declared differently if the rule is custom within this pattern
                if (isCustom && rule.breakPoints) {
                    breakPoints = rule.breakPoints;
                }
                // if it's not custom, it can be an object containing the breakPoints
                else if (configObj[id][rule.suffix] && configObj[id][rule.suffix].constructor === Object) {
                    breakPoints = configObj[id][rule.suffix].breakPoints;
                }

                // finally, assign
                self.addCssRule(className, property, value, breakPoints);
            });
        });
    });
};

/**
 * Add rules that are written in 'custom-pattern' format.
 * 
 * @method  addCustomPatternRules
 * @param {Array}    configGroup (Required) An array of an array of objects with keys that match suffixes of the passed rules.
 *                               Each key should have an array of values that will be added to each suffix property.
 * @param {Array}    rules       (Required) The array of rule objects containing a suffix and a value key.
 * @param {String}   id          (Required) The 'id' of the pattern.
 * @param {String}   prefix      (Required) The prefix sring of the class name.
 * @param {String}   suffixType  (Required) The type of the suffix to be appended to the custom class pattern.
 * @param {Array}    format      (Required) An array containing a function that tests each word passed on each item of class values.
 * @return {Boolean} True if the rules have been added, false otherwise.
 *
 * e.g.
 * 'border': [
*      // a
*      [
*          {suffix: 't', values: ['1px solid #000'], breakPoints: ['sm', 'md', 'lg']},
*          {suffix: 'b', values: ['3px solid #f00']},
*          {suffix: 'x', values: ['1px solid #f00', '3px solid #000']}
*      ],
*      // b
*      [
*          {suffix: 't', values: ['1px solid #fff']},
*          {suffix: 'b', values: ['3px solid transparent']}
*      ]
*  ]
 */
AtomicBuilder.prototype.addCustomPatternRules = function (configGroup, rules, id, prefix, suffixType, format) {
    var patternSuffix = '',
        className = '',
        self = this;

    if (!configGroup || configGroup.constructor !== Array) {
        throw new TypeError('Argument of the `configGroup` param must be an Array.');
    }
    if (!rules || rules.constructor !== Array) {
        throw new TypeError('The `rules` param must be an Array.');
    }
    if (!configGroup.length || !rules.length) {
        return false;
    }
    // opinionated limit. this should not even go as far as 26.
    // this is the hard limit based on the letters of the alphabet.
    if (configGroup.length > 26) {
        throw new RangeError('The limit for total custom pattern rules is 26.');
    }
    if (!id || id.constructor !== String) {
        throw new TypeError('The `id` param must be a String.');
    }
    if (!prefix || prefix.constructor !== String) {
        throw new TypeError('The `prefix` param must be a String.');
    }
    if (suffixType !== 'alphabet') {
        throw new TypeError('Argument of the `suffixType` param must be an \'alphabet\'.');
    }
    if (!format || format.constructor !== Array) {
        throw new TypeError('The `format` param must be an Array.');
    }

    if (format.some(function (formatFragment) {
        return formatFragment.constructor !== Function;
    })) {
        throw new TypeError('The `format` array must be an array of Functions.');
    }

    // iterate rules first, since it needs to go in order
    rules.forEach(function (rule) {
        if (!rule.suffix || !rule.values) {
            throw new Error('Rule should have keys `suffix` and `values`.');
        }
        if (rule.suffix.constructor !== String) {
            throw new TypeError('rule.suffix must be a String.');
        }
        if (rule.values.constructor !== Array) {
            throw new TypeError('rule.values must be an Array.');
        }

        // iterate configGroup so we can produce the class if wanted by the config
        configGroup.forEach(function (customPatterns, index) {
            if (customPatterns.constructor !== Array) {
                throw TypeError('Config group of `' + id + '` should be an array of array. Found an index that is not an array.');
            }
            // customPatterns is an array of objects
            customPatterns.forEach(function (customPatternObject) {
                if (!customPatternObject.suffix || !customPatternObject.values) {
                    throw new Error('custom pattern object of `' + id + '` should contain at least the following keys: `suffix`, `values`');
                }
                // return if it's not wanted by the config
                if(customPatternObject.suffix !== rule.suffix) {
                    return;
                }

                // 1. build the class name
                if (suffixType === 'alphabet') {
                    patternSuffix = '--' + String.fromCharCode(97 + index);
                }
                className = prefix + rule.suffix + patternSuffix;

                // 2. add the properties by iterating the rule values (which are the property names)
                rule.values.forEach(function (ruleProperty, rulePropertyIndex) {
                    // validate format of propertyValue passed in the config
                    var invalid,
                        propertyValue = customPatternObject.values[rulePropertyIndex] || '',
                        propertyValueParts = propertyValue.split(' ');

                    invalid = propertyValueParts.length !== format.length || propertyValueParts.some(function (propertyValuePart, wordIndex) {
                        return !format[wordIndex].call('undefined', propertyValuePart);
                    });

                    if (invalid) {
                        throw new Error('Invalid value format in `' + id + '`.');
                    }
                    self.addCssRule(className, ruleProperty, propertyValue, customPatternObject.breakPoints);
                });
            });
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
 * @param {String}  id                      (Required) The 'id' of the pattern.
 * @param {Array}   properties              (Required) The array of properties of the pattern.
 * @param {String}  prefix                  (Required) The prefix string of the class name.
 */
AtomicBuilder.prototype.addFractionRules = function (fractionObj, id, properties, prefix) {
    var denominator,
        className = '',
        value = '',
        self = this;

    if (!fractionObj || fractionObj.constructor !== Object) {
        throw new TypeError('fractionObj in config must be an Object. Config key: ' + id + '.');
    }
    denominator = fractionObj.denominator;
    if (!denominator || !utils.isInteger(denominator)) {
        throw new TypeError('fractionObj.denominator in config must be a Number. Config key: ' + id + '.');
    }
    if (id.constructor !== String) {
        throw new TypeError('The `id` param must be a String.');
    }
    if (properties.constructor !== Array) {
        throw new TypeError('The `properties` param must be an Array.');
    }
    if (prefix.constructor !== String) {
        throw new TypeError('The `prefix` param must be a String.');
    }

    function add(property) {
        self.addCssRule(className, property, value, fractionObj.breakPoints);
    }

    for (var i = 1; i <= denominator; i += 1) {
        className = prefix + i + '\\/' + denominator;
        // multiplying by 100 then by 10000 on purpose to show more clearly that we want:
        // percentage: (i / denominator * 100)
        // 4 decimal places:  (Math.round(percentage * 10000) / 10000)
        value = Math.round(i / denominator * 100 * 10000) / 10000 + '%';
        properties.forEach(add);
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
        throw new TypeError('addCssRule(): className param is required and must be a String.');
    }
    if (!property || property.constructor !== String) {
        throw new TypeError('addCssRule(): property param is required and must be a String.');
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

    if (configObj.config.start) {
        str = str.replace(/\$START/g, configObj.config.start);
    }
    if (configObj.config.start) {
        str = str.replace(/\$END/g, configObj.config.end);
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