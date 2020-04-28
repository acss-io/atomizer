[![npm version](https://badge.fury.io/js/webpack-atomizer-loader.svg)](http://badge.fury.io/js/webpack-atomizer-loader)
[![Build Status](https://travis-ci.org/acss-io/webpack-atomizer-loader.svg?branch=master)](https://travis-ci.org/acss-io/webpack-atomizer-loader)
# webpack-atomizer-loader
[Webpack loader](https://webpack.js.org/concepts/loaders) for compiling [Atomic CSS](https://acss.io).

## Table of Contents

1. [Install](#install)
1. [Loader configuration](#loader-configuration)
1. [Atomic CSS configuration](#atomic-css-configuration)
1. [Usage with React or Vue](#usage-with-react-or-vue)
1. [Usage with `mini-css-extract-plugin` and `webpack-html-plugin`](#usage-with-mini-css-extract-plugin-and-webpack-html-plugin)
1. [Usage with only `html-loader`](#usage-with-only-html-loader)

## Install
```bash
$ npm i webpack-atomizer-loader -D
```
or
```bash
$ yarn add webpack-atomizer-loader -D
```

## Loader configuration

The loader accepts three options:

Option | Default | Required | Description
-- | - | - | -
`configPath` | `undefined` | No | The path to the Atomic CSS config file. If no specified empty Atomic CSS configuration will apply. Check [Atomic CSS configuration](#atomic-css-configuration) section.
`minimize` | `false` | No | Minimizes the resulting CSS file.
`postcssPlugins` | `[]` | No | Array with [PostCSS](https://postcss.org) plugins that will be used to process the CSS generated.

The loader configuration will look something like this on `webpack.config.js`:

```js
// webpack.config.js

const path = require('path');
const autoprefixer = require("autoprefixer");
const preCss = require("precss");

{
    // ...
    use: [
        {
            loader: 'webpack-atomizer-loader',
            options: {
                configPath: path.resolve('./atomCssConfig.js'),
                minimize: true,
                postcssPlugins: [autoprefixer, preCss]
            }
        }
    ]
}
```

## Atomic CSS configuration

You need in a JavaScript file the Atomic CSS configuration that will be feed to the loader. For example, `atomicCssConfig.js` will looks something like:

```js
// atomicCssConfig.js

module.exports = {
    cssDest: './generatedAtoms.css',
    options: {
        namespace: '#atomic',
    },
    configs: {
        breakPoints: {
            sm: '@media screen(min-width=750px)',
            md: '@media(min-width=1000px)',
            lg: '@media(min-width=1200px)'
        },
        custom: {
            1: '1px solid #000',
        },
        classNames: []
    }
}
```

Use the `cssDest` property to assign the output destination of the generated CSS. If not specified the default value is `./build/css/atomic.css`.

To know more about Atomic CSS configuration check https://github.com/acss-io/atomizer#api.

## Usage with React or Vue

If the CSS atoms on your project are written in the `className` prop of JSX files locate `babel-loader` or `jsx-loader` on the webpack configuration and insert `webpack-atomizer-loader` before it:

```js
// webpack.config.js

const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    module: {
        rules: [
            { // Optional. Read further down
                test: /\.css$/, // or /\.scss$/
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
            },
            {
                test: /\.jsx?$/, // or /\.vue?$/
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'webpack-atomizer-loader',
                        options: {
                            configPath: path.resolve('./atomCssConfig.js')
                        }
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['react', 'es2015']
                        }
                    },
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin() // Optional. Read further down
    ]
};
```

`webpack-atomizer-loader` will generate a `generatedAtoms.css` file which will have to be imported into the final `public/index.html` file. This can be done in three different ways:

### Including the generated CSS with JavaScript

You can import the generated CSS file as a JavaScript module import. The project webpack entry point file is a good place to make the import:

```js
// index.js

import React from 'react'
import ReactDOM from 'react-dom'

import ProjectStyles from './projectStyles.css'
import GeneratedAtoms from './generatedAtoms.css' // Add this line

import App from './app'

ReactDOM.render(<App />, document.getElementById('root'))
```

`css-loader` will convert CSS into a JavaScript variable when you do `import CSS from './generatedAtoms.css`. Then [`mini-css-extract-plugin`](https://github.com/webpack-contrib/mini-css-extract-plugin) will generate the final CSS file from the JavaScript variable created by `css-loader`.

If you use some CSS preprocessor like SASS or PostCSS you'll have to also add the corresponding loader, which will have to go after the `css-loader` on the `rules` array (as shown on the aforementioned webpack config example).

> ATTENTION: it may happen than the generated CSS file is created after the loaders to process `.css` files have finished and you receive a `Can't resolve` webpack error. In that case you will have to run `webpack` for a second time so that the `.css` loaders can pick the CSS file with the generated atom classes. In order to prevent this you can create an empty CSS file until the generated one overrides it during the second webpack run.

### Including the generated CSS with a CSS import

Similar to the previous option but instead of including it in `index.js` it can be done to a `index.css` file:

```css
/* index.css */

@import "projectStyles.css";
@import "generatedAtoms.css"; /* Add this line */
```

### Including the generated CSS directly into the HTML template

If you don't need any CSS preprocessing functionality you can remove the entire CSS loader config:

```js
// webpack.config.js

{
	test: /\.css$/, // or /\.scss$/
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
    <link href="generatedAtoms.css" rel="stylesheet" type="text/css" /> <!-- Add this line -->
  </head>
```

After this you should be able to see the atom classes loaded on the browser and applied to your components.

## Usage with `mini-css-extract-plugin` and `webpack-html-plugin`

If the CSS atoms are on `class` attributes on `.html` files (or any other template system like [`hbs`](https://github.com/pcardune/handlebars-loader), `pug` or `ejs`) you can use the [`mini-css-extract-plugin`](https://github.com/webpack-contrib/mini-css-extract-plugin) and [`webpack-html-plugin`](https://github.com/jantimon/html-webpack-plugin) combo:

```js
// webpack.config.js

const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
                        }
                    },
                ]
            },
            {
                test: /\.html$/, // or /\.hbs$/
                use: [
                    {
                        loader: 'html-loader', // Or the corresponding loader for the template system you're using
                        options: {
                            attributes: false,
                            minimize: true
                        }
                    },
                    {
                        loader: 'webpack-atomizer-loader',
                        options: {
                            configPath: path.resolve('./atomCssConfig.js')
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/originTemplate.html',
            filename: 'dist/destinationFile.html'
        }),
        new MiniCssExtractPlugin()
    ]
};
```

By default if no HTML loader is specified `webpack-html-plugin` will use
a simple [`ejs` loader](https://github.com/jantimon/html-webpack-plugin/blob/master/docs/template-option.md). However as soon as `webpack-atomizer-loader` fires because of the `html` extension rule the default HTML loader will be disabled and we'll have to include ours. That's why on the above configuration in addition to `webpack-atomizer-loader` it's also included `html-loader`.

Like when using the loader for React or Vue projects the generated CSS file with the atom classes still needs to be included in any of the three possible ways: with a [JavaScript import](#including-the-generated-css-with-javascript), with a [CSS import](#including-the-generated-css-with-a-css-import) or [Including the generated CSS directly into the HTML template](#including-the-generated-css-directly-into-the-HTML-template).

## Usage with only `html-loader`

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
                            preprocessor: () => '' // THIS LINE IS IMPORTANT
                        }
                    },
                    {
                        loader: 'webpack-atomizer-loader',
                        options: {
                            configPath: path.resolve('./atomCssConfig.js')
                        }
                    }
                ]
            }
        ]
    }
};
```

On your webpack JavaScript entry file:

```js
// index.js

import WillFireHTMLLoader from './templateWithAtoms.html' // Add an import for every HTML template with atoms
import WillFireHTMLLoader2 from './templateWithAtoms2.html'
```

Every `import` will make `webpack-atomizer-loader` scaning the HTML file imported and generating the corresponding atom classes that will be stored in one single `generatedAtoms.css`. The option `preprocessor: () => ''` will prevent that the HTML imported as a JavaScript string variable is added to the JavaScript bundle.

Then on your HTML project template:

```html
<!-- public/index.html -->

<html>
  <head>
    <link href="projectStyles.css" rel="stylesheet" type="text/css" />
    <link href="generatedAtoms.css" rel="stylesheet" type="text/css" /> <!-- Add this line -->
  </head>
```

and your atoms will be styling your website like a boss. 😎

