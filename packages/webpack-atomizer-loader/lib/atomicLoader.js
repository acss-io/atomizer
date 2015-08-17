'use strict';

var Atomizer = require('atomizer');
var parseQuery = require('loader-utils').parseQuery;
var ensureFolderExists = require('./ensureFolderExists');

var DEFAULT_CSS_DEST = './build/css/atomic.css';

var fs = require('fs');
var atomizer = new Atomizer({verbose: true});

var writeCssFile = function (cssDest, cssString) {
    try {
        fs.writeFileSync(cssDest, cssString);
    } catch (err) {
        if (err) {
            console.warn(err);
        }
    }
};

var usingDefaultCssDest = function () {
    if (ensureFolderExists('./build')) {
        if (ensureFolderExists('./build/css')) {
            return true;
        }
    }
    return false;
};

var firstTrigger = true;
var configObject = {
    configs: {
        classNames: []
    }
};

module.exports = function (source, map) {
    if (this.cacheable) {
        this.cacheable();
    }
    var query = parseQuery(this.query);
    var configPath;

    if (firstTrigger) {
        configPath = query.configPath;
        configObject = configPath ? require(require.resolve(configPath)) : configObject;
        firstTrigger = false;
    }

    var foundClasses = atomizer.findClassNames(source);
    var cssDest = configObject.cssDest;
    if (!cssDest) {
        if (!usingDefaultCssDest()) {
            return source;
        }
        cssDest = DEFAULT_CSS_DEST;
    }

    var finalConfig = atomizer.getConfig(foundClasses, configObject.configs || {});
    var cssString = atomizer.getCss(finalConfig, configObject.options || {});

    writeCssFile(cssDest, cssString);
    
    return source;
};
