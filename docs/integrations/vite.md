---
description: A simple guide to setup Atomizer with Vite.
layout: docs
section: docs
title: Vite
---

## Create a new project

If you do not have a project setup already, you can create a new one using Vite's [Getting Started](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) page.

```shell
npm create vite@latest my-app
cd my-app
npm install
```

## Install the plugin

A [vite](https://vitejs.dev/) plugin is available as part of the [`atomizer-plugins`](https://github.com/acss-io/atomizer/tree/main/packages/atomizer-plugins) package.

First, install the dependency:

```shell
npm i atomizer-plugins -D
```

## Create your Atomizer config

Create the `atomizer.config.js` config file so that Atomizer can find your SvelteKit files.

```js
module.exports = {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
    ],
}
```

## Update the Vite config

Add the Atomizer plugin to your `vite.config.js` config file.

```js
import { defineConfig } from 'vite';
import { vite } from 'atomizer-plugins';
import atomizerConfig from './atomizer.config.js';

const atomizerPlugin = vite({
    config: atomizerConfig,
    outputFile: 'dist/atomizer.css',
});

export default defineConfig(() => {
    return {
        plugins: [atomizerPlugin],
    };
});
```

## Add the Atomizer CSS

Make sure your `dist/atomizer.css` file is built by SvelteKit by adding it to your `index.html` file.

```html
<link href="dist/atomizer.css" />
```

## Start your build process

Run your build setup as configured in your project's `package.json`.

```shell
npm run dev
```

## Begin using Atomizer

Start adding Atomizer classes to your code base, an example `index.html` file.

```html
<h1 className="Fw(b) Fz(2rem)">Welcome!</h1>
```
