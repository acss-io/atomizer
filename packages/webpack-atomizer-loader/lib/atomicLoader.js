'use strict';

import fs from 'fs';
import path from 'path';
import Atomizer from 'atomizer';
import { getOptions } from 'loader-utils';
import ensureFolderExists from './ensureFolderExists';

const DEFAULT_CSS_DEST = './build/css/atomic.css';
const PATH_SEP = '/';

const atomizer = new Atomizer({verbose: true});

const writeCssFile = (cssDest, cssString) => {
    try {
        fs.writeFileSync(cssDest, cssString);
    } catch (err) {
        if (err) {
            console.warn(err);
        }
    }
};

const ensureExists = (filePath) => {
    let dirs = path.dirname(filePath).split(PATH_SEP);
    let result = true;
    let currentPath;

    if (dirs[0] === '') {
        dirs[0] = path.sep;
    }

    dirs.forEach((_, i, p) => {
        currentPath = path.join.apply(null, p.slice(0, i+1));
        if (!ensureFolderExists(currentPath)) {
            result = false;
        };
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

const parseAndGenerateFile = function (configPath, source) {
    const firstTrigger = configObject[configPath] || true;

    if (firstTrigger && configPath) {
        configObject[configPath] = require(require.resolve(configPath));
    }

    const pathConfig = configObject[configPath] || configObject.default;
    const foundClasses = atomizer.findClassNames(source);
    let cssDest = pathConfig.cssDest || DEFAULT_CSS_DEST;

    if (!ensureExists(cssDest)) {
        console.warn('[atomic loader] create css failed.')
        return;
    }

    const finalConfig = atomizer.getConfig(foundClasses, pathConfig.configs || {});
    const cssString = atomizer.getCss(finalConfig, pathConfig.options || {});
    writeCssFile(cssDest, cssString);

    return;
}

const atomicLoader = function (source, map) {
    if (this.cacheable) {
        this.cacheable();
    }

    const query = getOptions(this) || {};
    let configPaths = query.configPath;
    if (!Array.isArray(configPaths)) {
        configPaths = [configPaths];
    }

    configPaths.forEach(configPath => parseAndGenerateFile(configPath, source));

    return source;
};

// export default atomicLoader;
module.exports = atomicLoader;
