---
section: docs
layout: docs
title: Frequently Asked Questions
---

<p>This section is intended to answer common questions related to Atomic CSS and Atomizer. If you&#39;re unable to find an answer to your question, <a href="/support.html">you can find support here</a>.</p>
<h2 id="questions-related-to-the-atomic-css-architecture">Questions related to the Atomic CSS architecture</h2>
<ul class="ul-list">
   <li><a href="#what-is-atomic-css-">What is Atomic CSS?</a></li>
   <li><a href="#how-is-atomic-css-different-than-using-inline-styles-">How is Atomic CSS different than using inline styles?</a></li>
   <li><a href="#what-are-the-benefits-of-atomic-css-">What are the benefits of Atomic CSS?</a></li>
   <li><a href="#how-does-atomic-css-compare-to-bootstrap-purecss-or-other-css-framework-">How does Atomic CSS compare to Bootstrap, PureCSS, or other CSS frameworks?</a></li>
   <li><a href="#i-have-always-been-told-to-use-classes-related-to-content-not-to-presentation-isn-t-atomic-css-promoting-bad-practice-">I have always been told to use classes related to content, <em>not to presentation</em>. Isn&#39;t Atomic CSS promoting bad practice?</a></li>
   <li><a href="#isn-t-atomic-css-moving-bloat-from-style-sheets-to-html-">Isn&#39;t Atomic CSS moving bloat from style sheets to HTML?</a></li>
   <li><a href="#how-can-you-distribute-presentation-changes-without-asking-everyone-to-change-their-markup-">How can you distribute presentation changes without asking everyone to change their markup?</a></li>
   <li><a href="#how-does-atomic-css-work-with-abbr-title-responsive-web-design-rwd-abbr-">How does Atomic CSS work with Responsive Web Design (RWD)?</a></li>
</ul>

<h2 id="questions-related-to-atomizer">Questions related to Atomizer</h2>
<ul class="ul-list">
   <li><a href="#should-i-quot-atomize-quot-everything-should-i-style-everything-using-atomic-classes-">Should I &quot;<em>atomize</em>&quot; everything? Should I style everything using atomic classes?</a></li>
   <li><a href="#do-i-need-to-specify-a-namespace-and-if-yes-what-should-i-use-">Do I need to specify a namespace? And if yes, what should I use?</a></li>
   <li><a href="#why-are-atomic-classes-capitalized-as-far-as-i-know-no-other-framework-does-that-">Why are Atomic classes capitalized? As far as I know, no other framework does that?</a></li>
   <li><a href="#why-do-i-have-to-use-lowercase-for-color-values-">Why do I have to use lowercase for colors?</a></li>
   <li><a href="#why-are-descendant-classes-not-relying-on-the-namespace-why-are-those-styles-using-important-">Why are &quot;descendant classes&quot; not relying on the namespace? Why are those styles using <code>!important</code></a>?</li>
   <li><a href="#how-can-one-remember-atomic-class-names-">How can one remember Atomic class names?</a></li>
   <li><a href="#how-come-atomizer-is-not-creating-some-classes-for-me-">How come Atomizer is not creating some classes for me?</a></li>
   <li><a href="#how-come-atomizer-does-not-add-vendor-prefixes-where-needed-">How come Atomizer does not add vendor prefixes where needed?</a></li>
</ul>

<h2 id="answers-related-to-the-atomic-css-architecture">Answers related to the Atomic CSS architecture</h2>
<h3 id="what-is-atomic-css-">What is Atomic CSS?</h3>
<p>Atomic CSS is a collection of single purpose styling units (<em>single responsibility principle for maximum reuse</em>) that fits well with components in templated frameworks such as <a href="https://github.com/facebook/react">React</a>, <a href="https://github.com/emberjs/ember.js/">Ember</a>, or <a href="https://github.com/angular/angular.js">Angular</a>.</p>
<p>Atomic classes and their associated styling are <strong>immutable</strong>, meaning you&#39;d use the same classes whatever the project you&#39;re working on or the team you&#39;re working with. In other words, Atomic CSS is a common &quot;vocabulary&quot; meant to style documents <em>regardless of context or content</em>.</p>
<p>For more information about Atomic CSS, we recommend that you read <a href="http://www.smashingmagazine.com/2013/10/21/challenging-css-best-practices-atomic-approach/">Challenging CSS best practices</a> on Smashing Magazine, watch the <a href="https://www.youtube.com/watch?v=ojj_-6Xiud4">Atomic CSS presentation</a> on youtube, or check the <a href="https://www.haikudeck.com/atomic-css-uncategorized-presentation-dJ0xlFjhBQ">Atomic CSS slide deck</a> on haikudeck.</p>
<p class="noteBox info">Note that the above materials are relatively &quot;old&quot; and some of their content may have changed.</p>

<h3 id="how-is-atomic-css-different-than-using-inline-styles-">How is Atomic CSS different than using inline styles?</h3>
<dl class="dl-list">
    <dt>Inline styling, the bad parts:</dt>
    <dd>High specificity, verbosity, the inability to deal with pseudo-classes or pseudo-elements, and the fact that those bytes are not cached</dd>
    <dt>Inline styling, the good parts:</dt>
    <dd>Scope is limited to the element onto which the classes are  applied to and the styling is <em>portable</em> because that styling is <em>not</em> contextual.</dd>
</dl>

<p><img class="Va(m) Pos(r) Mt(30px)" alt="Venn diagram showing the difference between Atomic CSS and inline styling" height="400" src="https://s.yimg.com/os/acss/images/atomic-vs-style.207423c1.gif" /></p>
<table cellspacing="0" class="W(100%) Ta(start)">
    <caption class="Hidden">The difference between inline styling and Atomic CSS</caption>
    <thead>
      <tr>
          <th scope="col" class="P(10px)"></th>
          <th scope="col" class="P(10px) Whs(nw)">Inline styling</th>
          <th scope="col" class="P(10px)">Atomic CSS</th>
      </tr>
    </thead>
    <tbody>
        <tr class="BdT">
            <th scope="row" class="Va(t) P(10px)">Specificity</th>
            <td class="Va(t) P(10px)">1.0.0.0</td>
            <td class="Va(t) P(10px)">0.0.1.0 <a href="#footnote">[1]</a><a id="footnote-1" class="D(ib)"></a></td>
        </tr>
        <tr class="BdT">
            <th scope="row" class="Va(t) P(10px)">Verbosity</th>
            <td class="Va(t) P(10px)">High</td>
            <td class="Va(t) P(10px)">Minimal</td>
        </tr>
        <tr class="BdT">
            <th scope="row" class="Va(t) P(10px)">Abstraction</th>
            <td class="Va(t) P(10px)">None</td>
            <td class="Va(t) P(10px)">Fallbacks, tweaks, LTR/RTL support, etc.</td>
        </tr>
    </tbody>
</table>

<h3 id="what-are-the-benefits-of-atomic-css-">What are the benefits of Atomic CSS?</h3>
<p>The main benefit of Atomic CSS is that it prevents bloat by <em>dramatically reducing redundancy</em>. This is possible because rules are content agnostic which makes them much more re-usable than rules based on &quot;semantic&quot; selectors (names that relate to <em>what</em> is styled).</p>
<p>It also:</p>
<dl class="dl-list">
    <dt>moves specificity out of the way:</dt>
    <dd>authors do not have to sandbox their styling via contextual selectors, everything is done via generic classes through markup - which normalizes selector <em>weight</em> and reduces <em>scope</em>.</dd>
    <dt>improves performance:</dt>
    <dd>less bloat means less bytes (<em>much less</em>).</dd>
    <dt>removes dependencies:</dt>
    <dd>&quot;components&quot; (or &quot;objects&quot;) <em>rely on generic CSS rules</em>, so there is no need to associate them with their own style block or styles sheet.</dd>
    <dt>allows to share content and assets easily:</dt>
    <dd>UI patterns can be easily shared across projects as their styling relies on the same generic set of rules (the same style sheet).</dd>
    <dt>leverages cache:</dt>
    <dd>The style sheet can be cached for a much longer time because authors re-use existing rules rather than adding new ones to the style sheet.</dd>
    <dt>facilitates RTL/LTR interface switch:</dt>
    <dd>Directions (left/right) are abstracted which allows authors to style without much concern for script direction.</dd>
</dl>

<p>This speaks for itself:</p>
<pre><code class="lang-css"><span class="hljs-class">.headline</span>,
<span class="hljs-class">.cta-button</span>,
<span class="hljs-class">.icon-large</span>,
<span class="hljs-class">.title</span>,
<span class="hljs-class">.intro</span> <span class="hljs-rules">{
    <span class="hljs-rule"><span class="hljs-attribute">font-size</span>:<span class="hljs-value"> <span class="hljs-number">18px</span></span></span>;
}</span>
</code></pre>
<p>versus:</p>
<pre><code class="lang-css"><span class="hljs-class">.Fz</span>(<span class="hljs-tag">large</span>) <span class="hljs-rules">{
    <span class="hljs-rule"><span class="hljs-attribute">font-size</span>:<span class="hljs-value"> <span class="hljs-number">18px</span></span></span>;
}</span>
</code></pre>
<p class="noteBox info">For the sake of readability, CSS classes on this page <em>do not</em> include the escape character (<code>\</code>) where it should be needed.</p>

<p>Such approach produces less of everything:</p>
<table cellspacing="0" class="W(100%) Ta(c)">
    <caption class="Hidden">Table comparing yahoo.com against other web sites</caption>
    <thead>
      <tr class="Bgc-#ececec">
          <th scope="col" class="P(10px)"></th>
          <th scope="col" class="P(10px) Whs(nw)">rules</th>
          <th scope="col" class="P(10px)">selectors</th>
          <th scope="col" class="P(10px)">declarations</th>
          <th scope="col" class="P(10px)">properties</th>
          <th scope="col" class="P(10px)">font-size</th>
          <th scope="col" class="P(10px)"><abbr title="Kilobyte">KB</abbr></th>
      </tr>
    </thead>
    <tbody>
        <tr class="BdT">
            <th scope="row" class="Ta(start) P(10px)">twitter.com</th>
            <td class="P(10px)">6,372 <a href="#footnote">[2]</a><a id="footnote-2" class="D(ib)"></a></td>
            <td class="P(10px)">9,104</td>
            <td class="P(10px)">15,000</td>
            <td class="P(10px)">135</td>
            <td class="P(10px)">755</td>
            <td class="P(10px)">585</td>
        </tr>
        <tr class="BdT">
            <th scope="row" class="Ta(start) P(10px)">facebook.com</th>
            <td class="P(10px)">3,316</td>
            <td class="P(10px)">4,018</td>
            <td class="P(10px)">7,947</td>
            <td class="P(10px)">103</td>
            <td class="P(10px)">157</td>
            <td class="P(10px)">281</td>
        </tr>
        <tr class="BdT">
            <th scope="row" class="Ta(start) P(10px)">medium.com</th>
            <td class="P(10px)">3,090</td>
            <td class="P(10px)">4,030</td>
            <td class="P(10px)">7,321</td>
            <td class="P(10px)">150</td>
            <td class="P(10px)">432</td>
            <td class="P(10px)">282</td>
        </tr>
        <tr class="BdT">
            <th scope="row" class="Ta(start) P(10px)">youtube.com</th>
            <td class="P(10px)">3,530</td>
            <td class="P(10px)">4,684</td>
            <td class="P(10px)">9,005</td>
            <td class="P(10px)">136</td>
            <td class="P(10px)">336</td>
            <td class="P(10px)">352</td>
        </tr>
        <tr class="BdT">
            <th scope="row" class="Ta(start) P(10px)">tumblr.com</th>
            <td class="P(10px)">5,647 <a href="#footnote">[2]</a><a id="footnote-2b" class="D(ib)"></a></td>
            <td class="P(10px)">7,616</td>
            <td class="P(10px)">18,100</td>
            <td class="P(10px)">253</td>
            <td class="P(10px)">499</td>
            <td class="P(10px)">733</td>
        </tr>
        <tr class="BdT Bgc-#ff0">
            <th scope="row" class="Ta(start) P(10px)">yahoo.com</th>
            <td class="P(10px) Fw(b)">1,891</td>
            <td class="P(10px) Fw(b)">2,311</td>
            <td class="P(10px) Fw(b)">4,579</td>
            <td class="P(10px) Fw(b)">124</td>
            <td class="P(10px) Fw(b)">71</td>
            <td class="P(10px) Fw(b)">189</td>
        </tr>
    </tbody>
    <tfoot>
      <tr class="Bgc-#ececec">
          <th scope="col" class="P(10px)"></th>
          <th scope="col" class="P(10px) Whs(nw)">rules</th>
          <th scope="col" class="P(10px)">selectors</th>
          <th scope="col" class="P(10px)">declarations</th>
          <th scope="col" class="P(10px)">properties</th>
          <th scope="col" class="P(10px)">font-size</th>
          <th scope="col" class="P(10px)"><abbr title="Kilobyte">KB</abbr></th>
      </tr>
    </tfoot>
</table>

<p><small>Source: <a href="http://cssstats.com">cssstats.com</a></small></p>
<p>The table above uses yahoo.com for reference as this site uses an early version of Atomic CSS.</p>

<h3 id="how-does-atomic-css-compare-to-bootstrap-purecss-or-other-css-framework-">How does Atomic CSS compare to Bootstrap, PureCSS, or other CSS framework?</h3>
<p>Atomic CSS is not a framework; it does not contain UI components nor a grid system. It is a solution that allows you to to create <strong>your own UI</strong> while preventing bloat.</p>
<p>Atomic&#39;s &quot;footprint&quot; is limited to what a project uses - meaning there is no &quot;entry cost&quot;. Simply installing <a href="/guides/atomizer.html">Atomizer</a> in your project does not add any bytes to your pages.</p>
<h3 id="i-have-always-been-told-to-use-classes-related-to-content-not-to-presentation-isn-t-atomic-css-promoting-bad-practice-">I have always been told to use classes related to content, <em>not to presentation</em>. Isn&#39;t Atomic CSS promoting bad practice?</h3>
<blockquote>
    <div>
        <p class="Mt(0)">
        Despite the <a href="http://dev.w3.org/html5/spec/global-attributes.html#classes">HTML5 specification section on classes</a> repeating the assumed “best practice” that…
        </p>
        <blockquote>
            <div>
                <p>…authors are encouraged to use [class attribute] values that describe the nature of the content, rather than values that describe the desired presentation of the content.</p>
            </div>
        </blockquote>
        <p>…there is no inherent reason to do this. In fact, it’s often a hindrance when working on large websites or applications.</p>
    <small><a href="http://nicolasgallagher.com/about-html-semantics-front-end-architecture/">About HTML semantics and front-end architecture</a></small>
    </div>
</blockquote>

<p>The sole purpose of classes is to provide hooks for styling and behavior. They are not exposed to end users, nor parsed by screen-readers or search engines <a href="#footnote">[3]</a><a id="footnote-3" class="D(ib)"></a>.</p>
<p>The main goal of Atomic CSS is to reduce bloat, so to better achieve this we must ignore content and context as much as possible.</p>
<p>Look at the following snippet for example (a carousel without a <code>carousel</code> class). It creates a working carousel.
We put things together in the markup, there is no need for &quot;carousel&quot; rules in the style sheet.
If we wanted to show only 2 items per view, we would simply replace W(20%) with W(50%) - that’s it.</p>
<pre><code class="lang-html"><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">data-plugin</span>=<span class="hljs-value">"carousel"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"Ov(h) Pos(r)"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-title">ul</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"M(0) P(0) Whs(nw)"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-title">li</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"D(ib) W(20%)"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-title">li</span>&gt;</span><span class="hljs-comment">&lt;!--
         --&gt;</span><span class="hljs-tag">&lt;<span class="hljs-title">li</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"D(ib) W(20%)"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-title">li</span>&gt;</span><span class="hljs-comment">&lt;!--
         --&gt;</span><span class="hljs-tag">&lt;<span class="hljs-title">li</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"D(ib) W(20%)"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-title">li</span>&gt;</span><span class="hljs-comment">&lt;!--
         --&gt;</span><span class="hljs-tag">&lt;<span class="hljs-title">li</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"D(ib) W(20%)"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-title">li</span>&gt;</span><span class="hljs-comment">&lt;!--
            ...
        &lt;/ul&gt;
    &lt;/div&gt;
&lt;/div&gt;</span>
</code></pre>
<p>Unlike a <code>.carousel</code> class, all the above classes can be re-used to style any other widget.</p>
<h3 id="isn-t-atomic-css-moving-bloat-from-style-sheets-to-html-">Isn&#39;t Atomic CSS moving bloat from style sheets to HTML?</h3>
<p>The table below represents the average number of characters per class attribute on a page.
Note that Facebook appears to uglify some classes.</p>
<table cellspacing="0" class="Ta(c)">
    <caption class="Hidden">Number of characters per class attributes between web sites</caption>
    <thead>
      <tr>
          <th scope="col" class="P(10px)"></th>
          <th scope="col" class="P(10px) Whs(nw)">Number of characters per <code>@class</code></th>
      </tr>
    </thead>
    <tbody>
        <tr class="BdT">
            <th scope="row" class="Ta(start) P(10px)">twitter.com</th>
            <td class="P(10px)">28</td>
        </tr>
        <tr class="BdT">
            <th scope="row" class="Ta(start) P(10px)">facebook.com</th>
            <td class="P(10px)">17 <a href="#footnote">[4]</a><a id="footnote-4" class="D(ib)"></a></td>
        </tr>
        <tr class="BdT">
            <th scope="row" class="Ta(start) P(10px)">usatoday.com</th>
            <td class="Va(t) P(10px)">38</td>
        </tr>
        <tr class="BdT">
            <th scope="row" class="Ta(start) Va(t) P(10px)">theguardian.com</th>
            <td class="P(10px)">36</td>
        </tr>
        <tr class="BdT">
            <th scope="row" class="Ta(start) P(10px)">yahoo.com</th>
            <td class="P(10px) Fw(b)">22</td>
        </tr>
    </tbody>
</table>

<p>The table above uses yahoo.com for reference as this site uses an early version of Atomic CSS.</p>

<h4 id="gzip-loves-atomic-css">Gzip loves Atomic CSS</h4>
<p>If we put Gzip into the picture, then things look even better. That’s because a lot of repetitions means a better compression ratio.
From a few tests we ran, it’s about 35% for semantic classes versus 48% for Atomic classes.</p>
<h3 id="how-can-you-distribute-presentation-changes-without-asking-everyone-to-change-their-markup-">How can you distribute presentation changes without asking everyone to change their markup?</h3>
<p>Use Atomic classes where it makes sense; for example the following creates much of the content of our <a href="./reference">reference</a> page. If we decided to change the styling of this content this would be the only place we&#39;d need to go to.</p>
<pre><code class="lang-js">return (
    <span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">key</span>=<span class="hljs-value">{'id-'</span> + <span class="hljs-attribute">recipe.id</span>} <span class="hljs-attribute">className</span>=<span class="hljs-value">{displayclassDefinitions}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-title">h3</span> <span class="hljs-attribute">className</span>=<span class="hljs-value">"M(0) Mt(10px) P(10px)"</span>&gt;</span>{recipe.name}<span class="hljs-tag">&lt;/<span class="hljs-title">h3</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-title">dl</span> <span class="hljs-attribute">className</span>=<span class="hljs-value">"M(0) P(10px) Pt(0) Pend(50px)--sm Ff(m)"</span>&gt;</span>{classDefinitions}<span class="hljs-tag">&lt;/<span class="hljs-title">dl</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>
);
</code></pre>
<h3 id="how-does-atomic-css-work-with-abbr-title-responsive-web-design-rwd-abbr-">How does Atomic CSS work with <abbr title="Responsive Web Design">RWD</abbr>?</h3>
<p>Please visit our <a href="tutorials/responsive-web-design.html">RWD docs</a> to see examples of how you can use Atomic CSS to create styles in the context of breakpoints.</p>
<h2 id="answers-related-to-atomizer">Answers related to Atomizer</h2>
<h3 id="should-i-atomize-everything-should-i-style-everything-using-atomic-classes-">Should I &quot;atomize&quot; everything? Should I style everything using atomic classes?</h3>
<p>If changing some styling requires you to edit multiple files, then you should use the classic CSS approach: apply a &quot;meaningful&quot; class to the element you want to style and use that hook to write rules in a style sheet. But if changing a given style across the board can be done in one place - other than a style sheet - then you should go with Atomic CSS.</p>
<p>An example of the former could be headings (unless they are &quot;components&quot;) meant to look the same across many modules, or any other styling meant to be shared across different modules. An example of the latter is a component that lives in a template or a JS file, like a specific widget with its own styling.</p>
<h3 id="do-i-need-to-specify-a-namespace-and-if-yes-what-should-i-use-">Do I need to specify a namespace? And if yes, what should I use?</h3>
<p>You do not need to use a namespace per se but this is extremely useful to bump the specificity of Atomic rules.
Our advice is to use an <code>id</code> (we use <code>#atomic</code>) so all Atomic rules can easily overwrite declarations from other rules; for example:</p>
<pre><code class="lang-css"><span class="hljs-class">.hero-module</span> <span class="hljs-class">.button</span> <span class="hljs-rules">{
    <span class="hljs-rule"><span class="hljs-attribute">font-size</span>:<span class="hljs-value"> <span class="hljs-number">1.6em</span></span></span>;
    <span class="hljs-rule"><span class="hljs-attribute">font-weight</span>:<span class="hljs-value"> bold</span></span>;
}</span>
...
<span class="hljs-id">#atomic</span> <span class="hljs-class">.Fw</span>(<span class="hljs-tag">n</span>) <span class="hljs-rules">{
    <span class="hljs-rule"><span class="hljs-attribute">font-weight</span>:<span class="hljs-value"> normal</span></span>;
}</span>
</code></pre>
<pre><code class="lang-html">&lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"hero-module"</span>&gt;
    &lt;button <span class="hljs-type">class</span>=<span class="hljs-string">"button Fw(n)"</span>&gt;...&lt;/button&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<p>The value for <code>font-weight</code> in the <code>.hero-module .button {...}</code> rule is overwritten by the Atomic class in the markup <a href="#footnote">[5]</a><a id="footnote-5" class="D(ib)"></a>.</p>
<div class="noteBox info My-1em">
<p>We like to deal with 5 &quot;specificity&quot; brackets:</p>
<ul class="ul-list">
    <li>rules involving only type selectors</li>
    <li>rules involving only classes</li>
    <li>rules involving an <code>id</code></li>
    <li>styles set via JavaScript</li>
    <li>rules using <code>!important</code></li>
</ul>
<p>This clear separation helps to better manage styles inside large scale projects.</p>
</div>

<h3 id="why-are-atomic-classes-capitalized-as-far-as-i-know-no-other-framework-does-that-">Why are Atomic classes capitalized? As far as I know, no other framework does that?</h3>
<p>We took advantage of the fact that nobody seems to capitalize classes and that CSS is case sensitive to get a &quot;cheap&quot; namespace, one that does not rely on extra character(s).</p>
<h3 id="why-do-i-have-to-use-lowercase-for-color-values-">Why do I have to use lowercase for color values?</h3>
<p>To prevent redundancy, we made the choice to favor lowercase over uppercase, even though the latter is valid.</p>
<p>This is because classes such as <code>C(#fff)</code> and <code>C(#FFF)</code> would not duplicate the declaration but would add an unnecessary selector to the style sheet.</p>
<h3 id="why-are-descendant-classes-not-relying-on-the-namespace-why-are-those-styles-using-important-">Why are &quot;descendant classes&quot; not relying on the namespace? Why are those styles using <code>!important</code>?</h3>
<p>If you have chosen to use a namespace then all Atomic rules rely on that namespace except the ones containing descendant selectors as those are <strong>not</strong> &quot;sandboxed&quot; via that said namespace. Instead, Atomizer adds !important to those styles.</p>
<p>The reason for this is because including the namespace in the selector could make the rule fail to target the node.
For example this would not work (using <code>atomic</code> as the namespace):</p>
<pre><code class="lang-html">&lt;html <span class="hljs-property">id</span>=<span class="hljs-string">"atomic"</span> <span class="hljs-type">class</span>=<span class="hljs-string">"open"</span>&gt;
    ...
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"open_D(b)"</span>&gt;...&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">html</span>&gt;
</code></pre>
<p>This is because including the namespace would create the following rule:</p>
<pre><code class="lang-css"><span class="hljs-id">#atomic</span> <span class="hljs-class">.open</span> <span class="hljs-class">.open_D</span>(<span class="hljs-tag">b</span>) <span class="hljs-rules">{
    <span class="hljs-rule"><span class="hljs-attribute">display</span>:<span class="hljs-value"> block</span></span>;
}</span>
</code></pre>
<p>but since <code>open</code> is not a descendant of <code>atomic</code>, but its sibling, the selector does not target the node thus the style would not apply.</p>
<p>To prevent this issue we have chosen to add <code>!important</code> to contextual classes rather than using the namespace. Hence the rule is written like so:</p>
<pre><code class="lang-css"><span class="hljs-class">.open</span> <span class="hljs-class">.open</span>(<span class="hljs-tag">Db</span>) <span class="hljs-rules">{
    <span class="hljs-rule"><span class="hljs-attribute">display</span>:<span class="hljs-value"> block <span class="hljs-important">!important</span></span></span>;
}</span>
</code></pre>
<p class="noteBox warning">Keep this in mind in case you need to style that same node with JavaScript.</p>

<p class="noteBox info">This is not relevant when there is no namespace set up. In that case, the rule is not written using <code>!important</code>.</p>

<h3 id="how-can-one-remember-atomic-class-names-">How can one remember Atomic class names?</h3>
<p>The syntax comes from <a href="http://emmet.io">Emmet</a>, which is a plugin for many IDEs. It allows you to type a few characters and get property/value pairs.
Like Emmet shortcuts, Atomic classes are for the most part simple abbreviations.</p>
<p>Also, note that we do not use <code>left</code> and <code>right</code> but instead <code>start</code> and <code>end</code>. So we can easily output a RTL style sheet.</p>
<p>The <a href="../guides/syntax.html">syntax</a> and <a href="reference">reference</a> pages are meant to help you with this; and we may have a plugin for your IDE in the near future...</p>
<h3 id="how-come-atomizer-is-not-creating-some-classes-for-me-">How come Atomizer is not creating some classes for me?</h3>
<p>Make sure your grunt config is set up to scan all the files onto which Atomic classes are applied. See <strong>&lt;path to files to be scanned&gt;</strong> below:</p>
<pre><code class="lang-javascript">module.exports = <span class="hljs-keyword">function</span> (grunt) {
    grunt.config.set(<span class="hljs-string">'atomizer'</span>, {
        dev: {
            options: {
                configFile: <span class="hljs-string">'./configs/atomizer.json'</span>,
                configOutput: <span class="hljs-string">'./configs/atomizer.json'</span>,
                namespace: <span class="hljs-string">'#Stencil'</span>
            },
            files: [{
                src: [<span class="hljs-string">'components/**/*.jsx'</span>],
                dest: <span class="hljs-string">'build/css/atomic.css'</span>
            }]
        },
        dist: {
            options: {
                configFile: <span class="hljs-string">'./configs/atomizer.json'</span>,
                configOutput: <span class="hljs-string">'./configs/atomizer.json'</span>,
                namespace: <span class="hljs-string">'#atomic'</span>
            },
            files: [{
                src: [<span class="hljs-string">'&lt;path to files to be scanned&gt;'</span>],
                dest: <span class="hljs-string">'build/css/atomic.css'</span>
            }]
        }
    });

    grunt.loadNpmTasks(<span class="hljs-string">'grunt-atomizer'</span>);
};
</code></pre>
<h3 id="how-come-atomizer-does-not-add-vendor-prefixes-where-needed-">How come Atomizer does not add vendor prefixes where needed?</h3>
<p>We didn&#39;t want to reinvent the wheel as there are tools out there that do this very well (i.e. <a href="https://github.com/postcss/autoprefixer">autoprefixer</a>).</p>
<hr class="Mt(50px)">

<ol id="footnote" class="ol-list">
    <li>Specificity of Atomic rules can be increased via namespace. You&#39;d use a <code>type</code> selector for <code>0.0.1.1</code>, a <code>class</code> for <code>0.0.2.0</code>, and an <code>id</code> for <code>0.1.1.0</code> <a href="#footnote-1">[↩]</a>.</li>
    <li>Maximum number of rules for IE9: 4,095 (65,534 for IE10+) <a href="#footnote-2">[↩]</a><a href="#footnote-2b">[↩]</a>.</li>
    <li><a href="http://microformats.org/">microformats</a> is a different story <a href="#footnote-3">[↩]</a>.</li>
    <li>Thanks to some uglification <a href="#footnote-4">[↩]</a>.</li>
    <li>Choosing a <code>id</code> for the namespace (i.e. <code>#atomic</code>) guarantees that Atomic CSS styles overwrite any other rule in a project based on classes &mdash; regardless how many classes are being used. <br> We do not use <code>!important</code> as such styling would overwrite inline styles as well as other rules in a project that could be using an <code>id</code> to create more specific styling <a href="#footnote-5">[↩]</a>.</li>
</ol>
