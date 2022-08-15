/* eslint-disable no-useless-escape */
'use strict';

const _ = require('lodash');
const XRegExp = require('xregexp');

const PSEUDO_CLASSES = {
    ':active': ':a',
    ':checked': ':c',
    ':default': ':d',
    ':disabled': ':di',
    ':empty': ':e',
    ':enabled': ':en',
    ':first': ':fi',
    ':first-child': ':fc',
    ':first-of-type': ':fot',
    ':fullscreen': ':fs',
    ':focus': ':f',
    ':focus-within': ':fw',
    ':focus-visible': ':fv',
    ':hover': ':h',
    ':indeterminate': ':ind',
    ':in-range': ':ir',
    ':invalid': ':inv',
    ':last-child': ':lc',
    ':last-of-type': ':lot',
    ':left': ':l',
    ':link': ':li',
    ':only-child': ':oc',
    ':only-of-type': ':oot',
    ':optional': ':o',
    ':out-of-range': ':oor',
    ':placeholder-shown': ':ps',
    ':read-only': ':ro',
    ':read-write': ':rw',
    ':required': ':req',
    ':right': ':r',
    ':root': ':rt',
    ':scope': ':s',
    ':target': ':t',
    ':valid': ':va',
    ':visited': ':vi',
};

const PSEUDO_ELEMENTS = {
    '::after': '::a',
    '::before': '::b',
    '::backdrop': '::bd',
    '::cue': '::c',
    '::file-selector-button': '::fsb',
    '::first-letter': '::fl',
    '::first-line': '::fli',
    '::marker': '::m',
    '::placeholder': '::ph',
    '::selection': '::s',
};

const PSEUDOS = Object.assign({}, PSEUDO_CLASSES, PSEUDO_ELEMENTS);
const PSEUDOS_INVERTED = _.invert(PSEUDOS);

function flatten(obj) {
    const flat = [];
    for (const key in obj) {
        flat.push(key);
        flat.push(obj[key]);
    }
    return flat;
}

// regular grammar to match valid atomic classes
const GRAMMAR = {
    BOUNDARY: '(?:^|\\s|class=|"|\'|`|{|})',
    PARENT: '[a-zA-Z][-_a-zA-Z0-9]+?',
    PARENT_SEP: '[>_+~]',
    // all characters allowed to be a prop
    PROP: '[-A-Za-z0-9]+',
    // all character allowed to be in values
    VALUES: '[-_,.#$/%0-9a-zA-Z]+',
    FRACTION: '(?<numerator>[0-9]+)\\/(?<denominator>[1-9](?:[0-9]+)?)',
    PARAMS: '\\((?<params>[^)]*)\\)',
    NUMBER: '-?[0-9]+(?:.[0-9]+)?|\\.[0-9]+',
    UNIT: '[a-zA-Z%]+',
    HEX: '#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?',
    ALPHA: '\\.\\d{1,2}',
    IMPORTANT: '!',
    // https://regex101.com/r/mM2vT9/8
    NAMED: '([\\w$]+(?:(?:-(?!\\-))?\\w*)*)',
    CSS_VARIABLE: '(--[\\w-]+)',
    BREAKPOINT: '--(?<breakPoint>[a-zA-Z0-9]+)',
    PSEUDO_CLASS: `(?:${flatten(PSEUDO_CLASSES).join('|')})(?![a-z])`,
    PSEUDO_ELEMENT: `(?:${flatten(PSEUDO_ELEMENTS).join('|')})(?![a-z])`,
    PSEUDO_CLASS_SIMPLE: ':[a-z]+',
    PSEUDO_ELEMENT_SIMPLE: '::[a-z]+',
};

GRAMMAR.PARENT_SELECTOR = [
    // parent (any character that is not a space)
    '(?<parent>',
    GRAMMAR.PARENT,
    ')',
    // followed by optional pseudo class
    '(?<parentPseudo>',
    GRAMMAR.PSEUDO_CLASS,
    ')?',
    // followed by either a descendant or direct symbol
    '(?<parentSep>',
    GRAMMAR.PARENT_SEP,
    ')',
].join('');

GRAMMAR.PARENT_SELECTOR_SIMPLE = [
    // parent (any character that is not a space)
    '(?<parent>',
    GRAMMAR.PARENT,
    ')',
    // followed by optional pseudo class
    '(?<parentPseudo>',
    GRAMMAR.PSEUDO_CLASS_SIMPLE,
    ')?',
    // followed by either a descendant or direct symbol
    '(?<parentSep>',
    GRAMMAR.PARENT_SEP,
    ')',
].join('');

const VALUE_SYNTAXE = XRegExp(
    [
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
        '(?<cssVariable>',
        GRAMMAR.CSS_VARIABLE,
        ')',
        '|',
        '(?<named>',
        GRAMMAR.NAMED,
        ')',
    ].join('')
);

/**
 * sort matchers by descending alphabetical order
 * this is important so "B" doesn't match "Bgc"
 * e.g. Use (Bgc|B) instead of (B|Bgc)
 */
function getSortedKeys(arr) {
    return arr.length > 1
        ? arr
              .sort(function (a, b) {
                  return a > b ? -1 : 1;
              })
              .join('|')
        : arr.toString();
}

function buildRegex(matchersParams, matchersNoParams) {
    matchersParams = matchersParams
        ? `(?<atomicSelector>${matchersParams})\\((?<atomicValues>${GRAMMAR.VALUES})\\)`
        : '';
    matchersNoParams = matchersNoParams ? `(?<selector>${matchersNoParams})` : '';
    return `(?:${[matchersParams, matchersNoParams].join('|')})`;
}

function Grammar(rules) {
    const matchersParams = [];
    const matchersNoParams = [];

    rules.forEach(function (rule) {
        if (rule.noParams) {
            matchersNoParams.push(rule.matcher);
        } else {
            matchersParams.push(rule.matcher);
        }
    });

    const matchersParamsStr = getSortedKeys(matchersParams);
    const matchersNoParamsStr = getSortedKeys(matchersNoParams);

    this.simpleSyntax = buildRegex(GRAMMAR.PROP, matchersNoParamsStr);
    this.complexSyntax = buildRegex(matchersParamsStr, matchersNoParamsStr);
}

/**
 * get non abbreviated pseudo class string given abbreviated or non abbreviated form
 */
Grammar.getPseudo = function getPseudo(pseudoName) /*:string*/ {
    return PSEUDOS[pseudoName] ? pseudoName : PSEUDOS_INVERTED[pseudoName];
};

Grammar.matchValue = function matchValue(value) {
    return XRegExp.exec(value, VALUE_SYNTAXE);
};

Grammar.prototype.getSyntax = function getSyntax(isSimple) /*:string*/ {
    const syntax = [
        // word boundary
        GRAMMAR.BOUNDARY,
        '(',
        // optional parent
        '(?<parentSelector>',
        isSimple ? GRAMMAR.PARENT_SELECTOR_SIMPLE : GRAMMAR.PARENT_SELECTOR,
        ')?',
        // the main syntax
        isSimple ? this.simpleSyntax : this.complexSyntax,
        '(?<important>',
        GRAMMAR.IMPORTANT,
        ')?',
        // optional pseudos
        '(?<valuePseudoClass>',
        isSimple ? GRAMMAR.PSEUDO_CLASS_SIMPLE : GRAMMAR.PSEUDO_CLASS,
        ')?',
        '(?<valuePseudoElement>',
        isSimple ? GRAMMAR.PSEUDO_ELEMENT_SIMPLE : GRAMMAR.PSEUDO_ELEMENT,
        ')?',
        // optional modifier
        '(?:',
        GRAMMAR.BREAKPOINT,
        ')?',
        ')',
    ].join('');

    return XRegExp(syntax, 'g');
};

module.exports = Grammar;
