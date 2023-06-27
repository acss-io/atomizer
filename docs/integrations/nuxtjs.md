---
description: A simple guide to setup Atomizer with NuxtJS.
layout: docs
section: docs
title: NuxtJS
---

## Create a new project

If you do not have a project setup already, you can create a new one using the [Create Nuxt App](https://nuxtjs.org/docs/get-started/installation/) CLI.

```shell
npx create-nuxt-app my-app
cd my-app
```

## Install the module

[nuxt-atomizer](https://github.com/dword-design/nuxt-atomizer) is a third party module that adds Atomizer CSS framework support to your NuxtJS app.

```shell
npm i nuxt-atomizer -D
```

## Update the NuxtJS config

Configure your `nuxt.config.js` with the new module.

```js
export default {
    modules: [
        'nuxt-atomizer',
    ],
}
```

## Create your Atomizer config

Make sure Atomizer can parse your NuxtJS files in your `./atomizer.config.js` file.

```js
module.exports = {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
    ],
}
```

## Start your build process

Run your build setup as configured in your project's `./package.json`:

```shell
npm run dev
```

## Begin using Atomizer

Start adding Atomizer classes to your code base:

```html
<template>
    <h1 className="Fw(b) Fz(2rem)">Welcome!</h1>
</template>
```
