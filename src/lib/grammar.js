'use strict';

var _ = require('lodash');
var XRegExp = require('xregexp').XRegExp;

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

function Grammar(rulesMap, helpersMap) {
    this.rulesMap = rulesMap;
    this.helpersMap = helpersMap;
}

/**
 * sort matchers by descending alphabetical order
 * this is important so "B" doesn't match "Bgc"
 * e.g. Use (Bgc|B) instead of (B|Bgc)
 */
function getSortedKeys(map) {
    return Object.keys(map).sort(function (a, b) {
        return a > b ? -1 : 1;
    }).join('|');
}

function getRegex(map, keyEx, valEx) {
    var keys = getSortedKeys(map);

    return keys.length && [
        // matcher
        '(?<' + keyEx + '>',
            keys,
        ')',
        // value is optional
        '(?:\\(',
            '(?<' + valEx + '>',
                GRAMMAR.VALUES,
            ')',
        '\\))?',
    ].join('');
}

Grammar.getPseudo = function getPseudo(pseudoName/*:string*/)/*:string*/ {
    return PSEUDOS[pseudoName] ? pseudoName : PSEUDOS_INVERTED[pseudoName];
};

Grammar.matchValue = function matchValue(value) {
    return XRegExp.exec(value, VALUE_SYNTAXE);
};

Grammar.prototype.getSyntax = function getSyntax()/*:string*/ {
    var helpersRegex = getRegex(this.helpersMap, 'helper', 'helperValues');
    var rulesRegex = getRegex(this.rulesMap, 'prop', 'atomicValues');

    var mainSyntax = (helpersRegex && rulesRegex) ?
        ['(?:', rulesRegex, '|', helpersRegex,')'].join(''):
        helpersRegex || rulesRegex;

    var syntax = [
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

    return XRegExp(syntax, 'g');
};

module.exports = Grammar;
