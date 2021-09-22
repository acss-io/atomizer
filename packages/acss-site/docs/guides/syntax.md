---
section: docs
layout: docs
title: Class syntax
---

<p><b class="Fw(b)">ACSS</b> and Helper classes follow a strict syntax, which makes the classnames easier to interpret by humans and easier to parse by tools such as Atomizer.</p>
<h2 id="the-syntax">The syntax</h2>
<pre>
[<b class="hljs-type"><a href="#context">&lt;context></a></b>[<b class="hljs-type">:<a href="#pseudo-class">&lt;pseudo-class></a></b>]<b class="hljs-type"><a href="#combinator">&lt;combinator></a></b>]<b class="Fw(b)"><a class="hljs-string" href="#style">&lt;Style></a></b>[(<b class="hljs-type"><a href="#value">&lt;value></a>,<a href="#value">&lt;value></a>?,...</b>)][<b class="hljs-type"><a href="#-">&lt;!></a></b>][<b class="hljs-type"><a href="#pseudo-class">:&lt;pseudo-class></a></b>][<b class="hljs-type"><a href="#pseudo-element">::&lt;pseudo-element></a></b>][<b class="hljs-type">--<a href="#breakpoint_identifier">&lt;breakpoint_identifier></a></b>]
</pre>

<p>At its core, a <b class="Fw(b)">ACSS</b> or Helper class is represented by a <a href="#style">&lt;Style&gt;</a>. </p>
<p><b class="Fw(b)">ACSS</b> classes typically require one <a href="#-lt-value-">&lt;value&gt;</a>, enclosed in parentheses, though some classes may accept more (eg, the helper class <a href="/guides/helper-classes.html#-lineclamp-"><code>LineClamp()</code></a> accepts two.)  Helper classes may not require a <a href="#-lt-value-">&lt;value&gt;</a>, in which case the parentheses may be omitted.</p>
<p>Optionally, you may prefix the style with a <a href="#-lt-context-">&lt;context&gt;</a> class and <a href="#combinator">&lt;combinator&gt;</a>. The context class may optionally include a <a href="#-lt-pseudo-class-">&lt;pseudo-class&gt;</a>.</p>
<p>You may also optionally suffix the style with <a href="#-lt-">&lt;!&gt;</a> (for <code>!important</code>), a <a href="#-lt-pseudo-class-">&lt;pseudo-class&gt;</a>, a <a href="#-lt-pseudo-element-">&lt;pseudo-element&gt;</a>, and a <a href="#-lt-breakpoint_identifier-">&lt;breakpoint_identifier&gt;</a>.</p>

<h4 id="examples-">Examples:</h4>
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
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>D(<b class="hljs-string">n</b>)</code></th>
            <td class="Va-t P(10px)">This is mapped to <code>display: none</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>D(<b class="hljs-string">n</b>)<b class="hljs-type">!</b></code></th>
            <td class="Va-t P(10px)">This is mapped to <code>display: none !important</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Fz(<b class="hljs-string">1em</b>)</code></th>
            <td class="Va-t P(10px)">This is mapped to <code>font-size: 1em</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Fz(<b class="hljs-string">18px</b>)</code></th>
            <td class="Va-t P(10px)">This is mapped to <code>font-size: 18px</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Td(<b class="hljs-string">u</b>)<b class="hljs-type">:h</b></code></th>
            <td class="Va-t P(10px)">This underlines text on mouseover</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Bxs(<b class="hljs-string">n</b>)</code></th>
            <td class="Va-t P(10px)">This is mapped to <code>box-shadow: none</code></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Bxs(<b class="hljs-string">foo</b>)<b class="hljs-type">--lg</b></code></th>
            <td class="Va-t P(10px)">This applies a custom box-shadow inside the &quot;lg&quot; breakpoint <a href="#footnote">[1]</a><a id="footnote-1" class="D(ib)"></a></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Bxs(<b class="hljs-string">foo</b>)<b class="hljs-type">:h--lg</b></code></th>
            <td class="Va-t P(10px)">Same styling as above but on mouseover only <a href="#footnote">[1]</a><a id="footnote-1" class="D(ib)"></a></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>C(<b class="hljs-string">#000</b>)</code></th>
            <td class="Va-t P(10px)">This sets the color to black</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>C(<b class="hljs-string">#000.5</b>)</code></th>
            <td class="Va-t P(10px)">This sets the color to black with a 50% opacity</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>M(<b class="hljs-string">bar</b>)</code></th>
            <td class="Va-t P(10px)">This applies a &quot;global&quot; value to <code>margin</code> <a href="#footnote">[2]</a><a id="footnote-2" class="D(ib)"></a></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Mend(<b class="hljs-string">0</b>)</code></th>
            <td class="Va-t P(10px)">This is mapped to <code>margin-right: 0</code> in a LTR context <a href="#footnote">[3]</a><a id="footnote-3" class="D(ib)"></a></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Ta(<b class="hljs-string">start</b>)</code></th>
            <td class="Va-t P(10px)">This is mapped to <code>text-align:left</code> in a LTR context <a href="#footnote">[3]</a><a id="footnote-3" class="D(ib)"></a></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Cl(<b class="hljs-string">start</b>)</code></th>
            <td class="Va-t P(10px)">This is mapped to <code>clear:left</code> in a LTR context <a href="#footnote">[3]</a><a id="footnote-3" class="D(ib)"></a></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Bdstartw(<b class="hljs-string">0</b>)</code></th>
            <td class="Va-t P(10px)">This is mapped to <code>border-left-width:0</code> in a LTR context <a href="#footnote">[3]</a><a id="footnote-3" class="D(ib)"></a></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>Rotate(<b class="hljs-string">-90deg</b>)</code></th>
            <td class="Va-t P(10px)">This is an <a href="atomic-classes.html#aliases">alias</a> mapped to <code>transform: rotate(-90deg)</code> <a href="#footnote">[4]</a><a id="footnote-4" class="D(ib)"></a></td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>LineClamp(<b class="hljs-string">2,50px</b>)</code></th>
            <td class="Va-t P(10px)">This is a <em>helper</em> which truncates text after 2 lines <a href="#footnote">[5]</a><a id="footnote-5" class="D(ib)"></a>.</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code><b class="hljs-type">list_</b>D(<b class="hljs-string">ib</b>)</code></th>
            <td class="Va-t P(10px)">This element is styled with <code>display:inline-block</code> when it is a descendant of a node to which the class<code>list</code> is applied <a href="#footnote">[6]</a><a id="footnote-6" class="D(ib)"></a>.</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code><b class="hljs-type">list&gt;</b>D(<b class="hljs-string">ib</b>)</code></th>
            <td class="Va-t P(10px)">This element is styled with <code>display:inline-block</code> when it is a direct child of a node to which the class <code>list</code> is applied to <a href="#footnote">[6]</a><a id="footnote-6" class="D(ib)"></a>.</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code><b class="hljs-type">box:h_</b>D(<b class="hljs-string">n</b>)</code></th>
            <td class="Va-t P(10px)">This element is hidden when users hover over its ancestor with the class <code>.box</code> <a href="#footnote">[6]</a><a id="footnote-6" class="D(ib)"></a>.</td>
        </tr>
    </tbody>
</table>

<div class="noteBox info">The <a href="/reference">reference page</a> lets you quickly search for properties, values, or class names.</div>

<h3 id="rtl-ltr">RTL/LTR</h3>
<p>Any occurrence of <code>left</code> and <code>right</code> keywords or their abbreviated form ala <a href="http://docs.emmet.io/cheat-sheet/">Emmet</a> (i.e., <code>l</code> and <code>r</code>) in <a href="#-lt-style-">&lt;Style&gt;</a> or <a href="#-lt-value-">&lt;value&gt;</a>  must be replaced with the keywords <code>start</code> and <code>end</code>.  Atomizer will automatically translate the CSS output for left-to-right (LTR) or right-to-left (RTL) depending on options passed during execution.</p>
<p>For example, <code>Mend(2px)</code> maps to <code>margin-right: 2px</code> in a LTR context and <code>margin-left: 2px</code> in an RTL context, and <code>Pstart(1em)</code> would map to <code>padding-left: 1em</code> in a LTR context, etc.</p>
<h2 id="syntax-definitions">Syntax Definitions</h2>
<h3 id="context">&lt;context&gt;</h3>
<p>Optional.</p>
<p>A <strong>class</strong> applied to an ancestor or sibling of the node (see <a href="#examples-">examples</a>).</p>
<h3 id="pseudo-class">&lt;pseudo-class&gt;</h3>
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
<h4 id="regular-class">Regular class</h4>
<pre><code class="lang-html">&lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"foo"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"D(n):h"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<p>The above creates the following rule:</p>
<pre><code class="lang-css"><span class="hljs-class">.D</span>\(<span class="hljs-tag">n</span>\)\<span class="hljs-pseudo">:h</span><span class="hljs-pseudo">:hover</span> <span class="hljs-rules">{
  <span class="hljs-rule"><span class="hljs-attribute">display</span>:<span class="hljs-value"> none</span></span>;
}</span>
</code></pre>
<p>This causes the <code>display:none</code> style to be applied to the current element when hovered over.</p>
<h4 id="context-class">Context class</h4>
<pre><code class="lang-html">&lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"foo"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"foo:h_D(n)"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<p>The above creates the following rule:</p>
<pre><code class="lang-css"><span class="hljs-class">.foo</span><span class="hljs-pseudo">:hover</span> <span class="hljs-class">.foo</span>\<span class="hljs-pseudo">:h_D</span>\(<span class="hljs-tag">n</span>\) <span class="hljs-rules">{
  <span class="hljs-rule"><span class="hljs-attribute">display</span>:<span class="hljs-value"> none</span></span>;
}</span>
</code></pre>
<p>This class hides the current element whenever its ancestor (<code>.foo</code>) is hovered over.</p>
<p class="noteBox important">Internet Explorer 7 and below do not accept the use of colons in classnames, and therefore it&#39;s not possible to use the pseudo-class syntax with these browsers.</p>

<h3 id="pseudo-element">&lt;pseudo-element&gt;</h3>
<p>Optional.</p>
<p>A suffix mapped to a <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements">pseudo-element</a>. The following pseudo-elements are supported:</p>
<ul>
    <li><code>b</code> for <code>::before</code></li>
    <li><code>a</code> for <code>::after</code></li>
    <li><code>fl</code> for <code>::first-letter</code></li>
    <li><code>fli</code> for <code>::first-line</code></li>
    <li><code>ph</code> for <code>::placeholder</code></li>
</ul>

<p class="noteBox important">Internet Explorer 7 and below do not accept the use of colons in classnames, and therefore it&#39;s not possible to use the pseudo-element syntax with these browsers.</p>

<h3 id="combinator">&lt;combinator&gt;</h3>
<p>Required if &lt;context&gt; is provided. One of the following may be used:</p>

<h4 id="the-underscore-character-_-">The underscore character (<code>_</code>)</h4>
<p>Use this to create a contextual style based on the <a href="http://www.w3.org/wiki/CSS/Selectors/combinators/descendant">descendant combinator</a>.</p>
<pre><code class="lang-html">&lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"foo"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"foo_D(n)"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<p>This class hides the element whenever one of its ancestor has the class <code>foo</code> attached to it.</p>

<h4 id="the-right-angle-bracket-character-">The right angle bracket character (<code>&gt;</code>)</h4>
<p>Use this to create a contextual style based on the <a href="http://www.w3.org/wiki/CSS/Selectors/combinators/child">child combinator</a>.</p>
<p>Example:</p>
<pre><code class="lang-html">&lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"foo"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"foo&gt;D(n)"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<p>This class hides the element if its parent has the class <code>foo</code> attached to it.</p>

<h4 id="the-plus-sign-">The plus sign (<code>+</code>)</h4>
<p>Use the <a href="http://www.w3.org/wiki/CSS/Selectors/combinators/adjacent">adjacent sibling combinator</a> to style only if the immediate next sibling of an particular element.</p>
<p>Example:</p>
<pre><code class="lang-html">&lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"foo"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"foo+D(n)"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<p>This class hides the element if its immediate previous sibling has the class <code>foo</code> attached to it.</p>

<h4 id="the-tilde-sign-">The tilde sign (<code>~</code>)</h4>
<p>Use the <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/General_sibling_combinator">general sibling combinator</a> to style only if the sibling of an particular element.</p>
<p>Example:</p>
<pre><code class="lang-html">&lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"foo"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"bar"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"foo~D(n)"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<p>This class hides the element if one of its previous siblings has the class <code>foo</code> attached to it.</p>

<h3 id="style">&lt;Style&gt;</h3>
<p>Required.</p>
<p>CSS property or <a href="helper-classes.html">helper class</a>. <a href="http://en.wikipedia.org/wiki/Capitalization">Capitalized</a> with no separator between words such as dashes or new capitals. </p>
<p class="noteBox info"><b class="Fw(b)">ACSS</b> classes generally follow the <a href="http://docs.emmet.io/cheat-sheet/">Emmet</a> syntax for their naming convention.</p>

<h3 id="value">&lt;value&gt;</h3>
<p>Optional for helper classes, required for <b class="Fw(b)">ACSS</b> classes.</p>
<p>Examples:</p>
<pre><code class="lang-css"><span class="hljs-class">.Ta</span>\(<span class="hljs-tag">c</span>\) <span class="hljs-rules">{
    <span class="hljs-rule"><span class="hljs-attribute">text-align</span>:<span class="hljs-value"> center</span></span>;
}</span>
<span class="hljs-class">.M</span>\(20<span class="hljs-tag">px</span>\) <span class="hljs-rules">{
    <span class="hljs-rule"><span class="hljs-attribute">margin</span>:<span class="hljs-value"> <span class="hljs-number">20px</span></span></span>;
}</span>
</code></pre>
<p>There are three value types: Defined, Literal and Variable</p>
<h4 id="defined-values">Defined values</h4>
<p>This is the <em>abbreviation</em> of a <strong>defined value</strong>. Defined values are valid keywords for any given property. (For example, <code>inherit</code> (<code>inh</code>), <code>auto</code> (<code>a</code>), etc.)  Defined values attempt to follow <a href="http://docs.emmet.io/cheat-sheet/">Emmet syntax</a> as closely as possible.</p>
<p> Defined values are enumerated in Atomizer&#39;s ruleset, so there is no need to define such values in Atomizer configuration before using such values. </p>
<p><strong>Defined values that are not present in Emmet</strong> are named according to the rules below:</p>
<ul class="ul-list">
    <li>Value should be abbreviated with the first letter of the value.</li>
    <li>If two values share the same initial letter, then the next value in alphabetical order is <a href="http://en.wikipedia.org/wiki/Abbreviation">abbreviated</a> in <a href="http://en.wikipedia.org/wiki/Contraction_%28grammar%29">contracted</a> form.</li>
    <li>If <strong>one value</strong> is composed by two or more words (e.g. <code>inline-block</code>) then the first letter of each word should be used with no separator between them (e.g. <code>inline-block</code> becomes <code>ib</code>, <code>space-between</code> becomes <code>sb</code>).</li>
    <li>The <code>inherit</code> value will always use the keyword <code>inh</code> as a special exception because it is available almost globally.</li>
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
<pre><code class="lang-javascript"><span class="hljs-string">'custom'</span>: {
    <span class="hljs-string">'gutter'</span>: <span class="hljs-string">'20px'</span>
}
</code></pre>
<p>Usage:</p>
<pre><code class="lang-html">&lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"M(gutter) P(gutter)"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<p>Changing the value of <code>gutter</code> in the config object would change the value of both the <code>margin</code> and <code>padding</code> &mdash; <em>as well as the value of any other class using <code>gutter</code></em>.</p>

<h4 id="css-variables">CSS variables</h4>
<p>CSS variables can be referenced as class values.  Note that values are not managed by Atomizer, and must be defined independently.</p>
<p>Usage:</p>
<pre><code class="lang-html">&lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"C(--primary-color)"</span>&gt;Hello World&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<p>External stylesheet:</p>
<pre><code class="lang-javascript"><span class="hljs-string">:root</span>: {
    <span class="hljs-string">--primary-color</span>: <span class="hljs-string">#400090</span>
}
</code></pre>
<p>Output:</p>
<pre><code class="lang-css"><span class="hljs-class">.C</span>\(<span class="hljs-tag">--primary-color</span>\) <span class="hljs-rules">{
    <span class="hljs-rule"><span class="hljs-attribute">color</span>:<span class="hljs-value"> var(--primary-color)</span></span>;
}</span>
</code></pre>

<h3 id="-">&lt;!&gt;</h3>
<p>Optional.</p>
<p>The <code>!</code> character adds <code>!important</code> to the style.</p>
<p>Example:</p>
<pre><code class="lang-css"><span class="hljs-class">.D</span>\(<span class="hljs-tag">b</span>\) <span class="hljs-rules">{
    <span class="hljs-rule"><span class="hljs-attribute">display</span>:<span class="hljs-value"> block</span></span>;
}</span>
<span class="hljs-class">.D</span>\(<span class="hljs-tag">b</span>\)\! <span class="hljs-rules">{
    <span class="hljs-rule"><span class="hljs-attribute">display</span>:<span class="hljs-value"> block <span class="hljs-important">!important</span></span></span>;
}</span>
</code></pre>
<h3 id="breakpoint_identifier">&lt;breakpoint_identifier&gt;</h3>
<p>Optional.</p>
<p>A suffix that adds the breakpoint context to the rule. A breakpoint indicates that this rule will only take effect within the scope of a media query. The name and length values of each breakpoint are defined in the config object.</p>
<p>Example:</p>
<pre><code class="lang-javascript"><span class="hljs-string">breakPoints:</span> {
    <span class="hljs-string">'sm'</span>: <span class="hljs-string">'@media(min-width:500px)'</span>, <span class="hljs-comment">// breakpoint 1</span>
    <span class="hljs-string">'md'</span>: <span class="hljs-string">'@media(min-width:900px)'</span>, <span class="hljs-comment">// breakpoint 2</span>
    <span class="hljs-string">'lg'</span>: <span class="hljs-string">'@media(min-width:1200px)'</span> <span class="hljs-comment">// breakpoint 3</span>
},
</code></pre>
<p>Usage:</p>
<pre><code class="lang-html">&lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"W(50%)--sm W(33%)--md W(25%)--lg"</span>&gt;...&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
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
