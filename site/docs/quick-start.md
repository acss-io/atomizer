---
section: docs
layout: docs
title: Quick Start
---

<p>This page is here to help you quickly set up an example site powered by <a href="/guides/atomizer.html">Atomizer</a>.</p>

{% include subhead.html tag="h2" title="Playground" %}

<p>To create a basic Atomic project, clone the <a href="https://github.com/acss-io/atomizer-examples">atomizer-examples</a> repo:</p>

{% highlight shell %}
git clone git@github.com:acss-io/atomizer-examples.git
{% endhighlight %}

<p>then start:</p>

{% highlight shell %}
cd atomizer-examples
npm install
npm start
{% endhighlight %}

<p>This should open a page in your browser at <a href="http://localhost:3000">http://localhost:3000</a></p>

<p>Now try this:</p>

<ul class="ul-list">
    <li>Open the index page in a text editor</li>
    <li>Edit, add, or remove <b class="Fw(b)">Atomizer</b> classes in the markup (get help from the <a href="/reference">reference page</a>)</li>
    <li>Save the file</li>
</ul>

<p>The browser should reload the page, displaying all your changes. Check the <a href="http://localhost:3000/css/atomic.css">atomic.css</a> file to see that it only contains the rules for the classes that are being used in the project.</p>

{% include subhead.html tag="h2" title="Configuration" %}

<p>Atomizer allows you to define breakpoints, variables/custom values, and predefined classes in a JSON-formatted config file. Take a look at <a href="https://github.com/acss-io/atomizer/blob/master/examples/example-config.js">this example</a> for more information on how configuration is used in Atomizer.</p>

{% include subhead.html tag="h2" title="Next Steps" %}

<p>From here, learn about <a href="/thinking-in-atomic.html">Atomic CSS Architecture</a>, read the <a href="/frequently-asked-questions.html">FAQ</a>, learn more about <a href="/guides/atomic-classes.html">Atomizer</a> classes and their <a href="/guides/syntax.html">syntax</a>.</p>

<p>Please visit the <a href="https://github.com/acss-io/atomizer">Atomizer</a> and <a href="https://github.com/acss-io/grunt-atomizer">grunt-atomizer</a> repositories for more information.</p>
