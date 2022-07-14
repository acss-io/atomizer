---
section: docs
layout: docs
title: Shorthand notation
---

<p><b class="Fw(b)">ACSS</b> <strong>generally does not offer shorthand notation</strong> (e.g., <code>M(5px,0,0,0)</code>) because this would increase the number of selectors or declarations in the style sheet (i.e., create bloat.)</p>

<p>For example, <code>border-width/style/color</code> can be specified in any order:</p>

<ul class="ul-list">
    <li><em>Bd(1px,solid,#000)</em></li>
    <li><em>Bd(1px,#000,solid)</em></li>
    <li><em>Bd(solid,#000,1px)</em></li>
    <li><em>Bd(solid,1px,#000)</em></li>
    <li><em>Bd(#000,1px,solid)</em></li>
    <li><em>Bd(#000,solid,1px)</em></li>
</ul>

<p>The above creates 6 different rules for the exact same styling (a <em>solid 1px black</em> border). While the tool could be smart and assign all those classes to the <strong>same</strong> declaration, you&#39;d still end up with more bytes than is necessary:</p>

{% highlight css %}
.Bd(1px,solid,#000),
.Bd(1px,#000,solid),
.Bd(solid,#000,1px),
.Bd(solid,1px,#000),
.Bd(#000,1px,solid),
.Bd(#000,solid,1px) {
    border: 1px solid #000;
}
{% endhighlight %}

<p>It would also be possible to enforce order (i.e., <code>width,style,color</code>) to prevent such duplication, but you&#39;d still end up with a lot of redundancy. For example:</p>

<ul class="ul-list">
    <li><em>Bd(1px,solid,#000)</em></li>
    <li><em>Bd(1px,solid,#ccc)</em></li>
    <li><em>Bd(1px,solid,#555)</em></li>
    <li><em>Bd(2px,solid,#000)</em></li>
    <li><em>Bd(3px,solid,#000)</em></li>
    <li><em>Bd(1px,dotted,#000)</em></li>
</ul>

<p>Would result in:</p>

<ul class="ul-list">
    <li>4 duplicate declarations for <code>border-width</code></li>
    <li>5 duplicate declarations for <code>border-style</code></li>
    <li>4 duplicate declarations for <code>border-color</code></li>
</ul>

<p>...either through duplicate declarations or selector grouping:</p>

{% highlight css %}
.Bd(1px,solid,#000),
.Bd(1px,solid,#ccc),
.Bd(1px,solid,#555),
.Bd(1px,dotted,#000) {
    border-width: 1px;
}

.Bd(1px,solid,#000),
.Bd(1px,solid,#ccc),
.Bd(1px,solid,#555),
.Bd(2px,solid,#000),
.Bd(3px,solid,#000) {
    border-style: solid;
}

.Bd(1px,solid,#000),
.Bd(2px,solid,#000),
.Bd(3px,solid,#000),
.Bd(1px,dotted,#000) {
    border-color: #000;
}
{% endhighlight %}

{% include subhead.html tag="h2" title="Convenience and helper classes" %}

{% include subhead.html tag="h3" title="<code>X</code>/<code>Y</code> notation" %}

<p>Even though <b class="Fw(b)">ACSS</b> does not allow shorthand notation, many <b class="Fw(b)">ACSS</b> classes support &quot;<code>x</code>/<code>y</code> notation&quot; which applies the same styling on opposite edges. For example:</p>

<ul class="ul-list">
    <li><code>Mx(a)</code> for <code>margin-left:auto; margin-right:auto;</code></li>
    <li><code>Py(5px)</code> for <code>padding-top:5px; padding-bottom:5px;</code></li>
</ul>

{% include subhead.html tag="h3" title="Border helper classes" %}

<p>When it comes to border styling, initial values exist for <code>width</code> and <code>color</code> but many authors may still want to set all 3 values: <code>width</code>, <code>color</code>, and <code>style</code>. To make things a bit less verbose, <b class="Fw(b)">ACSS</b> offers a set of <a href="helper-classes.html#-bd-borders-">helper classes for borders</a> which set <code>style</code> to <code>solid</code> and <code>width</code> to <code>1px</code> (as a default).</p>

<p>This allows you to use a single class to create a single pixel border that either &quot;inherits&quot; text color or can be combined with an Atomic class for border-color (e.g., <code>Bd Bdc(#fff)</code>).</p>

<p>In case <code>solid</code> and <code>1px</code> are not the default style you&#39;d prefer, but you still want to use the border helper classes, you can simply redefine those classes in your own style sheet, using the rules below:</p>

{% highlight css %}
.Bd,
.BdX,
.BdY,
.BdT,
.BdEnd,
.BdB,
.BdStart {
    border-style: <style>;
}
.Bd {
    border-width: <width>;
}
.BdX {
    border-right-width: <width>;
    border-left-width: <width>;
}
.BdY {
    border-top-width: <width>;
    border-bottom-width: <width>;
}
.BdT {
    border-top-width: <width>;
}
.BdEnd {
    border-right-width: <width>;
}
.BdB {
    border-bottom-width: <width>;
}
.BdStart {
    border-left-width: <width>;
}
{% endhighlight %}

<p class="noteBox info">If you&#39;ve chosen to namespace your <b class="Fw(b)">ACSS</b> classes, be sure to add the namespace to the above rules.</p>
