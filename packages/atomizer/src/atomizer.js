/*
 * Copyright (c) 2015, Yahoo Inc. All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

'use strict';

const _ = require('lodash');
const utils = require('./lib/utils');
const JSS = require('./lib/jss');
const Grammar = require('./lib/grammar');
const XRegExp = require('xregexp');

const RULES = require('./rules.js').concat(require('./helpers.js'));

const GLOBAL_VALUES = {
    inh: 'inherit',
    ini: 'initial',
    rv: 'revert',
    rvl: 'revert-layer',
    un: 'unset',
};

/**
 * @constructor
 * @param {import('atomizer').AtomizerOptions} options Atomizer options
 * @param {Array<import('atomizer').AtomizerRule>} [rules] List of custom rules
 */
function Atomizer(options, rules) {
    options = options || {};
    this.strict = options.strict || false;
    this.verbose = options.verbose || false;
    this.rules = [];
    // we have two different objects to avoid name collision
    this.rulesMap = {};
    this.helpersMap = {};

    // add rules
    this.addRules(rules || RULES);
}

/**
 * Add custom rules to Atomizer
 * @param {Array<import('atomizer').AtomizerRule>} rules List of custom rules
 * @return {void}
 * @public
 */
Atomizer.prototype.addRules = function (rules) {
    rules.forEach((rule) => {
        const ruleFound = rule.type === 'pattern' && Object.prototype.hasOwnProperty.call(this.rulesMap, rule.matcher);
        const helperFound =
            rule.type === 'helper' && Object.prototype.hasOwnProperty.call(this.helpersMap, rule.matcher);

        if (
            (ruleFound && !_.isEqual(this.rules[this.rulesMap[rule.matcher]], rule)) ||
            (helperFound && !_.isEqual(this.rules[this.helpersMap[rule.matcher]], rule))
        ) {
            throw new Error(`Rule ${rule.matcher} already exists with a different defintion.`);
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
 * Returns class name syntax
 * @param {boolean} [isSimple] Whether to return the simple syntax
 * @return {string} Class name syntax
 * @private
 */
Atomizer.prototype.getSyntax = function (isSimple) /*:string*/ {
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
 * Given a string find CSS class names
 * @param {string} src String to parse
 * @return {string[]} List of class names
 */
Atomizer.prototype.findClassNames = function (src) {
    // using object to remove dupes
    const classNamesObj = {};
    let className;
    const classNameSyntax = this.getSyntax();
    let match = classNameSyntax.exec(src);

    while (match !== null) {
        // strip boundary character
        // eslint-disable-next-line prefer-destructuring
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
 *
 * @example
 *     getConfig(['Op(1)', 'D(n):h', 'Fz(heading)'], {
 *         custom: {
 *             heading: '80px'
 *         },
 *         breakPoints: {
 *             sm: '@media(min-width:500px)',
 *             md: '@media(min-width:900px)',
 *             lg: '@media(min-width:1200px)'
 *         },
 *         classNames: ['D(b)']
 *     });
 *
 * @example
 *     getConfig(['Op(1)', 'D(n):h']);
 *
 * @param {string[]} [classNames] List of Atomizer class names
 * @param {import('atomizer').AtomizerConfig} [existingConfig] Existing Atomizer config
 * @return {import('atomizer').AtomizerConfig} Final Atomizer config
 */
Atomizer.prototype.getConfig = function (classNames, existingConfig) {
    const config = (existingConfig && _.cloneDeep(existingConfig)) || { classNames: [] };
    // merge classnames with config
    config.classNames = this.sortCSS(_.union(classNames || [], config.classNames));
    return config;
};

/**
 * Return sorted rule
 * @param {string[]} classNames List of classes to sort
 * @return {string[]} List of sorted classes
 */
Atomizer.prototype.sortCSS = function (classNames) {
    // 1. sort by alphabetical order
    classNames = classNames.sort();

    // 2. pseudo class: link > visited > focus > hover > active.
    const pseudoStyleOrder = [':li', ':vi', ':f', ':h', ':a'];
    function sortPseudoClassNames(a, b) {
        function getMatchedIndex(value) {
            return _.findIndex(pseudoStyleOrder, function findMatched(pseudoClass) {
                return _.includes(value, pseudoClass);
            });
        }
        const aMatches = Grammar.matchValue(a);
        const bMatches = Grammar.matchValue(b);
        const aIndex = getMatchedIndex(a);
        const bIndex = getMatchedIndex(b);

        // remain same default sort logic
        if (aMatches.groups.named !== bMatches.groups.named) {
            return a.localeCompare(b);
        }

        return aIndex - bIndex;
    }
    classNames = classNames.sort(sortPseudoClassNames);

    return classNames;
};

/**
 * Return a parsed tree given a config and css options
 * @param {import('atomizer').AtomizerConfig} config
 * @param {import('atomizer').CSSOptions} options
 * @return {object} Final CSS tree structure
 */
Atomizer.prototype.parseConfig = function (config, options) {
    const tree = {};
    const classNameSyntax = this.getSyntax(true);
    const warnings = [];
    const isVerbose = !!this.verbose;
    let { classNames } = config;

    if (!_.isArray(config.classNames)) {
        return tree;
    }
    options = options || {};

    if ('exclude' in config) {
        classNames = _.difference(classNames, config.exclude);
    }

    classNames.forEach(function (className) {
        const match = XRegExp.exec(className, classNameSyntax);
        let ruleIndex;
        let rgb;
        let values;

        if (!match || (!match.groups.atomicSelector && !match.groups.selector)) {
            // no match, no op
            return;
        }

        // check where this rule belongs to
        // atomicSelector is the class name before the params: e.g. className(param)
        // selector is the class name if params is not required
        // we look both in rules and in helpers where this class belongs to
        if (Object.prototype.hasOwnProperty.call(this.rulesMap, match.groups.atomicSelector)) {
            ruleIndex = this.rulesMap[match.groups.atomicSelector];
        }
        // the atomicSelector can also be a helper that requires params
        else if (Object.prototype.hasOwnProperty.call(this.helpersMap, match.groups.atomicSelector)) {
            ruleIndex = this.helpersMap[match.groups.atomicSelector];
        }
        // or it can be just a class with no params required
        // this is only possible for helper classes as param is required for
        // all atomic classes in rulesMap.
        else if (Object.prototype.hasOwnProperty.call(this.helpersMap, match.groups.selector)) {
            ruleIndex = this.helpersMap[match.groups.selector];
        } else {
            // not a valid class, no op
            return;
        }

        // get the rule that this class name belongs to.
        // this is why we created the dictionary
        // as it will return the index given a matcher.
        const rule = this.rules[ruleIndex];

        const treeo = {
            className: match[1],
            declarations: _.cloneDeep(rule.styles),
        };

        if (!tree[rule.matcher]) {
            tree[rule.matcher] = [];
        }

        if (match.groups.parentSelector) {
            treeo.parentSelector = match.groups.parentSelector;
        }
        if (match.groups.parent) {
            treeo.parent = match.groups.parent;
        }
        if (match.groups.parentPseudo) {
            treeo.parentPseudo = match.groups.parentPseudo;
        }
        if (match.groups.parentSep) {
            treeo.parentSep = match.groups.parentSep;
        }

        // given values, return their valid form
        if (match.groups.atomicValues) {
            values = match.groups.atomicValues;

            // values can be separated by a comma
            // parse them and return a valid value
            values = values.split(',').map(function (value, index) {
                const matchVal = Grammar.matchValue(value);
                if (!matchVal) {
                    // In cases like: End(-), matchVal will be null.
                    return null;
                }

                if (matchVal.groups.number) {
                    if (rule.allowParamToValue || rule.type === 'helper') {
                        value = matchVal.groups.number;
                        if (matchVal.groups.unit) {
                            value += matchVal.groups.unit;
                        }
                    } else {
                        // treat as if we matched a named value
                        matchVal.groups.named = [matchVal.groups.number, matchVal.groups.unit].join('');
                    }
                }
                if (matchVal.groups.fraction && rule.calculatePercentage !== false) {
                    // multiplying by 100 then by 10000 on purpose (instead of just multiplying by 1M),
                    // making clear the steps involved:
                    // percentage: (numerator / denominator * 100)
                    // 4 decimal places:  (Math.round(percentage * 10000) / 10000)
                    value = `${
                        Math.round((matchVal.groups.numerator / matchVal.groups.denominator) * 100 * 10000) / 10000
                    }%`;
                }
                if (matchVal.groups.hex) {
                    if (matchVal.groups.hex !== matchVal.groups.hex.toLowerCase()) {
                        console.warn(
                            `Warning: Only lowercase hex digits are accepted. No rules will be generated for \`${matchVal.groups.hex}\``
                        );
                        value = null;
                    } else if (matchVal.groups.alpha) {
                        rgb = utils.hexToRgb(matchVal.groups.hex);
                        value = ['rgba(', rgb.r, ',', rgb.g, ',', rgb.b, ',', matchVal.groups.alpha, ')'].join('');
                    } else {
                        value = matchVal.groups.hex;
                    }
                }
                if (matchVal.groups.cssVariable) {
                    value = `var(${matchVal.groups.cssVariable})`;
                }
                if (matchVal.groups.named) {
                    // check if the named value matches any of the values
                    // registered in arguments.
                    if (
                        rule.arguments &&
                        index < rule.arguments.length &&
                        Object.keys(rule.arguments[index]).indexOf(matchVal.groups.named) >= 0
                    ) {
                        value = rule.arguments[index][matchVal.groups.named];
                    }
                    // now check if named value was passed in the config
                    else {
                        const propAndValue = [match.groups.atomicSelector, '(', matchVal.groups.named, ')'].join('');
                        let name;

                        if (config.custom) {
                            // as prop + value
                            if (Object.prototype.hasOwnProperty.call(config.custom, propAndValue)) {
                                name = propAndValue;
                            }
                            // as value
                            else if (Object.prototype.hasOwnProperty.call(config.custom, matchVal.groups.named)) {
                                name = matchVal.groups.named;
                            }
                        }

                        // use global values if no custom value was found
                        value = utils.getCustomValue(config, name) || GLOBAL_VALUES[matchVal.groups.named] || null;

                        if (!value) {
                            warnings.push(propAndValue);
                        }
                    }
                }
                return value;
            });
        }

        if (match.groups.valuePseudoClass) {
            treeo.valuePseudoClass = match.groups.valuePseudoClass;
        }

        if (match.groups.valuePseudoElement) {
            treeo.valuePseudoElement = match.groups.valuePseudoElement;
        }

        if (match.groups.breakPoint) {
            treeo.breakPoint = match.groups.breakPoint;
        }

        // before we assign, let's take care of the declarations
        // iterate declarations so we can replace values with their valid form
        for (const prop in treeo.declarations) {
            if (values) {
                values.forEach((value, index) => {
                    if (value !== null && treeo.declarations) {
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
                        const placeholderPattern = new RegExp(`\\$${index}`, 'g');
                        if (_.isObject(value)) {
                            Object.keys(value).forEach(function (bp) {
                                // don't continue if we can't find the breakPoint in the declaration
                                if (
                                    !Object.prototype.hasOwnProperty.call(config, 'breakPoints') ||
                                    !Object.prototype.hasOwnProperty.call(config.breakPoints, bp)
                                ) {
                                    return;
                                }
                                treeo.declarations[config.breakPoints[bp]] =
                                    treeo.declarations[config.breakPoints[bp]] || {};
                                treeo.declarations[config.breakPoints[bp]][prop] = treeo.declarations[prop].replace(
                                    placeholderPattern,
                                    value[bp]
                                );
                            });
                            // handle default value in the custom class
                            if (!Object.prototype.hasOwnProperty.call(value, 'default')) {
                                // default has not been passed, make sure we delete it
                                delete treeo.declarations[prop];
                            } else {
                                treeo.declarations[prop] = treeo.declarations[prop].replace(
                                    placeholderPattern,
                                    value.default
                                );
                            }
                        } else {
                            treeo.declarations[prop] = treeo.declarations[prop].replace(placeholderPattern, value);
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
            if (
                treeo.declarations &&
                (match.groups.important || (match.groups.parent && options.namespace && rule.type !== 'helper'))
            ) {
                treeo.declarations[prop] += ' !important';
            }
        }

        tree[rule.matcher].push(treeo);
    }, this);

    // throw warnings
    if (isVerbose && warnings.length > 0) {
        warnings.forEach(function (className) {
            console.warn(
                [
                    `Warning: Class \`${className}\` is ambiguous, and must be manually added to your config file:`,
                    '"custom": {',
                    `    "${className}": <YOUR-CUSTOM-VALUE>`,
                    '}',
                ].join('\n')
            );
        });
    }

    return tree;
};

/**
 * Get CSS given an array of class names, a config and css options.
 *
 * @example
 *     getCss({
 *         custom: {
 *             heading: '80px'
 *         },
 *         breakPoints: {
 *             sm: '@media(min-width:500px)',
 *             md: '@media(min-width:900px)',
 *             lg: '@media(min-width:1200px)'
 *         },
 *         classNames: ['D(b)', 'Op(1)', 'D(n):h', 'Fz(heading)']
 *     }, {
 *         rtl: true
 *     });
 *
 * @param {import('atomizer').AtomizerConfig} config Atomizer config
 * @param {import('atomizer').CSSOptions} options CSS options
 * @return {string} Final atomizer CSS
 * @public
 */
Atomizer.prototype.getCss = function (config, options) {
    const jss = {};
    const isStrict = this.strict;
    const isVerbose = this.verbose;
    let content = '';
    let breakPoints;

    options = Object.assign(
        {},
        {
            // require: [],
            // morph: null,
            banner: '',
            bumpMQ: false,
            namespace: null,
            rtl: false,
        },
        options
    );

    // validate config.breakPoints
    if (config && config.breakPoints) {
        if (!_.isObject(config.breakPoints)) {
            throw new TypeError('`config.breakPoints` must be an Object');
        }
        /* istanbul ignore else  */
        if (_.size(config.breakPoints) > 0) {
            for (const bp in config.breakPoints) {
                if (!/^@media|@container/.test(config.breakPoints[bp])) {
                    throw new Error(`Breakpoint \`${bp}\` must start with \`@media\` or \`@container\`.`);
                } else {
                    // eslint-disable-next-line prefer-destructuring
                    breakPoints = config.breakPoints;
                }
            }
        }
    }

    // make sense of the config
    const tree = this.parseConfig(config, options);

    // write JSS
    // start by iterating rules (we need to follow the order that the rules were declared)
    this.rules.forEach(function (rule) {
        // check if we have a class name that matches this rule
        if (tree[rule.matcher]) {
            tree[rule.matcher].forEach(function (treeo) {
                let selector;

                // if we were not able to find the declaration then don't write anything
                if (!treeo.declarations) {
                    return;
                }

                const breakPoint = breakPoints && breakPoints[treeo.breakPoint];
                if (treeo.breakPoint && !breakPoint) {
                    const message = [
                        `Class \`${treeo.className}\` contains breakpoint \`${treeo.breakPoint}\` which does not exist and must be manually added to your config file:`,
                        '"breakPoints": {',
                        `    "${treeo.breakPoint}": <YOUR-CUSTOM-VALUE>`,
                        '}',
                    ].join('\n');
                    if (isStrict) {
                        console.error('Error:', message);
                        process.exit(1);
                    } else if (isVerbose) {
                        console.warn('Warning:', message);
                    }
                }

                // this is where we start writing the selector
                selector = Atomizer.escapeSelector(treeo.className);

                // handle parent classname
                if (treeo.parentSelector) {
                    selector = [
                        Atomizer.escapeSelector(treeo.parent),
                        Grammar.getPseudo(treeo.parentPseudo),
                        treeo.parentSep === '_' ? ' ' : [' ', treeo.parentSep, ' '].join(''),
                        '.',
                        selector,
                    ].join('');
                }

                // handle pseudo class in values
                if (treeo.valuePseudoClass) {
                    selector = [selector, Grammar.getPseudo(treeo.valuePseudoClass)].join('');
                }

                // handle pseudo element in values
                if (treeo.valuePseudoElement) {
                    selector = [selector, Grammar.getPseudo(treeo.valuePseudoElement)].join('');
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

                // Add an extra attribute selector if the option to bump media query specificity is enabled
                if (breakPoint && options.bumpMQ) {
                    selector = `${selector}[class]`;
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
    content =
        options.banner +
        JSS.jssToCss(jss, {
            breakPoints: breakPoints,
        });

    // fix the comma problem in Absurd
    content = Atomizer.replaceConstants(content, options.rtl);

    return content;
};

/**
 * Escape CSS selectors with a backslash
 * @example
 *     ".W-100%" => ".W-100\%"
 * @param {string} str String to parse
 * @return {string} String with escaped selectors
 */
Atomizer.escapeSelector = function (str) {
    if (!str && str !== 0) {
        throw new TypeError('str must be present');
    }

    if (str.constructor !== String) {
        return str;
    }

    // TODO: maybe find a better regex? (-?) is here because '-' is considered a word boundary
    // so we get it and put it back to the string.
    return str.replace(/\b(-?)([^-_a-zA-Z0-9\s]+)/g, function (str, dash, characters) {
        return (
            dash +
            characters
                .split('')
                .map(function (character) {
                    return ['\\', character].join('');
                })
                .join('')
        );
    });
};

/**
 * Replace LTR/RTL placeholders with actual left/right strings
 * @param {string} str String to parse
 * @param {boolean} [rtl] Whether to replace with RTL
 * @return {string} Replaced string
 */
Atomizer.replaceConstants = function (str /*:string*/, rtl /*:boolean*/) {
    const start = rtl ? 'right' : 'left';
    const end = rtl ? 'left' : 'right';

    if (!str || str.constructor !== String) {
        return str;
    }

    return str.replace(/__START__/g, start).replace(/__END__/g, end);
};

module.exports = Atomizer;
