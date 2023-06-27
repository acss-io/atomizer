---
description: A simple guide to setup Atomizer with SolidJS.
layout: docs
section: docs
title: SolidJS
---

## Create a new project

If you do not have a project setup already, you can create a new one using the SolidJS [Getting Started](https://www.solidjs.com/guides/getting-started) guide.

```shell
npx degit solidjs/templates/js my-app
cd my-app
npm install
```

## Install the plugin

SolidJS uses vite to build the application. You can use our [vite](https://vitejs.dev/) plugin as part of the [`atomizer-plugins`](https://github.com/acss-io/atomizer/tree/main/packages/atomizer-plugins) package to setup Atomizer. First you must install the dependency.

```shell
npm i atomizer-plugins -D
```

## Create your Atomizer config

Create an `./atomizer.config.js` config file so that SolidJS can parse your project files.

```js
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
    ],
}
```

## Update the vite config

Update the `./vite.config.js` config file and add the Atomizer plugin.

```js
// ...
import { vite } from 'atomizer-plugins';
import atomizerConfig from './atomizer.config.js';

const atomizerPlugin = vite({
    config: atomizerConfig,
    outfile: 'atomizer.css',
});

export default defineConfig({
    plugins: [atomizerPlugin, solidPlugin()],
    // ...
});
```

## Add the Atomizer CSS

Add the generated `./dist/atomizer.css` file to your `./src/index.jsx` file:

```js
import '../dist/atomizer.css';
// ...
```

## Start your build process

Run your build setup as configured in your project's `./package.json`.

```shell
npm run build
npm run dev
```

## Begin using Atomizer

Start adding Atomizer classes to your code base; `./src/App.js` for example.

```js
export default function App() {
    return (
        <h1 className="Fw(b) Fz(2rem)">Welcome!</h1>
    )
}
```
