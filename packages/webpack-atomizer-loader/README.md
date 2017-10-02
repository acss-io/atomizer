[![npm version](https://badge.fury.io/js/webpack-atomizer-loader.svg)](http://badge.fury.io/js/webpack-atomizer-loader)
[![Build Status](https://travis-ci.org/acss-io/webpack-atomizer-loader.svg?branch=master)](https://travis-ci.org/acss-io/webpack-atomizer-loader)
# webpack-atomizer-loader
Webpack loader for compiling atomic css

## Install
```bash
$ npm install webpack-atomizer-loader --save-dev
```
or
```bash
$ yarn add webpack-atomizer-loader -D
```

## Usage

In your webpack config:

1. find the babel-loader or jsx-loader setting
2. insert the `webpack-atomizer-loader` before it
3. example 

  ```js
  var path = require('path');
  .
  .
  .
  loaders: [
          {
              test: /\.jsx?$/,
              exclude: /(node_modules)/,
              loader: 'webpack-atomizer-loader',
              query: {
                  configPath: path.resolve('./atomCssConfig.js')
              }
          }
      ]
  ```

4. `atomCssConfig.js` example which specified in `configPath` 
  ```js
  module.exports = {
      cssDest: './main.css',
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
              '1': '1px solid #000',
          },
          classNames: []
      }
  }
  ```
  
  To assign the output destination, the extra parameter `cssDest` in atomic's config should be set, if bypass `configPath`, the default `cssDest` is `./build/css/atomic.css`.

  ## Advanced

  ### postcss plugins
  `webpack-atomizer-loader` now supports processing output CSS file with postcss by doing this:

  ```js
  var path = require('path');
  var autoprefixer = require('autoprefixer');
    .
    .
    .

    {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'webpack-atomizer-loader',
        query: {
            postcssPlugins: [autoprefixer]
            configPath: [
                path.resolve('./atomCssConfig.js')
            ]
        }
    }

  ```

  ### Minimize output CSS file

  Set `minimize` to `true` to loader's config
  ```js
  var path = require('path');
  var autoprefixer = require('autoprefixer');
    .
    .
    .

    {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'webpack-atomizer-loader',
        query: {
            postcssPlugins: [autoprefixer]
            minimize: true,
            configPath: [
                path.resolve('./atomCssConfig.js')
            ]
        }
    }

  ```

  
  Please visit [acss-io/atomizer](https://github.com/acss-io/atomizer) for more information.
  
