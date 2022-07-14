# Contributing

Contributions are always welcome, no matter how large or small!.

## Support

Please refer to our [Support][] page.

## Versioning

The tool follows [Semver 2.0.0](http://semver.org/) versioning. Make sure you always lock the versioning on the major version (e.g. `^1.1.0`). If a class name changes, the Major version will be bumped so you are aware that by upgrading to it will cause class names to break.

## Development

Check that Node is [installed](https://nodejs.org/en/download/) with version >= 16.00. You can check this with `node -v`. Ensure you also have npm >= 8.0.0 installed with `npm -v`.

### Setup

Fork the atomizer repository to your GitHub Account.

Then, run:

```bash
git clone git@github.com:<your-github-username>/atomizer.git
cd atomizer
npm install
```

This repository is a [monorepo][] that leverages npm's [workspaces][] to build and test packages together.

### Linting

If you want to lint all of the modules under `packages/`, run:

```bash
npm run lint
```

to lint just one package (i.e, `atomizer`), run:

```bash
npm run lint -w atomizer
```

to fix lint issues, run:

```bash
npm run lint:fix
```

### Testing

If you want to test all of the modules under `packages/`, run:

```bash
npm test
```

to test just one package (i.e, `atomizer`), run:

```bash
npm test -w atomizer
```

### Website

Local website development uses Docker to run Jekyll, [install Docker](https://docs.docker.com/get-docker/) from the install guide. After installations, run the following command to setup the site:

```bash
npm run dev
```

This will start Grunt to watch for asset changes and execute Jekyll to run the server.

The website files are located in a few directories:

- `app/` - The "References" page which uses React on the client to dynamically filter Atomizer classes
- `docs/` - The main Jekyll site that contains all the markdown files for the website

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

Example: https://github.com/yahoo/atomizer/blob/master/examples/example-config.js

[BSD license]: https://github.com/acss-io/atomizer/blob/master/LICENSE.md
[CLA]: https://yahoocla.herokuapp.com/
[monorepo]: https://en.wikipedia.org/wiki/Monorepo
[Support]: https://acss.io/support.html
[workspaces]: https://docs.npmjs.com/cli/v8/using-npm/workspaces
