---
description: Atomizer follow a strict syntax, which makes the classnames easier to interpret by humans.
layout: docs
section: docs
title: Class syntax
---

## Syntax

<pre>
[<b><a href="#context">&lt;context></a></b>[<b>:<a href="#pseudo-class">&lt;pseudo-class></a></b>]<b><a href="#combinator">&lt;combinator></a></b>]<b><a  href="#style">&lt;Style></a></b>[(<b><a href="#value">&lt;value></a>,<a href="#value">&lt;value></a>?,...</b>)][<b><a href="#-important">&lt;!></a></b>][<b><a href="#pseudo-class">:&lt;pseudo-class></a></b>][<b><a href="#pseudo-element">::&lt;pseudo-element></a></b>][<b>--<a href="#breakpoint-identifier">&lt;breakpoint_identifier></a></b>]
</pre>

At its core, an Atomizer or Helper class is represented by a [&lt;Style&gt;](#style).

Atomizer classes typically require one [&lt;value&gt;](#value), enclosed in parentheses, though some classes may accept more (e.g., the helper class [`LineClamp()`]({% link guides/helper-classes.md %}#lineclamp) accepts two.) Helper classes may not require a [&lt;value&gt;](#value), in which case the parentheses may be omitted.

Optionally, you may prefix the style with a [&lt;context&gt;](#context) class and [&lt;combinator&gt;](#combinator). The context class may optionally include a [&lt;pseudo-class&gt;](#pseudo-class).

You may also optionally suffix the style with [&lt;!&gt;](#-important) (for `!important`), a [&lt;pseudo-class&gt;](#pseudo-class), a [&lt;pseudo-element&gt;](#pseudo-element), and a [&lt;breakpoint_identifier&gt;](#breakpoint_identifier).

### RTL/LTR

Any occurrence of `left` and `right` keywords or their abbreviated form ala [Emmet](http://docs.emmet.io/cheat-sheet/) (i.e., `l` and `r`) in [&lt;Style&gt;](#style) or [&lt;value&gt;](#value) must be replaced with the keywords `start` and `end.` Atomizer will automatically translate the CSS output for left-to-right (LTR) or right-to-left (RTL) depending on options passed during execution.

For example, `Mend(2px)` maps to `margin-right: 2px` in an LTR context and `margin-left: 2px` in an RTL context, and `Pstart(1em)` would map to `padding-left: 1em` in an LTR context, etc.

## Examples

| HTML classes | What they do |
| --- | --- |
| `D(n)` | This is mapped to `display: none` |
| `D(n)!` | This is mapped to `display: none !important` |
| `Fz(1em)` | This is mapped to `font-size: 1em` |
| `Fz(18px)` | This is mapped to `font-size: 18px` |
| `Td(u):h` | This underlines text on mouseover |
| `Bxs(n)` | This is mapped to `box-shadow: none` |
| `Bxs(foo)--lg` | This applies a custom box-shadow inside the "lg" breakpoint <sup id="footnote-1">[[1]](#footnote)</sup> |
| `Bxs(foo):h--lg` | Same styling as above but on mouseover only <sup>[[1]](#footnote)</sup> |
| `C(#000)` | This sets the color to black |
| `C(#000.5)` | This sets the color to black with a 50% opacity |
| `M(bar)` | This applies a [custom]({% link configuration.md %}#custom) value to `margin` <sup id="footnote-2">[[2]](#footnote)</sup> |
| `Mend(0)` | This is mapped to `margin-right: 0` in a LTR context |
| `Ta(start)` | This is mapped to `text-align:left` in a LTR context <sup id="footnote-3">[[3]](#footnote)</sup> |
| `Bdstartw(0)` | This is mapped to `border-left-width:0` in a LTR context <sup id="footnote-3">[[3]](#footnote)</sup> |
| `Rotate(-90deg)` | This is an [alias]({% link guides/atomizer-classes.md %}#aliases) mapped to `transform: rotate(-90deg)` |
| `LineClamp(2,50px)` | This is a [helper]({% link guides/helper-classes.md %}) which truncates text after 2 lines |
| `list_D(ib)` | This element is styled with `display:inline-block` when it is a descendant of a node to which the class `list` is applied <sup id="footnote-4">[[4]](#footnote)</sup> |
| `list>D(ib)` | This element is styled with `display:inline-block` when it is a direct child of a node to which the class `list` is applied to <sup id="footnote-4">[[4]](#footnote)</sup> |
| `box:h_D(n)` | This element is hidden when users hover over its ancestor with the class `.box` <sup id="footnote-4">[[4]](#footnote)</sup> |

<div class="noteBox info">The <a href="{% link reference.md %}">reference page</a> lets you quickly search for properties, values, or class names.</div>

## Syntax Definitions

### &lt;context&gt;

Optional.

A **class** applied to an ancestor or sibling of the node (see [examples](#examples)).

```html
<div class="foo">
    <div class="foo:h_D(n)"></div>
</div>
```

The above creates the following rule:

```css
.foo:hover .foo:h_D(n) {
  display: none;
}
```

This class hides the current element whenever its ancestor (`.foo`) is hovered over.

### &lt;pseudo-class&gt;

Optional.

A suffix mapped to a [pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes), for example:

| Pseudo-Element       | Suffix |
| -------------------- | ------ |
| `:active`            | `:a`   |
| `:checked`           | `:c`   |
| `:default`           | `:d`   |
| `:disabled`          | `:di`  |
| `:empty`             | `:e`   |
| `:enabled`           | `:en`  |
| `:first`             | `:fi`  |
| `:first-child`       | `:fc`  |
| `:first-of-type`     | `:fot` |
| `:fullscreen`        | `:fs`  |
| `:focus`             | `:f`   |
| `:focus-within`      | `:fw`  |
| `:focus-visible`     | `:fv`  |
| `:hover`             | `:h`   |
| `:indeterminate`     | `:ind` |
| `:in-range`          | `:ir`  |
| `:invalid`           | `:inv` |
| `:last-child`        | `:lc`  |
| `:last-of-type`      | `:lot` |
| `:left`              | `:l`   |
| `:link`              | `:li`  |
| `:only-child`        | `:oc`  |
| `:only-of-type`      | `:oot` |
| `:optional`          | `:o`   |
| `:out-of-range`      | `:oor` |
| `:placeholder-shown` | `:ps`  |
| `:read-only`         | `:ro`  |
| `:read-write`        | `:rw`  |
| `:required`          | `:req` |
| `:right`             | `:r`   |
| `:root`              | `:rt`  |
| `:scope`             | `:s`   |
| `:target`            | `:t`   |
| `:valid`             | `:va`  |
| `:visited`           | `:vi`  |

Pseudo-classes may be applied to any regular class or &lt;context&gt; class. For example:

#### Regular class

```html
<div class="foo">
    <div class="D(n):h"></div>
</div>
```

The above creates the following rule:

```css
.D(n):h:hover {
  display: none;
}
```

This causes the `display: none` style to be applied to the current element when hovered over.

#### Context class

```html
<div class="foo">
    <div class="foo:h_D(n)"></div>
</div>
```

The above creates the following rule:

```css
.foo:hover .foo:h_D(n) {
  display: none;
}
```

This class hides the current element whenever its ancestor (`.foo`) is hovered over.

### &lt;pseudo-element&gt;

Optional.

A suffix mapped to a [pseudo-element](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements). The following pseudo-elements are supported:

| Pseudo-Element           | Suffix  |
| ------------------------ | ------- |
| `::after`                | `::a`   |
| `::before`               | `::b`   |
| `::backdrop`             | `::bd`  |
| `::cue`                  | `::c`   |
| `::file-selector-button` | `::fsb` |
| `::first-letter`         | `::fl`  |
| `::first-line`           | `::fli` |
| `::marker`               | `::m`   |
| `::placeholder`          | `::ph`  |
| `::selection`            | `::s`   |

This example uses the `content` property to add open and closed quotes with the `::b` and `::a` pseudo-elements.

```html
<p class="Cnt(oq)::b Cnt(cq)::a">Hello world!</p>
```

<p class="Cnt(oq)::b Cnt(cq)::a Fz(30px)::b Fz(30px)::a Fz(20px)">Hello world!</p>

### &lt;combinator&gt;

Required if &lt;context&gt; is provided. One of the following may be used:

#### The underscore character (`_`)

Use this to create a contextual style based on the [descendant combinator](https://developer.mozilla.org/en-US/docs/Web/CSS/Descendant_combinator).

```html
<div class="foo">
    <div class="foo_D(n)"></div>
</div>
```

This class hides the element whenever one of its ancestors has the class `foo' attached.

#### The right angle bracket character (`&gt;`)

Use this to create a contextual style based on the [child combinator](https://developer.mozilla.org/en-US/docs/Web/CSS/Child_combinator).

Example:

```html
<div class="foo">
    <div class="foo>D(n)"></div>
</div>
```

This class hides the element if its parent has the class `foo` attached to it.

#### The plus sign (`+`)

Use the [adjacent sibling combinator](https://developer.mozilla.org/en-US/docs/Web/CSS/Adjacent_sibling_combinator) to style only if the immediate next sibling of an particular element.

Example:

```html
<div class="foo"></div>
<div class="foo+D(n)"></div>
```

This class hides the element if its immediate previous sibling has the class `foo` attached to it.

#### The tilde sign (`~`)

Use the [general sibling combinator](https://developer.mozilla.org/en-US/docs/Web/CSS/General_sibling_combinator) to style only if the sibling of an particular element.

Example:

```html
<div class="foo"></div>
<div class="bar"></div>
<div class="foo~D(n)"></div>
```

This class hides the element if one of its previous siblings has the class `foo' attached.

### &lt;Style&gt;

Required.

CSS property or [helper class](helper-classes.html). [Capitalized](http://en.wikipedia.org/wiki/Capitalization) with no separator between words such as dashes or new capitals.

<p class="noteBox info">Atomizer classes generally follow the <a href="http://docs.emmet.io/cheat-sheet/">Emmet</a> syntax for their naming convention.</p>

### &lt;value&gt;

Optional for helper classes, required for Atomizer classes.

Examples:

```css
.Ta(c) {
    text-align: center;
}
.M(20px) {
    margin: 20px;
}
```

There are three value types: Defined, Literal, and Variable.

#### Defined values

This is the _abbreviation_ of a **defined value**. Defined values are valid keywords for any given property. (For example, `inherit` (`inh`), `auto` (`a`), etc.) Defined values attempt to follow [Emmet syntax](http://docs.emmet.io/cheat-sheet/) as closely as possible.

Defined values are enumerated in Atomizer&#39;s ruleset, so there is no need to define such values in Atomizer configuration before using such values.

**Defined values that are not present in Emmet** are named according to the rules below:

-   Value should be abbreviated with the first letter of the value.
-   If two values share the same initial letter, then the next value in alphabetical order is [abbreviated](http://en.wikipedia.org/wiki/Abbreviation) in [contracted](http://en.wikipedia.org/wiki/Contraction_%28grammar%29) form.
-   If **one value** is composed of two or more words (e.g., `inline-block`), then the first letter of each word should be used with no separator between them (e.g., `inline-block` becomes `ib,` `space-between` becomes `sb`).
-   The following values are special exceptions as they are available almost globally:
    -   `inh` = `inherit`
    -   `ini` = `initial`
    -   `rv` = `revert`
    -   `rvl` = `revert-layer`
    -   `un` = `unset`

#### Literal values

Literals are strings whose values are not defined in configuration but can be machine-interpreted. `1em`, `5px`, `20%`, `1/2`, and `#fff` are examples of literals.

##### Units in literal values

Use any unit you want (e.g., `W(50%)`, `M(20px)`, `Fz(1em)`).

Valid CSS **number values** must always be followed by its unit if applicable (e.g. `100%` and `100px`). These numbers can also be represented as keywords such as `top` and `bottom` if it makes sense in the context of the property.

##### Unit-less values

Use unit-less values to set styles like `line-height` (e.g., `Lh(1.5)`), `font-weight` (e.g., `Fw(500)`), etc.

##### Negative values

Use the minus sign (`-`) to set negative values (e.g., `M(-20px)`)

##### Hexadecimal colors

Use three or 6-character hexadecimal colors with a `#` prefix as a value identifier (e.g., `C(#fff)`).

<p class="noteBox important"><code>hex</code> values for colors must be written in lowercase (i.e. <code>#ccc</code>, not <code>#CCC</code>).</p>

##### Hexadecimal colors with alpha

Use hexadecimal colors as value identifiers followed by an opacity suffix (e.g., `C(#fff.5)`).

##### Fractions

Use any fraction you want (e.g., `W(1/2)`), and Atomizer will create the proper CSS declaration for you (e.g., `width: 50%`)

##### Multiple values

Pass multiple values separated by commas (`,`) when supported (e.g., `Bgp(20px,50px)`).

<p class="noteBox important">Remember, this is a CSS class, not a programming language, so you can&#39;t leave a space before or after commas!</p>

##### Variable values

A &quot;variable&quot; is mapped to a global value set in the config object. It is different than a custom class as it is _not bound to a property_, for example:

```js
custom: {
    gutter: '20px'
}
```

Usage:

```html
<div class="M(gutter) P(gutter)"></div>
```

Changing the value of `gutter` in the config object would change the value of both the `margin` and `padding` &mdash; _as well as the value of any other class using `gutter`_.

##### CSS variables

CSS variables can be referenced as class values. Note that Atomizer does not manage values and must be defined independently.

Usage:

```html
<div class="C(--primary-color)">Hello World</div>
```

External stylesheet:

```css
:root {
    --primary-color: #400090
}
```

Output:

```css
.C(--primary-color) {
    color: var(--primary-color);
}
```

### &lt;!&gt; important

Optional.

The `!` character adds `!important` to the style.

Example:

```css
.D(b) {
    display: block;
}
.D(b)! {
    display: block !important;
}
```

### &lt;breakpoint_identifier&gt;

Optional.

A suffix that adds the breakpoint context to the rule. A breakpoint indicates that this rule will only take effect within the scope of a media query. Each breakpoint's name and length values are defined in the config object.

Example:

```js
breakPoints: {
    sm: '@media(min-width:500px)', // breakpoint 1
    md: '@media(min-width:900px)', // breakpoint 2
    lg: '@media(min-width:1200px)' // breakpoint 3
},
```

Usage:

```html
<div class="W(50%)--sm W(33%)--md W(25%)--lg">...</div>
```

The `width` of the box is `auto` below `500px`, then `50%` between `500px` and `899px`, then `33%` between `900px` and `1199px`, then `25%` above `1199px`.

---

<div id="footnote"></div>

1. `Bxs(foo)` uses a custom variable `foo` set in the config object <sub>[[↩]](#footnote-1)</sub>.
1. `bar` is mapped to a custom value that can be used with any relevant styling (i.e., `P(bar)` for `padding`, `H(bar)` for `height`, etc.) <sub>[[↩]](#footnote-2)</sub>.
1. `start` is mapped to either &quot;left&quot; or &quot;right&quot; depending on the config file <sub>[[↩]](#footnote-3)</sub>.
1. Unlike all other Atomizer classes, those containing descendant selectors are **not** sandboxed via the namespace (if you have chosen to set one in the config). Instead, Atomizer adds `!important` to these styles <sub>[[↩]](#footnote-6)</sub>.
