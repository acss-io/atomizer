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

## Install the PostCSS plugin

For a [SvelteKit](https://kit.svelte.dev/) project, the [`postcss-atomizer`](https://github.com/acss-io/atomizer/tree/main/packages/postcss-atomizer) library makes it easy to setup Atomizer.

```shell
npm i postcss-atomizer -D
```

## Enable PostCSS

Update your `svelte.config.js` file, to import `vitePreprocess` to enable processing `<style>` blocks as PostCSS.

```js
import { vitePreprocess } from '@sveltejs/kit/vite';

const config = {
    // ...
    preprocess: vitePreprocess(),
}
```

## Create your Atomizer config

Create the `./atomizer.config.cjs` config file so that Atomizer can parse your SvelteKit files.

```js
module.exports = {
    content: [
        './src/**/*.{html,js,svelte,ts}',
    ],
}
```

## Create the PostCSS config

Create the `./postcss.config.cjs` file to configure the Atomizer plugin.

```js
const atomizer = require('postcss-atomizer');

module.exports = {
    plugins: [
        atomizer({
            config: './atomizer.config.cjs',
        }),
    ],
};
```

## Add the CSS file

Create an a stub `./src/app.css` file with a generic comment (Svelte will not build properly if its empty).

```css
/** todo */
```

## Import the CSS

Add a new file `./src/routes/+layout.svelte` which includes the CSS file:

```html
<script>
    import "../app.css";
</script>

<slot />
```

## Start your build process

Run your build setup as configured in your project's `package.json`.

```shell
npm run dev
```

## Begin using Atomizer

Start adding Atomizer classes to the `./src/routes/+page.svelte` file.

```html
<h1 class="Fw(b) Fz(2rem)">Welcome!</h1>
```
