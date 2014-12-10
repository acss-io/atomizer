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
 *     1. Atomic objects
 *     2. Config object
 * 
 * 1. Atomic objects
 * 
 * An array of atomic objects describing atomic.css. It is the reference to 
 * the config object that tells which rules it wants from this list.
 * 
 * The atomic objects can follow 2 types of format:
 * 
 * 1.1. Pattern format
 * 
 * Used to generate classes that shares the same syntax by using a prefix and 
 * suffix, all declaring the same properties but with different values.
 *                   
 * This object may contain the following keys:
 * 
 * `type`        {String}  (Required) For pattern objects 'pattern' must be declared here.
 * `id`          {String}  (Required) A unique identifier for this pattern. Used by the config.
 * `name`        {String}  (Required) The name of the pattern. Used by the web tool.
 * `prefix`      {String}  (Required) The prefix to be prepended in the class name of each class.
 * `allowCustom` {Boolean} (Optional) Wether or not this pattern allow custom values from config.
 * `properties`  {Array}   (Required) An array of properties that will be inside each rule.
 * `rules`       {Array}   (Required) An array of objects where each should have the keys:
 *
 *     `suffix`  {String} (Required) The suffix that will be appended to the prefix.
 *     `values`  {Array}  (Required) An array of values. The index of each value
 *                                   corresponds to the index of each property declared in
 *                                   `properties`.
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
 *     allowCustom: true,
 *     properties: ['padding-left', 'padding-right'],
 *     rules: [
 *         {suffix: 'a', values: ['auto', 'auto']}
 *     ]
 * }
 * 
 * 1.2. Rule format
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

var AtomicBuilder = require('./AtomicBuilder.js');
var atomicConfig = require('./AtomicConfig.js');
var atomicObjs = [
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
        allowCustom: true,
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

    var atomicBuilder = new AtomicBuilder(atomicObjs, atomicConfig);
    var build = atomicBuilder && atomicBuilder.getBuild() || {};

    if (!_.size(build)) {
        throw 'Failed to generate CSS. The `build` object is empty.';
    }

    api.add(build);
}