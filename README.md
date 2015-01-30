# Atomic.css

[![Build Status](https://magnum.travis-ci.com/yahoo/atomic.css.svg?token=1A1JtrzoyNwcyaqtpSCa)](https://magnum.travis-ci.com/yahoo/atomic.css)
[![Dependency Status](https://david-dm.org/yahoo/atomic.css.svg)](https://david-dm.org/yahoo/atomic.css.svg)
[![devDependency Status](https://david-dm.org/yahoo/atomic.css/dev-status.svg)](https://david-dm.org/yahoo/atomic.css#info=devDependencies)
[![Coverage Status](https://img.shields.io/coveralls/yahoo/atomic.css.svg)](https://coveralls.io/r/yahoo/atomic.css?branch=master)

A collection of single purpose styling units for maximum reuse.

## Overview

This is a tool that lets you create atomic.css rules. Atomic.css is a collection of single purpose styling units for maximum reuse that fits well with components in templated frameworks such as React, Ember or Angular. For more information we recommend that you read "[Challenging CSS best practices](http://www.smashingmagazine.com/2013/10/21/challenging-css-best-practices-atomic-approach/)" or watch the atomic.css [presentation](https://www.youtube.com/watch?v=ojj_-6Xiud4).

## Install

```bash
npm install git+ssh://git@github.com:yahoo/atomic.css.git -g
```

## Usage

```
atomize [-o|--outfile=<file>] [-r|--rules=<rule file>] [--help] configfile ...
```

Example:

```
atomize config.js -o atomic.css
```

## Developer docs

We have [wiki](https://github.com/yahoo/atomic.css/wiki) docs for contributors that want to help the maintenance and development of this tool.

## License

This software is free to use under the Yahoo! Inc. BSD license.
See the [LICENSE file][] for license text and copyright information.

[LICENSE file]: https://github.com/yahoo/atomic.css/blob/master/LICENSE.md

Third-pary open source code used are listed in our [package.json file]( https://github.com/yahoo/atomic.css/blob/master/package.json).
