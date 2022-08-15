---
description: Quickly learn how to use Atomizer with our simple examples.
layout: docs
section: docs
title: Quick Start
---

Atomizer works by scanning HTML, JS and any other text file for [Atomizer classes](./guides/atomizer-classes.html). The classes are tranformed into style declarations and outputted to a CSS file. Add this generated CSS file to your site and you are done!

We have created a few examples that you can check out before [setting up](./installation.html) Atomizer on your own site. Please follow the instructions below.

## Playground

To try our example Atomic project, clone the [atomizer](https://github.com/acss-io/atomizer) repo:

```shell
git clone git@github.com:acss-io/atomizer.git
```

then run our simple example dev server:

```shell
npm install
npm run examples
```

This should open a page in your browser at [http://localhost:3000](http://localhost:3000)

Now try this:

-   Open the index page in a text editor
-   Edit, add, or remove **Atomizer** classes in the markup (get help from the [reference page](/reference.html))
-   Save the file

The browser should reload the page, displaying all your changes. Check the [atomic.css](http://localhost:3000/css/atomic.css) file to see that it only contains the rules for the classes that are being used in the project.

<p class="noteBox info">Atomizer allows you to define breakpoints, variables/custom values, and predefined classes in a JSON-formatted config file. Take a look at <a href="https://github.com/acss-io/atomizer/blob/master/examples/atomizer.config.js">this example</a> for more information on how configuration is used in Atomizer.</p>

## Next Steps

From here, [install](./installation.html) Atomizer in your site, learn about [Atomic CSS Architecture](/thinking-in-atomic.html), read the [FAQ](/frequently-asked-questions.html), learn more about [Atomizer](/guides/atomizer-classes.html) classes and their [syntax](/guides/syntax.html).

Please visit the [Atomizer](https://github.com/acss-io/atomizer) repository for more information.
