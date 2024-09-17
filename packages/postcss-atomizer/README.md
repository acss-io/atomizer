# postcss-atomizer

[PostCSS](https://postcss.org/) plugin for Atomizer.

## Installation

```shell
npm i postcss-atomizer postcss -D
```

## Usage

Update your project's `postcss.config.js` file by adding the atomizer plugin:

```js
// postcss.config.js
const atomizer = require('postcss-atomizer');

module.exports = {
    plugins: [
        atomizer({ /* options */ }),
    ]
};
```

The plugin will automatically execute Atomizer based on your project's [`atomizer.config.js`](https://acss-io.github.io/atomizer/configuration.html) file and pass the rendered CSS to any additional plugins you configure.

### Options

The available options follow the [`Options` interface](https://github.com/acss-io/atomizer/blob/main/packages/atomizer/index.d.ts) from Atomizer's TypeScript definition.

By default, the plugin will look for an `atomizer.config.js` file at the root of your project. If your config file is in another location, you use the `config` property to specify it:

```js
module.exports = {
    plugins: [
        atomizerPlugin({
            config: `${process.cwd()}/path/to/atomizer.config.js`
        }),
    ]
};
```
