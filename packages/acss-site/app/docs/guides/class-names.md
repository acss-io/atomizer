# Atomic classes

Atomic.css classes ultimately increase the speed of development as they follow a consistent and easy to remember syntax. The inspiration comes from [Emmet](http://emmet.io/), a plugin for many popular text editors which greatly improves HTML & CSS workflow.

It might take you a short time to get familiar with these class names but as soon as you start using them you'll be at full speed in no time.

Make sure you check the [reference page](/reference), so you can quickly search for properties, values or class names themselves.

## Syntax

<pre>
.<strong>Property</strong>-<strong>value_identifier</strong><em>[:pseudo-class][::pseudo-element][--breakpoint_identifier]</em>
</pre>

Where:

<dl class="dl-list">
    <dt>Property</dt>
    <dd>[capitalized](http://en.wikipedia.org/wiki/Capitalization) following [Emmet](http://docs.emmet.io/cheat-sheet/) syntax with no separator between words such as dashes or new capitals. For any occurrences of `left` and `right` keywords or its abbreviated form in [Emmet](http://docs.emmet.io/cheat-sheet/) `l` and `r`, the `start` and `end` keywords should be used respectively. e.g. `Mend`, `Bdstart`, etc.</dd>
    <dt>-value\_identifier</dt>
    <dd>Value identifier should be written in lowercase following [Emmet](http://docs.emmet.io/cheat-sheet/) syntax. For any occurrences of `left` and `right` keywords, `start` and `end` should be used respectively. **Values that are not present in Emmet** should be named using the rules below:
    <ul class="ul-list">
        <li>Value should be abbreviated with the first letter of the value.</li>
        <li>If two values share the same initial letter then the next value in alphabetical order is [abbreviated](http://en.wikipedia.org/wiki/Abbreviation), sometimes in [contracted](http://en.wikipedia.org/wiki/Contraction_%28grammar%29) form with no general rule for when it is in this form, it should just follow the same [Emmet CSS Syntax style guide](http://docs.emmet.io/css-abbreviations/).</li>
        <li>If **one value** is composed by two or more words (e.g. "inline-block") then the first letter of each word should be used with no separator between them (e.g. `inline-block` becomes `ib`, `space-between` becomes `sb`).</li>
        <li>If **two or more values** need to be specified, they should be separated by underscore (e.g. `start_t` for `start top` values in `background-position: 0 0`).</li>
        <li>Valid CSS **number values** should always be followed by its unit if any (e.g. `100%` and `100px`). These numbers can also be represented as keywords such as `top` and `bottom` if it makes sense in the context of the property.  Negative values should be prefixed with the word `neg` before the number as in `neg30px` for `-30px`. Fraction values should be represented with a forward-slash between the numbers as in `1/12` (the forward slash is escaped in CSS).</li>
        <li>Custom  values should use arbitrary keywords such as `.Bxs-heading` or `.Fz-xl`. These keywords are arbitrary and are defined by the consumer of atomic.css.</li>
        <li>The `inherit` value should always use the keyword `inh` as a special exception because it is available almost globally.</li>
    </ul>
    </dd>
    <dt>[:pseudo-class]</dt>
    <dd>optional suffix indicating that this class applies to a [pseudo-classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes) only. This should be all lower-case with no abbreviations. Words should be separated by one dash, exactly like the original pseudo class (e.g. `Td-u:h`, `Td-u:only-child`).</dd>
    <dt>[::pseudo-element]</dt>
    <dd>optional suffix indicating that this class applies to [pseudo-elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements) only. This should be all lower-case with no abbreviations. Words should be separated by one dash, exactly like the original pseudo element (e.g. `Td-u::before`).</dd>
    <dt>[--breakpoint_identifier]</dt>
    <dd>optional property suffix that adds the breakpoint context to the rule. A breakpoint indicates that this rule will only take effect within a CSS media query breakpoint. Valid values are `sm` for small, `md` for medium and `lg` for large. The length values of each breakpoint are defined in the config object.</dd>
</dl>

### Examples:

<table class="Ta-start W-100%">
    <caption class="hidden">Atomic class Examples</caption>
    <tr>
        <th scope="col" class="P-10px">HTML classes</th>
        <th scope="col" class="P-10px">Declarations</th>
        <th scope="col" class="P-10px">Comments</th>
    </tr>
    <tr class="Bdt-1">
        <th scope="row" class="Va-t Whs-nw P-10px">D-n</th>
        <td class="Va-t C-f2438c Whs-nw P-10px">`display: none`</td>
        <td class="Va-t P-10px"></td>
    </tr>
    <tr class="Bdt-1">
        <th scope="row" class="Va-t Whs-nw P-10px">Fz-s</th>
        <td class="Va-t C-f2438c Whs-nw P-10px">`font-size: small`</td>
        <td class="Va-t P-10px"></td>
    </tr>
    <tr class="Bdt-1">
        <th scope="row" class="Va-t Whs-nw P-10px">Fz-18px</th>
        <td class="Va-t C-f2438c Whs-nw P-10px">`font-size: 18px`</td>
        <td class="Va-t P-10px"></td>
    </tr>
    <tr class="Bdt-1">
        <th scope="row" class="Va-t Whs-nw P-10px">Td-u:h</th>
        <td class="Va-t C-f2438c Whs-nw P-10px">`text-decoration: underline`</td>
        <td class="Va-t P-10px">underlines text on mouseover [\[1\]](#footnote)<a id="footnote-1" class="D-ib"></a></td>
    </tr>
    <tr class="Bdt-1">
        <th scope="row" class="Va-t Whs-nw P-10px">Td-u:dir(rtl)</th>
        <td class="Va-t  C-f2438c Whs-nw P-10px">`text-decoration: underline`</td>
        <td class="Va-t P-10px">underlines text within a RTL context</td>
    </tr>
    <tr class="Bdt-1">
        <th scope="row" class="Va-t Whs-nw P-10px">Td-u::first-letter</th>
        <td class="Va-t  C-f2438c Whs-nw P-10px">`text-decoration: underline`</td>
        <td class="Va-t P-10px">underlines the first letter</td>
    </tr>
    <tr class="Bdt-1">
        <th scope="row" class="Va-t Whs-nw P-10px">Td-u::first-line</th>
        <td class="Va-t  C-f2438c Whs-nw P-10px">`text-decoration: underline`</td>
        <td class="Va-t P-10px">underlines the first line</td>
    </tr>
    <tr class="Bdt-1">
        <th scope="row" class="Va-t Whs-nw P-10px">Td-u::selection</th>
        <td class="Va-t  C-f2438c Whs-nw P-10px">`text-decoration: underline`</td>
        <td class="Va-t P-10px">underlines selected text</td>
    </tr>
    <tr class="Bdt-1">
        <th scope="row" class="Va-t Whs-nw P-10px">Bxs-n</th>
        <td class="Va-t  C-f2438c Whs-nw P-10px">`box-shadow: none`</td>
        <td class="Va-t P-10px"></td>
    </tr>
    <tr class="Bdt-1">
        <th scope="row" class="Va-t Whs-nw P-10px">Bxs-a--lg</th>
        <td class="Va-t  C-f2438c Whs-nw P-10px">`box-shadow: <arbitrary-value-a>`</td>
        <td class="Va-t P-10px">applies inside a "lg" breakpoint</td>
    </tr>
    <tr class="Bdt-1">
        <th scope="row" class="Va-t Whs-nw P-10px">Bxs-a:h--lg</th>
        <td class="Va-t C-f2438c Whs-nw P-10px">`box-shadow: <arbitrary-value-a>`</td>
        <td class="Va-t P-10px">applies on mouseover [\[1\]](#footnote-1)<a id="footnote" class="D-ib"></a> inside a "lg" breakpoint</td>
    </tr>
    <tr class="Bdt-1">
        <th scope="row" class="Va-t Whs-nw P-10px">Mend-0</th>
        <td class="Va-t  C-f2438c Whs-nw P-10px">`margin-right: 0`</td>
        <td class="Va-t P-10px">"end" is mapped to either "right" or "left" depending on config</td>
    </tr>
    <tr class="Bdt-1">
        <th scope="row" class="Va-t Whs-nw P-10px">Bgp-start_t</th>
        <td class="Va-t  C-f2438c Whs-nw P-10px">`background-position: left 0`</td>
        <td class="Va-t P-10px">"start" is mapped to either "left" or "right" depending on config</td>
    </tr>
    <tr class="Bdt-1">
        <th scope="row" class="Va-t Whs-nw P-10px">Ta-start</th>
        <td class="Va-t  C-f2438c Whs-nw P-10px">`text-align: left`</td>
        <td class="Va-t P-10px">"start" is mapped to either "left" or "right" depending on config</td>
    </tr>
    <tr class="Bdt-1">
        <th scope="row" class="Va-t Whs-nw P-10px">Cl-start</th>
        <td class="Va-t  C-f2438c Whs-nw P-10px">`clear: left`</td>
        <td class="Va-t P-10px">"start" is mapped to either "left" or "right" depending on config</td>
    </tr>
    <tr class="Bdt-1">
        <th scope="row" class="Va-t Whs-nw P-10px">Bdstart-0</th>
        <td class="Va-t  C-f2438c Whs-nw P-10px">`border-left: 0`</td>
        <td class="Va-t P-10px">"start" is mapped to either "left" or "right" depending on config</td>
    </tr>
</table>

<p class="noteBox info">CSS class selectors contain proper escape character where needed (i.e. `.Td-u\:h`).</p>

<hr class="Mt-50px">

<ul id="footnote" class="ul-list">
    <li>[\[1\]](#footnote-1) classes containing the string `:h` are associated with both `:hover` and `:focus` pseudo-classes; meaning the styling will apply on mouseover <em>and on focus as well</em>.</li>
</ul>