---
section: docs
layout: docs
title: Helper classes
---

<p>Helper classes are provided to help with common styling patterns. <a href="/guides/atomizer.html">Atomizer</a> provides the following set of helper classes, and you can define your own through custom Atomizer rulesets.</p>
<p>Unlike <a href="/guides/acss-classes.html">ACSS classes</a>, helper classes apply multiple style declarations from a single class, but still are intended to provide a low-level, single-purpose unit of style.</p>
<h2 id="bd-borders-"><code>Bd*</code> (Borders)</h2>
<p>Styling elements with a border requires 3 properties <a href="#footnote">[1]</a><a id="footnote-1" class="D(ib)"></a> so to make styling via classes a bit less verbose, the following helpers combine <code>border-style</code> (set to <code>solid</code>) and <code>border-width</code> (set to <code>1px</code>):</p>
<ul class="ul-list">
    <li><code>Bd</code> creates a <code>1px</code> border on all edges of a box</li>
    <li><code>BdX</code> creates a <code>1px</code> border on the left and right edges of a box</li>
    <li><code>BdY</code> creates a <code>1px</code> border on the top and bottom edges of a box</li>
    <li><code>BdT</code> creates a <code>1px</code> border on the top edge of a box</li>
    <li><code>BdEnd</code> creates a <code>1px</code> border on the right edge of a box (in a LTR context)</li>
    <li><code>BdB</code> creates a <code>1px</code> border on the bottom edge of a box</li>
    <li><code>BdStart</code> creates a <code>1px</code> border on the left edge of a box (in a LTR context)</li>
</ul>

<p>You can combine one of the classes above with a <code>border-color</code> of your choice (i.e. <code>Bdc(#ff6347)</code>) to get a border color different than the text color of the box.</p>
<p>Example with a initial border color (and <code>border-width</code> set to <code>1px</code>):</p>
<pre><code class="lang-html">&lt;p class="Bd C(#<span class="hljs-number">0280</span>ae) P(<span class="hljs-number">10</span>px)"&gt;Lo<span class="hljs-comment">rem ipsum dolor sit amet, id oratio graeco nostrum sit, latine eligendi scribentur mea ex. Tota dolorem voluptua eos at. Ei nec reque viderer facilis. Aliquip necessitatibus ex pri, pertinax atomorum ei sea. Ea omittam appetere posidonium per, te meliore volutpat duo, dolorem ponderum interpretaris sea ut.&lt;/p&gt;</span>
</code></pre>
<p class="Bd C(#0280ae) P(10px)">Lorem ipsum dolor sit amet, id oratio graeco nostrum sit, latine eligendi scribentur mea ex. Tota dolorem voluptua eos at. Ei nec reque viderer facilis. Aliquip necessitatibus ex pri, pertinax atomorum ei sea. Ea omittam appetere posidonium per, te meliore volutpat duo, dolorem ponderum interpretaris sea ut.</p>

<p>Example with a custom color:</p>
<pre><code class="lang-html">&lt;p class="Bd Bdc(#ff6347) P(<span class="hljs-number">10</span>px)"&gt;Lo<span class="hljs-comment">rem ipsum dolor sit amet, id oratio graeco nostrum sit, latine eligendi scribentur mea ex. Tota dolorem voluptua eos at. Ei nec reque viderer facilis. Aliquip necessitatibus ex pri, pertinax atomorum ei sea. Ea omittam appetere posidonium per, te meliore volutpat duo, dolorem ponderum interpretaris sea ut.&lt;/p&gt;</span>
</code></pre>
<p class="Bd Bdc(#ff6347) P(10px)">Lorem ipsum dolor sit amet, id oratio graeco nostrum sit, latine eligendi scribentur mea ex. Tota dolorem voluptua eos at. Ei nec reque viderer facilis. Aliquip necessitatibus ex pri, pertinax atomorum ei sea. Ea omittam appetere posidonium per, te meliore volutpat duo, dolorem ponderum interpretaris sea ut.</p>

<p>The default <code>width</code> of these helpers is <code>1px</code> as it is the most common use case. If you want to use a different <code>width</code> or <code>style</code> value, then you can either</p>
<ul class="ul-list">
    <li>use standard <b class="Fw(b)">ACSS</b> classes, for example: <code>Bdw(5px) Bds(s) Bdc(#555)</code></li>
    <li>create a custom class via config, for example: <code>Bd(myCustomBorder)</code></li>
    <li>use <strong>the same helper classes</strong> with <a href="helper-classes.htmlthe-special-case-of-border-">different values</a></li>
</ul>

<p class="noteBox info">You can find abbreviated versions of <code>style</code> keywords in <a href="https://github.com/acss-io/atomizer/blob/master/src/rules.js#L289">rules.js</a>.</p>

<h2 id="bfchack-block-formatting-context-"><code>BfcHack</code> (Block-formatting context)</h2>
<p>Most authors use <code>overflow:hidden</code> to create <a href="http://yuiblog.com/blog/2010/05/19/css-101-block-formatting-contexts/">block-formatting contexts</a> but such styling may come <a href="http://yuiblog.com/blog/2010/09/27/clearfix-reloaded-overflowhidden-demystified/">with side-effects</a>.</p>
<p>For this reason, the helper class called <code>BfcHack</code> creates a block-formatting context that does not &quot;shrinkwrap&quot;. This is an approach introduced by <a href="http://www.stubbornella.org/content/2010/12/09/the-hacktastic-zoom-fix/#comment-18394">Nicole Sullivan and Nan Gao</a>.</p>
<p class="noteBox warning">Note that this is a hack and may break if the content of the box is too large or if the box is next to floats.</p>

<p class="noteBox info">Atomizer plugs <code>zoom:1</code> along with <code>overflow:hidden</code> whenever you use the class <code>Ov(h)</code>. This is because <code>overflow:hidden</code> does not create a block-formatting context in old IE but <code>zoom</code> does.</p>

<h2 id="cf-clearfix-"><code>Cf</code> (Clearfix)</h2>
<p>Use <code>Cf</code> for <a href="http://yuiblog.com/blog/2010/09/27/clearfix-reloaded-overflowhidden-demystified/">clearfix</a>.</p>
<h2 id="ell-ellipsis-"><code>Ell</code> (Ellipsis)</h2>
<p>Use <code>Ell</code> to create a one-liner with ellipsis (in browsers that support <code>text-overflow:ellipsis</code>).</p>
<p>Example:</p>
<pre><code class="lang-html">&lt;p class="Ell W(<span class="hljs-number">300</span>px)"&gt;Lo<span class="hljs-comment">rem ipsum dolor sit amet, id oratio graeco nostrum sit, latine eligendi scribentur mea ex. Tota dolorem voluptua eos at. Ei nec reque viderer facilis. Aliquip necessitatibus ex pri, pertinax atomorum ei sea. Ea omittam appetere posidonium per, te meliore volutpat duo, dolorem ponderum interpretaris sea ut.&lt;/p&gt;</span>
</code></pre>
<p class="Ell W(300px)">Lorem ipsum dolor sit amet, id oratio graeco nostrum sit, latine eligendi scribentur mea ex. Tota dolorem voluptua eos at. Ei nec reque viderer facilis. Aliquip necessitatibus ex pri, pertinax atomorum ei sea. Ea omittam appetere posidonium per, te meliore volutpat duo, dolorem ponderum interpretaris sea ut.</p>

<h2 id="hiding-content-from-sighted-users">Hiding content from sighted users</h2>
<p>Use the class <code>Hidden</code> if you want to hide content that should still be accessible to screen-readers:</p>
<p>Example:</p>
<pre><code class="lang-html"><span class="hljs-tag">&lt;<span class="hljs-title">p</span>&gt;</span>Something is <span class="hljs-tag">&lt;<span class="hljs-title">b</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"Hidden"</span>&gt;</span>missing<span class="hljs-tag">&lt;/<span class="hljs-title">b</span>&gt;</span> here.<span class="hljs-tag">&lt;/<span class="hljs-title">p</span>&gt;</span>
</code></pre>
<p>Something is <b class="Hidden">missing</b> here.</p>

<h2 id="ibbox"><code>IbBox</code></h2>
<p>Boxes that are part of inline-block constructs must be styled with multiple styles. Rather than setting all of those yourself, you can simply use <code>IbBox</code> as a &quot;shorthand&quot; for:</p>
<pre><code class="lang-css"><span class="hljs-attribute">display</span>: inline-block;
*<span class="hljs-attribute">display</span>: inline;
<span class="hljs-attribute">zoom</span>: <span class="hljs-number">1</span>;
<span class="hljs-attribute">vertical-align</span>: top;
</code></pre>
<pre><code class="lang-html">   <span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"IbBox W(50%) Ta(c) Bgc(#0280ae.5) C(#fff)"</span>&gt;</span>Box-1<span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span><span class="hljs-comment">&lt;!--
--&gt;</span><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"IbBox W(50%) Ta(c) Bgc(#0280ae) C(#fff)"</span>&gt;</span>Box-2<span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>
</code></pre>
<p>Example:</p>
<div class="IbBox W(50%) Ta(c) Bgc(#0280ae.5) C(#fff)">Box-1</div><!--
--><div class="IbBox W(50%) Ta(c) Bgc(#0280ae) C(#fff)">Box-2</div>

<p class="noteBox info">Remember to remove the white-space between nodes when creating inline-block constructs.</p>

<h2 id="lineclamp-"><code>LineClamp()</code></h2>
<p>Truncating multiple lines of text in a way that works across browsers is not an easy feat. Authors usually start with <code>-webkit-line-clamp</code> + flexbox and then go from there, addressing <a href="https://twitter.com/thierrykoblentz/status/443899465842176000">weird bugs</a> along the way.</p>
<p>With the help of Atomizer, you can use the <code>LineClamp()</code> class to &quot;pass&quot; 2 parameters:</p>
<ul class="ul-list">
    <li>the number of lines you want to display</li>
    <li>the <code>max-height</code> to use for the box</li>
</ul>

<p>Example:</p>
<pre><code class="lang-html">&lt;p class="Fz(<span class="hljs-number">18</span>px) Lh(<span class="hljs-number">1</span>.<span class="hljs-number">5</span>) LineClamp(<span class="hljs-number">2</span>,<span class="hljs-number">54</span>px)"&gt;Lo<span class="hljs-comment">rem ipsum dolor sit amet, id oratio graeco nostrum sit, latine eligendi scribentur mea ex. Tota dolorem voluptua eos at. Ei nec reque viderer facilis. Aliquip necessitatibus ex pri, pertinax atomorum ei sea. Ea omittam appetere posidonium per, te meliore volutpat duo, dolorem ponderum interpretaris sea ut.&lt;/p&gt;</span>
</code></pre>
<p class="Fz(18px) Lh(1.5) LineClamp(2,54px)">Lorem ipsum dolor sit amet, id oratio graeco nostrum sit, latine eligendi scribentur mea ex. Tota dolorem voluptua eos at. Ei nec reque viderer facilis. Aliquip necessitatibus ex pri, pertinax atomorum ei sea. Ea omittam appetere posidonium per, te meliore volutpat duo, dolorem ponderum interpretaris sea ut.</p>

<p class="noteBox info">The value of <code>max-height</code> is the result of: &lt;number of lines&gt; times &lt;font-size&gt; times &lt;line-height&gt;.</p>

<h2 id="row"><code>Row</code></h2>
<p>Use the class <code>Row</code> to style a box that expands to fill its container, contains floats, and <a href="http://cssmojo.com/row_for_grids/">more <span class="Hidden"> about Row</span></a>.</p>
<p>Example:</p>
<pre><code class="lang-html">&lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"Row Bgc(#0280ae) C(#fff)"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"Fl(start) W(300px) Ta(c) P(10px)"</span>&gt;Box-<span class="hljs-number">1</span>&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"Fl(end) W(300px) Ta(c) P(10px)"</span>&gt;Box-<span class="hljs-number">2</span>&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<div class="Row Bgc(#0280ae) C(#fff)">
    <div class="Fl(start) W(300px) Ta(c) P(10px)">Box-1</div>
    <div class="Fl(end) W(300px) Ta(c) P(10px)">Box-2</div>
</div>

<p>The background of the wrapper is visible, which proves the box contains floats.</p>
<h2 id="stretchedbox"><code>StretchedBox</code></h2>
<p>Use the class <code>StretchedBox</code> to stretch a box inside its &#39;containing block&#39;. This class is mapped to the following declarations:</p>
<pre><code class="lang-css"><span class="hljs-attribute">position</span>: <span class="hljs-string">absolute;</span>
<span class="hljs-attribute">top</span>: <span class="hljs-string">0;</span>
<span class="hljs-attribute">right</span>: <span class="hljs-string">0;</span>
<span class="hljs-attribute">bottom</span>: <span class="hljs-string">0;</span>
<span class="hljs-attribute">left</span>: <span class="hljs-string">0;</span>
</code></pre>
<p>This is handy to create boxes with a <a href="http://alistapart.com/article/creating-intrinsic-ratios-for-video">intrinsic aspect ratio</a>. For example:</p>
<pre><code class="lang-html">&lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"Pos(r) H(0) Pt(10%)"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"StretchedBox Bgc(#0280ae) P(10px) C(#fff)"</span>&gt;I am a box <span class="hljs-keyword">with</span> an intrinsic aspect ratio&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<div class="Pos(r) H(0) Pt(10%)">
    <div class="StretchedBox Bgc(#0280ae) P(10px) C(#fff)">I am a box with an intrinsic aspect ratio</div>
</div>

<h2 id="zoom"><code>Zoom</code></h2>
<p>Use the class <code>Zoom</code> if you support old versions of IE and need to <a href="http://www.satzansatz.de/cssd/onhavinglayout.html">give a box a layout</a>.</p>
<hr class="Mt(50px)">

<ol id="footnote" class="ol-list">
    <li>Unless one wants the initial value of <code>border-width</code> and <code>border-color</code> <a href="#footnote-1">[↩]</a>.</li>
</ol>
