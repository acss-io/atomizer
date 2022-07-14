# Contributing

Contributions are always welcome, no matter how large or small!.

## Support

Please refer to our [Support][] page.

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

## Linting

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

## Testing

If you want to test all of the modules under `packages/`, run:

```bash
npm test
```

to test just one package (i.e, `atomizer`), run:

```bash
npm test -w atomizer
```

## Website

Local website development uses Docker to run Jekyll, [install Docker](https://docs.docker.com/get-docker/) from the install guide. After installations, run the following command to setup the site:

```bash
npm run dev
```

This will start Grunt to watch for asset changes and execute Jekyll to run the server.

[BSD license]: https://github.com/acss-io/atomizer/blob/master/LICENSE.md
[CLA]: https://yahoocla.herokuapp.com/
[monorepo]: https://en.wikipedia.org/wiki/Monorepo
[Support]: https://acss.io/support.html
[workspaces]: https://docs.npmjs.com/cli/v8/using-npm/workspaces
