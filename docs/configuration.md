---
description: Learn how to configure Atomizer for your project's needs.
layout: docs
section: docs
title: Configuration
---

Atomizer will automatically parse the content files passed into the cli; no configuration is required. However, in many cases, you may need to customize Atomizer to fit your project's requirements. This guide will help define the configuration options available for Atomizer; each section below is optional.

## Create a configuration file

By default, Atomizer will look for an optional `atomizer.config.js` file at the root of your project where you can define your customizations. Create a file named `atomizer.config.js` at the root of your project (or a directory of your choosing) with the following contents:

```js
module.exports = {
    content: [],
    breakPoints: {},
    custom: {},
};
```

As mentioned above, Atomizer will automatically find this configuration file when executed. However, if you decided to locate the config file in a different directory, then you can specify that location via the `--config` option:

```shell
atomizer --config configs/atomizer.config.js
```

Next, read the config sections below to learn more about the configuration options available.

## Configuration options

### Content

The `content` section lets you define the paths to any files that may contain Atomizer classes:

```js
module.exports = {
    content: [
        './components/**/*.js',
        './templates/**/*.html',
    },
}
```

Read more about how to use the `content` property in our [Content guide]({% link content.md %}).

### Breakpoints

The `breakpoints` section defines the [media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) your templates will use when using the [breakpoint suffix]({% link guides/syntax.md %}#breakpoint_identifier) or [automatic breakpoints]({% link guides/syntax.md %}#automatic-breakpoints).

```js
module.exports = {
    breakPoints: {
        sm: '@media screen and (min-width: 700px)',
        md: '@media screen and (min-width: 999px)',
        lg: '@media screen and (min-width: 1200px)',
    },
};
```

Read more about how breakpoints work from our [Breakpoints guide]({% link breakpoints.md %}).

### Custom

The `custom` section maps custom suffixes to values, and it is beneficial for theming or things you need to change globally in many different Atomizer classes. These key/value pairs map to the custom suffixes in `classNames`.

For example, given the configuration below:

```js
module.exports = {
    custom: {
        uh: '79px',
        primary: '#f6a1e1',
    },
    classNames: [
        'H(uh)',
        'C(primary)',
    },
};
```

The `H(uh)` will get `height: 79px` and `C(primary)` will get color: `#f6a1e1`.

#### Substitution

Custom values may also be substituted into one another via the `#{}` syntax, which are resolved recursively.

```js
module.exports = {
   custom: {
       padding: '#{standardPadding} 5px #{standardPadding} 20px',
       standardPadding: '10px',
   }
};
```

### Classnames

`classNames` is the list of Atomizer class names your project uses. You do not have to declare them like this since Atomizer can parse any file and create this list automatically for you. However, you always have the option to explicitly declare classnames if you find them helpful for your project.

```js
module.exports = {
    classNames: [
        'H(uh)',
        'C(primary)',
    }
}
```

### Exclude

This is the opposite of the [classNames](#classnames). There are cases that you may want to tell Atomizer to ignore class names already defined in `classNames`. This is useful when classes are automatically added by the parser or when you want to create different atomic CSS files from the same set of `classNames`.

```js
module.exports = {
    exclude: [
        'Fl(end)',
    ];
}
```
