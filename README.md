# Atomizer

[![Build Status](https://magnum.travis-ci.com/yahoo/atomizer.svg?token=1A1JtrzoyNwcyaqtpSCa)](https://magnum.travis-ci.com/yahoo/atomizer)
[![Dependency Status](https://david-dm.org/yahoo/atomizer.svg)](https://david-dm.org/yahoo/atomizer.svg)
[![devDependency Status](https://david-dm.org/yahoo/atomizer/dev-status.svg)](https://david-dm.org/yahoo/atomizer#info=devDependencies)
[![Coverage Status](https://img.shields.io/coveralls/yahoo/atomizer.svg)](https://coveralls.io/r/yahoo/atomizer?branch=master)

## Overview

Atomizer is a tool that helps you create Atomic.css rules. 

Atomic.css is a collection of single purpose styling units for maximum reuse that fits well with components in templated frameworks such as React, Ember or Angular. For more information we recommend that you read "[Challenging CSS best practices](http://www.smashingmagazine.com/2013/10/21/challenging-css-best-practices-atomic-approach/)" or watch the Atomic.css [presentation](https://www.youtube.com/watch?v=ojj_-6Xiud4).

## Install

```bash
npm install git+ssh://git@github.com:yahoo/atomizer.git -g
```

## Usage

```
atomizer [-o|--outfile=<file>] [--help] configfile ...
```

Example:

```
atomizer config.js -o atomic.css
```

## Developer docs

We have [wiki](https://github.com/yahoo/atomizer/wiki) docs for contributors who want to help with the maintenance and development of this tool.

## License

This software is free to use under the Yahoo Inc. BSD license.
See the [LICENSE file][] for license text and copyright information.

[LICENSE file]: https://github.com/yahoo/atomizer/blob/master/LICENSE.md

Third-pary open source code used are listed in our [package.json file]( https://github.com/yahoo/atomizer/blob/master/package.json).
