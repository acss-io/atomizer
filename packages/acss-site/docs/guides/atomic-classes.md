---
section: docs
layout: docs
---

# Atomic classes

Atomic classes are simple, single-purpose units of styling.  Much like inline styles, Atomic styles only apply a single style declaration.  Unlike inline styles, Atomic styles have a lower specificity, making them easier to override, and can be modified through the use of pseudo-classes, media queries, and more.  

The inspiration for Atomic syntax comes from [Emmet](http://emmet.io/), a plugin for many popular text editors which greatly improves HTML & CSS workflow.

Simple Atomic classes are easily interpreted, since they take a simple value as an parameter.  For example, <code>W(<b class="hljs-string">20px</b>)</code> clearly maps to `width: 20px`, and <code>Lh(<b class="hljs-string">1.5</b>)</code> clearly maps to `line-height: 1.5`.

Complex Atomic classes make use of custom identifiers known as "variables", which allow values to be defined in a central location (i.e., the Atomizer configuration file) and reused across styles.  For example, if the variable `foo` is set to `20px`, then `P(foo)` and `M(foo)` would map to `padding: 20px` and `margin: 20px`, respectively.

For more on the syntax of Atomic classes and their value parameters, see [the Class Syntax guide](/guides/syntax.html).

<div class="noteBox info">The [searchable reference page](/reference) gives you a complete listing of Atomic classes and their supported values.</div>

## Aliases

Atomic CSS provides aliases for most properties [\[1\]](#footnote)<a id="footnote-1" class="D(ib)"></a> that rely on [Functional Notation](http://www.w3.org/TR/css3-values/#functional-notation):

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
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Blur(<b class="hljs-string">2px</b>)</code></th>
            <td class="Va(t) P(10px)"><code>filter:blur(2px)</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Brightness(<b class="hljs-string">.5</b>)</code></th>
            <td class="Va(t) P(10px)"><code>filter:brightness(.5)</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Contrast(<b class="hljs-string">200%</b>)</code></th>
            <td class="Va(t) P(10px)"><code>filter:contrast(200%)</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Dropshadow(<b class="hljs-string">10px,10px,20px,teal</b>)</code></th>
            <td class="Va(t) P(10px)"><code>filter:drop-shadow(16px,16px,20px,teal)</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Grayscale(<b class="hljs-string">50%</b>)</code></th>
            <td class="Va(t) P(10px)"><code>filter:grayscale(50%)</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Grayscale(<b class="hljs-string">2px</b>)</code></th>
            <td class="Va(t) P(10px)"><code>filter:grayscale(2px)</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>HueRotate(<b class="hljs-string">90deg</b>)</code></th>
            <td class="Va(t) P(10px)"><code>filter:hue-rotate(90deg)</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Invert(<b class="hljs-string">50%</b>)</code></th>
            <td class="Va(t) P(10px)"><code>filter:invert(50%)</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Opacity(<b class="hljs-string">20%</b>)</code></th>
            <td class="Va(t) P(10px)"><code>filter:opacity(20%)</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Saturate(<b class="hljs-string">20%</b>)</code></th>
            <td class="Va(t) P(10px)"><code>filter:saturate(20%)</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Sepia(<b class="hljs-string">50%</b>)</code></th>
            <td class="Va(t) P(10px)"><code>filter:sepia(50%)</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Matrix(<b class="hljs-string">&lt;custom value></b>)</code> <b class="Fw(n)">[\[2\]](#footnote)<a id="footnote-2" class="D(ib)"></a></b></th>
            <td class="Va(t) P(10px)"><code>transform:matrix(1.2,.3,.4,1.5,40,10)</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Matrix3d(<b class="hljs-string">&lt;custom value></b>)</code> <b class="Fw(n)">[\[2\]](#footnote)<a id="footnote-3" class="D(ib)"></a></b></th>
            <td class="Va(t) P(10px)"><code>transform:matrix(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Rotate(<b class="hljs-string">90deg</b>)</code></th>
            <td class="Va(t) P(10px)"><code>transform:rotate(90deg)</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Rotate3d(<b class="hljs-string">10,20,30,40deg</b>)</code></th>
            <td class="Va(t) P(10px)"><code>transform:rotate3d(10,20,30,40deg)</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>RotateX(<b class="hljs-string">20deg</b>)</code></th>
            <td class="Va(t) P(10px)"><code>transform:rotateX(20deg)</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>RotateY(<b class="hljs-string">20deg</b>)</code></th>
            <td class="Va(t) P(10px)"><code>transform:rotateY(20deg)</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>RotateZ(<b class="hljs-string">20deg</b>)</code></th>
            <td class="Va(t) P(10px)"><code>transform:rotateZ(20deg)</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Scale(<b class="hljs-string">-1</b>)</code></th>
            <td class="Va(t) P(10px)"><code>transform:scale(-1)</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Scale3d(<b class="hljs-string">4,2,.5</b>)</code></th>
            <td class="Va(t) P(10px)"><code>transform:scale3d(4,2,.5)</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>ScaleX(<b class="hljs-string">2</b>)</code></th>
            <td class="Va(t) P(10px)"><code>transform:scaleX(2)</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>ScaleY(<b class="hljs-string">2</b>)</code></th>
            <td class="Va(t) P(10px)"><code>transform:scaleY(2)</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Skew(<b class="hljs-string">20deg,20deg</b>)</code></th>
            <td class="Va(t) P(10px)"><code>transform:skew(20deg,20deg)</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>SkewX(<b class="hljs-string">20deg</b>)</code></th>
            <td class="Va(t) P(10px)"><code>transform:skewX(20deg)</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>SkewY(<b class="hljs-string">-20deg</b>)</code></th>
            <td class="Va(t) P(10px)"><code>transform:skewY(-20deg)</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Translate(<b class="hljs-string">50%,50%</b>)</code></th>
            <td class="Va(t) P(10px)"><code>transform:translate(50%,50%)</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Translate3d(<b class="hljs-string">10px,20px,30px</b>)</code></th>
            <td class="Va(t) P(10px)"><code>transform:translate3d(10px,20px,30px)</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>TranslateX(<b class="hljs-string">10px</b>)</code></th>
            <td class="Va(t) P(10px)"><code>transform:translateX(10px)</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>TranslateY(<b class="hljs-string">10px</b>)</code></th>
            <td class="Va(t) P(10px)"><code>transform:translateY(10px)</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>TranslateZ(<b class="hljs-string">5px</b>)</code></th>
            <td class="Va(t) P(10px)"><code>transform:translateZ(5px)</code></td>
        </tr>
    </tbody>
</table>

<div class="noteBox info">It is possible to apply multiple filters at once by creating a custom value or class in Atomizer's configuration.  For example:

<pre class="Fs(n)"><code class="lang-javascript"><span class="hljs-string">'custom'</span>: {
    <span class="hljs-string">'Fil(myCustomFilter)'</span>: 'contrast(150%) brightness(10%)'
}
</code></pre>
</div>

<hr class="Mt(50px)">

<ol id="footnote" class="ol-list">
    <li>Aliases use the function name whenever it is bound to a `property`; for example `Rotate()` for `transform` or `Blur()` for `filter`. However, there are not yet aliases for `calc()`, `rgba()`, etc. [\[↩\]](#footnote-1).</li>
    <li>Use the Atomizer config object to set custom values for `Matrix()` and `Matrix3d()`. [\[↩\]](#footnote-2).</li>
</ol>
