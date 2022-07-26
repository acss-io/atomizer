---
section: docs
layout: docs
title: Helper classes
---

Helper classes are provided to help with common styling patterns. [Atomizer](/guides/atomizer.html) provides the following set of helper classes, and you can define your own through custom Atomizer rulesets.

Unlike [ACSS classes](/guides/acss-classes.html), helper classes apply multiple style declarations from a single class, but still are intended to provide a low-level, single-purpose unit of style.

## `Bd*` (Borders)

Styling elements with a border requires 3 properties [[1]](#footnote) so to make styling via classes a bit less verbose, the following helpers combine `border-style` (set to `solid`) and `border-width` (set to `1px`):

- `Bd` creates a `1px` border on all edges of a box
- `BdX` creates a `1px` border on the left and right edges of a box
- `BdY` creates a `1px` border on the top and bottom edges of a box
- `BdT` creates a `1px` border on the top edge of a box
- `BdEnd` creates a `1px` border on the right edge of a box (in a LTR context)
- `BdB` creates a `1px` border on the bottom edge of a box
- `BdStart` creates a `1px` border on the left edge of a box (in a LTR context)

You can combine one of the classes above with a `border-color` of your choice (i.e. `Bdc(#ff6347)`) to get a border color different than the text color of the box.

Example with a initial border color (and `border-width` set to `1px`):

```html
<p class="Bd C(#0280ae) P(10px)">Lorem ipsum dolor sit amet, id oratio graeco nostrum sit, latine eligendi scribentur mea ex. Tota dolorem voluptua eos at. Ei nec reque viderer facilis. Aliquip necessitatibus ex pri, pertinax atomorum ei sea. Ea omittam appetere posidonium per, te meliore volutpat duo, dolorem ponderum interpretaris sea ut.
```

<p class="Bd C(#0280ae) P(10px)">Lorem ipsum dolor sit amet, id oratio graeco nostrum sit, latine eligendi scribentur mea ex. Tota dolorem voluptua eos at. Ei nec reque viderer facilis. Aliquip necessitatibus ex pri, pertinax atomorum ei sea. Ea omittam appetere posidonium per, te meliore volutpat duo, dolorem ponderum interpretaris sea ut.</p>

Example with a custom color:

```html
<p class="Bd Bdc(#ff6347) P(10px)">Lorem ipsum dolor sit amet, id oratio graeco nostrum sit, latine eligendi scribentur mea ex. Tota dolorem voluptua eos at. Ei nec reque viderer facilis. Aliquip necessitatibus ex pri, pertinax atomorum ei sea. Ea omittam appetere posidonium per, te meliore volutpat duo, dolorem ponderum interpretaris sea ut.</p>
```

<p class="Bd Bdc(#ff6347) P(10px)">Lorem ipsum dolor sit amet, id oratio graeco nostrum sit, latine eligendi scribentur mea ex. Tota dolorem voluptua eos at. Ei nec reque viderer facilis. Aliquip necessitatibus ex pri, pertinax atomorum ei sea. Ea omittam appetere posidonium per, te meliore volutpat duo, dolorem ponderum interpretaris sea ut.</p>

The default `width` of these helpers is `1px` as it is the most common use case. If you want to use a different `width` or `style` value, then you can either

- use standard <b class="Fw(b)">ACSS</b> classes, for example: `Bdw(5px) Bds(s) Bdc(#555)`
- create a custom class via config, for example: `Bd(myCustomBorder)`
- use <strong>the same helper classes</strong> with [different values](helper-classes.htmlthe-special-case-of-border-)

<p class="noteBox info">You can find abbreviated versions of `style` keywords in [rules.js](https://github.com/acss-io/atomizer/blob/master/src/rules.js#L289).</p>

## `BfcHack` (Block-formatting context)

Most authors use `overflow:hidden` to create [block-formatting contexts](http://yuiblog.com/blog/2010/05/19/css-101-block-formatting-contexts/) but such styling may come [with side-effects](http://yuiblog.com/blog/2010/09/27/clearfix-reloaded-overflowhidden-demystified/).

For this reason, the helper class called `BfcHack` creates a block-formatting context that does not &quot;shrinkwrap&quot;. This is an approach introduced by [Nicole Sullivan and Nan Gao](http://www.stubbornella.org/content/2010/12/09/the-hacktastic-zoom-fix/#comment-18394).

<p class="noteBox warning">Note that this is a hack and may break if the content of the box is too large or if the box is next to floats.</p>

## `Cf` (Clearfix)

Use `Cf` for [clearfix](http://yuiblog.com/blog/2010/09/27/clearfix-reloaded-overflowhidden-demystified/).

## `Ell` (Ellipsis)

Use `Ell` to create a one-liner with ellipsis (in browsers that support `text-overflow:ellipsis`).

Example:

```html
<p class="Ell W(300px)">Lorem ipsum dolor sit amet, id oratio graeco nostrum sit, latine eligendi scribentur mea ex. Tota dolorem voluptua eos at. Ei nec reque viderer facilis. Aliquip necessitatibus ex pri, pertinax atomorum ei sea. Ea omittam appetere posidonium per, te meliore volutpat duo, dolorem ponderum interpretaris sea ut.</p>
```

<p class="Ell W(300px)">Lorem ipsum dolor sit amet, id oratio graeco nostrum sit, latine eligendi scribentur mea ex. Tota dolorem voluptua eos at. Ei nec reque viderer facilis. Aliquip necessitatibus ex pri, pertinax atomorum ei sea. Ea omittam appetere posidonium per, te meliore volutpat duo, dolorem ponderum interpretaris sea ut.</p>

## Hiding content from sighted users

Use the class `Hidden` if you want to hide content that should still be accessible to screen-readers:

Example:

```html
Something is <b class="Hidden">missing</b> here.
```

Something is <b class="Hidden">missing</b> here.

## `IbBox`

Boxes that are part of inline-block constructs must be styled with multiple styles. Rather than setting all of those yourself, you can simply use `IbBox` as a &quot;shorthand&quot; for:

```css
display: inline-block;
vertical-align: top;
```

```html
   <div class="IbBox W(50%) Ta(c) Bgc(#0280ae.5) C(#fff)">Box-1</div><!--
--><div class="IbBox W(50%) Ta(c) Bgc(#0280ae) C(#fff)">Box-2</div>
```

Example:

<div class="IbBox W(50%) Ta(c) Bgc(#0280ae.5) C(#fff)">Box-1</div><!--
--><div class="IbBox W(50%) Ta(c) Bgc(#0280ae) C(#fff)">Box-2</div>

<p class="noteBox info">Remember to remove the white-space between nodes when creating inline-block constructs.</p>

## `LineClamp()`

Truncating multiple lines of text in a way that works across browsers is not an easy feat. Authors usually start with `-webkit-line-clamp` + flexbox and then go from there, addressing [weird bugs](https://twitter.com/thierrykoblentz/status/443899465842176000) along the way.

With the help of Atomizer, you can use the `LineClamp()` class to &quot;pass&quot; 2 parameters:

- the number of lines you want to display
- the `max-height` to use for the box

Example:

```html
<p class="Fz(18px) Lh(1.5) LineClamp(2,54px)">Lorem ipsum dolor sit amet, id oratio graeco nostrum sit, latine eligendi scribentur mea ex. Tota dolorem voluptua eos at. Ei nec reque viderer facilis. Aliquip necessitatibus ex pri, pertinax atomorum ei sea. Ea omittam appetere posidonium per, te meliore volutpat duo, dolorem ponderum interpretaris sea ut.</p>
```

<p class="Fz(18px) Lh(1.5) LineClamp(2,54px)">Lorem ipsum dolor sit amet, id oratio graeco nostrum sit, latine eligendi scribentur mea ex. Tota dolorem voluptua eos at. Ei nec reque viderer facilis. Aliquip necessitatibus ex pri, pertinax atomorum ei sea. Ea omittam appetere posidonium per, te meliore volutpat duo, dolorem ponderum interpretaris sea ut.</p>

<p class="noteBox info">The value of `max-height` is the result of: &lt;number of lines&gt; times &lt;font-size&gt; times &lt;line-height&gt;.</p>

## `Row`

Use the class `Row` to style a box that expands to fill its container, contains floats, and <a href="http://cssmojo.com/row_for_grids/">more <span class="Hidden"> about Row</span></a>.

Example:

```html
<div class="Row Bgc(#0280ae) C(#fff)">
    <div class="Fl(start) W(300px) Ta(c) P(10px)">Box-1</div>
    <div class="Fl(end) W(300px) Ta(c) P(10px)">Box-2</div>
</div>
```

<div class="Row Bgc(#0280ae) C(#fff)">
    <div class="Fl(start) W(300px) Ta(c) P(10px)">Box-1</div>
    <div class="Fl(end) W(300px) Ta(c) P(10px)">Box-2</div>
</div>

The background of the wrapper is visible, which proves the box contains floats.

## `StretchedBox`

Use the class `StretchedBox` to stretch a box inside its &#39;containing block&#39;. This class is mapped to the following declarations:

```css
position: absolute;
top: 0;
right: 0;
bottom: 0;
left: 0;
```

This is handy to create boxes with a [intrinsic aspect ratio](http://alistapart.com/article/creating-intrinsic-ratios-for-video). For example:

```html
<div class="Pos(r) H(0) Pt(10%)">
    <div class="StretchedBox Bgc(#0280ae) P(10px) C(#fff)">I am a box with an intrinsic aspect ratio</div>
</div>
```

<div class="Pos(r) H(0) Pt(10%)">
    <div class="StretchedBox Bgc(#0280ae) P(10px) C(#fff)">I am a box with an intrinsic aspect ratio</div>
</div>

<hr class="Mt(50px)">

1. Unless one wants the initial value of `border-width` and `border-color` [[↩]](#footnote-1).</li>
