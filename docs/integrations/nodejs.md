---
description: A simple guide to setup Atomizer with Node.js.
layout: docs
section: docs
title: Node.js
---

## Install Atomizer

You can leverage the same libraries that the [cli]({% link installation.md %}#atomizer-cli) uses to integrate Atomizer in your project. The Atomizer npm package exports an Atomizer class that you can use to parse config and generate Atomizer CSS.

```shell
npm i atomizer -D
```

## Sample integration code

Below is an example of a programmatic approach to integrating with Atomizer.

```js
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

// Initialize the class
const atomizer = new Atomizer({verbose: true});

// Parse text to find Atomizer CSS classes
const foundClasses = atomizer.findClassNames('<div class="P(10px) M(20%) Bd(border)--sm"></div>');

// Generate Atomizer configuration from an array of Atomic classnames
const finalConfig = atomizer.getConfig(foundClasses, defaultConfig);

// Generate Atomic CSS from configuration
const css = atomizer.getCss(finalConfig);
```
