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

## Install Atomizer

Install the Atomizer npm package into your project. [Concurrently](https://www.npmjs.com/package/concurrently), is not required but it makes it easier to run multiple scripts at the same time.

```shell
npm install atomizer concurrently -D
```

## Create your Atomizer config

Create an `atomizer.config.js` config file so that Atomizer can parse your Remix files.

```js
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
    ],
}
```

## Update your run scripts

You will need to execute Atomizer when you start your app. The easiest way to do this is by updating the run scripts to execute Atomizer along side other Remix tasks. Make the following modifications to your project's `package.json` file.

```json
{
  "scripts": {
    "build": "npm run build:css && remix build",
    "build:css": "atomizer -o app/styles/atomizer.css -w",
    "dev": "concurrently \"npm run build:css\" \"run-p \"dev:*\"\""
    // ...
  }
}
```

<p class="noteBox info">We recommend adding <code>app/styles</code> to your <code>.gitignore</code>.</p>

## Add the Atomizer CSS

Add the `atomizer.css` file to the Remix `app/root.jsx` file.

```js
import atomizer from './styles/atomizer.css';

export function links() {
    return [{ rel: 'stylesheet', href: atomizer }];
}
```

## Start your build process

Run your build setup as configured in your project's `package.json`.

```shell
npm run dev
```

## Begin using Atomizer

Start adding Atomizer classes to your code base, an example `app/routes/index.jsx` file.

```js
export default function Index() {
    return (
        <h1 className="Fw(b) Fz(2rem)">Welcome to Remix</h1>
    );
}
```
