##

<div class="Bxz(bb) D(ib) Va(t) W(100%) Pend(30px)--sm W(50%)--sm">
<h2 class="Bdw(0)! P(0) M(0) Ta(c)">CSS is painful</h2>
<p>CSS is a critical piece of the frontend toolkit, but it's hard to manage, especially in large projects. Styles are written in a global scope, which is narrowed through complex selectors. Specificity issues, redundancy, bloat, and maintenance can become a nightmare. And modular, component-based projects only add to the complexity. Atomic CSS enables you to style directly in your components, avoiding the headache of managing stylesheets.</p>
</div><!--
--><div class="Bxz(bb) D(ib) Va(t) W(100%) Pend(30px)--sm W(50%)--sm">
<h2 class="Bdw(0)! P(0) M(0) Ta(c)">Style with class</h2>
<p>Most approaches to styling inside components rely on inline styles, which are limiting. Atomic CSS, like inline styles, offers single-purpose units of style, but applied via *classes*. This allows for the use of handy things such as media queries, contextual styling and pseudo-classes. The lower specificity of classes also allows for easier overrides. And the short, predictable classnames are highly reusable and compress well.</p>
</div><!--
--><div class="Mx(a) Mt(10px) Bxz(bb) Va(t) W(100%) W(65%)--sm">
<h2 class="Bdw(0)! P(0) M(0) Ta(c)">Meet Atomizer</h2>
<p>[Atomizer](https://github.com/yahoo/atomizer) is a tool for creating Atomic CSS. Generate an Atomic stylesheet dynamically from the Atomic classes you're actually using in your project (no unused styles!), or predeclare styles in configuration - it's up to you. Atomizer is not opinionated, brings no CSS of its own, and integrates nicely with your favorite task runner.</p>
</div>

## Colors

<div class="Row">
    <div class="Fl(start) W(60%) Fl(n)--xs W(a)--xs">
        Colors are set using hexadecimal values. Alpha transparency is created by appending the opacity value to the `hex` color.
    </div>
    <div class="Fl(start) W(60%) Cl(b) Fl(n)--xs W(a)--xs">
<pre><code class="lang-html">&lt;div class="Bgc(<span class="hljs-number">#0280ae</span>.<span class="hljs-number">5</span>) C(<span class="hljs-number">#fff</span>) P(20px)"&gt;
    <span class="hljs-comment">Lorem ipsum</span>
&lt;/div&gt;
</code></pre>
    </div>
    <div class="Fl(end) W(30%) My(1em) Fl(n)--xs W(a)--xs">
        <div class="Bgc(#0280ae.5) C(#fff) P(20px)">
            Lorem ipsum
        </div>
    </div>
</div>

## Variables

<div class="Row">
    <div class="Fl(start) W(60%) Fl(n)--xs W(a)--xs">
        <p>&quot;[Variables](/guides/atomic-classes.html#variables)&quot; are useful for theming and the like but they can also be used to share a common value across declarations.</p>
        <p>In this example, `brandColor` is responsible for setting the text color, the background color, and the border color, while `columnWidth` dictates the width of the 1st box and the left offset of its sibling.</p>
    </div>
    <div class="Fl(start) W(60%) Cl(b) Fl(n)--xs W(a)--xs">
<pre><code class="lang-javascript"><span class="hljs-comment">// config object</span>
<span class="hljs-string">'custom'</span>: {
    <span class="hljs-string">'brandColor'</span>: <span class="hljs-string">'#0280ae'</span>,
    <span class="hljs-string">'columnWidth'</span>: <span class="hljs-string">'20px'</span>
}
</code></pre>
<pre><code class="lang-html">&lt;div class="Pos(a) Bgc(brandColor) W(columnWidth) H(90px)"&gt;&lt;/div&gt;
&lt;div class="C(brandColor) BdB Bdc(brandColor) Mstart(columnWidth) P(10px)"&gt;
     <span class="hljs-comment">Lorem ipsum</span>
&lt;/div&gt;
</code></pre>
    </div>
    <div class="Fl(end) W(30%) My(1em) Fl(n)--xs W(a)--xs">
        <div class="Pos(a) Bgc(brandColor) W(columnWidth) H(90px)"></div>
        <div class="C(brandColor) BdB Bdc(brandColor) Mstart(columnWidth) P(10px)">
            Lorem ipsum
        </div>
    </div>
</div>

### Computed values

<div class="Row">
    <div class="Fl(start) W(60%) Fl(n)--xs W(a)--xs">
        <p>You can also rely on the config file to do some math:</p>
    </div>
    <div class="Fl(start) W(60%) Cl(b) Fl(n)--xs W(a)--xs">
<pre><code class="lang-javascript"><span class="hljs-keyword">var</span> widthOfNav   = <span class="hljs-number">200</span>,
    widthOfMain  = <span class="hljs-number">600</span>,
    widthOfRail  = <span class="hljs-number">300</span>,
    widthOfGutter = <span class="hljs-number">10</span>;
    
<span class="hljs-module"><span class="hljs-keyword">module</span>.exports = </span>{
    <span class="hljs-string">'custom'</span>: {
        <span class="hljs-string">'nav-width'</span>: widthOfNav + <span class="hljs-string">'px'</span>,
        <span class="hljs-string">'main-width'</span>: widthOfMain + <span class="hljs-string">'px'</span>,
        <span class="hljs-string">'rail-width'</span>: widthOfRail + <span class="hljs-string">'px'</span>,
        <span class="hljs-string">'gutter-width'</span>: widthOfGutter + <span class="hljs-string">'px'</span>,
        <span class="hljs-string">'wrapper-width'</span>: widthOfNav + widthOfMain + widthOfRail + <span class="hljs-number">2</span> * widthOfGutter + <span class="hljs-string">'px'</span>
    }
};
</code></pre>
<pre><code class="lang-html">&lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"wrapper W(wrapper-width) Mx(a)"</span>&gt;...&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
    </div>
    <div class="Fl(end) W(30%) My(1em) Fl(n)--xs W(a)--xs">
    <!-- no example -->
    </div>
</div>

## Contextual selectors

<div class="Row">
    <div class="Fl(start) W(60%) Fl(n)--xs W(a)--xs">
        <p>Atomic syntax allows you to style elements [depending on their ancestors or siblings](/guides/atomic-classes.html#descendant-selectors).</p>
        <p>In this example, the same 2 boxes (same markup) are styled differently depending on which element they are nested into. They show side by side unless they are nested in an element with the class `foo` applied to it.</p>
    </div>
    <div class="Fl(start) W(60%) Cl(b) Fl(n)--xs W(a)--xs">
<pre><code class="lang-html"><span class="hljs-tag">&lt;<span class="hljs-title">div</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"Bgc(#0280ae.5) H(90px) IbBox W(50%) foo_W(100%)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span><span class="hljs-comment">&lt;!--
--&gt;</span><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"Bgc(#0280ae) H(90px) IbBox W(50%) foo_W(100%)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-title">hr</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"foo"</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"Bgc(#0280ae.5) H(90px) IbBox W(50%) foo_W(100%)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span><span class="hljs-comment">&lt;!--
--&gt;</span><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"Bgc(#0280ae) H(90px) IbBox W(50%) foo_W(100%)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>
</code></pre>
    </div>
    <div class="Fl(end) W(30%) My(1em) Fl(n)--xs W(a)--xs">
        <div>
            <div class="Bgc(#0280ae.5) H(90px) IbBox W(50%) foo_W(100%)"></div><!--
         --><div class="Bgc(#0280ae) H(90px) IbBox W(50%) foo_W(100%)"></div>
        </div>
        <hr>
        <div class="foo">
            <div class="Bgc(#0280ae.5) H(90px) IbBox W(50%) foo_W(100%)"></div><!--
         --><div class="Bgc(#0280ae) H(90px) IbBox W(50%) foo_W(100%)"></div>
        </div>
    </div>
</div>

## Pseudo-classes

<div class="Row">
    <div class="Fl(start) W(60%) Fl(n)--xs W(a)--xs">
        <p>Create styles that rely on [pseudo-classes](/guides/syntax.html#-lt-pseudo-class-).</p>
        <p>In this example, the foreground and background color change when users hover over the box.</p>
    </div>
    <div class="Fl(start) W(60%) Cl(b) Fl(n)--xs W(a)--xs">
<pre><code class="lang-html">&lt;div class="Bd Bgc(brandColor):h C(brandColor):h P(20px)"&gt;
    <span class="hljs-comment">Lorem ipsum</span>
&lt;/div&gt;
</code></pre>
    </div>
    <div class="Fl(end) W(30%) My(1em) Fl(n)--xs W(a)--xs">
        <div class="Bd Bgc(brandColor):h C(brandColor) C(#fff):h P(20px)">
            Lorem ipsum
        </div>
    </div>
    <p class="Cl(b) W(60%) Fl(n)--xs W(a)--xs">You can also combine descendant selectors with pseudo-classes. In this example, the nested box is revealed when a user hovers over **its parent**:</p>
        <div class="Fl(start) W(60%) Cl(b) Fl(n)--xs W(a)--xs">
<pre><code class="lang-html">&lt;div class="foo Bd C(brandColor) Ta(c)"&gt;
    &lt;p class="Op(0) foo:h&gt;Op(1)"&gt;<span class="hljs-comment">Lorem ipsum</span>&lt;/p&gt;
&lt;/div&gt;
</code></pre>
        </div>
        <div class="Fl(end) W(30%) My(1em) Fl(n)--xs W(a)--xs">
            <div class="foo Bd C(brandColor) Ta(c)">
                <p class="Op(0) foo:h>Op(1)">Lorem ipsum</p>
            </div>
        </div>

</div>

## Grids

<div class="Row">
    <div class="Fl(start) W(60%) Fl(n)--xs W(a)--xs">
        <p>What do you fancy? Floats? Flexbox? Inline-block? CSS table? [Atomic supports it all](/tutorials/grid-system.html#layouts), and you can use [any measurement style you want](/tutorials/grid-system.html#widths) (fraction, percentage, em, rem, px, etc.)</p>
    </div>
    <div class="Fl(start) W(60%) Cl(b) Fl(n)--xs W(a)--xs">
<pre><code class="lang-html"><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"Row"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"Fl(start) W(1/2) Bgc(#0280ae.5) H(90px)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"Fl(start) W(1/2) Bgc(#0280ae) H(90px)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"D(tb) W(100%)"</span> <span class="hljs-attribute">role</span>=<span class="hljs-value">"presentation"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">" D(tbc) Bgc(#0280ae) H(90px)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">" D(tbc) Bgc(#0280ae.5) H(90px)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"IbBox W(50%) Bgc(#0280ae.5) H(90px)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span><span class="hljs-comment">&lt;!--
--&gt;</span><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"IbBox W(50%) Bgc(#0280ae) H(90px)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"D(f)"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">" Flxg(1) Bgc(#0280ae) H(90px)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">" Flxg(1) Bgc(#0280ae.5) H(90px)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>
</code></pre>
<p class="noteBox info"><abbr title="Accessibility">A11Y</abbr> tip: Use `role="presentation"` on &quot;CSS tables&quot; to prevent their semantics from being mapped to the accessibility API.</p>
    </div>
    <div class="Fl(end) W(30%) My(1em) Fl(n)--xs W(a)--xs">
        <div class="Row">
            <div class="Fl(start) W(1/2) Bgc(#0280ae.5) H(90px)"></div>
            <div class="Fl(start) W(1/2) Bgc(#0280ae) H(90px)"></div>
        </div>
        <div class="D(tb) W(100%)" role="presentation">
            <div class=" D(tbc) Bgc(#0280ae) H(90px)"></div>
            <div class=" D(tbc) Bgc(#0280ae.5) H(90px)"></div>
        </div>
        <div class="IbBox W(50%) Bgc(#0280ae.5) H(90px)"></div><!--
     --><div class="IbBox W(50%) Bgc(#0280ae) H(90px)"></div>
        <div class="D(f)">
            <div class=" Flxg(1) Bgc(#0280ae) H(90px)"></div>
            <div class=" Flxg(1) Bgc(#0280ae.5) H(90px)"></div>
        </div>
    </div>
</div>

## Responsive Web Design (RWD)

### Classes mapped to a single breakpoint

<div class="Row">
    <div class="Fl(start) W(60%) Fl(n)--xs W(a)--xs">
        <p>Define your responsive "breakpoints" in configuration using standard media query syntax.  Then, reference your breakpoints in your classnames using a double-dash suffix (eg, `--sm`).</p>
        <p>In this example, the 4 boxes are styled as `inline-block`, with a `width` of `25%` when the viewport is more than `700px` wide.</p>
    </div>
    <div class="Fl(start) W(60%) Cl(b) Fl(n)--xs W(a)--xs">
<pre><code class="lang-javascript"><span class="hljs-string">'breakPoints'</span>: {
    <span class="hljs-string">'sm'</span>: <span class="hljs-string">'@media screen and (min-width:700px)'</span>
}
</code></pre>
<pre><code class="lang-html">   <span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"Bgc(#0280ae.5) H(90px) D(ib)--sm W(25%)--sm"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span><span class="hljs-comment">&lt;!--
--&gt;</span><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"Bgc(#0280ae) H(90px) D(ib)--sm W(25%)--sm"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span><span class="hljs-comment">&lt;!--
--&gt;</span><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"Bgc(#0280ae.5) H(90px) D(ib)--sm W(25%)--sm"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span><span class="hljs-comment">&lt;!--
--&gt;</span><span class="hljs-tag">&lt;<span class="hljs-title">div</span> <span class="hljs-attribute">class</span>=<span class="hljs-value">"Bgc(#0280ae) H(90px) D(ib)--sm W(25%)--sm"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">div</span>&gt;</span>
</code></pre>
    </div>
    <div class="Fl(end) W(30%) My(1em) Fl(n)--xs W(a)--xs">
        <div class="Bgc(#0280ae.5) H(90px) D(ib)--sm W(25%)--sm"></div><!--
        --><div class="Bgc(#0280ae) H(90px) D(ib)--sm W(25%)--sm"></div><!--
        --><div class="Bgc(#0280ae.5) H(90px) D(ib)--sm W(25%)--sm"></div><!--
        --><div class="Bgc(#0280ae) H(90px) D(ib)--sm W(25%)--sm"></div>
    </div>
</div>

<p class="Cl(b) W(60%) Fl(n)--xs W(a)--xs Bxz(bb) noteBox info">Note that *any style* can be attached to a breakpoint (i.e. `C(#fff)--sm`).</p>

### Classes mapped to multiple breakpoints

<div class="Row">
    <div class="Fl(start) W(60%) Fl(n)--xs W(a)--xs">
        <p>Classes may have different values associated with different breakpoints; meaning the same class applies different styles depending on media queries.</p>
    </div>
    <div class="Fl(start) W(60%) Cl(b) Fl(n)--xs W(a)--xs">
<pre><code class="lang-html"><span class="hljs-string">'Fz(RWD-fontSize)'</span>: {
    <span class="hljs-string">'xs'</span>: <span class="hljs-string">'12px'</span>,
    <span class="hljs-string">'sm'</span>: <span class="hljs-string">'22px'</span>,
    <span class="hljs-string">'md'</span>: <span class="hljs-string">'32px'</span>,
    <span class="hljs-string">'lg'</span>: <span class="hljs-string">'42px'</span>
}</code></pre>
<pre><code class="lang-html"><span class="hljs-tag">&lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"Fz(RWD-fontSize)"</span>&gt;Responsive font-size&lt;/<span class="hljs-keyword">div</span>&gt;</span>
</code></pre>
    </div>
    <div class="Fl(end) W(30%) My(1em) Fl(n)--xs W(a)--xs">
        <div class="Fz(RWD-fontSize)">Responsive font-size</div>
    </div>
</div>

## Helpers

<div class="Row">
    <div class="Fl(start) W(60%) Fl(n)--xs W(a)--xs">
        <p>Atomizer offers a selection of [helper classes](/guides/helper-classes.html) for common styling, such "clearfix" to clear floats (`Cf`), `Bd` to help with [setting borders](guides/helper-classes.html#-bd-borders-), `Ell` to truncate text with ellipsis, `Hidden` to visually hide text, and more.</p>
        <p>For example `LineClamp()`, which takes two parameters:</p>
    </div>
    <div class="Fl(start) W(60%) Cl(b) Fl(n)--xs W(a)--xs">
<pre><code class="lang-html">&lt;p class="Fz(<span class="hljs-number">12</span>px) Lh(<span class="hljs-number">1</span>.<span class="hljs-number">5</span>) LineClamp(<span class="hljs-number">3</span>,<span class="hljs-number">54</span>px)"&gt;
    <span class="hljs-comment">Lorem ipsum dolor sit amet, id oratio graeco nostrum sit, latine eligendi scribentur mea ex. Tota dolorem voluptua eos at. Ei nec reque viderer facilis. Aliquip necessitatibus ex pri, pertinax atomorum ei sea. Ea omittam appetere posidonium per, te meliore volutpat duo, dolorem ponderum interpretaris sea ut.</span>
&lt;/p&gt;
</code></pre>
    </div>
    <div class="Fl(end) W(30%) My(1em) Fl(n)--xs W(a)--xs">
        <p class="Fz(12px) Lh(1.5) LineClamp(3,54px)">Lorem ipsum dolor sit amet, id oratio graeco nostrum sit, latine eligendi scribentur mea ex. Tota dolorem voluptua eos at. Ei nec reque viderer facilis. Aliquip necessitatibus ex pri, pertinax atomorum ei sea. Ea omittam appetere posidonium per, te meliore volutpat duo, dolorem ponderum interpretaris sea ut.</p>
    </div>
</div>

<hr>

<p class="Ta(c)"><a class="M(20px) D(ib) Py(10px) Px(20px) Fz(20px) C(#fff) Bgc(#0280ae.8) Bdrs(2px) Bxsh(light) Tsh(1) Fw(b) Td(n):h" href="quick-start.html">Get Started</a></p>
