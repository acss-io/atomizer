# atomizer-plugins > rollup

## Run the example

Assuming you installed the dependencies at the root of the repository, you can generate the CSS via the following run script:

```shell
npm run dev
```

Rollup will run in `watch` mode and auto re-compile changes. Open the `index.html` in your browser to see the example.

## Files

-   `index.html` - HTML page to execute the bundled `dist/main.js` file
-   `index.js` - Simulates creating HTML via JS with Atomizer CSS classes included
-   `rollup.config.mjs` - Rollup config using the `atomizer-plugins` package
