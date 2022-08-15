const _ = require('lodash');

const utils = {};
const customValueTokenRegex = /#\{(.+?)\}/g;

// hex value to rgb object
utils.hexToRgb = function (hex /*:string*/) /*:Rgb*/ {
    // shorthand to full form
    hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
};

/**
 * helper function to handle merging array of strings
 * @param  {mixed} a Data of the first merge param
 * @param  {mixed} b Data of the second merge param
 * @return {mixed}   The merged array
 */
utils.handleMergeArrays = function (a, b) {
    if (_.isArray(a) && _.isArray(b)) {
        return _.union(a, b).sort();
    }
};

// merge atomizer configs into a single config
utils.mergeConfigs = function (configs /*:Config[]*/) /*:Config*/ {
    // TODO: Offer option to warn on conflicts
    return _.mergeWith.apply(null, configs.concat(utils.handleMergeArrays));
};

// returns a repeated string by X amount
utils.repeatString = function (pattern /*:string*/, count /*:integer*/) {
    let result = '';
    if (count < 1) {
        return result;
    }
    while (count > 1) {
        if (count & 1) {
            result += pattern;
        }
        (count >>= 1), (pattern += pattern);
    }
    return result + pattern;
};

// Performs a lookup of custom value tokens, recursively replacing
//  any custom value tokens found within each custom value
utils.getCustomValue = function (config /*:Config*/, currentName /*:string*/, nameStack /*:string[]*/) /*:string*/ {
    nameStack = nameStack || [];

    if (typeof currentName !== 'string' || !config || !config.custom) {
        return null;
    }

    // If not found, return null, which will prevent the rule
    // from being written to CSS
    const value = config.custom[currentName] || null;

    // Short circuit if value isn't a string, or doesn't contain
    // any tokens that need to be replaced
    if (typeof value !== 'string' || value.indexOf('#{') === -1) {
        return value;
    }

    // Add this custom value name to our breadcrumb trail
    nameStack.push(currentName);

    // Limit the depth of recursion to help avoid infinite loops
    // Expectation is that 20 should be a more than reasonble depth
    // to assume something is wrong
    if (nameStack.length > 20) {
        throw new Error(
            `Depth limit reached while substituting custom value tokens. Ensure your custom values don't contain tokens that reference one another, leading to an infinite loop.\n\nCustom value trace: ${nameStack.join(
                ' > '
            )}`
        );
    }

    return value.replace(customValueTokenRegex, (token, name) => {
        return this.getCustomValue(config, name, nameStack);
    });
};

module.exports = utils;
