---
description: Learn the Atomic CSS principles that Atomizer is built on.
layout: docs
section: docs
title: Thinking in Atomic
---

&quot;**Atomic CSS**&quot; is a [CSS architecture](http://www.smashingmagazine.com/2013/10/21/challenging-css-best-practices-atomic-approach/). It is not opinionated; it simply defines a set of classes representing single-purpose styling units.

<p class="noteBox info">Be sure to read an interview with Atomizer Co-Founder Thierry Koblentz, <a href="https://css-tricks.com/thierry-koblentz-atomic-css/">The Making of Atomic CSS</a> on CSS Tricks.</p>

**Atomizer** implements the a specific [syntax]({% link guides/syntax.md %}) to help you generate Atomic rulesets. It only creates a style sheet with declarations that are relevant to your project. These style declarations are generated from Atomizer classes found within your project, or from custom values defined in the Atomizer config file.

Adopting an Atomic CSS methodology addresses common CSS challenges:

<dl class="Mb(30px)">
    <dt class="Fs(i) C(--color-emphasis)">Changes are predictable</dt>
    <dd class="Mstart(20px) Mt(5px)">Because of the single responsibility principle (one class == one style) it is easy to predict what removing or adding a class will do.</dd>
    <dt class="Fs(i) C(#000)">Scope is limited</dt>
    <dd class="Mstart(20px) Mt(5px)">There is no reliance on descendant/contextual selectors &mdash; styling is done inside &quot;[specificity layers](#style-sheets-organization)&quot;.</dd>
    <dt class="Fs(i) C(#000)">CSS is lean</dt>
    <dd class="Mstart(20px) Mt(5px)">There is very little redundancy and no dead weight (all styles are relevant to the project).</dd>
    <dt class="Fs(i) C(#000)">Components are portable</dt>
    <dd class="Mstart(20px) Mt(5px)">Classes used to style a component are not specific to that component, hence components can live in any other project that uses Atomizer <sup><a href="#footnote" id="footnote-1">[1]</a></sup>.</dd>
    <dt class="Fs(i) C(#000)">Beginner-friendly</dt>
    <dd class="Mstart(20px) Mt(5px)">Writing efficient and correct selectors is often one of the hardest parts of CSS for new developers to master. With Atomic CSS, developers don&#39;t create bloat because they don&#39;t write the selectors, instead they mostly re-use existing classes. This can greatly simplify the learning curve for inexperienced developers.</dd>
</dl>

## Who&#39;s Atomic CSS for?

**Atomic CSS** is for developers who see the benefits of styling &quot;_outside of style sheets_&quot; &mdash; who want to write markup and styles in one place while benefiting from an Atomic architecture. It is a switch of priorities. You don&#39;t maintain style sheets but _components_.

## Be pragmatic

<b>ACSS</b> can live side-by-side with traditional style sheets. In cases where <b>ACSS</b> doesn&#39;t seem the most pragmatic, you can always supplement with inline styles or external stylesheets. Use the right tool for the job.

Traditional style sheets may be helpful for styles that <b>ACSS</b> cannot create, styles for elements that aren&#39;t under your application&#39;s control, or repeating elements that are not componentized <sup>[[2]](#footnote)<a id="footnote-2" class="D(ib)"></a></sup>.

## Grids

There is no such thing as a &quot;Grid&quot; in <b>ACSS</b>. <b>ACSS</b> does not provide classes to create columns based on an opinionated construct (<code>float</code>, <code>inline-block</code>, etc.) Instead, <b>ACSS</b> gives you all the tools you need to create [any grid you want]({% link tutorials/layout.md %}).

## Specificity

### From `0,0,1,0` to &quot;_infinity_&quot;

By nature, <b>ACSS</b> classes have very low specificity (`0,0,1,0`). Atomizer creates a style sheet in which the specificity of every rule can be increased by the use of a _namespace_. The best practice is to keep specificity as low as possible, but depending on other rules in your project, you may want to include a namespace to increase the weight of <b>ACSS</b> classes.

Remember that the weight of rules is _not as important as_ making sure specificity is homogeneous across rules. For example, styles like these:

```css
#namespace .myBox {}           /* 0,1,1,0 */
#namespace .menu_item {}       /* 0,1,1,0 */
#namespace .list_active {}     /* 0,1,1,0 */
#namespace .article_summary {} /* 0,1,1,0 */
#namespace .nav_link {}        /* 0,1,1,0 */
```

Are easier to maintain than styles like these:

```css
.myBox {}                      /* 0,0,1,0 */
.menu .menu_item {}            /* 0,0,2,0 */
ul.list .active {}             /* 0,0,2,1 */
.main .article .summary {}     /* 0,0,3,0 */
.nav .list .item a {}          /* 0,0,3,1 */
```

Choosing to include a namespace or not; and to use a _class_ or an _id_ for the namespace; depends on the weight of rules in other style sheets. For atomic classes to be relevant they must have enough weight to overwrite non-atomic styles. The specificity may be the same as non-atomic styles as long as the atomic style sheet is included **after** other style sheets.

This table suggests the namespace to use depending on the weight of your other rules ([Specificity Calculator](http://specificity.keegan.st/)).

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
                <td class="Va(t) P(10px)">Use whatever it takes <sup><a href="#footnote">[3]</a><a id="footnote-3" class="D(ib)"></a></sup></td>
            </tr>
    </tbody>
</table>

<p class="noteBox info">You can set up a namespace in <a href="https://github.com/acss-io/grunt-atomizer#examples">grunt-atomizer</a> or via the <a href="{% link installation.md %}#atomizer-cli">Atomizer command line</a>.</p>

### Style sheets organization

Take advantage of the _cascade_ by creating &quot;specificity layers&quot; <sup>[[4]](#footnote)<a id="footnote-4" class="D(ib)"></a></sup> and loading files in proper order.

<table class="Ta(start) Tbl(f) W(100%)">
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
            <th scope="row" class="Va(t) Whs(pl) P(10px)">type selectors</th>
            <td class="Va(t) P(10px)"><code>0,0,0,x</code></td>
            <td class="Va(t) P(10px)">normalize.css,<br> base.css,<br> etc.</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(pl) P(10px)">single class</th>
            <td class="Va(t) P(10px)"><code>0,0,1,0</code></td>
            <td class="Va(t) P(10px)">helpers.css,<br> utility.css,<br> etc.</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(pl) P(10px)">contextual selectors<br> (any number of classes)</th>
            <td class="Va(t) P(10px)"><code>0,0,x,x</code></td>
            <td class="Va(t) P(10px)">layout.css,<br> custom.css,<br> etc.</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(pl) P(10px)">Atomizer classes</th>
            <td class="Va(t) P(10px)"><code>0,1,1,0</code></td>
            <td class="Va(t) P(10px)">atomic.css</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(pl) P(10px)"><code>@style</code></th>
            <td class="Va(t) P(10px)"><code>1,0,0,0</code></td>
            <td class="Va(t) P(10px)">Inline Styles</td>
        </tr>
        <tr class="BdT Bdc(#0280ae.3)">
            <th scope="row" class="Va(t) Whs(pl) P(10px)"><code>!important</code> rule</th>
            <td class="Va(t) P(10px)">Trumps all the above <sup><a href="#footnote">[5]</a><a id="footnote-5" class="D(ib)"></a></sup></td>
            <td class="Va(t) P(10px)">Can be anywhere<br> (as an exception)</td>
        </tr>
    </tbody>
</table>

<p class="noteBox info">This web site uses *flat selectors* (<code>0,0,1,0</code>) which allows us to follow the same logic as above without the need for a namespace.</p>

---

<div id="footnote"></div>

1. Unless that component relies on custom values from the config file - in which case, keys from that file would need to be added to the config of the other project <sub>[[↩]](#footnote-1)</sub>.
1. An example of this could be the markup of a &quot;button&quot; that could appear in many places across a project (versus a unique &quot;component&quot; _included_ in multiple places) <sub>[[↩]](#footnote-2)</sub>.
1. The namespace can be anything, for example: `#someId #anotherId .andAclass` <sub>[[↩]](#footnote-3)</sub>.
1. Specificity is something we want to leverage, not something we want to keep a lid on <sub>[[↩]](#footnote-4)</sub>.
1. `!important` is not related to specificity per se <sub>[[↩]](#footnote-5)</sub>.
