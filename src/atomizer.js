/*
 * Copyright (c) 2015, Yahoo Inc. All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

'use strict';

var _ = require('lodash');
var utils = require('./utils');
var JSS = require('./jss');
var objectAssign = require('object-assign');
var XRegExp = require('xregexp').XRegExp;

var RULES = require('./rules.js').concat(require('./helpers.js'));

var PSEUDOS = {
    ':active':          ':a',
    ':checked':         ':c',
    ':default':         ':d',
    ':disabled':        ':di',
    ':empty':           ':e',
    ':enabled':         ':en',
    ':first':           ':fi',
    ':first-child':     ':fc',
    ':first-of-type':   ':fot',
    ':fullscreen':      ':fs',
    ':focus':           ':f',
    ':hover':           ':h',
    ':indeterminate':   ':ind',
    ':in-range':        ':ir',
    ':invalid':         ':inv',
    ':last-child':      ':lc',
    ':last-of-type':    ':lot',
    ':left':            ':l',
    ':link':            ':li',
    ':only-child':      ':oc',
    ':only-of-type':    ':oot',
    ':optional':        ':o',
    ':out-of-range':    ':oor',
    ':read-only':       ':ro',
    ':read-write':      ':rw',
    ':required':        ':req',
    ':right':           ':r',
    ':root':            ':rt',
    ':scope':           ':s',
    ':target':          ':t',
    ':valid':           ':va',
    ':visited':         ':vi'
};
var PSEUDOS_INVERTED = _.invert(PSEUDOS);
var PSEUDO_REGEX = [];
for (var pseudo in PSEUDOS) {
    PSEUDO_REGEX.push(pseudo);
    PSEUDO_REGEX.push(PSEUDOS[pseudo]);
}
PSEUDO_REGEX = '(?:' + PSEUDO_REGEX.join('|') + ')(?![a-z])';

// regular grammar to match valid atomic classes
var GRAMMAR = {
    'BOUNDARY'   : '(?:^|\\s|"|\'|\{)',
    'PARENT'     : '[a-zA-Z][-_a-zA-Z0-9]+?',
    'PARENT_SEP' : '[>_+]',
    // all character allowed to be in values
    'VALUES'     : '[-_,.#$/%0-9a-zA-Z]+',
    'FRACTION'   : '(?<numerator>[0-9]+)\\/(?<denominator>[1-9](?:[0-9]+)?)',
    'PARAMS'     : '\\((?<params>[^)]*)\\)',
    'NUMBER'     : '-?[0-9]+(?:\.[0-9]+)?|\\.[0-9]+',
    'UNIT'       : '[a-zA-Z%]+',
    'HEX'        : '#[0-9a-f]{3}(?:[0-9a-f]{3})?',
    'ALPHA'      : '\\.\\d{1,2}',
    'IMPORTANT'  : '!',
    // https://regex101.com/r/mM2vT9/8
    'NAMED'      : '([\\w$]+(?:(?:-(?!\\-))?\\w*)*)',
    'PSEUDO'     : PSEUDO_REGEX,
    'BREAKPOINT' : '--(?<breakPoint>[a-z]+)'
};
GRAMMAR.PARENT_SELECTOR = [
    // parent (any character that is not a space)
    '(?<parent>',
        GRAMMAR.PARENT,
    ')',
    // followed by optional pseudo class
    '(?<parentPseudo>',
        GRAMMAR.PSEUDO,
    ')?',
    // followed by either a descendant or direct symbol
    '(?<parentSep>',
        GRAMMAR.PARENT_SEP,
    ')'
].join('');

var VALUE_SYNTAXE = XRegExp([
    '(?<fraction>',
        GRAMMAR.FRACTION,
    ')',
    '|',
    '(?:',
        '(?<hex>',
            GRAMMAR.HEX,
        ')',
        '(?<alpha>',
            GRAMMAR.ALPHA,
        ')?',
        '(?!',
            GRAMMAR.UNIT,
        ')',
    ')',
    '|',
    '(?<number>',
        GRAMMAR.NUMBER,
    ')',
    '(?<unit>',
        GRAMMAR.UNIT,
    ')?',
    '|',
    '(?<named>',
        GRAMMAR.NAMED,
    ')',
].join(''));

/**
 * constructor
 */
function Atomizer(options/*:AtomizerOptions*/, rules/*:AtomizerRules*/) {
    this.verbose = options && options.verbose || false;
    this.rules = [];
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
        if (
            (rule.type === 'pattern' && this.rulesMap.hasOwnProperty(rule.matcher)) ||
            (rule.type === 'helper' && this.helpersMap.hasOwnProperty(rule.matcher))
        ) {
            throw new Error('Rule ' + rule.matcher + ' already exists.');
        }

        // push new rule to this.rules and update rulesMap
        this.rules.push(rule);

        if (rule.type === 'pattern') {
            this.rulesMap[rule.matcher] = this.rules.length - 1;
        } else {
            this.helpersMap[rule.matcher] = this.rules.length - 1;
        }
    }, this);

    // invalidates syntax
    this.syntax = null;
};

/**
 * getClassNameSyntax()
 * @private
 */
Atomizer.prototype.getSyntax = function ()/*:string*/ {
    var syntax;
    var helperRegex;
    var propRegex;
    var helpersKeys;
    var rulesKeys;
    var mainSyntax;

    if (this.syntax) {
        return this.syntax;
    } else {
        // sort matchers by descending alphabetical order
        // this is important so "B" doesn't match "Bgc"
        // e.g. Use (Bgc|B) instead of (B|Bgc)
        helpersKeys = Object.keys(this.helpersMap).sort(function (a, b) {
            return a > b ? -1 : 1;
        }).join('|');
        rulesKeys = Object.keys(this.rulesMap).sort(function (a, b) {
            return a > b ? -1 : 1;
        }).join('|');

        // helpers regex
        if (helpersKeys.length) {
            helperRegex = [
                // matcher
                '(?<helper>',
                    helpersKeys,
                ')',
                // value is optional
                '(?:\\(',
                    '(?<helperValues>',
                        GRAMMAR.VALUES,
                    ')',
                '\\))?',
            ].join('');
            mainSyntax = helperRegex;
        }
        // rules regex
        if (rulesKeys.length) {
            propRegex = [
                // matcher
                '(?<prop>',
                    rulesKeys,
                ')',
                // value is required
                '(?:\\(',
                    '(?<atomicValues>',
                        GRAMMAR.VALUES,
                    ')',
                '\\))',
            ].join('');
            mainSyntax = propRegex;
        }

        if (helpersKeys.length && rulesKeys.length) {
            mainSyntax = ['(?:', propRegex, '|', helperRegex,')'].join('');
        }

        syntax = [
            // word boundary
            GRAMMAR.BOUNDARY,
            // optional parent
            '(?<parentSelector>',
                GRAMMAR.PARENT_SELECTOR,
            ')?',
            mainSyntax,
            '(?<important>',
                GRAMMAR.IMPORTANT,
            ')?',
            // optional pseudo
            '(?<valuePseudo>',
                GRAMMAR.PSEUDO,
            ')?',
            // optional modifier
            '(?:',
                GRAMMAR.BREAKPOINT,
            ')?'
        ].join('');

        this.syntax = XRegExp(syntax, 'g');

        return this.syntax;
    }
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
        className = match[0].substr(1);

        // assign to classNamesObj as key and give it a counter
        classNamesObj[className] = classNamesObj[className] ? classNamesObj[className] + 1 : 1;
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
    var classNameSyntax = this.getSyntax();
    var parsedValues = [];
    var warnings = [];
    var isVerbose = !!this.verbose;

    if (!_.isArray(config.classNames)) { return tree; }
    options = options || {};

    config.classNames.forEach(function (className) {
        var match = XRegExp.exec(className, classNameSyntax);
        var rule;
        var ruleIndex;
        var treeo;
        var rgb;
        var values;

        if (!match) {
          return '';
        }

        ruleIndex = match.prop ? this.rulesMap[match.prop] : this.helpersMap[match.helper];

        // get the rule that this class name belongs to.
        // this is why we created the dictionary
        // as it will return the index given a matcher.
        rule = this.rules[ruleIndex];


        treeo = {
            className: match[0],
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
        if (match.atomicValues || match.helperValues) {
            values = match.atomicValues || match.helperValues;

            // values can be separated by a comma
            // parse them and return a valid value
            values = values.split(',').map(function (value, index) {
                var matchVal = XRegExp.exec(value, VALUE_SYNTAXE);
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
                        propAndValue = [match.prop, '(', matchVal.named, ')'].join('');

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
                    }
                    if (value !== null) {
                        treeo.declarations[prop] = treeo.declarations[prop].replace('$' + index, value);
                    } else {
                        treeo.declarations = null;
                    }
                });
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

    // make sense of the config
    tree = this.parseConfig(config, options);

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

                breakPoint = breakPoints && breakPoints[treeo.breakPoint]

                // this is where we start writing the selector
                selector = Atomizer.escapeSelector(treeo.className);

                // handle parent classname
                if (treeo.parentSelector) {
                    selector = [
                        Atomizer.escapeSelector(treeo.parent),
                        Atomizer.getPseudo(treeo.parentPseudo),
                        treeo.parentSep === '_' ? ' ' : [' ', treeo.parentSep, ' '].join(''),
                        '.',
                        selector
                    ].join('');
                }

                // handle pseudo in values
                if (treeo.valuePseudo) {
                    selector = [
                        selector,
                        Atomizer.getPseudo(treeo.valuePseudo)
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
 * get non abbreviated pseudo class string given abbreviated or non abbreviated form
 */
Atomizer.getPseudo = function (pseudoName/*:string*/)/*:string*/ {
    return PSEUDOS[pseudoName] ? pseudoName : PSEUDOS_INVERTED[pseudoName];
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
