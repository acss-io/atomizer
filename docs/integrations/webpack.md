---
description: A simple guide to setup Atomizer with webpack.
layout: docs
section: docs
title: webpack
---

## Install the package

We offer two options for integrating with webpack, a [loader](#loader) and a [plugin](#plugin).

### Loader

[`webpack-atomizer-loader`](https://github.com/acss-io/atomizer/tree/main/packages/webpack-atomizer-loader) is a [webpack loader](https://webpack.js.org/concepts/loaders/) that can parse your source code for Atomizer classes and generate a CSS file.

First install the loader in your project.

```shell
npm i webpack-atomizer-loader -D
```

Then configure your `./webpack.config.js` file like so.

```js
import { resolve } from 'path';
import autoprefixer from 'autoprefixer';

export default {
    // ...
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'webpack-atomizer-loader',
                        options: {
                            configPath: resolve('./atomCssConfig.js'),
                            minimize: true,
                            postcssPlugins: [autoprefixer],
                        },
                    },
                ],
            }
        ],
    },
}
```

You can fine more detailed configuration information is available in the [project repository](https://github.com/acss-io/atomizer/tree/main/packages/webpack-atomizer-loader).

### Plugin

Leverage our [`atomizer-plugins`](https://github.com/acss-io/atomizer/tree/main/packages/atomizer-plugins) package to integrate our [webpack plugin](https://webpack.js.org/concepts/plugins/) in your project.

First install the dependency in your project.

```shell
npm i atomizer-plugins -D
```

Then configure your `./webpack.config.js` file like so.

```js
import { webpack } from 'atomizer-plugins';

const atomizer = webpack({
    /* options */
    config: atomizerConfig,
    outfile: 'dist/atomizer.css',
});

export default {
    // ... webpack config
    plugins: [atomizer],
};
```

Configuration information and examples are available in the [`atomizer-plugins` repository](https://github.com/acss-io/atomizer/tree/main/packages/atomizer-plugins).

## Start your build process

Run your build setup as configured in your project's `./package.json`.

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
