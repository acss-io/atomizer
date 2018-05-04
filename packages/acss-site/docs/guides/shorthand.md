---
section: docs
layout: docs
title: Shorthand notation
---

<p><strong>Atomic CSS generally does not offer shorthand notation</strong> (e.g., <code>M(5px,0,0,0)</code>) because this would increase the number of selectors or declarations in the style sheet (i.e., create bloat.)</p>
<p>For example, <code>border-width/style/color</code> can be specified in any order:</p>
<ul class="ul-list">
    <li><em>Bd(1px,solid,#000)</em></li>
    <li><em>Bd(1px,#000,solid)</em></li>
    <li><em>Bd(solid,#000,1px)</em></li>
    <li><em>Bd(solid,1px,#000)</em></li>
    <li><em>Bd(#000,1px,solid)</em></li>
    <li><em>Bd(#000,solid,1px)</em></li>
</ul>

<p>The above creates 6 different rules for the exact same styling (a <em>solid 1px black</em> border). While the tool could be smart and assign all those classes to the <strong>same</strong> declaration, you&#39;d still end up with more bytes than is necessary:</p>
<pre><code class="lang-css">.Bd(<span class="hljs-number">1</span>px,solid,<span class="hljs-preprocessor">#<span class="hljs-number">000</span>),</span>
.Bd(<span class="hljs-number">1</span>px,<span class="hljs-preprocessor">#<span class="hljs-number">000</span>,solid),</span>
.Bd(solid,<span class="hljs-preprocessor">#<span class="hljs-number">000</span>,<span class="hljs-number">1</span>px),</span>
.Bd(solid,<span class="hljs-number">1</span>px,<span class="hljs-preprocessor">#<span class="hljs-number">000</span>),</span>
.Bd(<span class="hljs-preprocessor">#<span class="hljs-number">000</span>,<span class="hljs-number">1</span>px,solid),</span>
.Bd(<span class="hljs-preprocessor">#<span class="hljs-number">000</span>,solid,<span class="hljs-number">1</span>px) {</span>
    border: <span class="hljs-number">1</span>px solid <span class="hljs-preprocessor">#<span class="hljs-number">000</span>;</span>
}
</code></pre>
<p>It would also be possible to enforce order (i.e., <code>width,style,color</code>) to prevent such duplication, but you&#39;d still end up with a lot of redundancy. For example:</p>
<ul class="ul-list">
    <li><em>Bd(1px,solid,#000)</em></li>
    <li><em>Bd(1px,solid,#ccc)</em></li>
    <li><em>Bd(1px,solid,#555)</em></li>
    <li><em>Bd(2px,solid,#000)</em></li>
    <li><em>Bd(3px,solid,#000)</em></li>
    <li><em>Bd(1px,dotted,#000)</em></li>
</ul>

<p>Would result in:</p>
<ul class="ul-list">
    <li>4 duplicate declarations for <code>border-width</code></li>
    <li>5 duplicate declarations for <code>border-style</code></li>
    <li>4 duplicate declarations for <code>border-color</code></li>
</ul>

<p>...either through duplicate declarations or selector grouping:</p>
<pre><code class="lang-css">.Bd(<span class="hljs-number">1</span>px,solid,<span class="hljs-preprocessor">#<span class="hljs-number">000</span>),</span>
.Bd(<span class="hljs-number">1</span>px,solid,<span class="hljs-preprocessor">#ccc),</span>
.Bd(<span class="hljs-number">1</span>px,solid,<span class="hljs-preprocessor">#<span class="hljs-number">555</span>),</span>
.Bd(<span class="hljs-number">1</span>px,dotted,<span class="hljs-preprocessor">#<span class="hljs-number">000</span>) {</span>
    border-width: <span class="hljs-number">1</span>px;
}

.Bd(<span class="hljs-number">1</span>px,solid,<span class="hljs-preprocessor">#<span class="hljs-number">000</span>),</span>
.Bd(<span class="hljs-number">1</span>px,solid,<span class="hljs-preprocessor">#ccc),</span>
.Bd(<span class="hljs-number">1</span>px,solid,<span class="hljs-preprocessor">#<span class="hljs-number">555</span>),</span>
.Bd(<span class="hljs-number">2</span>px,solid,<span class="hljs-preprocessor">#<span class="hljs-number">000</span>),</span>
.Bd(<span class="hljs-number">3</span>px,solid,<span class="hljs-preprocessor">#<span class="hljs-number">000</span>) {</span>
    border-style: solid;
}

.Bd(<span class="hljs-number">1</span>px,solid,<span class="hljs-preprocessor">#<span class="hljs-number">000</span>),</span>
.Bd(<span class="hljs-number">2</span>px,solid,<span class="hljs-preprocessor">#<span class="hljs-number">000</span>),</span>
.Bd(<span class="hljs-number">3</span>px,solid,<span class="hljs-preprocessor">#<span class="hljs-number">000</span>),</span>
.Bd(<span class="hljs-number">1</span>px,dotted,<span class="hljs-preprocessor">#<span class="hljs-number">000</span>) {</span>
    border-color: <span class="hljs-preprocessor">#<span class="hljs-number">000</span>;</span>
}
</code></pre>
<h2 id="convenience-and-helper-classes">Convenience and helper classes</h2>
<h3 id="x-y-notation"><code>X</code>/<code>Y</code> notation</h3>
<p>Even though Atomic CSS does not allow shorthand notation, many Atomic classes support &quot;<code>x</code>/<code>y</code> notation&quot; which applies the same styling on opposite edges. For example:</p>
<ul class="ul-list">
    <li><code>Mx(a)</code> for <code>margin-left:auto; margin-right:auto;</code></li>
    <li><code>Py(5px)</code> for <code>padding-top:5px; padding-bottom:5px;</code></li>
</ul>

<h3 id="border-helper-classes">Border helper classes</h3>
<p>When it comes to border styling, initial values exist for <code>width</code> and <code>color</code> but many authors may still want to set all 3 values: <code>width</code>, <code>color</code>, and <code>style</code>. To make things a bit less verbose, Atomic CSS offers a set of <a href="helper-classes.html#-bd-borders-">helper classes for borders</a> which set <code>style</code> to <code>solid</code> and <code>width</code> to <code>1px</code> (as a default).</p>
<p>This allows you to use a single class to create a single pixel border that either &quot;inherits&quot; text color or can be combined with an Atomic class for border-color (e.g., <code>Bd Bdc(#fff)</code>).</p>
<p>In case <code>solid</code> and <code>1px</code> are not the default style you&#39;d prefer, but you still want to use the border helper classes, you can simply redefine those classes in your own style sheet, using the rules below:</p>
<pre><code class="lang-css"><span class="hljs-class">.Bd</span>,
<span class="hljs-class">.BdX</span>,
<span class="hljs-class">.BdY</span>,
<span class="hljs-class">.BdT</span>,
<span class="hljs-class">.BdEnd</span>,
<span class="hljs-class">.BdB</span>,
<span class="hljs-class">.BdStart</span> <span class="hljs-rules">{
    <span class="hljs-rule"><span class="hljs-attribute">border-style</span>:<span class="hljs-value"> &lt;style&gt;</span></span>;
}</span>
<span class="hljs-class">.Bd</span> <span class="hljs-rules">{
    <span class="hljs-rule"><span class="hljs-attribute">border-width</span>:<span class="hljs-value"> &lt;width&gt;</span></span>;
}</span>
<span class="hljs-class">.BdX</span> <span class="hljs-rules">{
    <span class="hljs-rule"><span class="hljs-attribute">border-right-width</span>:<span class="hljs-value"> &lt;width&gt;</span></span>;
    <span class="hljs-rule"><span class="hljs-attribute">border-left-width</span>:<span class="hljs-value"> &lt;width&gt;</span></span>;
}</span>
<span class="hljs-class">.BdY</span> <span class="hljs-rules">{
    <span class="hljs-rule"><span class="hljs-attribute">border-top-width</span>:<span class="hljs-value"> &lt;width&gt;</span></span>;
    <span class="hljs-rule"><span class="hljs-attribute">border-bottom-width</span>:<span class="hljs-value"> &lt;width&gt;</span></span>;
}</span>
<span class="hljs-class">.BdT</span> <span class="hljs-rules">{
    <span class="hljs-rule"><span class="hljs-attribute">border-top-width</span>:<span class="hljs-value"> &lt;width&gt;</span></span>;
}</span>
<span class="hljs-class">.BdEnd</span> <span class="hljs-rules">{
    <span class="hljs-rule"><span class="hljs-attribute">border-right-width</span>:<span class="hljs-value"> &lt;width&gt;</span></span>;
}</span>
<span class="hljs-class">.BdB</span> <span class="hljs-rules">{
    <span class="hljs-rule"><span class="hljs-attribute">border-bottom-width</span>:<span class="hljs-value"> &lt;width&gt;</span></span>;
}</span>
<span class="hljs-class">.BdStart</span> <span class="hljs-rules">{
    <span class="hljs-rule"><span class="hljs-attribute">border-left-width</span>:<span class="hljs-value"> &lt;width&gt;</span></span>;
}</span>
</code></pre>
<p class="noteBox info">If you&#39;ve chosen to namespace your Atomic classes, be sure to add the namespace to the above rules.</p>
