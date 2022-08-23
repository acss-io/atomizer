---
description: How to define custom Atomizer classes or helpers for your project.
layout: docs
section: docs
title: Custom classes
---

Atomizer allows you to create custom classes for your project. Custom classes can be helpful when you want to share a common group of styles or a utility across your project.

The Atomizer [cli](../installation.html#atomizer-cli) provides a `--rules [file]` option, which maps to a file of available rules.

## Creating a rules file

Create a rule file, `atomizer.rules.js`, in the following format (_NOTE: You can name this whatever you want_):

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

The sections below explain each rule property available to configure. _(\*)denotes a required property._

### allowFractions

-   **Type**: `boolean`
-   **Default**: `true`
-   **Required**: `false`

Allows Atomizer to calculate the quotient of a given fraction into a percentage (e.g. `W(1/2`) -> `W(50%)`). Some CSS properties like `aspect-ratio` will want to maintain the fraction and can disable the calculation by changing `allowFractions` to `false`.

```json
{
    allowFractions: false,
    matcher: 'Ar',
    styles: {
        'aspect-ratio': '$0',
    },
}
```

```html
<div class="Ar(16/9)"></div>
```

### allowParamToValue

-   **Type**: `boolean`
-   **Default**: `false` (`true` for Helper classes)
-   **Required**: `false`

If the class uses unit values (e.g., `px`, `em`, etc), enable this option to pass a value with a supported unit of measure. The `value` of the style property will be the replacement token `$0`, which Atomizer will replace with the declared value.

```json
{
    allowParamToValue: true,
    matcher: 'Fsize',
    styles: {
        'font-size': '$0',
    },
}
```

```html
<div class="Fsize(10px)"></div>
```

### arguments

-   **Type**: `array<object>`
-   **Default**: `undefined`
-   **Required**: `false`

An `array` of objects used to specify predefined values for the class. Each index in the `array` maps to the arguments passed. For each object, keys are names given to the predefined values and values are the CSS values of the predefined value. The `styles` object defines the `key` as the CSS property name and the value as tokens (`$0`) that will be replaced by the corresponding argument object index.

In the following example, the first argument `object` in the `array`, would replace the `$0` token in the `font-style` property.

```json
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

The name of the argument can be passed into the class name (e.g., `FS(i)`) to produce the correct style. At build time, Atomizer will read the `i` keyword and replace it with the `italic` value from the arguments object.

```html
<h1 class="Fs(i)">Hello world!</h1>
```

#### Multiple arguments

For styles that support multiple values, a rule can define multiple argument `objects` in its arguments `array`. Each `object` mapping to a separate style token value.

In the example below, the `arguments` array takes two `objects` (they are the same in this example but that is not a requirement). The `styles.key` property defines the CSS property name and the value as tokens (e.g., `$0 $1`) that will be replaced by the corresponding argument object index.

In other words, the first object in the array will replace the `$0` token, the second object will replace the `$1` token and so on.

```json
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

Therefore, the following HTML:

```html
<div class="Trfo(start, bottom)"></div>
```

Will translate to `transform-origin: left bottom`.

#### Arguments with `allowParamToValue`

`allowParamToValue` can be enabled to also pass in a unit of measure to the class. This is useful for classes like `H` (height) that support named arguments and a unit of measurement:

```json
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

-   **Type**: `string`
-   **Default**: `undefined`
-   **Required**: `false`

Used by helpers internally for documentation purposes. Not required, but good practice to define.

### id

-   **Type**: `string`
-   **Default**: `undefined`
-   **Required**: `false`

Used internally by Atomizer for documentation purposes.

### link

-   **Type**: `string`
-   **Default**: `undefined`
-   **Required**: `false`

A `URL` used by the <a href="../reference.html">Reference</a> page for helpers to link to internal or external sources.

### matcher\*

-   **Type**: `string`
-   **Default**: `undefined`
-   **Required**: `true`

The portion of the CSS class that maps to the unique identification of the class. This **MUST** be unique to avoid conflicts with Atomizer class names.

### name

-   **Type**: `string`
-   **Default**: `undefined`
-   **Required**: `false`

Name of the rule/helper. Used internally by Atomizer for documentation purposes.

### noParams

-   **Type**: `boolean`
-   **Default**: `undefined`
-   **Required**: `false`

Used internally by Atomizer to reduce the time complexity when building the grammar rules. If a class will not accept unit measurement parameters, then enabling this flag can help Atomizers performance.

### rules

-   **Type**: `object`
-   **Default**: `undefined`
-   **Required**: `false`

An `object` of custom rules used by helper classes. `rules` can be defined if the helper class needs to define additional Atomizer rules not available by default. Each `key` of the object is the CSS rule. The `value` of the property is an `object` of `key` `value` CSS styles.

```json
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

-   **Type**: `boolean`
-   **Default**: `undefined`
-   **Required**: `false`

Whether or not the rule is a [shorthand](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties) CSS property (i.e., a property that sets the value of multiple other CSS properties simultaneously).

```json
{
    type: 'pattern',
    name: 'Flex',
    matcher: 'Fx',
    shorthand: true,
    allowParamToValue: false,
    styles: {
        'flex': '$0'
    },
    'arguments': [{
        'a': 'auto',
        'n': 'none'
    }]
}
```

### styles\*

-   **Type**: `object`
-   **Default**: `undefined`
-   **Required**: `true`

A CSS object where keys are CSS properties and values are CSS values. If a param is used you can retrieve it using `$<index>`. Multiple properties can be specified depending on the purpose of the custom class or helper.

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

### type\*

-   **Type**: `string`
-   **Default**: `undefined`
-   **Required**: `true`

The type of rule; available options:

-   `helper`: Used for customer helper classes
-   `pattern`: Used for custom Atomizer classes
