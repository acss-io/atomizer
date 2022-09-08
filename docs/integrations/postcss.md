---
description: A simple guide to setup Atomizer with PostCSS.
layout: docs
section: docs
title: PostCSS
---

## Install the plugin

A [PostCSS](https://postcss.org/) plugin is available as part of the [`postcss-atomizer`](https://github.com/acss-io/atomizer/tree/main/packages/postcss-atomizer) package. Install the package in your project first.

```shell
npm i postcss-atomizer postcss -D
```

## Update the config

Add the Atomizer plugin to your PostCSS config.

```js
// postcss.config.js
const atomizer = require('postcss-atomizer');

module.exports = {
    plugins: [
        atomizer({ /* options */ }),
    ]
};
```

<p class="noteBox info">Option information and an example is available in the <a href="https://github.com/acss-io/atomizer/tree/main/packages/postcss-atomizer">postcss-atomizer</a> repository.</p>

## Start your dev setup

Run your build setup as configured in your project's `package.json`.

```shell
npm run dev
```

## Begin using Atomizer

Add the generated PostCSS CSS to your template, then start adding Atomizer classes to your markup.

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/dist/main.css" />
    </head>
    <body>
        <h1 class="Fw(b) Fz(2rem)">Welcome!</h1>
    </body>
</html>
```
