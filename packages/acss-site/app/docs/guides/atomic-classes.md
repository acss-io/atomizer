# Atomic classes

Atomic classes ultimately increase the speed of development as they follow a consistent and easy to remember syntax. The inspiration comes from [Emmet](http://emmet.io/), a plugin for many popular text editors which greatly improves HTML & CSS workflow.

It might take you a short time to get familiar with these class names but as soon as you start using them you'll be at full speed in no time.

<div class="noteBox info">The [reference page](/reference) lets you quickly search for properties, values, or class names.</div>

You use a config object to create the styles you need but you can also *rely on the tool to create many of these styles for you* (to some extend).

## Simple classes

These classes are the ones Atomizer can make sense of without the need to check the config object; classes like `W(20px)` (`width:20px`), `Lh(1.5)` (`line-height:1.5`), etc.

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

Atomic CSS uses aliases for properties that rely on values using parentheses (i.e. `blur(2px)`). For example, most `transform` properties have aliases:

<table class="Ta(start) W(100%)">
    <caption class="Hidden">Aliases for Atomic classes</caption>
    <thead>
        <tr>
            <th scope="col" class="P(10px)">Atomic classes</th>
            <th scope="col" class="P(10px)">Styles</th>
            <th scope="col" class="P(10px)">Aliases</th>
        </tr>
    </thead>
    <tbody>
        <tr class="BdT Bdc-#cecece">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`Trfr(90deg)`</th>
            <td class="Va(t) P(10px)">`transform:rotate(90°)`</td>
            <td class="Va(t) P(10px)">`Rot(90deg)`</td>
        </tr>
        <tr class="BdT Bdc-#cecece">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`Trfsc(1,2)`</th>
            <td class="Va(t) P(10px)">`transform:scale(1,2)`</td>
            <td class="Va(t) P(10px)">`Scale(1,2)`</td>
        </tr>
        <tr class="BdT Bdc-#cecece">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`Trfscx(2)`</th>
            <td class="Va(t) P(10px)">`transform:scaleX(2)`</td>
            <td class="Va(t) P(10px)">`ScaleX(2)`</td>
        </tr>
        <tr class="BdT Bdc-#cecece">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`Trfscy(2)`</th>
            <td class="Va(t) P(10px)">`transform:scaleY(2)`</td>
            <td class="Va(t) P(10px)">`ScaleY(2)`</td>
        </tr>
        <tr class="BdT Bdc-#cecece">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`Trfskx(20deg)`</th>
            <td class="Va(t) P(10px)">`transform:skewX(20°)`</td>
            <td class="Va(t) P(10px)">`SkewX(20deg)`</td>
        </tr>
        <tr class="BdT Bdc-#cecece">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`Trfsky(-20deg)`</th>
            <td class="Va(t) P(10px)">`transform:skewY(-20°)`</td>
            <td class="Va(t) P(10px)">`SkewY(-20deg)`</td>
        </tr>
        <tr class="BdT Bdc-#cecece">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`Trft(10px,20px)`</th>
            <td class="Va(t) P(10px)">`transform:translate(10px,20px)`</td>
            <td class="Va(t) P(10px)">`Trans(10px,20px)`</td>
        </tr>
        <tr class="BdT Bdc-#cecece">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`Trftx(10px)`</th>
            <td class="Va(t) P(10px)">`transform:translateX(10px)`</td>
            <td class="Va(t) P(10px)">`TransX(10px)`</td>
        </tr>
        <tr class="BdT Bdc-#cecece">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`Trfty(10px)`</th>
            <td class="Va(t) P(10px)">`transform:translateY(10px)`</td>
            <td class="Va(t) P(10px)">`TransY(10px)`</td>
        </tr>
        <tr class="BdT Bdc-#cecece">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`Trfo(50%)`</th>
            <td class="Va(t) P(10px)">`transform-origin:50%`</td>
            <td class="Va(t) P(10px)">No alias</td>
        </tr>
        <tr class="BdT Bdc-#cecece">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">`Trfs(p3)`</th>
            <td class="Va(t) P(10px)">`transform-style:preserve-3d(2)`</td>
            <td class="Va(t) P(10px)">No alias</td>
        </tr>
    </tbody>
</table>

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

Whenever the value of `$headerHeight` changes, the padding of `body` stays in in sync with the height of the `header`.

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

<p class="noteBox info"><strong>Practical example</strong>:<br> we use the class `home-page(D-b)` to style `#main` differently on  [acss.io](http://www.acss.io) home page.</p>

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

## Shorthand notation

Atomic CSS is all about *optimization*, so we do not offer shorthand notation for the most common properties (i.e. `margin`, `padding`, etc.). The reason for this is that shorthand allows users to express styles in many ways which would create more classes/selectors in `atomic.css`.
