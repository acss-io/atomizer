---
description: Install the Atomizer cli or one of the many supported framework integrations.
layout: docs
section: docs
title: Installation
---

This guide explains various ways to setup Atomizer in your project. You install the [CLI](#atomizer-cli) directly for ultimate control or integrate with one of our many [bundle](#bundler-integrations) and [framework](#framework-integrations) integrations.

Have an integration we do not cover? Please [let us know](https://github.com/acss-io/atomizer/discussions). If you want to see Atomizer in action, please check out the [quick start guide]({% link quick-start.md %}).

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

## Bundler Integrations

Follow the one of the bundler guides below to integrate Atomizer into your project.

<ul class="D(f) List(n)! Pstart(0)! Gp(.5rem) Gp(1rem)--sm Ovx(s) Mt(2rem)">
    {% for library in site.data.frameworks %}
        {% if library.type == 'bundler' %}
            <li class="Pos(r) Mx(0px) Mb(20px) Mb(0px)--md P(1rem) Bdrs(5px) Bgc(boxColorLight) Bgc(boxColorDarker):h Ta(c)">
                <div class="W(60px) H(60px) Mb(10px)">{{ library.logo }}</div>
                <a href="{{ library.link | escape }}" class="D(b) C(--color-text) Td(n):h">
                    {{ library.name }}
                    <u class="StretchedBox"></u>
                </a>
            </li>
        {% endif %}
    {% endfor %}
</ul>

## Framework Integrations

Atomizer easily integrates with many of the most popular JavaScript frameworks, read one of the guides below to integrate Atomizer into your project.

<ul class="D(f) List(n)! Pstart(0)! Gp(.5rem) Gp(1rem)--sm Ovx(s) Mt(2rem)">
    {% for library in site.data.frameworks %}
        {% if library.type == 'framework' %}
            <li class="Pos(r) Mx(0px) Mb(20px) Mb(0px)--md P(1rem) Bdrs(5px) Bgc(boxColorLight) Bgc(boxColorDarker):h Ta(c)">
                <div class="W(60px) H(60px) Mb(10px)">{{ library.logo }}</div>
                <a href="{{ library.link | escape }}" class="D(b) C(--color-text) Td(n):h">
                    {{ library.name }}
                    <u class="StretchedBox"></u>
                </a>
            </li>
        {% endif %}
    {% endfor %}
</ul>

## Browser Integrations

Chrome extensions built and maintained by the Atomizer community

-   [Atomic CSS Dev Tools](https://chrome.google.com/webstore/detail/atomic-css-devtools/dpkcndhnanpdlppppalhnhfbokhicdmi/related?hl=en)
-   [Atomic CSS Helper](https://chrome.google.com/webstore/detail/atomic-css-helper/gpickgadladepnjlmaipnekafhpmangd?hl=en)
