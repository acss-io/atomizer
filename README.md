# Atomizer

[![Join the chat at https://gitter.im/yahoo/atomizer](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/yahoo/atomizer?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![npm version](https://badge.fury.io/js/atomizer.svg)](http://badge.fury.io/js/atomizer)
[![Build Status](https://travis-ci.org/yahoo/atomizer.svg?branch=master)](https://travis-ci.org/yahoo/atomizer)
[![Dependency Status](https://david-dm.org/yahoo/atomizer.svg)](https://david-dm.org/yahoo/atomizer)
[![devDependency Status](https://david-dm.org/yahoo/atomizer/dev-status.svg)](https://david-dm.org/yahoo/atomizer#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/yahoo/atomizer/badge.svg)](https://coveralls.io/r/yahoo/atomizer)


## Overview

Atomizer is a tool that helps you create Atomic CSS rules ([acss.io](http://acss.io)).

Atomic CSS is a collection of single purpose styling units for maximum reuse that fits well with components in templated frameworks such as [React](https://github.com/facebook/react), [Ember](https://github.com/emberjs/ember.js/) or [Angular](https://github.com/angular/angular.js). For more information we recommend that you read "[Challenging CSS best practices](http://www.smashingmagazine.com/2013/10/21/challenging-css-best-practices-atomic-approach/)", watch the Atomic CSS [presentation](https://www.youtube.com/watch?v=ojj_-6Xiud4), or [check this deck](https://www.haikudeck.com/atomic-css-science-and-technology-presentation-dJ0xlFjhBQ).

## Install

```bash
npm install atomizer -g
```

## Usage

### CLI

```
Usage: atomizer [options] [path]

  Options:

    -h, --help                          output usage information
    -V, --version                       output the version number
    -R, --recursive                     process all files recursively in the path.
    -c, --config [file]                 source config file if any.
    -r, --rules [file]                  custom rules file (argument may be passed multiple times)
    -o, --outfile [file]                destination config file.
    -n, --namespace [namespace]         adds the given namespace to all generated Atomic CSS selectors.
    -H, --helpersNamespace [namespace]  adds the given namespace to all helper selectors.
    --rtl                               swaps `start` and `end` keyword replacements with `right` and `left`.
    --ie                                adds old IE hacks to the output.
    --verbose                           show additional log info (warnings).
```

Example:

```
atomizer -o atomic.css ./site/*.html
atomizer -c config.js -R ./site/ > atomic.css
atomizer -c config.js -n \#myrootclass > atomic.css
```

### API

```javascript
var Atomizer = require('atomizer');

var defaultConfig = {
    "breakPoints": {
        'sm': '@media(min-width=750px)',
        'md': '@media(min-width=1000px)',
        'lg': '@media(min-width=1200px)'
    },
    "custom": {
        "1": "1px solid #000",
        "foo": "2px dotted #f00"
    },
    "classNames": [
        'Bd(1)',
        'Bd(foo)',
        'Bd(foo)--sm',
        'Bd(foo)--md',
        'D(n)!'
    ]
};

var atomizer = new Atomizer({verbose: true});

// Parse text to find Atomic CSS classes
var foundClasses = atomizer.findClassNames('<div class="D(n)! P(10px) M(20%) Bd(1) Bd(foo)--sm"></div>');

// Generate Atomizer configuration from an array of Atomic classnames
var finalConfig = atomizer.getConfig(foundClasses, defaultConfig);

// Generate Atomic CSS from configuration
var css = atomizer.getCss(finalConfig);

```

### Plugins

   * Grunt: [grunt-atomizer](https://github.com/yahoo/grunt-atomizer)

## Developer docs

We have [wiki](https://github.com/yahoo/atomizer/wiki) docs for contributors who want to help with the maintenance and development of this tool.

## License

This software is free to use under the Yahoo Inc. BSD license.
See the [LICENSE file][] for license text and copyright information.

[LICENSE file]: https://github.com/yahoo/atomizer/blob/master/LICENSE.md

Third-party open source code used are listed in our [package.json file]( https://github.com/yahoo/atomizer/blob/master/package.json).
