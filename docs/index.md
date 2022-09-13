---
section: home
layout: home
---

<div class="D(f)--lg Jc(sb) Gp(2rem)">
    <div>
        <h2 class="Fz(24px) My(0) Mt(2em)--lg Mb(1em)--lg">Meet Atomizer!</h2>
        <p>
            Atomizer generates a simple static CSS stylesheet from the Atomizer classes you define in your project or predeclared configured styles - it&#39;s up to you.
        </p>
        <p>Atomizer is not opinionated, brings no CSS of its own and integrates nicely with your favorite task runner.</p>
    </div>
    <img src="/images/atomic-demo.gif" class="Ar(174/83) W(70%)--md" alt="Atomizer demo">
</div>

<h2 class="Fz(1.75rem)--md Mt(5em)--md Mb(0px)">Testimonials</h2>

<div id="testimonials" class="Pos(r)">
    <ul class="Ovx(s) Ai(s) D(f)--md List(n)! Pstart(0)! Gp(2rem) H(400px)--xs Ov(h)--xs expand_H(a)">
        {% for data in site.data.quotes %}
            <li class="Pos(r) Fxb(25%) Fxs(0) Mx(0px) Mb(20px) Mb(0px)--md P(1rem) Bdrs(5px) Bgc(--ui-box-light)">
                <figure class="M(0px)">
                    <blockquote class="Bdstartw(0px) M(0px) P(0px) Fs(n)">
                        <p class="Mt(0px) Fz(16px)">{{ data.quote }}</p>
                    </blockquote>
                    <figcaption class="D(f) Ai(c) Gp(1rem)">
                        {% if data.companyLogo %}
                            {{ data.companyLogo }}
                        {% endif %}
                        <p class="M(0)">
                            <a href="{{ data.link }}" class="D(b) Fw(b) C(--color-text) Td(n):h" target="_blank">
                                {{ data.author }}
                                <u class="StretchedBox"></u>
                            </a>
                            {{ data.role }}
                        </p>
                    </figcaption>
                </figure>
            </li>
        {% endfor %}
    </ul>
    <div class="D(b) D(n)--sm Pos(a) B(0px) expand_B(-40px) Py(10px) Bxs(bd) W(100%) Mx(a) Ta(c) Bgi(--gradient-1)">
        <button id="toggleTestButton" class="Bgc(--color-blue-1) C(#fff) Bdrs(10px) Bd(n) Px(15px) Py(10px) Cur(p) Fz(14px)">Expand...</button>
    </div>
</div>

<h2 id="colors" class="Fz(1.75rem)--md Mt(5em)--md Mb(0px)">Colors</h2>

<div class="Row">
    <div class="Fl(start) W(60%) Fl(n)--xs W(a)--xs">
        Colors are set using hexadecimal values.
    </div>
    <div class="Fl(start) W(60%) Cl(b) Fl(n)--xs W(a)--xs">
{% highlight html %}
<div class="Bgc(#0280ae) C(#fff)">
    Lorem ipsum
</div>
{% endhighlight %}
    </div>
    <div class="Fl(end) W(30%) My(1em) Fl(n)--xs W(a)--xs">
        <div class="Bgc(--color-blue-1) C(#fff) P(20px)">
            Lorem ipsum
        </div>
    </div>
    <div class="Fl(start) W(60%) Fl(n)--xs W(a)--xs">
        Alpha transparency is created by appending the opacity value to the <code>hex</code> color.
    </div>
    <div class="Fl(start) W(60%) Cl(b) Fl(n)--xs W(a)--xs">
{% highlight html %}
<div class="Bgc(#0280ae.5) C(#fff)">
    Lorem ipsum
</div>
{% endhighlight %}
    </div>
    <div class="Fl(end) W(30%) My(1em) Fl(n)--xs W(a)--xs">
        <div class="Bgc(--color-blue-4) C(#fff) P(20px)">
            Lorem ipsum
        </div>
    </div>
</div>

<h2 id="variables" class="Fz(1.75rem)--md Mt(5em)--md Mb(0px)">Variables</h2>

<div class="Row">
    <div class="Fl(start) W(60%) Fl(n)--xs W(a)--xs">
        <p><a href="{% link guides/syntax.md %}#variable-values">Variables</a> are useful for theming but they can also be used to share a common value across style declarations. In this example, <code>brandColor</code> is responsible for setting the text color, background color and border color, while <code>columnWidth</code> dictates the width of the first box and the left offset of its sibling.</p>
    </div>
    <div class="Fl(start) W(60%) Cl(b) Fl(n)--xs W(a)--xs">
{% highlight js %}
module.exports = {
    custom: {
        brandColor: '#0280ae',
        columnWidth: '20px',
    },
};
{% endhighlight %}
{% highlight html %}
<div class="Pos(a) Bgc(brandColor) W(columnWidth) H(90px)"></div>
<div class="C(brandColor) BdB Bdc(brandColor) Mstart(columnWidth) P(10px)">
    Lorem ipsum
</div>
{% endhighlight %}
    <p><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties">CSS custom properties</a> (variables) can also be referenced as class values. Note that values are not managed by Atomizer, and must be defined independently.</p>
{% highlight css %}
/* external style sheet */
:root {
    --primary-color: #400090
}
{% endhighlight %}
{% highlight html %}
<div class="C(--primary-color)">Hello World</div>
{% endhighlight %}
        <a href="{% link configuration.md %}#custom" class="D(ib) Mt(10px) Py(10px) Px(20px) Fz(14px) C(#fff) Bgc(--color-blue-1) Bdrs(10px) Bxsh(--shadow-1) Tsh(--shadow-2) Fw(b) Td(n):h">Read more &raquo;</a>
    </div>
    <div class="Fl(end) W(30%) My(1em) Fl(n)--xs W(a)--xs">
        <div class="Pos(a) Bgc(--color-blue-1) W(columnWidth) H(90px)"></div>
        <div class="C(--color-blue-1) BdB Bdc(--color-blue-1) Mstart(columnWidth) P(10px)">
            Lorem ipsum
        </div>
    </div>

</div>

<h2 id="contextual-selectors" class="Fz(1.75rem)--md Mt(5em)--md Mb(0px)">Contextual selectors</h2>

<div class="Row">
    <div class="Fl(start) W(60%) Fl(n)--xs W(a)--xs">
        <p>Atomizer syntax allows you to style elements <a href="{% link guides/syntax.md %}#combinator">depending on their ancestors or siblings</a>.</p>
        <p>In this example, two identical sets of boxes are styled differently depending on the class applied to their parent element.</p>
    </div>
    <div class="Fl(start) W(60%) Cl(b) Fl(n)--xs W(a)--xs">
{% highlight html %}
<div>
   <div class="foo_W(100%)"></div>
   <div class="foo_W(100%)"></div>
</div>
<hr>
<div class="foo">
   <div class="foo_W(100%)"></div>
   <div class="foo_W(100%)"></div>
</div>
{% endhighlight %}
    </div>
    <div class="Fl(end) W(30%) My(1em) Fl(n)--xs W(a)--xs">
        <div>
            <div class="Bgc(--color-blue-4) H(90px) IbBox W(50%) foo_W(100%)"></div><!--
         --><div class="Bgc(--color-blue-1) H(90px) IbBox W(50%) foo_W(100%)"></div>
        </div>
        <hr>
        <div class="foo">
            <div class="Bgc(--color-blue-4) H(90px) IbBox W(50%) foo_W(100%)"></div><!--
         --><div class="Bgc(--color-blue-1) H(90px) IbBox W(50%) foo_W(100%)"></div>
        </div>
    </div>
</div>

<h2 id="pseudo-classes" class="Fz(1.75rem)--md Mt(5em)--md Mb(0px)">Pseudo-classes</h2>

<div class="Row">
    <div class="Fl(start) W(60%) Fl(n)--xs W(a)--xs">
        <p>Create styles that rely on <a href="{% link guides/syntax.md %}#pseudo-class">pseudo-classes</a>.</p>
        <p>In this example, the foreground and background color change when users hover over the box.</p>
    </div>
    <div class="Fl(start) W(60%) Cl(b) Fl(n)--xs W(a)--xs">
{% highlight html %}
<div class="Bgc(#0280ae):h C(#0280ae) C(#fff):h">
    Lorem ipsum
</div>
{% endhighlight %}
    </div>
    <div class="Fl(end) W(30%) My(1em) Fl(n)--xs W(a)--xs">
        <div class="Bd Bgc(--color-blue-1):h C(--color-blue-1) C(#fff):h P(20px)">
            Lorem ipsum
        </div>
    </div>
    <p class="Cl(b) W(60%) Fl(n)--xs W(a)--xs">You can also combine descendant selectors with pseudo-classes. In this example, the nested box is revealed when a user hovers over <strong>its parent</strong>:</p>
        <div class="Fl(start) W(60%) Cl(b) Fl(n)--xs W(a)--xs">
{% highlight html %}
<div class="foo">
    <p class="Op(0) foo:h>Op(1)">Lorem ipsum</p>
</div>
{% endhighlight %}
        </div>
        <div class="Fl(end) W(30%) My(1em) Fl(n)--xs W(a)--xs">
            <div class="foo Bd C(--color-blue-1) Ta(c)">
                <p class="Op(0) foo:h>Op(1)">Lorem ipsum</p>
            </div>
        </div>
</div>

<h2 id="grids" class="Fz(1.75rem)--md Mt(5em)--md Mb(0px)">Grids</h2>

<div class="Row">
    <div class="Fl(start) W(60%) Fl(n)--xs W(a)--xs">
        <p>What do you prefer? Floats? Flexbox? Inline-block? CSS table? <a href="{% link tutorials/layout.md %}#layouts">Atomizer supports it all</a>.</p>
    </div>
    <div class="Fl(start) W(60%) Cl(b) Fl(n)--xs W(a)--xs">
{% highlight html %}
<!-- floats -->
<div class="Row">
    <div class="Fl(start) W(1/2)"></div>
    <div class="Fl(start) W(1/2)"></div>
</div>
<!-- table -->
<div class="D(tb) W(100%)" role="presentation">
    <div class="D(tbc)"></div>
    <div class="D(tbc)"></div>
</div>
<!-- flexbox -->
<div class="D(f)">
    <div class="Flxg(1)"></div>
    <div class="Flxg(1)"></div>
</div>
<!-- grids -->
<div class="D(g) Gtc(twoColEvenGrid)">
    <div></div>
    <div></div>
</div>
{% endhighlight %}
    </div>
    <div class="Fl(end) W(30%) My(1em) Fl(n)--xs W(a)--xs">
        <div class="Row">
            <div class="Fl(start) W(1/2) Bgc(--color-blue-4) H(90px)"></div>
            <div class="Fl(start) W(1/2) Bgc(--color-blue-1) H(90px)"></div>
        </div>
        <div class="D(tb) W(100%)" role="presentation">
            <div class="D(tbc) Bgc(--color-blue-1) H(90px)"></div>
            <div class="D(tbc) Bgc(--color-blue-4) H(90px)"></div>
        </div>
        <div class="D(f)">
            <div class="Flxg(1) Bgc(--color-blue-4) H(90px)"></div>
            <div class="Flxg(1) Bgc(--color-blue-1) H(90px)"></div>
        </div>
        <div class="D(g) Gtc(twoColEvenGrid)">
            <div class="Bgc(--color-blue-1) H(90px)"></div>
            <div class="Bgc(--color-blue-4) H(90px)"></div>
        </div>
    </div>
</div>

<h2 id="responsive-web-design-rwd-" class="Fz(1.75rem)--md Mt(5em)--md Mb(0px)">Responsive Web Design (RWD)</h2>

<div class="Row">
    <div class="Fl(start) W(60%) Fl(n)--xs W(a)--xs">
        <p>Define your responsive <a href="{% link breakpoints.md %}">breakpoints</a> in configuration using standard media query syntax. Then, reference those breakpoints in your Atomizer classes or configuration.</p>
        <h3>Classes mapped to a single breakpoint</h3>
        <p>Reference your breakpoints in your classnames using a double-dash suffix (eg, <code>--sm</code>).</p>
        <p>In this example, the four boxes are styled as <code>inline-block</code>, with a <code>width</code> of <code>25%</code> when the viewport is more than <code>700px</code> wide.</p>
    </div>
    <div class="Fl(start) W(60%) Cl(b) Fl(n)--xs W(a)--xs">
{% highlight js %}
module.exports = {
    custom: {
        breakPoints: {
            sm: '@media screen and (min-width:700px)',
        },
    },
};
{% endhighlight %}
{% highlight html %}
<div class="D(ib)--sm W(25%)--sm"></div>
<div class="D(ib)--sm W(25%)--sm"></div>
<div class="D(ib)--sm W(25%)--sm"></div>
<div class="D(ib)--sm W(25%)--sm"></div>
{% endhighlight %}
    </div>
    <div class="Fl(end) W(30%) My(1em) Fl(n)--xs W(a)--xs">
        <div class="Bgc(--color-blue-4) H(90px) D(ib)--sm W(25%)--sm"></div><div class="Bgc(--color-blue-1) H(90px) D(ib)--sm W(25%)--sm"></div><div class="Bgc(--color-blue-4) H(90px) D(ib)--sm W(25%)--sm"></div><div class="Bgc(--color-blue-1) H(90px) D(ib)--sm W(25%)--sm"></div>
    </div>
</div>

<div class="Row">
    <div class="Fl(start) W(60%) Fl(n)--xs W(a)--xs">
        <h3>Classes mapped to multiple breakpoints</h3>
        <p>Classes may have different values associated with different breakpoints; meaning the same class applies different styles depending on media queries.</p>
    </div>
    <div class="Fl(start) W(60%) Cl(b) Fl(n)--xs W(a)--xs">
{% highlight js %}
module.exports = {
    custom: {
        rwdFontSize: {
            xs: '12px',
            sm: '22px',
            md: '32px',
            lg: '42px',
        },
    },
};
{% endhighlight %}
{% highlight html %}
<div class="Fz(rwdFontSize)">Responsive font-size</div>
{% endhighlight %}
    </div>
    <div class="Fl(end) W(30%) My(1em) Fl(n)--xs W(a)--xs">
        <div class="Fz(rwdFontSize)">Responsive font-size</div>
    </div>
</div>

<h2 id="helpers" class="Fz(1.75rem)--md Mt(5em)--md Mb(0px)">Helpers</h2>

<div class="Row">
    <div class="Fl(start) W(60%) Fl(n)--xs W(a)--xs">
        <p>Atomizer offers a selection of <a href="{% link guides/helper-classes.md %}">helper classes</a> for common styling, such as &quot;clearfix&quot; to clear floats (<code>Cf</code>), <code>Bd</code> to help with <a href="{% link guides/helper-classes.md %}#bd-borders">setting borders</a>, <code>Ell</code> to truncate text with ellipsis, <code>Hidden</code> to visually hide text, and more.</p>
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

<div class="D(f)--md Ac(sb) Mt(1rem)--sm Mb(2rem)--sm">
    {% include menu.html showSearch=false showCommunity=true %}
</div>
