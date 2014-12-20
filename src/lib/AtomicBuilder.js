'use strict';

var _ = require('lodash');
var utils = require('./utils');
var chalk = require('chalk');

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
        configKeys = Object.keys(configObj),
        currentConfigKey,
        currentConfigObj,
        self = this;

    // iterate config object
    for (var i = 0, l = configKeys.length; i < l; i++) {
        currentConfigKey = configKeys[i];
        currentConfigObj = configObj[currentConfigKey];

        atomicObjs.forEach(function (atomicObj) {
            // don't proceed if the keys don't match
            if (currentConfigKey !== atomicObj.id) {
                return;
            }
            if (atomicObj.id.constructor !== String) {
                throw new TypeError('Key `id` of atomic object must be a String. Object: ' + atomicObj);
            }
            if (atomicObj.type.constructor !== String) {
                throw new TypeError('Key `type` of atomic object must be a String. Object: ' + atomicObj.id);
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
                // if `custom` has been passed
                if (currentConfigObj.custom) {
                    if (!atomicObj.allowCustom) {
                        throw new Error('Custom has been passed but it is not allowed for this rule. Config key: ' + currentConfigKey + '.');
                    }
                    if (currentConfigObj.custom.constructor !== Array) {
                        throw new TypeError('Custom in config must be an Array. Config key: ' + currentConfigKey + '.');
                    }
                    self.addPatternRules(currentConfigObj.custom, atomicObj.id, atomicObj.properties, atomicObj.prefix, true);
                }
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
    }
}

/**
 * Add rules that are written in pattern format to the build obj.
 * @param {Array}    rules             (Required) The array of rule objects containing a suffix and values.
 * @param {String}   id                (Required) The 'id' of the pattern.
 * @param {Array}    properties        (Required) The array of properties of the pattern.
 * @param {String}   prefix            (Required) The prefix sring of the class name.
 * @param {Function} formatClassNameFn (Optional) A custom function to format the class name.
 * @param {Boolean}  isCustom          (Optional) Wether or not this rule is a custom rule.
 * @return {Boolean} True if the rules have been added, false otherwise.
 */
AtomicBuilder.prototype.addPatternRules = function (rules, id, properties, prefix, isCustom) {
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