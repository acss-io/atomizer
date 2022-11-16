# Atomizer

[![npm version](https://badge.fury.io/js/atomizer.svg)](http://badge.fury.io/js/atomizer)

## TL;DR

![GIF showing the VSCode extension (with autocompletion)](http://res.cloudinary.com/dw9fem4ki/image/upload/v1459669466/usage_mtx65l.gif)

## Overview

Atomizer is a tool that helps you create simple, scalable, CSS rules ([acss.io](http://acss.io)).

For more information we recommend that you read "[Challenging CSS best practices](http://www.smashingmagazine.com/2013/10/21/challenging-css-best-practices-atomic-approach/)", watch the Atomic CSS [presentation](https://www.youtube.com/watch?v=ojj_-6Xiud4), or [check this deck](https://www.haikudeck.com/atomic-css-science-and-technology-presentation-dJ0xlFjhBQ).

## Install

```bash
npm install atomizer -g
```

## Usage

### CLI

```bash
Usage: atomizer [options] [path]

  Options:

    -h, --help                          output usage information
    -V, --version                       output the version number
    -R, --recursive                     process all files recursively in the path.
    -c, --config=[file]                 source config file if any.
    -r, --rules=[file]                  custom rules file (argument may be passed multiple times)
    -o, --outfile=[file]                destination config file.
    -n, --namespace=[namespace]         adds the given namespace to all generated Atomic CSS selectors.
    -H, --helpersNamespace=[namespace]  adds the given namespace to all helper selectors.
    -w, --watch=[target]                rebuilds when changes are detected in the file, directory, or glob (argument may be passed multiple times and is parsed for Atomic CSS classes)

    --rtl                               swaps `start` and `end` keyword replacements with `right` and `left`.
    --exclude=[pattern]                 pattern to exclude file to be scanned
    --bump-mq                           increases specificity of media queries a small amount
    --strict                            bail if missing configs such as breakpoints.
    --verbose                           show additional log info (warnings).
```

Example:

```bash
atomizer -o atomic.css ./site/*.html
atomizer -o atomic.css ./site/*.html --exclude=*-0.html
atomizer -c config.js -R ./site/ > atomic.css
atomizer -c config.js -n \#myrootclass > atomic.css
```

### API

```javascript
import Atomizer from 'atomizer';

const defaultConfig = {
    breakPoints: {
        sm: '@media(min-width:750px)',
        md: '@media(min-width:1000px)',
        lg: '@media(min-width:1200px)'
    },
    custom: {
        border: '2px dotted #f00'
    }
};

const atomizer = new Atomizer({verbose: true});

// Parse text to find Atomic CSS classes
const foundClasses = atomizer.findClassNames('<div class="P(10px) M(20%) Bd(border)--sm"></div>');

// Generate Atomizer configuration from an array of Atomic classnames
const finalConfig = atomizer.getConfig(foundClasses, defaultConfig);

// Generate Atomic CSS from configuration
const css = atomizer.getCss(finalConfig);
```

## License

This software is free to use under the Yahoo Inc. BSD license. See the [LICENSE file][] for license text and copyright information.

[license file]: https://github.com/acss-io/atomizer/blob/main/LICENSE.md

Third-party open source code used are listed in our [package.json file](https://github.com/acss-io/atomizer/blob/main/package.json).
