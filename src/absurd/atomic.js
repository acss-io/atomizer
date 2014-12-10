/**
 *   .--.  .---.  .----. .-.   .-..-. .---.  .---.  .----. .----.
 *  / {} \{_   _}/  {}  \|  `.'  || |/  ___}/  ___}{ {__  { {__  
 * /  /\  \ | |  \      /| |\ /| || |\     }\     }.-._} }.-._} }
 * `-'  `-' `-'   `----' `-' ` `-'`-' `---'  `---' `----' `----' 
 * 
 * Atomic.css generation:
 * 
 * The generation process involves 2 main parts:
 * 
 *     1. Atomic rules
 *     2. Config object
 * 
 * 1. Atomic rules
 * 
 * It is the actual list of rules available in atomic.css, and it is used as a
 * reference for the config object which tells which rules it wants from this
 * list.
 * 
 * The atomic rules is an array of objects containing 2 types of object format:
 * 
 * 1.1. Pattern objects
 * 
 * Used to generate classes that shares the same syntax by using a prefix and
 * suffix, all declaring the same properties but with different values.
 *                   
 * This object must contain the following keys:
 * 
 * `type`: {String} For pattern objects 'pattern' must be declared here.
 * `id`: {String} A unique identifier for this pattern. Used by the config.
 * `name`: {String} The name of the pattern. Used by the web tool.
 * `properties`: {Array} An array of properties that will be inside each rule.
 * `rules`: {Array} An array of objects where each should have the keys:
 *
 *     `suffix`: {String} The suffix that will be appended to the prefix.
 *     `values`: {Array} An array of values. The index of each value
 *               corresponds to the index of each property declared in
 *               `properties`.
 *
 * Examples:
 * {
 *     type: 'pattern',
 *     id: 'font-weight',
 *     name: 'Font weight',
 *     prefix: '.Fw-',
 *     properties: ['font-weight']
 *     rules: [
 *         {suffix: 'n', values: ['normal']},
 *         {suffix: 'b', values: ['bold']},
 *         {suffix: 'br', values: ['bolder']},
 *         {suffix: 'lr', values: ['lighter']}
 *     ]
 * },
 * {
 *     type: 'pattern',
 *     id: 'padding-x',
 *     name: 'Padding X',
 *     prefix: '.Px-',
 *     properties: ['padding-left', 'padding-right'],
 *     rules: [
 *         {suffix: 'a', values: ['auto', 'auto']}
 *     ]
 * }
 * 
 * 1.2. Rule objects:
 * 
 * Used to generate unique classes that can contain one or more declarations.
 *                            
 * This object must contain the following keys:
 * 
 * `type`: {String} For rule objects 'rule' must be declared here.
 * `id`: {String} A unique identifier for this rule. Used by the config.
 * `name`: {String} The name of the rule. Used by the web tool.
 * `rule`: {Object} An object following absurjs' rule format.
 *
 * Example:
 *
 * {
 *     type: 'rule',
 *     id: 'bfc',
 *     name: 'Block formatting context'
 *     rule: {
 *         '.Bfc': {
 *             'overflow': 'hidden',
 *             '*zoom': 1
 *         }
 *     }
 * }
 * 
 * 2. Config Object
 * 
 * This is an object that must be set in `atomic.config.js` that tells what it
 * wants from the atomic.css (the atomic rules) and it is used to to generate
 * a custom build of atomic.css. See atomic.config.js.
 *
 * ----------------------------
 * Quick css glossary:
 *
 * ↓‾‾‾‾‾‾‾‾‾‾‾rule‾‾‾‾‾‾‾‾‾‾‾↓
 * selector { property: value }
 *          ↑̲̲̲declaration̲̲̲↑
 *
 * ----------------------------
 * 
 */

var _ = require('lodash');
var CONFIG = require('./atomic.config.js');
var START = CONFIG.config.start;
var END = CONFIG.config.end;

var atomicRules = [
    {
        type: 'pattern',
        id: 'font-weight',
        name: 'Font weight',
        prefix: '.Fw-',
        properties: ['font-weight'],
        rules: [
            {suffix: 'n', values: ['normal']},
            {suffix: 'b', values: ['bold']},
            {suffix: 'br', values: ['bolder']},
            {suffix: 'lr', values: ['lighter']},
            {suffix: '100', values: ['100']},
            {suffix: '200', values: ['200']},
            {suffix: '300', values: ['300']},
            {suffix: '400', values: ['400']},
            {suffix: '500', values: ['500']},
            {suffix: '600', values: ['600']},
            {suffix: '700', values: ['700']},
            {suffix: '800', values: ['800']},
            {suffix: '900', values: ['900']}
        ]
    },
    {
        type: 'pattern',
        id: 'padding-x',
        name: 'Horizontal padding',
        prefix: '.Px-',
        properties: ['padding-left', 'padding-right'],
        rules: [
            {suffix: 'a', values: ['auto', 'auto']}
        ]
    },
    {
        type: 'rule',
        id: 'bfc',
        name: 'Block formatting context',
        rule: {
            '.Bfc': {
                'overflow': 'hidden',
                '*zoom': 1
            }
        }
    }
];



module.exports = function(api) {
    var build = {};

    var configKeys = Object.keys(CONFIG),
        currentConfigKey,
        currentConfigObj;

    // iterate config object
    for (var i = 0, l = configKeys.length; i < l; i++) {
        currentConfigKey = configKeys[i];
        currentConfigObj = CONFIG[currentConfigKey];
        // iterate atomic rules
        atomicRules.forEach(function (atomicRule) {
            // we have a match
            if (currentConfigKey === atomicRule.id) {

                // if the atomic rule is a pattern
                if (atomicRule.type === 'pattern') {
                    // check if rules is present
                    if (!atomicRule.rules) {
                        throw 'ERROR: Missing rules for pattern ' + atomicRule.id + '.';
                        return;
                    }
                    // iterate rules
                    atomicRule.rules.forEach(function (rule) {
                        var className = atomicRule.prefix + rule.suffix;
                        build[className] = {};
                        // iterate properties
                        atomicRule.properties.forEach(function (property) {
                            // iterate values
                            rule.values.forEach(function (value) {
                                // finally, assign
                                build[className][property] = value;
                            });
                        });
                    });
                }
                // if the atomic rule is a rule
                else if (atomicRule.type === 'rule') {
                    // check if rule is present
                    if (!atomicRule.rule) {
                        throw 'ERROR: Missing rule for pattern ' + atomicRule.id + '.';
                        return;
                    }
                    _.merge(build, atomicRule.rule);
                }

            }
        });
    }

    // fin
    api.add(build);
}