---
section: docs
layout: docs
title: Thinking in Atomic
---

<p>&quot;<strong>Atomic CSS</strong>&quot; is a <a href="http://www.smashingmagazine.com/2013/10/21/challenging-css-best-practices-atomic-approach/">CSS architecture</a>. It is not opinionated; it simply defines a set of classes representing single-purpose styling units.</p>
<p><strong>Atomizer</strong> implements the <b class="Fw(b)">ACSS</b> <a href="/guides/syntax.html">syntax</a> to help you generate Atomic rulesets. It only creates a style sheet with declarations that are relevant to your project. These style declarations are generated from <b class="Fw(b)">ACSS</b> classes found within your project, or from custom values defined in the Atomizer config file.</p>
<p>Adopting a Atomic CSS methodology addresses common CSS challenges:</p>
<dl class="Mstart(20px) Mb(30px)">
<dt class="Fs(i) C(#000)">Changes are predictable</dt>
<dd class="Mstart(20px) Mt(5px)">Because of the single responsibility principle (one class == one style) it is easy to predict what removing or adding a class will do.</dd>
<dt class="Fs(i) C(#000)">Scope is limited</dt>
<dd class="Mstart(20px) Mt(5px)">There is no reliance on descendant/contextual selectors &mdash; styling is done inside &quot;<a href="#style-sheets-organization">specificity layers</a>&quot;.</dd>
<dt class="Fs(i) C(#000)">CSS is lean</dt>
<dd class="Mstart(20px) Mt(5px)">There is very little redundancy and no dead weight (all styles are relevant to the project).</dd>
<dt class="Fs(i) C(#000)">Components are portable</dt>
<dd class="Mstart(20px) Mt(5px)">Classes used to style a component are not specific to that component, hence components can live in any other project that uses Atomizer <b class="Fw(n)"><a href="#footnote">[2]</a><a id="footnote-2" class="D(ib)"></a></b>.</dd>
<dt class="Fs(i) C(#000)">Beginner-friendly</dt>
<dd class="Mstart(20px) Mt(5px)">Writing efficient and correct selectors is often one of the hardest parts of CSS for new developers to master. With Atomic CSS, developers don&#39;t create bloat because they don&#39;t write the selectors, instead they mostly re-use existing classes. This can greatly simplify the learning curve for inexperienced developers.</dd>
</dl>

<h2 id="who-s-atomic-css-for-">Who&#39;s Atomic CSS for?</h2>
<p><strong>Atomic CSS</strong> is for developers who see the benefits of styling &quot;<em>outside of style sheets</em>&quot; &mdash; who want to write markup and styles in one place while benefiting from a Atomic architecture. It is a switch of priorities. You don&#39;t maintain style sheets but <em>components</em>.</p>
<h2 id="be-pragmatic">Be pragmatic</h2>
<p><b class="Fw(b)">ACSS</b> can live side-by-side with traditional style sheets. In cases where <b class="Fw(b)">ACSS</b> doesn&#39;t seem the most pragmatic, you can always supplement with inline styles or external stylesheets. Use the right tool for the job.  </p>
<p>Traditional style sheets may be helpful for styles that <b class="Fw(b)">ACSS</b> cannot create, styles for elements that aren&#39;t under your application&#39;s control, or repeating elements that are not componentized <b class="Fw(n)"><a href="#footnote">[1]</a><a id="footnote-1" class="D(ib)"></a></b>.</p>
<h2 id="grids">Grids</h2>
<p>There is no such thing as a &quot;Grid&quot; in <b class="Fw(b)">ACSS</b>. <b class="Fw(b)">ACSS</b> does not provide classes to create columns based on an opinionated construct (<code>float</code>, <code>inline-block</code>, etc.) Instead, <b class="Fw(b)">ACSS</b> gives you all the tools you need to create <a href="/tutorials/grid-system.html">any grid you want</a>.</p>
<h2 id="specificity">Specificity</h2>
<h3 id="from-0-0-1-0-to-infinity">From <code>0,0,1,0</code> to &quot;<em>infinity</em>&quot;</h3>
<p>By nature, <b class="Fw(b)">ACSS</b> classes have very low specificity (<code>0,0,1,0</code>). Atomizer creates a style sheet in which the specificity of every rule can be increased by the use of a <em>namespace</em>. Best practice is to keep specificity as low as possible, but depending on other rules in your project you may want to include a namespace to increase the weight of <b class="Fw(b)">ACSS</b> classes.</p>
<p>Keep in mind that the weight of rules is <em>not as important as</em> making sure specificity is homogeneous across rules.
For example, styles like these:</p>
<pre><code class="lang-css"><span class="hljs-id">#namespace</span> <span class="hljs-class">.myBox</span> <span class="hljs-rules">{}</span>           <span class="hljs-comment">/* 0,1,1,0 */</span>
<span class="hljs-id">#namespace</span> <span class="hljs-class">.menu_item</span> <span class="hljs-rules">{}</span>       <span class="hljs-comment">/* 0,1,1,0 */</span>
<span class="hljs-id">#namespace</span> <span class="hljs-class">.list_active</span> <span class="hljs-rules">{}</span>     <span class="hljs-comment">/* 0,1,1,0 */</span>
<span class="hljs-id">#namespace</span> <span class="hljs-class">.article_summary</span> <span class="hljs-rules">{}</span> <span class="hljs-comment">/* 0,1,1,0 */</span>
<span class="hljs-id">#namespace</span> <span class="hljs-class">.nav_link</span> <span class="hljs-rules">{}</span>        <span class="hljs-comment">/* 0,1,1,0 */</span>
</code></pre>
<p>are easier to maintain than styles like these:</p>
<pre><code class="lang-html"><span class="hljs-class">.myBox</span> {}                      <span class="hljs-comment">/* 0,0,1,0 */</span>
<span class="hljs-class">.menu</span> <span class="hljs-class">.menu_item</span> {}            <span class="hljs-comment">/* 0,0,2,0 */</span>
<span class="hljs-id">ul</span><span class="hljs-class">.list</span> <span class="hljs-class">.active</span> {}             <span class="hljs-comment">/* 0,0,2,1 */</span>
<span class="hljs-class">.main</span> <span class="hljs-class">.article</span> <span class="hljs-class">.summary</span> {}     <span class="hljs-comment">/* 0,0,3,0 */</span>
<span class="hljs-class">.nav</span> <span class="hljs-class">.list</span> <span class="hljs-class">.item</span> <span class="hljs-tag">a</span> {}          <span class="hljs-comment">/* 0,0,3,1 */</span>
</code></pre>

<p>Choosing to include a namespace or not, and to use a <em>class</em> or a <em>id</em> for the namespace, depends on the weight of rules in other style sheets. For atomic classes to be relevant they must have enough weight to overwrite non-atomic styles. The specificity may be the same as non-atomic styles as long as the atomic style sheet is included <strong>after</strong> other style sheets.</p>
<p>This table suggests the namespace to use depending on the weight of your other rules (<a href="http://specificity.keegan.st/">Specificity Calculator</a>).</p>
<table class="Ta(start) W(100%)">
    <caption class="Hidden">Namespace consideration</caption>
    <thead>
        <tr>
            <th scope="col" class="P(10px)">Specificity</th>
            <th scope="col" class="P(10px)">Namespace</th>
        </tr>
    </thead>
    <tbody>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>0,0,1,1</code></th>
            <td class="Va(t) P(10px)">No need for a namespace</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">Less or equal to <code>0,0,1,1</code></th>
            <td class="Va(t) P(10px)">Use <code>html</code> (type) for namespace</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">Less or equal to <code>0,0,2,0</code></th>
            <td class="Va(t) P(10px)">Use a <code>class</code> for namespace</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">Less or equal to <code>0,1,1,0</code></th>
            <td class="Va(t) P(10px)">Use a <code>id</code> for namespace</td>
        </tr>
            <tr class="BdT Bdc(#0280ae.3)">
                <th scope="row" class="Va(t) Whs(nw) P(10px)">More than <code>0,1,1,0</code></th>
                <td class="Va(t) P(10px)">Use whatever it takes <b class="Fw(n)"><a href="#footnote">[4]</a><a id="footnote-4" class="D(ib)"></a></b></td>
            </tr>
    </tbody>
</table>

<p class="noteBox info">You can set up a namespace in <a href="https://github.com/acss-io/grunt-atomizer#examples">grunt-atomizer</a> or via <a href="https://github.com/acss-io/atomizer#cli">the Atomizer command line</a>.</p>

<h3 id="style-sheets-organization">Style sheets organization</h3>
<p>Take advantage of the <em>cascade</em> by creating &quot;specificity layers&quot; <b class="Fw(n)"><a href="#footnote">[3]</a><a id="footnote-3" class="D(ib)"></a></b> and loading files in proper order.</p>
<table class="Ta(start) W(100%)">
    <caption class="Hidden">Namespace consideration</caption>
    <thead>
        <tr>
            <th scope="col" class="P(10px)">Layer</th>
            <th scope="col" class="P(10px)">Specificity</th>
            <th scope="col" class="P(10px)">Style sheets</th>
        </tr>
    </thead>
    <tbody>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">type selectors</th>
            <td class="Va(t) P(10px)"><code>0,0,0,x</code></td>
            <td class="Va(t) P(10px)">normalize.css,<br> base.css,<br> etc.</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">single class</th>
            <td class="Va(t) P(10px)"><code>0,0,1,0</code></td>
            <td class="Va(t) P(10px)">helpers.css,<br> utility.css,<br> etc.</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)">contextual selectors<br> (any number of classes)</th>
            <td class="Va(t) P(10px)"><code>0,0,x,x</code></td>
            <td class="Va(t) P(10px)">layout.css,<br> custom.css,<br> etc.</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(nw) P(10px)"><b class="Fw(b)">ACSS</b> classes</th>
            <td class="Va(t) P(10px)"><code>0,1,1,0</code></td>
            <td class="Va(t) P(10px)">atomic.css</td>
        </tr>
            <tr class="BdT Bdc(#0280ae.3)">
                <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>@style</code></th>
                <td class="Va(t) P(10px)"><code>1,0,0,0</code></td>
                <td class="Va(t) P(10px)">Inline Styles</td>
            </tr>
            <tr class="BdT Bdc(#0280ae.3)">
                <th scope="row" class="Va(t) Whs(nw) P(10px)"><code>!important</code> rule</th>
                <td class="Va(t) P(10px)">Trumps all the above <b class="Fw(n)"><a href="#footnote">[5]</a><a id="footnote-5" class="D(ib)"></a></b></td>
                <td class="Va(t) P(10px)">Can be anywhere<br> (as an exception)</td>
            </tr>
    </tbody>
</table>

<p class="noteBox info">This web site uses <em>flat selectors</em> (<code>0,0,1,0</code>) which allows us to follow the same logic as above without the need for a namespace.</p>

<hr class="Mt(50px)">

<ol id="footnote" class="ol-list">
    <li>An example of this could be the markup of a &quot;button&quot; that could appear in many places across a project (versus a unique &quot;component&quot; <em>included</em> in multiple places) <a href="#footnote-1">[↩]</a>.</li>
    <li>Unless that component relies on custom values from the config file - in which case, keys from that file would need to be added to the config of the other project <a href="#footnote-2">[↩]</a>.</li>
    <li>Specificity is something we want to leverage, not something we want to keep a lid on <a href="#footnote-3">[↩]</a>.</li>
    <li>The namespace can be anything, for example: <code>#someId #anotherId .andAclass</code> <a href="#footnote-4">[↩]</a>.</li>
    <li><code>!important</code> is not related to specificity per se <a href="#footnote-5">[↩]</a>.</li>
</ol>
