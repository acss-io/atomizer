# atomizer-plugins > webpack

## Run the example

Assuming you installed the dependencies at the root of the repository, you can generate the CSS via the following run script:

```shell
npm run dev
```

Webpack will run in `watch` mode and re-compile when changes are made. Open the `index.html` in your browser to see the example.

## Files

-   `atomizer.config.mjs` - Contains Atomizer configuration
-   `index.html` - HTML page to execute the webpack JS file
-   `index.js` - Simulates creating HTML via JS with Atomizer CSS classes included
-   `webpack.config.mjs` - Webpack config using the `atomizer-plugins` package
