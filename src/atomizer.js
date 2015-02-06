'use strict';

var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var Absurd = require('absurd');
var AtomicBuilder = require('./lib/AtomicBuilder.js');
var objectAssign = require('object-assign');
var rules = require('./rules.js');

module.exports = function (srcFiles, options, outfile, cb) {

    options = objectAssign({}, {
        require: [],
        morph: null,
        combineSelectors: true,
        minify: false,
        keepCamelCase: false,
        extCSS: '.css',
        banner: ''
    }, options);

    var srcFiles = srcFiles.filter(function(filepath) {
        if (!fs.existsSync(filepath)) { 
            console.warn('Configuration file ' + chalk.cyan(filepath) + ' not found.');
            return false;
        } else {
            return true;
        }
    });

    if (srcFiles.length === 0) {
        console.warn('No configuration files provided. ');
        return;
    }

    var api = Absurd();

    api.morph(options.morph);

    if (options.require.length > 0) {
        api.import(options.require.map(function (file) {
            return path.resolve(file);
        }));
    }

    srcFiles.forEach(function (f) {
        var atomicBuilder = new AtomicBuilder(rules, require(path.resolve(f)));
        var build = (atomicBuilder && atomicBuilder.getBuild()) || {};

        if (!_.size(build)) {
            throw new Error('Failed to generate CSS. The `build` object is empty.');
        }
        api.add(build);
    });

    api.compile(function(err, result) {
        if (err) {
            console.error('Absurd:' + err);
            cb && cb(false);
            return;
        }

        var content = options.banner + result;
        if (outfile) {
            fs.mkdir(path.dirname(outfile), function (err) {
                // Fail silently
                fs.writeFile(path.resolve(outfile), content, function (err) {
                    if (err) throw err;
                    // grunt.verbose.writeln('File ' + chalk.cyan(f.outfile) + ' created.');
                    cb && cb();
                });
            });
        } else {
            process.stdout.write(content);
            cb && cb();
        }
    }, options);
};

