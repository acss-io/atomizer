# Responsive Web Design

<p>You can set your **own** breakpoints in the config object and then use Atomic classes scoped to media queries tied to those breakpoints.</p>

<p class="noteBox info">Classes bound to media queries contain 2 dashes (`--`) followed by the breakpoint &quot;name&quot; (i.e. `sm`).</p>

## Config

<h3>Setting up Breakpoints</h3>

<p>Pick the names and values you want:</p>

```json
'config': {
    ...
    },
    'breakPoints': {
        'sm': '@media (min-width: 380px)',
        'md': '@media (min-width: 800px)',
        'lg': '@media (min-width: 1200px)'
    }
},
```

<h3>Atomic classes and Breakpoints</h3>

<p>You can associate styles to breakpoints via config.js. For example, the next code example creates 2 `display:block` rules:</p>

<ul class="ul-list">
    <li>One that is breakpoint agnostic</li>
    <li>One that is bound to the &quot;`sm`&quot; breakpoint</li>
</ul>

```json
// pattern
'display': {
    'b': {
        'breakPoints': ['sm']
    },
    'n': true
},
```

<h2>Output</h2>

<p>This is the result of such config:</p>

```css
#atomic .D-n {
    display: none;
}
@media(min-width:700px) {
    #atomic .D-b--sm {
        display: block;
    }
}
```

<h2>Usage</h2>

<p>Use such classes to apply different styles in the context of various breakpoints, for example:</p>

```json
'config': {
    ...
    },
    'breakPoints': {
        'sm': '500px',
        'md': '600px'
    }
},
...
    // pattern
    'display': {
        'ib': {
            breakPoints: ['sm']
        }
    },

    // pattern
    'width': {
        'custom': [{
            'suffix': '25%',
            'values': ['25%'],
            'breakPoints': ['lg']
        }, {
            'suffix': '50%',
            'values': ['50%'],
            'breakPoints': ['sm']
        }]
    }
...
```

<p>The above outputs these rules:</p>

```css
#atomic .D-ib {
    display: inline-block;
}

#atomic .W-25\% {
    width: 25%;
}

#atomic .W-50\% {
    width: 50%;
}

@media(min-width:500px) {

    #atomic .D-ib--sm {
        display: inline-block;
    }
    #atomic .W-50\%--sm {
        width: 50%;
    }

}

@media(min-width:600px) {

    #atomic .W-25\%--lg {
        width: 25%;
    }

}
```

<p>Using these classes we can style 4 boxes meant to respond to viewport width:</p>

<ul class="ul-list">
    <li>Below 500px, boxes are displayed on top of each other (`div` are block-level elements)</li>
    <li>Between 500px and 599px boxes are displayed on 2 rows, 2 by 2 (`D-ib--sm` + `W-50%--sm`)</li>
    <li>From 600px on, boxes are displayed side-by-side, on a single row (`D-ib--sm` + `W-25%--lg`)</li>
</ul>

```html
<div class="D-ib--sm W-50%--sm W-25%--lg P-20px Bgc-CCC">1</div><!--
--><div class="D-ib--sm W-50%--sm W-25%--lg P-20px Bgc-999">2</div><!--
--><div class="D-ib--sm W-50%--sm W-25%--lg P-20px Bgc-777">3</div><!--
--><div class="D-ib--sm W-50%--sm W-25%--lg P-20px Bgc-555">4</div>
```

<h3 class="penResult">Result</h3>

<p data-height="265" data-theme-id="12469" data-slug-hash="jExMYr" data-default-tab="result" data-user="thierry" class='codepen'>See the Pen <a href='http://codepen.io/thierry/pen/jExMYr/'>jExMYr</a> by Thierry (<a href='http://codepen.io/thierry'>@thierry</a>) on <a href='http://codepen.io'>CodePen</a>.</p>


<p class="noteBox info">The breakpoints have been chosen so you can see the changes in the embedded Pen above within this page. <strong>Give it a try!</strong></p>
