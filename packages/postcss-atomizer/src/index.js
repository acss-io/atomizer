const { buildAtomicCss, getConfig, findFiles } = require('atomizer/src/build.js');

/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (options = {}) => {
    const finalOptions = {
        quiet: true,
        ...options,
    };
    const config = getConfig(finalOptions.config);
    const files = findFiles(config.content);
    return {
        postcssPlugin: 'postcss-atomizer',
        Root(root) {
            root.append(buildAtomicCss(files, config, finalOptions));
        },
    };
};

module.exports.postcss = true;
