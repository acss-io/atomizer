---
section: docs
layout: docs
title: Responsive Web Design
---

<p>You can define your breakpoints as media queries in the config object and then apply those breakpoints to your Atomic classes through <a href="/guides/syntax.html#-lt-breakpoint_identifier-">the breakpoint suffix</a> or automatic breakpoints.</p>
<h2 id="setting-up-breakpoints">Setting up Breakpoints</h2>
<p>Pick the breakpoint names and media queries you want, for example:</p>
<pre><code class="lang-json"><span class="hljs-string">'breakPoints'</span>: {
    <span class="hljs-string">'sm'</span>: <span class="hljs-string">'@media screen and (min-width: 380px)'</span>,
    <span class="hljs-string">'md'</span>: <span class="hljs-string">'@media screen and (min-width: 600px)'</span>,
    <span class="hljs-string">'lg'</span>: <span class="hljs-string">'@media screen and (min-width: 900px)'</span>
}
</code></pre>
<p>Breakpoints may be named anything you want, as long as the characters are valid for use in  classnames.</p>
<h2 id="usage">Usage</h2>
<p>There are two ways to make use of breakpoints in your Atomic classes: explicitly and automatically.</p>
<h3 id="explicit-breakpoints">Explicit Breakpoints</h3>
<p>Append <code>--&lt;breakpoint name&gt;</code> to any Atomic class to associate that styling with the breakpoint of your choice. For example, <code>D(b)--sm</code> and <code>C(#000)--md</code> will create the following rules in the related media queries:</p>
<pre><code class="lang-css"><span class="hljs-at_rule">@<span class="hljs-keyword">media</span> screen and (min-width:<span class="hljs-number">380px</span>) </span>{
    <span class="hljs-id">#atomic</span> <span class="hljs-class">.D</span>(<span class="hljs-tag">b</span>)<span class="hljs-tag">--sm</span> <span class="hljs-rules">{
        <span class="hljs-rule"><span class="hljs-attribute">display</span>:<span class="hljs-value"> block</span></span>;
    }</span>
}

<span class="hljs-at_rule">@<span class="hljs-keyword">media</span> screen and (min-width:<span class="hljs-number">680px</span>) </span>{
    <span class="hljs-id">#atomic</span> <span class="hljs-class">.C</span>(<span class="hljs-id">#000</span>)<span class="hljs-tag">--md</span> <span class="hljs-rules">{
        <span class="hljs-rule"><span class="hljs-attribute">color</span>:<span class="hljs-value"> <span class="hljs-hexcolor">#000</span></span></span>;
    }</span>
}
</code></pre>
<h3 id="automatic-breakpoints">Automatic Breakpoints</h3>
<p><a href="/guides/syntax.html#variable-values">Variable values</a> and <a href="/guides/atomic-classes.html#custom-classes">custom classes</a> may also be mapped to breakpoints in configuration to simplify the process of applying styles. In this case, you would not be required to use the <a href="/guides/syntax.html#-lt-breakpoint_identifier-">breakpoint identifier</a> suffix on your class.</p>
<p>Simply set the value of your variable or custom class identifier to an object containing breakpoint names as the keys:</p>
<pre><code class="lang-javascript"><span class="hljs-string">'custom'</span>: {
    <span class="hljs-string">'P(logo)'</span>: {
        <span class="hljs-string">'default'</span>: <span class="hljs-string">'10px'</span>,
        <span class="hljs-string">'sm'</span>: <span class="hljs-string">'12px'</span>,
        <span class="hljs-string">'md'</span>: <span class="hljs-string">'14px'</span>,
        <span class="hljs-string">'lg'</span>: <span class="hljs-string">'20px'</span>
    },
    <span class="hljs-string">'gutter'</span>: {
        <span class="hljs-string">'default'</span>: <span class="hljs-string">'1em'</span>,
        <span class="hljs-string">'sm'</span>: <span class="hljs-string">'3em'</span>
    }
}
</code></pre>
<p>In this example, the class <code>P(logo)</code> will style a box with a <code>padding</code> of <code>10px</code> below the first breakpoint, but then this padding will become:</p>
<ul class="ul-list">
    <li><code>12px</code> inside the <code>sm</code> breakpoint</li>
    <li><code>14px</code> inside the <code>md</code> breakpoint</li>
    <li><code>20px</code> inside the <code>lg</code> breakpoint</li>
</ul>

<p>Likewise, any class that uses the variable <code>gutter</code> will receive different values depending on the currently active breakpoint.</p>
<h2 id="examples">Examples</h2>
<p>When using explicit breakpoints, use multiple classes to have styles applied in the context of various breakpoints, for example:</p>
<pre><code class="lang-html">   <span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"D(ib)--sm W(50%)--sm W(25%)--lg P(20px) Bgc(#0280ae.5)"</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span><span class="hljs-comment">&lt;!--
--&gt;</span><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"D(ib)--sm W(50%)--sm W(25%)--lg P(20px) Bgc(#0280ae.6)"</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span><span class="hljs-comment">&lt;!--
--&gt;</span><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"D(ib)--sm W(50%)--sm W(25%)--lg P(20px) Bgc(#0280ae.8)"</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span><span class="hljs-comment">&lt;!--
--&gt;</span><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"D(ib)--sm W(50%)--sm W(25%)--lg P(20px) Bgc(#0280ae)"</span>&gt;</span>4<span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>
</code></pre>
<ul class="ul-list">
    <li>Below 380px, the boxes are displayed on top of each other (<code>div</code> are block-level elements)</li>
    <li>Above 380px, the boxes are displayed on 2 rows, 2 by 2 (<code>D(ib)--sm</code> + <code>W(50%)--sm</code>)</li>
    <li>Above 900px, the boxes are displayed side-by-side, on a single row (<code>D(ib)--sm</code> + <code>W(25%)--lg</code>)</li>
</ul>

<p class="noteBox info">The breakpoints for the example below have been chosen so you can see the changes within this page. <strong>Give it a try, resize your viewport!</strong></p>

<h3 class="penResult">Result</h3>

<p data-height="265" data-theme-id="12469" data-slug-hash="jExMYr" data-default-tab="result" data-user="thierry" class='codepen'>See the Pen <a href='http://codepen.io/thierry/pen/jExMYr/'>jExMYr</a> by Thierry (<a href='http://codepen.io/thierry'>@thierry</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
