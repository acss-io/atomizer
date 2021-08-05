'use strict';

import * as Atomizer from 'atomizer';
import * as cssnano from 'cssnano';
import { getOptions } from 'loader-utils';
import postcss from 'postcss';

import { writeCssFile, ensureExists } from './utils';

const DEFAULT_CSS_DEST: string = './build/css/atomic.css';
const DEFAULT_POSTCSS_PLUGIN_LIST: string[] = [];

// cached response to prevent unnecessary update
let cachedResponse: string = '';

const atomizer: any = new Atomizer({ verbose: true });

interface ConfigObject {
    default: object;
}

// Hash to keep track of config loaded by path
let configObject: ConfigObject = {
    default: {
        configs: {
            classNames: []
        }
    }
};

interface PathConfigOption {
    rules: string;
}

interface PathConfig {
    configs: object;
    cssDest: string;
    options: PathConfigOption;
}

const parseAndGenerateFile = function(
    configPath: string,
    source: string,
    validPostcssPlugins = [],
    minimize: boolean = false
): Promise<Function> {
    return new Promise((resolve, reject) => {
        const firstTrigger: boolean = configObject[configPath] || true;

        if (firstTrigger && configPath) {
            configObject[configPath] = require(require.resolve(configPath));
        }

        const pathConfig: PathConfig = configObject[configPath] || configObject.default;
        const foundClasses = atomizer.findClassNames(source);
        let cssDest = pathConfig.cssDest || DEFAULT_CSS_DEST;

        if (!ensureExists(cssDest)) {
            console.warn('[atomic loader] create css failed.');
            return;
        }

        // custom rules file
        if (pathConfig.options && pathConfig.options.rules) {
            const customRules = require(require.resolve(pathConfig.options.rules));
            if (customRules) {
                atomizer.addRules(customRules);
            }
        }

        const finalConfig = atomizer.getConfig(foundClasses, pathConfig.configs || {});
        const cssString: string = atomizer.getCss(finalConfig, pathConfig.options || {});

        const pipeline = postcss(validPostcssPlugins);
        if (minimize) {
            pipeline.use(cssnano());
        }

        pipeline.process(cssString, { from: undefined }).then(result => {
            const { css = '' } = result;

            if (css === cachedResponse) {
                return resolve();
            }

            writeCssFile(cssDest, css)
                .then(() => {
                    cachedResponse = css;
                    return resolve();
                })
                .catch(err => reject(err));
        });
    });
};

const atomicLoader = function(source, map) {
    const callback = this.async();
    if (this.cacheable) {
        this.cacheable();
    }

    const query = getOptions(this) || {};
    const { minimize = false, postcssPlugins = [] } = query;
    let validPostcssPlugins = DEFAULT_POSTCSS_PLUGIN_LIST;
    if (Array.isArray(postcssPlugins)) {
        validPostcssPlugins = postcssPlugins;
    }
    let configPaths = query.configPath;
    if (!Array.isArray(configPaths)) {
        configPaths = [configPaths];
    }

    const tasks: Promise<Function>[] = configPaths.map(configPath => {
        return parseAndGenerateFile(configPath, source, validPostcssPlugins, minimize);
    });

    Promise.all(tasks)
        .then(() => {
            return callback(null, source);
        })
        .catch(err => {
            return callback(err, source);
        });
};

// export default atomicLoader
module.exports = atomicLoader;
