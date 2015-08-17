# atomic-loader
Webpack loader for compiling atomic css

## Install
```
$ npm i atomic-loader --save-dev
```

## Usage

In your webpack config:

1. find the babel-loader or jsx-loader setting
2. insert the atomic-loader before it
3. example 

  ```javascript
  loaders: [
          {
              test: /\.jsx?$/,
              exclude: /(node_modules)/,
              loader: 'atomic-loader?configPath=./atomicCssConfig.js!babel-loader',
          }
      ]
  ```
  or you can just not giving atomic css config file, it will use default css dest: `./build/css/atomic.css`

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
  The configurable parameter can be found at https://github.com/yahoo/atomizer . 
  Only the `cssDest` is extra parameter for telling atomic-loader where to output css file.
