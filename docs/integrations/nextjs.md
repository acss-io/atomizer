---
description: A simple guide to setup Atomizer with Next.js.
layout: docs
section: docs
title: Next.js
---

## Create a new project

If you do not have a project setup already, you can create a new one using the [Create Next App](https://nextjs.org/docs/api-reference/create-next-app) CLI.

```shell
npx create-next-app my-app
cd my-app
```

## Install the plugin

For a [Next.js](https://nextjs.org/) project, the [`postcss-atomizer`](https://github.com/acss-io/atomizer/tree/main/packages/postcss-atomizer) library makes it easy to setup Atomizer. Install the dependency first.

```shell
npm i postcss-atomizer -D
```

## Create your Atomizer config

Create an `atomizer.config.js` config file so that Atomizer can parse your JS and JSX files.

```js
module.exports = {
    content: [
        './components/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
    ],
}
```

## Create the postcss config file

In order to add the PostCSS plugin, you must create a `postcss.config.js` file at your project root. Be sure to follow the [Customizing Plugins](https://nextjs.org/docs/advanced-features/customizing-postcss-config#customizing-plugins) guide from Next.js as it requires additional steps to add non-Next.js plugins.

After following their guide, you will add the Atomizer PostCSS plugin like so.

```js
module.exports = {
    plugins: {
        'postcss-atomizer': {},
        // ...
    },
}
```

<p class="noteBox info">Plugin options are available in the <a href="https://github.com/acss-io/atomizer/tree/main/packages/postcss-atomizer">postcss-atomizer</a> README.</p>

## Start your build process

Run your build setup as configured in your project's `package.json`.

```shell
npm run dev
```

## Begin using Atomizer

Update the `pages/index.js` file to start adding Atomizer classes to your code base.

```js
export default function Home() {
    return (
        <h1 className="Fw(b) Fz(2rem)">Welcome!</h1>
    )
}
```
