---
section: docs
layout: docs
title: Responsive Web Design
---

<p>You can define your breakpoints as media queries in the config object and then apply those breakpoints to your <b class="Fw(b)">ACSS</b> classes through <a href="/guides/syntax.html#-lt-breakpoint_identifier-">the breakpoint suffix</a> or automatic breakpoints.</p>

{% include subhead.html tag="h2" title="Setting up Breakpoints" %}

<p>Pick the breakpoint names and media queries you want, for example:</p>

{% highlight js %}
'breakPoints': {
    'sm': '@media screen and (min-width: 380px)',
    'md': '@media screen and (min-width: 600px)',
    'lg': '@media screen and (min-width: 900px)'
}
{% endhighlight %}

<p>Breakpoints may be named anything you want, as long as the characters are valid for use in  classnames.</p>

{% include subhead.html tag="h2" title="Usage" %}

<p>There are two ways to make use of breakpoints in your <b class="Fw(b)">ACSS</b> classes: explicitly and automatically.</p>

{% include subhead.html tag="h3" title="Explicit Breakpoints" %}

<p>Append <code>--&lt;breakpoint name&gt;</code> to any Atomic class to associate that styling with the breakpoint of your choice. For example, <code>D(b)--sm</code> and <code>C(#000)--md</code> will create the following rules in the related media queries:</p>

{% highlight css %}
@media screen and (min-width:380px) {
    #atomic .D(b)--sm {
        display: block;
    }
}

@media screen and (min-width:680px) {
    #atomic .C(#000)--md {
        color: #000;
    }
}
{% endhighlight %}

{% include subhead.html tag="h3" title="Automatic Breakpoints" %}

<p><a href="/guides/syntax.html#variable-values">Variable values</a> and <a href="/guides/atomic-classes.html#custom-classes">custom classes</a> may also be mapped to breakpoints in configuration to simplify the process of applying styles. In this case, you would not be required to use the <a href="/guides/syntax.html#-lt-breakpoint_identifier-">breakpoint identifier</a> suffix on your class.</p>

<p>Simply set the value of your variable or custom class identifier to an object containing breakpoint names as the keys:</p>

{% highlight js %}
'custom': {
    'P(logo)': {
        'default': '10px',
        'sm': '12px',
        'md': '14px',
        'lg': '20px'
    },
    'gutter': {
        'default': '1em',
        'sm': '3em'
    }
}
{% endhighlight %}

<p>In this example, the class <code>P(logo)</code> will style a box with a <code>padding</code> of <code>10px</code> below the first breakpoint, but then this padding will become:</p>

<ul class="ul-list">
    <li><code>12px</code> inside the <code>sm</code> breakpoint</li>
    <li><code>14px</code> inside the <code>md</code> breakpoint</li>
    <li><code>20px</code> inside the <code>lg</code> breakpoint</li>
</ul>

<p>Likewise, any class that uses the variable <code>gutter</code> will receive different values depending on the currently active breakpoint.</p>

{% include subhead.html tag="h2" title="Examples" %}

<p>When using explicit breakpoints, use multiple classes to have styles applied in the context of various breakpoints, for example:</p>

{% highlight html %}
   <div class="D(ib)--sm W(50%)--sm W(25%)--lg P(20px) Bgc(#0280ae.5)">1</div><!--
--><div class="D(ib)--sm W(50%)--sm W(25%)--lg P(20px) Bgc(#0280ae.6)">2</div><!--
--><div class="D(ib)--sm W(50%)--sm W(25%)--lg P(20px) Bgc(#0280ae.8)">3</div><!--
--><div class="D(ib)--sm W(50%)--sm W(25%)--lg P(20px) Bgc(#0280ae)">4</div>
{% endhighlight %}

<ul class="ul-list">
    <li>Below 380px, the boxes are displayed on top of each other (<code>div</code> are block-level elements)</li>
    <li>Above 380px, the boxes are displayed on 2 rows, 2 by 2 (<code>D(ib)--sm</code> + <code>W(50%)--sm</code>)</li>
    <li>Above 900px, the boxes are displayed side-by-side, on a single row (<code>D(ib)--sm</code> + <code>W(25%)--lg</code>)</li>
</ul>

<p class="noteBox info">The breakpoints for the example below have been chosen so you can see the changes within this page. <strong>Give it a try, resize your viewport!</strong></p>

<h3 class="penResult">Result</h3>

<p data-height="265" data-theme-id="12469" data-slug-hash="jExMYr" data-default-tab="result" data-user="thierry" class='codepen'>See the Pen <a href='http://codepen.io/thierry/pen/jExMYr/'>jExMYr</a> by Thierry (<a href='http://codepen.io/thierry'>@thierry</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
