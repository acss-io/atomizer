# Grid system

Atomic is not your everyday CSS solution, it does not come with a _out-of-the-box_ grid system. Instead, you would use any property you want to build grids *the way **you** want*.



## Widths

You can choose from creating a unit-base system (i.e. `1/12`), using percentages (i.e. `20%`), or using any arbitrary value you see fit (i.e. `15em`). In other words, the way you apply widths onto boxes is entirely up to you!

<p class="noteBox info">All classes related to `width` start with `W` &mdash; for example: `W(15em)`.</p>

### Fractions

`W(1/12)`, `W(2/12)`, `W(3/12)`, `W(4/12)`, `W(5/12)`, `W(6/12)`, `W(7/12)`, etc.

If you run [Atomizer](https://github.com/yahoo/atomizer), all you need to do is to use the above classes in your markup - where needed - and Atomizer will create all the necessary rules for you.<br>
If you do *not* run [Atomizer](https://github.com/yahoo/atomizer), you then must add the classes you want to the config object, for example:
```json
'classNames': [
    'W(1/12),
    'W(2/12),
    'W(3/12),
    'W(4/12),
    'W(5/12),
    'W(6/12),
    'W(7/12),
    'W(8/12),
    'W(9/12),
    'W(10/12)',
    'W(11/12)',
    'W(12/12)'
]
```


### Percentages

`W(10%)`, `W(20%)`, `W(30%)`, `W(40%)`, ..., `W(100%)`

Same as for fractions, if you run [Atomizer](https://github.com/yahoo/atomizer), all you need to do is to use the above classes in your markup - where needed - and Atomizer will create all the necessary rules for you.<br>
If you do *not* run [Atomizer](https://github.com/yahoo/atomizer), you then must add the classes you want to the config object:
```json
'classNames': [
    'W(10%)',
    'W(20%)',
    'W(30%)',
    'W(40%)',
    'W(50%)',
    'W(60%)',
    'W(70%)',
    'W(80%)',
    'W(90%)',
    'W(100%)'
]
```

### `em` units

`W(10em)`, `W(50em)`

Same as for fractions and percentages, if you run [Atomizer](https://github.com/yahoo/atomizer), all you need to do is to use the above classes in your markup - where needed - and Atomizer will create all the necessary rules for you.<br>
If you do *not* run [Atomizer](https://github.com/yahoo/atomizer), you then must add the classes you want to the config object:
```json
'classNames': [
    'W(10em)',
    'W(50em)'
]
```

### Mixing values

You can have anything you want:

`W(a)`, `W(1/4)`, `W(2/4)`, `W(3/4)`, `W(4/4)`, `W(5%)`, `W(10em)`, `W(200px)`

Same as for fractions, percentages, `em` units, etc. If you run [Atomizer](https://github.com/yahoo/atomizer), all you need to do is to use the above classes in your markup - where needed - and Atomizer will create all the necessary rules for you.<br>
If you do *not* run [Atomizer](https://github.com/yahoo/atomizer), you then must add the classes you want to the config object:

```json
'classNames': [
    'W(a)',
    'W(1/4)',
    'W(2/4)',
    'W(inh)',
    'W(3/4)',
    'W(4/4)',
    'W(5%)',
    'W(10em)',
    'W(200px)'
]
```

<p class="noteBox info">The suffix `inh` for `inherit` is the <strong>same for all properties</strong>.</p>

## Layouts

There are many ways to display boxes next to each other... Your pick:

### `inline-block` construct <a id="footnote-1" class="D-ib"></a>

This styling has great browser support [\[1\]](#footnote) and it is direction-friendly (boxes are displayed according to `ltr` / `rtl` contexts).

When creating inline-block constructs, you should use our helper class (`IbBox`) instead of `D(ib)` because the former gives you old IE support plus vertical-alignment (`top`) for free.

#### Example

```html
<div>
   <div class="IbBox W(1/3) P(20px) Bgc(#ccc)">Box 1</div><!--
--><div class="IbBox W(1/3) P(20px) Bgc(#999)">Box 2</div><!--
--><div class="IbBox W(1/3) P(20px) Bgc(#777)">Box 3</div>
</div>
<hr />
<div dir="rtl">
   <div class="IbBox W(1/3) P(20px) Bgc(#ccc)">Box 1</div><!--
--><div class="IbBox W(1/3) P(20px) Bgc(#999)">Box 2</div><!--
--><div class="IbBox W(1/3) P(20px) Bgc(#777)">Box 3</div>
</div>
```

<h4 class="penResult">Result</h4>

<p data-height="190" data-theme-id="12469" data-slug-hash="emMPaw" data-default-tab="result" data-user="thierry" class='codepen'>See the Pen <a href='http://codepen.io/thierry/pen/emMPaw/'>emMPaw</a> by Thierry (<a href='http://codepen.io/thierry'>@thierry</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

<div class="noteBox warning">
    <p><strong>3 things to be aware of when creating `inline-block` constructs</strong>:</p>
    <ol class="ol-list">
       <li>white-space between nodes in the markup creates space between boxes, so make sure to address this by either removing that space altogether, using html comments (`<!-- -->`), or implementing some other trick like the one used by [PureCSS](http://purecss.io/grids/).</li>
       <li>`vertical-align:top` is needed to make sure all boxes are top aligned (`IbBox` takes care of #2 and #3).</li>
       <li>IE7 <em>doesn't support</em> `display:inline-block` but Atomizer takes care of this behind the scene [\[1\]](#footnote).</li>
    </ol>
</div>

### `float` construct <a id="footnote-2" class="D-ib"></a>

This styling has great browser support and [Atomizer](https://github.com/yahoo/atomizer) makes it &quot;direction&quot; agnostic [\[2\]](#footnote).

If you run [Atomizer](https://github.com/yahoo/atomizer), all you need to do is to use the class `Fl-start` in your markup - where needed - and Atomizer will create the necessary rule for you.<br>
If you do not run [Atomizer](https://github.com/yahoo/atomizer), you then must add that class to the config object:
```json
'classNames': [
    'Fl(start)'
]
```

#### Example

```html
<div>
   <div class="Fl(start) W(50%) P(20px) Bgc(#ccc)">Box 1</div>
   <div class="Fl(start) W(50%) P(20px) Bgc(#999)">Box 2</div>
</div>
```

<h4 class="penResult">Result</h4>

<p data-height="110" data-theme-id="12469" data-slug-hash="PwewjM" data-default-tab="result" data-user="thierry" class='codepen'>See the Pen <a href='http://codepen.io/thierry/pen/PwewjM/'>PwewjM</a> by Thierry (<a href='http://codepen.io/thierry'>@thierry</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

<p class="penResult">The <em>exact same markup</em> with the `rtl` version of the style sheet:</p>

<p data-height="110" data-theme-id="12469" data-slug-hash="OPZPjL" data-default-tab="result" data-user="thierry" class='codepen'>See the Pen <a href='http://codepen.io/thierry/pen/OPZPjL/'>OPZPjL</a> by Thierry (<a href='http://codepen.io/thierry'>@thierry</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

<p class="noteBox info">[Atomizer](https://github.com/yahoo/atomizer) can also auto-generate `background-color` and `color`.</p>

<h3> `table` and `table-cell` construct</h3>

<p>This styling has good browser support (IE8+) and is direction-friendly (boxes are displayed according to `ltr` / `rtl` contexts).</p>

<p>`D-tb`, `D-tbc`, `Va-m`, `Ta-c`</p>

If you run [Atomizer](https://github.com/yahoo/atomizer), all you need to do is to use the classes above in your markup - where needed - and [Atomizer](https://github.com/yahoo/atomizer) will create the necessary rule for you.<br>
If you do not run [Atomizer](https://github.com/yahoo/atomizer), you then must add those classes to the config object:
```json
'classNames': [
    'D(tb)',
    'D(tbc)',
    'Va(m)',
    'Ta(c)'
]
```

#### Example

```html
<div class="D-tb W-100% Ta-c">
    <div class="D(tbc) Va(m) P(20px) Bgc(#ccc)">Box <br />Number <br />1</div>
    <div class="D(tbc) Va(m) P(20px) Bgc(#999)">Box Number 2</div>
    <div class="D(tbc) Va(m) P(20px) Bgc(#777)">Box Number 3</div>
    <div class="D(tbc) Va(m) P(20px) Bgc(#555)">BoxNumber 4</div>
</div>
<hr />
<div class="D-tb W-100% Va-m Ta-c" dir="rtl">
    <div class="D(tbc) Va(m) P(20px) Bgc(#ccc)">Box <br />Number <br />1</div>
    <div class="D(tbc) Va(m) P(20px) Bgc(#999)">Box Number 2</div>
    <div class="D(tbc) Va(m) P(20px) Bgc(#777)">Box Number 3</div>
    <div class="D(tbc) Va(m) P(20px) Bgc(#555)">BoxNumber 4</div>
</div>
```

<h4 class="penResult">Result</h4>

<p data-height="250" data-theme-id="12469" data-slug-hash="GgdgMa" data-default-tab="result" data-user="thierry" class='codepen'>See the Pen <a href='http://codepen.io/thierry/pen/GgdgMa/'>GgdgMa</a> by Thierry (<a href='http://codepen.io/thierry'>@thierry</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

<p><strong>Tip:</strong> one can also use `table-header-group` and/or `table-footer-group` to swap boxes vertically without removing them from the flow:</p>

```html
<div class="D(tb) W(100%) Ta(c)">
    <div class="D(tbfg) Fz(20px) Bgc(#ccc)">Box Number 1</div>
    <div class="D(tbc) Fz(20px) Bgc(#999)">Box Number 2</div>
    <div class="D(tbhg) Fz(20px) Bgc(#777)">Box Number 3</div>
</div>
```

<h4 class="penResult">Result</h4>

<p data-height="105" data-theme-id="12469" data-slug-hash="MYGYQm" data-default-tab="result" data-user="thierry" class='codepen'>See the Pen <a href='http://codepen.io/thierry/pen/MYGYQm/'>MYGYQm</a> by Thierry (<a href='http://codepen.io/thierry'>@thierry</a>) on <a href='http://codepen.io'>CodePen</a>.</p>


<h3>`flexbox` construct</h3>

<p>Browser support for `flexbox` is [not that great](http://caniuse.com/#search=flexbox) but nonetheless you can use Atomic to leverage its awesomeness.</p>

<p>`D(f)`, `Flf(w)`, `Jc(sb)`</p>

If you run [Atomizer](https://github.com/yahoo/atomizer), all you need to do is to use the classes above in your markup - where needed - and [Atomizer](https://github.com/yahoo/atomizer) will create the necessary rule for you.<br>
If you do not run [Atomizer](https://github.com/yahoo/atomizer), you then must add those classes to the config object:
```json
'classNames': [
    'D(f)',
    'Flf(w)',
    'Jc(sb)'
]
```
#### Example

```html
<div class="D(f) Flf(w) Jc(sb)">
  <div class="W(100px) H(100px) Lh(100px) Fz(30px) Ta(c) Bgc(#ccc)">Box 1</div>
  <div class="W(100px) H(100px) Lh(100px) Fz(30px) Ta(c) Bgc(#ccc)">Box 2</div>
  <div class="W(100px) H(100px) Lh(100px) Fz(30px) Ta(c) Bgc(#ccc)">Box 3</div>
  <div class="W(100px) H(100px) Lh(100px) Fz(30px) Ta(c) Bgc(#ccc)">Box 3</div>
</div>
```

<h4 class="penResult">Result</h4>

<p data-height="155" data-theme-id="12469" data-slug-hash="Jovoem" data-default-tab="result" data-user="thierry" class='codepen'>See the Pen <a href='http://codepen.io/thierry/pen/Jovoem/'>Jovoem</a> by Thierry (<a href='http://codepen.io/thierry'>@thierry</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

<hr class="Mt-50px">

<ul id="footnote" class="ul-list">
    <li>1. Atomic.css provides a patch for oldIE [\[↩\]](#footnote-1).</li>
    <li>2. Atomic.css relies on `start` and `end` instead of `left` and `right` which allows the usage of the **same** classes regardless of script context [\[↩\]](#footnote-2).</li>
</ul>
