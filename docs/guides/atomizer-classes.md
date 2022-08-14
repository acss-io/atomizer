---
description: Understand Atomizer classes and the available aliases.
layout: docs
section: docs
title: Atomizer classes
---

Atomizer classes are simple, single-purpose units of styling.  Much like inline styles, these styles only apply a single style declaration.  Unlike inline styles, Atomizer classes have a lower specificity, making them easier to override, and can be modified using pseudo-classes, media queries, and more.

<div class="noteBox info">Atomizer let's you define your own custom classes, please follow our <a href="./custom-classes.html">Custom classes</a> guide.</div>

## Overview

The inspiration for Atomizer syntax comes from [Emmet](http://emmet.io/), a plugin for many popular text editors which improves HTML &amp; CSS workflow.

Simple Atomizer classes are easily interpreted, since they take a simple value as a parameter.  For example, `W(**20px**)` clearly maps to `width: 20px`, and `Lh(**1.5**)` clearly maps to `line-height: 1.5`.

Complex Atomizer classes use custom identifiers known as &quot;variables&quot;, which allow values to be defined in a central location (i.e., the Atomizer [configuration](../configuration.html) file) and reused across styles.  For example, if the variable `foo` is set to `20px`, then `P(foo)` and `M(foo)` would map to `padding: 20px` and `margin: 20px`, respectively.

For more on the syntax of Atomizer classes and their value parameters, see [the Class Syntax guide](/guides/syntax.html).

<div class="noteBox info">The <a href="/reference.html">searchable reference page</a> gives you a complete listing of Atomizer classes and their supported values.</div>

## Aliases

Atomizer provides aliases for most properties <sup>[[1]](#footnote)<a id="footnote-1" class="D(ib)"></a></sup> that rely on [Functional Notation](http://www.w3.org/TR/css3-values/#functional-notation):

<div class="Ovx(s) W(100%)">
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
                <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Blur(<b>2px</b>)</code></th>
                <td class="Va(t) P(10px)"><code>filter:blur(2px)</code></td>
            </tr>
            <tr class="BdT Bdc(#0280ae.3)">
                <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Brightness(<b>.5</b>)</code></th>
                <td class="Va(t) P(10px)"><code>filter:brightness(.5)</code></td>
            </tr>
            <tr class="BdT Bdc(#0280ae.3)">
                <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Contrast(<b>200%</b>)</code></th>
                <td class="Va(t) P(10px)"><code>filter:contrast(200%)</code></td>
            </tr>
            <tr class="BdT Bdc(#0280ae.3)">
                <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Dropshadow(<b>10px,10px,20px,teal</b>)</code></th>
                <td class="Va(t) P(10px)"><code>filter:drop-shadow(16px,16px,20px,teal)</code></td>
            </tr>
            <tr class="BdT Bdc(#0280ae.3)">
                <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Grayscale(<b>50%</b>)</code></th>
                <td class="Va(t) P(10px)"><code>filter:grayscale(50%)</code></td>
            </tr>
            <tr class="BdT Bdc(#0280ae.3)">
                <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Grayscale(<b>2px</b>)</code></th>
                <td class="Va(t) P(10px)"><code>filter:grayscale(2px)</code></td>
            </tr>
            <tr class="BdT Bdc(#0280ae.3)">
                <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>HueRotate(<b>90deg</b>)</code></th>
                <td class="Va(t) P(10px)"><code>filter:hue-rotate(90deg)</code></td>
            </tr>
            <tr class="BdT Bdc(#0280ae.3)">
                <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Invert(<b>50%</b>)</code></th>
                <td class="Va(t) P(10px)"><code>filter:invert(50%)</code></td>
            </tr>
            <tr class="BdT Bdc(#0280ae.3)">
                <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Opacity(<b>20%</b>)</code></th>
                <td class="Va(t) P(10px)"><code>filter:opacity(20%)</code></td>
            </tr>
            <tr class="BdT Bdc(#0280ae.3)">
                <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Saturate(<b>20%</b>)</code></th>
                <td class="Va(t) P(10px)"><code>filter:saturate(20%)</code></td>
            </tr>
            <tr class="BdT Bdc(#0280ae.3)">
                <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Sepia(<b>50%</b>)</code></th>
                <td class="Va(t) P(10px)"><code>filter:sepia(50%)</code></td>
            </tr>
            <tr class="BdT Bdc(#0280ae.3)">
                <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Matrix(<b>&lt;custom value&gt;</b>)</code> <sup><a href="#footnote" id="footnote-2">[2]</a></sup></th>
                <td class="Va(t) P(10px)"><code>transform:matrix(1.2,.3,.4,1.5,40,10)</code></td>
            </tr>
            <tr class="BdT Bdc(#0280ae.3)">
                <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Matrix3d(<b>&lt;custom value&gt;</b>)</code> <sup><a href="#footnote" id="footnote-2">[2]</a></sup></th>
                <td class="Va(t) P(10px)"><code>transform:matrix(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)</code></td>
            </tr>
            <tr class="BdT Bdc(#0280ae.3)">
                <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Rotate(<b>90deg</b>)</code></th>
                <td class="Va(t) P(10px)"><code>transform:rotate(90deg)</code></td>
            </tr>
            <tr class="BdT Bdc(#0280ae.3)">
                <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Rotate3d(<b>10,20,30,40deg</b>)</code></th>
                <td class="Va(t) P(10px)"><code>transform:rotate3d(10,20,30,40deg)</code></td>
            </tr>
            <tr class="BdT Bdc(#0280ae.3)">
                <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>RotateX(<b>20deg</b>)</code></th>
                <td class="Va(t) P(10px)"><code>transform:rotateX(20deg)</code></td>
            </tr>
            <tr class="BdT Bdc(#0280ae.3)">
                <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>RotateY(<b>20deg</b>)</code></th>
                <td class="Va(t) P(10px)"><code>transform:rotateY(20deg)</code></td>
            </tr>
            <tr class="BdT Bdc(#0280ae.3)">
                <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>RotateZ(<b>20deg</b>)</code></th>
                <td class="Va(t) P(10px)"><code>transform:rotateZ(20deg)</code></td>
            </tr>
            <tr class="BdT Bdc(#0280ae.3)">
                <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Scale(<b>-1</b>)</code></th>
                <td class="Va(t) P(10px)"><code>transform:scale(-1)</code></td>
            </tr>
            <tr class="BdT Bdc(#0280ae.3)">
                <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Scale3d(<b>4,2,.5</b>)</code></th>
                <td class="Va(t) P(10px)"><code>transform:scale3d(4,2,.5)</code></td>
            </tr>
            <tr class="BdT Bdc(#0280ae.3)">
                <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>ScaleX(<b>2</b>)</code></th>
                <td class="Va(t) P(10px)"><code>transform:scaleX(2)</code></td>
            </tr>
            <tr class="BdT Bdc(#0280ae.3)">
                <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>ScaleY(<b>2</b>)</code></th>
                <td class="Va(t) P(10px)"><code>transform:scaleY(2)</code></td>
            </tr>
            <tr class="BdT Bdc(#0280ae.3)">
                <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Skew(<b>20deg,20deg</b>)</code></th>
                <td class="Va(t) P(10px)"><code>transform:skew(20deg,20deg)</code></td>
            </tr>
            <tr class="BdT Bdc(#0280ae.3)">
                <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>SkewX(<b>20deg</b>)</code></th>
                <td class="Va(t) P(10px)"><code>transform:skewX(20deg)</code></td>
            </tr>
            <tr class="BdT Bdc(#0280ae.3)">
                <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>SkewY(<b>-20deg</b>)</code></th>
                <td class="Va(t) P(10px)"><code>transform:skewY(-20deg)</code></td>
            </tr>
            <tr class="BdT Bdc(#0280ae.3)">
                <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Translate(<b>50%,50%</b>)</code></th>
                <td class="Va(t) P(10px)"><code>transform:translate(50%,50%)</code></td>
            </tr>
            <tr class="BdT Bdc(#0280ae.3)">
                <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Translate3d(<b>10px,20px,30px</b>)</code></th>
                <td class="Va(t) P(10px)"><code>transform:translate3d(10px,20px,30px)</code></td>
            </tr>
            <tr class="BdT Bdc(#0280ae.3)">
                <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>TranslateX(<b>10px</b>)</code></th>
                <td class="Va(t) P(10px)"><code>transform:translateX(10px)</code></td>
            </tr>
            <tr class="BdT Bdc(#0280ae.3)">
                <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>TranslateY(<b>10px</b>)</code></th>
                <td class="Va(t) P(10px)"><code>transform:translateY(10px)</code></td>
            </tr>
            <tr class="BdT Bdc(#0280ae.3)">
                <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>TranslateZ(<b>5px</b>)</code></th>
                <td class="Va(t) P(10px)"><code>transform:translateZ(5px)</code></td>
            </tr>
        </tbody>
    </table>
</div>

<div class="noteBox info">It is possible to apply multiple filters at once by creating a <a href="../configuration.html#custom">custom value</a> or class in Atomizer&#39;s configuration.  For example:

{% highlight js %}
custom: {
    'Fil(myCustomFilter)': 'contrast(150%) brightness(10%)',
}
{% endhighlight %}
</div>

---

<div id="footnote"></div>

1. Aliases use the function name whenever it is bound to a `property`; for example `Rotate()` for `transform` or `Blur()` for `filter`. However, there are not yet aliases for `calc()`, `rgba()`, etc. <sub>[[↩]](#footnote-1)</sub>
1. Use the Atomizer config object to set [custom values](../configuration.html#custom) for `Matrix()` and `Matrix3d()`. <sub>[[↩]](#footnote-2)</sub>
