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
npm install
```

## Install the plugin

For a [Next.js](https://nextjs.org/) project, the [`webpack`](https://github.com/acss-io/atomizer/tree/main/packages/atomizer-plugins#webpack) plugin can be used from our [`atomizer-plugins`](https://github.com/acss-io/atomizer/tree/main/packages/atomizer-plugins) package to compile Atomizer classes.

```shell
npm i atomizer-plugins -D
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

## Update the Next.js config

Then configure your `next.config.mjs` like to add the webpack plugin.

```js
import { webpack } from 'atomizer-plugins';
import atomizerConfig from './atomizer.config.js';

const atomizer = webpack({
    /* options */
    config: atomizerConfig,
    outputFile: 'atomizer.css',
});

export default {
    reactStrictMode: true,
    webpack: (config) => {
        config.plugins.push(atomizer);
        return config;
    }
}
```

Configuration information and examples are available in the [`atomizer-plugins` repository](https://github.com/acss-io/atomizer/tree/main/packages/atomizer-plugins).

## Start your build process

Run your build setup as configured in your project's `package.json`.

```shell
npm run dev
```

## Begin using Atomizer

Start adding Atomizer classes to your code base.

```js
export default function Home() {
    return (
        <h1 className="Fw(b) Fz(2rem)">Welcome!</h1>
    )
}
```
