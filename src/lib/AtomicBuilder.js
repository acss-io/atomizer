'use strict';

var _ = require('lodash');

// perf of approaches used:
// object has key: http://jsperf.com/hasownproperty-vs-in-vs-undefined/72

/**
 * AtomicBuilder manage build object given an atomic object and a config object.
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

AtomicBuilder.prototype.loadObjects = function (objs) {
    if (!objs) {
        throw new Error('`objs` param is required');
    }
    if (objs.constructor !== Array) {
        throw new TypeError('Argument of the `objs` param must be an Array.');
    }
    this.atomicObjs = objs;
};

AtomicBuilder.prototype.loadConfig = function (config) {
    if (!config) {
        throw new Error('`config` param is required');
    }
    if (config.constructor !== Object) {
        throw new TypeError('Argument of the `config` param must be an Object.');
    }
    this.configObj = config;
};

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
                self.addPatternRules(atomicObj.rules, atomicObj.id, atomicObj.properties, atomicObj.prefix, atomicObj.breakPoints);
            }
            // if `grid` has been passed
            // if (currentConfigObj.grid) {
            //     if (!atomicObj.allowGrid) {
            //         throw new Error('Grid has been passed but it is not allowed for this rule. Config key: ' + atomicObj.id + '.');
            //     }
            //     if (currentConfigObj.grid.constructor !== Object) {
            //         throw new TypeError('Grid in config must be an Object. Config key: ' + atomicObj.id + '.');
            //     }
            //     self.addPatternGridRules(currentConfigObj.grid, atomicObj.id, atomicObj.properties, atomicObj.prefix);
            // }
            // if `custom` has been passed
            if (currentConfigObj.custom) {
                if (!atomicObj.allowCustom) {
                    throw new Error('Custom has been passed but it is not allowed for this rule. Config key: ' + atomicObj.id + '.');
                }
                if (currentConfigObj.custom.constructor !== Array) {
                    throw new TypeError('Custom in config must be an Array. Config key: ' + atomicObj.id + '.');
                }
                self.addPatternRules(currentConfigObj.custom, atomicObj.id, atomicObj.properties, atomicObj.prefix, atomicObj.breakPoints, true);
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
 * @param {Array}    rules             (Required) The array of rule objects containing a suffix and values.
 * @param {String}   id                (Required) The 'id' of the pattern.
 * @param {Array}    properties        (Required) The array of properties of the pattern.
 * @param {String}   prefix            (Required) The prefix string of the class name.
 * @param {Object}   breakPoints       (Optional) The breakPoints object to be grouped in media queries.
 * @param {Boolean}  isCustom          (Optional) Wether or not this rule is a custom rule.
 * @return {Boolean} True if the rules have been added, false otherwise.
 */
AtomicBuilder.prototype.addPatternRules = function (rules, id, properties, prefix, breakPoints, isCustom) {
    var build = {};
    var configObj = this.configObj;

    if (rules.constructor !== Array) {
        throw new TypeError('Argument of the `rules` param must be an Array.');
    }
    if (!rules.length) {
        return false;
    }
    if (id.constructor !== String) {
        throw new TypeError('Argument of the `id` param must be a String.');
    }
    if (properties.constructor !== Array) {
        throw new TypeError('Argument of the `properties` param must be an Array.');
    }
    if (prefix.constructor !== String) {
        throw new TypeError('Argument of the `prefix` param must be a String.');
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
        if (!isCustom && (configObj[id] && !configObj[id][rule.suffix])) {
            return;
        }

        // @TODO: Implememt BreakPoints
        // if (breakPoints[rule.suffix]) {
        //     breakPoints[rule.suffix].forEach(function (breakPoint) {
        //         breakPoint
        //     });
        // }

        var className = prefix + rule.suffix;

        build[className] = {};

        // iterate properties
        properties.forEach(function (property) {
            // iterate values
            rule.values.forEach(function (value) {
                // finally, assign
                build[className][property] = value;
            });
        });
    });

    if (!_.size(build)) {
        return false;
    }

    _.merge(this.build, build);
    return true;
};

/**
 * Add rules that are written in 'custom-pattern' format.
 * @param {Array}    configGroup (Required) An array of objects with keys that match suffixes of the passed rules.
 *                               Each key should have an array of values that will be added to each suffix property.
 * @param {Array}    rules       (Required) The array of rule objects containing a suffix and a value key.
 * @param {String}   id          (Required) The 'id' of the pattern.
 * @param {String}   prefix      (Required) The prefix sring of the class name.
 * @param {String}   suffixType  (Required) The type of the suffix to be appended to the custom class pattern.
 * @param {Array}    format      (Required) An array containing a function that tests each word passed on each item of class values.
 * @return {Boolean} True if the rules have been added, false otherwise.
 */
AtomicBuilder.prototype.addCustomPatternRules = function (configGroup, rules, id, prefix, suffixType, format) {
    var build = {},
        patternSuffix = '',
        className = '';

    if (!configGroup || configGroup.constructor !== Array) {
        throw new TypeError('Argument of the `configGroup` param must be an Array.');
    }
    if (!rules || rules.constructor !== Array) {
        throw new TypeError('Argument of the `rules` param must be an Array.');
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
        throw new TypeError('Argument of the `id` param must be a String.');
    }
    if (!prefix || prefix.constructor !== String) {
        throw new TypeError('Argument of the `prefix` param must be a String.');
    }
    if (suffixType !== 'alphabet') {
        throw new TypeError('Argument of the `suffixType` param must be an \'alphabet\'.');
    }
    if (!format || format.constructor !== Array) {
        throw new TypeError('Argument of the `format` param must be an Array.');
    }

    if (format.some(function (formatFragment) {
        return formatFragment.constructor !== Function;
    })) {
        throw new TypeError('The `format` array must be an array of Functions.');
    }

    // configGroup
    // 'border': [
    //     // a
    //     {
    //         t: ['1px solid #000'],
    //         b: ['3px solid #f00'],
    //         x: ['1px solid #000', '3px solid #000']
    //     },
    //     // b
    //     {
    //         t: '1px solid #000',
    //         b: '3px solid #f00'
    //     }
    // ],
    // 
    // =======
    // atomicObj
    // {
    //     type: 'custom-properties',
    //     id: 'border',
    //     name: 'Border',
    //     prefix: '.Bd-',
    //     suffixType: 'alphabet',
    //     format: [
    //         utils.isLength,
    //         utils.indexOf(['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset']),
    //         utils.isColor
    //     ],
    //     rules: [
    //         {suffix: 'x', values: ['border-left', 'border-right']},
    //         {suffix: 'y', values: ['border-top', 'border-bottom']},
    //         {suffix: 't', values: ['border-top']},
    //         {suffix: 'b', values: ['border-bottom']},
    //         {suffix: 'end', values: ['border-' + END]},
    //         {suffix: 'start', values: ['border-' + START]}
    //     ]
    // },

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
        configGroup.forEach(function (customPatternObject, index) {
            if (customPatternObject.constructor !== Object) {
                throw TypeError('Config group of `' + id + '` should be an array of Objects. Found an index that is not an object.');
            }
            // return if it's not wanted by the config
            if (!customPatternObject[rule.suffix]) {
                return;
            }
            // 1. build the class name
            if (suffixType === 'alphabet') {
                patternSuffix = '--' + String.fromCharCode(97 + index);
            }
            className = prefix + rule.suffix + patternSuffix;
            build[className] = {};

            // 2. add the properties by iterating the rule values (which are the property names)
            rule.values.forEach(function (ruleProperties, rulePropertyIndex) {
                // validate format of propertyValue passed in the config
                var invalid,
                    propertyValue = customPatternObject[rule.suffix][rulePropertyIndex] || '',
                    propertyValueParts = propertyValue.split(' ');

                invalid = propertyValueParts.length !== format.length || propertyValueParts.some(function (propertyValuePart, wordIndex) {
                    return !format[wordIndex].call('undefined', propertyValuePart);
                });

                if (invalid) {
                    throw new Error('Invalid value format in `' + id + '`.');
                }

                build[className][ruleProperties] = propertyValue;
            });
        });
    });

    if (!_.size(build)) {
        return false;
    }

    _.merge(this.build, build);
    return true;
};

/**
 * Add a simple rule to the build object
 * @param {Object} rule The rule to be added.
 * @param {String} id   The id of the rule to be added.
 * @return {Boolean} True if the rule has been added, false otherwise.
 */
AtomicBuilder.prototype.addRule = function (rule, id) {
    var configObj = this.configObj;

    if (rule.constructor !== Object) {
        throw new TypeError('Argument of the `rule` param must be an Object.');
    }
    if (id.constructor !== String) {
        throw new TypeError('Argument of the `id` param must be a String.');
    }
    if (!configObj || configObj.constructor !== Object) {
        throw new TypeError('Expecting config object to be set in this instance.');
    }

    // check if this rule is wanted by the config
    if (!configObj[id]) {
        return false;
    }

    _.merge(this.build, rule);
    return true;
};

AtomicBuilder.prototype.flush = function () {
    this.build = {};
};

/**
 * Returns the build object
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