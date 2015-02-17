# Atomic class names

Atomic.css class names ultimately increase the speed of development as they follow a consistent and easy to remember syntax. The inspiration comes from [Emmet](http://emmet.io/), a plugin for many popular text editors which greatly improves HTML & CSS workflow.

It might take you a short time to get familiar with these class names but as soon as you start using them you'll be at full speed in no time.

Make sure you check the [reference page](/reference), so you can quickly search for properties, values or class names themselves.

## Syntax

<pre>
.<strong>Property</strong>-<strong>value_identifier</strong><em>[:pseudo-class][::pseudo-element][--breakpoint_identifier]</em>
</pre>

Where:

<dl>
    <dt>Property</dt>
    <dd>[capitalized](http://en.wikipedia.org/wiki/Capitalization) following [Emmet](http://docs.emmet.io/cheat-sheet/) syntax with no separator between words such as dashes or new capitals. For any occurrences of `left` and `right` keywords or its abbreviated form in [Emmet](http://docs.emmet.io/cheat-sheet/) `l` and `r`, the `start` and `end` keywords should be used respectively. e.g. `Mend`, `Bdstart`, etc.</dd>
    <dt>-value\_identifier</dt>
    <dd>Value identifier should be written in lowercase following [Emmet](http://docs.emmet.io/cheat-sheet/) syntax. For any occurrences of `left` and `right` keywords, `start` and `end` should be used respectively. **Values that are not present in Emmet** should be named using the rules below:
    <ul>
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

Examples:

   * `D-n`: `.selector {display: none}`
   * `Fz-s`: `.selector {font-size: small}`
   * `Td-u:hover`: `.selector:hover {text-decoration: underline}`
   * `Td-u:focus`: `.selector:focus {text-decoration: underline}`
   * `Td-u:dir(rtl)`: `.selector:dir(rtl) {text-decoration: underline}`
   * `Td-u:hover::after`: `.selector:hover::after {text-decoration: underline}`
   * `Td-u::after`: `.selector::after {text-decoration: underline}`
   * `Td-u::before`: `.selector::before {text-decoration: underline}`
   * `Td-u::first-letter`: `.selector::first-letter {text-decoration: underline}`
   * `Td-u::first-line`: `.selector::first-line {text-decoration: underline}`
   * `Td-u::selection`: `.selector::selection {text-decoration: underline}`
   * `Bxs-n`: `.selector {box-shadow: none}`
   * `Bxs-a--lg`: `@media (min-width: 1200px) {.selector {box-shadow: arbitrary-value-a}}`
   * `Bxs-b--lg`: `@media (min-width: 1200px) {.selector {box-shadow: arbitrary-value-b}}`
   * `Bxs-a:hover--lg`: `@media (min-width: 1200px) {.selector:hover {box-shadow: arbitrary-value-a}}`
   * `Mend-0`: `.selector {margin-end: 0}`
   * `Bgp-start_t`: `.selector {background-position: left 0}`
   * `Ta-start`: `.selector {text-align:left}`
   * `Cl-start`: `.selector {clear:left}`
   * `Bdstart-0`: `.selector {border-left:0}`