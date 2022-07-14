---
section: docs
layout: docs
title: Atomizer tool
---

<p><a href="https://github.com/acss-io/atomizer">Atomizer</a> is a tool (<a href="https://www.npmjs.com/package/atomizer">npm</a>, <a href="https://github.com/acss-io/atomizer">github</a>) for generating <b class="Fw(b)">ACSS</b> stylesheets.</p>

<p>Atomizer creates CSS style declarations based on <b class="Fw(b)">ACSS</b> classes it finds in your project. This means that your style sheets are always up-to-date <em>without the need for writing a single CSS declaration manually</em> <a href="#footnote">[1]</a><a id="footnote-1" class="D(ib)"></a>.</p>

<p>For example, if your project was a single page containing:</p>

{% highlight html %}
<div class="D(b) Va(t) Fz(20px)">Hello World!</div>
{% endhighlight %}

<p>Atomizer would create a style sheet containing these rules:</p>

{% highlight css %}
.D(b) {
    display: block;
}
.Va(t) {
    vertical-align: top;
}
.Fz(20px) {
    font-size: 20px;
}
{% endhighlight %}

<p class="noteBox info">For the sake of readability, CSS classes on this page <em>do not</em> include the escape character (<code>\</code>) where it should be needed.</p>

<p>If, for example, you decided to update the classes like below:</p>

{% highlight html %}
<div class="Va(t) Fz(18px)">Hello World!</div>
{% endhighlight %}

<p>Then Atomizer would update the style sheet (removing <code>D(b)</code> and replacing <code>Fz(20px)</code> with <code>Fz(18px)</code>) to match exactly <em>what is being used</em> inside the project:</p>

{% highlight css %}
.Va(t) {
    vertical-align: top;
}
.Fz(18px) {
    font-size: 18px;
}
{% endhighlight %}

{% include subhead.html tag="h2" title="Integrations" %}

{% include subhead.html tag="h3" title="Build" %}

<p>So how do you integrate Atomizer into your project? You can use Grunt, Gulp, WebPack, Make, Graddle, or any other task runner/build system you&#39;d like.</p>

<p>Here&#39;s a few open source projects we know about:</p>

<ul class="ul-list">
    <li>Grunt: <a href="https://www.npmjs.com/package/grunt-atomizer">grunt-atomizer</a> (Created by the Atomizer team)</li>
    <li>Webpack: <a href="https://www.npmjs.com/package/atomic-loader">atomic-loader</a></li>
    <li>Gulp: <a href="https://www.npmjs.com/package/gulp-atomizer">gulp-atomizer</a></li>
    <li>Clojure : <a href="https://github.com/azizzaeny/boot-atomizer">boot-atomizer</a> (<a href="https://github.com/boot-clj/boot">Boot-Task</a> for clojurescript )</li>
</ul>

<p>If you create your own, please <a href="/support.html">let us know!</a></p>

<h4 id="example-grunt">Example: Grunt</h4>

<p>If you&#39;re using the <a href="http://gruntjs.com/">Grunt</a> task runner, you can use <a href="http://github.com/acss-io/grunt-atomizer">grunt-atomizer</a> to configure and execute Atomizer:</p>

{% highlight js %}
// use grunt-contrib-watch for changes and run tasks
watch: {
    dev: {
        options: {
            livereload: true
        },
        files: [
            './examples/**/*.html'
        ],
        tasks: ['atomizer']
    }
},
atomizer: {
    options: {
        // set a context to increase specificity
        namespace: '#atomic',
        // pass a base config file
        configFile: './config/manual-config.js',
        // augment classNames in the base config file
        config: {
            classNames: ['D(b)']
        }
        // the final config file used by the tool will be written
        // in the following file:
        configOutput: 'tmp/config.json',
    },
    files: [
        {
            // parse your project's html files to automatically add
            // found ACSS classes to your config
            src: ['./src/*.html'],
            // generate the css in the file below
            dest: './atomic.css'
        }
    ]
}
{% endhighlight %}

{% include subhead.html tag="h3" title="Web Tools" %}

<p>For a simple web interface to help you learn about Atomizer and <b class="Fw(b)">ACSS</b>, check out <a href="https://pankajparashar-zz.github.io/atomizer-web/">ATOMIZER WEB</a>, a tool built by <a href="https://twitter.com/pankajparashar" title="@pankajparashar on Twitter">Pankaj Parashar</a>. Paste some markup or <b class="Fw(b)">ACSS</b> classes and ATOMIZER WEB will show you the rendered CSS. The tool also gives you access to the configuration where you can set your own break-points, variables, and more.</p>

<hr class="Mt(50px)">

<ol id="footnote" class="ol-list">
    <li>This is true for non-custom classes <a href="#footnote-1">[↩]</a>.</li>
</ol>
