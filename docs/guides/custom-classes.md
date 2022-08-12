---
description: How to define custom classes for your project.
layout: docs
section: docs
title: Custom classes
---

Atomizer allows you to create custom Atomizer or helper classes for your project. Custom classes can be helpful when you want to share a common group of styles across your project.

The Atomizer [cli](../installation.html) provides a `--rules [file]` option which maps to a file of available rules. 

Create a rule file in the following format:

```js
module.exports = [
    {
        allowParamToValue: true,
        id: 'foo',
        matcher: 'Foo',
        name: 'Foo',
        styles: {
            'foo': '$0'
        },
        type: 'pattern'
    }
];
```

## Schema definition

## Custom atomizer class

## Custom helper class