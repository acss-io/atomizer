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

A [PostCSS](https://postcss.org/) plugin is available as part of the [`postcss-atomizer`](https://github.com/acss-io/atomizer/tree/main/packages/postcss-atomizer) package. Install the package in your project first.

```shell
npm i postcss-atomizer postcss -D
```

## Create your Atomizer config

Create an `atomizer.config.js` config file so that SolidJS can parse your project files.

```js
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
    ],
}
```

## Create your PostCSS config

Create a `postcss.config.js` config file and add the Atomizer plugin.

```js
const atomizer = require('postcss-atomizer');

module.exports = {
    plugins: [
        atomizer({
            outfile: 'dist/atomizer',
        }),
    ]
};
```

## Add the Atomizer CSS

Add the generated `dist/atomizer.css` file to your `index.tsx` file:

```js
import '../dist/atomizer.css';
// ...
```

## Start your build process

Run your build setup as configured in your project's `package.json`.

```shell
npm run dev
```

## Begin using Atomizer

Start adding Atomizer classes to your code base, `App.js` example.

```js
export default function App() {
    return (
        <h1 className="Fw(b) Fz(2rem)">Welcome!</h1>
    )
}
```
