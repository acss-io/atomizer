# Quick Start

This page is here to help you quickly set up an example site powered by [Atomizer](/guides/atomizer.html).

## Playground

To create a basic Atomic project, clone the [atomizer-examples](https://github.com/yahoo/atomizer-examples) repo:

```bash
git clone git@github.com:yahoo/atomizer-examples.git
```

then start:

```bash
cd atomizer-examples
npm install
npm start
```

This should open a page in your browser at [http://localhost:3000](http://localhost:3000)

Now try this:

<ul class="ul-list">
    <li>Open the index page in a text editor</li>
    <li>Edit, add, or remove Atomic classes in the markup (get help from the [reference page](/reference))</li>
    <li>Save the file</li>
</ul>

The browser should reload the page, displaying all your changes. Check the [atomic.css](http://localhost:3000/css/atomic.css) file to see that it only contains the rules for the classes that are being used in the project.

## `config.js`

Give the config a try! Open this file (which is inside `/examples/`) and edit the value of the custom class it contains. You can also check the [home page](/) for examples of how to use the config to create *breakpoints*, *variables*, and *more*.

## Next Steps

From here, learn about [Atomic CSS Architecture](/thinking-in-atomic.html), read the [FAQ](/frequently-asked-questions.html), learn more about [Atomic classes](/guides/atomic-classes.html) and their [syntax](/guides/syntax.html).

Please visit the [Atomizer](https://github.com/yahoo/atomizer) and [grunt-atomizer](https://github.com/yahoo/grunt-atomizer) repositories for more information.
