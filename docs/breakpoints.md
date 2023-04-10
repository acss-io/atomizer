---
description: Learn how to build responsively designed websites with Atomizer.
layout: docs
section: docs
title: Breakpoints
---

You can define your breakpoints as [Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries) or [Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries) in the config object and then apply those breakpoints to your Atomizer classes through <a href="{% link guides/syntax.md %}#breakpoint_identifier">the breakpoint suffix</a> or automatic breakpoints.

## Setting up Breakpoints

Pick the breakpoint names and whichever media or container queries you want, for example:

```js
breakPoints: {
    sm: '@media screen and (min-width: 700px)',
    md: '@media screen and (min-width: 999px)',
    lg: '@media screen and (min-width: 1200px)',
}
```

Breakpoints may be named anything you want, as long as the characters are valid for use in classnames.

## Usage

There are two ways to make use of breakpoints in your Atomizer classes: explicitly and automatically.

### Explicit Breakpoints

Append `--<breakpoint name>` to any Atomic class to associate that styling with the breakpoint of your choice. For example, `D(b)--sm` and `C(#000)--md` will create the following rules in the related media queries:

```css
@media screen and (min-width:700px) {
    #atomic .D(b)--sm {
        display: block;
    }
}

@media screen and (min-width:999px) {
    #atomic .C(#000)--md {
        color: #000;
    }
}
```

### Automatic Breakpoints

[Variable values]({% link guides/syntax.md %}#variable-values) and [custom classes]({% link guides/atomizer-classes.md %}#aliases) may also be mapped to breakpoints in configuration to simplify the process of applying styles. In this case, you would not be required to use the [breakpoint identifier]({% link guides/syntax.md %}#breakpoint_identifier) suffix on your class.

Simply set the value of your variable or custom class identifier to an object containing breakpoint names as the keys:

```js
custom: {
    'P(logo)': {
        default: '10px',
        sm: '12px',
        md: '14px',
        lg: '20px'
    },
    gutter: {
        default: '1em',
        sm: '3em',
    }
}
```

In this example, the class `P(logo)` will style a box with a `padding` of `10px` below the first breakpoint, but then this padding will become:

-   `12px` inside the `sm` breakpoint
-   `14px` inside the `md` breakpoint
-   `20px` inside the `lg` breakpoint

Likewise, any class that uses the variable `gutter` will receive different values depending on the currently active breakpoint.

## Media Queries

You can use multiple classes to have styles applied in the context of various breakpoints, for example:

```html
<div class="D(f)--sm Fxw(w)">
    <div class="W(50%)--sm W(25%)--lg">1</div>
    <div class="W(50%)--sm W(25%)--lg">2</div>
    <div class="W(50%)--sm W(25%)--lg">3</div>
    <div class="W(50%)--sm W(25%)--lg">4</div>
</div>
```

-   Below `700px`, the boxes are displayed on top of each other (`D(f)--sm` on applies over this width)
-   Above `999px`, the boxes are displayed on 2 rows, 2 by 2 (`W(50%)--sm`)
-   Above `1200px`, the boxes are displayed side-by-side, on a single row (`W(25%)--lg`)

<p class="noteBox info">The breakpoints for the example below have been chosen so you can see the changes within this page. <strong>Give it a try, resize your viewport!</strong></p>

<div class="D(f)--sm Fxw(w)">
    <div class="Bxz(bb) W(50%)--sm W(25%)--lg P(20px) Bgc(--color-blue-4)">1</div>
    <div class="Bxz(bb) W(50%)--sm W(25%)--lg P(20px) Bgc(--color-blue-3)">2</div>
    <div class="Bxz(bb) W(50%)--sm W(25%)--lg P(20px) Bgc(--color-blue-2)">3</div>
    <div class="Bxz(bb) W(50%)--sm W(25%)--lg P(20px) Bgc(--color-blue-1)">4</div>
</div>

## Container Queries

Container queries use the same syntax as media queries, since you are able to define what the rule is, just ensure the names are different to the media query rules.

```js
breakPoints: {
    sm: '@media screen and (min-width: 700px)',
    mw300: '@container (max-width: 300px)',
},
```

Same logic as above - append `--<breakpoint name>` to any Atomizer class to associate that styling with the breakpoint of your choice. For example, `Fz(1rem)--mw300` will create the following rule in the related container query:

```css
@container (max-width: 300px) {
    #atomic .Fz(1rem)--mw300 {
        font-size: 1rem;
    }
}
```

### Named containers

[named containers](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries#naming_containment_contexts) require an additional config step.

<p class="noteBox info">The custom value of `width300` matches the named container.</p>

```js
breakPoints: {
    contmw300: '@container width300 (max-width: 300px)',
},
custom: {
    width300: 'width300',
},
```

You can define a container and its type by using the `ContType()` and `ContName()` classnames, using the named container above, your markup would look something like this:

```html
<div class="ContType(is) ContName(width300)">
    <h2 class="Fz(2rem) Fz(1rem)--contmw300">Heading</h2>
</div>
```

This will output the following CSS

```css
@container width300 (max-width: 300px) {
  .Fz(1rem)--contmw300 {
    font-size: 1rem;
  }
}
```

This example shows how you could change layout and properties in a named container.

```html
<div class="ContType(is) ContName(width300)">
    <div class="D(f) Fxd(r) Fxd(c)--contmw300 Gp(20px)">
        <div class="W(75%) W(100%)--contmw300">
            <h1 class="Fz(2.5rem) Fz(1.5rem)--contmw300 ">Resize me</h1>
            ...
        </div>
    </div>
</div>
```

-   Below `300px` on the container `div` the boxes are displayed on top of each other (`Fxd(c)--contmw300`)
-   Below `300px` on the container `div` the headline size will be (`Fz(1.5rem)`)

<p class="noteBox info">The example below is resizable <strong>Give it a try, resize by dragging the bottom right corner of the rounded box</strong></p>

<div class="ContType(is) ContName(width300) W(50%) Mx(a) P(10px) Bdc(--color-blue-1) Bdw(1px) Bds(s) Bdrs(5px) Rsz(h) Ov(a)">
    <div class="D(f) Fxd(r) Fxd(c)--contmw300 Gp(20px)">
        <div class="W(25%) W(100%)--contmw300 Mih(100%) H(40px)--contmw300 Bgc(--color-blue-4)"></div>
        <div class="D(f) Gp(20px) Fxd(c) W(75%) W(100%)--contmw300">
            <h1 class="C(--color-blue-1) Fz(2.5rem) Fz(1.5rem)--contmw300 M(0)">Resize me</h1>
            <div class="P(10px) Bgc(--color-blue-1)"></div>
            <div class="P(10px) Bgc(--color-blue-1)"></div>
        </div>
    </div>
</div>
