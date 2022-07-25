---
section: docs
layout: docs
title: Class syntax
---

<p><b class="Fw(b)">ACSS</b> and Helper classes follow a strict syntax, which makes the classnames easier to interpret by humans and easier to parse by tools such as Atomizer.</p>

{% include subhead.html tag="h2" title="The syntax" %}

<pre>
[<b><a href="#context">&lt;context></a></b>[<b>:<a href="#pseudo-class">&lt;pseudo-class></a></b>]<b><a href="#combinator">&lt;combinator></a></b>]<b class="Fw(b)"><a  href="#style">&lt;Style></a></b>[(<b><a href="#value">&lt;value></a>,<a href="#value">&lt;value></a>?,...</b>)][<b><a href="#-">&lt;!></a></b>][<b><a href="#pseudo-class">:&lt;pseudo-class></a></b>][<b><a href="#pseudo-element">::&lt;pseudo-element></a></b>][<b>--<a href="#breakpoint-identifier">&lt;breakpoint_identifier></a></b>]
</pre>

<p>At its core, a <b class="Fw(b)">ACSS</b> or Helper class is represented by a <a href="#style">&lt;Style&gt;</a>. </p>

<p><b class="Fw(b)">ACSS</b> classes typically require one <a href="#-lt-value-">&lt;value&gt;</a>, enclosed in parentheses, though some classes may accept more (eg, the helper class <a href="/guides/helper-classes.html#-lineclamp-"><code>LineClamp()</code></a> accepts two.)  Helper classes may not require a <a href="#-lt-value-">&lt;value&gt;</a>, in which case the parentheses may be omitted.</p>

<p>Optionally, you may prefix the style with a <a href="#-lt-context-">&lt;context&gt;</a> class and <a href="#combinator">&lt;combinator&gt;</a>. The context class may optionally include a <a href="#-lt-pseudo-class-">&lt;pseudo-class&gt;</a>.</p>

<p>You may also optionally suffix the style with <a href="#-lt-">&lt;!&gt;</a> (for <code>!important</code>), a <a href="#-lt-pseudo-class-">&lt;pseudo-class&gt;</a>, a <a href="#-lt-pseudo-element-">&lt;pseudo-element&gt;</a>, and a <a href="#-lt-breakpoint_identifier-">&lt;breakpoint_identifier&gt;</a>.</p>

{% include subhead.html tag="h3" title="RTL/LTR" %}

<p>Any occurrence of <code>left</code> and <code>right</code> keywords or their abbreviated form ala <a href="http://docs.emmet.io/cheat-sheet/">Emmet</a> (i.e., <code>l</code> and <code>r</code>) in <a href="#-lt-style-">&lt;Style&gt;</a> or <a href="#-lt-value-">&lt;value&gt;</a>  must be replaced with the keywords <code>start</code> and <code>end</code>.  Atomizer will automatically translate the CSS output for left-to-right (LTR) or right-to-left (RTL) depending on options passed during execution.</p>

<p>For example, <code>Mend(2px)</code> maps to <code>margin-right: 2px</code> in a LTR context and <code>margin-left: 2px</code> in an RTL context, and <code>Pstart(1em)</code> would map to <code>padding-left: 1em</code> in a LTR context, etc.</p>

{% include subhead.html tag="h2" title="Examples" %}

<table class="Ta(start) W(100%)">
    <caption class="Hidden">Atomic class Examples</caption>
    <thead>
        <tr>
            <th scope="col" class="P(10px)">HTML classes</th>
            <th scope="col" class="P(10px)">What they do</th>
        </tr>
    </thead>
    <tbody>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>D(<b>n</b>)</code></th>
            <td class="Va-t P(10px)">This is mapped to <code>display: none</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>D(<b>n</b>)<b>!</b></code></th>
            <td class="Va-t P(10px)">This is mapped to <code>display: none !important</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Fz(<b>1em</b>)</code></th>
            <td class="Va-t P(10px)">This is mapped to <code>font-size: 1em</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Fz(<b>18px</b>)</code></th>
            <td class="Va-t P(10px)">This is mapped to <code>font-size: 18px</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Td(<b>u</b>)<b>:h</b></code></th>
            <td class="Va-t P(10px)">This underlines text on mouseover</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Bxs(<b>n</b>)</code></th>
            <td class="Va-t P(10px)">This is mapped to <code>box-shadow: none</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Bxs(<b>foo</b>)<b>--lg</b></code></th>
            <td class="Va-t P(10px)">This applies a custom box-shadow inside the &quot;lg&quot; breakpoint <a href="#footnote">[1]</a><a id="footnote-1" class="D(ib)"></a></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Bxs(<b>foo</b>)<b>:h--lg</b></code></th>
            <td class="Va-t P(10px)">Same styling as above but on mouseover only <a href="#footnote">[1]</a><a id="footnote-1" class="D(ib)"></a></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>C(<b>#000</b>)</code></th>
            <td class="Va-t P(10px)">This sets the color to black</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>C(<b>#000.5</b>)</code></th>
            <td class="Va-t P(10px)">This sets the color to black with a 50% opacity</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>M(<b>bar</b>)</code></th>
            <td class="Va-t P(10px)">This applies a &quot;global&quot; value to <code>margin</code> <a href="#footnote">[2]</a><a id="footnote-2" class="D(ib)"></a></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Mend(<b>0</b>)</code></th>
            <td class="Va-t P(10px)">This is mapped to <code>margin-right: 0</code> in a LTR context <a href="#footnote">[3]</a><a id="footnote-3" class="D(ib)"></a></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Ta(<b>start</b>)</code></th>
            <td class="Va-t P(10px)">This is mapped to <code>text-align:left</code> in a LTR context <a href="#footnote">[3]</a><a id="footnote-3" class="D(ib)"></a></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Cl(<b>start</b>)</code></th>
            <td class="Va-t P(10px)">This is mapped to <code>clear:left</code> in a LTR context <a href="#footnote">[3]</a><a id="footnote-3" class="D(ib)"></a></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Bdstartw(<b>0</b>)</code></th>
            <td class="Va-t P(10px)">This is mapped to <code>border-left-width:0</code> in a LTR context <a href="#footnote">[3]</a><a id="footnote-3" class="D(ib)"></a></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Rotate(<b>-90deg</b>)</code></th>
            <td class="Va-t P(10px)">This is an <a href="atomic-classes.html#aliases">alias</a> mapped to <code>transform: rotate(-90deg)</code> <a href="#footnote">[4]</a><a id="footnote-4" class="D(ib)"></a></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>LineClamp(<b>2,50px</b>)</code></th>
            <td class="Va-t P(10px)">This is a <em>helper</em> which truncates text after 2 lines <a href="#footnote">[5]</a><a id="footnote-5" class="D(ib)"></a>.</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code><b>list_</b>D(<b>ib</b>)</code></th>
            <td class="Va-t P(10px)">This element is styled with <code>display:inline-block</code> when it is a descendant of a node to which the class<code>list</code> is applied <a href="#footnote">[6]</a><a id="footnote-6" class="D(ib)"></a>.</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code><b>list&gt;</b>D(<b>ib</b>)</code></th>
            <td class="Va-t P(10px)">This element is styled with <code>display:inline-block</code> when it is a direct child of a node to which the class <code>list</code> is applied to <a href="#footnote">[6]</a><a id="footnote-6" class="D(ib)"></a>.</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code><b>box:h_</b>D(<b>n</b>)</code></th>
            <td class="Va-t P(10px)">This element is hidden when users hover over its ancestor with the class <code>.box</code> <a href="#footnote">[6]</a><a id="footnote-6" class="D(ib)"></a>.</td>
        </tr>
    </tbody>
</table>

<div class="noteBox info">The <a href="/reference">reference page</a> lets you quickly search for properties, values, or class names.</div>

{% include subhead.html tag="h2" title="Syntax Definitions" %}

{% include subhead.html tag="h3" title="&lt;context&gt;" %}

<p>Optional.</p>

<p>A <strong>class</strong> applied to an ancestor or sibling of the node (see <a href="#examples-">examples</a>).</p>

{% include subhead.html tag="h3" title="&lt;pseudo-class&gt;" %}

<p>Optional.</p>

<p>A suffix mapped to a <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes">pseudo-class</a>, for example:</p>

<ul>
    <li><code>a</code> for <code>:active</code></li>
    <li><code>c</code> for <code>:checked</code></li>
    <li><code>f</code> for <code>:focus</code></li>
    <li><code>h</code> for <code>:hover</code></li>
    <li>etc.</li>
</ul>

<p class="noteBox info">You can find the complete list of pseudo-classes and their abbreviations in <a href="https://github.com/acss-io/atomizer/blob/master/src/lib/grammar.js#L6">Atomizer&#39;s grammar library</a>.</p>

<p>Pseudo-classes may be applied to any regular class or &lt;context&gt; class. For example:</p>

{% include subhead.html tag="h4" title="Regular class" %}

{% highlight html %}
<div class="foo">
    <div class="D(n):h"></div>
</div>
{% endhighlight %}

<p>The above creates the following rule:</p>

{% highlight css %}
.D\(n\)\:h\:hover {
  display: none;
}
{% endhighlight %}

<p>This causes the <code>display:none</code> style to be applied to the current element when hovered over.</p>

{% include subhead.html tag="h4" title="Context class" %}

{% highlight html %}
<div class="foo">
    <div class="foo:h_D(n)"></div>
</div>
{% endhighlight %}

<p>The above creates the following rule:</p>

{% highlight css %}
.foo:hover .foo\:h_D\(n\) {
  display: none;
}
{% endhighlight %}

<p>This class hides the current element whenever its ancestor (<code>.foo</code>) is hovered over.</p>

{% include subhead.html tag="h3" title="&lt;pseudo-element&gt;" %}

<p>Optional.</p>

<p>A suffix mapped to a <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements">pseudo-element</a>. The following pseudo-elements are supported:</p>

<ul>
    <li><code>b</code> for <code>::before</code></li>
    <li><code>a</code> for <code>::after</code></li>
    <li><code>fl</code> for <code>::first-letter</code></li>
    <li><code>fli</code> for <code>::first-line</code></li>
    <li><code>ph</code> for <code>::placeholder</code></li>
</ul>

{% include subhead.html tag="h3" title="&lt;combinator&gt;" %}

<p>Required if &lt;context&gt; is provided. One of the following may be used:</p>

<h4 id="the-underscore-character-_-">The underscore character (<code>_</code>)</h4>

<p>Use this to create a contextual style based on the <a href="http://www.w3.org/wiki/CSS/Selectors/combinators/descendant">descendant combinator</a>.</p>

{% highlight html %}
<div class="foo">
    <div class="foo_D(n)"></div>
</div>
{% endhighlight %}

<p>This class hides the element whenever one of its ancestor has the class <code>foo</code> attached to it.</p>

<h4 id="the-right-angle-bracket-character-">The right angle bracket character (<code>&gt;</code>)</h4>

<p>Use this to create a contextual style based on the <a href="http://www.w3.org/wiki/CSS/Selectors/combinators/child">child combinator</a>.</p>

<p>Example:</p>

{% highlight html %}
<div class="foo">
    <div class="foo>D(n)"></div>
</div>
{% endhighlight %}

<p>This class hides the element if its parent has the class <code>foo</code> attached to it.</p>

<h4 id="the-plus-sign-">The plus sign (<code>+</code>)</h4>

<p>Use the <a href="http://www.w3.org/wiki/CSS/Selectors/combinators/adjacent">adjacent sibling combinator</a> to style only if the immediate next sibling of an particular element.</p>

<p>Example:</p>

{% highlight html %}
<div class="foo"></div>
<div class="foo+D(n)"></div>
{% endhighlight %}

<p>This class hides the element if its immediate previous sibling has the class <code>foo</code> attached to it.</p>

<h4 id="the-tilde-sign-">The tilde sign (<code>~</code>)</h4>

<p>Use the <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/General_sibling_combinator">general sibling combinator</a> to style only if the sibling of an particular element.</p>

<p>Example:</p>

{% highlight html %}
<div class="foo"></div>
<div class="bar"></div>
<div class="foo~D(n)"></div>
{% endhighlight %}

<p>This class hides the element if one of its previous siblings has the class <code>foo</code> attached to it.</p>

{% include subhead.html tag="h3" title="&lt;Style&gt;" %}

<p>Required.</p>

<p>CSS property or <a href="helper-classes.html">helper class</a>. <a href="http://en.wikipedia.org/wiki/Capitalization">Capitalized</a> with no separator between words such as dashes or new capitals. </p>

<p class="noteBox info"><b class="Fw(b)">ACSS</b> classes generally follow the <a href="http://docs.emmet.io/cheat-sheet/">Emmet</a> syntax for their naming convention.</p>

{% include subhead.html tag="h3" title="&lt;value&gt;" %}

<p>Optional for helper classes, required for <b class="Fw(b)">ACSS</b> classes.</p>

<p>Examples:</p>

{% highlight css %}
.Ta\(c\) {
    text-align: center;
}
.M\(20px\) {
    margin: 20px;
}
{% endhighlight %}

<p>There are three value types: Defined, Literal and Variable</p>

<h4 id="defined-values">Defined values</h4>

<p>This is the <em>abbreviation</em> of a <strong>defined value</strong>. Defined values are valid keywords for any given property. (For example, <code>inherit</code> (<code>inh</code>), <code>auto</code> (<code>a</code>), etc.)  Defined values attempt to follow 
<a href="http://docs.emmet.io/cheat-sheet/">Emmet syntax</a> as closely as possible.</p>

<p> Defined values are enumerated in Atomizer&#39;s ruleset, so there is no need to define such values in Atomizer configuration before using such values. </p>

<p><strong>Defined values that are not present in Emmet</strong> are named according to the rules below:</p>

<ul class="ul-list">
    <li>Value should be abbreviated with the first letter of the value.</li>
    <li>If two values share the same initial letter, then the next value in alphabetical order is <a href="http://en.wikipedia.org/wiki/Abbreviation">abbreviated</a> in <a href="http://en.wikipedia.org/wiki/Contraction_%28grammar%29">contracted</a> form.</li>
    <li>If <strong>one value</strong> is composed by two or more words (e.g. <code>inline-block</code>) then the first letter of each word should be used with no separator between them (e.g. <code>inline-block</code> becomes <code>ib</code>, <code>space-between</code> becomes <code>sb</code>).</li>
    <li>The following values are special exceptions as they are available almost globally:
        <ul class="ul-list">
            <li><code>inh</code> = <code>inherit</code></li>
            <li><code>ini</code> = <code>initial</code></li>
            <li><code>rv</code> = <code>revert</code></li>
            <li><code>rvl</code> = <code>revert-layer</code></li>
            <li><code>un</code> = <code>unset</code></li>
        </ul>
    </li>
</ul>

<h4 id="literal-values">Literal values</h4>

<p>Literals are strings whose values are not defined in configuration, but rather can be machine-interpreted. <code>1em</code>, <code>5px</code>, <code>20%</code>, <code>1/2</code>, and <code>#fff</code> are examples of literals.</p>

<h5 id="units-in-literal-values">Units in literal values</h5>

<p>Use any unit you want (e.g., <code>W(50%)</code>, <code>M(20px)</code>, <code>Fz(1em)</code>).</p>

<p>Valid CSS <strong>number values</strong> must always be followed by its unit if applicable (e.g. <code>100%</code> and <code>100px</code>). These numbers can also be represented as keywords such as <code>top</code> and <code>bottom</code> if it makes sense in the context of the property.</p>

<h5 id="unit-less-values">Unit-less values</h5>

<p>Use unit-less values to set styles like <code>line-height</code> (e.g., <code>Lh(1.5)</code>), <code>font-weight</code> (e.g., <code>Fw(500)</code>), etc.</p>

<h5 id="negative-values">Negative values</h5>

<p>Use the minus sign (<code>-</code>) to set negative values (e.g., <code>M(-20px)</code>)</p>

<h5 id="hexadecimal-colors">Hexadecimal colors</h5>

<p>Use 3 or 6 character hexadecimal colors with a <code>#</code> prefix as a value identifier (e.g., <code>C(#fff)</code>).</p>

<p class="noteBox important"><code>hex</code> values for colors must be written in lowercase (i.e. <code>#ccc</code>, not <code>#CCC</code>).</p>

<h5 id="hexadecimal-colors-with-alpha">Hexadecimal colors with alpha</h5>

<p>Use hexadecimal colors as value identifier followed by an opacity suffix (e.g., <code>C(#fff.5)</code>).</p>

<h5 id="fractions">Fractions</h5>

<p>Use any fraction you want (e.g., <code>W(1/2)</code>) and Atomizer will create the proper CSS declaration for you (e.g., <code>width: 50%</code>)</p>

<h5 id="multiple-values">Multiple values</h5>

<p>Pass multiple values separated by commas (<code>,</code>) when supported (e.g., <code>Bgp(20px,50px)</code>).</p>

<p class="noteBox important">Remember, this is a CSS class, not a programming language, so you can&#39;t leave a space before or after commas!</p>

<h4 id="variable-values">Variable values</h4>

<p>A &quot;variable&quot; is mapped to a global value set in the config object. It is different than a custom class as it is <em>not bound to a property</em>, for example:</p>

{% highlight js %}
'custom': {
    'gutter': '20px'
}
{% endhighlight %}

<p>Usage:</p>

{% highlight html %}
<div class="M(gutter) P(gutter)"></div>
{% endhighlight %}

<p>Changing the value of <code>gutter</code> in the config object would change the value of both the <code>margin</code> and <code>padding</code> &mdash; <em>as well as the value of any other class using <code>gutter</code></em>.</p>

<h4 id="css-variables">CSS variables</h4>

<p>CSS variables can be referenced as class values.  Note that values are not managed by Atomizer, and must be defined independently.</p>

<p>Usage:</p>

{% highlight html %}
<div class="C(--primary-color)">Hello World</div>
{% endhighlight %}

<p>External stylesheet:</p>

{% highlight css %}
:root {
    --primary-color: #400090
}{% endhighlight %}

<p>Output:</p>

{% highlight css %}
.C\(--primary-color\) {
    color: var(--primary-color);
}
{% endhighlight %}

{% include subhead.html tag="h3" title="&lt;!&gt;" %}

<p>Optional.</p>

<p>The <code>!</code> character adds <code>!important</code> to the style.</p>

<p>Example:</p>

{% highlight css %}
.D\(b\) {
    display: block;
}
.D\(b\)\! {
    display: block !important;
}{% endhighlight %}

{% include subhead.html tag="h3" title="&lt;breakpoint_identifier&gt;" %}

<p>Optional.</p>

<p>A suffix that adds the breakpoint context to the rule. A breakpoint indicates that this rule will only take effect within the scope of a media query. The name and length values of each breakpoint are defined in the config object.</p>

<p>Example:</p>

{% highlight js %}
breakPoints: {
    'sm': '@media(min-width:500px)', // breakpoint 1
    'md': '@media(min-width:900px)', // breakpoint 2
    'lg': '@media(min-width:1200px)' // breakpoint 3
},
{% endhighlight %}

<p>Usage:</p>

{% highlight html %}
<div class="W(50%)--sm W(33%)--md W(25%)--lg">...</div>
{% endhighlight %}

<p>The <code>width</code> of the box is <code>auto</code> below <code>500px</code>, then <code>50%</code> between <code>500px</code> and <code>899px</code>, then <code>33%</code> between <code>900px</code> and <code>1199px</code>, then <code>25%</code> above <code>1199px</code>.</p>

<hr class="Mt-50px">

<ol id="footnote" class="ol-list">
    <li><code>Bxs(foo)</code> uses a custom variable <code>foo</code> set in the config object <a href="#footnote-1">[↩]</a>.</li>
    <li><code>bar</code> is mapped to a custom value that can be used with any relevant styling (i.e. <code>P(bar)</code> for <code>padding</code>, <code>H(bar)</code> for<code>height</code>, etc.) <a href="#footnote-2">[↩]</a>.</li>
    <li><code>start</code> is mapped to either &quot;left&quot; or &quot;right&quot; depending on the config file <a href="#footnote-3">[↩]</a>.</li>
    <li>this class is an <a href="atomic-classes.html">alias</a> <a href="#footnote-4">[↩]</a>.</li>
    <li>this class is a <a href="helper-classes.html">helper</a> <a href="#footnote-5">[↩]</a>.</li>
    <li>Unlike all other <b class="Fw(b)">ACSS</b> classes, those containing descendant selectors are <strong>not</strong> sandboxed via the namespace (if you have chosen to set one in the config). Instead, Atomizer adds <code>!important</code> to these styles <a href="#footnote-6">[↩]</a>.</li>
</ol>
