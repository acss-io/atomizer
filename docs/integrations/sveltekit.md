---
description: A simple guide to setup Atomizer with SvelteKit.
layout: docs
section: docs
title: SvelteKit
---

## Create a new project

If you do not have a project setup already, you can create a new one using SvelteKit's [Getting Started](https://kit.svelte.dev/docs/introduction#getting-started) page.

```shell
npm create svelte@latest my-app
cd my-app
npm install
```

## Install the plugin

As SvelteKit is really just a [Vite project](https://kit.svelte.dev/docs/project-structure#project-files-vite-config-js), you can use the [vite](https://vitejs.dev/) plugin from the [`atomizer-plugins`](https://github.com/acss-io/atomizer/tree/main/packages/atomizer-plugins) package to load Atomizer.

First, install the dependencies:

```shell
npm i atomizer-plugins @sveltejs/vite-plugin-svelte -D
```

## Create your Atomizer config

Create the `atomizer.config.js` config file so that Atomizer can find your SvelteKit files.

```js
module.exports = {
    content: [
        './src/**/*.{html,js,svelte,ts}',
    ],
}
```

## Update the Vite config

Add the Atomizer plugin to your `vite.config.js` config file.

```js
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { vite } from 'atomizer-plugins';
import atomizerConfig from './atomizer.config.js';

const atomizerPlugin = vite({
    config: atomizerConfig,
    outputFile: 'dist/atomizer.css',
});

export default defineConfig(() => {
    return {
        plugins: [atomizerPlugin, svelte()],
    };
});
```

## Add the Atomizer CSS

Make sure your `atomizer.css` file is built by SvelteKit by adding it to your `+layout.svelte` file.

```js
<script>
    import "../dist/atomizer.css";
</script>

<slot />
```

## Start your build process

Run your build setup as configured in your project's `package.json`.

```shell
npm run dev
```

## Begin using Atomizer

Start adding Atomizer classes to your code base, an example `+page.svelte` file.

```html
<h1 className="Fw(b) Fz(2rem)">Welcome!</h1>
```
