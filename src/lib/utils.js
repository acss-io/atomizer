var _ = require('lodash');

var utils = {};

// hex value to rgb object
utils.hexToRgb = function (hex/*:string*/)/*:Rgb*/ {
    var result;

    // shorthand to full form
    hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

/**
 * helper function to handle merging array of strings
 * @param  {mixed} a Data of the first merge param
 * @param  {mixed} b Data of the second merge param
 * @return {mixed}   The merged array
 */
utils.handleMergeArrays = function (a, b) {
    if (_.isArray(a) && _.isArray(b)) {
        return _.union(a, b);
    }
};

// merge atomizer configs into a single config
utils.mergeConfigs = function (configs/*:Config[]*/)/*:Config*/ {
    // TODO: Offer option to warn on conflicts
    return _.merge.apply(null, configs.concat(utils.handleMergeArrays));
};

// returns a repeated string by X amount
utils.repeatString = function (pattern/*:string*/, count/*:integer*/) {
    var result = '';
    if (count < 1) {
        return result;
    }
    while (count > 1) {
        if (count & 1) {
            result += pattern;
        }
        count >>= 1, pattern += pattern;
    }
    return result + pattern;
};

module.exports = utils;