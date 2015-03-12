# Atomizer

[![npm version](https://badge.fury.io/js/atomizer.svg)](http://badge.fury.io/js/atomizer)
[![Build Status](https://travis-ci.org/yahoo/atomizer.svg?branch=master)](https://travis-ci.org/yahoo/atomizer)
[![Dependency Status](https://david-dm.org/yahoo/atomizer.svg)](https://david-dm.org/yahoo/atomizer)
[![devDependency Status](https://david-dm.org/yahoo/atomizer/dev-status.svg)](https://david-dm.org/yahoo/atomizer#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/yahoo/atomizer/badge.svg)](https://coveralls.io/r/yahoo/atomizer)


## Overview

Atomizer is a tool that helps you create Atomic CSS rules.

Atomic CSS is a collection of single purpose styling units for maximum reuse that fits well with components in templated frameworks such as [React](https://github.com/facebook/react), [Ember](https://github.com/emberjs/ember.js/) or [Angular](https://github.com/angular/angular.js). For more information we recommend that you read "[Challenging CSS best practices](http://www.smashingmagazine.com/2013/10/21/challenging-css-best-practices-atomic-approach/)" or watch the Atomic CSS [presentation](https://www.youtube.com/watch?v=ojj_-6Xiud4).

## Install

```bash
npm install atomizer -g
```

## Usage

### CLI

```
atomizer [-c|--config=<file>] [-o|--outfile=<file>] [--rtl] [--help] [--verbose] [ [-R] files_to_parse ...]
```

Example:

```
atomizer -o atomic.css ./site/*.html
atomizer -c config.js -R ./site/ > atomic.css
atomizer -c config.js > atomic.css


```

### API

```javascript
var Atomizer = require('atomizer');

var defaultConfig = {
    "breakPoints": {
        'sm': '750px',
        'md': '1000px',
        'lg': '1200px'
    },
    "border": {
        "custom": [
            {
                "suffix": "1",
                "values": [ "1px solid #000" ]
            },
            {
                "suffix": "foo",
                "values": [ "2px dotted #f00" ],
                "breakPoints": ['sm', 'md']
            }
        ]
    }
};

// Parse text to find Atomic CSS classes
var classes = Atomizer.parse('<div class="P-10px M-20% B-1"></div>');

// Generate Atomizer configuration from an array of Atomic classnames
var config = Atomizer.getConfig(classes, defaultConfig);

// Generate Atomic CSS from configuration
var css = Atomizer.createCSS(config);

```

## Developer docs

We have [wiki](https://github.com/yahoo/atomizer/wiki) docs for contributors who want to help with the maintenance and development of this tool.

## License

This software is free to use under the Yahoo Inc. BSD license.
See the [LICENSE file][] for license text and copyright information.

[LICENSE file]: https://github.com/yahoo/atomizer/blob/master/LICENSE.md

Third-party open source code used are listed in our [package.json file]( https://github.com/yahoo/atomizer/blob/master/package.json).
