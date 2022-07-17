# Contributing to Atomizer

Contributions are always welcome, no matter how large or small.

## Contributor License Agreement

If you would like to contribute a feature, resolve a bug or fix a typo, we would be happy to accept your code change. However, we will need you to "sign" a contributor license agreement (CLA) first that assigns us ownership so we can include it in the code.

When you open a pull request, a pre-written statement is included in the pull request description giving us ownership of the code under the BSD license. You must keep this statement in the description in order for your code to be included.

## Versioning

We follow [Semver 2.0.0](http://semver.org/) versioning. Make sure you always lock the versioning on the major version (e.g. `^1.1.0`). If a class name changes, the Major version will be bumped so you are aware that by upgrading to it will cause class names to break.

## Setup

Check that Node is [installed](https://nodejs.org/en/download/) with at least version >= 16.00. You can check this with `node -v`. Also ensure you have npm >= 8.0.0 installed with `npm -v`.

Before you can contribute to the codebase, you will need to fork the repo. The following steps will get you setup to contribute changes to this repo:

1. Fork the repo (click the `Fork` button at the top of the repository)
2. Clone your fork locally:
   ```bash
   # in a terminal, cd to parent directory where you want your clone to be, then
   git clone git@github.com:<your-github-username>/atomizer.git
   cd atomizer
   ```
3. Install dependencies by running `npm install`
This repository is a [monorepo] that leverages npm's [workspaces] to build and test packages together.
4. Verify you've got everything set up for local development by running `npm test`

## Development

### Packages

Atomizer uses a [monorepo] to host code for multiple packages. These packages live in the `packages` directory.

We use npm to manage installation of dependencies and running various scripts. To get everything installed, run `npm install` from the repository root.

### Examples

To play around with atomizer, test new rules or enhance existing ones, you can use our `examples` directory as your code playground. We have created simple atomizer examples for you to learn and modify.

The directory structure is as follows:

- `configs/` - A "kitchen sink" atomizer config with detailed comments on each property. Also the place to add custom values or classes for the examples.
- `css/` - A `base.css` for some simple styling across examples and an `atomic.css` file that is generated (and committed) after atomizer runs.
- `images/` - Any images used for examples.
- `*.html` - The actual html files with atomic classes.

To render the examples, execute `npm run examples`. This will run atomizer on the example html files, setup a simple dev server and open the examples page in your default browser.

Modifying the html will automatically run atomizer and live reload the page. Happy editing!

### Building

Running `npm run build` from the repository root will execute `grunt` to build atomizer and run the `build` run script of any package that defines it.

### Linting

Run `npm run lint` to lint the code base. To fix any issues just add `--fix` to the command `npm run lint -- --fix`.

### Testing

Before running the tests, you need to run a build. After you build, running `npm test` from the repo root will run every package's tests. If you want to run tests for a specific package, use `npm test -w <package-name>`:

If you want to test all of the modules under `packages/`, run:

```bash
# Test all packages
npm test

# Test only atomizer
npm test -w atomizer
```

### Website

The website is built on [Jekyll](https://jekyllrb.com/) and deployed via [GitHub Pages](https://pages.github.com/).

Local website development uses Docker to run a Jekyll container. To get setup, [install Docker](https://docs.docker.com/get-docker/) by following their guide. After installation, run the following command to build and serve the site:

```bash
npm run dev
```

This will start Grunt to watch for asset changes and execute Jekyll to run the server. Jekyll will watch for any file changes and automatically reload the browser after saving.

Once the server is started open `http://localhost:8000` to see the website locally.

The website files are located in a few directories:

- `app/` - The "References" page which uses React on the client to dynamically filter Atomizer classes
- `docs/` - The main Jekyll site that contains all the markdown files for the website

### Testing New Rules

Add new rules in `packages/atomizer/src/rules.js` and create a new example file in `examples/` eg `flex.html`.

Then run:

```bash
npm run examples
```

This will run atomizer on the example files and setup a static dev server to review the changes in your browser.

## Technical Details

### Quick CSS Glossary

```text
selector {  property: value  }
            ↑ declaration ↑
         ↑ declaration block ↑
↑__________ rule or ruleset _↑
```

## Atomic.css Generation

The generation process involves 2 main parts:

   1. **Rules & Helpers**: All CSS rules available in Atomizer. Atomic rules will map to valid standards-compliant CSS properties. Helpers are rules not related to a single CSS property, but it usually bundles some useful features you will repeteadly find in common CSS constructs (e.g. `Cf` for clearfix, `Hidden` to visually hide content from sighted users but available to screen-readers, `LineClamp` and `Ellipsis` to add ellipsis to lines of text). Both rules and helpers follow the same syntax, a simple object containing the following keys:

| Key | Description | Required | Default |
|-----|-------------|----------|---------|
| `type` | Either `helper` or `pattern` | Yes | `undefined` |
| `name` | Name of the rule/helper | Yes | `undefined` |
| `matcher` | The portion of the CSS class that maps to the unique identification of the class | Yes | `undefined` |
| `noParams` | If the class doesn't require params, this should be set to true. Only useful to helpers. | No | `false` |
| `style` | A CSS object where keys are CSS properties and values are CSS values. If a param is used you can retrieve it using `$` + `<index>`. | Yes | `undefined` |
| `arguments` | An array of objects used to define predefined values for the class. Each index in the array maps to the arguments passed. For each object, keys are names given to the predefined values and values are the CSS values of the predefined value. See example below.  |  No | `undefined` |
| `rules` | Additional CSS rules you want to add when this class is used. | No | `undefined |

Examples:

```js
{
    "type": "pattern",
    "name": "Box sizing",
    "matcher": "Bxz",
    "allowParamToValue": false,
    "styles": {
        "box-sizing": "$0"
    },
    "arguments": [{
        "cb": "content-box",
        "pb": "padding-box",
        "bb": "border-box"
    }]
}
```

```js
{
    "type": "helper",
    "name": "Clearfix",
    "matcher": "Cf",
    "noParams": true,
    "styles": {
        "zoom": 1
    },
    "rules": {
        ".Cf:before, .Cf:after": {
            "content": "\" \"",
            "display": "table"
        },
        ".Cf:after": {
            "clear": "both"
        }
    }
}
```

   2. Configuration: This is the actual source of truth for Atomizer when creating the CSS. It is a simple JS object containing 4 keys: `custom`, `breakPoints`, `classNames`, and `exclude`. The configuration file will come from the consumer of atomizer. It can be manually passed, automatically generated after scanning files or a mix of both (e.g. Manually create a config file, define some custom classes, and let the tool find the classes in my project and merge the results in a final config output). Please note that classes defined in `custom` won't be generated in the final CSS unless they are **used** (passed in `classNames`). Please see example config file as it contains useful comments to understand what each key does.

Example: https://github.com/yahoo/atomizer/blob/master/examples/config/atomizer.js

[BSD license]: https://github.com/acss-io/atomizer/blob/master/LICENSE.md
[monorepo]: https://en.wikipedia.org/wiki/Monorepo
[Support]: https://acss.io/support.html
[workspaces]: https://docs.npmjs.com/cli/v8/using-npm/workspaces
