'use strict';

import fs from 'fs';
import path from 'path';
import Atomizer from 'atomizer';
import cssnano from 'cssnano';
import { getOptions } from 'loader-utils';
import postcss from 'postcss';
import ensureFolderExists from './ensureFolderExists';

const DEFAULT_CSS_DEST = './build/css/atomic.css';
const PATH_SEP = '/';
const DEFAULT_POSTCSS_PLUGIN_LIST = [];

// cached response to prevent unnecessary update
let cachedResponse = '';

const atomizer = new Atomizer({ verbose: true });

const writeCssFile = (cssDest, cssString) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(cssDest, cssString, err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const ensureExists = filePath => {
    let dirs = path.dirname(filePath).split(PATH_SEP);
    let result = true;
    let currentPath;

    if (dirs[0] === '') {
        dirs[0] = path.sep;
    }

    dirs.forEach((_, i, p) => {
        currentPath = path.join.apply(null, p.slice(0, i + 1));
        if (!ensureFolderExists(currentPath)) {
            result = false;
        }
    });
    return result;
};

// Hash to keep track of config loaded by path
let configObject = {
    default: {
        configs: {
            classNames: []
        }
    }
};

const parseAndGenerateFile = function(
    configPath,
    source,
    validPostcssPlugins = [],
    minimize = false
) {
    return new Promise((resolve, reject) => {
        const firstTrigger = configObject[configPath] || true;

        if (firstTrigger && configPath) {
            configObject[configPath] = require(require.resolve(configPath));
        }

        const pathConfig = configObject[configPath] || configObject.default;
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
        const cssString = atomizer.getCss(finalConfig, pathConfig.options || {});

        const pipeline = postcss(validPostcssPlugins);
        if (minimize) {
            pipeline.use(cssnano());
        }

        pipeline.process(cssString).then(result => {
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

    const tasks = configPaths.map(configPath => {
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

// export default atomicLoader;
module.exports = atomicLoader;
