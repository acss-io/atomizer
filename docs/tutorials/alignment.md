---
description: How to align boxes within containers.
layout: docs
section: docs
title: Box level alignment
---

These examples shows different ways to align boxes within their containers in the various CSS box layout models: `block` layout, `table` layout, and `flex` layout.

<p class="noteBox warning"><strong>NOTE:</strong> Grid is not currently supported</p>

## `align-content`

Aligns the contents of the box as a whole (as the alignment subject) within the box itself along the block/column/cross axis of the box. Following example shows `Ac(sb)`, _align-content: Space between_

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

## `align-items`

This property specifies the default `align-self` for <strong>all</strong> of the child boxes (including anonymous boxes) participating in this box’s formatting context.. Following example shows `Ai(c)`, _align-items: center_

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

## `align-self`

Aligns the box (as the alignment subject) within its containing block (as the alignment container) along the block/column/cross axis of the alignment container: the box’s outer edges are aligned within its alignment container as described by its alignment value. Following example shows `As(fs)`, _align-self: flex-start_

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

## `justify-content`

Aligns the contents of the box as a whole (as the alignment subject) within the box itself (as the alignment container) along the inline/row/main axis of the box. Following example shows `Jc(se)`, _justify-content: space-evenly_

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
