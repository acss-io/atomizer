# Atomizer tool

[Atomizer](https://github.com/yahoo/atomizer) is a [npm module](https://www.npmjs.com/package/atomizer) meant to create `atomic.css` &mdash; a style sheet that contains Atomic *and* helper rules.

Atomizer creates CSS rules based on Atomic classes it finds in documents. This means that styles are always up-to-date *without the need for writing a single CSS declaration* [\[1\]](#footnote)<a id="footnote-1" class="D(ib)"></a>.

For example, if your project was a single page containing:

```html
<div class="D(b) Va(t) Fz(20px)">Hello World!</div>
```

Atomizer would create a `atomic.css` file containing these rules:

```css
.D(b) {
    display: block;
}
.Va(t) {
    vertical-align: top;
}
.Fz(20px) {
    font-size: 20px;
}
```
<p class="noteBox info">For the sake of readability, CSS classes on this page <em>do not</em> include the escape character (<code>\</code>) where it should be needed.</p>

If, for example, you decided to update the classes like below:

```html
<div class="Va(t) Fz(18px)">Hello World!</div>
```

Then Atomizer would update the file (removing `D(b)` and replacing `Fz(20px)` with `Fz(18px)`) to match exactly *what is being used* inside the project:

```css
.Va(t) {
    vertical-align: top;
}
.Fz(18px) {
    font-size: 18px;
}
```

How cool is that? No bloat, no maintenance, no problem.

<p class="noteBox info">We have a [grunt task](https://github.com/yahoo/grunt-atomizer) for running Atomizer.</p>

## This is what you get for free

You can create any custom class you want via the [config object](https://github.com/yahoo/atomizer/blob/master/examples/example-config.js) but you should follow the <a href="syntax.html">Atomic syntax</a> if you wish Atomizer to recognize the following identifiers and combinators out of the box:

### Contextual class related to *ancestor*

Use a class attached to *an ancestor*  of the element if you wish to create a contextual style. For example, the class `myBox_D(n)` will hide the node if it is a descendant of an element with the class `myBox` applied to it.

### Contextual class related to *parent*

Use a class attached to *the parent* of the element if you wish to create a contextual style. For example, the class `myBox>D(n)` will hide the node if it is a child of an element with the class `myBox` applied to it.

### Pseudo classes on ancestor

Use a pseudo-class abbreviation to bind your style to that pseudo-class. For example, the class `myBox:h_Td(u)` will underline text when users hover over its ancestor to which the class `.myBox` is applied.

### Pseudo classes on value identifier

Use a pseudo-class abbreviation to bind your style to that pseudo-class. For example, the class `Td(u):h` will underline text on mouseover.

### Units in value identifiers

Use any unit you want (i.e. `W(50%)`, `M(20px)`, `Fz(1em)`, etc.).

### Unit-less values

Use unit-less values to set styles like `line-height` (i.e. `Lh(1.5)`), `font-weight` (i.e. `Fw(500)`), etc.

### Negative values

Use the minus sign (`-`) to set negative values (i.e. `M(-20px)`)

### Multiple values

Pass multiple values using commas (`,`) (i.e. `Bgp(20px,50px)`)

### Hexadecimal colors

Use hexadecimal colors (in *lowercase with the `#`*) as value identifier (i.e. `C(#fff)`) and Atomizer will create the declaration for you (`color:#fff`)

### Hexadecimal colors with alpha

Use hexadecimal colors (in *lowercase with the `#`*) as value identifier followed by the opacity value (i.e. `C(#fff.5)`) and Atomizer will create the declaration for you (`color:rgba(255,255,255,.5)`)

### Fractions

Use any fraction you want (i.e. `W(1/2)`) and Atomizer will create the CSS declaration for you (`width:50%`)

### `!important` directive

Use `!` after the value identifier (i.e. `D(b)!`) and Atomizer will add `!important` to the declaration for you (`display:block!important`)

<div class="noteBox info">The [reference page](/reference) lets you quickly search for properties, values, or class names.</div>

<hr class="Mt(50px)">

<ol id="footnote" class="ol-list">
    <li>This is true for non-custom classes [\[↩\]](#footnote-1).</li>
</ol>
