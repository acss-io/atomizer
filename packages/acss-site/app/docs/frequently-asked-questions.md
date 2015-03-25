# Frequently Asked Questions

This section is intended to answer common questions related to Atomic CSS. Do not hesitate to reach out if nothing on this page answers your question.

<ul class="ul-list">
   <li><a href="#what-is-atomic-css-">What is Atomic CSS?</a></li>
   <li><a href="#what-is-the-difference-between-inline-styling-and-atomic-css-">How is Atomic CSS different than using inline styles?</a></li>
   <li><a href="#what-are-the-benefits-of-atomic-css-">What are the benefits of Atomic CSS?</a></li>
   <li><a href="#how-does-atomic-css-compare-to-bootstrap-or-purecss-">How does Atomic CSS compare to Bootstrap, PureCSS, or other CSS frameworks?</a></li>
   <li><a href="#should-i-quot-atomize-quot-everything-">Should I &quot;<em>atomize</em>&quot; everything? Should I style everything using atomic classes?</a></li>
   <li><a href="#">Why are Atomic classes capitalized? As far as I know. no other frameworks do that?</a></li>
   <li><a href="#do-i-need-to-specify-a-namespace-and-if-yes-what-should-i-use-">Do I need to specify a namespace? And if yes, what should I use?</a></li>
   <li><a href="#">Why is my "descendant selector class" not working?</a></li>
   <li><a href="#i-was-always-told-to-use-semantic-classes-and-not-use-declarative-css-classes-isn-t-atomic-css-using-a-bad-practice-">I was always told to use semantic classes and not use classes related to presentation; isn't Atomic CSS promoting bad practice?</a></li>
   <li><a href="#how-can-one-remember-atomic-class-names-">Atomic class names look rather cryptic to me, how can I quickly find what class I need?</a></li>
   <li><a href="#aren-t-you-bloating-the-markup-">Atomic CSS does reduce the size of the style sheet but isn't it moving bloat to HTML?</a></li>
   <li><a href="#how-can-you-distribute-presentation-changes-without-asking-everyone-to-change-their-markup-">How can we change the styling of elements across the board without having to edit many different files?</a></li>
   <li><a href="#how-does-atomic-css-work-with-abbr-title-responsive-web-design-rwd-abbr-">How does Atomic CSS work with Responsive Web Design (RWD)?</a></li>
</ul>

## What is Atomic CSS?

Atomic CSS is a Front-End (FE) library / CSS &quot;architecture&quot; that has the ambition to solve 2 main <abbr title="Cascading Style Sheets">CSS</abbr> challenges:

<ul class="ul-list">
   <li>bloat</li>
   <li>maintenance</li>
</ul>

The library is a collection of single purpose styling units (*single responsibility principle for maximum reuse*) that fits well with components in templated frameworks such as [React](https://github.com/facebook/react), [Ember](https://github.com/emberjs/ember.js/) or [Angular](https://github.com/angular/angular.js).

Atomic classes and their associated styling are **immutable**, meaning you'd use the same classes whatever the project you're working on or the team you're working with. In other words, Atomic CSS is a common &quot;vocabulary&quot; meant to style documents *regardless of context or content*.

For more information about Atomic CSS, we recommend that you read [Challenging CSS best practices](http://www.smashingmagazine.com/2013/10/21/challenging-css-best-practices-atomic-approach/) on Smashing Magazine, watch the [Atomic CSS presentation](https://www.youtube.com/watch?v=ojj_-6Xiud4) on youtube, or check the [Atomic CSS slide deck](https://www.haikudeck.com/atomic-css-uncategorized-presentation-dJ0xlFjhBQ) on haikudeck.

## How is Atomic CSS different than using inline styles?

<dl class="dl-list">
    <dt>Inline styling, the bad parts:</dt>
    <dd>The high specificity, the verbosity, the fact that those bytes are not cached, and also the fact that browsers have to assess those styles once they get to them in the markup.</dd>
    <dt>Inline styling, the good parts:</dt>
    <dd>Scope is limited to the element onto which we apply the classes and the styling is <em>portable</em> because that styling is <em>associated</em> to the markup.</dd>
</dl>

<img className="Va-m Pos-r Mt-30px" alt="Venn diagram showing the difference between Atomic CSS and inline styling" height="400" src="/public/images/atomic-vs-style.gif" />

<table cellspacing="0" class="W-100% Ta-start">
    <caption class="hidden">The difference between inline styling and Atomic CSS</caption>
    <thead>
      <tr>
          <th scope="col" class="P-10px"></th>
          <th scope="col" class="P-10px Whs-nw ">Inline styling</th>
          <th scope="col" class="P-10px">Atomic CSS</th>
      </tr>
    </thead>
    <tbody>
        <tr class="Bdt-1">
            <th scope="row" class="Va-t P-10px">Specificity</th>
            <td class="Va-t P-10px">1.0.0.0</td>
            <td class="Va-t P-10px">0.0.1.0 [\[1\]](#footnote)<a id="footnote-1" class="D-ib"></a></td>
        </tr>
        <tr class="Bdt-1">
            <th scope="row" class="Va-t P-10px">Verbosity</th>
            <td class="Va-t P-10px">High</td>
            <td class="Va-t P-10px">Minimal</td>
        </tr>
        <tr class="Bdt-1">
            <th scope="row" class="Va-t P-10px">Abstraction</th>
            <td class="Va-t P-10px">None</td>
            <td class="Va-t P-10px">Fallbacks, tweaks, LTR/RTL support, etc.</td>
        </tr>
    </tbody>
</table>

## Should I &quot;atomize&quot; everything? Should I style everything using atomic classes?

If changing some styling requires you to edit multiple files, then you should use the classic CSS approach: apply a "meaningful" class to the element you want to style and use that hook to write rules in a style sheet. But if changing styles of an element can be done in one place - other than a style sheet - then you should go with Atomic CSS.

An example of the former could be headings (unless they are "components") meant to look the same across many modules, or any other styling meant to be shared across different modules. An example of the latter is a component that lives in a template or a JS file, like a specific widget.

## How does Atomic CSS compare to Bootstrap, PureCSS, or other CSS framework?

Atomic CSS is very different than these frameworks. It does not contain UI components nor a grid system. It is a solution that allows you to to create **your own UI** while preventing bloat.

Atomic CSS's "footprint" is limited to what a project uses - meaning there is no "entry cost". Simply installing [Atomizer](atomizer.html) in your project does not add any bytes to your pages.

## Do I need to specify a namespace? And if yes, what should I use?

You do not need to use a namespace per se but this is extremely useful to bump the specificity of Atomic rules.
Our advice is to use an `id` (we use `#atomic`) so all Atomic rules can easily overwrite declarations from other rules; for example:

```css
.hero-module .button {
    font-size: 1.6em;
    font-weight: bold;
}
...
#atomic .Fw-n {
    font-weight: normal;
}
```

```html
<div class="hero-module">
    <button class="button Fw-n">...</button>
</div>
```

The value for `font-weight` in the `.hero-module .button {...}` rule is overwritten by the Atomic class in the markup [\[6\]](#footnote)<a id="footnote-6" class="D-ib"></a>.

## What are the benefits of Atomic CSS?

The main benefit of Atomic CSS is that it prevents bloat by *dramatically reducing redundancy*. This is possible because rules are content agnostic which makes them much more re-usable than rules based on &quot;semantic&quot; selectors.

It also:

<dl class="dl-list">
    <dt>moves specificity out of the way:</dt>
    <dd>authors do not have to sandbox their styling via contextual selectors, everything is done via generic classes through markup - which normalizes selector <em>weight</em> and reduces <em>scope</em>.</dd>
    <dt>improves performance:</dt>
    <dd>less bloat means less bytes (<em>much less</em>).</dd>
    <dt>removes dependencies:</dt>
    <dd>"components" (or "objects") <em>rely on generic CSS rules</em>, so there is no need to associate them with their own style block or styles sheet.</dd>
    <dt>allows to share content and assets easily:</dt>
    <dd>UI patterns can be easily shared across projects as their styling relies on the same generic set of rules (the same style sheet).</dd>
    <dt>leverages cache:</dt>
    <dd>The style sheet can be cached for a much longer time because authors re-use existing rules rather than adding new ones to the style sheet.</dd>
    <dt>facilitates RTL/LTR interface switch:</dt>
    <dd>Direction values are abstracted which allows authors to style without much concern for script direction.</dd>
</dl>

This speaks for itself:

```css
.headline,
.cta-button,
.icon-large,
.title,
.intro {
    font-size: 18px;
}
```

versus:

```css
.Fz-large {
    font-size: 18px;
}
```

Such approach produces less of everything:

<table cellspacing="0" class="W-100% Ta-c">
    <caption class="hidden">Table comparing yahoo.com against other web sites</caption>
    <thead>
      <tr>
          <th scope="col" class="P-10px"></th>
          <th scope="col" class="P-10px Whs-nw ">rules</th>
          <th scope="col" class="P-10px">selectors</th>
          <th scope="col" class="P-10px">declarations</th>
          <th scope="col" class="P-10px">properties</th>
          <th scope="col" class="P-10px">font-size</th>
          <th scope="col" class="P-10px"><abbr title="Kilobyte">KB</abbr></th>
      </tr>
    </thead>
    <tbody>
        <tr class="Bdt-1">
            <th scope="row" class="Ta-start P-10px">twitter.com</th>
            <td class="P-10px">6,372 [\[2\]](#footnote)<a id="footnote-2" class="D-ib"></a></td>
            <td class="P-10px">9,104</td>
            <td class="P-10px">15,000</td>
            <td class="P-10px">135</td>
            <td class="P-10px">755</td>
            <td class="P-10px">585</td>
        </tr>
        <tr class="Bdt-1">
            <th scope="row" class="Ta-start P-10px">facebook.com</th>
            <td class="P-10px">3,316</td>
            <td class="P-10px">4,018</td>
            <td class="P-10px">7,947</td>
            <td class="P-10px">103</td>
            <td class="P-10px">157</td>
            <td class="P-10px">281</td>
        </tr>
        <tr class="Bdt-1">
            <th scope="row" class="Ta-start P-10px">medium.com</th>
            <td class="P-10px">3,090</td>
            <td class="P-10px">4,030</td>
            <td class="P-10px">7,321</td>
            <td class="P-10px">150</td>
            <td class="P-10px">432</td>
            <td class="P-10px">282</td>
        </tr>
        <tr class="Bdt-1">
            <th scope="row" class="Ta-start P-10px">youtube.com</th>
            <td class="P-10px">3,530</td>
            <td class="P-10px">4,684</td>
            <td class="P-10px">9,005</td>
            <td class="P-10px">136</td>
            <td class="P-10px">336</td>
            <td class="P-10px">352</td>
        </tr>
        <tr class="Bdt-1">
            <th scope="row" class="Ta-start P-10px">tumblr.com</th>
            <td class="P-10px">5,647 [\[3\]](#footnote)<a id="footnote-3" class="D-ib"></a></td>
            <td class="P-10px">7,616</td>
            <td class="P-10px">18,100</td>
            <td class="P-10px">253</td>
            <td class="P-10px">499</td>
            <td class="P-10px">733</td>
        </tr>
        <tr class="Bdt-1">
            <th scope="row" class="Ta-start P-10px">yahoo.com</th>
            <td class="P-10px Fw-b">1,891</td>
            <td class="P-10px Fw-b">2,311</td>
            <td class="P-10px Fw-b">4,579</td>
            <td class="P-10px Fw-b">124</td>
            <td class="P-10px Fw-b">71</td>
            <td class="P-10px Fw-b">189</td>
        </tr>
    </tbody>
    <tfoot>
      <tr>
          <th scope="col" class="P-10px"></th>
          <th scope="col" class="P-10px Whs-nw ">rules</th>
          <th scope="col" class="P-10px">selectors</th>
          <th scope="col" class="P-10px">declarations</th>
          <th scope="col" class="P-10px">properties</th>
          <th scope="col" class="P-10px">font-size</th>
          <th scope="col" class="P-10px"><abbr title="Kilobyte">KB</abbr></th>
      </tr>
    </tfoot>
</table>

<small>Source: <a href="http://cssstats.com">cssstats.com</a></small>

The table above uses yahoo.com for reference as this site uses an early version of Atomic CSS.

## I was always told to use classes related to content, *not to presentation*. Isn't Atomic CSS promoting bad practice?

<blockquote>
    <div>
        <p class="Mt-0">
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

Classes are for developers, they don’t make a document more &quot;semantic&quot; [\[4\]](#footnote)<a id="footnote-4" class="D-ib"></a>.

The main goal of Atomic CSS is to reduce bloat, so to better achieve this we must ignore content and context as much as possible.

Look at the following snippet for example (a carousel without a `carousel` class). It creates a working carousel.
We put things together in the markup, there is no need for “carousel” rules in the style sheet.
If we wanted to show only 2 items per view, we would simply replace W-20% with W-50% - that’s it.

```html
<div data-plugin="carousel">
    <div class="Ov-h Pos-r">
        <ul class="M-0 P-0 Whs-nw">
            <li class="D-ib W-20%">...</li><!--
         --><li class="D-ib W-20%">...</li><!--
         --><li class="D-ib W-20%">...</li><!--
         --><li class="D-ib W-20%">...</li><!--
            ...
        </ul>
    </div>
</div>
```

Unlike `.carousel`, all the above classes can be re-used to style any other widget.

## How can one remember Atomic class names?

The syntax comes from <a href="http://emmet.io">Emmet</a>, which is a plugin for many IDEs. It allows you to type a few characters and get property/value pairs.
Like Emmet shortcuts, Atomic classes are for the most part simple abbreviations.

Also, note that we do not use “left” and “right” but instead “start” and “end”. So we can easily output a RTL style sheet using a pre/post-processor.

The <a href="reference">reference page</a> is here to help you with this; and we may have a plugin for your IDE in the near future...

## Isn't Atomic CSS moving bloat from style sheets to HTML?

The table below represents the average number of characters per class attribute on a page.
Note that Facebook appears to uglify some classes.

<table cellspacing="0" class="Ta-c">
    <caption class="hidden">Number of characters per class attributes between web sites</caption>
    <thead>
      <tr>
          <th scope="col" class="P-10px"></th>
          <th scope="col" class="P-10px Whs-nw ">Number of characters per `@class`</th>
      </tr>
    </thead>
    <tbody>
        <tr class="Bdt-1">
            <th scope="row" class="Ta-start P-10px">twitter.com</th>
            <td class="P-10px">28</td>
        </tr>
        <tr class="Bdt-1">
            <th scope="row" class="Ta-start P-10px">facebook.com</th>
            <td class="P-10px">17 [\[5\]](#footnote)<a id="footnote-5" class="D-ib"></a></td>
        </tr>
        <tr class="Bdt-1">
            <th scope="row" class="Ta-start P-10px">usatoday.com</th>
            <td class="Va-t P-10px">38</td>
        </tr>
        <tr class="Bdt-1">
            <th scope="row" class="Ta-start Va-t P-10px">theguardian.com</th>
            <td class="P-10px">36</td>
        </tr>
        <tr class="Bdt-1">
            <th scope="row" class="Ta-start P-10px">yahoo.com</th>
            <td class="P-10px Fw-b">22</td>
        </tr>
    </tbody>
</table>

### Gzip loves Atomic CSS

If we put Gzip into the picture, then things look even better. That’s because a lot of repetitions means a better compression ratio.
From a few tests we ran, it’s about 35% for semantic classes versus 48% for Atomic classes.

## How can you distribute presentation changes without asking everyone to change their markup?

Use Atomic classes where it makes sense; for example the following creates much of the content of our <a href="./reference">reference</a> page. If we decided to change the styling of this content this would be the only place we'd need to go to.

```js
return (
    <div key={'id-' + recipe.id} className={displayclassDefinitions}>
        <h3 className="M-0 Mt-10px P-10px">{recipe.name}</h3>
        <dl className="M-0 P-10px Pt-0 Pend-50px--sm Ff-m">{classDefinitions}</dl>
    </div>
);
```


## Why is my "descendant selector class" not working?

The ancestor node you reference in your class (i.e. `open` in `open_D-b`) must be inside the scope of the node onto which the namespace is applied.
For example this would not work:

```html
<html id="atomic" class="open">
    ...
    <div className="open_D-b">...</div>
</div>
```

This is because Atomic classes are &quot;sandboxed&quot; via the namespace (i.e. `#atomic`) like this:

```css
#atomic .open .open_D-b {
    display: block;
}
```

but `id` and `class` should be chained for the above to work, like below:

```css
#atomic.open .open_D-b {
    display: block;
}
```

In other words, when creating contextual classes, you *cannot* use a class that is on the same node or above the node you use to namespace Atomic classes.

## How does Atomic CSS work with <abbr title="Responsive Web Design">RWD</abbr>?

Please visit our [RWD docs](tutorials/responsive-web-design.html) to see examples of how you can use Atomic CSS to create styles in the context of breakpoints.


<hr class="Mt-50px">

<ul id="footnote" class="ul-list">
    <li>[\[1\]](#footnote-1) Specificity of Atomic rules can be increased via namespace. You'd use a type selector for `0.0.1.1`, a class for `0.0.2.0`, and an id for `0.1.1.0`.</li>
    <li>[\[2\]](#footnote-2)[\[3\]](#footnote-3) Maximum number of rules for IE9: 4,095 (65,534 for IE10+).</li>
    <li>[\[4\]](#footnote-4) [microformats](http://microformats.org/) is a different story.</li>
    <li>[\[5\]](#footnote-5) Thanks to some uglification.</li>
    <li>[\[6\]](#footnote-6) Choosing a `id` for the namespace (i.e. `#atomic`) guarantees that Atomic CSS styles overwrite any other rule in a project based on classes &mdash; regardless how many classes are being used. <br> We do not use `!important` as such styling would overwrite inline styles as well as other rules in a project that could be using an `id` to create more specific styling.</li>
</ul>
