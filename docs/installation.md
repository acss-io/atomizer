---
description: Install the Atomizer cli or one of the many supported framework integrations.
layout: docs
section: docs
title: Installation
---

[Atomizer](https://github.com/acss-io/atomizer) is a tool ([npm](https://www.npmjs.com/package/atomizer), [github](https://github.com/acss-io/atomizer)) for generating **Atomic CSS (ACSS)** stylesheets.

Atomizer creates CSS style declarations based on [Atomizer classes](./guides/atomizer-classes.html) it finds in your project. This means that your style sheets are always up-to-date _without the need for writing a single CSS declaration manually_ <sup>[[1]](#footnote)</sup><a id="footnote-1"></a>.

This guide explains various solutions to setup Atomizer in your website. Have an integration we do not cover? Please [let us know](https://github.com/acss-io/atomizer/discussions). If you want to see Atomizer in action, please check out the [quick start guide](./quick-start.html).

## Atomizer CLI

Atomizer is an [npm package](https://www.npmjs.com/package/atomizer) you can install from the [npm registry](https://www.npmjs.com/). This package includes a cli program which will generate CSS after parsing your website files. Assuming you have Node.js and npm installed, run the following command in a new or existing project:

```bash
npm i atomizer
```

Next, create a simple html file, `index.html` and copy the following HTML into it:

```html
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="/dist/output.css" rel="stylesheet">
    </head>
    <body>
        <h1 class="Fz(30px)">Hello world!</h1>
    </body>
</html>
```

Run atomizer on the file to generate the CSS _(NOTE: the command will not finish because the `--watch` command is listening for changes)_:

```shell
atomizer -o ./dist/output.css --watch index.html index.html
```

A new CSS file at `./dist/output.css` will be created with the following content:

```css
.Fz(30px) {
  font-size: 30px;
}
```

Open the `index.html` in your browser to see your fancy page.

Now, let's say you decided to change the color of the text to red, add the following class to the `h1` tag:

```diff
<!doctype html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="/dist/output.css" rel="stylesheet">
    </head>
    <body>
-       <h1 class="Fz(30px)">Hello world!</h1>
+       <h1 class="Fz(30px) C(#ff0000)">Hello world!</h1>
    </body>
</html>
```

Then Atomizer would update the style sheet with the following:

```css
.C(#ff0000) {
  color: #ff0000;
}
.Fz(30px) {
  font-size: 30px;
}
```

## Integrations

So how do you integrate Atomizer into your project? You can use Rollup, WebPack, Make, Graddle, or any other task runner/build system you&#39;d like. Follow the one of the sections below based on your projects requirements.

If you create your own, please [edit this page]({{ page.githubDocsPath }}{{ page.path }}) so we can share it with the community.

### Browser

#### Chrome

Chrome extensions built and maintained by the Atomizer community

-   [Atomic CSS Dev Tools](https://chrome.google.com/webstore/detail/atomic-css-devtools/dpkcndhnanpdlppppalhnhfbokhicdmi/related?hl=en)
-   [Atomic CSS Helper](https://chrome.google.com/webstore/detail/atomic-css-helper/gpickgadladepnjlmaipnekafhpmangd?hl=en)

### esbuild

An [esbuild](https://esbuild.github.io/) plugin is available as part of the [`atomizer-plugins`](https://github.com/acss-io/atomizer/tree/main/packages/atomizer-plugins) package.

First install the plugin in your project:

```shell
npm i atomizer-plugins -D
```

Then configure your `esbuild.config.js` like so:

```js
import { build } from 'esbuild';
import { esbuild } from 'atomizer-plugins';

const atomizer = esbuild({
    /* options */
    config: atomizerConfig,
    outputFile: 'atomizer.css',
});

build({
    // ... esbuild config
    plugins: [atomizer],
});
```

Configuration information and examples are available in the [`atomizer-plugins` repository](https://github.com/acss-io/atomizer/tree/main/packages/atomizer-plugins).

### Grunt

If you&#39;re using the [Grunt](http://gruntjs.com/) task runner, you can use [grunt-atomizer](https://github.com/acss-io/atomizer/tree/main/packages/grunt-atomizer) to configure and execute Atomizer.

First install the dependency in your project:

```shell
npm i grunt-atomizer grunt-contrib-watch -D
```

Then configure your `Gruntfile.js` with the following tasks:

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
            dest: './atomic.css'
        }
    ]
}

grunt.registerTask('dev', ['watch:dev']);
```

### Gulp

[gulp-atomizer](https://github.com/acss-io/gulp-atomizer) is a Gulp plugin for Atomizer.

First install the dependency in your project:

```shell
npm i gulp-atomizer -D
```

Then configure your project like so:

```js
import gulp from 'gulp';
import acss from 'gulp-atomizer';

gulp.task('acss', function() {
    return gulp.src('./*.html')
        .pipe(acss())
        .pipe(gulp.dest('dist'));
});
```

Check out the [repository](https://github.com/acss-io/gulp-atomizer) for more detailed information.

### Next.js

For a [Next.js](https://nextjs.org/) project, the [`webpack`](https://github.com/acss-io/atomizer/tree/main/packages/atomizer-plugins#webpack) plugin can be used from our [`atomizer-plugins`](https://github.com/acss-io/atomizer/tree/main/packages/atomizer-plugins) package to compile Atomizer classes.

First install the plugin in your project:

```shell
npm i atomizer-plugins -D
```

Then configure your `next.config.mjs` like so:

```js
import { webpack } from 'atomizer-plugins';

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

### Node.js

You can leverage the same libraries that the [cli](#atomizer-cli) uses to integrate Atomizer in your project. The Atomizer npm package exports an Atomizer class that you can use to parse config and generate Atomizer CSS.

```js
import Atomizer from 'atomizer';

const defaultConfig = {
    breakPoints: {
        sm: '@media(min-width:750px)',
        md: '@media(min-width:1000px)',
        lg: '@media(min-width:1200px)'
    },
    custom: {
        border: '2px dotted #f00'
    }
};

// Initialize the class
const atomizer = new Atomizer({verbose: true});

// Parse text to find Atomizer CSS classes
const foundClasses = atomizer.findClassNames('<div class="P(10px) M(20%) Bd(border)--sm"></div>');

// Generate Atomizer configuration from an array of Atomic classnames
const finalConfig = atomizer.getConfig(foundClasses, defaultConfig);

// Generate Atomic CSS from configuration
const css = atomizer.getCss(finalConfig);
```

### Nuxt

[nuxt-atomizer](https://github.com/dword-design/nuxt-atomizer) is a third party module that adds Atomizer CSS framework support to a Nuxt.js app.

First install the module in your project:

```shell
npm i nuxt-atomizer -D
```

Then configure your project like so:

```js
export default {
    modules: [
        'nuxt-atomizer',
    ],
}
```

Take a look at the [project repository](https://github.com/dword-design/nuxt-atomizer#options) for configuration options.

### Rollup.js

A [Rollup](https://rollupjs.org/) plugin is available as part of the [`atomizer-plugins`](https://github.com/acss-io/atomizer/tree/main/packages/atomizer-plugins) package.

First install the plugin in your project:

```shell
npm i atomizer-plugins -D
```

Then configure your `rollup.config.js` like so:

```js
import { rollup } from 'atomizer-plugins';

const atomizer = rollup({
    /* options */
    config: atomizerConfig,
    outputFile: 'atomizer.css',
});

export default {
    // ... rollup config
    plugins: [atomizer],
};
```

### Svelte

A [vite](https://vitejs.dev/) plugin is available as part of the [`atomizer-plugins`](https://github.com/acss-io/atomizer/tree/main/packages/atomizer-plugins) package which you can use to configure your [Svelte](https://svelte.dev/) project.

First install the plugin in your project:

```shell
npm i atomizer-plugins -D
```

Then configure your `vite.config.js` like so:

```js
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { vite } from 'atomizer-plugins';

const atomizerPlugin = vite({
    config: atomizerConfig,
    outputFile: 'atomizer.css',
});

export default defineConfig(() => {
    return {
        plugins: [atomizerPlugin, svelte()],
    };
});
```

Configuration information and examples are available in the [`atomizer-plugins` repository](https://github.com/acss-io/atomizer/tree/main/packages/atomizer-plugins).

### Vite.js

A [vite](https://vitejs.dev/) plugin is available as part of the [`atomizer-plugins`](https://github.com/acss-io/atomizer/tree/main/packages/atomizer-plugins) package.

First install the plugin in your project:

```shell
npm i atomizer-plugins -D
```

Then configure your `vite.config.js` like so:

```js
import { defineConfig } from 'vite';
import { vite } from 'atomizer-plugins';

const atomizerPlugin = vite({
    config: atomizerConfig,
    outputFile: 'atomizer.css',
});

export default defineConfig(() => {
    return {
        plugins: [atomizerPlugin],
    };
});
```

Configuration information and examples are available in the [`atomizer-plugins` repository](https://github.com/acss-io/atomizer/tree/main/packages/atomizer-plugins).

### Webpack

We offer two options for integrating with webpack, a [loader](#loader) and a [plugin](#plugin).

#### Loader

[`webpack-atomizer-loader`](https://github.com/acss-io/atomizer/tree/main/packages/webpack-atomizer-loader) is a [webpack loader](https://webpack.js.org/concepts/loaders/) that can parse your source code for Atomizer classes and generate a CSS file.

First install the loader in your project:

```shell
npm i webpack-atomizer-loader -D
```

Then configure your `webpack.config.js` file like so:

```js
import { resolve } from 'path';
import autoprefixer from 'autoprefixer';

module.exports = {
    // ...
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'webpack-atomizer-loader',
                        options: {
                            configPath: resolve('./atomCssConfig.js'),
                            minimize: true,
                            postcssPlugins: [autoprefixer],
                        },
                    },
                ],
            }
        ],
    },
}
```

You can fine more detailed configuration information is available in the [project repository](https://github.com/acss-io/atomizer/tree/main/packages/webpack-atomizer-loader).

#### Plugin

Leverage our [`atomizer-plugins`](https://github.com/acss-io/atomizer/tree/main/packages/atomizer-plugins) package to integrate our [webpack plugin](https://webpack.js.org/concepts/plugins/) in your project.

First install the dependency in your project:

```shell
npm i atomizer-plugins -D
```

Then configure your `webpack.config.js` file like so:

```js
import { webpack } from 'atomizer-plugins';

const atomizer = webpack({
    /* options */
    config: atomizerConfig,
    outputFile: 'atomizer.css',
});

module.exports = {
    // ... webpack config
    plugins: [atomizer],
};
```

Configuration information and examples are available in the [`atomizer-plugins` repository](https://github.com/acss-io/atomizer/tree/main/packages/atomizer-plugins).

---

<div id="footnote"></div>

1. This is true for non-custom classes <sub>[[↩]](#footnote-1)</sub>
