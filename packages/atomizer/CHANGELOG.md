# atomizer

## 3.19.0

### Minor Changes

-   a6fdfc9: feat(atomizer): add calculatePercentage rule param

## 3.18.2

### Patch Changes

-   f9a0f83: fix(atomizer): show hex value in warning

## 3.18.1

### Patch Changes

-   a6231b3: fix: Updates the `Jc(s)` class to match the other alignment properties (`Ai(s)`, `As(s)`) so that `s` matches `start`. If you need `stretched`, please update your code to `Jc(st)`. We were comfortable making this change as a patch as usage is low for this property and value combination.

## 3.18.0

### Minor Changes

-   4729532: feat: We have a new `content` option property as part of the `atomizer.config.js` file. Which lets you configure various paths to source files for your project. Please take a look at the [Content guide](https://acss.io/content.html) for more info.

## 3.17.0

### Minor Changes

-   f4dffac: feat: add scroll snap support. Read the [Scroll Snap](https://acss.io/tutorials/scroll.html) docs for details and examples.

## 3.16.2

### Patch Changes

-   3618913: fix: add style block for Cf helper to generate Cf styles properly

## 3.16.1

### Patch Changes

-   fix: align-items incorrect values

## 3.16.0

### Minor Changes

#### Old IE Removed

-   0a84cbc: feat: The `--ie` [has been removed](https://github.com/acss-io/atomizer/pull/448) and will no longer add IE hacks for versions < 8.

#### New Classes

-   389b42e: feat: Updated the box alignment logic to match the spec. Check out the [Alignment guide](https://acss.io/tutorials/alignment.html) for more info
-   3b44d94: feat: Added `outline-offset` rule
-   5b2f69c: feat: Added blend modes
-   2b0409a: feat: Added missing pseudo elements

## 3.15.0

### Minor Changes

#### Features

-   cdedcd2: feat: add more global values
-   8cca57a: feat: add `gap` and `row-gap` styles

#### Misc

-   6c073ac: docs: clean up readme

## 3.14.1

### Patch Changes

-   b8fcfd3: feat: add clip-path support (#409)

## 3.14.0

### Minor Changes

-   71e9a5a: feat: support aspect-ratio css property
-   438a0e9: chore: update minimist

## 3.13.0

### Minor Changes

-   d8b3f6f: feat: Add allowParamToValue for `Colmg` and `Colmw`

## 3.12.0

### Minor Changes

#### Features

-   074f034: chore: Updating dependencies

## 3.11.0

### Minor Changes

-   850f868: feat: Adding support for css variables

## 3.10.0

### Minor Changes

-   9a1762c: feat: Adding column rules
-   13360c0: chore: update deps
-   44d02c9: chore: Bump path-parse from 1.0.6 to 1.0.7
-   c31cf6a: chore: Bump glob-parent from 5.1.1 to 5.1.2
-   844ef9d: chore: ignore test files
-   3338d7a: ci: migrate to github actions

## 3.9.2

### Patch Changes

-   b91fa8c: fix: Deep clone of config to prevent mutation of original config - (thanks @snyamathi!)

## 3.9.1

### Patch Changes

-   fix: Adding TypeScript definition for `bumpMQ` in `CSSOptions`.

## 3.9.0

### Minor Changes

-   87fbfc5: feat: New option (CLI: `--bump-mq`) for adding a small amount of specificity weight to media queries

## 3.8.0

### Minor Changes

-   4588cd6: feat: Added support for custom value substitution within custom values via `#{ }` syntax

## 3.7.3

### Patch Changes

-   0cc4c10: feat: Added support for `focus-visible` pseudo class (thanks @roderickhsiao!)

## 3.7.2

### Patch Changes

-   a5db4f1: fix: Typo in command line script (thanks @fidian!)
-   039e574: fix: Made grammar more specific to match `=` only when used as part of a `class` attribute (thanks @snyamathi!)

## 3.7.1

### Patch Changes

-   bc5f85a: feat: Added `=` as a valid boundary for detecting Atomic classes (thanks @snyamathi!)

## 3.7.0

### Minor Changes

-   9937fad: feat: Handling edge cases for invalid values in classes (thanks @tom76kimo!)
-   5bfe612: feat: Adding support for multiple interpolations of values into rule styles (thanks @nsaunders!)

## 3.6.3

### Patch Changes

-   e41b540: feat: Added support for `:placeholder-shown` pseudo class (thanks @nspector!)
-   39931fa: fix: Fixed issue with processing of invalid Atomic classes

## 3.6.2

### Patch Changes

-   9547124: feat: Adding support for `object-fit` via `Objf()` syntax (thanks @snyamathi!)

## 3.6.1

### Patch Changes

-   dcb51db: feat: Add support for more `justify-content` attributes (thanks @roderickhsiao!)

## 3.6.0

### Minor Changes

-   feat: Adds support for `-w`/`--watch` option so you can automatically re-atomize as your source files change (thanks @fidian!)
-   feat: Adds support for `focus-within` pseudo class (`:fw`) (thanks @nspector!)

## 3.5.3

### Patch Changes

-   b20a4ed: feat(cli): Only write CSS to file if the contents have changed (thanks @sarbbottam!)

## 3.5.2

### Patch Changes

-   fix: Ensure pseudo class sorting is only done within a common class matcher (thanks @roderickhsiao!)

## 3.5.1

### Patch Changes

-   fix(cli): Fixed bug with use of equal sign in command line params

## 3.5.0

### Minor Changes

**New Features:**

-   140d836: feat: CLI tool now has an `--exclude` option for excluding files from processing. Thanks @roderickhsiao!
-   812e0d1: feat: CLI tool now has a `--quiet` option to hush warnings. Thanks @orgoj!

**Bug fixes:**

-   7df3197: feat: Classes using pseudo-classes are now sorted (#334). Thanks @roderickhsiao, @idmytro, and @chhavi-khandelwal!

**Etc:**

-   chore: Updated various dependencies and dev dependencies
-   chore: Updated testing matrix for modern NodeJS

## 3.4.9

### Patch Changes

-   feat: Added a `shorthand` property to the rules definition for styles that represent shorthand styles. This is not used currently by Atomizer, but may be at a future date.

## 3.4.8

### Patch Changes

-   feat: Allowing `paramToValue` for `vertical-align`

## 3.4.7

### Patch Changes

-   feat: Adds support for Emmet-style syntax for `flex` styles (`Fx*`). Previous syntax (`Flx*`) is now deprecated. (thanks @idmytro!)
-   feat: Adds support for parsing template syntax (backtick) for Atomic classes (thanks @roderickhsiao!)

## 3.4.6

### Patch Changes

-   feat: Added support for general sibling selector (`~`) - PR #303

## 3.4.5

### Patch Changes

-   chore: Upgrade `lodash` dependency to 4.0 (thanks @roderickhsiao!)
-   feat: Add metadata to helper class configuration to assist in documentation generation

## 3.4.4

### Patch Changes

-   fix: More defensive iteration on `options.breakPoints` in `JSS.jssToCss()` when API is called directly (not by Atomizer)

## 3.4.2

### Patch Changes

-   feat: Added new rule for `resize` style (thanks @roderickhsiao!)

## 3.4.1

### Patch Changes

-   feat: Optimized CSS output to no longer render media queries that aren't being used (thanks @roderickhsiao!)

## 3.4.0

### Minor Changes

-   9792180: feat: Changed ordering of media query (thanks @johnnorris!)

## 3.3.12

### Patch Changes

-   fix: Support for breakpoint mapping within custom value configuration (thanks @johnnorris!)

## 3.3.11

### Patch Changes

-   feat: Added support for `::placeholder` pseudo-element

## 3.3.10

### Patch Changes

-   feat: Classnames are now sorted alphabetically in config output

## 3.3.8

### Patch Changes

-   feat: Adds support for `appearance` (`Ap()`)

## 3.3.7

### Patch Changes

-   fix: `LineClamp()` has been patched to address an issue introduced with Firefox 49 that could cause incorrect wrapping of `inline-block` child elements

## 3.3.6

### Patch Changes

-   feat: Added support for CSS Containment property: `contain` (`Ctn`). More info on CSS Containment here: https://developers.google.com/web/updates/2016/06/css-containment?hl=en
-   refactor: Changed rule for `transition-property` (`Trsp`) to no longer allow param-to-value, since valid values are string-based and thus confused for custom values.

## 3.3.5

### Patch Changes

-   fix: In certain scenarios Atomizer would produce inconsistently ordered CSS depending on what classes it encountered first while parsing source files. This could cause media query-triggered classes to not apply as expected due to source ordering. Media queries are now rendered into the stylesheet last.
-   feat: The value `initial` is now supported by the `Miw` (`min-width`) class, using abbreviation `ini`. (Thanks @longlho!)
-   feat: Uppercase hex values now produce a warning. Previously these values would not be matched during source file parsing and fail silently. (Thanks @samlecuyer!)

## 3.3.4

### Patch Changes

-   Fixing parsing issue with classes that include numbers in their prefixes (eg, `Translate3d()`)

## 3.3.3

### Patch Changes

-   feat: Added `if` (`inline-flex`) argument to `display` (`D`) (thanks @lukebrooker!)
-   feat: Added link to Gulp plugin to README (thanks @pankajparashar!)
-   feat: Breakpoints may now use uppercase characters (thanks @alexnj!)

## 3.3.2

### Patch Changes

-   feat: Changed arguments for `Maw()` (max-width) to include `none` and remove `auto`, which is not valid per spec.

## 3.3.1

### Patch Changes

-   fix: dependency on XRegEx when using Atomizer in the browser

## 3.3.0

### Minor Changes

-   feat: Added support for `content` style (`Cnt`)
-   feat: Added support for pseudo-elements: `before` (`::b`), `after` (`::a`), `first-letter` (`::fl`) and `first-line` (`::fli`)
-   feat: Added new options for `background-position` (`Bgp`)

## 3.2.1

### Patch Changes

-   fix: Fixes fatal error when a class uses an undefined custom value and `!important`

## 3.2.0

### Minor Changes

-   feat: In order to ensure better compatibility with old IE browsers, selectors containing escaped colons (eg, classes that use pseudo classes/elements) no longer have their declarations combined with other selectors. This due to the fact that IE < 8 will ignore the entire declaration block if any one of the selectors in that declaration contain an escaped colon.
-   feat: Added the closing curly brace (`}`) as a valid boundary character when parsing input files for Atomic classnames. This is particularly helpful when working with template languages such as Dust.

## 3.1.3

### Patch Changes

-   feat: Adding rule for `list-style-position` (classname `Lisp()`)

## 3.1.2

### Patch Changes

-   fix: Changed rule for `Bgp()` (`background-position`) to allow param-to-value and multiple params

## 3.1.1

### Patch Changes

-   feat: Adds support for `border-spacing` style
-   fix: CSS generation issue with styles that accept a variable number of values, eg `border-spacing`

## 3.1.0

### Minor Changes

-   feat: Added rules for SVG-related styles (fill, stroke, stroke-width, stroke-linecap, stroke-linejoin)
-   feat: Improved rule conflict detection
-   feat: CLI support for adding custom rules
-   fix: Improved logic for parsing Atomic classnames

## 3.0.6

### Patch Changes

-   feat: Reordered rules for border, margin, padding to ensure less specific classes can be overridden by more specific classes.

## 3.0.5

### Patch Changes

-   fba2b7b: feat: Allow param to value for `transition-property`.

## 3.0.4

### Patch Changes

-   6d985c7: fix; Removed param to value from matrix function (Thanks @roderickhsiao).
-   669f8e3: feat: Added support for Bd(0) and Bd(n).

## 3.0.3

### Patch Changes

-   2ed8de8: feat: Added support for color keywords (Thanks @corysimmons!)
-   8c53b09: feat: Added `exclude` support in the config object.

## 3.0.2

### Patch Changes

-   d51522e: feat: Breakpoints can now contain numeric values. (Thanks @3den!)

## 3.0.1

### Patch Changes

-   feat: Rules that don't require param now need to set `noParams` to `true`.
-   perf: Performance optimizations to `parseConfig`.

## 3.0.0

### Major Changes

-   feat: Opacity now gives IE fallback if --ie option is passed.
-   feat: Version 3.0.0 official release.

## 3.0.0-alpha.7

### Prerelease Changes

-   fix: Regression hotfix related to PR #181, fixed in PR #183.

## 3.0.0-alpha.6

### Prerelease Changes

-   feat: Bgz should accept custom values: PR #176. Thanks @markk!
-   refactor: Grammar code in atomizer.js. This change should be invisible to the user but it greatly improves the quality of the code. Thanks @3den! PR #181.
-   feat: Custom values now accept break points in the config. For more information see Issue #178. PR #182.

## 3.0.0-alpha.5

### Prerelease Changes

-   fix: Add missing quotes around value of content property. PR #175.

## 3.0.0-alpha.4

### Prerelease Changes

-   feat: New format for rules.js and helpers.js PR #169 + Issue #133, thanks @3den.
-   feat: Added aliases for function values (Rotate, Scale, Blur, etc) PR #172.
-   feat: Added missing helper classes PR #173.
-   feat: Added support for old IE via `--ie` flag PR #174, Issue #80.
-   feat: Added default value for all props `inherit`. PR #170.
-   feat: Better format for the CLI output. PR #174.
-   fix: Small bug fix to parseConfig when no option is passed PR #171.

## 3.0.0-alpha.3

### Prerelease Changes

-   feat: Making 2nd argument to `parseConfig()` optional
-   fix: Reverting `LineClamp` fix

## 3.0.0-alpha.2

### Prerelease Changes

-   5d8327d: fix: Being more defensive when no classnames are passed
-   f7904b4: feat: `Bdsw` is now `Bdstartw`, following class name syntax PR
-   6749f20: feat: parent-namespaced classes with predefined values should have important
-   1c65756: feat: \$ symbol in custom is now correctly generated in CSS
-   f58ac4b: feat: `LineClamp` helper fix for Chrome with `display: flex`

## 3.0.0-alpha.1

### Premajor Changes

-   feat: Major update with a new parenthesis-based syntax for Atomic classes.

## 2.0.0-beta.10

### Prerelease Changes

-   fix: Changing some rule prefixes to no longer include a dot
-   fix: Cleanup of rules
-   fix: for CSS output of rules sharing partial declarations (eg, `LineClamp`)
-   feat: Updating rules for `letter-spacing`, `cursor`, `background-position`
-   feat: Disable namespacing when contextual selectors are used

## 2.0.0-beta.9

### Prerelease Changes

-   feat: Removed dependency on AbsurdJS

## 2.0.0-beta.8

### Prerelease Changes

-   chore: Locking down dependency on AbsurdJS
-   feat: New rules for `text-overflow`, `text-indent`

## 2.0.0-beta.7

### Prerelease Changes

-   Fix pseudo class matching PR #134. Thanks @ktslwy!

## 2.0.0-beta.6

### Prerelease Changes

-   feat: Parent selectors
-   feat: Added sibling combinator
-   feat: Added ability to have exclusive decimal number value. (e.g. `Trsdu-.3s` and `Op-.3`)

## 2.0.0-beta.5

### Prerelease Changes

-   fix: Hot fix for start and end keywords that broke on beta.4

## 2.0.0-beta.4

### Prerelease Changes

-   feat: Bringing back `mergeConfigs()` API on `utils` object
-   feat: Hex values in suffixes are now prefixed with a `#` to distinguish them from numeric custom suffixes
-   feat: `rgba()` support for colors in classnames (eg `C-#333.8` for 80% alpha)
-   fix: Minor cleanup and bug fixes

## 2.0.0-beta.3

### Prerelease Changes

-   feat: Added ability to declare entire classnames as 'custom', rather than just suffixes

## 2.0.0-beta.2

### Prerelease Changes

-   feat: Major changes to APIs
-   feat: Major rewrite of configuration. Now much more simple and concise (no more overly verbose objects!)
-   fix: Lots of bugs fixed

## 2.0.0-alpha.3

### Prerelease Changes

-   feat: New `border` related rules added to ruleset
-   fix: Bug fix for `mergeConfigs()` when used with empty configs
-   fix: Removing helper classes from ruleset
-   feat: Moving configuration of breakpoints back into config object under `breakPoints` property

## 2.0.0-alpha.2

### Prerelease Changes

-   feat: Added `mergeConfigs()` API

## 2.0.0-alpha.1

### Premajor Changes

First alpha release of 2.0 includes:

-   General configuration is no longer passed in the `config` property of the config object. Instead, the values previously found within that object are now considered "options".
-   `defaults` options/config was not being used, and has been removed from examples. We'll see if it makes a comeback at some point.
-   CLI no longer requires a config file to be passed
-   RTL processing now triggered via a bool option called `rtl`. `start` and `end` options have been removed in favor of `rtl`.

Still to come in future alpha releases:

-   Better CLI support for options (`namespace`, `breakPoints`, etc)
-   Enhanced breakpoint support
-   Pseudo-class support
-   Contextual selector support?

## 1.0.0

### Major Changes

-   feat: Added support for automatic configuration generation via parsing of text files. Atomizer now exports the following methods:
    -   `parse()`: Parses text files for Atomic CSS classes and returns them in an array
    -   `getConfig()`: Generates Atomizer configuration from an array of Atomic CSS classes
    -   `createCSS()`: Generates Atomic CSS from configuration

## 0.2.5

### Patch Changes

-   fix: Ruleset for `vertical-align` to allow custom values

## 0.2.4

### Patch Changes

-   27f0d25: feat: Added `allowSuffixToValue` to each rule. Now it is possible to know if the rule can convert valid suffix values to the actual values that will be applied to the property.

## 0.2.3

### Patch Changes

-   chore: AbsurdJS dependency upgrade for better client-side support.

## 0.2.2

### Patch Changes

-   chore: Updating dependency on lodash, dev dependency on chai, sinon-chai

## 0.2.1

### Patch Changes

-   e597065: BreakPoints on custom patterns should now be correctly applied.