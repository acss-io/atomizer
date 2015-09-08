'use strict';

var path = require('path');
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

var ensureExists = function(p) {
    var dirs = path.dirname(p).split(path.sep)
    if (dirs[0] === '') { dirs[0] = path.sep; }
    dirs.forEach(function (_, i, p) {
        ensureFolderExists(path.join.apply(null, p.slice(0, i+1)));
    });
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
        cssDest = DEFAULT_CSS_DEST;
    }
    ensureExists(cssDest);

    var finalConfig = atomizer.getConfig(foundClasses, configObject.configs || {});
    var cssString = atomizer.getCss(finalConfig, configObject.options || {});

    writeCssFile(cssDest, cssString);
    
    return source;
};
