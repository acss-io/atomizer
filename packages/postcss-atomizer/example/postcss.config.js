const atomizerPlugin = require('postcss-atomizer');

const atomizer = atomizerPlugin();

module.exports = {
    plugins: [atomizer],
};
