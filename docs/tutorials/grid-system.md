---
section: docs
layout: docs
title: Grid system
---

Atomizer does not come with an *out-of-the-box* grid system. Instead, you use any property you want to build grids *the way **you** want*.

## Widths

You can choose from creating a unit-base system using fractions (i.e. `1/12`), using percentages (i.e. `20%`), or using any arbitrary measurement value (i.e. `15em`). In other words, the way you apply widths onto boxes is entirely up to you.

<p class="noteBox info">All classes related to <code>width</code> start with <code>W</code> &mdash; for example: <code>W(15em)</code>.</p>

## Layouts

There are many ways to display boxes next to each other, it&#39;s up to you to decide which method fits your needs best.

### `inline-block` construct

This styling has great browser support <a href="#footnote">[1]</a> and it is direction-friendly (boxes are displayed according to `ltr` / `rtl` contexts).

When creating inline-block constructs, you should use the helper class (`IbBox`) instead of `D(ib)` because the former gives you vertical-alignment (`top`) for free.

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

<p data-height="300" data-theme-id="12469" data-slug-hash="emMPaw" data-default-tab="result" data-user="thierry" class='codepen'>See the Pen <a href='http://codepen.io/thierry/pen/emMPaw/'>emMPaw</a> by Thierry (<a href='http://codepen.io/thierry'>@thierry</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

<div class="noteBox warning">
    <p><strong>Some things to be aware of when creating <code>inline-block</code> constructs</strong>:</p>
    <ol class="ol-list">
       <li>white-space between nodes in the markup creates space between boxes, so make sure to address this by either removing that space altogether, using html comments (<code>&lt;!-- --&gt;</code>), or implementing some other trick like the one used by <a href="http://purecss.io/grids/">PureCSS</a>.</li>
       <li><code>vertical-align:top</code> is needed to make sure all boxes are top aligned (<code>IbBox</code> takes care of this).</li>
    </ol>
</div>

### `float` construct

This styling has great browser support and <a href="https://github.com/acss-io/atomizer">Atomizer</a> makes it &quot;direction&quot; agnostic <a href="#footnote">[2]</a>.  Simply use the `Fl()` class (e.g., `Fl(start)` or `Fl(end)`).

#### Example

```html
<div class="Cf">
   <div class="Fl(start) W(50%) P(20px) Bgc(#0280ae.5)">Box 1</div>
   <div class="Fl(start) W(50%) P(20px) Bgc(#0280ae)">Box 2</div>
</div>
```

<p class="noteBox info">In this example, the class <code>Cf</code> (for &quot;clearfix&quot;) is used to contain the floats, but there is also a <a href="/guides/helper-classes.html-row-"><code>Row</code> helper class</a> to better deal with floats across browsers.</p>

<h4 class="penResult">Result</h4>

<p data-height="200" data-theme-id="12469" data-slug-hash="PwewjM" data-default-tab="result" data-user="thierry" class='codepen'>See the Pen <a href='http://codepen.io/thierry/pen/PwewjM/'>PwewjM</a> by Thierry (<a href='http://codepen.io/thierry'>@thierry</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

<p class="penResult">The <em>exact same markup</em> with the <code>rtl</code> version of the style sheet:</p>

<p data-height="200" data-theme-id="12469" data-slug-hash="OPZPjL" data-default-tab="result" data-user="thierry" class='codepen'>See the Pen <a href='http://codepen.io/thierry/pen/OPZPjL/'>OPZPjL</a> by Thierry (<a href='http://codepen.io/thierry'>@thierry</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

<p class="noteBox info"><a href="https://github.com/acss-io/atomizer">Atomizer</a> can also auto-generate `background-color` and `color`.</p>

### `table` and `table-cell` construct

This styling has good browser support (IE8+) and is direction-friendly (boxes are displayed according to `ltr` / `rtl` contexts).

In this example, the `display` classes `D(tb)` and `D(tbc)` are used, along with `vertical-align` and `text-align` classes (`Va(m)` and `Ta(c)`):

<h4 id="example">Example</h4>

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

<p data-height="350" data-theme-id="12469" data-slug-hash="GgdgMa" data-default-tab="result" data-user="thierry" class='codepen'>See the Pen <a href='http://codepen.io/thierry/pen/GgdgMa/'>GgdgMa</a> by Thierry (<a href='http://codepen.io/thierry'>@thierry</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

**Tip:** one can also use `table-header-group` and/or `table-footer-group` to swap boxes vertically without removing them from the flow:

```html
<div class="D(tb) W(100%) Ta(c)" role="presentation">
    <div class="D(tbfg) Fz(20px) Bgc(#0280ae.5)">Box Number 1</div>
    <div class="D(tbc) Fz(20px) Bgc(#0280ae.8)">Box Number 2</div>
    <div class="D(tbhg) Fz(20px)">Box Number 3</div>
</div>
```

<h4 class="penResult">Result</h4>

<p data-height="200" data-theme-id="12469" data-slug-hash="MYGYQm" data-default-tab="result" data-user="thierry" class='codepen'>See the Pen <a href='http://codepen.io/thierry/pen/MYGYQm/'>MYGYQm</a> by Thierry (<a href='http://codepen.io/thierry'>@thierry</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

### `flexbox` construct

- `D(f)` for `display:flex`
- `Jc(sb)` for `justify-content:space-between`

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

<p data-height="250" data-theme-id="12469" data-slug-hash="Jovoem" data-default-tab="result" data-user="thierry" class='codepen'>See the Pen <a href='http://codepen.io/thierry/pen/Jovoem/'>Jovoem</a> by Thierry (<a href='http://codepen.io/thierry'>@thierry</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

---

<div id="footnote"></div>

1. Atomizer relies on `start` and `end` instead of `left` and `right` which allows the usage of the **same** classes regardless of script context <a href="#footnote-2">[↩]</a>.
