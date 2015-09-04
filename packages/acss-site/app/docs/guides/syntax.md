# The syntax

Following a *strict* syntax facilitates the task of parsing tools which in turn helps create richer features.<br>
Adopting a *common* syntax favors better collaboration between teams and projects.

<p class="noteBox info">For the sake of readability, CSS classes on this page *do not* include the escape character (`\`) where it should be needed.</p>

## The building blocks

<pre>
[<b class="hljs-type">&lt;context></b>][<b class="hljs-type">:&lt;pseudo-class></b>][<b class="hljs-type">_</b> || <b class="hljs-type">></b> || <b class="hljs-type">+</b>]<b class="Fw(b)">&lt;Style></b>[(<b class="hljs-string">&lt;value>,&lt;value>?,&lt;value>?!</b>)][<b class="hljs-type"><!></b>][<b class="hljs-type">:&lt;pseudo-class></b>][<b class="hljs-type">--&lt;breakpoint_identifier></b>]
</pre>

<p class="Pt(20px)">Where:</p>

<h3 class="Bdw(0) Mt(0)">&lt;context></h3>

Optional.

A **class** applied to an ancestor or sibling of the node, depending on the combinator used (see [examples](#examples-)).

### &lt;pseudo-class>

Optional.

A suffix mapped to a [pseudo-classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes), for example:
<ul>
    <li>`a` for `:active`</li>
    <li>`c` for `:checked`</li>
    <li>`f` for `:focus`</li>
    <li>`h` for `:hover`</li>
    <li>etc.</li>
</ul>

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

In other words, this class hides the element whenever its ancestor (`div.foo`) is hovered over.

<p class="noteBox info">You can find the complete list of pseudo-classes and their abbreviations in [grammar.js](https://github.com/yahoo/atomizer/blob/master/src/lib/grammar.js#L6)</p>

<p class="noteBox important">Internet Explorer 7 and below do not accept the use of colons in classnames, and therefore it's not possible to use the pseudo-class syntax with these browsers.</p>

### &lt;combinators>

Optional.

#### The underscore character (`_`)

Use this to create a contextual style based on the [descendant combinator](http://www.w3.org/wiki/CSS/Selectors/combinators/descendant)


```html
<div class="foo">
    <div class="foo_D(n)"></div>
</div>
```

This class hides the element whenever one of its ancestor has the class `foo` attached to it.

#### The right angle bracket character (`>`)

Use this to create a contextual style based on the [child combinator](http://www.w3.org/wiki/CSS/Selectors/combinators/child)

Example:

```html
<div class="foo">
    <div class="foo>D(n)"></div>
</div>
```

This class hides the element if its parent has the class `foo` attached to it.

#### The plus sign (`+`)

Use the [adjacent sibling combinator](http://www.w3.org/wiki/CSS/Selectors/combinators/adjacent) to style the element only if its the sibling of a specified element

Example:

```html
<div class="foo"></div>
<div class="foo+D(n)"></div>
```

This class hides the element if its previous sibling has the class `foo` attached to it.

### &lt;Style>

Required.

CSS property or [helper class](helper-classes.html). [Capitalized](http://en.wikipedia.org/wiki/Capitalization) following [Emmet](http://docs.emmet.io/cheat-sheet/) syntax with no separator between words such as dashes or new capitals.

### &lt;value>

Optional for helpers, required for CSS properties.

Examples:

```css
.Ta(c) {
    text-align: center;
}
.M(20px) {
    margin: 20px;
}
```

<p class="noteBox info">Note that [shorthand notation](shorthand-notation.html "Shorthand notation would lead to bloat") is not offered for all properties.</p>

#### Value types

There are 4 value types:

##### Custom

This is a string of your choosing (i.e. `large`, `title`, etc.). The mapping of such custom class is done via the config object.

Example:

```javascript
'custom': {
    'Fz(title)': 'font-size:18px'
}
```

Usage:

```html
<h1 class="Fz(title)"></h1>
```

##### Variable

A "variable" is mapped to a global value set in the config object. It is different than a custom value as it is *not bound to a property*, for example:

```javascript
'custom': {
    '$gutter': '20px'
}
```

Usage:

```html
<div class="M(#gutter) P(#gutter)"></div>
```

Changing the value of `$gutter` in the config object would change the value of both the `margin` and `padding` &mdash; *as well as the value of any other class using `$gutter`*.

##### Defined

This is the *abbreviation* of a **defined value**. Defined values are valid keywords for any given property. For example `inherit` (`inh`), `auto` (`a`), etc. Atomizer knows about defined values so there is no need to edit the config object before using such value.

##### Literal

Those are strings meant to be used verbatim. `5px`, `20%`, `1/2`, and `#fff` are examples of literals.

<p class="noteBox important">`hex` values for colors must be written in lowercase (i.e. `#0b0`, not `#0B0`).</p>

Any occurrence of `left` and `right` keywords should be replaced with `start` and `end`. <br>
**Values that are not present in Emmet** should be named using the rules below:

<ul class="ul-list">
    <li>Value should be abbreviated with the first letter of the value.</li>
    <li>If two values share the same initial letter then the next value in alphabetical order is [abbreviated](http://en.wikipedia.org/wiki/Abbreviation), sometimes in [contracted](http://en.wikipedia.org/wiki/Contraction_%28grammar%29) form with no general rule for when it is in this form, it should just follow the same [Emmet CSS Syntax style guide](http://docs.emmet.io/css-abbreviations/).</li>
    <li>If **one value** is composed by two or more words (e.g. `inline-block`) then the first letter of each word should be used with no separator between them (e.g. `inline-block` becomes `ib`, `space-between` becomes `sb`).</li>
    <li>Valid CSS **number values** should always be followed by its unit if any (e.g. `100%` and `100px`). These numbers can also be represented as keywords such as `top` and `bottom` if it makes sense in the context of the property. Fraction values should be represented with a forward-slash between the numbers as in `1/12` (the forward slash is escaped in CSS).</li>
    <li>The `inherit` value should always use the keyword `inh` as a special exception because it is available almost globally.</li>
</ul>

<p class="noteBox info">For any occurrences of `left` and `right` keywords or its abbreviated form in [Emmet](http://docs.emmet.io/cheat-sheet/) `l` and `r`, the `start` and `end` keywords should be used respectively. e.g. `Mend` (`margin-right` in a LTR context), `Pstart` (`padding-left` in a LTR context), etc.</p>

### &lt;!>

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

### &lt;pseudo-class>

Optional.

A suffix indicating that this class applies to a [pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes) only. This should be abbreviated as shown in [atomizer.js](https://github.com/yahoo/atomizer/blob/master/src/atomizer.js#L29).

Example:

```html
<a href="#" class="Op(0) Op(1):h">...</a>
```

<p class="noteBox info">Pseudo-classes *can be chained* (i.e. `Op(1):h:f`).</p>

### --&lt;breakpoint_identifier>

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
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>M(<b class="hljs-string">$bar</b>)</code></th>
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

<p class="noteBox info">CSS class selectors contain proper escape character where needed (i.e. `.Td\(u\)\:h`).</p>

<hr class="Mt-50px">

<ol id="footnote" class="ol-list">
    <li>`Bxs(foo)` is a custom class set in the config object [\[↩\]](#footnote-1).</li>
    <li>`$bar` is mapped to a custom value that can be used with any relevant styling (i.e. `P($bar)` for `padding`, `H($bar)` for` height`, etc.) [\[↩\]](#footnote-2).</li>
    <li>`start` is mapped to either "left" or "right" depending on the config file [\[↩\]](#footnote-3).</li>
    <li>this class is an [alias](atomic-classes.html) [\[↩\]](#footnote-4).</li>
    <li>this class is a [helper](helper-classes.html) [\[↩\]](#footnote-5).</li>
    <li>Unlike all other Atomic classes, the ones containing descendant selectors are **not** sandboxed via the namespace (if you have chosen to set one in the config). Instead, Atomizer adds `!important` to these styles [\[↩\]](#footnote-6).</li>
</ol>
