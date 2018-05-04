---
section: docs
layout: docs
title: Grid system
---

<p>Atomic CSS does not come with an <em>out-of-the-box</em> grid system. Instead, you use any property you want to build grids <em>the way <strong>you</strong> want</em>.</p>
<h2 id="widths">Widths</h2>
<p>You can choose from creating a unit-base system using fractions (i.e. <code>1/12</code>), using percentages (i.e. <code>20%</code>), or using any arbitrary measurement value (i.e. <code>15em</code>). In other words, the way you apply widths onto boxes is entirely up to you.</p>
<p class="noteBox info">All classes related to <code>width</code> start with <code>W</code> &mdash; for example: <code>W(15em)</code>.</p>

<h2 id="layouts">Layouts</h2>
<p>There are many ways to display boxes next to each other, it&#39;s up to you to decide which method fits your needs best.</p>
<h3 id="inline-block-construct-a-id-footnote-1-class-d-ib-a-"><code>inline-block</code> construct <a id="footnote-1" class="D-ib"></a></h3>
<p>This styling has great browser support <a href="#footnote">[1]</a> and it is direction-friendly (boxes are displayed according to <code>ltr</code> / <code>rtl</code> contexts).</p>
<p>When creating inline-block constructs, you should use the helper class (<code>IbBox</code>) instead of <code>D(ib)</code> because the former gives you old-IE support plus vertical-alignment (<code>top</code>) for free.</p>
<h4 id="example">Example</h4>
<pre><code class="lang-html"><span class="hljs-tag">&lt;<span class="hljs-title">div</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"IbBox W(1/3) P(20px) Bgc(#0280ae.5)"</span>&gt;</span>Box 1<span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span><span class="hljs-comment">&lt;!--
--&gt;</span><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"IbBox W(1/3) P(20px) Bgc(#0280ae.8)"</span>&gt;</span>Box 2<span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span><span class="hljs-comment">&lt;!--
--&gt;</span><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"IbBox W(1/3) P(20px) Bgc(#0280ae)"</span>&gt;</span>Box 3<span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-title">hr</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">dir</span>=<span class="hljs-value">"rtl"</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"IbBox W(1/3) P(20px) Bgc(#0280ae.5)"</span>&gt;</span>Box 1<span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span><span class="hljs-comment">&lt;!--
--&gt;</span><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"IbBox W(1/3) P(20px) Bgc(#0280ae.8)"</span>&gt;</span>Box 2<span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span><span class="hljs-comment">&lt;!--
--&gt;</span><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"IbBox W(1/3) P(20px) Bgc(#0280ae)"</span>&gt;</span>Box 3<span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>
</code></pre>
<h4 class="penResult">Result</h4>

<p data-height="190" data-theme-id="12469" data-slug-hash="emMPaw" data-default-tab="result" data-user="thierry" class='codepen'>See the Pen <a href='http://codepen.io/thierry/pen/emMPaw/'>emMPaw</a> by Thierry (<a href='http://codepen.io/thierry'>@thierry</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

<div class="noteBox warning">
    <p><strong>3 things to be aware of when creating <code>inline-block</code> constructs</strong>:</p>
    <ol class="ol-list">
       <li>white-space between nodes in the markup creates space between boxes, so make sure to address this by either removing that space altogether, using html comments (<code>&lt;!-- --&gt;</code>), or implementing some other trick like the one used by <a href="http://purecss.io/grids/">PureCSS</a>.</li>
       <li><code>vertical-align:top</code> is needed to make sure all boxes are top aligned (<code>IbBox</code> takes care of #2 and #3).</li>
       <li>IE7 <em>doesn&#39;t support</em> <code>display:inline-block</code> but Atomizer takes care of this behind the scenes <a href="#footnote">[1]</a>.</li>
    </ol>
</div>

<h3 id="float-construct-a-id-footnote-2-class-d-ib-a-"><code>float</code> construct <a id="footnote-2" class="D-(ib)"></a></h3>
<p>This styling has great browser support and <a href="https://github.com/acss-io/atomizer">Atomizer</a> makes it &quot;direction&quot; agnostic <a href="#footnote">[2]</a>.  Simply use the <code>Fl()</code> class (e.g., <code>Fl(start)</code> or <code>Fl(end)</code>).</p>
<h4 id="example">Example</h4>
<pre><code class="lang-html">&lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"Cf"</span>&gt;
   &lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"Fl(start) W(50%) P(20px) Bgc(#0280ae.5)"</span>&gt;Box <span class="hljs-number">1</span>&lt;/<span class="hljs-keyword">div</span>&gt;
   &lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"Fl(start) W(50%) P(20px) Bgc(#0280ae)"</span>&gt;Box <span class="hljs-number">2</span>&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<p class="noteBox info">In this example, the class <code>Cf</code> (for &quot;clearfix&quot;) is used to contain the floats, but there is also a <a href="/guides/helper-classes.html-row-"><code>Row</code> helper class</a> to better deal with floats across browsers.</p>

<h4 class="penResult">Result</h4>

<p data-height="110" data-theme-id="12469" data-slug-hash="PwewjM" data-default-tab="result" data-user="thierry" class='codepen'>See the Pen <a href='http://codepen.io/thierry/pen/PwewjM/'>PwewjM</a> by Thierry (<a href='http://codepen.io/thierry'>@thierry</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

<p class="penResult">The <em>exact same markup</em> with the <code>rtl</code> version of the style sheet:</p>

<p data-height="110" data-theme-id="12469" data-slug-hash="OPZPjL" data-default-tab="result" data-user="thierry" class='codepen'>See the Pen <a href='http://codepen.io/thierry/pen/OPZPjL/'>OPZPjL</a> by Thierry (<a href='http://codepen.io/thierry'>@thierry</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

<p class="noteBox info"><a href="https://github.com/acss-io/atomizer">Atomizer</a> can also auto-generate <code>background-color</code> and <code>color</code>.</p>

<h3 id="table-and-table-cell-construct"><code>table</code> and <code>table-cell</code> construct</h3>
<p>This styling has good browser support (IE8+) and is direction-friendly (boxes are displayed according to <code>ltr</code> / <code>rtl</code> contexts).</p>

<p>In this example, the <code>display</code> classes <code>D(tb)</code> and <code>D(tbc)</code> are used, along with <code>vertical-align</code> and <code>text-align</code> classes (<code>Va(m)</code> and <code>Ta(c)</code>):</p>
<h4 id="example">Example</h4>
<pre><code class="lang-html">&lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"D(tb) W(100%) Ta(c)"</span> role=<span class="hljs-string">"presentation"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"D(tbc) Va(m) P(20px) Bgc(#0280ae.5)"</span>&gt;Box &lt;br /&gt;Number &lt;br /&gt;<span class="hljs-number">1</span>&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"D(tbc) Va(m) P(20px) Bgc(#0280ae.6)"</span>&gt;Box Number <span class="hljs-number">2</span>&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"D(tbc) Va(m) P(20px) Bgc(#0280ae.8)"</span>&gt;Box Number <span class="hljs-number">3</span>&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"D(tbc) Va(m) P(20px) Bgc(#0280ae)"</span>&gt;BoxNumber <span class="hljs-number">4</span>&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;hr /&gt;
&lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"D(tb) W(100%) Va(m) Ta(c)"</span> dir=<span class="hljs-string">"rtl"</span> role=<span class="hljs-string">"presentation"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"D(tbc) Va(m) P(20px) Bgc(#0280ae.5)"</span>&gt;Box &lt;br /&gt;Number &lt;br /&gt;<span class="hljs-number">1</span>&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"D(tbc) Va(m) P(20px) Bgc(#0280ae.6)"</span>&gt;Box Number <span class="hljs-number">2</span>&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"D(tbc) Va(m) P(20px) Bgc(#0280ae.8)"</span>&gt;Box Number <span class="hljs-number">3</span>&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"D(tbc) Va(m) P(20px) Bgc(#0280ae)"</span>&gt;BoxNumber <span class="hljs-number">4</span>&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<h4 class="penResult">Result</h4>

<p data-height="260" data-theme-id="12469" data-slug-hash="GgdgMa" data-default-tab="result" data-user="thierry" class='codepen'>See the Pen <a href='http://codepen.io/thierry/pen/GgdgMa/'>GgdgMa</a> by Thierry (<a href='http://codepen.io/thierry'>@thierry</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

<p><strong>Tip:</strong> one can also use <code>table-header-group</code> and/or <code>table-footer-group</code> to swap boxes vertically without removing them from the flow:</p>

<pre><code class="lang-html">&lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"D(tb) W(100%) Ta(c)"</span> role=<span class="hljs-string">"presentation"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"D(tbfg) Fz(20px) Bgc(#0280ae.5)"</span>&gt;Box Number <span class="hljs-number">1</span>&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"D(tbc) Fz(20px) Bgc(#0280ae.8)"</span>&gt;Box Number <span class="hljs-number">2</span>&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"D(tbhg) Fz(20px)"</span>&gt;Box Number <span class="hljs-number">3</span>&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<h4 class="penResult">Result</h4>

<p data-height="115" data-theme-id="12469" data-slug-hash="MYGYQm" data-default-tab="result" data-user="thierry" class='codepen'>See the Pen <a href='http://codepen.io/thierry/pen/MYGYQm/'>MYGYQm</a> by Thierry (<a href='http://codepen.io/thierry'>@thierry</a>) on <a href='http://codepen.io'>CodePen</a>.</p>


<h3 id="flexbox-construct"><code>flexbox</code> construct</h3>
<p>Browser support for <code>flexbox</code> is <a href="http://caniuse.com/#search=flexbox">not that great</a> but nonetheless you can use Atomic to leverage its awesomeness.</p>

<ul class="ul-list">
    <li><code>D(f)</code> for <code>display:flex</code></li>
    <li><code>Jc(sb)</code> for <code>justify-content:space-between</code>
</ul>

<h4 id="example">Example</h4>
<pre><code class="lang-html">&lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"D(f) Jc(sb)"</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"W(100px) H(100px) Lh(100px) Fz(30px) Ta(c) Bgc(#0280ae.5)"</span>&gt;Box <span class="hljs-number">1</span>&lt;/<span class="hljs-keyword">div</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"W(100px) H(100px) Lh(100px) Fz(30px) Ta(c) Bgc(#0280ae.5)"</span>&gt;Box <span class="hljs-number">2</span>&lt;/<span class="hljs-keyword">div</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"W(100px) H(100px) Lh(100px) Fz(30px) Ta(c) Bgc(#0280ae.5)"</span>&gt;Box <span class="hljs-number">3</span>&lt;/<span class="hljs-keyword">div</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"W(100px) H(100px) Lh(100px) Fz(30px) Ta(c) Bgc(#0280ae.5)"</span>&gt;Box <span class="hljs-number">3</span>&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<h4 class="penResult">Result</h4>

<p data-height="155" data-theme-id="12469" data-slug-hash="Jovoem" data-default-tab="result" data-user="thierry" class='codepen'>See the Pen <a href='http://codepen.io/thierry/pen/Jovoem/'>Jovoem</a> by Thierry (<a href='http://codepen.io/thierry'>@thierry</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

<hr class="Mt(50px)">

<ol id="footnote" class="ol-list">
    <li>Atomizer provides a patch for oldIE <a href="#footnote-1">[↩]</a>.</li>
    <li>Atomizer relies on <code>start</code> and <code>end</code> instead of <code>left</code> and <code>right</code> which allows the usage of the <strong>same</strong> classes regardless of script context <a href="#footnote-2">[↩]</a>.</li>
</ol>
