/*
 * Copyright (c) 2015, Yahoo Inc. All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

'use strict';

var _ = require('lodash');
var utils = require('./lib/utils');
var JSS = require('./lib/jss');
var Grammar = require('./lib/grammar');
var objectAssign = require('object-assign');
var XRegExp = require('xregexp').XRegExp;

var RULES = require('./rules.js').concat(require('./helpers.js'));

/**
 * constructor
 */
function Atomizer(options/*:AtomizerOptions*/, rules/*:AtomizerRules*/) {
    this.verbose = options && options.verbose || false;
    this.rules = [];
    // we have two different objects to avoid name collision
    this.rulesMap = {};
    this.helpersMap = {};

    // add rules
    this.addRules(rules || RULES);
}

/**
 * addRules
 * @public
 */
Atomizer.prototype.addRules = function(rules/*:AtomizerRules*/)/*:void*/ {
    rules.forEach(function (rule) {
        var ruleFound = rule.type === 'pattern' && this.rulesMap.hasOwnProperty(rule.matcher);
        var helperFound = rule.type === 'helper' && this.helpersMap.hasOwnProperty(rule.matcher);

        if ((ruleFound && !_.isEqual(this.rules[this.rulesMap[rule.matcher]], rule)) ||
                (helperFound && !_.isEqual(this.rules[this.helpersMap[rule.matcher]], rule))) {
            throw new Error('Rule ' + rule.matcher + ' already exists with a different defintion.');
        }

        if (!ruleFound && !helperFound) {
            // push new rule to this.rules and update rulesMap
            this.rules.push(rule);

            if (rule.type === 'pattern') {
                this.rulesMap[rule.matcher] = this.rules.length - 1;
            } else {
                this.helpersMap[rule.matcher] = this.rules.length - 1;
            }
        }
    }, this);

    // invalidates syntax
    this.syntax = null;
    this.syntaxSimple = null;
};

/**
 * getClassNameSyntax()
 * @private
 */
Atomizer.prototype.getSyntax = function (isSimple)/*:string*/ {

    if (isSimple && !this.syntaxSimple) {
        this.syntaxSimple = new Grammar(this.rules).getSyntax(true);
    }
    if (!isSimple && !this.syntax) {
       // All Grammar and syntax parsing  should be in the Grammar class
       this.syntax = new Grammar(this.rules).getSyntax();
    }

    return isSimple ? this.syntaxSimple : this.syntax;
};

/**
 * findClassNames
 */
Atomizer.prototype.findClassNames = function (src/*:string*/)/*:string[]*/ {
    // using object to remove dupes
    var classNamesObj = {};
    var className;
    var classNameSyntax = this.getSyntax();
    var match = classNameSyntax.exec(src);

    while (match !== null) {
        // strip boundary character
        className = match[1];

        // assign to classNamesObj as key and give it a counter
        classNamesObj[className] = (classNamesObj[className] || 0) + 1;

        // run regex again
        match = classNameSyntax.exec(src);
    }

    // return an array of the matched class names
    return _.keys(classNamesObj);
};

/**
 * Get Atomizer config given an array of class names and an optional config object
 * examples:
 *
 * getConfig(['Op(1)', 'D(n):h', 'Fz(heading)'], {
 *     custom: {
 *         heading: '80px'
 *     },
 *     breakPoints: {
 *         'sm': '@media(min-width:500px)',
 *         'md': '@media(min-width:900px)',
 *         'lg': '@media(min-width:1200px)'
 *     },
 *     classNames: ['D(b)']
 * }, {
 *     rtl: true
 * });
 *
 * getConfig(['Op(1)', 'D(n):h']);
 */
Atomizer.prototype.getConfig = function (classNames/*:string[]*/, config/*:AtomizerConfig*/)/*:AtomizerConfig*/ {
    config = config || { classNames: [] };
    // merge classnames with config
    config.classNames = _.union(classNames || [], config.classNames);
    return config;
};

/**
 * return a parsed tree given a config and css options
 */
Atomizer.prototype.parseConfig = function (config/*:AtomizerConfig*/, options/*:CSSOptions*/)/*:Tree*/ {
    var tree = {};
    var classNameSyntax = this.getSyntax(true);
    var warnings = [];
    var isVerbose = !!this.verbose;
    var classNames = config.classNames;

    if (!_.isArray(config.classNames)) { return tree; }
    options = options || {};

    if ('exclude' in config) {
        classNames = _.difference(classNames, config.exclude);
    }

    classNames.forEach(function (className) {
        var match = XRegExp.exec(className, classNameSyntax);
        var rule;
        var ruleIndex;
        var treeo;
        var rgb;
        var values;

        if (!match || (!match.atomicSelector && !match.selector)) {
          // no match, no op
          return;
        }

        // check where this rule belongs to
        // atomicSelector is the class name before the params: e.g. className(param)
        // selector is the class name if params is not required
        // we look both in rules and in helpers where this class belongs to
        if (this.rulesMap.hasOwnProperty(match.atomicSelector)) {
            ruleIndex = this.rulesMap[match.atomicSelector];
        }
        // the atomicSelector can also be a helper that requires params
        else if (this.helpersMap.hasOwnProperty(match.atomicSelector)) {
            ruleIndex = this.helpersMap[match.atomicSelector];
        }
        // or it can be just a class with no params required
        // this is only possible for helper classes as param is required for
        // all atomic classes in rulesMap.
        else if (this.helpersMap.hasOwnProperty(match.selector)) {
            ruleIndex = this.helpersMap[match.selector];
        } else {
            // not a valid class, no op
            return;
        }

        // get the rule that this class name belongs to.
        // this is why we created the dictionary
        // as it will return the index given a matcher.
        rule = this.rules[ruleIndex];

        treeo = {
            className: match[1],
            declarations: _.cloneDeep(rule.styles)
        };

        if (!tree[rule.matcher]) {
            tree[rule.matcher] = [];
        }

        if (match.parentSelector) {
            treeo.parentSelector = match.parentSelector;
        }
        if (match.parent) {
            treeo.parent = match.parent;
        }
        if (match.parentPseudo) {
            treeo.parentPseudo = match.parentPseudo;
        }
        if (match.parentSep) {
            treeo.parentSep = match.parentSep;
        }

        // given values, return their valid form
        if (match.atomicValues) {
            values = match.atomicValues;

            // values can be separated by a comma
            // parse them and return a valid value
            values = values.split(',').map(function (value, index) {
                var matchVal = Grammar.matchValue(value);
                var propAndValue;

                if (matchVal.number) {
                    if (rule.allowParamToValue || rule.type === 'helper') {
                        value = matchVal.number;
                        if (matchVal.unit) {
                            value += matchVal.unit;
                        }
                    } else {
                        // treat as if we matched a named value
                        matchVal.named = [matchVal.number, matchVal.unit].join('');
                    }
                }
                if (matchVal.fraction) {
                    // multiplying by 100 then by 10000 on purpose (instead of just multiplying by 1M),
                    // making clear the steps involved:
                    // percentage: (numerator / denominator * 100)
                    // 4 decimal places:  (Math.round(percentage * 10000) / 10000)
                    value = Math.round(matchVal.numerator / matchVal.denominator * 100 * 10000) / 10000 + '%';
                }
                if (matchVal.hex) {
                    if (matchVal.alpha) {
                        rgb = utils.hexToRgb(matchVal.hex);
                        value = [
                            'rgba(',
                            rgb.r,
                            ',',
                            rgb.g,
                            ',',
                            rgb.b,
                            ',',
                            matchVal.alpha,
                            ')'
                        ].join('');
                    } else {
                        value = matchVal.hex;
                    }
                }
                if (matchVal.named) {
                    // first check if 'inh' is the value
                    if (matchVal.named === 'inh') {
                        value = 'inherit';
                    }
                    // check if the named value matches any of the values
                    // registered in arguments.
                    else if (rule.arguments && index < rule.arguments.length && Object.keys(rule.arguments[index]).indexOf(matchVal.named) >= 0) {
                        value = rule.arguments[index][matchVal.named];
                    }
                    // now check if named value was passed in the config
                    else {
                        propAndValue = [match.atomicSelector, '(', matchVal.named, ')'].join('');

                        // no custom, warn it
                        if (!config.custom) {
                            warnings.push(propAndValue);
                            // set to null so we don't write it to the css
                            value = null;
                        }
                        // as prop + value
                        else if (config.custom.hasOwnProperty(propAndValue)) {
                            value = config.custom[propAndValue];
                        }
                        // as value
                        else if (config.custom.hasOwnProperty(matchVal.named)) {
                            value = config.custom[matchVal.named];
                        }
                        // we have custom but we could not find the named class name there
                        else {
                            warnings.push(propAndValue);
                            // set to null so we don't write it to the css
                            value = null;
                        }
                    }
                }
                return value;
            });
        }

        if (match.valuePseudo) {
            treeo.valuePseudo = match.valuePseudo;
        }

        if (match.breakPoint) {
            treeo.breakPoint = match.breakPoint;
        }

        // before we assign, let's take care of the declarations
        // iterate declarations so we can replace values with their valid form
        for (var prop in treeo.declarations) {
            if (values) {
                values.forEach(function (value, index) {
                    // plug IE hacks for know properties
                    if (options.ie) {
                        // block formatting context on old IE
                        /* istanbul ignore else  */
                        if ((prop === 'display' && value === 'inline-block') || (prop === 'overflow' && value !== 'visible')) {
                            treeo.declarations.zoom = 1;
                        }
                        /* istanbul ignore else  */
                        if (prop === 'display' && value === 'inline-block') {
                            treeo.declarations['*display'] = 'inline';
                        }
                        /* istanbul ignore else  */
                        if (prop === 'opacity') {
                            treeo.declarations.filter = 'alpha(opacity=' + parseFloat(value, 10) * 100 + ')';
                        }
                    }
                    if (value !== null) {
                        // value could be an object for custom classes with breakPoints
                        // e.g.
                        // 'custom': {
                        //     'P($gutter)': {
                        //         default: '10px',
                        //         sm: '12px',
                        //         md: '14px',
                        //         lg: '20px'
                        //     }
                        // }
                        if (_.isObject(value)) {
                            Object.keys(value).forEach(function (bp) {
                                // don't continue if we can't find the breakPoint in the declaration
                                if (!config.hasOwnProperty('breakPoints') || !config.breakPoints.hasOwnProperty(bp)) {
                                    return;
                                }
                                treeo.declarations[config.breakPoints[bp]] = {};
                                treeo.declarations[config.breakPoints[bp]][prop] = treeo.declarations[prop].replace('$' + index, value[bp]);
                            });
                            // handle default value in the custom class
                            if (!value.hasOwnProperty('default')) {
                                // default has not been passed, make sure we delete it
                                delete treeo.declarations[prop];
                            } else {
                                treeo.declarations[prop] = treeo.declarations[prop].replace('$' + index, value.default);
                            }
                        } else {
                            treeo.declarations[prop] = treeo.declarations[prop].replace('$' + index, value);
                        }
                    } else {
                        treeo.declarations = null;
                    }
                });
                // If any of the arguments in the declaration weren't replaced, then we need to clean them up
                if (treeo.declarations && treeo.declarations[prop] && treeo.declarations[prop].indexOf('$') >= 0) {
                    treeo.declarations[prop] = treeo.declarations[prop].replace(/[,\s]?\$\d+/g, '');
                }
            }

            // add important for the following cases:
            //    - `!` was used in the class name
            //    - rule has a parent class, a namespace was given and the rule is not a helper [1]
            // [1] rules with a parent class won't have a namespace attached to the selector since
            //     it prevents people from using the parent class at the root element (<html>). But
            //     to give it extra specificity (to make sure it has more weight than normal atomic
            //     classes) we add important to them. Helper classes don't need it because they do
            //     not share the same namespace.
            if (match.important || (match.parent && options.namespace && rule.type !== 'helper')) {
                treeo.declarations[prop] += ' !important';
            }
        }

        tree[rule.matcher].push(treeo);
    }, this);

    // throw warnings
    if (isVerbose && warnings.length > 0) {
        warnings.forEach(function (className) {
            console.warn([
                'Warning: Class `' + className + '` is ambiguous, and must be manually added to your config file:',
                '"custom": {',
                '    "' + className + '": <YOUR-CUSTOM-VALUE>',
                '}'
            ].join("\n"));
        });
    }

    return tree;
};

/**
 * Get CSS given an array of class names, a config and css options.
 * examples:
 *
 * getCss({
 *     custom: {
 *         heading: '80px'
 *     },
 *     breakPoints: {
 *         'sm': '@media(min-width:500px)',
 *         'md': '@media(min-width:900px)',
 *         'lg': '@media(min-width:1200px)'
 *     },
 *     classNames: ['D(b)', 'Op(1)', 'D(n):h', 'Fz(heading)']
 * }, {
 *     rtl: true
 * });
 *
 * @public
 */
Atomizer.prototype.getCss = function (config/*:AtomizerConfig*/, options/*:CSSOptions*/)/*:string*/ {
    var jss = {};
    var tree;
    var content = '';
    var breakPoints;

    options = objectAssign({}, {
        // require: [],
        // morph: null,
        banner: '',
        namespace: null,
        rtl: false,
        ie: false
    }, options);

    // validate config.breakPoints
    if (config && config.breakPoints) {
        if (!_.isObject(config.breakPoints)) {
            throw new TypeError('`config.breakPoints` must be an Object');
        }
        /* istanbul ignore else  */
        if (_.size(config.breakPoints) > 0) {
            for(var bp in config.breakPoints) {
                if (!/^@media/.test(config.breakPoints[bp])) {
                    throw new Error('Breakpoint `' + bp + '` must start with `@media`.');
                } else {
                    breakPoints = config.breakPoints;
                }
            }
        }
    }

    // make sense of the config
    tree = this.parseConfig(config, options);

    // write JSS
    // start by iterating rules (we need to follow the order that the rules were declared)
    this.rules.forEach(function (rule) {
        // check if we have a class name that matches this rule
        if (tree[rule.matcher]) {
            tree[rule.matcher].forEach(function(treeo) {
                var breakPoint;
                var selector;

                // if we were not able to find the declaration then don't write anything
                if (!treeo.declarations) {
                    return;
                }

                breakPoint = breakPoints && breakPoints[treeo.breakPoint];

                // this is where we start writing the selector
                selector = Atomizer.escapeSelector(treeo.className);

                // handle parent classname
                if (treeo.parentSelector) {
                    selector = [
                        Atomizer.escapeSelector(treeo.parent),
                        Grammar.getPseudo(treeo.parentPseudo),
                        treeo.parentSep === '_' ? ' ' : [' ', treeo.parentSep, ' '].join(''),
                        '.',
                        selector
                    ].join('');
                }

                // handle pseudo in values
                if (treeo.valuePseudo) {
                    selector = [
                        selector,
                        Grammar.getPseudo(treeo.valuePseudo)
                    ].join('');
                }

                // add the dot for the class
                selector = ['.', selector].join('');

                // add the namespace only if we don't have a parent selector
                if (!treeo.parent) {
                    if (rule.type === 'helper' && options.helpersNamespace) {
                        selector = [options.helpersNamespace, ' ', selector].join('');
                    } else if (rule.type !== 'helper' && options.namespace) {
                        selector = [options.namespace, ' ', selector].join('');
                    }
                }

                // rules are companion classes to the main atomic class
                if (rule.rules) {
                    _.merge(jss, rule.rules);
                }

                // finaly, write the final parts
                // put the declaration to the JSS object with the associated class name
                /* istanbul ignore else */
                if (!jss[selector]) {
                    jss[selector] = {};
                }
                if (breakPoint) {
                    jss[selector][breakPoint] = treeo.declarations;
                } else {
                    jss[selector] = treeo.declarations;
                }
            });
        }
    });

    // convert JSS to CSS
    content = options.banner + JSS.jssToCss(jss);

    // fix the comma problem in Absurd
    content = Atomizer.replaceConstants(content, options.rtl);

    return content;
};

/**
 * Escape CSS selectors with a backslash
 * e.g. ".W-100%" => ".W-100\%"
 */
Atomizer.escapeSelector = function (str/*:string*/)/*:string*/ {
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
 * Replace LTR/RTL placeholders with actual left/right strings
 */
Atomizer.replaceConstants = function (str/*:string*/, rtl/*:boolean*/) {
    var start = rtl ? 'right' : 'left';
    var end = rtl ? 'left' : 'right';

    if (!str || str.constructor !== String) {
        return str;
    }

    return str.replace(/__START__/g, start).replace(/__END__/g, end);
};

module.exports = Atomizer;
