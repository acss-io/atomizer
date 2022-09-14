---
description: Learn how to configure content sources for Atomizer.
layout: docs
section: docs
title: Content Configuration
---

The `content` section of your `atomizer.config.js` file is where you configure the paths to all your HTML templates, JavaScript components, and other source files containing Atomizer class names.

```js
module.exports = {
    content: [
        './components/**/*.js',
        './docs/**/*.md',
        './templates/**/*.html',
    ],
};
```

## Configuring paths

Atomizer works by scanning all your project's source files for Atomizer classes, then creating a CSS file of used styles. To ensure Atomizer can properly find all of the classes, you can leverage the `content` section of the `atomizer.config.js` config file:

```js
module.exports = {
    content: [
        './components/**/*.js',
        './docs/**/*.md',
        './templates/**/*.html',
    ],
};
```

Each path is configured as a [glob pattern](<https://en.wikipedia.org/wiki/Glob_(programming)>) to avoid repetitively listing out each file manually. Atomizer uses the popular [glob](https://www.npmjs.com/package/glob) library to parse the path patterns.

The glob library supports many different patterns to make it easy to configure your project files. Please check out their [usage guide](https://www.npmjs.com/package/glob#Usage) for more information.

<p class="noteBox info">Paths are relative to your project root, not your <code>atomizer.config.js</code> file, so if your <code>atomizer.config.js</code> file is in a different location, you will have to write your paths relative to the root of your project.</p>

### Best practices

#### Be specific

Be as specific as possible when defining your paths. Generic patterns like the one below could lead to extra CSS that your project may not use:

```js
module.exports = {
    content: [
        './**/*.js',
    ],
};
```

#### Avoid `node_modules`

When possible, avoid globbing within the `node_modules` directory as this could increase the time it takes to parse files and also pull in styles that you may not use:

```js
module.exports = {
    content: [
        './node_modules/**/*.js',
    ],
};
```

However, if you need to include Atomizer classes from a package dependency or shared component, you can use a specific path to ensure only the files in that project are parsed:

```js
module.exports = {
    content: [
        './node_modules/foo/components/*js',
    ],
};
```

#### Avoid CSS

Never include CSS in your path patterns. CSS could cause issues as Atomizer could potentially produce additional styles:

```js
module.exports = {
    content: [
        './css/**/*.css',
    ],
};
```

### How class parsing works

Atomizer parses any text document you define in your `atomizer.config.js` configuration file. The files parsed are not executed or compiled. We use simple regular expression pattern matching to find known Atomizer classes:

```html
<div class="D(f) Jc(sb)">
    <div class="W(100px) H(100px) Lh(100px) Fz(30px) Ta(c)">Box 1</div>
    <div class="W(100px) H(100px) Lh(100px) Fz(30px) Ta(c)">Box 2</div>
    <div class="W(100px) H(100px) Lh(100px) Fz(30px) Ta(c)">Box 3</div>
    <div class="W(100px) H(100px) Lh(100px) Fz(30px) Ta(c)">Box 4</div>
</div>
```

As mentioned above, parsing is not limited to HTML documents. Atomizer classes defined in JavaScript, Markdown, and any other text-based format can be parsed by Atomizer:

```js
const foo = document.createElement('foo');
createElement.classList.add('D(b)');
```

### Dynamic class names

Atomizer will only find statically written class names. Statically defined class names are easily parseable and do not require run-time execution or compilation to be parsed. In other words, avoid creating your Atomizer class names dynamically as they will not be parsed.

In the example below, the strings `C(#ff0000)` and `C(#00ff00)` are dynamically created based on run time logic; Atomizer will not find the classes.

{% raw %}

```jsx
<div class="C(#{{ error ? 'ff0000' : '00ff00' }})"></div>
```

{% endraw %}

The correct way would be to make sure the complete string is written in the file:

{% raw %}

```html
<div class="{{ error ? 'C(#ff0000)' : 'C(#00ff00)' }}"></div>
```

{% endraw %}

This ensures Atomizer can adequately parse the files.

## Explicit classes

If you need to specify Atomizer class names that are not present in any of your source paths, then you can use the [classNames]({% link configuration.md %}#classnames) property from the `atomizer.config.js` file to manual define the classes:

```js
module.exports = {
    classNames: [
        'C(#000)',
    }
}
```

Read more about this in our [configuration guide](./configuration.html#classnames).
