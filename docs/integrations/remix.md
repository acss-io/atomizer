---
description: A simple guide to setup Atomizer with Remix.
layout: docs
section: docs
title: Remix
---

## Create a new project

If you do not have a project setup already, you can create a new one using Remix's [Getting Started](https://remix.run/docs/en/v1) page.

```shell
npx create-remix@latest my-app
cd my-app
```

## Install the PostCSS plugin

Remix [supports PostCSS](https://remix.run/docs/en/main/guides/styling#postcss) for CSS integration. Therefore, install the Atomizer PostCSS plugin npm package into your project.

```shell
npm install postcss-atomizer -D
```

## Create your Atomizer config

Create an `./atomizer.config.js` config file so that Atomizer can parse your Remix files.

```js
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
    ],
}
```

## Create the PostCSS config

Create the `./postcss.config.cjs` file to configure the Atomizer plugin. Make sure to enable the `postcss: true` flag in your `./remix.config.js` file.

```js
const atomizer = require('postcss-atomizer');

module.exports = {
    plugins: [
        atomizer({
            config: './atomizer.config.js',
        }),
    ],
};
```

## Start your build process

Run your build setup as configured in your project's `./package.json`.

```shell
npm run dev
```

## Begin using Atomizer

Start adding Atomizer classes to your code base, an example `./app/routes/_index.jsx` file.

```js
export default function Index() {
    return (
        <h1 className="Fw(b) Fz(2rem)">Welcome to Remix</h1>
    );
}
```
