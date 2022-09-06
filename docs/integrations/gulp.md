---
description: A simple guide to setup Atomizer with Gulp.
layout: docs
section: docs
title: Gulp
---

## Install the package

[gulp-atomizer](https://github.com/acss-io/gulp-atomizer) is a Gulp plugin for Atomizer. Install the package in your project first:

```shell
npm i gulp-atomizer -D
```

## Update the config

Add the Atomizer plugin to your Gulp config.

```js
import gulp from 'gulp';
import acss from 'gulp-atomizer';

gulp.task('acss', function() {
    return gulp.src('./*.html')
        .pipe(acss())
        .pipe(gulp.dest('dist'));
});
```

## Start your build process

Run your build setup as configured in your project's `package.json`.

```shell
npm run dev
```

## Begin using Atomizer

Add the generated PostCSS CSS to your template, then start adding Atomizer classes to your markup:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/dist/main.css" />
    </head>
    <body>
        <h1 class="Fw(b) Fz(2rem)">Welcome!</h1>
    </body>
</html>
```
