var _ = require('lodash');

var utils = {};

utils.hexToRgb = function (hex) {
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
}

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

/**
* Merge atomizer configs into a single config
* @param {Array} configs An array of Atomizer config objects
* @return {object} An atomizer config object
*/
utils.mergeConfigs = function (configs) {
    // TODO: Offer option to warn on conflicts
    return _.merge.apply(null, configs.concat(utils.handleMergeArrays));
};

// FROM:
// <parent> {
//   <selector> {
//       <property>: <value>
//       <media-query>: {
//           <property>: <value>
//       }
//   }
// }
// TO:
// <parent> <selector> {
//   <property>: <value>
// }
// <media-query> {
//   <parent> <selector> {
//     <property>: <value>
//   }
// }
utils.flattenJson = function (newJson, json, parent) {
    var props;
    var value;
    var selector;

    newJson = newJson || {};
    parent = parent || '';
    selector = parent;

    for (var rule in json) {
        props = json[rule];
        for (var prop in props) {
            value = props[prop];
            // prop is not a prop
            if (typeof value === 'object') {
                // prop is a media query
                if (/^@media/.test(prop)) {
                    if (!newJson[prop]) {
                        newJson[prop] = {};
                    }
                    newJson[prop][rule] = value;
                } else {
                    utils.flattenJson(newJson, props, parent ? parent + ' ' + rule : rule);
                }
            }
            // prop is prop
            else /*if (typeof value === 'string' || typeof value === 'number')*/ {
                selector = parent ? (selector + ' ' + rule) : rule;
                if (!newJson[selector]) {
                    newJson[selector] = {};
                }
                newJson[selector][prop] = value;
            }
        }
    }
    // console.log(flat);
    return newJson;
};

utils.jsonToCss = function (json) {
    var css = '',
        map = [],
        selector,
        props,
        prop;

    json = utils.flattenJson({}, json);

    console.log(json);

    // extract properties
    for (selector in json) {
        props = json[selector];
        for (prop in props) {
            map.push({
                selector: selector,
                prop: prop, 
                value: props[prop]
            });
        }
    }

    // combine
    for (var i = 0, l = map.length; i < l; i += 1) {
        for(var j = i + 1; j < l; j += 1) {
            if(map[i].prop === map[j].prop && map[i].value === map[j].value) {
                if (map[j].selector) {
                    map[i].selector += ', ' + map[j].selector;
                } else {
                    map[i].selector = false;
                }
                map[j].selector = false; // marking for removal
            }
        }
    }

    // result
    // for (var i = 0; )

    console.log(map);

    return css;
};


module.exports = utils;