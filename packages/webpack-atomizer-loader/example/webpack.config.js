const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: `${__dirname}/index.js`,
    output: {
        path: __dirname,
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: '../dist/atomicLoader',
                options: {
                    postcssPlugins: [autoprefixer],
                    minimize: true,
                    configPath: [path.resolve('./atomCssConfig.js'), path.resolve('./atomCssConfig2.js')],
                },
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/react'],
                },
            },
        ],
    },
};
