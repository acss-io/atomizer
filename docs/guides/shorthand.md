---
description: How Atomizer handles CSS shorthand notation.
layout: docs
section: docs
title: Shorthand notation
---

Atomizer generally does not offer shorthand notation (e.g., `M(5px,0,0,0)`) because this would increase the number of selectors or declarations in the style sheet (i.e., create bloat.)

For example, `border-width/style/color` can be specified in any order:

-   _Bd(1px,solid,#000)_
-   _Bd(1px,#000,solid)_
-   _Bd(solid,#000,1px)_
-   _Bd(solid,1px,#000)_
-   _Bd(#000,1px,solid)_
-   _Bd(#000,solid,1px)_

The above creates 6 different rules for the exact same styling (a _solid 1px black_ border). While the tool could be smart and assign all those classes to the _same_ declaration, you&#39;d still end up with more bytes than is necessary:

```css
.Bd(1px,solid,#000),
.Bd(1px,#000,solid),
.Bd(solid,#000,1px),
.Bd(solid,1px,#000),
.Bd(#000,1px,solid),
.Bd(#000,solid,1px) {
    border: 1px solid #000;
}
```

It would also be possible to enforce order (i.e., `width,style,color`) to prevent such duplication, but you&#39;d still end up with a lot of redundancy. For example:

-   _Bd(1px,solid,#000)_
-   _Bd(1px,solid,#ccc)_
-   _Bd(1px,solid,#555)_
-   _Bd(2px,solid,#000)_
-   _Bd(3px,solid,#000)_
-   _Bd(1px,dotted,#000)_

Would result in:

-   4 duplicate declarations for `border-width`
-   5 duplicate declarations for `border-style`
-   4 duplicate declarations for `border-color`

...either through duplicate declarations or selector grouping:

```css
.Bd(1px,solid,#000),
.Bd(1px,solid,#ccc),
.Bd(1px,solid,#555),
.Bd(1px,dotted,#000) {
    border-width: 1px;
}

.Bd(1px,solid,#000),
.Bd(1px,solid,#ccc),
.Bd(1px,solid,#555),
.Bd(2px,solid,#000),
.Bd(3px,solid,#000) {
    border-style: solid;
}

.Bd(1px,solid,#000),
.Bd(2px,solid,#000),
.Bd(3px,solid,#000),
.Bd(1px,dotted,#000) {
    border-color: #000;
}
```

## Convenience and helper classes

### `X`/`Y` notation

Even though Atomizer does not allow shorthand notation, many classes support &quot;`x`/`y` notation&quot; which applies the same styling on opposite edges. For example:

-   `Mx(a)` for `margin-left:auto; margin-right:auto;`
-   `Py(5px)` for `padding-top:5px; padding-bottom:5px;`

### Border helper classes

When it comes to border styling, initial values exist for `width` and `color` but many authors may still want to set all 3 values: `width`, `color`, and `style`. To make things a bit less verbose, Atomizer offers a set of <a href="helper-classes.html#bd-borders">helper classes for borders</a> which set `style` to `solid` and `width` to `1px` (as a default).

This allows you to use a single class to create a single pixel border that either &quot;inherits&quot; text color or can be combined with an Atomic class for border-color (e.g., `Bd Bdc(#fff)`).

In case `solid` and `1px` are not the default style you&#39;d prefer, but you still want to use the border helper classes, you can simply redefine those classes in your own style sheet, using the rules below:

```css
.Bd,
.BdX,
.BdY,
.BdT,
.BdEnd,
.BdB,
.BdStart {
    border-style: <style>;
}
.Bd {
    border-width: <width>;
}
.BdX {
    border-right-width: <width>;
    border-left-width: <width>;
}
.BdY {
    border-top-width: <width>;
    border-bottom-width: <width>;
}
.BdT {
    border-top-width: <width>;
}
.BdEnd {
    border-right-width: <width>;
}
.BdB {
    border-bottom-width: <width>;
}
.BdStart {
    border-left-width: <width>;
}
```

<p class="noteBox info">If you&#39;ve chosen to namespace your Atomizer classes, be sure to add the namespace to the above rules.</p>
