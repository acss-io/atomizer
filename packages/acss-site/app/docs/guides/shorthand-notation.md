# Shorthand notation

**We do not offer shorthand notation** (i.e. `M(5px,0,0,0)`) because this would increase the number of selectors or declarations in the style sheet (create bloat).

For example, `border-width/style/color` can be specified in any order:

<ul class="ul-list">
    <li>`Bd(1px,solid,#000)`</li>
    <li>`Bd(1px,#000,solid)`</li>
    <li>`Bd(solid,#000,1px)`</li>
    <li>`Bd(solid,1px,#000)`</li>
    <li>`Bd(#000,1px,solid)`</li>
    <li>`Bd(#000,solid,1px)`</li>
</ul>

The above creates 6 different rules for the exact same styling (a *solid 1px black* border). Yes, we could be smart about it and assign all those classes to the **same** declaration.

```css
.Bd(1px,solid,#000),
.Bd(1px,#000,solid),
.Bd(solid,#000,1px),
.Bd(solid,1px,#000),
.Bd(#000,1px,solid),
.Bd(#000,solid,1px) {
    border: 1px solid #000;
}
```

<p class="noteBox info">For the sake of readability, CSS classes on this page *do not* include the escape character (`\`) where it should be needed.</p>

We could also enforce order (i.e. `width/style/color`) to prevent such duplication but we could still have a lot of redundancy, for example classes such as these:

<ul class="ul-list">
    <li>`Bd(1px,solid,#000)`</li>
    <li>`Bd(1px,solid,#ccc)`</li>
    <li>`Bd(1px,solid,#555)`</li>
    <li>`Bd(2px,solid,#000)`</li>
    <li>`Bd(3px,solid,#000)`</li>
    <li>`Bd(1px,dotted,#000)`</li>
</ul>

Would result in:

<ul class="ul-list">
    <li>4 dupe declarations for `border-width`</li>
    <li>5 dupe declarations for `border-style`</li>
    <li>4 dupe declarations for `border-color`</li>
</ul>

Either dupe declarations or selector grouping:

```css
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
```

In our opinion, the extra bytes do not warrant allowing this syntax.

## Kinda shorthand

Even though we do not allow shorthand notation, many Atomic classes support &quot;`x/y` notation&quot; which applies the same styling on opposite edges. For example:

<ul class="ul-list">
    <li>`Mx(a)` for `margin-left:auto; margin-right:auto;`</li>
    <li>`Py(5px)` for `padding-top:5px; padding-bottom:5px;`</li>
</ul>

## The special case of `border`

When it comes to border styling, initial values exist for `width` and `color` but many authors may still want to set all 3 values: `width`, `color`, and `style`. To make things a bit less verbose, we have a set of [helpers classes for `border`](helper-classes.html#-bd-borders-) that set `style` to `solid` and `width` to `1px` (as a default).

This allows to use a single class to create a single pixel border that &quot;inherits&quot; text color, or to mix a helper class with a Atomic class for border-color (i.e. `Bd Bdc(#fff)`).

In case `solid` and `1px` are not the styles of your liking, but you still want to use the same helper classes, then you can simply overwrite those values in your own style sheet &mdash; using the rules below:

```css
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
```

<p class="noteBox info">Make sure to add the namespace to those rules in case you have chosen to set one up in your config.</p>
