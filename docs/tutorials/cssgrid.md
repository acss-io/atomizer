---
section: docs
layout: docs
title: CSS Grid
---

<p class="noteBox warning"><strong>NOTE:</strong> Due to the complex nature of <a href="https://www.w3.org/TR/css-grid-1">grid</a>, some of these properties can only use <a href="/configuration.html#custom">custom variables</a></p>

Use `D(g)` for `display: grid` or `D(ig)` for `display: inline-grid` on the chosen node, you can then specify any required parent styles.

For alignment of child elements please see <a href="alignment.html">alignment</a>.

## [grid-area](/reference#gridarea)

The [grid-area](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-area) property is a shorthand for `grid-row-start`, `grid-column-start`, `grid-row-end` and `grid-column-end`. Uses custom variables, you can also use <a href="/configuration.html#substitution">substitution</a> like in the examples below. Following example shows `Ga(colMain)`, *grid-area: 'main'*.

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


## [grid-auto-columns](/reference#gridautocolumns) &  [grid-auto-rows](/reference#gridautorows)

The [grid-auto-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-columns) and [grid-auto-rows](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-rows) properties specify the size of tracks not assigned a size by `grid-template-rows` or `grid-template-columns`. Can use keywords, single values or custom variables. Following example shows `Gar(150px)`, *grid-auto-rows: 150px*.

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

## [grid-auto-flow](/reference#gridautoflow)

Grid items that aren’t explicitly placed are automatically placed into an unoccupied space in the grid container by the auto-placement algorithm. [grid-auto-flow](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow) controls how the auto-placement algorithm works, specifying exactly how auto-placed items get flowed into the grid. Uses keywords. Following example shows `Gaf(rd)`, *grid-auto-flow: row dense*.

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

## [grid-column](/reference#gridcolumn) & [grid-row](/reference#gridrow)

The [grid-row](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row) and [grid-column](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column) properties are shorthands for `grid-row-start/grid-row-end` and `grid-column-start/grid-column-end`, respectively. Uses values and variables. Following example shows `Gr(twoCol)`, *grid-row: 1 / span 2*.


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

## [grid-column-start](/reference#gridcolumnstart) & [grid-column-end](/reference#gridcolumnend)

The [grid-column-start](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-start) and [grid-column-end](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-end) properties determine a grid item’s size and location within the grid by contributing a line, a span, or nothing (automatic) to its grid placement, thereby specifying the inline-start, block-start, inline-end, and block-end edges of its grid area. Following example shows `Gcs(spanTwo)`, *grid-column-start: span 2*.

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


## [grid-row-start](/reference#gridrowstart) & [grid-row-end](/reference#gridrowend)

The [grid-row-start](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-start) and [grid-row-end](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-end) properties determine a grid item’s size and location within the grid by contributing a line, a span, or nothing (automatic) to its grid placement, thereby specifying the inline-start, block-start, inline-end, and block-end edges of its grid area. Following example shows `Gre(1)`, *grid-row-end: 1*.


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

## [grid-template](/reference#gridtemplate)

The [grid-template](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template) CSS property is a shorthand property for defining grid columns, rows, and areas. This property specifies named grid areas, which are not associated with any particular grid item, but can be referenced from the grid-placement properties. The syntax of the `grid-template-areas` property also provides a visualization of the structure of the grid, making the overall layout of the grid container easier to understand.

Since this property has numerous complex possibilities, we only allow using <a href="/configuration.html#custom">custom variables</a> - they can be configured using a template literal. Following example shows `Gt(gridABCUnit)`, *grid-template: "a a a" 40px
                                "b c c" 40px
                                "b c c" 40px / 1fr 1fr 1fr;*.


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

## [grid-template-areas](/reference#gridtemplateareas)

This property specifies named grid areas, which are not associated with any particular grid item, but can be referenced from the grid-placement properties. The syntax of the [grid-template-areas](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas) property also provides a visualization of the structure of the grid, making the overall layout of the grid container easier to understand.

Since this property has numerous complex possibilities, we only allow using <a href="/configuration.html#custom">custom variables</a> - they can be configured using a template literal. Following example shows `Gta(gridABC)`, *grid-template: "a a a" 40px
                            "b c c" 40px
                            "b c c" 40px;*.

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

## [grid-template-columns](/reference#gridtemplatecolumns) & [grid-template-rows](/reference#gridtemplaterows)

These properties specify, as a space-separated track list, the line names and track sizing functions of the grid. The [grid-template-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns) property specifies the track list for the grid’s columns, while [grid-template-rows](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows) specifies the track list for the grid’s rows.

Since these properties have numerous complex possibilities, we only allow using <a href="/configuration.html#custom">custom variables</a>. Following example shows `Gtc(threeColEvenGrid)`, *grid-template-columns: repeat(3, minmax(20px, 1fr))*

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
