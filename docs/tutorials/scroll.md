---
section: docs
layout: docs
title: Scroll Snap
---

These examples shows the various scroll snap properties supported by Atomizer.

## [`scroll-behavior`](../reference.html#scrollbehavior)

The [scroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior) CSS property sets the behavior for a scrolling box when scrolling is triggered by the navigation, `CSSOM` scrolling APIs or `SCROLL-SNAP`. 

Following example shows `Sb(s)` = `scroll-behavior: smooth`.

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

## [`scroll-snap-align`](../reference.html#scrollsnapalign)

The [scroll-snap-align](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-align) property specifies the box's snap position as an alignment of its snap area (as the alignment subject) within its snap container's snapport (as the alignment container). You can specify up to 2 values for this property, representing the block and inline axes, respectively. If you only give 1 value, that value will be used for both axes. 

Following example shows `Ssa(s)` = `scroll-snap-align: start`.

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

## [`scroll-snap-type`](../reference.html#scrollsnaptype)

The [scroll-snap-type](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type) property specifies whether a scroll container is a scroll snap container, how strictly it snaps, and which axes are considered. If no strictness value is specified, proximity is assumed.

Following example shows `Sst(x_p)` = `scroll-snap-type: x proximity`.

```html
<div class="Sst(x_p)">
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

## [`scroll-margin`](../reference.html#scrollmarginalledges) && [`scroll-margin-*`](../reference.html#scrollmargintop)

The [scroll-margin](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin) shorthand property sets scroll margin on all sides of an element at once, much like the `margin` property does for margin on an element, can also use longhand versions like [scroll-margin-left](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-left) etc. If all elements have the same spacing requirements, consider using `scroll-padding` on the parent container instead of `scroll-margin` because that affects spacing for all elements within the container. 

Following example shows `Smstart(2em)` = `scroll-margin-left: 2em`.

```html
<div>
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

## [`scroll-padding`](../reference.html#scrollpaddingalledges) & [`scroll-padding-*`](../reference.html#scrollpaddingtop)constructs

The [scroll-padding](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding) shorthand property sets scroll padding on all sides of an element at once, much like the `padding` property does for padding on an element, can also use longhand versions like [scroll-padding-left](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding-left) etc. 

Following example shows `Spx(20px)` = `scroll-padding-left: 20px; scroll-padding-right: 20px;`.

```html
<div class="Spx(20px)">
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

## [`scroll-snap-stop`](../reference.html#scrollsnapstop)

The [scroll-snap-stop](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-stop) CSS property defines whether or not the scroll container is allowed to "pass over" possible snap positions. 

Following example shows `Sst(x_m)` = `scroll-snap-stop: x mandatory`.

```html
<div class="Sst(x_m)">
    <div>1</div>
    <div>2</div>
    <div>3</div>
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
