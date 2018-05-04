---
section: docs
layout: docs
title: Grid system
---

Atomic CSS does not come with an _out-of-the-box_ grid system. Instead, you use any property you want to build grids *the way **you** want*.


## Widths

You can choose from creating a unit-base system using fractions (i.e. `1/12`), using percentages (i.e. `20%`), or using any arbitrary measurement value (i.e. `15em`). In other words, the way you apply widths onto boxes is entirely up to you.

<p class="noteBox info">All classes related to `width` start with `W` &mdash; for example: `W(15em)`.</p>

## Layouts

There are many ways to display boxes next to each other, it's up to you to decide which method fits your needs best.

### `inline-block` construct <a id="footnote-1" class="D-ib"></a>

This styling has great browser support [\[1\]](#footnote) and it is direction-friendly (boxes are displayed according to `ltr` / `rtl` contexts).

When creating inline-block constructs, you should use the helper class (`IbBox`) instead of `D(ib)` because the former gives you old-IE support plus vertical-alignment (`top`) for free.

#### Example

```html
<div>
   <div class="IbBox W(1/3) P(20px) Bgc(#0280ae.5)">Box 1</div><!--
--><div class="IbBox W(1/3) P(20px) Bgc(#0280ae.8)">Box 2</div><!--
--><div class="IbBox W(1/3) P(20px) Bgc(#0280ae)">Box 3</div>
</div>
<hr />
<div dir="rtl">
   <div class="IbBox W(1/3) P(20px) Bgc(#0280ae.5)">Box 1</div><!--
--><div class="IbBox W(1/3) P(20px) Bgc(#0280ae.8)">Box 2</div><!--
--><div class="IbBox W(1/3) P(20px) Bgc(#0280ae)">Box 3</div>
</div>
```

<h4 class="penResult">Result</h4>

<p data-height="190" data-theme-id="12469" data-slug-hash="emMPaw" data-default-tab="result" data-user="thierry" class='codepen'>See the Pen <a href='http://codepen.io/thierry/pen/emMPaw/'>emMPaw</a> by Thierry (<a href='http://codepen.io/thierry'>@thierry</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

<div class="noteBox warning">
    <p><strong>3 things to be aware of when creating `inline-block` constructs</strong>:</p>
    <ol class="ol-list">
       <li>white-space between nodes in the markup creates space between boxes, so make sure to address this by either removing that space altogether, using html comments (`<!-- -->`), or implementing some other trick like the one used by [PureCSS](http://purecss.io/grids/).</li>
       <li>`vertical-align:top` is needed to make sure all boxes are top aligned (`IbBox` takes care of #2 and #3).</li>
       <li>IE7 <em>doesn't support</em> `display:inline-block` but Atomizer takes care of this behind the scenes [\[1\]](#footnote).</li>
    </ol>
</div>

### `float` construct <a id="footnote-2" class="D-(ib)"></a>

This styling has great browser support and [Atomizer](https://github.com/acss-io/atomizer) makes it &quot;direction&quot; agnostic [\[2\]](#footnote).  Simply use the `Fl()` class (e.g., `Fl(start)` or `Fl(end)`).

#### Example

```html
<div class="Cf">
   <div class="Fl(start) W(50%) P(20px) Bgc(#0280ae.5)">Box 1</div>
   <div class="Fl(start) W(50%) P(20px) Bgc(#0280ae)">Box 2</div>
</div>
```

<p class="noteBox info">In this example, the class `Cf` (for &quot;clearfix&quot;) is used to contain the floats, but there is also a [`Row` helper class](/guides/helper-classes.html-row-) to better deal with floats across browsers.</p>

<h4 class="penResult">Result</h4>

<p data-height="110" data-theme-id="12469" data-slug-hash="PwewjM" data-default-tab="result" data-user="thierry" class='codepen'>See the Pen <a href='http://codepen.io/thierry/pen/PwewjM/'>PwewjM</a> by Thierry (<a href='http://codepen.io/thierry'>@thierry</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

<p class="penResult">The <em>exact same markup</em> with the `rtl` version of the style sheet:</p>

<p data-height="110" data-theme-id="12469" data-slug-hash="OPZPjL" data-default-tab="result" data-user="thierry" class='codepen'>See the Pen <a href='http://codepen.io/thierry/pen/OPZPjL/'>OPZPjL</a> by Thierry (<a href='http://codepen.io/thierry'>@thierry</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

<p class="noteBox info">[Atomizer](https://github.com/acss-io/atomizer) can also auto-generate `background-color` and `color`.</p>

### `table` and `table-cell` construct

<p>This styling has good browser support (IE8+) and is direction-friendly (boxes are displayed according to `ltr` / `rtl` contexts).</p>

In this example, the `display` classes `D(tb)` and `D(tbc)` are used, along with `vertical-align` and `text-align` classes (`Va(m)` and `Ta(c)`):

#### Example

```html
<div class="D(tb) W(100%) Ta(c)" role="presentation">
    <div class="D(tbc) Va(m) P(20px) Bgc(#0280ae.5)">Box <br />Number <br />1</div>
    <div class="D(tbc) Va(m) P(20px) Bgc(#0280ae.6)">Box Number 2</div>
    <div class="D(tbc) Va(m) P(20px) Bgc(#0280ae.8)">Box Number 3</div>
    <div class="D(tbc) Va(m) P(20px) Bgc(#0280ae)">BoxNumber 4</div>
</div>
<hr />
<div class="D(tb) W(100%) Va(m) Ta(c)" dir="rtl" role="presentation">
    <div class="D(tbc) Va(m) P(20px) Bgc(#0280ae.5)">Box <br />Number <br />1</div>
    <div class="D(tbc) Va(m) P(20px) Bgc(#0280ae.6)">Box Number 2</div>
    <div class="D(tbc) Va(m) P(20px) Bgc(#0280ae.8)">Box Number 3</div>
    <div class="D(tbc) Va(m) P(20px) Bgc(#0280ae)">BoxNumber 4</div>
</div>
```

<h4 class="penResult">Result</h4>

<p data-height="260" data-theme-id="12469" data-slug-hash="GgdgMa" data-default-tab="result" data-user="thierry" class='codepen'>See the Pen <a href='http://codepen.io/thierry/pen/GgdgMa/'>GgdgMa</a> by Thierry (<a href='http://codepen.io/thierry'>@thierry</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

<p><strong>Tip:</strong> one can also use `table-header-group` and/or `table-footer-group` to swap boxes vertically without removing them from the flow:</p>

```html
<div class="D(tb) W(100%) Ta(c)" role="presentation">
    <div class="D(tbfg) Fz(20px) Bgc(#0280ae.5)">Box Number 1</div>
    <div class="D(tbc) Fz(20px) Bgc(#0280ae.8)">Box Number 2</div>
    <div class="D(tbhg) Fz(20px)">Box Number 3</div>
</div>
```

<h4 class="penResult">Result</h4>

<p data-height="115" data-theme-id="12469" data-slug-hash="MYGYQm" data-default-tab="result" data-user="thierry" class='codepen'>See the Pen <a href='http://codepen.io/thierry/pen/MYGYQm/'>MYGYQm</a> by Thierry (<a href='http://codepen.io/thierry'>@thierry</a>) on <a href='http://codepen.io'>CodePen</a>.</p>


### `flexbox` construct

<p>Browser support for `flexbox` is [not that great](http://caniuse.com/#search=flexbox) but nonetheless you can use Atomic to leverage its awesomeness.</p>

<ul class="ul-list">
    <li>`D(f)` for `display:flex`</li>
    <li>`Jc(sb)` for `justify-content:space-between`
</ul>

#### Example

```html
<div class="D(f) Jc(sb)">
  <div class="W(100px) H(100px) Lh(100px) Fz(30px) Ta(c) Bgc(#0280ae.5)">Box 1</div>
  <div class="W(100px) H(100px) Lh(100px) Fz(30px) Ta(c) Bgc(#0280ae.5)">Box 2</div>
  <div class="W(100px) H(100px) Lh(100px) Fz(30px) Ta(c) Bgc(#0280ae.5)">Box 3</div>
  <div class="W(100px) H(100px) Lh(100px) Fz(30px) Ta(c) Bgc(#0280ae.5)">Box 3</div>
</div>
```

<h4 class="penResult">Result</h4>

<p data-height="155" data-theme-id="12469" data-slug-hash="Jovoem" data-default-tab="result" data-user="thierry" class='codepen'>See the Pen <a href='http://codepen.io/thierry/pen/Jovoem/'>Jovoem</a> by Thierry (<a href='http://codepen.io/thierry'>@thierry</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

<hr class="Mt(50px)">

<ol id="footnote" class="ol-list">
    <li>Atomizer provides a patch for oldIE [\[↩\]](#footnote-1).</li>
    <li>Atomizer relies on `start` and `end` instead of `left` and `right` which allows the usage of the **same** classes regardless of script context [\[↩\]](#footnote-2).</li>
</ol>
