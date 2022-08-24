---
description: Learn different methods to layout your website.
layout: docs
section: docs
title: Layout
---

Atomizer does not come with an out-of-the-box grid system. Instead, you can use flexbox or CSS grids to build your layout the way you want. It's up to you to decide which method fits your needs best. Read the sections below to see examples of different layout methods.

## [Float](../reference.html#float)

This styling has great browser support and <a href="https://github.com/acss-io/atomizer">Atomizer</a> makes it &quot;direction&quot; agnostic. Simply use the `Fl()` class (e.g., `Fl(start)` or `Fl(end)`).

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

## [Table](../reference.html#display)

This styling has good browser support and is direction-friendly (boxes are displayed according to `ltr` / `rtl` contexts).

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

## [Flexbox](../reference.html#flex)

Flexbox is a one-dimensional layout method for arranging items in rows or columns. Items flex (expand) to fill additional space or shrink to fit into smaller spaces.

-   `D(f)` for `display:flex`
-   `Jc(sb)` for `justify-content:space-between`

```html
<div class="D(f) Jc(sb)">
    <div>Box 1</div>
    <div>Box 2</div>
    <div>Box 3</div>
    <div>Box 3</div>
</div>
```

<h4 class="penResult">Result</h4>

<p data-height="250" data-theme-id="12469" data-slug-hash="Jovoem" data-default-tab="result" data-user="thierry" class='codepen'>See the Pen <a href='http://codepen.io/thierry/pen/Jovoem/'>Jovoem</a> by Thierry (<a href='http://codepen.io/thierry'>@thierry</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

## [Grids](../reference.html#gridarea)

<p class="noteBox warning"><strong>NOTE:</strong> Due to the complex nature of <a href="https://www.w3.org/TR/css-grid-1">CSS Grid</a>, some of these properties can only use <a href="/configuration.html#custom">custom variables</a></p>

Use `D(g)` for `display: grid` or `D(ig)` for `display: inline-grid` on the chosen node, you can then specify any required parent styles.

For alignment of child elements please see <a href="alignment.html">alignment</a>.

### [grid-area](../reference.html#gridarea)

The [grid-area](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-area) property is a shorthand for `grid-row-start`, `grid-column-start`, `grid-row-end` and `grid-column-end`. Uses custom variables, you can also use <a href="/configuration.html#substitution">substitution</a> like in the examples below.

Following example shows `Ga(colMain)` = `grid-area: 'main'`.

```html
custom: {
        colAside: 'aside',
        colMain: 'main',
        twoColNamedGrid: '[#{colMain}-start] repeat(9,minmax(0,1fr)) [#{colMain}-end #{colAside}-start] repeat(3,minmax(0,1fr)) [#{colAside}-end]',
}
```

```html
<div class="D(g) Gtc(twoColNamedGrid)">
    <div class="Ga(colMain)">1</div>
    <div class="Ga(colAside)">2</div>
</div>
```

<div class="D(g) Gtc(twoColNamedGrid) Bgc(#add8e6) P(10px) Gp(10px) Mt(20px)">
    <div class="Bgc(#ccc) Ga(colMain) Mih(150px)">1</div>
    <div class="Bgc(#ccc) Ga(colAside) Mih(150px)">2</div>
</div>

### [grid-auto-columns](../reference.html#gridautocolumns) & [grid-auto-rows](../reference.html#gridautorows)

The [grid-auto-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-columns) and [grid-auto-rows](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-rows) properties specify the size of tracks not assigned a size by `grid-template-rows` or `grid-template-columns`. Can use keywords, single values or custom variables.

Following example shows `Gar(150px)` = `grid-auto-rows: 150px`.

```html
<div class="Gar(150px)">
    <div>1</div>
    <div>2</div>
    ...
</div>
```

<div class="D(g) Gac(gridMinMax) Gar(150px) Bgc(#add8e6) P(10px) Gp(10px) Mt(20px)">
    <div class="Bgc(#ccc)">1</div>
    <div class="Bgc(#ccc) Gc(3)">2</div>
    <div class="Bgc(#ccc) Gc(5)">3</div>
    <div class="Bgc(#ccc)">4</div>
    <div class="Bgc(#ccc)">5</div>
    <div class="Bgc(#ccc)">6</div>
</div>

### [grid-auto-flow](../reference.html#gridautoflow)

Grid items that aren’t explicitly placed are automatically placed into an unoccupied space in the grid container by the auto-placement algorithm. [grid-auto-flow](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow) controls how the auto-placement algorithm works, specifying exactly how auto-placed items get flowed into the grid. Uses keywords.

Following example shows `Gaf(rd)` = `grid-auto-flow: row dense`.

```html
<div class="Gaf(rd)">
    <div>1</div>
    <div>2</div>
    ...
</div>
```

<div class="D(g) Gtc(threeColEvenGrid) Gaf(rd) Bgc(#add8e6) P(10px) Gp(10px) Mt(20px)">
    <div class="Bgc(#ccc)">1</div>
    <div class="Bgc(#ccc) Gc(twoCol)">2</div>
    <div class="Bgc(#ccc)">3</div>
    <div class="Bgc(#ccc)">4</div>
    <div class="Bgc(#ccc) Gc(twoCol)">5</div>
    <div class="Bgc(#ccc)">6</div>
</div>

### [grid-column](../reference.html#gridcolumn) & [grid-row](../reference.html#gridrow)

The [grid-row](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row) and [grid-column](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column) properties are shorthands for `grid-row-start/grid-row-end` and `grid-column-start/grid-column-end`, respectively. Uses values and variables.

Following example shows `Gr(twoCol)` = `grid-row: 1 / span 2`.

```html
custom: {
    twoCol: '1 / span 2'
}
```

```html
<div>
    <div class="Gr(twoCol)">1</div>
    <div class="Gc(twoCol) Gr(4)">2</div>
    <div>3</div>
    <div class="Gr(twoCol)">4</div>
    <div class="Gc(twoCol)">4</div>
    <div class="Gc(2)">6</div>
</div>
```

<div class="D(g) Gtc(threeColEvenGrid) Gar(50px) Bgc(#add8e6) P(10px) Gp(10px) Mt(20px)">
    <div class="Bgc(#ccc) Gr(twoCol)">1</div>
    <div class="Bgc(#ccc) Gc(twoCol) Gr(4)">2</div>
    <div class="Bgc(#ccc)">3</div>
    <div class="Bgc(#ccc) Gr(twoCol)">4</div>
    <div class="Bgc(#ccc) Gc(twoCol)">5</div>
    <div class="Bgc(#ccc) Gc(2)">6</div>
</div>

### [grid-column-start](../reference.html#gridcolumnstart) & [grid-column-end](../reference.html#gridcolumnend)

The [grid-column-start](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-start) and [grid-column-end](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-end) properties determine a grid item’s size and location within the grid by contributing a line, a span, or nothing (automatic) to its grid placement, thereby specifying the inline-start, block-start, inline-end, and block-end edges of its grid area.

Following example shows `Gcs(spanTwo)`= `grid-column-start: span 2`.

```html
custom: {
    spanTwo: 'span 2',
}
```

```html
<div>
    <div class="Gcs(2)">1</div>
    <div class="Gcs(spanTwo)">2</div>
    ...
    <div class="Gce(4)">4</div>
    ...
</div>
```

<div class="D(g) Gtc(threeColEvenGrid) Gar(50px) Bgc(#add8e6) P(10px) Gp(10px) Mt(20px)">
    <div class="Bgc(#ccc) Gcs(2)">1</div>
    <div class="Bgc(#ccc) Gcs(spanTwo)">2</div>
    <div class="Bgc(#ccc)">3</div>
    <div class="Bgc(#ccc) Gce(4)">4</div>
    <div class="Bgc(#ccc)">5</div>
    <div class="Bgc(#ccc)">6</div>
</div>

### [grid-row-start](../reference.html#gridrowstart) & [grid-row-end](../reference.html#gridrowend)

The [grid-row-start](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-start) and [grid-row-end](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-end) properties determine a grid item’s size and location within the grid by contributing a line, a span, or nothing (automatic) to its grid placement, thereby specifying the inline-start, block-start, inline-end, and block-end edges of its grid area.

Following example shows `Gre(1)` = `grid-row-end: 1`.

```html
<div>
    <div class="Grs(2)">1</div>
    <div class="Grs(spanTwo)">2</div>
    ...
    <div class="Gre(1)">4</div>
    ...
</div>
```

<div class="D(g) Gtc(threeColEvenGrid) Gar(50px) Bgc(#add8e6) P(10px) Gp(10px) Mt(20px)">
    <div class="Bgc(#ccc) Grs(2)">1</div>
    <div class="Bgc(#ccc) Grs(spanTwo)">2</div>
    <div class="Bgc(#ccc)">3</div>
    <div class="Bgc(#ccc) Gre(1)">4</div>
    <div class="Bgc(#ccc)">5</div>
    <div class="Bgc(#ccc)">6</div>
</div>

### [grid-template](../reference.html#gridtemplate)

The [grid-template](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template) CSS property is a shorthand property for defining grid columns, rows, and areas. This property specifies named grid areas, which are not associated with any particular grid item, but can be referenced from the grid-placement properties. The syntax of the `grid-template-areas` property also provides a visualization of the structure of the grid, making the overall layout of the grid container easier to understand.

Since this property has numerous complex possibilities, we only allow using <a href="/configuration.html#custom">custom variables</a> - they can be configured using a template literal.

Following example shows `Gt(gridABCUnit)` =

```html
grid-template: "a a a" 40px
               "b c c" 40px
               "b c c" 40px / 1fr 1fr 1fr;
```

```html
custom: {
    gridContent: 'c',
    gridHeader: 'a',
    gridNav: 'b',
    gridABCUnit: `"a a a" 40px
                  "b c c" 40px
                  "b c c" 40px / 1fr 1fr 1fr;`,
}
```

```html
    <div class="Gt(gridABCUnit)">
        <div class="Ga(gridHeader)">1</div>
        <div class="Ga(gridNav)">2</div>
        <div class="Ga(gridContent)">3</div>
    </div>
```

<div class="D(g) Gt(gridABCUnit) Bgc(#add8e6) P(10px) Gp(10px) Mt(20px)">
    <div class="Bgc(#ccc) Ga(gridHeader)">1</div>
    <div class="Bgc(#ccc) Ga(gridNav)">2</div>
    <div class="Bgc(#ccc) Ga(gridContent)">3</div>
</div>

### [grid-template-areas](../reference.html#gridtemplateareas)

This property specifies named grid areas, which are not associated with any particular grid item, but can be referenced from the grid-placement properties. The syntax of the [grid-template-areas](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas) property also provides a visualization of the structure of the grid, making the overall layout of the grid container easier to understand.

Since this property has numerous complex possibilities, we only allow using <a href="/configuration.html#custom">custom variables</a> - they can be configured using a template literal.

Following example shows `Gta(gridABC)` =

```html
grid-template: "a a a" 40px
               "b c c" 40px
               "b c c" 40px;
```

```html
custom: {
    gridContent: 'c',
    gridHeader: 'a',
    gridNav: 'b',
    gridABC: `"a a a"
              "b c c"
              "b c c"`,
}
```

```html
<div class="Gta(gridABC)">
    <div class="Ga(gridHeader)">1</div>
    <div class="Ga(gridNav)">2</div>
    <div class="Ga(gridContent)">3</div>
</div>
```

<div class="D(g) Gta(gridABC) Bgc(#add8e6) P(10px) Gp(10px) Mt(20px)">
    <div class="Bgc(#ccc) Ga(gridHeader)">1</div>
    <div class="Bgc(#ccc) Ga(gridNav)">2</div>
    <div class="Bgc(#ccc) Ga(gridContent)">3</div>
</div>

### [grid-template-columns](../reference.html#gridtemplatecolumns) & [grid-template-rows](../reference.html#gridtemplaterows)

These properties specify, as a space-separated track list, the line names and track sizing functions of the grid. The [grid-template-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns) property specifies the track list for the grid’s columns, while [grid-template-rows](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows) specifies the track list for the grid’s rows.

Since these properties have numerous complex possibilities, we only allow using <a href="/configuration.html#custom">custom variables</a>.

Following example shows `Gtc(threeColEvenGrid)` = `grid-template-columns: repeat(3, minmax(20px, 1fr)).`

```html
custom: {
    threeColEvenGrid: 'repeat(3, minmax(20px, 1fr))',
    rowOneFixed: '[col1] 100px [col1-end] repeat(auto-fit, [line3] 400px)'
}
```

```html
<div class="Gtc(threeColEvenGrid) Gtr(rowOneFixed)">
    <div>1</div>
    <div>2</div>
    ...
</div>
```

<div class="D(g) Gtc(threeColEvenGrid) Gtr(rowOneFixed) Bgc(#add8e6) P(10px) Gp(10px) Mt(20px)">
    <div class="Bgc(#ccc)">1</div>
    <div class="Bgc(#ccc)">2</div>
    <div class="Bgc(#ccc)">3</div>
    <div class="Bgc(#ccc)">4</div>
    <div class="Bgc(#ccc)">5</div>
    <div class="Bgc(#ccc)">6</div>
</div>

---

<div id="footnote"></div>

1. Atomizer relies on `start` and `end` instead of `left` and `right` which allows the usage of the **same** classes regardless of script context. <sub><a href="#footnote-1">[↩]</a></sub>
