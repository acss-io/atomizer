# Atomic.css

[![Build Status](https://magnum.travis-ci.com/yahoo/atomic.css.svg?token=1A1JtrzoyNwcyaqtpSCa)](https://magnum.travis-ci.com/yahoo/atomic.css)
[![Dependency Status](https://david-dm.org/yahoo/atomic.css.svg)](https://david-dm.org/yahoo/atomic.css.svg)
[![devDependency Status](https://david-dm.org/yahoo/atomic.css/dev-status.svg)](https://david-dm.org/yahoo/atomic.css#info=devDependencies)
[![Coverage Status](https://img.shields.io/coveralls/yahoo/atomic.css.svg)](https://coveralls.io/r/yahoo/atomic.css?branch=master)

A collection of single purpose styling units for maximum reuse.

## Overview

http://www.smashingmagazine.com/2013/10/21/challenging-css-best-practices-atomic-approach/

## Presentation

https://www.youtube.com/watch?v=ojj_-6Xiud4

## Usage

**TODO: Create grunt task to use atomic.css**

## Quick CSS glossary:

```
↓‾‾‾‾‾‾‾‾‾‾‾rule‾‾‾‾‾‾‾‾‾‾‾↓
selector { property: value }
         ↑__ declaration __↑
```

## Atomic.css generation:

The generation process involves 2 main parts:

   1. [Config object](#1-config-object)
   2. [Atomic objects](#2-atomic-objects)

### 1. Config Object

This is the object that tells what it wants from the atomic.css (the atomic rules) and it is used to to generate a custom build of atomic.css. This is the object that must be modified by different consumers based on their needs.

**TODO: Complete this section with the specification of how to create this JSON file**

```js
{
    'config': {
        // will be added before all classes
        'namespace': '#atomic',

        // useful to replace left/right values for LTR and RTL contexts
        'start': 'left',
        'end': 'right',
        'defaults': {
            'font-size': '16px',
            'border-color': '#555',
            'bleed-value': '-10px'
        },
        // media queries will be created based on these break points
        // min-width values must be declared for 'sm', 'md' and 'lg'.
        // classes will be created inside of these media queries if declared
        // see examples below.
        'breakPoints': {
            'sm': '767px',
            'md': '992px',
            'lg': '1200px'
        }
    },

    // pick by id (type: rule)
    'bfc': true,

    // pick by id with breakpoints (type: rule)
    'dn': {
        breakPoints: ['sm', 'md', 'lg']
    },

    // simple pick by suffix (type: pattern)
    'font-weight': {
        // if we want this rule to also be in media queries
        'n': {
          breakPoints: ['sm', 'md', 'lg']
        },
        'b': true,
        'br': true,
        'lr': true,
        'lh': true,
        'inh': true,
        '100': true,
        '200': true,
        '300': true,
        '400': true,
        '500': true,
        '600': true,
        '700': true,
        '800': true,
        '900': true
    },

    // pick by suffix and declare custom rules (type: pattern)
    'padding-x': {
        'a': true,
        'custom': [
            {suffix: '10', values: ['10px']},
            {suffix: '20', values: ['20px']},
            // if we want this rule to also be inside of media queries
            {suffix: '30', values: ['30px'], breakPoints: ['sm', 'md', 'lg']}
        ]
    },

    // pick by suffix and declare custom sequenced suffixes
    // (alphabetical order)
    'box-shadow': {
        'n': true,
        'custom-sequenced-suffix': [
            // a
            {values: ['1px 1px 4px #555']},
            // b
            {values: ['0 0 5px #333']},
            // c (if we want this rule to also be inside of media queries)
            {values: ['0 0 5px #333'], breakPoints: ['sm', 'md', 'lg']}
        ]
    },

    // pick by suffix and declare fraction rules (type: pattern)
    'width': {
        a: true,
        inh: true,
        fraction: {
            denominator: 12,
            // if we want fraction rules to also be inside of media queries
            breakPoints: ['sm', 'md', 'lg']
        }
    }
};
```

The config above would generate the following CSS file:

```css
/*!
Atomic.css v0.1.0
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
https://github.com/yahoo/atomic.css/blob/master/LICENSE.md
*/
#atomic .Fw-n {
  font-weight: normal;
}
#atomic .Fw-b {
  font-weight: bold;
}
#atomic .Fw-br {
  font-weight: bolder;
}
#atomic .Fw-lr {
  font-weight: lighter;
}
#atomic .Fw-100 {
  font-weight: 100;
}
#atomic .Fw-200 {
  font-weight: 200;
}
#atomic .Fw-300 {
  font-weight: 300;
}
#atomic .Fw-400 {
  font-weight: 400;
}
#atomic .Fw-500 {
  font-weight: 500;
}
#atomic .Fw-600 {
  font-weight: 600;
}
#atomic .Fw-700 {
  font-weight: 700;
}
#atomic .Fw-800 {
  font-weight: 800;
}
#atomic .Fw-900 {
  font-weight: 900;
}
#atomic .Bxsh-n {
  box-shadow: none;
}
#atomic .Bxsh--a {
  box-shadow: 1px 1px 4px #555;
}
#atomic .Bxsh--b, #atomic .Bxsh--c {
  box-shadow: 0 0 5px #333;
}
#atomic .Px-10 {
  padding-left: 10px;
  padding-right: 10px;
}
#atomic .Px-20 {
  padding-left: 20px;
  padding-right: 20px;
}
#atomic .Px-30 {
  padding-left: 30px;
  padding-right: 30px;
}
#atomic .W-1\/12 {
  width: 8.3333%;
}
#atomic .W-2\/12 {
  width: 16.6667%;
}
#atomic .W-3\/12 {
  width: 25%;
}
#atomic .W-4\/12 {
  width: 33.3333%;
}
#atomic .W-5\/12 {
  width: 41.6667%;
}
#atomic .W-6\/12 {
  width: 50%;
}
#atomic .W-7\/12 {
  width: 58.3333%;
}
#atomic .W-8\/12 {
  width: 66.6667%;
}
#atomic .W-9\/12 {
  width: 75%;
}
#atomic .W-10\/12 {
  width: 83.3333%;
}
#atomic .W-11\/12 {
  width: 91.6667%;
}
#atomic .W-12\/12 {
  width: 100%;
}
#atomic .Bfc {
  overflow: hidden;
  *zoom: 1;
}
#atomic .Dn {
  display: none;
}
@media(min-width:767px) {
  #atomic .Fw-n--sm {
    font-weight: normal;
  }
  #atomic .Bxsh--c--sm {
    box-shadow: 0 0 5px #333;
  }
  #atomic .Px-30--sm {
    padding-left: 30px;
    padding-right: 30px;
  }
  #atomic .W-1\/12--sm {
    width: 8.3333%;
  }
  #atomic .W-2\/12--sm {
    width: 16.6667%;
  }
  #atomic .W-3\/12--sm {
    width: 25%;
  }
  #atomic .W-4\/12--sm {
    width: 33.3333%;
  }
  #atomic .W-5\/12--sm {
    width: 41.6667%;
  }
  #atomic .W-6\/12--sm {
    width: 50%;
  }
  #atomic .W-7\/12--sm {
    width: 58.3333%;
  }
  #atomic .W-8\/12--sm {
    width: 66.6667%;
  }
  #atomic .W-9\/12--sm {
    width: 75%;
  }
  #atomic .W-10\/12--sm {
    width: 83.3333%;
  }
  #atomic .W-11\/12--sm {
    width: 91.6667%;
  }
  #atomic .W-12\/12--sm {
    width: 100%;
  }
  #atomic .Dn--sm {
    display: none;
  }
}
@media(min-width:992px) {
  #atomic .Fw-n--md {
    font-weight: normal;
  }
  #atomic .Bxsh--c--md {
    box-shadow: 0 0 5px #333;
  }
  #atomic .Px-30--md {
    padding-left: 30px;
    padding-right: 30px;
  }
  #atomic .W-1\/12--md {
    width: 8.3333%;
  }
  #atomic .W-2\/12--md {
    width: 16.6667%;
  }
  #atomic .W-3\/12--md {
    width: 25%;
  }
  #atomic .W-4\/12--md {
    width: 33.3333%;
  }
  #atomic .W-5\/12--md {
    width: 41.6667%;
  }
  #atomic .W-6\/12--md {
    width: 50%;
  }
  #atomic .W-7\/12--md {
    width: 58.3333%;
  }
  #atomic .W-8\/12--md {
    width: 66.6667%;
  }
  #atomic .W-9\/12--md {
    width: 75%;
  }
  #atomic .W-10\/12--md {
    width: 83.3333%;
  }
  #atomic .W-11\/12--md {
    width: 91.6667%;
  }
  #atomic .W-12\/12--md {
    width: 100%;
  }
  #atomic .Dn--md {
    display: none;
  }
}
@media(min-width:1200px) {
  #atomic .Fw-n--lg {
    font-weight: normal;
  }
  #atomic .Bxsh--c--lg {
    box-shadow: 0 0 5px #333;
  }
  #atomic .Px-30--lg {
    padding-left: 30px;
    padding-right: 30px;
  }
  #atomic .W-1\/12--lg {
    width: 8.3333%;
  }
  #atomic .W-2\/12--lg {
    width: 16.6667%;
  }
  #atomic .W-3\/12--lg {
    width: 25%;
  }
  #atomic .W-4\/12--lg {
    width: 33.3333%;
  }
  #atomic .W-5\/12--lg {
    width: 41.6667%;
  }
  #atomic .W-6\/12--lg {
    width: 50%;
  }
  #atomic .W-7\/12--lg {
    width: 58.3333%;
  }
  #atomic .W-8\/12--lg {
    width: 66.6667%;
  }
  #atomic .W-9\/12--lg {
    width: 75%;
  }
  #atomic .W-10\/12--lg {
    width: 83.3333%;
  }
  #atomic .W-11\/12--lg {
    width: 91.6667%;
  }
  #atomic .W-12\/12--lg {
    width: 100%;
  }
  #atomic .Dn--lg {
    display: none;
  }
}
```

---

### 2. Atomic objects

An array of atomic objects describing atomic.css. It is the reference to the config object.

Atomic objects should only be written by atomic.css developers and not developers that consume it. Consumers should only pick which rules they want from this list in the [config object](#1-config-object).

Atomic objects can follow 2 types of format:

#### 2.1. Pattern format

Used to generate CSS rules that share the same syntax, declaring the same properties but with different values.

Syntax of a pattern:

```css
.prefix-suffix--sequencedsuffix {
  property: value;
  property: value;
}
```

This object must contain the following keys:

| key | type | required | description |
| -----:| ------ | ---------- | -------------- |
| `type` | {String} | Yes | For pattern objects 'pattern' must be declared here. |
| `id` | {String} | Yes | A unique identifier for this pattern. Used by the config. |
| `name` | {String} | Yes | The name of the pattern. Used by config tools as a short description of the pattern. |
| `prefix` | {String} | Yes | The prefix to be prepended in the class name of each class. |
| `allowFraction` | {Boolean} | No | Wether or not this pattern allows fraction objects to be declared in the config. These objects must contain a `denominator` key and it will be used to generate rules with fraction values and suffixes. |
| `allowCustom` | {Boolean} | No | Wether or not this pattern allows custom values from config. |
| `allowCustomSequencedSuffix` | {Boolean} | No | Wether or not this pattern allows custom sequenced suffixes (alphabetical suffixes) from config. See example's comments below. |
| `properties` | {Array} | Yes | An array of CSS properties that will be inside each rule. This array could also contain objects instead of strings for multi-purpose patterns. Each object should contain they keys `suffix` (string) and `properties` (array of css properties). See examples below. |
| `rules` | {Array} | Yes | An array of objects where each should have the keys below |

| key | type | description |
| -----:| ------ | -------------- |
| `suffix` | {String} | The suffix that will be appended to the prefix. |
| `values` | {Array} | An array of values. The index of each value corresponds to the index of each property declared in `properties`. If `properties` is an array of objects, these values will match each array item in `properties.properties` array. |

Examples:

```js
// normal pattern
{
    type: 'pattern',
    id: 'font-weight',
    name: 'Font weight',
    prefix: '.Fw-',
    properties: ['font-weight']
    rules: [
        {suffix: 'n', values: ['normal']},
        {suffix: 'b', values: ['bold']},
        {suffix: 'br', values: ['bolder']},
        {suffix: 'lr', values: ['lighter']}
    ]
},
// a pattern allowing custom rules with arbitrary suffixes
{
    type: 'pattern',
    id: 'padding-x',
    name: 'Padding X',
    prefix: '.Px-',
    allowCustom: true,
    properties: ['padding-left', 'padding-right'],
    rules: [
        {suffix: 'a', values: ['auto', 'auto']}
    ]
},
// a pattern allowing custom rules with arbitrary suffixes and fraction values
{
    type: 'pattern',
    id: 'width',
    name: 'Width',
    prefix: '.W-',
    allowFraction: true,
    allowCustom: true,
    properties: ['width'],
    rules: [
        {suffix: 'a', values: ['auto']},
        {suffix: 'inh', values: ['inherited']}
    ]
},
/**
 * The patterns below allow custom sequenced suffixes rules.
 * Meaning it generates alphabetical suffixes based on custom values defined
 * in the config.
 * 
 * These patterns can produce two different types of pattern rules:
 * 
 * 1. Single-purpose rules:
 * Generates rules based on a single pattern.
 * 
 * Example:
 * .Bgc--a {
 *   background-color: #000;
 * }
 * .Bgc--b {
 *   background-color: #fff;
 * }
 * ...
 * 
 * 2. Multi-purpose rules:
 * Generates rules based on multiple patterns.
 *
 * Example:
 * .Bd-t--a {
 *   border-top: 1px solid #000;
 * }
 * .Bd-b--a {
 *   border-bottom: 2px solid #fff;
 * }
 * .Bd-y--a {
 *   border-top: 1px solid #000;
 *   border-bottom: 2px solid #fff;
 * }
 */

// single-purpose rules
{
    type: 'pattern',
    id: 'background-color',
    name: 'Background color',
    prefix: '.Bgc-',
    properties: ['background-color'],
    allowCustomSequencedSuffix: true,
    format: [
        utils.isColor
    ]
},

// multi-purpose rules
{
    type: 'pattern',
    id: 'border-custom',
    name: 'Border',
    prefix: '.Bd-',
    format: [
        utils.isLength,
        utils.indexOf(['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset']),
        utils.isColor
    ],
    allowCustomSequencedSuffix: true,
    properties: [
        {suffix: 'x', properties: ['border-left', 'border-right']},
        {suffix: 'y', properties: ['border-top', 'border-bottom']},
        {suffix: 't', properties: ['border-top']},
        {suffix: 'b', properties: ['border-bottom']},
        {suffix: 'end', properties: ['border-$END']},
        {suffix: 'start', properties: ['border-$START']}
    ]
}
```

#### 2.2. Rule format

Used to generate unique classes that can contain one or more declarations.
                           
This object must contain the following keys:

| key | type | required | description |
| ---:| ---- | -------- | ----------- |
| `type` | {String} | Yes | For rule objects 'rule' must be declared here. |
| `id` | {String} | Yes| A unique identifier for this rule. Used by the config. |
| `name` | {String} | Yes | The name of the pattern. Used by config tools as a short description of the pattern. |
| `rule` | {Object} | Yes | An object following absurjs' rule format. |

Example:

```js
{
    type: 'rule',
    id: 'bfc',
    name: 'Block formatting context'
    rule: {
        '.Bfc': {
            'overflow': 'hidden',
            '*zoom': 1
        }
    }
}
```

## License

This software is free to use under the Yahoo! Inc. BSD license.
See the [LICENSE file][] for license text and copyright information.

[LICENSE file]: https://github.com/yahoo/atomic.css/blob/master/LICENSE.md

Third-pary open source code used are listed in our [package.json file]( https://github.com/yahoo/atomic.css/blob/master/package.json).
