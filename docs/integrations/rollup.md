---
description: A simple guide to setup Atomizer with Rollup.
layout: docs
section: docs
title: Rollup
---

## Install the plugin

A [Rollup](https://rollupjs.org/) plugin is available as part of the [`atomizer-plugins`](https://github.com/acss-io/atomizer/tree/main/packages/atomizer-plugins) package. Install the package in your project first.

```shell
npm i atomizer-plugins -D
```

## Create your Atomizer config

Make sure Atomizer can parse your project files in your `atomizer.config.js` file.

```js
module.exports = {
    content: [
        './src/**/*.{html,js}',
    ],
}
```

## Update the config

Then configure your `rollup.config.js` to include the plugin.

```js
import { rollup } from 'atomizer-plugins';

const atomizer = rollup({
    /* options */
    config: atomizerConfig,
    outfile: 'dist/atomizer.css',
});

export default {
    // ... rollup config
    plugins: [atomizer],
};
```

Configuration information and examples are available in the [`atomizer-plugins` repository](https://github.com/acss-io/atomizer/tree/main/packages/atomizer-plugins).

## Start your build process

Run your build setup as configured in your project's `package.json`.

```shell
npm run dev
```

## Begin using Atomizer

Add the generated Atomizer CSS to your template, then start adding Atomizer classes to your markup.

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/dist/atomizer.css" />
    </head>
    <body>
        <h1 class="Fw(b) Fz(2rem)">Welcome!</h1>
    </body>
</html>
```
