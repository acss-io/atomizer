const path = require('path');
const webpack = require('webpack');

const baseConfig = {
    entry: {
        copyCode: './app/assets/js/copy-code.js',
        page: './app/assets/js/page.js',
        main: './app/client-reference.js',
        repl: './app/assets/js/repl.js',
        search: './app/assets/js/search.js',
    },
    module: {
        rules: [{ test: /\.jsx?$/, exclude: /node_modules/, use: { loader: 'babel-loader' } }],
    },
    output: {
        path: path.resolve(__dirname, 'docs', 'assets', 'js'),
        publicPath: '/public/js/',
        filename: '[name].js',
        chunkFilename: '[name].js',
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
};

module.exports = [
    {
        ...baseConfig,
        devtool: 'source-map',
        mode: 'development',
        name: 'dev',
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('development'),
                },
            }),
        ],
        stats: {
            colors: true,
        },
        watch: true,
    },
    {
        ...baseConfig,
        mode: 'production',
        name: 'prod',
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production'),
                },
            }),
        ],
        stats: 'errors-only',
    },
];
