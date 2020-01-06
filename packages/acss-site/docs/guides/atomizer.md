---
section: docs
layout: docs
title: Atomizer tool
---

<p><a href="https://github.com/acss-io/atomizer">Atomizer</a> is a tool (<a href="https://www.npmjs.com/package/atomizer">npm</a>, <a href="https://github.com/acss-io/atomizer">github</a>) for generating Atomic CSS stylesheets.</p>
<p>Atomizer creates CSS style declarations based on Atomic classes it finds in your project. This means that your style sheets are always up-to-date <em>without the need for writing a single CSS declaration manually</em> <a href="#footnote">[1]</a><a id="footnote-1" class="D(ib)"></a>.</p>
<p>For example, if your project was a single page containing:</p>
<pre><code class="lang-html">&lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"D(b) Va(t) Fz(20px)"</span>&gt;Hello World!&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<p>Atomizer would create a style sheet containing these rules:</p>
<pre><code class="lang-css"><span class="hljs-class">.D</span>(<span class="hljs-tag">b</span>) <span class="hljs-rules">{
    <span class="hljs-rule"><span class="hljs-attribute">display</span>:<span class="hljs-value"> block</span></span>;
}</span>
<span class="hljs-class">.Va</span>(<span class="hljs-tag">t</span>) <span class="hljs-rules">{
    <span class="hljs-rule"><span class="hljs-attribute">vertical-align</span>:<span class="hljs-value"> top</span></span>;
}</span>
<span class="hljs-class">.Fz</span>(20<span class="hljs-tag">px</span>) <span class="hljs-rules">{
    <span class="hljs-rule"><span class="hljs-attribute">font-size</span>:<span class="hljs-value"> <span class="hljs-number">20px</span></span></span>;
}</span>
</code></pre>
<p class="noteBox info">For the sake of readability, CSS classes on this page <em>do not</em> include the escape character (<code>\</code>) where it should be needed.</p>

<p>If, for example, you decided to update the classes like below:</p>
<pre><code class="lang-html">&lt;<span class="hljs-keyword">div</span> <span class="hljs-type">class</span>=<span class="hljs-string">"Va(t) Fz(18px)"</span>&gt;Hello World!&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<p>Then Atomizer would update the style sheet (removing <code>D(b)</code> and replacing <code>Fz(20px)</code> with <code>Fz(18px)</code>) to match exactly <em>what is being used</em> inside the project:</p>
<pre><code class="lang-css"><span class="hljs-class">.Va</span>(<span class="hljs-tag">t</span>) <span class="hljs-rules">{
    <span class="hljs-rule"><span class="hljs-attribute">vertical-align</span>:<span class="hljs-value"> top</span></span>;
}</span>
<span class="hljs-class">.Fz</span>(18<span class="hljs-tag">px</span>) <span class="hljs-rules">{
    <span class="hljs-rule"><span class="hljs-attribute">font-size</span>:<span class="hljs-value"> <span class="hljs-number">18px</span></span></span>;
}</span>
</code></pre>
<h2 id="integrations">Integrations</h2>
<h3 id="build">Build</h3>
<p>So how do you integrate Atomizer into your project? You can use Grunt, Gulp, WebPack, Make, Graddle, or any other task runner/build system you&#39;d like.</p>
<p>Here&#39;s a few open source projects we know about:</p>
<ul>
<li>Grunt: <a href="https://www.npmjs.com/package/grunt-atomizer">grunt-atomizer</a> (Created by the Atomizer team)</li>
<li>Webpack: <a href="https://www.npmjs.com/package/atomic-loader">atomic-loader</a></li>
<li>Gulp: <a href="https://www.npmjs.com/package/gulp-atomizer">gulp-atomizer</a></li>
<li>Clojure : <a href="https://github.com/azizzaeny/boot-atomizer">boot-atomizer</a> (<a href="https://github.com/boot-clj/boot">Boot-Task</a> for clojurescript )</li>
</ul>
<p>If you create your own, please <a href="/support.html">let us know!</a></p>
<h4 id="example-grunt">Example: Grunt</h4>
<p>If you&#39;re using the <a href="http://gruntjs.com/">Grunt</a> task runner, you can use <a href="http://github.com/acss-io/grunt-atomizer">grunt-atomizer</a> to configure and execute Atomizer:</p>
<pre><code class="lang-javascript">// use grunt-contrib-watch <span class="hljs-keyword">for</span> changes <span class="hljs-operator">and</span> run tasks
watch: {
    dev: {
        options: {
            livereload: <span class="hljs-constant">true</span>
        },
        <span class="hljs-built_in">files</span>: [
            <span class="hljs-string">'./examples/**/*.html'</span>
        ],
        tasks: [<span class="hljs-string">'atomizer'</span>]
    }
},
atomizer: {
    options: {
       <span class="hljs-comment"> // set a context to increase specificity</span>
        namespace: <span class="hljs-string">'#atomic'</span>,
       <span class="hljs-comment"> // pass a base config file</span>
        configFile: <span class="hljs-string">'./config/manual-config.js'</span>,
       <span class="hljs-comment"> // augment classNames in the base config file</span>
        config: {
            classNames: [<span class="hljs-string">'D(b)'</span>]
        }
       <span class="hljs-comment"> // the final config file used by the tool will be written</span>
       <span class="hljs-comment"> // in the following file:</span>
        configOutput: <span class="hljs-string">'tmp/config.json'</span>,
    },
    <span class="hljs-built_in">files</span>: [
        {
           <span class="hljs-comment"> // parse your project's html files to automatically add</span>
           <span class="hljs-comment"> // found Atomic classes to your config</span>
            src: [<span class="hljs-string">'./src/*.html'</span>],
           <span class="hljs-comment"> // generate the css in the file below</span>
            dest: <span class="hljs-string">'./atomic.css'</span>
        }
    ]
}
</code></pre>
<h3 id="web-tools">Web Tools</h3>
<p>For a simple web interface to help you learn about Atomizer and Atomic CSS, check out <a href="https://pankajparashar-zz.github.io/atomizer-web/">ATOMIZER WEB</a>, a tool built by <a href="https://twitter.com/pankajparashar" title="@pankajparashar on Twitter">Pankaj Parashar</a>. Paste some markup or Atomic classes and ATOMIZER WEB will show you the rendered CSS. The tool also gives you access to the configuration where you can set your own break-points, variables, and more.</p>
<hr class="Mt(50px)">

<ol id="footnote" class="ol-list">
    <li>This is true for non-custom classes <a href="#footnote-1">[↩]</a>.</li>
</ol>
