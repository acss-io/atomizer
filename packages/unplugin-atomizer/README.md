# unplugin-atomizer

Atomizer plugin for esbuild, Rollup, Vite and Webpack. This library leverages the [unplugin](https://github.com/unjs/unplugin) unified plugin system.

## Installation

```shell
npm i unplugin-atomizer
```

Follow the usage section below depending on the library your project uses.

## Usage

See the [`Options definition`](src/types.ts) for the available options that each plugin accepts.

### webpack

```js
import { webpack } from 'unplugin-atomizer';

export default {
    plugins: [
        webpack({
            /* options */
        }),
    ],
};
```

> A working example can be tested in the `examples/webpack` directory.
