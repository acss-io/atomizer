---
description: How to use Atomizer to enable dark mode on your site.
layout: docs
section: docs
title: Dark Mode
---

Dark mode has become a standard feature across many websites. OS level support and the [`prefers-color-scheme`] CSS media feature has made it even easier to enable dark mode.

Atomizer does not provide out of the box support for dark mode because it is not required. You can combine the `prefers-color-scheme` CSS preference and the existing [`context`] class support to add dark mode to your website.

Continue reading to learn how to use each concept.

## Browser Basics

All modern browsers [support](https://caniuse.com/prefers-color-scheme) the [`prefers-color-scheme`] CSS media feature. The feature works by defining or overwriting an existing CSS property via the `@media (prefers-color-scheme: dark) {}` directive.

In the example below, we set an initial style for a `div` with the `.intro` class. We then overwrite the style when the OS or user-agent preference is set to `dark`.

```html
<div class="intro">Hello World!</div>
```

```css
/* initial style */
.intro {
    background: #eee;
    color: black;
}

/* overwrite colors for dark mode */
@media (prefers-color-scheme: dark) {
    .intro {
        background: #333;
        color: white;
    }
}
```

<div class="D(g) Gtc(twoColEvenGrid) Gp(20px)">
    <div class="Bgc(#eee) C(#000) P(10px) Bdrs(10px)">Hello World!</div>
    <div class="Bgc(#333) C(#fff) P(10px) Bdrs(10px)">Hello World!</div>
</div>

## With Atomizer

In Atomizer, you can leverage the [`context`] class syntax to apply styles based on the existance of a class earlier in the HTML tree.

In the example below, the default styles for the `div` would be `background-color: #eee;` and `color: #000;`.

```html
<div class="Bgc(#eee) C(#000)">Hello World!</div>
```

You can prepend a class, `dark` (_the name is abitrary and can be whatever you want_) to classes which you want to override in dark mode.

```diff
- <div class="Bgc(#eee) C(#000)">Hello World!</div>
+ <div class="Bgc(#eee) C(#000) dark_Bgc(#333) dark_C(#fff)">Hello World!</div>
```

When the `dark` class is added earlier in the HTML tree, the styles will change to `background-color: #333;` and `color: #fff`.

```html
<body class="dark">
    <div class="Bgc(#eee) C(#000) dark_Bgc(#333) dark_C(#fff)">Hello World!</div>
</body>
```

<p class="noteBox info">By default, nothing will happen, even if the user has the dark mode scheme enabled. You would need to add the <code>dark</code> class to your website to "enable" the dark mode classes. Read the <a href="#enabling-dark-mode">Enabling Dark Mode</a> section for tips on how to add the class to your project.</p>

## Optimizing with CSS Variables

You could further optimize the approaches mentioned above by combining with [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) (a.k.a CSS variables) to manage the color changes via the `prefers-color-scheme` media feature. Building off the examples above, you would move the color definitions to an external style sheet managed outside of Atomizer.

The example below defines the default colors in the `:root` block and their `dark` mode overrides via the `prefers-color-scheme` block.

```css
/* define the default colors */
:root {
    --background-color: #eee;
    --text-color: #000;
}

/* overrides for dark mode */
@media (prefers-color-scheme: dark) {
    :root {
        --background-color: #333;
        --text-color: #fff;
    }
}
```

In your HTML, you would use the CSS variables instead of the hardcoded hex values.

```html
<div class="Bgc(--background-color) C(--text-color)">Hello World!</div>
```

The benefit of this approach is that you use the built-in `prefers-color-scheme` browser feature and reduce the number of classes you need to manage in the markup.

## Enabling Dark Mode

If the [CSS variable approach](#optimizing-with-css-variables) is not possible for your website, then you will need to output the class in your HTML tree to enable dark mode. The method in which you add the class will depend on your website architecture.

### Server-side Rendered

A server-side rendered website creates the HTML markup on the server. Based on the [`Request`] context of the user, the HTML markup can be personalized. For dark mode support, this means you could add the `dark` class to your HTML based on some preference from the user.

There are a few different ways to do this, we briefly describe them below.

#### [HTTP Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)

This requires some JavaScript in the browser (outside the scope of this guide) to allow the user to choose their preference (`light` or `dark` mode). Once selected, you store their preference in a `Cookie` that can be sent on subsequent requests to your site.

Your server-side code would then read the color-scheme preference from the cookie and output the `dark` class based on this preference.

#### [Client Hints](https://developer.mozilla.org/en-US/docs/Web/HTTP/Client_hints)

A set of HTTP headers that you can request from the browser to get information about device and user preferences. The `Sec-CH-Prefers-Color-Scheme` header is relatively new (as of this writing) and modern browser support is ongoing. However, for those browsers that support it, you can get access to the users color-scheme preference via this HTTP header on the server.

Your server-side code would initially request this header from the browser. which would return the users preference. As you generate the server-side markup, based on this header, you can determine whether to output the `dark` class.

Please check out the this [web.dev article](https://web.dev/user-preference-media-features-headers/) for more information.

### Static-site Generated

A statically generated site creates its markup at build time. The HTML markup is not personalized for the user and therefore not able to adapt to a users preference.

<p class="noteBox info">This Atomizer website is statically generated and leverages the <a href="#optimizing-with-css-variables">CSS variables</a> approach to toggle between light and dark mode.</p>

Since you cannot modify the markup on the server, you can leverage JavaScript to add the `dark` class to your HTML. The code below uses the [`Window.matchMedia()`] API to check the users preferred color scheme. If `dark` is chosen, then the `dark` class is added to the `<html>` node.

```html
<head>
    <!-- website css ... -->
    <script>
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
    }
    </script>
</head>
```

This script would be added in your websites `<head>` tag to ensure the `dark` class is added as soon as possible to avoid a flash of light to dark style.

### Client-side Rendered

Client-side rendered websites generate their markup in the browser. Similar to the [Static-site Generated](#static-site-generated) approach, the [`Window.matchMedia()`] API can be used to add the `dark` class.

The JavaScript you write to add the class will depend on your framework of choice and is outside the scope of this document. In general, you will need to add the `dark` class to the component or JavaScript file that outputs the `<html>` element in your project.

[`prefers-color-scheme`]: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme

[`context`]: {% link guides/syntax.md %}#context

[`window.matchmedia()`]: https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
[`request`]: https://developer.mozilla.org/en-US/docs/Web/API/Request
