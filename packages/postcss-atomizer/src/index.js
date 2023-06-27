const { buildAtomicCss, getConfig, findFiles } = require('atomizer/src/build.js');
const { resolve } = require('path');

/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (options = {}) => {
    const finalOptions = {
        quiet: true,
        ...options,
    };
    return {
        postcssPlugin: 'postcss-atomizer',
        Root(root, { result }) {
            const config = getConfig(finalOptions.config);
            const files = findFiles(config.content);

            // register dependency so atomizer is re-run when the file changes
            // @see https://postcss.org/docs/writing-a-postcss-plugin#step-change-nodes
            for (const file of files) {
                result.messages.push({
                    file: resolve(file),
                    parent: result.opts.from,
                    plugin: 'atomizer',
                    type: 'dependency',
                });
            }

            root.append(buildAtomicCss(files, config, finalOptions));
        },
    };
};

module.exports.postcss = true;
