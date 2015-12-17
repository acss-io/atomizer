# Atomizer tool

[Atomizer](https://github.com/yahoo/atomizer) is a tool ([npm](https://www.npmjs.com/package/atomizer), [github](https://github.com/yahoo/atomizer)) for generating Atomic CSS stylesheets.

Atomizer creates CSS style declarations based on Atomic classes it finds in your project. This means that your style sheets are always up-to-date *without the need for writing a single CSS declaration manually* [\[1\]](#footnote)<a id="footnote-1" class="D(ib)"></a>.

For example, if your project was a single page containing:

```html
<div class="D(b) Va(t) Fz(20px)">Hello World!</div>
```

Atomizer would create a style sheet containing these rules:

```css
.D(b) {
    display: block;
}
.Va(t) {
    vertical-align: top;
}
.Fz(20px) {
    font-size: 20px;
}
```
<p class="noteBox info">For the sake of readability, CSS classes on this page <em>do not</em> include the escape character (<code>\</code>) where it should be needed.</p>

If, for example, you decided to update the classes like below:

```html
<div class="Va(t) Fz(18px)">Hello World!</div>
```

Then Atomizer would update the style sheet (removing `D(b)` and replacing `Fz(20px)` with `Fz(18px)`) to match exactly *what is being used* inside the project:

```css
.Va(t) {
    vertical-align: top;
}
.Fz(18px) {
    font-size: 18px;
}
```

## Build Integration

So how do you integrate Atomizer into your project? You can use Grunt, Gulp, WebPack, Make, Graddle, or any other build system you like.

Here's a few open source projects we know about:

  * Grunt: [grunt-atomizer](https://www.npmjs.com/package/grunt-atomizer) (Created by the Atomizer team)
  * Webpack: [atomic-loader](https://www.npmjs.com/package/atomic-loader)
  * Gulp: [gulp-atomizer](https://www.npmjs.com/package/gulp-atomizer)

### Example: Grunt

If you're using the [Grunt](http://gruntjs.com/) task runner, you can use [grunt-atomizer](http://github.com/yahoo/grunt-atomizer) to configure and execute Atomizer:

```javascript
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
            // found Atomic classes to your config
            src: ['./src/*.html'],
            // generate the css in the file below
            dest: './atomic.css'
        }
    ]
}
```


<hr class="Mt(50px)">

<ol id="footnote" class="ol-list">
    <li>This is true for non-custom classes [\[↩\]](#footnote-1).</li>
</ol>
