'use strict';

import fs from 'fs';
import path from 'path';
import Atomizer from 'atomizer';
import { parseQuery } from 'loader-utils';
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

let firstTrigger = true;
let configObject = {
    configs: {
        classNames: []
    }
};

const atomicLoader = function (source, map) {
    if (this.cacheable) {
        this.cacheable();
    }

    const query = parseQuery(this.query);
    let configPath;

    if (firstTrigger) {
        configPath = query.configPath;
        configObject = configPath ? require(require.resolve(configPath)) : configObject;
        firstTrigger = false;
    }

    const foundClasses = atomizer.findClassNames(source);
    let cssDest = configObject.cssDest;
    if (!cssDest) {
        cssDest = DEFAULT_CSS_DEST;
    }

    let finalConfig;
    let cssString;
    if (!ensureExists(cssDest)) {
        console.warn('[atomic loader] create css failed.');
        return source;
    } else {
        finalConfig = atomizer.getConfig(foundClasses, configObject.configs || {});
        cssString = atomizer.getCss(finalConfig, configObject.options || {});

        writeCssFile(cssDest, cssString);
    };

    return source;
};

// export default atomicLoader;
module.exports = atomicLoader;
