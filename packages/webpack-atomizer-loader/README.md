# atomic-loader
Webpack loader for compiling atomic css

## Install
```
$ npm install atomic-loader --save
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
  
  Please visit [yahoo/atomizer](https://github.com/yahoo/atomizer) for more information.
  
