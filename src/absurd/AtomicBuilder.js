
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

    if (atomicObjs.constructor !== Array) {
        throw new Error('Argument of the `atomicObjs` param must be an Array.');
    }

    if (configObj.constructor !== Object) {
        throw new Error('Argument of the `configObj` param must be an Object.');
    }

    var configKeys = Object.keys(configObj),
        currentConfigKey,
        currentConfigObj,
        self = this;

    // create our build obj
    this.build = {};

    // assign these so we can retrieve later
    this.atomicObjs = atomicObjs;
    this.configObj = configObj;

    // function to handle atomicObjs.forEach()
    

    // iterate config object
    for (var i = 0, l = configKeys.length; i < l; i++) {
        currentConfigKey = configKeys[i];
        currentConfigObj = configObj[currentConfigKey];

        atomicObjs.forEach(function (atomicObj) {
            // don't proceed if the keys don't match
            if (currentConfigKey !== atomicObj.id) {
                return;
            }

            if (!atomicObj.id) {
                throw new Error('Missing key `id` for the atomic object: ' + atomicObj + '.');
            }

            if (atomicObj.id.constructor !== String) {
                throw new TypeError('Key `id` of atomic object must be a String. Object: ' + atomicObj);
            }

            if (!atomicObj.type) {
                throw new Error('Missing key `type` for the atomic object: ' + atomicObj.id + '.');
            }

            if (atomicObj.type.constructor !== String) {
                throw new TypeError('Key `type` of atomic object must be a String. Object: ' + atomicObj.id);
            }

            // if the atomic object is a pattern
            if (atomicObj.type === 'pattern') {
                // check if `rules` is present
                if (!atomicObj.rules) {
                    throw new Error('Missing rules for pattern ' + atomicObj.id + '.');
                }
                self.addPatternRules(atomicObj.rules, atomicObj.id, atomicObj.properties, atomicObj.prefix);
                // if custom has been passed
                if (currentConfigObj.custom) {
                    if (!atomicObj.allowCustom) {
                        throw new Error('Custom has been passed but it is not allowed for this rule. Config key: ' + currentConfigKey + '.');
                    }
                    if (currentConfigObj.custom.constructor !== Array) {
                        throw new TypeError('Custom in config must be an Array. Config key: ' + currentConfigKey + '.');
                    }
                    self.addPatternRules(currentConfigObj.custom, atomicObj.id, atomicObj.properties, atomicObj.prefix, true);
                }
                // if the atomic object is a rule
                else if (atomicObj.type === 'rule') {
                    // check if `rule` is present
                    if (!atomicObj.rule) {
                        throw new Error('Missing key `rule` for pattern ' + atomicObj.id + '.');
                    }
                    // check if `id` is present
                    if (!atomicObj.rule) {
                        throw new Error('Missing key `rule` for pattern ' + atomicObj.id + '.');
                    }
                   self.addRule(atomicObj.rule, atomicObj.id);
                }
            }
        });
    }
    if (!this.build.length) {
        return false;
    }
    return true;
}

/**
 * Add rules that are written in pattern format to the build obj.
 * @param {Array}   rules       (Required) The array of rule objects containing a suffix and values.
 * @param {String}  id          (Required) The 'id' of the pattern.
 * @param {Array}   properties  (Required) The array of properties of the pattern.
 * @param {String}  prefix      (Required) The prefix sring of the class name.
 * @param {Boolean} isCustom    (Optional) Wether or not this rule is a custom rule.
 * @return {Boolean} True if the rules have been added, false otherwise.
 */
AtomicBuilder.prototype.addPatternRules = function (rules, id, properties, prefix, isCustom) {
    var build = this.build;
    var configObj = this.configObj;

    if (rules.constructor !== Array) {
        throw new TypeError('Argument of the `rules` param must be an Array.');
    }
    if (!rules.length) {
        return false;
    }
    if (!properties) {
        throw new Error('The `properties` argument is required to add a rule.');
    }
    if (properties.constructor !== Array) {
        throw new TypeError('Argument of the `properties` param must be an Array.');
    }
    if (!prefix) {
        throw new Error('A `prefix` is required to add a rule.');
    }
    if (prefix.constructor !== String) {
        throw new TypeError('Argument of the `prefix` param must be a String.');
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
        if (!isCustom && !configObj[id][rule.suffix]) {
            return false;
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
    return true;
};

/**
 * Add a simple rule to the build object
 * @param {Object} rule The rule to be added.
 * @param {String} id   The id of the rule to be added.
 * @return {Boolean} True if the rule has been added, false otherwise.
 */
AtomicBuilder.prototype.addRule = function (rule, id) {
    if (!rule) {
        throw new Error('Expecting argument: `rule`');
    }
    if (rule.constructor !== Object) {
        throw new TypeError('Argument of the `rule` param must be an Object.');
    }
    if (!id) {
        throw new Error('Expecting argument: `id`');
    }
    if (id.constructor !== String) {
        throw new TypeError('Argument of the `id` param must be a String.');
    }

    // check if this rule is wanted by the config
    if (!this.configObj[id]) {
        return false;
    }

    _.merge(this.build, rule);
    return true;
};

/**
 * Returns the build object
 * @return {Object} The build object
 */
AtomicBuilder.prototype.getBuild = function () {
    return this.build;
};

module.exports = AtomicBuilder;