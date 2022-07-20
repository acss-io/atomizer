---
section: docs
layout: docs
title: Box level alignment
---

<p>These examples shows different ways relating to the alignment of boxes within their containers in the various CSS box layout models: block layout, table layout, flex layout</p>
<p class="noteBox warning">
    <b class="Fw(b)">NOTE:</b> Grid is not currently supported
</p>
{% include subhead.html tag="h3" title="<code>align-content</code> construct" %}

<p>Aligns the contents of the box as a whole (as the alignment subject) within the box itself along the block/column/cross axis of the box. Following example shows <code>Ac(sb)</code>, <b class="Fw(b)">align-content: Space between</b></p>

{% highlight html %}
<div class="D(f) Ac(sb) W(160px) H(300px) Bgc(#add8e6) P(10px) Gp(10px) Fxf(w)">
    <div class="W(20px) H(20px) P(1rem) Bgc(#ccc)">1</div>
    <div class="W(20px) H(20px) P(1rem) Bgc(#ccc)">2</div>
    <div class="W(20px) H(20px) P(1rem) Bgc(#ccc)">3</div>
    <div class="W(20px) H(20px) P(1rem) Bgc(#ccc)">4</div>
    <div class="W(20px) H(20px) P(1rem) Bgc(#ccc)">5</div>
    <div class="W(20px) H(20px) P(1rem) Bgc(#ccc)">6</div>
</div>
{% endhighlight %}

<div class="D(f) Ac(sb) W(160px) H(300px) Bgc(#add8e6) P(10px) Gp(10px) Fxf(w)">
    <div class="W(20px) H(20px) P(1rem) Bgc(#ccc)">1</div>
    <div class="W(20px) H(20px) P(1rem) Bgc(#ccc)">2</div>
    <div class="W(20px) H(20px) P(1rem) Bgc(#ccc)">3</div>
    <div class="W(20px) H(20px) P(1rem) Bgc(#ccc)">4</div>
    <div class="W(20px) H(20px) P(1rem) Bgc(#ccc)">5</div>
    <div class="W(20px) H(20px) P(1rem) Bgc(#ccc)">6</div>
</div>

{% include subhead.html tag="h3" title="<code>align-items</code> construct" %}

<p>This property specifies the default <code>align-self</code> for <strong>all</strong> of the child boxes (including anonymous boxes) participating in this box’s formatting context.. Following example shows <code>Ai(c)</code>, <b class="Fw(b)">align-items: center</b></p>

{% highlight html %}
<div class="D(f) Ai(c) H(100px) Bgc(#add8e6) P(10px) Gp(10px) Mend(1rem)">
    <div class="D(f) Ai(c) W(20px) H(20px) P(1rem) Bgc(#ccc)">1</div>
    <div class="D(f) Ai(c) W(20px) H(30px) P(1rem) Bgc(#ccc)">2</div>
    <div class="D(f) Ai(c) W(20px) H(10px) P(1rem) Bgc(#ccc)">3</div>
    <div class="D(f) Ai(c) W(20px) H(40px) P(1rem) Bgc(#ccc)">4</div>
    <div class="D(f) Ai(c) W(20px) H(30px) P(1rem) Bgc(#ccc)">5</div>
    <div class="D(f) Ai(c) W(20px) H(50px) P(1rem) Bgc(#ccc)">6</div>
</div>
{% endhighlight %}

<div class="D(f) Ai(c) H(100px) Bgc(#add8e6) P(10px) Gp(10px) Mend(1rem)">
    <div class="D(f) Ai(c) W(20px) H(20px) P(1rem) Bgc(#ccc)">1</div>
    <div class="D(f) Ai(c) W(20px) H(30px) P(1rem) Bgc(#ccc)">2</div>
    <div class="D(f) Ai(c) W(20px) H(10px) P(1rem) Bgc(#ccc)">3</div>
    <div class="D(f) Ai(c) W(20px) H(40px) P(1rem) Bgc(#ccc)">4</div>
    <div class="D(f) Ai(c) W(20px) H(30px) P(1rem) Bgc(#ccc)">5</div>
    <div class="D(f) Ai(c) W(20px) H(50px) P(1rem) Bgc(#ccc)">6</div>
</div>

{% include subhead.html tag="h3" title="<code>align-self</code> construct" %}

<p>Aligns the box (as the alignment subject) within its containing block (as the alignment container) along the block/column/cross axis of the alignment container: the box’s outer edges are aligned within its alignment container as described by its alignment value. Following example shows <code>As(fs)</code>, <b class="Fw(b)">align-self: flex-start</b></p>

{% highlight html %}
<div class="D(f) Ai(c) H(100px) Bgc(#add8e6) P(10px) Gp(10px) Mend(1rem)">
    <div class="As(fs) D(f) Ai(c) W(20px) H(20px) P(1rem) Bgc(#ccc)">1</div>
    <div class="D(f) Ai(c) W(20px) H(30px) P(1rem) Bgc(#ccc)">2</div>
    <div class="D(f) Ai(c) W(20px) H(10px) P(1rem) Bgc(#ccc)">3</div>
    <div class="D(f) Ai(c) W(20px) H(40px) P(1rem) Bgc(#ccc)">4</div>
    <div class="D(f) Ai(c) W(20px) H(30px) P(1rem) Bgc(#ccc)">5</div>
    <div class="D(f) Ai(c) W(20px) H(50px) P(1rem) Bgc(#ccc)">6</div>
</div>
{% endhighlight %}

<div class="D(f) Ai(c) H(100px) Bgc(#add8e6) P(10px) Gp(10px) Mend(1rem)">
    <div class="As(fs) D(f) Ai(c) W(20px) H(20px) P(1rem) Bgc(#ccc)">1</div>
    <div class="D(f) Ai(c) W(20px) H(30px) P(1rem) Bgc(#ccc)">2</div>
    <div class="D(f) Ai(c) W(20px) H(10px) P(1rem) Bgc(#ccc)">3</div>
    <div class="D(f) Ai(c) W(20px) H(40px) P(1rem) Bgc(#ccc)">4</div>
    <div class="D(f) Ai(c) W(20px) H(30px) P(1rem) Bgc(#ccc)">5</div>
    <div class="D(f) Ai(c) W(20px) H(50px) P(1rem) Bgc(#ccc)">6</div>
</div>


{% include subhead.html tag="h3" title="<code>justify-content</code> construct" %}

<p>Aligns the contents of the box as a whole (as the alignment subject) within the box itself (as the alignment container) along the inline/row/main axis of the box. Following example shows <code>Jc(se)</code>, <b class="Fw(b)">justify-content: space-evenly</b></p>

{% highlight html %}
<div class="D(f) Jc(se) H(100px) Bgc(#add8e6) P(10px) Gp(10px) Mend(1rem)">
    <div class="D(f) Ai(c) W(20px) H(20px) P(1rem) Bgc(#ccc)">1</div>
    <div class="D(f) Ai(c) W(20px) H(30px) P(1rem) Bgc(#ccc)">2</div>
    <div class="D(f) Ai(c) W(20px) H(10px) P(1rem) Bgc(#ccc)">3</div>
    <div class="D(f) Ai(c) W(20px) H(40px) P(1rem) Bgc(#ccc)">4</div>
    <div class="D(f) Ai(c) W(20px) H(30px) P(1rem) Bgc(#ccc)">5</div>
    <div class="D(f) Ai(c) W(20px) H(50px) P(1rem) Bgc(#ccc)">6</div>
</div>
{% endhighlight %}

<div class="D(f) Jc(se) H(100px) Bgc(#add8e6) P(10px) Gp(10px) Mend(1rem)">
    <div class="D(f) Ai(c) W(20px) H(20px) P(1rem) Bgc(#ccc)">1</div>
    <div class="D(f) Ai(c) W(20px) H(30px) P(1rem) Bgc(#ccc)">2</div>
    <div class="D(f) Ai(c) W(20px) H(10px) P(1rem) Bgc(#ccc)">3</div>
    <div class="D(f) Ai(c) W(20px) H(40px) P(1rem) Bgc(#ccc)">4</div>
    <div class="D(f) Ai(c) W(20px) H(30px) P(1rem) Bgc(#ccc)">5</div>
    <div class="D(f) Ai(c) W(20px) H(50px) P(1rem) Bgc(#ccc)">6</div>
</div>