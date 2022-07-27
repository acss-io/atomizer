---
section: docs
layout: docs
title: Configuration
---

Learn how to configure your Atomizer usage.

By default, no configuration file is necessary for Atomizer to run. Atomizer will automatically parse the files passed in and generate the CSS file for you. However, to use Atomizer to its fullest potential, you may wish to customize Atomizer to fit your requirements.

## Create a configuration file

The following command will create an empty config file in the directory of your choosing:

```shell
touch atomizer.config.js
```

<p class="noteBox info">The name of the file is arbitrary as this will be passed into Atomizer at build time.</p>

Add the following contents to the `atomizer.config.js` file:

```js
module.exports = {
    breakPoints: {},
    classNames: {},
    custom: {},
};
```

How you incorporate this file depends on your setup, please refer to the [installation guide](./installation.html) for more info. Next, read the config options below to fill out the configuration.

## Configuration options

### Breakpoints

The `breakpoints` section defines the [media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) your templates will use when using the [breakpoint suffix](./guides/syntax.html#breakpoint_identifier) or [automatic breakpoints](./guides/syntax.html#automatic-breakpoints).

```js
module.exports = {
    breakPoints: {
        sm: '@media screen and (min-width: 700px)',
        md: '@media screen and (min-width: 999px)',
        lg: '@media screen and (min-width: 1200px)',
    },
};
```

Read more about how break points work from our [Breakpoints guide](./breakpoints.html).

### Classnames

`classNames` is the list of Atomizer class names your project uses. You do not have to explictly declare them like this since Atomizer can parse any file and create this list automatically for you.  However, you always have the option to explicitly declare classnames if you find it helpful for your project.

```js
module.exports = {
    classNames: [
        'H(uh)',
        'C(primary)',
    }
}
```

### Custom

The `custom` section maps custom suffixes to values and it is specially useful for theming or things that you need to change globally in many different Atomizer classes. These key/value pairs map to the custom suffixes in `classNames`.

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

Custom values may also be substituted into one another via the `#{}` syntax, which are resolved recursively.

 ```js
module.exports = {
    custom: {
        padding: '#{standardPadding} 5px #{standardPadding} 20px',
        standardPadding: '10px',
    }
};
 ```
