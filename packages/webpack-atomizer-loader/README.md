[![npm version](https://badge.fury.io/js/atomic-loader.svg)](http://badge.fury.io/js/atomic-loader)
![travis build state](https://travis-ci.org/tom76kimo/atomic-loader.svg?branch=master)
# atomic-loader
Webpack loader for compiling atomic css

## Install
```
$ npm install webpack-atomizer-loader --save-dev
```

## Usage

In your webpack config:

1. find the babel-loader or jsx-loader setting
2. insert the `webpack-atomizer-loader` before it
3. example 

  ```javascript
  loaders: [
          {
              test: /\.jsx?$/,
              exclude: /(node_modules)/,
              loader: 'webpack-atomizer-loader?configPath=' + __dirname + '/atomCssConfig.js!babel-loader',
          }
      ]
  ```

4. `atomCssConfig.js` example which specified in `configPath` 
  ```javascript
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
  
  Please visit [acss-io/atomizer](https://github.com/acss-io/atomizer) for more information.
  
