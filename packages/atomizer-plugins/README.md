# atomizer-plugins

Atomizer plugins for esbuild, Rollup, Vite and Webpack. This library leverages the [unplugin](https://github.com/unjs/unplugin) unified plugin system.

## Installation

```shell
npm i atomizer-plugins
```

Follow the usage section below depending on the library your project uses.

## Usage

See the [`Options`](src/types.ts) definition for the available options that each plugin accepts.

You can find a running example of each plugin in the `examples/` directory.

### esbuild

```js
// esbuild.config.js
import { build } from 'esbuild';
import { esbuild } from 'atomizer-plugins';

const atomizer = rollup({
    /* options */
    config: atomizerConfig,
    outputFile: 'atomizer.css',
});

build({
    // ... esbuild config
    plugins: [atomizer],
});
```

### rollup

```js
// rollup.config.js
import { rollup } from 'atomizer-plugins';

const atomizer = rollup({
    /* options */
    config: atomizerConfig,
    outputFile: 'atomizer.css',
});

export default {
    // ... rollup config
    plugins: [atomizer],
};
```

### vite

```js
// vite.config.ts
import { vite } from 'atomizer-plugins';

const atomizerPlugin = vite({
    config: atomizerConfig,
    outputFile: 'atomizer.css',
});

export default defineConfig(() => {
    return {
        plugins: [atomizerPlugin],
    };
});
```

### webpack

```js
// webpack.config.js
import { webpack } from 'atomizer-plugins';

const atomizer = webpack({
    /* options */
    config: atomizerConfig,
    outputFile: 'atomizer.css',
});

export default {
    // ... webpack config
    plugins: [atomizer],
};
```
