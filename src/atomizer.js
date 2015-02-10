/*
 * Copyright (c) 2015, Yahoo Inc. All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

'use strict';

var _ = require('lodash');
var Absurd = require('absurd');
var AtomicBuilder = require('./lib/AtomicBuilder.js');
var objectAssign = require('object-assign');
var rules = require('./rules.js');

module.exports = function (configObjs, options) {

    var content;

    options = objectAssign({}, {
        require: [],
        morph: null,
        combineSelectors: true,
        minify: false,
        keepCamelCase: false,
        extCSS: '.css',
        banner: ''
    }, options);

    if (!_.isArray(configObjs)) {
        configObjs = [configObjs];
    }

    if (configObjs.length === 0) {
        throw new Error('No configuration provided.');
    }

    var api = Absurd();

    api.morph(options.morph);

    if (options.require.length > 0) {
        api.import(options.require);
    }

    configObjs.forEach(function (config) {
        var atomicBuilder = new AtomicBuilder(rules, config);
        var build = (atomicBuilder && atomicBuilder.getBuild()) || {};

        if (!_.size(build)) {
            throw new Error('Failed to generate CSS. The `build` object is empty.');
        }
        api.add(build);
    });

    api.compile(function(err, result) {
        if (err) {
            throw new Error('Failed to compile atomic css:' + err);
        }
        content = options.banner + result;
    }, options);

    return content;
};

