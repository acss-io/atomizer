const path = require('path');
const webpack = require('webpack');

module.exports = [
    {
        devtool: 'source-map',
        entry: {
            main: './app/client-reference.js',
            repl: './app/assets/js/repl.js',
            search: './app/assets/js/search.js',
        },
        mode: 'development',
        module: {
            rules: [{ test: /\.jsx?$/, exclude: /node_modules/, use: { loader: 'babel-loader' } }],
        },
        name: 'dev',
        output: {
            path: path.resolve(__dirname, 'docs', 'assets', 'js'),
            publicPath: '/public/js/',
            filename: '[name].js',
            chunkFilename: '[name].js',
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('development'),
                },
            }),
        ],
        resolve: {
            extensions: ['', '.js', '.jsx'],
        },
        stats: {
            colors: true,
        },
        watch: true,
    },
    {
        entry: {
            main: './app/client-reference.js',
            repl: './app/assets/js/repl.js',
            search: './app/assets/js/search.js',
        },
        mode: 'production',
        module: {
            rules: [{ test: /\.jsx?$/, exclude: /node_modules/, use: { loader: 'babel-loader' } }],
        },
        name: 'prod',
        output: {
            path: path.resolve(__dirname, 'docs', 'assets', 'js'),
            publicPath: '/public/js/',
            filename: '[name].js',
            chunkFilename: '[name].js',
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production'),
                },
            }),
        ],
        resolve: {
            extensions: ['', '.js', '.jsx'],
        },
        stats: 'errors-only',
    }
];