---
section: home
layout: home
---

<div class="Bxz(bb) D(ib) Va(t) W(100%) Pend(30px)--sm W(49%)--sm">
    <h2 class="Bdw(0)! P(0) M(0) Ta(c)">CSS is painful</h2>
    <p>CSS is a critical piece of the frontend toolkit, but it&#39;s hard to manage, especially in large projects. Styles are written in a global scope, which is narrowed through complex selectors. Specificity issues, redundancy, bloat, and maintenance can become a nightmare. And modular, component-based projects only add to the complexity. <b class="Fw(b)">Atomizer</b> enables you to style directly in your components, avoiding the headache of <i class="Fs(i)">writing</i> and <i class="Fs(i)">managing</i> stylesheets.</p>
</div>

<div class="Bxz(bb) D(ib) Va(t) W(100%) Pend(30px)--sm W(49%)--sm">
    <h2 class="Bdw(0)! P(0) M(0) Ta(c)">Style with class</h2>
    <p>Most approaches to styling inside components rely on inline styles, which are limiting. Atomic CSS, like inline styles, offers single-purpose units of style, but applied via <em>classes</em>. This allows for the use of handy things such as media queries, contextual styling and pseudo-classes. The lower specificity of classes also allows for easier overrides. And the short, predictable classnames are highly reusable and compress well.</p>
</div>

<div class="Mx(a) Mt(10px) Bxz(bb) Va(t) W(100%) W(65%)--sm">
    <h2 class="Bdw(0)! P(0) M(0) Ta(c)">Meet Atomizer</h2>
    <p>Atomizer is a utility for modern web sites. Atomizer generates an Atomic stylesheet from the <b class="Fw(b)">ACSS</b> classes you&#39;re actually using in your project (no unused styles!), or predeclare styles in configuration - it&#39;s up to you. <b class="Fw(b)">Atomizer</b> is not opinionated, brings no CSS of its own, and integrates nicely with your favorite task runner.</p>
</div>

<h2 id="colors">Colors</h2>

<div class="Row">
    <div class="Fl(start) W(60%) Fl(n)--xs W(a)--xs">
        Colors are set using hexadecimal values. Alpha transparency is created by appending the opacity value to the <code>hex</code> color.
    </div>
    <div class="Fl(start) W(60%) Cl(b) Fl(n)--xs W(a)--xs">
{% highlight html %}
<div class="Bgc(#0280ae.5) C(#fff) P(20px)">
    Lorem ipsum
</div>
{% endhighlight %}
    </div>
    <div class="Fl(end) W(30%) My(1em) Fl(n)--xs W(a)--xs">
        <div class="Bgc(#0280ae.5) C(#fff) P(20px)">
            Lorem ipsum
        </div>
    </div>
</div>

<h2 id="variables">Variables</h2>

<div class="Row">
    <div class="Fl(start) W(60%) Fl(n)--xs W(a)--xs">
        <p>&quot;<a href="/guides/syntax.html#variable-values">Variables</a>&quot; are useful for theming but they can also be used to share a common value across style declarations.</p>
        <p>In this example, <code>brandColor</code> is responsible for setting the text color, background color and border color, while <code>columnWidth</code> dictates the width of the first box and the left offset of its sibling.</p>
    </div>
    <div class="Fl(start) W(60%) Cl(b) Fl(n)--xs W(a)--xs">
{% highlight js %}
// config object
'custom': {
    'brandColor': '#0280ae',
    'columnWidth': '20px'
}
{% endhighlight %}

{% highlight html %}
<div class="Pos(a) Bgc(brandColor) W(columnWidth) H(90px)"></div>
<div class="C(brandColor) BdB Bdc(brandColor) Mstart(columnWidth) P(10px)">
     Lorem ipsum
</div>
{% endhighlight %}
    </div>
    <div class="Fl(end) W(30%) My(1em) Fl(n)--xs W(a)--xs">
        <div class="Pos(a) Bgc(brandColor) W(columnWidth) H(90px)"></div>
        <div class="C(brandColor) BdB Bdc(brandColor) Mstart(columnWidth) P(10px)">
            Lorem ipsum
        </div>
    </div>
</div>

<h2 id="contextual-selectors">Contextual selectors</h2>

<div class="Row">
    <div class="Fl(start) W(60%) Fl(n)--xs W(a)--xs">
        <p>Atomizer syntax allows you to style elements <a href="/guides/atomic-classes.html#descendant-selectors">depending on their ancestors or siblings</a>.</p>
        <p>In this example, two identical sets of boxes are styled differently depending on the class applied to their parent element.</p>
    </div>
    <div class="Fl(start) W(60%) Cl(b) Fl(n)--xs W(a)--xs">
{% highlight html %}
<div>
   <div class="Bgc(#0280ae.5) H(90px) IbBox W(50%) foo_W(100%)"></div>
   <div class="Bgc(#0280ae) H(90px) IbBox W(50%) foo_W(100%)"></div>
</div>
<hr>
<div class="foo">
   <div class="Bgc(#0280ae.5) H(90px) IbBox W(50%) foo_W(100%)"></div>
   <div class="Bgc(#0280ae) H(90px) IbBox W(50%) foo_W(100%)"></div>
</div>
{% endhighlight %}
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

<h2 id="pseudo-classes">Pseudo-classes</h2>

<div class="Row">
    <div class="Fl(start) W(60%) Fl(n)--xs W(a)--xs">
        <p>Create styles that rely on <a href="/guides/syntax.html#pseudo-class-">pseudo-classes</a>.</p>
        <p>In this example, the foreground and background color change when users hover over the box.</p>
    </div>
    <div class="Fl(start) W(60%) Cl(b) Fl(n)--xs W(a)--xs">
{% highlight html %}
<div class="Bd Bgc(#0280ae):h C(#0280ae) C(#fff):h P(20px)">
    Lorem ipsum
</div>
{% endhighlight %}
    </div>
    <div class="Fl(end) W(30%) My(1em) Fl(n)--xs W(a)--xs">
        <div class="Bd Bgc(#0280ae):h C(#0280ae) C(#fff):h P(20px)">
            Lorem ipsum
        </div>
    </div>
    <p class="Cl(b) W(60%) Fl(n)--xs W(a)--xs">You can also combine descendant selectors with pseudo-classes. In this example, the nested box is revealed when a user hovers over <strong>its parent</strong>:</p>
        <div class="Fl(start) W(60%) Cl(b) Fl(n)--xs W(a)--xs">
{% highlight html %}
<div class="foo Bd C(#0280ae) Ta(c)">
    <p class="Op(0) foo:h>Op(1)">Lorem ipsum</p>
</div>
{% endhighlight %}
        </div>
        <div class="Fl(end) W(30%) My(1em) Fl(n)--xs W(a)--xs">
            <div class="foo Bd C(#0280ae) Ta(c)">
                <p class="Op(0) foo:h>Op(1)">Lorem ipsum</p>
            </div>
        </div>
</div>

<h2 id="grids">Grids</h2>

<div class="Row">
    <div class="Fl(start) W(60%) Fl(n)--xs W(a)--xs">
        <p>What do you prefer? Floats? Flexbox? Inline-block? CSS table? <a href="/tutorials/grid-system.html#layouts">Atomizer supports it all</a>, and you can use <a href="/tutorials/grid-system.html#widths">any measurement style you want</a> (fraction, percentage, em, rem, px, etc.)</p>
    </div>
    <div class="Fl(start) W(60%) Cl(b) Fl(n)--xs W(a)--xs">
{% highlight html %}
<div class="Row">
    <div class="Fl(start) W(1/2) Bgc(#0280ae.5) H(90px)"></div>
    <div class="Fl(start) W(1/2) Bgc(#0280ae) H(90px)"></div>
</div>
<div class="D(tb) W(100%)" role="presentation">
    <div class="D(tbc) Bgc(#0280ae) H(90px)"></div>
    <div class="D(tbc) Bgc(#0280ae.5) H(90px)"></div>
</div>
   <div class="IbBox W(50%) Bgc(#0280ae.5) H(90px)"></div>
   <div class="IbBox W(50%) Bgc(#0280ae) H(90px)"></div>
<div class="D(f)">
    <div class="Flxg(1) Bgc(#0280ae) H(90px)"></div>
    <div class="Flxg(1) Bgc(#0280ae.5) H(90px)"></div>
</div>
{% endhighlight %}
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

<h2 id="responsive-web-design-rwd-">Responsive Web Design (RWD)</h2>

<div class="Row">
    <div class="Fl(start) W(60%) Fl(n)--xs W(a)--xs">
        <p>Define your responsive &quot;breakpoints&quot; in configuration using standard media query syntax. Then, reference those breakpoints in your Atomizer classes or configuration.</p>

        <h3>Classes mapped to a single breakpoint</h3>

        <p>Reference your breakpoints in your classnames using a double-dash suffix (eg, <code>--sm</code>).</p>

        <p>In this example, the four boxes are styled as <code>inline-block</code>, with a <code>width</code> of <code>25%</code> when the viewport is more than <code>700px</code> wide.</p>
    </div>
    <div class="Fl(start) W(60%) Cl(b) Fl(n)--xs W(a)--xs">
{% highlight js %}
'breakPoints': {
    'sm': '@media screen and (min-width:700px)'
}
{% endhighlight %}

{% highlight html %}
   <div class="Bgc(#0280ae.5) H(90px) D(ib)--sm W(25%)--sm"></div>
   <div class="Bgc(#0280ae) H(90px) D(ib)--sm W(25%)--sm"></div>
   <div class="Bgc(#0280ae.5) H(90px) D(ib)--sm W(25%)--sm"></div>
   <div class="Bgc(#0280ae) H(90px) D(ib)--sm W(25%)--sm"></div>
{% endhighlight %}
    </div>
    <div class="Fl(end) W(30%) My(1em) Fl(n)--xs W(a)--xs">
        <div class="Bgc(#0280ae.5) H(90px) D(ib)--sm W(25%)--sm"></div><div class="Bgc(#0280ae) H(90px) D(ib)--sm W(25%)--sm"></div><div class="Bgc(#0280ae.5) H(90px) D(ib)--sm W(25%)--sm"></div><div class="Bgc(#0280ae) H(90px) D(ib)--sm W(25%)--sm"></div>
    </div>
</div>

<div class="Row">
    <div class="Fl(start) W(60%) Fl(n)--xs W(a)--xs">

        <h3>Classes mapped to multiple breakpoints</h3>

        <p>Classes may have different values associated with different breakpoints; meaning the same class applies different styles depending on media queries.</p>
    </div>
    <div class="Fl(start) W(60%) Cl(b) Fl(n)--xs W(a)--xs">
{% highlight js %}
'RWD-fontSize': {
    'xs': '12px',
    'sm': '22px',
    'md': '32px',
    'lg': '42px'
}
{% endhighlight %}
{% highlight html %}
<div class="Fz(RWD-fontSize)">Responsive font-size</div>
{% endhighlight %}
    </div>
    <div class="Fl(end) W(30%) My(1em) Fl(n)--xs W(a)--xs">
        <div class="Fz(RWD-fontSize)">Responsive font-size</div>
    </div>
</div>

<h2 id="helpers">Helpers</h2>

<div class="Row">
    <div class="Fl(start) W(60%) Fl(n)--xs W(a)--xs">
        <p>Atomizer offers a selection of <a href="/guides/helper-classes.html">helper classes</a> for common styling, such as &quot;clearfix&quot; to clear floats (<code>Cf</code>), <code>Bd</code> to help with <a href="guides/helper-classes.html#-bd-borders-">setting borders</a>, <code>Ell</code> to truncate text with ellipsis, <code>Hidden</code> to visually hide text, and more.</p>
        <p>For example <code>LineClamp()</code>, which takes two parameters:</p>
    </div>
    <div class="Fl(start) W(60%) Cl(b) Fl(n)--xs W(a)--xs">
{% highlight html %}
<p class="Fz(12px) Lh(1.5) LineClamp(3,54px)">
    Lorem ipsum dolor sit amet, id oratio graeco nostrum sit, latine eligendi scribentur mea ex. Tota dolorem voluptua eos at. Ei nec reque viderer facilis. Aliquip necessitatibus ex pri, pertinax atomorum ei sea. Ea omittam appetere posidonium per, te meliore volutpat duo, dolorem ponderum interpretaris sea ut.
</p>
{% endhighlight %}
    </div>
    <div class="Fl(end) W(30%) My(1em) Fl(n)--xs W(a)--xs">
        <p class="Fz(12px) Lh(1.5) LineClamp(3,54px)">Lorem ipsum dolor sit amet, id oratio graeco nostrum sit, latine eligendi scribentur mea ex. Tota dolorem voluptua eos at. Ei nec reque viderer facilis. Aliquip necessitatibus ex pri, pertinax atomorum ei sea. Ea omittam appetere posidonium per, te meliore volutpat duo, dolorem ponderum interpretaris sea ut.</p>
    </div>
</div>

<hr>

<p class="Ta(c)"><a class="M(20px) D(ib) Py(10px) Px(20px) Fz(20px) C(#fff) Bgc(#0280ae.8) Bdrs(2px) Bxsh(light) Tsh(1) Fw(b) Td(n):h" href="quick-start.html">Get Started</a></p>
