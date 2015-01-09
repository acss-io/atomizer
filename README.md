```
  .--.  .---.  .----. .-.   .-..-. .---.  .---.  .----. .----.
 / {} \{_   _}/  {}  \|  `.'  || |/  ___}/  ___}{ {__  { {__  
/  /\  \ | |  \      /| |\ /| || |\     }\     }.-._} }.-._} }
`-'  `-' `-'   `----' `-' ` `-'`-' `---'  `---' `----' `----' 
```
==============================================================

A collection of single purpose styling units for maximum reuse.

## Overview

http://www.smashingmagazine.com/2013/10/21/challenging-css-best-practices-atomic-approach/

## Presentation

https://www.youtube.com/watch?v=ojj_-6Xiud4

## Usage

**TODO: Create grunt task to use atomic.css**

## Atomic.css generation:

The generation process involves 2 main parts:

   1. Atomic objects
   2. Config object

### 1. Atomic objects

An array of atomic objects describing atomic.css. It is the reference to the config object that tells which rules it wants from this list.

The atomic objects can follow 3 types of format:

#### 1.1. Pattern format

Used to generate classes that shares the same syntax by using a prefix and suffix, all declaring the same properties but with different values.

This object must contain the following keys:

| key | type | required | description |
| -----:| ------ | ---------- | -------------- |
| `type` | {String} | Yes | For pattern objects 'pattern' must be declared here. |
| `id` | {String} | Yes | A unique identifier for this pattern. Used by the config. |
| `name` | {String} | Yes | The name of the pattern. Used by the web tool. |
| `prefix` | {String} | Yes | The prefix to be prepended in the class name of each class. |
| `allowFraction` | {Boolean} | No | Wether or not this pattern allow fraction objects to be declared in the config. |
| `allowCustom` | {Boolean} | No | Wether or not this pattern allow custom values from config. |
| `properties` | {Array} | Yes | An array of properties that will be inside each rule. |
| `rules` | {Array} | Yes | An array of objects where each should have the keys below |

| key | type | description |
| -----:| ------ | -------------- |
| `suffix` | {String} | The suffix that will be appended to the prefix. |
| `values` | {Array} | An array of values. The index of each value corresponds to the index of each property declared in `properties`. |

Examples:

```js
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
}
```

#### 1.2. Rule format

Used to generate unique classes that can contain one or more declarations.
                           
This object must contain the following keys:

| key | type | description |
| -----:| ------ | -------------- |
| `type` | {String} | For rule objects 'rule' must be declared here. |
| `id` | {String} | A unique identifier for this rule. Used by the config. |
| `name` | {String} | The name of the rule. Used by the web tool. |
| `rule` | {Object} | An object following absurjs' rule format. |

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

#### 1.3. Custom properties format

Used to generate a set of classes (with alphabetical suffixes) with custom properties.
                           
This object must contain the following keys:

| key | type | required | description |
| -----:| ------ | ---------- | -------------- |
| `type` | {String} | Yes | For custom properties objects 'custom-properties' must be declared here. |
| `id` | {String} | Yes | A unique identifier for this pattern. Used by the config. |
| `name` | {String} | Yes | The name of the pattern. Used by the web tool. |
| `prefix` | {String} | Yes | The prefix to be prepended in the class name of each class. |
| `suffixType` | {String} | Yes | The type of suffix. It can only be 'alphabet'. |
| `format` | {Array} | Yes | An array of functions to test each word passed in the config object. |
| `rules` | {Array} | Yes | An array of objects where each should have the keys below |

| key | type | description |
| -----:| ------ | -------------- |
| `suffix` | {String} | The suffix that will be appended to the prefix. |
| `values` | {Array} | An array of values. The index of each value corresponds to the index of each property declared in `properties`. |

Example:

```js
 {
     type: 'custom-properties',
     id: 'border',
     name: 'Border',
     prefix: '.Bd-',
     suffixType: 'alphabet',
     format: [
         utils.isLength,
         utils.indexOf(['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset']),
         utils.isHex
     ],
     rules: [
         {suffix: 'x', values: ['border-left', 'border-right']},
         {suffix: 'y', values: ['border-top', 'border-bottom']},
         {suffix: 't', values: ['border-top']},
         {suffix: 'end', values: ['border-' + END]},
         {suffix: 'start', values: ['border-' + START]}
     ]
 }
```

### 2. Config Object

This is an object that must be set in `atomic.config.js` that tells what it wants from the atomic.css (the atomic rules) and it is used to to generate a custom build of atomic.css.

**TODO: Complete this section with the specification of how to create this JSON file**

```js
{
    'config': {
        'namespace': '#atomic',
        'start': 'left',
        'end': 'right',
        'defaults': {
            'font-size': '16px',
            'border-color': '#555',
            'bleed-value': '-10px'
        }
    },
    'font-weight': {
        'n': true,
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
    'padding-x': {
        'a': true,
        'custom': [
            {suffix: '10', values: ['10px']},
            {suffix: '20', values: ['20px']}
        ]
    },
    'bfc': true
};
```
