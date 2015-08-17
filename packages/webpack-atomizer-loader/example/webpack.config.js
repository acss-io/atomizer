module.exports = {
    entry: './index.js',
    output: {
        path: __dirname,
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: '../lib/atomicLoader?configPath=' + __dirname + '/atomCssConfig.js!babel-loader',
            }
        ]
    }
};