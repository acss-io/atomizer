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
 * `type`           {String}  (Required) For pattern objects 'pattern' must be declared here.
 * `id`             {String}  (Required) A unique identifier for this pattern. Used by the config.
 * `name`           {String}  (Required) The name of the pattern. Used by the web tool.
 * `prefix`         {String}  (Required) The prefix to be prepended in the class name of each class.
 * `allowFraction`  {Boolean} (Optional) Wether or not this pattern allow fraction objects to be declared in the config.
 * `allowCustom`    {Boolean} (Optional) Wether or not this pattern allow custom values from config.
 * `properties`     {Array}   (Required) An array of properties that will be inside each rule.
 * `rules`          {Array}   (Required) An array of objects where each should have the keys:
 * `rules.suffix`   {String}  (Required) The suffix that will be appended to the prefix.
 * `rules.values`   {Array}   (Required) An array of values. The index of each value corresponds to the index of each property declared in `properties`.
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
 * },
 * {
 *     type: 'pattern',
 *     id: 'width',
 *     name: 'Width',
 *     prefix: '.W-',
 *     allowFraction: true,
 *     allowCustom: true,
 *     properties: ['width'],
 *     rules: [
 *         {suffix: 'a', values: ['auto']},
 *         {suffix: 'inh', values: ['inherited']}
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
 * 1.3. Custom pattern format
 * 
 * Used to generate a set of classes (with alphabetical suffixes) with custom properties.
 *                            
 * This object must contain the following keys:
 * 
 * `type`           {String}    (Required) For custom properties objects 'custom-properties' must be declared here.
 * `id`             {String}    (Required) A unique identifier for these classes. Used by the config.
 * `name`           {String}    (Required) The name of the classes. Used by the web tool.
 * `prefix`         {String}    (Required) The prefix to be prepended in the class name of each class.
 * `suffixType`     {String}    (Required) The type of suffix. It can only be 'alphabet'.
 * `format`         {Array}     (Required) An array of functions to test each word passed in the config object.
 * `rules`          {Array}     (Required) An array of objects where each should have the keys:
 * `rules.suffix`   {String}    (Required) The suffix that will be appended to the prefix.
 * `rules.values`   {Array}     (Required) An array of properties.
 *
 * Example:
 *
 * {
 *     type: 'custom-properties',
 *     id: 'border',
 *     name: 'Border',
 *     prefix: '.Bd-',
 *     suffixType: 'alphabet',
 *     format: [
 *         utils.isLength,
 *         utils.indexOf(['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset']),
 *         utils.isHex
 *     ],
 *     rules: [
 *         {suffix: 'x', values: ['border-left', 'border-right']},
 *         {suffix: 'y', values: ['border-top', 'border-bottom']},
 *         {suffix: 't', values: ['border-top']},
 *         {suffix: 'end', values: ['border-' + END]},
 *         {suffix: 'start', values: ['border-' + START]}
 *     ]
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

var AtomicBuilder = require('./lib/AtomicBuilder.js');
var atomicConfig = require('./atomicConfig.js');
var atomicObjs = require('./atomicObjects.js');

module.exports = function(api) {

    var atomicBuilder = new AtomicBuilder(atomicObjs, atomicConfig);
    var build = atomicBuilder && atomicBuilder.getBuild() || {};

    if (!_.size(build)) {
        throw new Error('Failed to generate CSS. The `build` object is empty.');
    }
    api.add(build);
}