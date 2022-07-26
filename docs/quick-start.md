---
section: docs
layout: docs
title: Quick Start
---

This page is here to help you quickly set up an example site powered by [Atomizer](/guides/atomizer.html).

## Playground

To create a basic Atomic project, clone the [atomizer](https://github.com/acss-io/atomizer) repo:

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

- Open the index page in a text editor
- Edit, add, or remove **Atomizer** classes in the markup (get help from the [reference page](/reference))
- Save the file

The browser should reload the page, displaying all your changes. Check the [atomic.css](http://localhost:3000/css/atomic.css) file to see that it only contains the rules for the classes that are being used in the project.

## Configuration

Atomizer allows you to define breakpoints, variables/custom values, and predefined classes in a JSON-formatted config file. Take a look at [this example](https://github.com/acss-io/atomizer/blob/master/examples/config/atomizer.js) for more information on how configuration is used in Atomizer.

## Next Steps

From here, learn about [Atomic CSS Architecture](/thinking-in-atomic.html), read the [FAQ](/frequently-asked-questions.html), learn more about [Atomizer](/guides/acss-classes.html) classes and their [syntax](/guides/syntax.html).

Please visit the [Atomizer](https://github.com/acss-io/atomizer) repository for more information.
