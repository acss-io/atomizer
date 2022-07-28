---
section: docs
layout: docs
title: Installation
---

[Atomizer](https://github.com/acss-io/atomizer) is a tool ([npm](https://www.npmjs.com/package/atomizer), [github](https://github.com/acss-io/atomizer)) for generating **Atomic CSS (ACSS)** stylesheets.

Atomizer creates CSS style declarations based on [Atomizer classes](./guides/atomizer-classes.html) it finds in your project. This means that your style sheets are always up-to-date *without the need for writing a single CSS declaration manually* <sup>[[1]](#footnote)</sup><a id="footnote-1"></a>.

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
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="/dist/output.css" rel="stylesheet">
    </head>
    <body>
        <h1 class="Fz(30px)">Hello world!</h1>
    </body>
</html>
```

Run atomizer on the file to generate the CSS *(NOTE: the command will not finish because the `--watch` command is listening for changes)*:

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

### Build

So how do you integrate Atomizer into your project? You can use Grunt, Gulp, WebPack, Make, Graddle, or any other task runner/build system you&#39;d like.

Here are the build projects we support:

- Grunt: <a href="https://www.npmjs.com/package/grunt-atomizer">grunt-atomizer</a>
- Webpack: <a href="https://www.npmjs.com/package/webpack-atomizer-loader">webpack-atomizer-loader</a>

and here some community supported libraries:

- Clojure : [boot-atomizer](https://github.com/azizzaeny/boot-atomizer) ([Boot-Task](https://github.com/boot-clj/boot) for clojurescript)
- Gulp: [gulp-atomizer](https://www.npmjs.com/package/gulp-atomizer)
- Nuxt: [nuxt-atomizer](https://github.com/dword-design/nuxt-atomizer)

If you create your own, please [let us know!](/support.html)

#### Example: Grunt

If you&#39;re using the [Grunt](http://gruntjs.com/) task runner, you can use [grunt-atomizer](http://github.com/acss-io/grunt-atomizer) to configure and execute Atomizer:

```js
// use grunt-contrib-watch for changes and run tasks
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
```

### Browser

#### Atomizer Web

For a simple web interface to help you learn about Atomizer and <b class="Fw(b)">ACSS</b>, check out [Atomizer Web](https://pankajparashar-zz.github.io/atomizer-web/), a tool built by <a href="https://twitter.com/pankajparashar" title="@pankajparashar on Twitter">Pankaj Parashar</a>. Paste some markup or <b class="Fw(b)">ACSS</b> classes and Atomizer Web will show you the rendered CSS. The tool also gives you access to the configuration where you can set your own break-points, variables, and more.

#### Chrome

Chrome extensions built and maintained by the Atomizer community

- [Atomic CSS Dev Tools](https://chrome.google.com/webstore/detail/atomic-css-devtools/dpkcndhnanpdlppppalhnhfbokhicdmi/related?hl=en)
- [Atomic CSS Helper](https://chrome.google.com/webstore/detail/atomic-css-helper/gpickgadladepnjlmaipnekafhpmangd?hl=en)

---

<div id="footnote"></div>

1. This is true for non-custom classes <sub>[[↩]](#footnote-1)</sub>

