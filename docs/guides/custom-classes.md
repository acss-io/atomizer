---
description: How to define custom Atomizer classes or helpers for your project.
layout: docs
section: docs
title: Custom classes
---

Atomizer allows you to create custom classes for your project. Custom classes can be helpful when you want to share a common group of styles or a utility across your project.

The Atomizer [cli](../installation.html#atomizer-cli) provides a `--rules [file]` option, which maps to a file of available rules.

## Creating a rules file

Create a rule file, `atomizer.rules.js`, in the following format (*NOTE: You can name this whatever you want*):

```js
// atomizer.rules.js
module.exports = [
    {
        allowParamToValue: true,
        id: 'loud',
        matcher: 'Loud',
        name: 'Loud',
        styles: {
            'color': '#ff0000',
            'font-size': '$0',
            'font-weight': 'bold',
        },
        type: 'helper'
    }
];
```

<div class="noteBox info">Check out the <a href="#rule-options">Rule options</a> for details on all available options.</div>

The `matcher` field is the class name you will use in your HTML; it **must** be a unique name:

```html
<h1 class="Loud(50px)">Hello World!</h1>
```

Add this file to the Atomizer cli command:

```shell
atomizer index.html --rules atomizer.rules.js -o out.css
```

Atomizer will merge your custom class rules with the default rule set and produce the Atomizer CSS.

## Rule options

Atomizer and helper classes share many of the same rules properties. The sections below explain each property.

### allowParamToValue

- **Type**: `boolean`
- **Default**: `false` (`true` for Helper classes)
- **Required**: `false`

Enable the rule to pass a value with a supported unit of measure if the param uses unit values (e.g., `px`, `em`, etc).

```js
// enables <div class="Fsize(10px)"></div>
{
    allowParamToValue: true,
    matcher: 'Fsize',
    styles: {
        'font-size': '$0',
    },
}
```

### arguments

- **Type**: `array<object>`
- **Default**: `undefined`
- **Required**: `false`

An array of objects which define the named arguments for the class.

```js
// enables <h1 class="Fs(i)">Hello world!</h1>
{
    type: 'pattern',
    name: 'Font style',
    matcher: 'Fs',
    styles: {
        'font-style': '$0'
    },
    arguments: [{
        'n': 'normal',
        'i': 'italic',
        'o': 'oblique'
    }]
}
```

The name of the argument can be passed into the class name (e.g., `FS(i)`) to produce the correct style.

#### Multiple arguments

A rule can define multiple argument `objects` in the arguments `array`. Each one maps to a separate style value. This is useful for styles that support multiple values, see the example below:

```js
{
    type: 'pattern',
    name: 'Transform origin',
    matcher: 'Trfo',
    allowParamToValue: true,
    styles: {
        'transform-origin': '$0 $1'
    },
    arguments: [{
        't': 'top',
        'end': '__END__',
        'bottom': 'bottom',
        'start': '__START__',
        'c': 'center'
    }, {
        't': 'top',
        'end': '__END__',
        'bottom': 'bottom',
        'start': '__START__',
        'c': 'center'
    }]
}
```

#### Arguments with `allowParamToValue`

`allowParamToValue` can be enabled to also pass in a unit of measure to the class. This is useful for classes like `H` (height) that support named arguments and a unit of measurement:

```js
{
    type: 'pattern',
    name: 'Height',
    matcher: 'H',
    'allowParamToValue': true,
    styles: {
        'height': '$0'
    },
    'arguments': [{
        '0': '0',
        'a': 'auto',
        'av': 'available',
        'bb': 'border-box',
        'cb': 'content-box',
        'fc': 'fit-content',
        'maxc': 'max-content',
        'minc': 'min-content'
    }]
}
```

```html
<h1 class="H(20px)">Hello world!</h1>
```

### description

- **Type**: `string`
- **Default**: `undefined`
- **Required**: `false`

Used by helpers internally for documentation purposes. Not required, but good to define for future documentation purposes.

### id

- **Type**: `string`
- **Default**: `undefined`
- **Required**: `false`

Used internally by Atomizer for documentation purposes.

### link

- **Type**: `string`
- **Default**: `undefined`
- **Required**: `false`

Used by the Reference page for helpers to link to internal or external sources.

### matcher

- **Type**: `string`
- **Default**: `undefined`
- **Required**: `true`

A unique class name for the rule. This **MUST** be unique to avoid conflicts with Atomizer class names.

### name

- **Type**: `string`
- **Default**: `undefined`
- **Required**: `false`

Used internally by Atomizer for documentation purposes.

### noParams

- **Type**: `boolean`
- **Default**: `undefined`
- **Required**: `false`

Used internally by Atomizer to reduce the time complexity when building the grammar rules. If a class will not accept unit measurement parameters, then enabling this flag can help Atomizers performance.

### rules

- **Type**: `object`
- **Default**: `undefined`
- **Required**: `false`

An `object` of custom rules used by helper classes. `rules` can be defined if the helper class needs to define additional Atomizer rules not available by default. Each `key` of the object is the CSS rule. The `value` of the property is an `object` of `key` `value` CSS styles.

```js
{
    type: 'helper',
    name: 'Ellipsis',
    description: 'Use to create a one-liner with ellipsis (in browsers that support text-overflow:ellipsis).',
    link: 'https://acss.io/guides/helper-classes.html#-ell-ellipsis-',
    matcher: 'Ell',
    noParams: true,
    styles: {
        'max-width': '100%',
        'white-space': 'nowrap',
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'hyphens': 'none'
    },
    rules: {
        '.Ell:after': {
            'content': '"."',
            'font-size': 0,
            'visibility': 'hidden',
            'display': 'inline-block',
            'overflow': 'hidden',
            'height': 0,
            'width': 0
        }
    }
}
```

### shorthand

- **Type**: `boolean`
- **Default**: `undefined`
- **Required**: `false`

Whether or not the rule is a [shorthand](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties) CSS property (i.e., a property that sets the value of multiple other CSS properties simultaneously).

```js
{
    type: 'pattern',
    name: 'Flex',
    matcher: 'Fx',
    'shorthand': true,
    'allowParamToValue': false,
    styles: {
        'flex': '$0'
    },
    'arguments': [{
        'a': 'auto',
        'n': 'none'
    }]
}
```

### styles

- **Type**: `object`
- **Default**: `undefined`
- **Required**: `true`

Defines the CSS key value properties used by the class name. Multiple properties can be specified depending on the purpose of the custom class or helper.

```js
{
    type: 'pattern',
    name: 'Font size',
    matcher: 'Fz',
    allowParamToValue: true,
    styles: {
        'font-size': '$0'
    }
}
```

#### RTL support

To support [RTL languages](./syntax.html#rtlltr), special tokens are available (`__START__` and `__END__`) to dynamically change the value if the `--rtl` cli option is used.

```js
{
    type: 'pattern',
    name: 'Border X',
    matcher: 'Bdx',
    allowParamToValue: false,
    styles: {
        'border-__START__': '$0',
        'border-__END__': '$0'
    },
}
```

At build time, Atomizer will dynamically replace the `__START__` or `__END__` token with the proper `left` or `right` value based on the presence of the `--rtl` option.

### type

- **Type**: `string`
- **Default**: `undefined`
- **Required**: `true`

The type of rule; available options:

- `helper`: Used for customer helper classes
- `pattern`: Used for custom Atomizer classes
