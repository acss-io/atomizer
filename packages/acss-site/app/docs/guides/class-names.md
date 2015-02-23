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
    <dd>optional suffix indicating that this class applies to a [pseudo-classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes) only. This should be all lower-case with no abbreviations. Words should be separated by one dash, exactly like the original pseudo class (e.g. `Td-u:hover`, `Td-u:only-child`).</dd>
    <dt>[::pseudo-element]</dt>
    <dd>optional suffix indicating that this class applies to [pseudo-elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements) only. This should be all lower-case with no abbreviations. Words should be separated by one dash, exactly like the original pseudo element (e.g. `Td-u::before`).</dd>
    <dt>[--breakpoint_identifier]</dt>
    <dd>optional property suffix that adds the breakpoint context to the rule. A breakpoint indicates that this rule will only take effect within a CSS media query breakpoint. Valid values are `sm` for small, `md` for medium and `lg` for large. The length values of each breakpoint are defined in the config object.</dd>
</dl>

### Examples:

<dl class="dl-list M-0 Pt-20px">
    <dt class="Pend-10px Fl-start Cl-start">D-n</dt>
    <dd class="Ov-h Reset C-f2438c">`display: none`</dd>
    <dt class="Fl-start Cl-start">Fz-s</dt>
    <dd class="Ov-h Reset C-f2438c">`font-size: small`</dd>
    <dt class="Fl-start Cl-start">Td-u:hover</dt>
    <dd class="Ov-h Reset C-f2438c">`text-decoration: underline` /\* on mouseover \*/</dd>
    <dt class="Fl-start Cl-start">Td-u:dir(rtl)</dt>
    <dd class="Ov-h Reset C-f2438c">`text-decoration: underline` /\* in a RTL context \*/</dd>
    <dt class="Fl-start Cl-start">Td-u::first-letter</dt>
    <dd class="Ov-h Reset C-f2438c">`text-decoration: underline` /\* first letter \*/</dd>
    <dt class="Fl-start Cl-start">Td-u::first-line</dt>
    <dd class="Ov-h Reset C-f2438c">`text-decoration: underline` /\* first line \*/</dd>
    <dt class="Fl-start Cl-start">Td-u::selection</dt>
    <dd class="Ov-h Reset C-f2438c">`text-decoration: underline` /\* selected text \*/</dd>
    <dt class="Fl-start Cl-start">Bxs-n</dt>
    <dd class="Ov-h Reset C-f2438c">`box-shadow: none`</dd>
    <dt class="Fl-start Cl-start">Bxs-a--lg</dt>
    <dd class="Ov-h Reset C-f2438c">`box-shadow: <arbitrary-value-a>` /\* inside "lg" breakpoint \*/</dd>
    <dt class="Fl-start Cl-start">Bxs-a:hover--lg</dt>
    <dd class="Ov-h Reset C-f2438c">`box-shadow: <arbitrary-value-a>` /\* on mouseover inside "lg" breakpoint \*/</dd>
    <dt class="Fl-start Cl-start">Mend-0</dt>
    <dd class="Ov-h Reset C-f2438c">`margin-right: 0` /\* in a LTR context \*/</dd>
    <dt class="Fl-start Cl-start">Bgp-start_t</dt>
    <dd class="Ov-h Reset C-f2438c">`background-position: left 0` /\* in a LTR context \*/</dd>
    <dt class="Fl-start Cl-start">Ta-start</dt>
    <dd class="Ov-h Reset C-f2438c">`text-align: left` /\* in a LTR context \*/</dd>
    <dt class="Fl-start Cl-start">Cl-start</dt>
    <dd class="Ov-h Reset C-f2438c">`clear: left` /\* in a LTR context \*/</dd>
    <dt class="Fl-start Cl-start">Bdstart-0</dt>
    <dd class="Ov-h Reset C-f2438c">`border-left: 0` /\* in a LTR context \*/</dd>
</dl>
