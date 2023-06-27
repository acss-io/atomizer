---
description: A simple guide to setup Grunt with PostCSS.
layout: docs
section: docs
title: Grunt
---

## Install the package

Install [grunt-atomizer](https://github.com/acss-io/atomizer/tree/main/packages/grunt-atomizer) to configure and execute Atomizer.

```shell
npm i grunt-atomizer grunt-contrib-watch -D
```

## Update the config

Then configure your `./Gruntfile.js` with the following tasks.

```js
// load the task
grunt.task.loadNpmTasks('grunt-atomizer');
grunt.task.loadNpmTasks('grunt-contrib-watch');

// use grunt-contrib-watch to watch for changes and run tasks
watch: {
    dev: {
        options: {
            livereload: true
        },
        files: [
            './examples/**/*.html'
        ],
        tasks: ['atomizer']
    }
},
atomizer: {
    options: {
        // set a context to increase specificity
        namespace: '#atomic',
        // pass a base config file
        configFile: './config/manual-config.js',
        // augment classNames in the base config file
        config: {
            classNames: ['D(b)']
        }
        // the final config file used by the tool will be written
        // in the following file:
        configOutput: 'tmp/config.json',
    },
    files: [
        {
            // parse your project's html files to automatically add
            // found ACSS classes to your config
            src: ['./src/*.html'],
            // generate the css in the file below
            dest: './dist/atomizer.css'
        }
    ]
}

grunt.registerTask('dev', ['watch:dev']);
```

## Start your build process

Run your build setup as configured in your project's `./package.json`.

```shell
npm run dev
```

## Begin using Atomizer

Add the generated PostCSS CSS to your template, then start adding Atomizer classes to your markup.

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/dist/atomizer.css" />
    </head>
    <body>
        <h1 class="Fw(b) Fz(2rem)">Welcome!</h1>
    </body>
</html>
```
