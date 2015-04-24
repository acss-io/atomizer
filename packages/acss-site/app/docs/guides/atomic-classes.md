# Atomic classes

Atomic classes ultimately increase the speed of development as they follow a consistent and easy to remember syntax. The inspiration comes from [Emmet](http://emmet.io/), a plugin for many popular text editors which greatly improves HTML & CSS workflow.

It might take you a short time to get familiar with these class names but as soon as you start using them you'll be at full speed in no time.

<div class="noteBox info">The [reference page](/reference) lets you quickly search for properties, values, or class names.</div>

You use a config object to create the styles you need but you can also *rely on the tool to create many of these styles for you* (to some extend).

## Simple classes

These classes are the ones Atomizer can make sense of without the need to check the config object; classes like `W(20px)` (`width:20px`), `Lh(1.5)` (`line-height:1.5`), etc.

<div class="noteBox info">Examples of color syntax are on the [Atomizer page](atomizer.html#hexadecimal-colors).</div>

## Custom classes

The value identifier of these classes is mapped to a custom value set in the config object. For example, the following:

```javascript
'custom': {
    'Fz(verylarge)': '3em',
    'P(gutter)': '10px',
    'C(primary)': 'teal'
}
```

creates 3 classes/declarations:

<ul class="ul-list">
    <li>`Fz(verylarge)` for `font-size: 3em`</li>
    <li>`P(gutter)` for `padding: 10px`</li>
    <li>`C(primary)` for `color: teal`</li>
</ul>

## Aliases

Atomic CSS uses aliases for "most" properties [\[1\]](#footnote)<a id="footnote-1" class="D(ib)"></a> that rely on [Functional Notation](http://www.w3.org/TR/css3-values/#functional-notation). Those are the type of component value that can represent more complex types (or invoke special processing).

<table class="Ta(start) W(100%)">
    <caption class="Hidden">Aliases for values based on functional notation</caption>
    <thead>
        <tr>
            <th scope="col" class="P(10px)">Aliases</th>
            <th scope="col" class="P(10px)">Styles</th>
        </tr>
    </thead>
    <tbody>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`Blur(2px)`</th>
            <td class="Va(t) P(10px)">`filter:blur(2px)`</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`Brightness(.5)`</th>
            <td class="Va(t) P(10px)">`filter:brightness(.5)`</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`Contrast(200%)`</th>
            <td class="Va(t) P(10px)">`filter:contrast(200%)`</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`Dropshadow(10px,10px,20px,teal)`</th>
            <td class="Va(t) P(10px)">`filter:drop-shadow(16px,16px,20px,teal)`</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`Grayscale(50%)`</th>
            <td class="Va(t) P(10px)">`filter:grayscale(50%)`</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`Grayscale(2px)`</th>
            <td class="Va(t) P(10px)">`filter:grayscale(2px)`</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`HueRotate(90deg)`</th>
            <td class="Va(t) P(10px)">`filter:hue-rotate(90deg)`</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`Invert(50%)`</th>
            <td class="Va(t) P(10px)">`filter:invert(50%)`</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`Opacity(20%)`</th>
            <td class="Va(t) P(10px)">`filter:opacity(20%)`</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`Saturate(20%)`</th>
            <td class="Va(t) P(10px)">`filter:saturate(20%)`</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`Sepia(50%)`</th>
            <td class="Va(t) P(10px)">`filter:sepia(50%)`</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`Matrix(<custom value>)` <b class="Fw(n)">[\[2\]](#footnote)<a id="footnote-2" class="D(ib)"></a></b></th>
            <td class="Va(t) P(10px)">`transform:matrix(1.2,.3,.4,1.5,40,10)`</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`Matrix3d(<custom value>)` <b class="Fw(n)">[\[2\]](#footnote)<a id="footnote-3" class="D(ib)"></a></b></th>
            <td class="Va(t) P(10px)">`transform:matrix(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)`</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`Rotate(90deg)`</th>
            <td class="Va(t) P(10px)">`transform:rotate(90deg)`</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`Rotate3d(10,20,30,40deg)`</th>
            <td class="Va(t) P(10px)">`transform:rotate3d(10,20,30,40deg)`</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`RotateX(20deg)`</th>
            <td class="Va(t) P(10px)">`transform:rotateX(20deg)`</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`RotateY(20deg)`</th>
            <td class="Va(t) P(10px)">`transform:rotateY(20deg)`</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`RotateZ(20deg)`</th>
            <td class="Va(t) P(10px)">`transform:rotateZ(20deg)`</td>
        </tr>

        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`Scale(-1)`</th>
            <td class="Va(t) P(10px)">`transform:scale(-1)`</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`Scale3d(4,2,.5)`</th>
            <td class="Va(t) P(10px)">`transform:scale3d(4,2,.5)`</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`ScaleX(2)`</th>
            <td class="Va(t) P(10px)">`transform:scaleX(2)`</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`ScaleY(2)`</th>
            <td class="Va(t) P(10px)">`transform:scaleY(2)`</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`Skew(20deg,20deg)`</th>
            <td class="Va(t) P(10px)">`transform:skew(20deg,20deg)`</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`SkewX(20deg)`</th>
            <td class="Va(t) P(10px)">`transform:skewX(20deg)`</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`SkewY(-20deg)`</th>
            <td class="Va(t) P(10px)">`transform:skewY(-20deg)`</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`Translate(50%,50%)`</th>
            <td class="Va(t) P(10px)">`transform:translate(50%,50%)`</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`Translate3d(10px,20px,30px)`</th>
            <td class="Va(t) P(10px)">`transform:translate3d(10px,20px,30px)`</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`TranslateX(10px)`</th>
            <td class="Va(t) P(10px)">`transform:translateX(10px)`</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`TranslateY(10px)`</th>
            <td class="Va(t) P(10px)">`transform:translateY(10px)`</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`TranslateZ(5px)`</th>
            <td class="Va(t) P(10px)">`transform:translateZ(5px)`</td>
        </tr>
    </tbody>
</table>

<div class="noteBox info">It is possible to apply multiple filters at once by creating a custom value/class in the config object:
<pre class="Fs(n)"><code class="lang-javascript"><span class="hljs-string">'custom'</span>: {
    <span class="hljs-string">'Fil(myCustomFilter)'</span>: 'contrast(150%) brightness(10%)'
}
</code></pre>
</div>

## Variables

You can use custom value identifiers to be used as &quot;variables&quot; across different styles. You set such values via the config object, for example:

```javascript
custom: {
    "$headerHeight": "20px"
}
```

Usage:

```javascript
<body class="Pt($headerHeight)">
    <header class="Mih($headerHeight) Pos(f) T(0) Start(0) End(0)">...</header>
```

Whenever the value of `$headerHeight` changes, the padding of `<body>` stays in sync with the `height` of the `<header>`.

Variables are also an easy way to abstract colors:

```javascript
custom: {
    "$primaryColor": "blue",
    "$secondaryColor": "orange",
    "$tertiaryColor": "tomato"
}
```

Such variables can then be used with any properties that set colors, for example:

<ul class="ul-list">
    <li>`Bgc($primaryColor)` for `background-color`</li>
    <li>`C($secondaryColor)` for `color`</li>
    <li>`Bdc($tertiaryColor)` for `border-color`</li>
    <li>etc.</li>
</ul>

Changing any value in the config changes all occurrences in the style sheet.

## Advanced classes

These classes are mostly contextual; they take into consideration ancestor nodes or media queries.

### Descendant selectors

You can style a node according to its relationship with its parent or ancestor, for example:

```html
<p class="foo">The following text is <b class="foo_C(#0b0)">lime</b>.</p>
```
<p class="foo">The following text is <b class="foo_C(#0b0)">lime</b>.</p>

Same class on a node outside the scope of `.foo`:

```html
<p>The following text is <b class="foo_C(#0b0)">lime</b>.</p>
```

<p>The following text is <b class="foo_C(#0b0)">lime</b>.</p>

<p class="noteBox info"><strong>Practical example</strong>:<br> we use the class `home_D(b)` to style `#main` differently on  [acss.io](http://www.acss.io) home page.</p>

#### pseudo-classes on ancestors

You can use pseudo-classes with classes relying on contextual selectors, for example `ul-list:h>V(h)` hides the direct children of `.ul-list` &mdash; only when users hover over the said list.

```html
<ul class="ul-list">
    <li class="ul-list:h>V(h)">List item #1</li>
    <li class="ul-list:h>V(h)">List item #2</li>
    <li>List item #3</li>
</ul>
```

<ul class="ul-list">
    <li class="ul-list:h>V(h)">List item #1</li>
    <li class="ul-list:h>V(h)">List item #2</li>
    <li>List item #3</li>
</ul>

<p class="noteBox important">Unlike all other Atomic classes, the ones containing descendant selectors are **not** sandboxed via the namespace (if one is set in the config). Instead, Atomizer adds `!important` to these styles.</p>

### Breakpoints

Use the config object to create breakpoints then append a modifier (`--<breakpoint name>`) to your Atomic classes so their styling comes into play only within the breakpoint they relate to.

```javascript
breakPoints: {
    'sm': '@media(min-width:500px)', // breakpoint 1
    'md': '@media(min-width:900px)', // breakpoint 2
    'lg': '@media(min-width:1200px)' // breakpoint 3
}
```

<p class="noteBox info">You can choose any name you want for the breakpoints you create via the config object.</p>

The class `P(10px)--sm` will style a box with a `padding` of `10px` inside the `sm` breakpoint while the class `P(20px)--lg` will style a box with a `padding` of `20px` inside the `lg` breakpoint.

More info about [breakpoints and responsive web design](../tutorials/responsive-web-design.html).

<hr class="Mt(50px)">

<ol id="footnote" class="ol-list">
    <li>We use the function name whenever it is bound to a `property`; for example `Rotate()` for `transform` or `Blur()` for `filter`. However, we do not have yet aliases for `calc()`, `rgba()`, etc. [\[↩\]](#footnote-1).</li>
    <li>Use the config object to set custom values for `Matrix()` and `Matrix3d()`. [\[↩\]](#footnote-2) [\[↩\]](#footnote-3).</li>
</ol>
