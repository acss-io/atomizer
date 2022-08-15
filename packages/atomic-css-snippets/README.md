# Atomic CSS Snippets

## Features

Provides autocomplete snippets for Atomic CSS classes for the following file types:

-   JavaScript (.js)
-   HTML (.html)
-   Marko (.marko)
-   PHP (.php)
-   React (.jsx/.tsx)
-   Svelte (.svelte)
-   TypeScript (.ts)

Note: In order to use this extension for Svelte and Marko, you will first need to install the respective programming language extensions for VSCode.

## Usage

Simply start typing a style such as `margin` and the related Atomic CSS classnames will be recommended in a quick suggestion.

<img src="https://s.yimg.com/cv/apiv2/acss-io/atomic-css-snippets-1.0.0.gif" alt="Atomic CSS Snippets" />

## Requirements

In order for snippets to work inside quotes, you will need to enable the following setting in settings.json:

```json
"editor.quickSuggestions": {
    "strings": true
}
```
