const { buildAtomicCss, getConfig, findFiles } = require('atomizer/src/build.js');

/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (options = {}) => {
    const config = getConfig(options.config);
    const files = findFiles(config.content);
    return {
        postcssPlugin: 'postcss-atomizer',
        Root(root) {
            root.append(buildAtomicCss(files, config, options));
        },
    };
};

module.exports.postcss = true;
