'use strict';

import Atomizer, { CSSOptions } from 'atomizer';
import cssnano from 'cssnano';
import { getOptions } from 'loader-utils';
import postcss from 'postcss';

import { writeCssFile, ensureExists } from './utils';

const DEFAULT_CSS_DEST: string = './build/css/atomic.css';
const DEFAULT_POSTCSS_PLUGIN_LIST: string[] = [];

// cached response to prevent unnecessary update
let cachedResponse: string = '';

const atomizer = new Atomizer({ verbose: true });
const classNamesObject = {};

interface ConfigObject {
    default: object;
}

// Hash to keep track of config loaded by path
let configObject: ConfigObject = {
    default: {
        configs: {
            classNames: [],
        },
    },
};

interface PathConfigOption extends CSSOptions {
    rules: string;
}

interface PathConfig {
    configs: object;
    cssDest: string;
    options: PathConfigOption;
}

const parseAndGenerateFile = function (
    config: PathConfig,
    source: string,
    validPostcssPlugins = [],
    minimize: boolean = false
): Promise<void> {
    return new Promise((resolve, reject) => {
        // custom rules file
        if (config.options && config.options.rules) {
            atomizer.addRules(
                typeof config.options.rules === 'string'
                    ? require(require.resolve(config.options.rules))
                    : config.options.rules
            );
        }

        const foundClasses = atomizer.findClassNames(source);
        let cssDest = config.cssDest || DEFAULT_CSS_DEST;

        if (!ensureExists(cssDest)) {
            console.warn('[atomic loader] create css failed.');
            return;
        }

        const finalConfig = atomizer.getConfig(foundClasses, config.configs || {});
        Object.assign(
            classNamesObject,
            Object.fromEntries(finalConfig.classNames.map((className) => [className, true]))
        );
        const cssString: string = atomizer.getCss(
            { ...finalConfig, classNames: Object.keys(classNamesObject) },
            config.options || {}
        );

        const pipeline = postcss(validPostcssPlugins);
        if (minimize) {
            pipeline.use(cssnano());
        }

        pipeline.process(cssString, { from: undefined }).then((result) => {
            const { css = '' } = result;

            if (css === cachedResponse) {
                return resolve();
            }

            writeCssFile(cssDest, css)
                .then(() => {
                    cachedResponse = css;
                    return resolve();
                })
                .catch((err) => reject(err));
        });
    });
};

const atomicLoader = function (source, map) {
    const callback = this.async();
    if (this.cacheable) {
        this.cacheable();
    }

    const query = getOptions(this) || {};
    const { config, configPath = [], minimize = false, postcssPlugins = [] } = query;
    const validPostcssPlugins = Array.isArray(postcssPlugins) ? postcssPlugins : DEFAULT_POSTCSS_PLUGIN_LIST;
    const addDependency = this.addDependency;

    let configs = [
        ...[].concat(configPath).map((configPath) => {
            // for watch mode
            if (addDependency) {
                addDependency(configPath);
            }
            return require(require.resolve(configPath));
        }),
        ...(config !== undefined ? [config] : []),
    ];

    if (configs.length === 0) {
        configs.push(configObject.default);
    }

    const tasks: Promise<void>[] = configs.map((config) => {
        return parseAndGenerateFile(config, source, validPostcssPlugins, minimize);
    });

    Promise.all(tasks)
        .then(() => {
            return callback(null, source);
        })
        .catch((err) => {
            return callback(err, source);
        });
};

// export default atomicLoader
module.exports = atomicLoader;
