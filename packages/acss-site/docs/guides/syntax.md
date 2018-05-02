---
section: docs
layout: docs
---

# Class syntax

Atomic and Helper classes follow a strict syntax, which makes the classnames easier to interpret by humans and easier to parse by tools such as Atomizer.

## The syntax

<pre>
[<b class="hljs-type"><a href="#-lt-context-">&lt;context></a></b>[<b class="hljs-type">:<a href="#-lt-pseudo-class-">&lt;pseudo-class></a></b>]<b class="hljs-type"><a href="#-lt-combinator-">&lt;combinator></a></b>]<b class="Fw(b)"><a class="hljs-string" href="#-lt-style-">&lt;Style></a></b>[(<b class="hljs-type"><a href="#-lt-value-">&lt;value></a>,<a href="#-lt-value-">&lt;value></a>?,...</b>)][<b class="hljs-type"><a href="#-lt-">&lt;!></a></b>][<b class="hljs-type"><a href="#-lt-pseudo-class-">:&lt;pseudo-class></a></b>][<b class="hljs-type"><a href="#-lt-pseudo-element-">::&lt;pseudo-element></a></b>][<b class="hljs-type">--<a href="#-lt-breakpoint_identifier-">&lt;breakpoint_identifier></a></b>]
</pre>

At its core, an Atomic or Helper class is represented by a <a href="#-lt-style-">&lt;Style&gt;</a>. 

Atomic classes typically require one <a href="#-lt-value-">&lt;value&gt;</a>, enclosed in parentheses, though some classes may accept more (eg, the helper class <a href="/guides/helper-classes.html#-lineclamp-">`LineClamp()`</a> accepts two.)  Helper classes may not require a <a href="#-lt-value-">&lt;value&gt;</a>, in which case the parentheses may be omitted.

Optionally, you may prefix the style with a <a href="#-lt-context-">&lt;context></a> class and <a href="#-lt-combinator-">&lt;combinator></a>. The context class may optionally include a <a href="#-lt-pseudo-class-">&lt;pseudo-class></a>.

You may also optionally suffix the style with <a href="#-lt-">&lt;!></a> (for `!important`), a <a href="#-lt-pseudo-class-">&lt;pseudo-class></a>, a <a href="#-lt-pseudo-element-">&lt;pseudo-element></a>, and a <a href="#-lt-breakpoint_identifier-">&lt;breakpoint_identifier></a>.

### RTL/LTR

Any occurrence of `left` and `right` keywords or their abbreviated form ala [Emmet](http://docs.emmet.io/cheat-sheet/) (i.e., `l` and `r`) in <a href="#-lt-style-">&lt;Style&gt;</a> or <a href="#-lt-value-">&lt;value&gt;</a>  must be replaced with the keywords `start` and `end`.  Atomizer will automatically translate the CSS output for left-to-right (LTR) or right-to-left (RTL) depending on options passed during execution.

For example, `Mend(2px)` maps to `margin-right: 2px` in a LTR context and `margin-left: 2px` in an RTL context, and `Pstart(1em)` would map to `padding-left: 1em` in a LTR context, etc.

## Syntax Definitions 

### &lt;context>

Optional.

A **class** applied to an ancestor or sibling of the node (see [examples](#examples-)).

### &lt;pseudo-class>

Optional.

A suffix mapped to a [pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes), for example:

<ul>
    <li>`a` for `:active`</li>
    <li>`c` for `:checked`</li>
    <li>`f` for `:focus`</li>
    <li>`h` for `:hover`</li>
    <li>etc.</li>
</ul>

<p class="noteBox info">You can find the complete list of pseudo-classes and their abbreviations in [Atomizer's grammar library](https://github.com/acss-io/atomizer/blob/master/src/lib/grammar.js#L6).</p>

Pseudo-classes may be applied to any regular class or &lt;context&gt; class. For example:


#### Regular class

```html
<div class="foo">
    <div class="D(n):h"></div>
</div>
```

The above creates the following rule:

```css
.D\(n\)\:h:hover {
  display: none;
}
```

This causes the `display:none` style to be applied to the current element when hovered over.


#### Context class

```html
<div class="foo">
    <div class="foo:h_D(n)"></div>
</div>
```

The above creates the following rule:

```css
.foo:hover .foo\:h_D\(n\) {
  display: none;
}
```

This class hides the current element whenever its ancestor (`.foo`) is hovered over.

<p class="noteBox important">Internet Explorer 7 and below do not accept the use of colons in classnames, and therefore it's not possible to use the pseudo-class syntax with these browsers.</p>

### &lt;pseudo-element>

Optional.

A suffix mapped to a [pseudo-element](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements). The following pseudo-elements are supported:

<ul>
    <li>`b` for `::before`</li>
    <li>`a` for `::after`</li>
    <li>`fl` for `::first-letter`</li>
    <li>`fli` for `::first-line`</li>
    <li>`pl` for `::placeholder`</li>
</ul>

<p class="noteBox important">Internet Explorer 7 and below do not accept the use of colons in classnames, and therefore it's not possible to use the pseudo-element syntax with these browsers.</p>

### &lt;combinator>

Required if &lt;context&gt; is provided. One of the following may be used:

#### The underscore character (`_`)

Use this to create a contextual style based on the [descendant combinator](http://www.w3.org/wiki/CSS/Selectors/combinators/descendant).


```html
<div class="foo">
    <div class="foo_D(n)"></div>
</div>
```

This class hides the element whenever one of its ancestor has the class `foo` attached to it.

#### The right angle bracket character (`>`)

Use this to create a contextual style based on the [child combinator](http://www.w3.org/wiki/CSS/Selectors/combinators/child).

Example:

```html
<div class="foo">
    <div class="foo>D(n)"></div>
</div>
```

This class hides the element if its parent has the class `foo` attached to it.

#### The plus sign (`+`)

Use the [adjacent sibling combinator](http://www.w3.org/wiki/CSS/Selectors/combinators/adjacent) to style only if the sibling of an particular element.

Example:

```html
<div class="foo"></div>
<div class="foo+D(n)"></div>
```

This class hides the element if its previous sibling has the class `foo` attached to it.

### &lt;Style>

Required.

CSS property or [helper class](helper-classes.html). [Capitalized](http://en.wikipedia.org/wiki/Capitalization) with no separator between words such as dashes or new capitals. 

<p class="noteBox info">Atomic classes generally follow the [Emmet](http://docs.emmet.io/cheat-sheet/) syntax for their naming convention.</p>

### &lt;value>

Optional for helper classes, required for Atomic classes.

Examples:

```css
.Ta\(c\) {
    text-align: center;
}
.M\(20px\) {
    margin: 20px;
}
```

There are three value types: Defined, Literal and Variable

#### Defined values

This is the *abbreviation* of a **defined value**. Defined values are valid keywords for any given property. (For example, `inherit` (`inh`), `auto` (`a`), etc.)  Defined values attempt to follow [Emmet syntax](http://docs.emmet.io/cheat-sheet/) as closely as possible.

 Defined values are enumerated in Atomizer's ruleset, so there is no need to define such values in Atomizer configuration before using such values. 

**Defined values that are not present in Emmet** are named according to the rules below:

<ul class="ul-list">
    <li>Value should be abbreviated with the first letter of the value.</li>
    <li>If two values share the same initial letter, then the next value in alphabetical order is [abbreviated](http://en.wikipedia.org/wiki/Abbreviation) in [contracted](http://en.wikipedia.org/wiki/Contraction_%28grammar%29) form.</li>
    <li>If **one value** is composed by two or more words (e.g. `inline-block`) then the first letter of each word should be used with no separator between them (e.g. `inline-block` becomes `ib`, `space-between` becomes `sb`).</li>
    <li>The `inherit` value will always use the keyword `inh` as a special exception because it is available almost globally.</li>
</ul>

#### Literal values

Literals are strings whose values are not defined in configuration, but rather can be machine-interpreted. `1em`, `5px`, `20%`, `1/2`, and `#fff` are examples of literals.

##### Units in literal values

Use any unit you want (e.g., `W(50%)`, `M(20px)`, `Fz(1em)`).

Valid CSS **number values** must always be followed by its unit if applicable (e.g. `100%` and `100px`). These numbers can also be represented as keywords such as `top` and `bottom` if it makes sense in the context of the property.

##### Unit-less values

Use unit-less values to set styles like `line-height` (e.g., `Lh(1.5)`), `font-weight` (e.g., `Fw(500)`), etc.

##### Negative values

Use the minus sign (`-`) to set negative values (e.g., `M(-20px)`)

##### Hexadecimal colors

Use 3 or 6 character hexadecimal colors with a `#` prefix as a value identifier (e.g., `C(#fff)`).

<p class="noteBox important">`hex` values for colors must be written in lowercase (i.e. `#ccc`, not `#CCC`).</p>

##### Hexadecimal colors with alpha

Use hexadecimal colors as value identifier followed by an opacity suffix (e.g., `C(#fff.5)`).

##### Fractions

Use any fraction you want (e.g., `W(1/2)`) and Atomizer will create the proper CSS declaration for you (e.g., `width: 50%`)

##### Multiple values

Pass multiple values separated by commas (`,`) when supported (e.g., `Bgp(20px,50px)`).

<p class="noteBox important">Remember, this is a CSS class, not a programming language, so you can't leave a space before or after commas!</p>

#### Variable values

A "variable" is mapped to a global value set in the config object. It is different than a custom class as it is *not bound to a property*, for example:

```javascript
'custom': {
    'gutter': '20px'
}
```

Usage:

```html
<div class="M(gutter) P(gutter)"></div>
```

Changing the value of `gutter` in the config object would change the value of both the `margin` and `padding` &mdash; *as well as the value of any other class using `gutter`*.

### &lt;!>

Optional.

The `!` character adds `!important` to the style.

Example:

```css
.D\(b\) {
    display: block;
}
.D\(b\)\! {
    display: block !important;
}
```

### &lt;breakpoint_identifier>

Optional.

A suffix that adds the breakpoint context to the rule. A breakpoint indicates that this rule will only take effect within the scope of a media query. The name and length values of each breakpoint are defined in the config object.

Example:

```javascript
breakPoints: {
    'sm': '@media(min-width:500px)', // breakpoint 1
    'md': '@media(min-width:900px)', // breakpoint 2
    'lg': '@media(min-width:1200px)' // breakpoint 3
},
```

Usage:

```html
<div class="W(50%)--sm W(33%)--md W(25%)--lg">...</div>
```

The `width` of the box is `auto` below `500px`, then `50%` between `500px` and `899px`, then `33%` between `900px` and `1199px`, then `25%` above `1199px`.

## Examples:

<table class="Ta(start) W(100%)">
    <caption class="Hidden">Atomic class Examples</caption>
    <thead>
        <tr>
            <th scope="col" class="P(10px)">HTML classes</th>
            <th scope="col" class="P(10px)">What they do</th>
        </tr>
    </thead>
    <tbody>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>D(<b class="hljs-string">n</b>)</code></th>
            <td class="Va-t P(10px)">This is mapped to `display: none`</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>D(<b class="hljs-string">n</b>)<b class="hljs-type">!</b></code></th>
            <td class="Va-t P(10px)">This is mapped to `display: none !important`</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Fz(<b class="hljs-string">1em</b>)</code></th>
            <td class="Va-t P(10px)">This is mapped to `font-size: 1em`</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Fz(<b class="hljs-string">18px</b>)</code></th>
            <td class="Va-t P(10px)">This is mapped to `font-size: 18px`</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Td(<b class="hljs-string">u</b>)<b class="hljs-type">:h</b></code></th>
            <td class="Va-t P(10px)">This underlines text on mouseover</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Td(<b class="hljs-string">u</b>)<b class="hljs-type">:h:f</b></code></th>
            <td class="Va-t P(10px)">This underlines text on mouseover **and** on focus</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Bxs(<b class="hljs-string">n</b>)</code></th>
            <td class="Va-t P(10px)">This is mapped to `box-shadow: none`</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Bxs(<b class="hljs-string">foo</b>)<b class="hljs-type">--lg</b></code></th>
            <td class="Va-t P(10px)">This applies a custom box-shadow inside the "lg" breakpoint [\[1\]](#footnote)<a id="footnote-1" class="D(ib)"></a></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Bxs(<b class="hljs-string">foo</b>)<b class="hljs-type">:h--lg</b></code></th>
            <td class="Va-t P(10px)">Same styling as above but on mouseover only [\[1\]](#footnote)<a id="footnote-1" class="D(ib)"></a></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>C(<b class="hljs-string">#000</b>)</code></th>
            <td class="Va-t P(10px)">This sets the color to black</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>C(<b class="hljs-string">#000.5</b>)</code></th>
            <td class="Va-t P(10px)">This sets the color to black with a 50% opacity</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>M(<b class="hljs-string">bar</b>)</code></th>
            <td class="Va-t P(10px)">This applies a "global" value to `margin` [\[2\]](#footnote)<a id="footnote-2" class="D(ib)"></a></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Mend(<b class="hljs-string">0</b>)</code></th>
            <td class="Va-t P(10px)">This is mapped to `margin-right: 0` in a LTR context [\[3\]](#footnote)<a id="footnote-3" class="D(ib)"></a></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Ta(<b class="hljs-string">start</b>)</code></th>
            <td class="Va-t P(10px)">This is mapped to `text-align:left` in a LTR context [\[3\]](#footnote)<a id="footnote-3" class="D(ib)"></a></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Cl(<b class="hljs-string">start</b>)</code></th>
            <td class="Va-t P(10px)">This is mapped to `clear:left` in a LTR context [\[3\]](#footnote)<a id="footnote-3" class="D(ib)"></a></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Bdstartw(<b class="hljs-string">0</b>)</code></th>
            <td class="Va-t P(10px)">This is mapped to `border-left-width:0` in a LTR context [\[3\]](#footnote)<a id="footnote-3" class="D(ib)"></a></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Rotate(<b class="hljs-string">-90deg</b>)</code></th>
            <td class="Va-t P(10px)">This is an [alias](atomic-classes.html#aliases) mapped to `transform: rotate(-90deg)` [\[4\]](#footnote)<a id="footnote-4" class="D(ib)"></a></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>LineClamp(<b class="hljs-string">2,50px</b>)</code></th>
            <td class="Va-t P(10px)">This is a *helper* which truncates text after 2 lines [\[5\]](#footnote)<a id="footnote-5" class="D(ib)"></a>.</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code><b class="hljs-type">list\_</b>D(<b class="hljs-string">ib</b>)</code></th>
            <td class="Va-t P(10px)">This element is styled with `display:inline-block` when it is a descendant of a node to which the class`list` is applied [\[6\]](#footnote)<a id="footnote-6" class="D(ib)"></a>.</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code><b class="hljs-type">list></b>D(<b class="hljs-string">ib</b>)</code></th>
            <td class="Va-t P(10px)">This element is styled with `display:inline-block` when it is a direct child of a node to which the class `list` is applied to [\[6\]](#footnote)<a id="footnote-6" class="D(ib)"></a>.</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code><b class="hljs-type">box:h\_</b>D(<b class="hljs-string">n</b>)</code></th>
            <td class="Va-t P(10px)">This element is hidden when users hover over its ancestor with the class `.box` [\[6\]](#footnote)<a id="footnote-6" class="D(ib)"></a>.</td>
        </tr>
    </tbody>
</table>

<div class="noteBox info">The [reference page](/reference) lets you quickly search for properties, values, or class names.</div>

<hr class="Mt-50px">

<ol id="footnote" class="ol-list">
    <li>`Bxs(foo)` uses a custom variable `foo` set in the config object [\[↩\]](#footnote-1).</li>
    <li>`bar` is mapped to a custom value that can be used with any relevant styling (i.e. `P(bar)` for `padding`, `H(bar)` for` height`, etc.) [\[↩\]](#footnote-2).</li>
    <li>`start` is mapped to either "left" or "right" depending on the config file [\[↩\]](#footnote-3).</li>
    <li>this class is an [alias](atomic-classes.html) [\[↩\]](#footnote-4).</li>
    <li>this class is a [helper](helper-classes.html) [\[↩\]](#footnote-5).</li>
    <li>Unlike all other Atomic classes, those containing descendant selectors are **not** sandboxed via the namespace (if you have chosen to set one in the config). Instead, Atomizer adds `!important` to these styles [\[↩\]](#footnote-6).</li>
</ol>
