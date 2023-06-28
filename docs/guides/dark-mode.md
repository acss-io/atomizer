---
description: How to use Atomizer to enable dark mode on your site.
layout: docs
section: docs
title: Dark Mode
---

Dark mode has become a standard feature across many websites. OS level support and the [`prefers-color-scheme`] CSS media feature have made it even easier to enable dark mode.

Atomizer does not provide out-of-the-box support for dark mode because it is not required. You can combine the `prefers-color-scheme` CSS preference and the existing [`context`] class support to add dark mode to your website.

Continue reading to learn how to use each concept.

## Browser Basics

All modern browsers [support](https://caniuse.com/prefers-color-scheme) the [`prefers-color-scheme`] CSS media feature. The feature defines or overwrites an existing CSS property via the `@media (prefers-color-scheme: dark) {}` directive.

In the example below, we set an initial style for a `div` with the `.intro` class. We overwrite the style when the OS or user-agent preference is `dark`.

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

## Using CSS Variables

You could further optimize the approaches mentioned above by using [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) (a.k.a CSS variables) to manage the color changes via the `prefers-color-scheme` media feature.

The example below defines the default colors in the `:root` block, and their `dark` mode overrides via the `prefers-color-scheme: dark` block.

```css
/* define the default colors */
:root {
    --background-color: #eee;
    --text-color: #000;
}

/* using @media override for dark mode */
@media (prefers-color-scheme: dark) {
    :root {
        --background-color: #333;
        --text-color: #fff;
    }
}

/* alternatively, you can add a "dark" class earlier in the HTML tree to overwrite the variables for dark mode */
.dark {
    --background-color: #333;
    --text-color: #fff;
}

/* initial style */
.intro {
    background: var(--background-color);
    color: var(--text-color);
}
```

The benefit of this approach is that you can reuse colors across many different CSS properties without having to redeclare color overrides multiple times.

## With Atomizer

Building off the examples in previous sections, the Atomizer classes can leverage the existing CSS variables to add style to elements.

```html
<div class="Bgc(--background-color) C(--text-color)">Hello World!</div>
```

Re-using the same CSS variables makes applying styles consistently across your CSS files and Atomizer class usage easy.

## Using Context Classes

In most cases, the previous section will work for your project. However, if you want more control over when dark mode is enabled, you can use the [`context`] class syntax to apply styles based on the existence of a class earlier in the HTML tree.

Say, for example, you want to give the user the ability to toggle dark mode via a drop-down menu on your page. You may have markup with default styles declared, as seen below.

```html
<div class="Bgc(#eee) C(#000)">Hello World!</div>
```

You can prepend an Atomizer class, `dark` (_the name is arbitrary and can be whatever you want_), to styles you want to override in dark mode.

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

<p class="noteBox info">By default, without the <code>dark</code> class on the page, the dark mode classes will not be applied (even if the user has the dark mode scheme enabled). You would need to add the <code>dark</code> class to your website to "enable" the dark mode classes. Read the <a href="#enabling-dark-mode">Enabling Dark Mode</a> section for tips on how to add the class to your project.</p>

## Enabling Dark Mode

If the [CSS variable approach](#optimizing-with-css-variables) is not possible for your website, you will need to output the class in your HTML tree to enable dark mode. How you add the class will depend on your website architecture.

### Server-side Rendered

A server-side rendered website creates the HTML markup on the server. Based on the [`Request`] context of the user, the HTML markup can be personalized. For dark mode support, you could add the `dark` class to your HTML based on some preference from the user.

There are a few different ways to do this; we briefly describe them below.

#### [HTTP Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)

Client-side JavaScript (outside the scope of this guide) allows the user to choose their preference (`light` or `dark` mode). Once selected, you store their choice in a `Cookie` sent on subsequent requests to your site.

Your server-side code would then read the color-scheme preference from the cookie and output the `dark` class based on this preference.

#### [Client Hints](https://developer.mozilla.org/en-US/docs/Web/HTTP/Client_hints)

You can request a set of HTTP headers from the browser to get information about the device and user preferences. The `Sec-CH-Prefers-Color-Scheme` header is relatively new (as of this writing), and modern browser support is ongoing. However, for those browsers that support it, you can access the user's color-scheme preference via this HTTP header on the server.

Your server-side code would initially request this header from the browser, which would return the user's preference. As you generate the server-side markup, you can determine whether to output the `dark` class based on this header.

Please check out this [web.dev article](https://web.dev/user-preference-media-features-headers/) for more information.

### Static-site Generated

A statically generated site creates its markup at build time. Unpersonalized HTML markup is delivered and will not be adapted to a user's preference.

<p class="noteBox info">This Atomizer website is statically generated and leverages the <a href="#optimizing-with-css-variables">CSS variables</a> approach to toggle between light and dark mode.</p>

Since you cannot modify the markup on the server, you can leverage JavaScript to add the `dark` class to your HTML. The code below uses the [`Window.matchMedia()`] API to check the user's preferred color scheme. If `dark` is chosen, the `dark` class is added to the `<html>` node.

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

Add the script in your website's `<head>` tag to guarantee the `dark` class is added as soon as possible to avoid a flash of light to dark style.

### Client-side Rendered

Client-side rendered websites generate their markup in the browser. Similar to the [Static-site Generated](#static-site-generated) approach, the [`Window.matchMedia()`] API can be used to add the `dark` class.

The JavaScript you write to add the class will depend on your framework of choice and is outside the scope of this document. In general, you will need to add the `dark` class to the component or JavaScript file that outputs your project's `<html>` element.

[`prefers-color-scheme`]: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme

[`context`]: {% link guides/syntax.md %}#context

[`window.matchmedia()`]: https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
[`request`]: https://developer.mozilla.org/en-US/docs/Web/API/Request
