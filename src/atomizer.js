/*
 * Copyright (c) 2015, Yahoo Inc. All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

/**
 * @TODO:
 * - don't require the entire lodash lib, just what we're using.
 * - implement getConfig() so we can export a merged config.
 * - validate config? maybe we need it.
 * - GRAMMAR/SYNTAX needs to handle some edge cases, specifically in regards to word boundaries.
 * - check how much memory this program is using, check if we could potentially run out of memory
 *   because of the lengthy regex.
 * - replace Absurd() with something simpler, it does too much and it's slow.
 */

'use strict';

var _ = require('lodash');
var objectAssign = require('object-assign');
var Absurd = require('absurd');
var XRegExp = require('xregexp').XRegExp;

var RULES = require('./rules.js');
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
var PROPS_REGEX = '(?:' + RULES.map(function (rule) {return rule.prefix.substr(1);}).join('|') + ')';
var PSEUDO_REGEX = [];
for (var pseudo in PSEUDOS) {
    PSEUDO_REGEX.push(pseudo);
    PSEUDO_REGEX.push(PSEUDOS[pseudo]);
}
PSEUDO_REGEX = '(?:' + PSEUDO_REGEX.join('|') + ')';

// regular grammar to match valid atomic classes
var GRAMMAR = {
    'BOUNDARY'   : '(?:^|\\s|"|\'|\{)',
    'PARENT'     : '[^\\s:>_]+',
    'PARENT_SEP' : '[>_]',
    'PROP'       : PROPS_REGEX,
    'FRACTION'   : '(?<numerator>[0-9]+)\\/(?<denominator>[1-9](?:[0-9]+)?)',
    'SIGN'       : 'neg',
    'NUMBER'     : '[0-9]+(?:\\.[0-9]+)?',
    'UNIT'       : '[a-zA-Z%]+',
    'HEX'        : '[0-9a-f]{3}(?:[0-9a-f]{3})?',
    'IMPORTANT'  : '!',
    // how do we deal with word boundary here?
    'NAMED'      : '(.+?(?=--|!|:)|.+\\b)',
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

// we combine the regular expressions here. since we're NOT doing a lexical
// analysis of the entire document we need to use regular grammar here.
var SYNTAX_REGEX = XRegExp.cache([
    // word boundary
    GRAMMAR.BOUNDARY,
    // optional parent
    '(?<parentSelector>',
        GRAMMAR.PARENT_SELECTOR,
    ')?',
    // required property
    '(?<prop>',
        GRAMMAR.PROP,
    ')',
    // required value
    '(?<value>',
        '(?<fraction>',
            GRAMMAR.FRACTION,
        ')',
        '|',
        '(?<sign>',
            GRAMMAR.SIGN,
        ')?',
        '(?<number>',
            GRAMMAR.NUMBER,
        ')',
        '(?<unit>',
            GRAMMAR.UNIT,
        ')?',
        '|',
        '(?<hex>',
            GRAMMAR.HEX,
        ')',
        '|',
        '(?<named>',
            GRAMMAR.NAMED,
        ')',
    ')',
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
].join(''), 'g');

// we create this so it's easier to find the rule by the prefix
var RULES_DICTIONARY = {};
RULES.forEach(function (rule, index) {
    // prefix: index
    RULES_DICTIONARY[rule.prefix.substr(1)] = index;
});

/*
// -----------------------------------
// INTERFACE
// -----------------------------------

// Atomizer Options
// options for the behavior of the atomizer class (not the CSS output)
interface AtomizerOptions {
    verbose:boolean;
}

// Atomizer Rules
// rules are expected to be in the following format
interface AtomizerRules {
    [index:number]:AtomizerRule
}
interface AtomizerRule {
    allowCustom:boolean;
    allowSuffixToValue:boolean;
    id:string;
    name:string;
    prefix:string;
    properties:string;
    type:string;
}

// AtomizerConfig
// the config that contains additional info to create atomic classes
interface AtomizerConfig {
    globals?: {[index:string]:string};
    breakPoints?: {[index:string]:string};
    classNames: string[];
}

// CssOptions
// general options that affect the CSS output
interface CssOptions {
    namespace?:string;
    rtl?:boolean;
}

// AtomicTree
// the parse tree is generated after a class is parsed.
// it's an object where its keys are mapped to AtomizerRules.ids
// and value is an array of objects containing structured data about
// the class name.
interface AtomicTree {
    [index:string]:AtomicTreeArray;
}
interface AtomicTreeArray {
    [index:number]:AtomicTreeObject;
}
interface AtomicTreeObject {
    breakPoint?:string;
    className:string;
    context?:AtomicTreeContext;
    pseudo?:string;
    value:AtomicTreeValue;
}
interface AtomicTreeContext {
    directParent:boolean;
    parent:string;
}
interface AtomicTreeValue {
    percentage?:number;
    fraction:string;
    color:string;
    value:string;
}
*/

/**
 * constructor
 */
function Atomizer(rules/*:rules*/, options/*:AtomizerOptions*/) {
    this.rules = rules || RULES;
    this.verbose = options && options.verbose || false;
}

/**
 * findClassNames
 */
Atomizer.prototype.findClassNames = function (src/*:string*/)/*:string[]*/ {
    // using object to remove dupes
    var classNamesObj = {};
    var className;
    var match = SYNTAX_REGEX.exec(src);

    while (match !== null) {
        // strip boundary character
        className = match[0].substr(1);
        // assign to classNamesObj as key and give it a counter
        classNamesObj[className] = classNamesObj[className] ? classNamesObj[className] + 1 : 1;
        // run regex again
        match = SYNTAX_REGEX.exec(src);
    }

    // return an array of the matched class names
    return _.keys(classNamesObj);
};

/**
 * Get CSS given an array of class names, a config and css options.
 * examples:
 *
 * getCss(['Op-1', 'D-n:h', 'Fz-heading'], {
 *     custom: {
 *         heading: '80px'
 *     },
 *     breakPoints: {
 *         'sm': '@media(min-width:500px)',
 *         'md': '@media(min-width:900px)',
 *         'lg': '@media(min-width:1200px)'
 *     },
 *     classNames: ['D-b']
 * }, {
 *     rtl: true
 * });
 *
 * getCss(['Op-1', 'D-n:h']);
 */
Atomizer.prototype.getCss = function (classNames/*:string[]*/, config/*:AtomizerConfig*/, options/*:CSSOptions*/)/*:string*/ {
    var matches;
    var tree/*:AtomicTree*/ = {};
    var csso = {};
    var absurd = Absurd();
    var content = '';
    var warnings = [];
    var isVerbose = !!this.verbose;
    var breakPoints;

    options = objectAssign({}, {
        require: [],
        morph: null,
        banner: '',
        namespace: null,
        rtl: false
    }, options);

    classNames = classNames || [];

    // merge classnames with config
    if (config && config.classNames) {
        classNames = _.union(classNames, config.classNames);
    }

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

    // each match is a valid class name
    classNames.forEach(function (className) {
        var match = XRegExp.exec(className, SYNTAX_REGEX);
        var namedFound = false;
        var rule;
        var treeo;

        if (!match) {
          return '';
        }

        // get the rule that this class name belongs to.
        // this is why we created the dictionary
        // as it will return the index given an prefix.
        rule = RULES[RULES_DICTIONARY[match.prop]];
        treeo = {
            className: match[0]
        };

        if (!tree[rule.id]) {
            tree[rule.id] = [];
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
        if (match.prop) {
            treeo.prop = match.prop;
        }
        if (match.value) {
            treeo.value = match.value;
        }
        if (match.fraction) {
            // multiplying by 100 then by 10000 on purpose (instead of just multiplying by 1M),
            // making clear the steps involved:
            // percentage: (numerator / denominator * 100)
            // 4 decimal places:  (Math.round(percentage * 10000) / 10000)
            treeo.value = Math.round(match.numerator / match.denominator * 100 * 10000) / 10000 + '%';
        }
        if (match.sign) {
            treeo.sign = match.sign;
        }
        if (match.number) {
            treeo.number = match.number;
        }
        if (match.unit) {
            treeo.unit = match.unit;
        }
        if (match.hex) {
            treeo.hex = match.hex;
        }
        if (match.named) {
            treeo.named = match.named;

            // check if the named suffix matches any of
            // the suffixes registered in rules.
            if (rule.rules) {
                // iterate rules
                rule.rules.some(function (keywordRule, index) {
                    // if we find it, then add declaration
                    if (keywordRule.suffix === match.named) {
                        // build declaration (iterate prop the value)
                        rule.properties.forEach(function (property) {
                            keywordRule.values.forEach(function (value) {
                                if (!treeo.declaration) {
                                    treeo.declaration = {};
                                }
                                treeo.declaration[property] = value;
                            });
                        });
                        namedFound = true;
                        return true;
                    }
                });
            }
            // check if named suffix was passed in the config
            if (!namedFound && config && _.isObject(config.custom) && config.custom.hasOwnProperty(match.named)) {
                treeo.value = config.custom[match.named];
            } else {
                if (isVerbose) {
                    warnings.push([
                    'Warning: Class `' + className + '` is ambiguous, and must be manually added to your config file:',
                    '"custom": {',
                    '    "' + match.named + '": <YOUR-CUSTOM-VALUE>',
                    '}'
                    ].join("\n"));
                }
                treeo.value = null;
            }
        }
        if (match.valuePseudo) {
            treeo.valuePseudo = match.valuePseudo;
        }

        if (match.breakPoint) {
            treeo.breakPoint = match.breakPoint;
        }
        if (match.important) {
            treeo.value = treeo.value + ' !important';
        }

        tree[rule.id].push(treeo);
    });

    // throw warnings
    if (isVerbose && warnings.length > 0) {
        warnings.forEach(function (warning) {
            console.warn(warning);
        });
    }

    // write CSSO
    // start by iterating rules (we need to follow the order that the rules were declared)
    RULES.forEach(function (rule) {
        var className;
        var treeCurrent;

        // check if we have a class name that matches this rule
        if (tree[rule.id]) {
            tree[rule.id].forEach(function(treeo) {
                var breakPoint = breakPoints && breakPoints[treeo.breakPoint];

                // this is where we start writing the class name, properties and values
                className = Atomizer.escapeSelector(treeo.className);

                // handle parent classname
                if (treeo.parentSelector) {
                    className = [
                        Atomizer.escapeSelector(treeo.parent),
                        Atomizer.getPseudo(treeo.parentPseudo),
                        treeo.parentSep !== '>' ? ' ' : treeo.parentSep,
                        '.',
                        className
                    ].join('');
                }

                // handle pseudo in values
                if (treeo.valuePseudo) {
                    className = [
                        className,
                        Atomizer.getPseudo(treeo.valuePseudo)
                    ].join('');
                }

                // add the dot for the class
                className = ['.', className].join('');

                // finaly, create the object
                csso[className] = {};
                if (breakPoint) {
                    csso[className][breakPoint] = {};
                }

                if (treeo.declaration) {
                    if (breakPoint) {
                        csso[className][breakPoint] = treeo.declaration;
                    } else {
                        csso[className] = treeo.declaration;
                    }
                } else {
                    rule.properties.forEach(function (property) {
                        if (breakPoint) {
                            csso[className][breakPoint][property] = treeo.value;
                        } else {
                            csso[className][property] = treeo.value;
                        }
                    });
                }
            });
        }
    });

    // Pass some options through to Absurd
    api.morph(options.morph);

    if (options.require.length > 0) {
        api.import(options.require);
    }

    if (options.namespace) {
        var cssoNew = {};
        cssoNew[options.namespace] = csso;
        csso = cssoNew;
    }

    // send CSSO to absurd
    absurd.add(csso);
    absurd.compile(function(err, result) {
        /* istanbul ignore if else */
        if (err) {
            throw new Error('Failed to compile atomic css:' + err);
        }
        content = options.banner + result;
    }, options);

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

module.exports = Atomizer;
