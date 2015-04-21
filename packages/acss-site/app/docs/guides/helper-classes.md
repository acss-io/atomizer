# Helper classes

These classes are tailored to help with common styling patterns. You can either use the helpers offered through Atomic or create your own set of helper classes.

## `Bd*` (Borders)

Styling elements with a border requires 3 properties [\[1\]](#footnote)<a id="footnote-1" class="D(ib)"></a> so to make styling via classes a bit less verbose, we have the following helpers that combine `border-style` (set to `solid`) and `border-width` (set to `1px`):

<ul class="ul-list">
    <li>`Bd` creates a `1px` border on all edges of a box</li>
    <li>`BdX` creates a `1px` border on the left and right edges of a box</li>
    <li>`BdY` creates a `1px` border on the top and left edges of a box</li>
    <li>`BdT` creates a `1px` border on the top edge of a box</li>
    <li>`BdEnd` creates a `1px` border on the right edge of a box (in a LTR context)</li>
    <li>`BdB` creates a `1px` border on the bottom edge of a box</li>
    <li>`BdStart` creates a `1px` border on the left edge of a box (in a LTR context)</li>
</ul>

You can combine one of the class above with a `border-color` of your choice (i.e. `Bdc(#ff6347)`) to get a border color different than the text color of the box.

Example with a initial border color (and `border-width` set to `1px`):

```html
<p class="Bd C(#0b0) P(10px)">Lorem ipsum dolor sit amet, id oratio graeco nostrum sit, latine eligendi scribentur mea ex. Tota dolorem voluptua eos at. Ei nec reque viderer facilis. Aliquip necessitatibus ex pri, pertinax atomorum ei sea. Ea omittam appetere posidonium per, te meliore volutpat duo, dolorem ponderum interpretaris sea ut.</p>
```

<p class="Bd C(#0b0) P(10px)">Lorem ipsum dolor sit amet, id oratio graeco nostrum sit, latine eligendi scribentur mea ex. Tota dolorem voluptua eos at. Ei nec reque viderer facilis. Aliquip necessitatibus ex pri, pertinax atomorum ei sea. Ea omittam appetere posidonium per, te meliore volutpat duo, dolorem ponderum interpretaris sea ut.</p>

Example with a custom color:

```html
<p class="Bd Bdc(#ff6347) P(10px)">Lorem ipsum dolor sit amet, id oratio graeco nostrum sit, latine eligendi scribentur mea ex. Tota dolorem voluptua eos at. Ei nec reque viderer facilis. Aliquip necessitatibus ex pri, pertinax atomorum ei sea. Ea omittam appetere posidonium per, te meliore volutpat duo, dolorem ponderum interpretaris sea ut.</p>
```

<p class="Bd Bdc(#ff6347) P(10px)">Lorem ipsum dolor sit amet, id oratio graeco nostrum sit, latine eligendi scribentur mea ex. Tota dolorem voluptua eos at. Ei nec reque viderer facilis. Aliquip necessitatibus ex pri, pertinax atomorum ei sea. Ea omittam appetere posidonium per, te meliore volutpat duo, dolorem ponderum interpretaris sea ut.</p>

<p>We have chosen to set the default `width` of those helpers to be `1px` as it is the most common use case. If you want to use a different `width` or `style` value, then you can either</p>
<ul class="ul-list">
    <li>use a granular approach, for example: `Bdw(5px) Bds(s) Bdc(#555)`</li>
    <li>create a custom class, for example: `Bd(myCustomBorder)` via the config object</li>
    <li>use **the same helper classes** with [different values](helper-classes.htmlthe-special-case-of-border-)</li>
</ul>

<p class="noteBox info">You can find abbreviated versions of `style` keywords in [rules.js](https://github.com/yahoo/atomizer/blob/master/src/rules.js#L289).</p>

## `BfcHack` (Block-formatting context)

Most authors use `overflow:hidden` to create [block-formatting contexts](http://yuiblog.com/blog/2010/05/19/css-101-block-formatting-contexts/) but such styling may come [with side-effects](http://yuiblog.com/blog/2010/09/27/clearfix-reloaded-overflowhidden-demystified/).

For this reason, we have a helper class called `BfcHack` which creates a block-formatting context that does not &quot;shrinkwrap&quot;. This is something [Nicole Sullivan and Nan Gao](http://www.stubbornella.org/content/2010/12/09/the-hacktastic-zoom-fix/#comment-18394) came up with.

<p class="noteBox warning">Note that this is a hack and may break if the content of the box is too large or if the box is next to floats.</p>

<p class="noteBox info">Atomizer plugs `zoom:1` along with `overflow:hidden` whenever you use the class `Ov(h)`. This is because `overflow:hidden` does not create a block-formatting context in old IE but `zoom` does.</p>

## `Cf` (Clearfix)

Use `Cf` for [clearfix](http://yuiblog.com/blog/2010/09/27/clearfix-reloaded-overflowhidden-demystified/).

## `Ell` (Ellipsis)

Use `Ell` to create a one-liner with ellipsis (in browsers that support `text-overflow:ellipsis`).

Example:

```html
<p class="Ell W(300px)">Lorem ipsum dolor sit amet, id oratio graeco nostrum sit, latine eligendi scribentur mea ex. Tota dolorem voluptua eos at. Ei nec reque viderer facilis. Aliquip necessitatibus ex pri, pertinax atomorum ei sea. Ea omittam appetere posidonium per, te meliore volutpat duo, dolorem ponderum interpretaris sea ut.</p>
```

<p class="Ell W(300px)">Lorem ipsum dolor sit amet, id oratio graeco nostrum sit, latine eligendi scribentur mea ex. Tota dolorem voluptua eos at. Ei nec reque viderer facilis. Aliquip necessitatibus ex pri, pertinax atomorum ei sea. Ea omittam appetere posidonium per, te meliore volutpat duo, dolorem ponderum interpretaris sea ut.</p>

## Hiding content from sighted users

Use the class `Hidden` if you want to hide content that should be accessible to screen-readers:

Example:

```html
<p>Something is <b class="Hidden">missing</b> here.</p>
```
<p>Something is <b class="Hidden">missing</b> here.</p>

## `IbBox`

Boxes that are part of inline-block constructs must be styled with multiple styles so rather than seting all of those yourself, you can simply use `IbBox` as a "shorthand" for:

```css
display: inline-block;
*display: inline;
zoom: 1;
vertical-align: top;
```

```html
   <div class="IbBox W(50%) Ta(c) Bgc(#ccc)">Box-1</div><!--
--><div class="IbBox W(50%) Ta(c) Bgc(#999)">Box-2</div>
```

Example:

<div class="IbBox W(50%) Ta(c) Bgc(#ccc)">Box-1</div><!--
--><div class="IbBox W(50%) Ta(c) Bgc(#999)">Box-2</div>

<p class="noteBox info">Remember to remove the white-space between nodes when creating inline-block constructs.</p>

## `LineClamp()`

Truncating multiple line of text across browsers is not an easy feat. Authors usually start with `-webkit-line-clamp` + flexbox and then go from there; addressing [weird bug](https://twitter.com/thierrykoblentz/status/443899465842176000) along the way.

With the help of Atomizer, you can use a class to "pass" 2 parameters:

<ul class="ul-list">
    <li>the number of lines you want to display</li>
    <li>the `max-height` to use for the box</li>
</ul>

Example:

```html
<p class="Fz(18px) Lh(1.5) LineClamp(2,54px)">Lorem ipsum dolor sit amet, id oratio graeco nostrum sit, latine eligendi scribentur mea ex. Tota dolorem voluptua eos at. Ei nec reque viderer facilis. Aliquip necessitatibus ex pri, pertinax atomorum ei sea. Ea omittam appetere posidonium per, te meliore volutpat duo, dolorem ponderum interpretaris sea ut.</p>
```
<p class="Fz(18px) Lh(1.5) LineClamp(2,54px)">Lorem ipsum dolor sit amet, id oratio graeco nostrum sit, latine eligendi scribentur mea ex. Tota dolorem voluptua eos at. Ei nec reque viderer facilis. Aliquip necessitatibus ex pri, pertinax atomorum ei sea. Ea omittam appetere posidonium per, te meliore volutpat duo, dolorem ponderum interpretaris sea ut.</p>

<p class="noteBox info">The value of `max-height` is the result of: &lt;number of lines> times &lt;font-size> times &lt;line-height>.</p>

## `Row`

Use the class `Row` to style a box that expands to fill its container, contains floats, and [more <span class="Hidden"> about Row</span>](http://cssmojo.com/row_for_grids/).

Example:

```html
<div class="Row Bgc(#0b0)">
    <div class="Fl(start) W(300px) Ta(c) P(10px)">Box-1</div>
    <div class="Fl(end) W(300px) Ta(c) P(10px)">Box-2</div>
</div>
```
<div class="Row Bgc(#0b0)">
    <div class="Fl(start) W(300px) Ta(c) P(10px)">Box-1</div>
    <div class="Fl(end) W(300px) Ta(c) P(10px)">Box-2</div>
</div>

The background of the wrapper shows which proves the box contains floats.

## `StretchedBox`

Use the class `StretchedBox` to stretch a box inside its 'containing block' as this class is mapped to the following declarations:

```css
position: absolute;
top: 0;
right: 0;
bottom: 0;
left: 0;
```

This is handy to create boxes with a [intrinsic aspect ratio](http://alistapart.com/article/creating-intrinsic-ratios-for-video). For example:

```html
<div class="Pos(r) H(0) Pt(10%)">
    <div class="StretchedBox Bgc(#0b0) P(10px) C(#fff)">I am a box with an intrinsic aspect ratio</div>
</div>
```
<div class="Pos(r) H(0) Pt(10%)">
    <div class="StretchedBox Bgc(#0b0) P(10px) C(#fff)">I am a box with an intrinsic aspect ratio</div>
</div>

## `Zoom`

Use the class `Zoom` if you support old IE and needs to [give a box a layout](http://www.satzansatz.de/cssd/onhavinglayout.html).

<hr class="Mt(50px)">

<ol id="footnote" class="ol-list">
    <li>Unless one wants the initial value of `border-width` and `border-color` [\[↩\]](#footnote-1).</li>
</ol>
