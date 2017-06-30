/**
 * Utility functions to handle JSS objects (JS literal objects with similar CSS structure)
 */
var utils = require('./utils');
var JSS = {};

// returns a new JSS with flattened selectors
JSS.flattenSelectors = function (newJss/*:Jss*/, jss/*:Jss*/, parent/*:string*/) {
    var props;
    var value;
    var selector;

    parent = parent || '';
    selector = parent;

    for (var rule in jss) {
        props = jss[rule];
        for (var prop in props) {
            value = props[prop];
            // prop is not a prop
            if (typeof value === 'object') {
                // prop is a media query
                if (/^@media|@supports/.test(prop)) {
                    if (!newJss[prop]) {
                        newJss[prop] = {};
                    }
                    newJss[prop][parent ? parent + ' ' + rule : rule] = value;
                } else {
                    JSS.flattenSelectors(newJss, props, parent ? parent + ' ' + rule : rule);
                }
            }
            // prop is prop
            else /*if (typeof value === 'string' || typeof value === 'number')*/ {
                selector = parent ? parent + ' ' + rule : rule;
                if (!newJss[selector]) {
                    newJss[selector] = {};
                }
                newJss[selector][prop] = value;
            }
        }
    }
    return newJss;
};

// read a flat JSS and build an Extracted object
JSS.extractProperties = function (extracted/*:Extracted*/, jss/*:JssFlat*/, block/*:string*/)/*:Extracted*/ {
    var props;
    var prop;
    var extract;

    block = block || 'main';

    for (var selector in jss) {
        props = jss[selector];
        // if selector is a media query
        if (/^@media|@supports/.test(selector)) {
            JSS.extractProperties(extracted, props, selector);
        } else {
            for (prop in props) {
                if (!extracted[block]) {
                    extracted[block] = [];
                }
                extracted[block].push({
                    selector: selector,
                    prop: prop,
                    value: props[prop]
                });
            }
        }
    }

    return extracted;
};

// combine selectors in an extracted object
JSS.combineSelectors = function (extracted/*:Extracted*/, options/*:Options*/)/*:Extracted*/ {
    var extracts;
    var ie = options && options.ie;

    for (var block in extracted) {
        extracts = extracted[block];
        for (var i = 0, l = extracts.length; i < l; i += 1) {
            // If this selector has an escaped colon, we can't safely combine it
            // with another selector since it will break in IE < 8
            if (ie && extracts[i].selector && extracts[i].selector.indexOf('\:') > -1) { continue; }
            for (var j = i + 1; j < l; j += 1) {
                // If this selector has an escaped colon, we can't safely combine it
                // with another selector since it will break in IE < 8
                if (ie && extracts[j].selector && extracts[j].selector.indexOf('\:') > -1) { continue; }
                // combine if prop and value match
                if (extracts[i].prop === extracts[j].prop && extracts[i].value === extracts[j].value) {
                    if (extracts[j].selector) {
                        extracts[i].selector += ', ' + extracts[j].selector;
                    } else {
                        extracts[i].selector = false;
                    }
                    extracts[j].selector = false; // marking for removal
                }
            }
        }
    }
    return extracted;
};

JSS.extractedToStylesheet = function (extracted/*:Extracted*/)/*:Stylesheet*/ {
    var stylesheet = {};

    for (var block in extracted) {
        extracted[block].forEach(function (extracts) {
            if (extracts.selector) {
                if (!stylesheet[block]) {
                    stylesheet[block] = {};
                }
                if (!stylesheet[block][extracts.selector]) {
                    stylesheet[block][extracts.selector] = {};
                }
                stylesheet[block][extracts.selector][extracts.prop] = extracts.value;
            }
        });
    }

    return stylesheet;
};

// transforms jss to css
JSS.jssToCss = function (jss/*:Jss*/, options/*:Options*/) {
    var css = [];
    var extracted/*:Extracted*/;
    var stylesheet/*:Stylesheet*/;
    var tab = options && options.tabWidth && utils.repeatString(' ', parseInt(options.tabWidth, 10)) || utils.repeatString(' ', 2);
    var ie = options && options.ie;

    // flatten nested selectors
    jss = JSS.flattenSelectors({}, jss);

    // extract properties
    extracted = JSS.extractProperties({}, jss);

    // combine the selectors in the stylesheet
    extracted = JSS.combineSelectors(extracted, options);

    // build stylesheet object from extract
    stylesheet = JSS.extractedToStylesheet(extracted);

    // finally, write css
    // First write the main block
    JSS.writeBlockToCSS(css, stylesheet.main, tab);
    // Next write any media query blocks
    if (options && typeof options.breakPoints === 'object') {
        for (var label in options.breakPoints) {
            var block = options.breakPoints[label];
            if (block && stylesheet[block]) {
                css.push(block + ' {');
                JSS.writeBlockToCSS(css, stylesheet[block], tab, tab);
                css.push('}');
            }
        }
    }

    css = css.length > 0 ? css.join('\n') + '\n' : '';

    return css;
};

JSS.writeBlockToCSS = function (css, block, tab, indent) {
    indent = indent || '';
    for (var selector in block) {
        css.push(indent + selector + ' {');
        for (var prop in block[selector]) {
            css.push(indent + tab + prop + ': ' + block[selector][prop] + ';');
        }
        css.push(indent + '}');
    }
};

module.exports = JSS;
