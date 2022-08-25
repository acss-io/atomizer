---
description: How to align boxes within containers.
layout: docs
section: docs
title: Box level alignment
---

These examples shows different ways to align boxes within their containers in the various CSS box layout models: `block` layout, `table` layout, and `flex` layout. There is a separate guide for [CSS Grid](layout.html#grids).

## [`align-content`](../reference.html#aligncontent)

Aligns the contents of the box as a whole (as the alignment subject) within the box itself along the block/column/cross axis of the box.

The following example shows `Ac(sb)` -> `align-content: space-between`.

```html
<div class="D(f) Ac(sb)">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
</div>
```

<div class="D(f) Ac(sb) W(160px) H(300px) Bgc(#add8e6) P(10px) Gp(10px) Fxf(w)">
    <div class="W(20px) H(20px) P(1rem) Bgc(#ccc)">1</div>
    <div class="W(20px) H(20px) P(1rem) Bgc(#ccc)">2</div>
    <div class="W(20px) H(20px) P(1rem) Bgc(#ccc)">3</div>
    <div class="W(20px) H(20px) P(1rem) Bgc(#ccc)">4</div>
    <div class="W(20px) H(20px) P(1rem) Bgc(#ccc)">5</div>
    <div class="W(20px) H(20px) P(1rem) Bgc(#ccc)">6</div>
</div>

## [`align-items`](../reference.html#alignitems)

This property specifies the default `align-items` for **all** of the child boxes (including anonymous boxes) participating in this box’s formatting context.

The following example shows `Ai(c)` -> `align-items: center`.

```html
<div class="D(f) Ai(c)">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
</div>
```

<div class="D(f) Ai(c) H(100px) Bgc(#add8e6) P(10px) Gp(10px) Mend(1rem)">
    <div class="D(f) Ai(c) W(20px) H(20px) P(1rem) Bgc(#ccc)">1</div>
    <div class="D(f) Ai(c) W(20px) H(30px) P(1rem) Bgc(#ccc)">2</div>
    <div class="D(f) Ai(c) W(20px) H(10px) P(1rem) Bgc(#ccc)">3</div>
    <div class="D(f) Ai(c) W(20px) H(40px) P(1rem) Bgc(#ccc)">4</div>
    <div class="D(f) Ai(c) W(20px) H(30px) P(1rem) Bgc(#ccc)">5</div>
    <div class="D(f) Ai(c) W(20px) H(50px) P(1rem) Bgc(#ccc)">6</div>
</div>

## [`align-self`](../reference.html#alignself)

Aligns the box (as the alignment subject) within its containing block (as the alignment container) along the block/column/cross axis of the alignment container (the box’s outer edges are aligned within its alignment container as described by its alignment value).

The following example shows `As(fs)` -> `align-self: flex-start`.

```html
<div class="D(f) Ai(c)">
    <div class="As(fs) D(f) Ai(c)">1</div>
    <div class="D(f) Ai(c)">2</div>
    <div class="D(f) Ai(c)">3</div>
    <div class="D(f) Ai(c)">4</div>
    <div class="D(f) Ai(c)">5</div>
    <div class="D(f) Ai(c)">6</div>
</div>
```

<div class="D(f) Ai(c) H(100px) Bgc(#add8e6) P(10px) Gp(10px) Mend(1rem)">
    <div class="As(fs) D(f) Ai(c) W(20px) H(20px) P(1rem) Bgc(#ccc)">1</div>
    <div class="D(f) Ai(c) W(20px) H(30px) P(1rem) Bgc(#ccc)">2</div>
    <div class="D(f) Ai(c) W(20px) H(10px) P(1rem) Bgc(#ccc)">3</div>
    <div class="D(f) Ai(c) W(20px) H(40px) P(1rem) Bgc(#ccc)">4</div>
    <div class="D(f) Ai(c) W(20px) H(30px) P(1rem) Bgc(#ccc)">5</div>
    <div class="D(f) Ai(c) W(20px) H(50px) P(1rem) Bgc(#ccc)">6</div>
</div>

## [`justify-content`](../reference.html#justifycontent)

Aligns the contents of the box as a whole (as the alignment subject) within the box itself (as the alignment container) along the inline/row/main axis of the box.

The following example shows `Jc(se)` ->`justify-content: space-evenly`.

```html
<div class="D(f) Jc(se)">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
</div>
```

<div class="D(f) Jc(se) H(100px) Bgc(#add8e6) P(10px) Gp(10px) Mend(1rem)">
    <div class="D(f) Ai(c) W(20px) H(20px) P(1rem) Bgc(#ccc)">1</div>
    <div class="D(f) Ai(c) W(20px) H(30px) P(1rem) Bgc(#ccc)">2</div>
    <div class="D(f) Ai(c) W(20px) H(10px) P(1rem) Bgc(#ccc)">3</div>
    <div class="D(f) Ai(c) W(20px) H(40px) P(1rem) Bgc(#ccc)">4</div>
    <div class="D(f) Ai(c) W(20px) H(30px) P(1rem) Bgc(#ccc)">5</div>
    <div class="D(f) Ai(c) W(20px) H(50px) P(1rem) Bgc(#ccc)">6</div>
</div>

## [`justify-items`](../reference.html#justifyitems)

This property specifies the default `justify-items` for all of the child boxes (including anonymous boxes) participating in this box’s formatting context.

The following example shows `Ji(e)` -> `justify-items: end`.

{% highlight html %}

<div class="D(g) Gtc(threeColEvenGrid) Ji(e)">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
</div>
{% endhighlight %}

<div class="D(g) Gtc(threeColEvenGrid) Ji(e) Bgc(#add8e6) P(10px) Gp(10px) Mend(1rem)">
    <div class="D(f) W(20px) H(20px) P(1rem) Bgc(#ccc)">1</div>
    <div class="D(f) W(20px) H(30px) P(1rem) Bgc(#ccc)">2</div>
    <div class="D(f) W(20px) H(10px) P(1rem) Bgc(#ccc)">3</div>
    <div class="D(f) W(20px) H(40px) P(1rem) Bgc(#ccc)">4</div>
    <div class="D(f) W(20px) H(30px) P(1rem) Bgc(#ccc)">5</div>
    <div class="D(f) W(20px) H(50px) P(1rem) Bgc(#ccc)">6</div>
</div>

<p class="noteBox warning">
    <b class="Fw(b)">NOTE:</b> <code>justify-items</code> only works in grid mode.
</p>

## [`justify-self`](../reference.html#justifyself)

Justifies the box (as the alignment subject) within its containing block (as the alignment container) along the inline/row/main axis of the alignment container (the box’s outer edges are aligned within its alignment container).

The following example shows `Js(s)` -> `justify-self: start`.

{% highlight html %}

<div class="D(g) Gtc(threeColEvenGrid) Ji(e)">
    <div class="Js(s)">1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
</div>
{% endhighlight %}

<div class="D(g) Gtc(threeColEvenGrid) Ji(e) Bgc(#add8e6) P(10px) Gp(10px) Mend(1rem)">
    <div class="D(f) Js(s) Ai(c) W(20px) H(20px) P(1rem) Bgc(#ccc)">1</div>
    <div class="D(f) Ai(c) W(20px) H(30px) P(1rem) Bgc(#ccc)">2</div>
    <div class="D(f) Ai(c) W(20px) H(10px) P(1rem) Bgc(#ccc)">3</div>
    <div class="D(f) Ai(c) W(20px) H(40px) P(1rem) Bgc(#ccc)">4</div>
    <div class="D(f) Ai(c) W(20px) H(30px) P(1rem) Bgc(#ccc)">5</div>
    <div class="D(f) Ai(c) W(20px) H(50px) P(1rem) Bgc(#ccc)">6</div>
</div>

<p class="noteBox warning">
    <b class="Fw(b)">NOTE:</b> <code>justify-self</code> only works in grid mode.
</p>
