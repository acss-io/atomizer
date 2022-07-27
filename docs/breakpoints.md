---
section: docs
layout: docs
title: Breakpoints
---

You can define your breakpoints as media queries in the config object and then apply those breakpoints to your Atomizer classes through <a href="/guides/syntax.html#breakpoint_identifier">the breakpoint suffix</a> or automatic breakpoints.

## Setting up Breakpoints

Pick the breakpoint names and media queries you want, for example:

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

[Variable values](/guides/syntax.html#variable-values) and [custom classes](/guides/atomizer-classes.html#aliases) may also be mapped to breakpoints in configuration to simplify the process of applying styles. In this case, you would not be required to use the [breakpoint identifier](/guides/syntax.html#breakpoint_identifier) suffix on your class.

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

- `12px` inside the `sm` breakpoint
- `14px` inside the `md` breakpoint
- `20px` inside the `lg` breakpoint

Likewise, any class that uses the variable `gutter` will receive different values depending on the currently active breakpoint.

## Examples

When using explicit breakpoints, use multiple classes to have styles applied in the context of various breakpoints, for example:

```html
   <div class="D(ib)--sm W(50%)--sm W(25%)--lg P(20px) Bgc(#0280ae.5)">1</div><!--
--><div class="D(ib)--sm W(50%)--sm W(25%)--lg P(20px) Bgc(#0280ae.6)">2</div><!--
--><div class="D(ib)--sm W(50%)--sm W(25%)--lg P(20px) Bgc(#0280ae.8)">3</div><!--
--><div class="D(ib)--sm W(50%)--sm W(25%)--lg P(20px) Bgc(#0280ae)">4</div>
```

- Below 700px, the boxes are displayed on top of each other (`div` are block-level elements)
- Above 999px, the boxes are displayed on 2 rows, 2 by 2 (`D(ib)--sm` + `W(50%)--sm`)
- Above 1200px, the boxes are displayed side-by-side, on a single row (`D(ib)--sm` + `W(25%)--lg`)

<p class="noteBox info">The breakpoints for the example below have been chosen so you can see the changes within this page. <strong>Give it a try, resize your viewport!</strong></p>

### Result

<p data-height="265" data-theme-id="12469" data-slug-hash="jExMYr" data-default-tab="result" data-user="thierry" class='codepen'>See the Pen <a href='http://codepen.io/thierry/pen/jExMYr/'>jExMYr</a> by Thierry (<a href='http://codepen.io/thierry'>@thierry</a>) on <a href='http://codepen.io'>CodePen</a>.
