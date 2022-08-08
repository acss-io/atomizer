---
section: docs
layout: docs
title: Scroll Snap
---

These examples shows the various scroll snap properties supported by Atomizer.

### `scroll-behavior` construct

The scroll-behavior CSS property sets the behavior for a scrolling box when scrolling is triggered by the navigation, `CSSOM` scrolling APIs or `SCROLL-SNAP`.

```html
<div class="Sb(s)">
    <div>1</div>
    <div>2</div>
    <div>3</div>
</div>
```

<div class="Sb(s) Sst(x_m) Ovx(s) Ovy(h) W(200px) H(200px) D(f) Mt(20px)">
    <div class="Ssa(s) Miw(200px) H(200px) D(f) Ai(c) Jc(c) Fz(2em) Bgc(#add8e6) C(#ff)">1</div>
    <div class="Ssa(s) Miw(200px) H(200px) D(f) Ai(c) Jc(c) Fz(2em) Bgc(#ccc)">2</div>
    <div class="Ssa(s) Miw(200px) H(200px) D(f) Ai(c) Jc(c) Fz(2em) Bgc(#add8e6) C(#ff)">3</div>
</div>


### `scroll-snap-align` construct

You can specify up to 2 values for this property, representing the block and inline axes, respectively. If you only give 1 value, that value will be used for both axes.

```html
<div class="Sb(s)">
    <div class="Ssa(s)">1</div>
    <div class="Ssa(c)">2</div>
    <div class="Ssa(e)">3</div>
</div>
```

<div class="Sb(s) Sst(x_m) Ovx(s) Ovy(h) W(200px) H(200px) D(f) Mt(20px)">
    <div class="Ssa(s) Miw(160px) H(200px) D(f) Ai(c) Jc(c) Fz(2em) Bgc(#add8e6) C(#ff)">1</div>
    <div class="Ssa(c) Miw(160px) H(200px) D(f) Ai(c) Jc(c) Fz(2em) Bgc(#ccc)">2</div>
    <div class="Ssa(e) Miw(160px) H(200px) D(f) Ai(c) Jc(c) Fz(2em) Bgc(#add8e6) C(#ff)">3</div>
</div>


### `scroll-snap-type` construct

The `scroll-snap-type` property specifies whether a scroll container is a scroll snap container, how strictly it snaps, and which axes are considered. If no strictness value is specified, proximity is assumed.


```html
<div class="Sb(s) Sst(x_p)">
    <div>1</div>
    <div>2</div>
    <div>3</div>
</div>
```

<div class="Sb(s) Sst(x_p) Ovx(s) Ovy(h) W(160px) H(200px) D(f) Mt(20px)">
    <div class="Ssa(s) Miw(160px) H(200px) D(f) Ai(c) Jc(c) Fz(2em) Bgc(#add8e6) C(#ff)">1</div>
    <div class="Ssa(s) Miw(160px) H(200px) D(f) Ai(c) Jc(c) Fz(2em) Bgc(#ccc)">2</div>
    <div class="Ssa(s) Miw(160px) H(200px) D(f) Ai(c) Jc(c) Fz(2em) Bgc(#add8e6) C(#ff)">3</div>
</div>

### `scroll-margin` && `scroll-margin-*` constructs

The `scroll-margin` shorthand property sets scroll margin on all sides of an element at once, much like the `margin` property does for margin on an element. If all elements have the same spacing requirements, consider using `scroll-padding` on the parent container instead of `scroll-margin` because that affects spacing for all elements within the container.

```html
<div class="Sb(s) Sst(x_m)">
    <div>1</div>
    <div class="Smstart(2em)">2</div>
    <div>3</div>
</div>
```

<div class="Sb(s) Sst(x_m) Ovx(s) Ovy(h) W(180px) H(200px) D(f) Gp(20px) Mt(20px)">
    <div class="Ssa(c) Miw(160px) H(200px) D(f) Ai(c) Jc(c) Fz(2em) Bgc(#add8e6) C(#ff)">1</div>
    <div class="Ssa(c) Smstart(2em) Miw(160px) H(200px) D(f) Ai(c) Jc(c) Fz(2em) Bgc(#ccc)">2</div>
    <div class="Ssa(c) Miw(160px) H(200px) D(f) Ai(c) Jc(c) Fz(2em) Bgc(#add8e6) C(#ff)">3</div>
</div>


### `scroll-padding` & `scroll-padding-*`constructs

The `scroll-padding` shorthand property sets scroll padding on all sides of an element at once, much like the `padding` property does for padding on an element.


```html
<div class="Sb(s) Sst(x_m) Spx(20px) Px(20px)">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    ...
</div>
```

<div class="Sb(s) Sst(x_m) Ovx(s) Ovy(h) Maw(738px) H(200px) D(f) Gp(20px) Spx(20px) Px(20px) Bdc(#add8e6) Bdw(1px) Bds(s) Mt(20px)">
    <div class="Ssa(s) Miw(160px) H(200px) D(f) Ai(c) Jc(c) Fz(2em) Bgc(#add8e6) C(#ff)">1</div>
    <div class="Ssa(s) Miw(160px) H(200px) D(f) Ai(c) Jc(c) Fz(2em) Bgc(#ccc)">2</div>
    <div class="Ssa(s) Miw(160px) H(200px) D(f) Ai(c) Jc(c) Fz(2em) Bgc(#add8e6) C(#ff)">3</div>
    <div class="Ssa(s) Miw(160px) H(200px) D(f) Ai(c) Jc(c) Fz(2em) Bgc(#ccc)">4</div>
    <div class="Ssa(s) Miw(160px) H(200px) D(f) Ai(c) Jc(c) Fz(2em) Bgc(#add8e6) C(#ff)">5</div>
    <div class="Ssa(s) Miw(160px) H(200px) D(f) Ai(c) Jc(c) Fz(2em) Bgc(#ccc)">6</div>
    <div class="Ssa(s) Miw(160px) H(200px) D(f) Ai(c) Jc(c) Fz(2em) Bgc(#add8e6) C(#ff)">7 </div>
</div>

### `scroll-snap-stop` construct

The `scroll-snap-stop` CSS property defines whether or not the scroll container is allowed to "pass over" possible snap positions.

```html
<div class="Sb(s) Sst(x_m)">
    <div class="Ssa(a)">1</div>
    <div class="Ssa(a)">2</div>
    <div class="Ssa(a)">3</div>
    ...
</div>
```

<div class="Sb(s) Sst(x_m) Sss(a) Ovx(s) Ovy(h) W(160px) H(200px) D(f) Gp(20px) Spx(20px) Px(20px) Bdc(#add8e6) Bdw(1px) Bds(s) Mt(20px)">
    <div class="Ssa(s) Sss(a) Miw(160px) H(200px) D(f) Ai(c) Jc(c) Fz(2em) Bgc(#add8e6) C(#ff)">1</div>
    <div class="Ssa(s) Sss(a) Miw(160px) H(200px) D(f) Ai(c) Jc(c) Fz(2em) Bgc(#ccc)">2</div>
    <div class="Ssa(s) Sss(a) Miw(160px) H(200px) D(f) Ai(c) Jc(c) Fz(2em) Bgc(#add8e6) C(#ff)">3</div>
    <div class="Ssa(s) Sss(a) Miw(160px) H(200px) D(f) Ai(c) Jc(c) Fz(2em) Bgc(#ccc)">4</div>
    <div class="Ssa(s) Sss(a) Miw(160px) H(200px) D(f) Ai(c) Jc(c) Fz(2em) Bgc(#add8e6) C(#ff)">5</div>
    <div class="Ssa(s) Sss(a) Miw(160px) H(200px) D(f) Ai(c) Jc(c) Fz(2em) Bgc(#ccc)">6</div>
    <div class="Ssa(s) Sss(a) Miw(160px) H(200px) D(f) Ai(c) Jc(c) Fz(2em) Bgc(#add8e6) C(#ff)">7 </div>
</div>