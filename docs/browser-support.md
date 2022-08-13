---
description: Learn what browsers Atomizer supports.
layout: docs
section: docs
title: Browser Support
---

Atomizer supports all modern browsers and is tested on the latest stable versions of Chrome, Edge, Firefox and Safari. There is no support for any version of Internet Explorer.

In general, Atomizer will only support features that have reached the CSS spec recommendation status. Support for new or "in draft" CSS features will be avoided until properly tested and incorporated in stable browser versions.

If you are unsure if a particular CSS feature is ready for production, use the [Can I Use?](https://caniuse.com/) website for in depth browser support information.

## Vendor Prefixing

Some CSS properties require [Vendor Prefixes](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix) for experimental or nonstandard CSS features. In rare cases that Atomizer supports these new features, the [Atomizer CLI](./installation.html#atomizer-cli) will automatically output the vendor prefixes for you.

If you are not using the CLI and prefer a different [build integration](./installation.html#build), you can leverage the [Autoprefixer](https://github.com/postcss/autoprefixer) npm package to automatically add vendor prefixes to the outputted Atomizer CSS file.

Setting up Autoprefixer is easy, just run:

```shell
npm i -D autoprefixer
```

For example, integration with PostCSS is as simple as this:

```js
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```

Follow their [usage guide](https://github.com/postcss/autoprefixer#usage) to integrate with the build tool of your choice.

Lastly, Autoprefixer leverages the [BrowsersList](https://github.com/browserslist/browserslist) database to automatically add vendor prefixes based on your websites browser support configuration, for Atomizer's documentation website, it uses the following configuration:

```text
> 1%, not op_mini all
```
