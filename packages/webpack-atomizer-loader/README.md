# webpack-atomizer-loader [![npm version](https://badge.fury.io/js/webpack-atomizer-loader.svg)](http://badge.fury.io/js/webpack-atomizer-loader)

[Webpack loader](https://webpack.js.org/concepts/loaders) for compiling [Atomic CSS](https://acss.io).

## Table of Contents

1. [Installation](#installation)
1. [Loader configuration](#loader-configuration)
1. [Atomic CSS configuration](#atomic-css-configuration)
1. [Usage with React or Vue](#usage-with-react-or-vue)
    1. [Including the generated CSS with a JavaScript import](#including-the-generated-css-with-a-javascript-import)
    1. [Including the generated CSS with a CSS import](#including-the-generated-css-with-a-css-import)
    1. [Including the generated CSS directly into the HTML template](#including-the-generated-css-directly-into-the-html-template)
1. [Usage with `webpack-html-plugin` and `mini-css-extract-plugin`](#usage-with-webpack-html-plugin-and-mini-css-extract-plugin)
1. [Usage with only `html-loader` (or any other template loader)](#usage-with-only-html-loader-or-any-other-template-loader)

## Installation

```bash
npm i -D webpack-atomizer-loader
```

or

```bash
yarn add -D webpack-atomizer-loader
```

## Loader configuration

The loader accepts the below options:

| Option           | Default     | Required | Description                                                                                                                                                               |
| ---------------- | ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `configPath`     | `undefined` | No       | The path to the Atomic CSS config file. If not specified, empty Atomic CSS configuration will apply. Check [Atomic CSS configuration](#atomic-css-configuration) section. |
| `minimize`       | `false`     | No       | Minimizes the resulting CSS file.                                                                                                                                         |
| `postcssPlugins` | `[]`        | No       | Array with [PostCSS](https://postcss.org) plugins that will be used to process the CSS generated.                                                                         |

The loader configuration will look something like this in `webpack.config.js`:

```js
// webpack.config.js

const path = require('path');
const autoprefixer = require('autoprefixer');
const preCss = require('precss');

{
    // ...
    use: [
        {
            loader: 'webpack-atomizer-loader',
            options: {
                configPath: path.resolve('./atomCssConfig.js'),
                minimize: true,
                postcssPlugins: [autoprefixer, preCss],
            },
        },
    ];
}
```

## Atomic CSS configuration

You will need a JavaScript file with the Atomic CSS configuration that will be fed to the loader. For example, `atomicCssConfig.js` will looks something like:

```js
// atomicCssConfig.js

module.exports = {
    cssDest: './generatedAtoms.css',
    // extends CSSOptions definition from atomizer
    options: {
        namespace: '#atomic',
        // Supports array of rule objects or path to rules object string
        rules: [{ custom: 'rule' }],
    },
    configs: {
        breakPoints: {
            sm: '@media screen(min-width=750px)',
            md: '@media(min-width=1000px)',
            lg: '@media(min-width=1200px)',
        },
        custom: {
            1: '1px solid #000',
        },
        classNames: [],
    },
};
```

Use the `cssDest` property to assign the output destination of the generated CSS. If not specified, the default value is `./build/css/atomic.css`.

To know more about Atomic CSS configuration check https://github.com/acss-io/atomizer#api.

## Usage with React or Vue

If the CSS atoms in your project are written in the `className` prop of JSX files, then use `babel-loader` or `jsx-loader` in your webpack configuration and insert `webpack-atomizer-loader` before it:

```js
// webpack.config.js

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    module: {
        rules: [
            {
                // Optional. Read further down
                test: /\.css$/, // or /\.scss$/
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader', // or 'sass-loader'
                        options: {
                            /* ... */
                        },
                    },
                ],
            },
            {
                test: /\.jsx?$/, // or /\.vue?$/
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'webpack-atomizer-loader',
                        options: {
                            configPath: path.resolve('./atomCssConfig.js'),
                        },
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['react', 'es2015'],
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin(), // Optional. Read further down
    ],
};
```

`webpack-atomizer-loader` will generate a `generatedAtoms.css` file which will have to be imported into the final `public/index.html` file. This can be done in three different ways:

### Including the generated CSS with a JavaScript import

You can import the generated CSS file as a JavaScript module import. The project webpack entry point file is a good place to make the import:

```jsx
// index.js

import React from 'react';
import ReactDOM from 'react-dom';

import ProjectStyles from './projectStyles.css';
import GeneratedAtoms from './generatedAtoms.css'; // Add this line

import App from './app';

ReactDOM.render(<App />, document.getElementById('root'));
```

`css-loader` will convert CSS into a JavaScript variable when you do `import CSS from './generatedAtoms.css`. Then [`mini-css-extract-plugin`](https://github.com/webpack-contrib/mini-css-extract-plugin) will generate the final CSS file from the JavaScript variable created by `css-loader`.

If you use some CSS preprocessor like SASS or PostCSS you'll have to also add the corresponding loader, which will have to go after the `css-loader` on the `rules` array (as shown on the aforementioned webpack config example).

> ⚠ **IMPORTANT**: the CSS file with the generated atoms will be created after the loaders to process `.css` files have finished and you will receive a `Can't resolve` webpack error. **There is a race condition**. The CSS file generated by the `webpack-atomizer-loader` with the atoms is not yet created by the time `css-loader` imports it. Unlike [Gulp](https://gulpjs.com) and its [`series()`](https://gulpjs.com/docs/en/api/series) and [`parallel()`](https://gulpjs.com/docs/en/api/parallel) methods, there is no way in webpack of waiting for a loader to start working after some other loader has finished. They start whenever there is an import matching the corresponding file extension. You will have to run `webpack` for a second time so that the `.css` loaders can pick the CSS file with the generated atom classes. In order to prevent the `Can't resolve` error you can create an empty CSS file until the generated one overrides it during the second run. Or you can [directly import the generated CSS into the HTML template](#including-the-generated-css-directly-into-the-html-template).

### Including the generated CSS with a CSS import

Similar to the previous option, but instead of including it in `index.js` it can be done to a `index.css` file:

```css
/* index.css */

@import 'projectStyles.css';
@import 'generatedAtoms.css'; /* Add this line */
```

### Including the generated CSS directly into the HTML template

If you don't need any CSS preprocessing functionality you can remove the entire CSS loader config:

```js
// webpack.config.js

// 'test' and attached loaders for .css files not needed anymore. 👇
// If css preprocessing is still required an 'exclude' rule could be added for 'generatedAtoms.css'
{
  test: /\.css$/,
  exclude: 'generatedAtoms.css', // you may need this line
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
      loader: 'postcss-loader', // or 'sass-loader'
      options: {
        // ...
      }
    },
  ]
}
```

and just import the generated CSS file directly into the HTML file of your template:

```html
<!-- public/index.html -->

<html>
    <head>
        <link href="projectStyles.css" rel="stylesheet" type="text/css" />
        <link href="generatedAtoms.css" rel="stylesheet" type="text/css" />
        <!-- Add this line -->
    </head>
</html>
```

After this you should be able to see the atom classes loaded on the browser and applied to your components.

## Usage with `webpack-html-plugin` and `mini-css-extract-plugin`

If the CSS atoms are on `class` attributes on `.html` files (or any other template system like [`hbs`](https://github.com/pcardune/handlebars-loader), `pug` or `ejs`) you can use the [`mini-css-extract-plugin`](https://github.com/webpack-contrib/mini-css-extract-plugin) and [`webpack-html-plugin`](https://github.com/jantimon/html-webpack-plugin) combo:

```js
// webpack.config.js

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/, // or /\.scss$/
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader', // or 'sass-loader'
                        options: {
                            // ...
                        },
                    },
                ],
            },
            {
                test: /\.html$/, // or /\.hbs$/
                use: [
                    {
                        loader: 'html-loader', // Or the corresponding loader for the template system you're using
                        options: {
                            attributes: false,
                            minimize: true,
                        },
                    },
                    {
                        loader: 'webpack-atomizer-loader',
                        options: {
                            configPath: path.resolve('./atomCssConfig.js'),
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/originTemplate.html',
            filename: 'dist/destinationFile.html',
        }),
        new MiniCssExtractPlugin(),
    ],
};
```

By default, if no HTML loader is specified `webpack-html-plugin` will use
a simple [`ejs` loader](https://github.com/jantimon/html-webpack-plugin/blob/master/docs/template-option.md). However as soon as `webpack-atomizer-loader` fires because of the `html` extension rule the default HTML loader will be disabled and we'll have to include ours. That's why on the above configuration in addition to `webpack-atomizer-loader` it's also included `html-loader`.

Like when using the loader for React or Vue projects the generated CSS file with the atom classes still needs to be included in any of the three possible ways: with a [JavaScript import](#including-the-generated-css-with-javascript), with a [CSS import](#including-the-generated-css-with-a-css-import) or [Including the generated CSS directly into the HTML template](#including-the-generated-css-directly-into-the-HTML-template).

## Usage with only `html-loader` (or any other template loader)

If the CSS atoms are on `class` attributes on `.html` files (or any other template system like [`hbs`](https://github.com/pcardune/handlebars-loader), `pug` or `ejs`, or even `jsx` or `vue`) and you don't require any CSS preprocessing or want to keep the webpack configuration to the minimum you can just scan HTML files to find the atoms and include the generated CSS file directly into the final HTML template:

```js
// webpack.config.js

const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.html$/, // or /\.hbs$/ or /\.jsx$/ (you may need to change loaders order and put webpack-atomizer-loader first on the array)
                use: [
                    {
                        loader: 'html-loader', // Or the corresponding loader for the template system you're using
                        options: {
                            preprocessor: () => '', // THIS LINE IS IMPORTANT
                        },
                    },
                    {
                        loader: 'webpack-atomizer-loader',
                        options: {
                            configPath: path.resolve('./atomCssConfig.js'),
                        },
                    },
                ],
            },
        ],
    },
};
```

On your webpack JavaScript entry file:

```js
// index.js

import WillFireHTMLLoader from './templateWithAtoms.html'; // Add an import for every HTML template with atoms
import WillFireHTMLLoader2 from './templateWithAtoms2.html';
```

Every `import` will make `webpack-atomizer-loader` scaning the HTML file imported and generating the corresponding atom classes that will be stored in one single `generatedAtoms.css`. The option `preprocessor: () => ''` will prevent that the HTML imported as a JavaScript string variable is added to the JavaScript bundle.

Then on your HTML project template:

```html
<!-- public/index.html -->

<html>
    <head>
        <link href="projectStyles.css" rel="stylesheet" type="text/css" />
        <link href="generatedAtoms.css" rel="stylesheet" type="text/css" />
        <!-- Add this line -->
    </head>
</html>
```

and your atoms will be styling your website like a boss. 😎
