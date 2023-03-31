/* eslint-disable no-useless-escape */
'use strict';
/**
 * Utility functions to handle JSS objects (JS literal objects with similar CSS structure)
 */
const utils = require('./utils');
const JSS = {};

// returns a new JSS with flattened selectors
JSS.flattenSelectors = function (newJss /*:Jss*/, jss /*:Jss*/, parent /*:string*/) {
    let props;
    let value;
    let selector;

    parent = parent || '';
    selector = parent;

    for (const rule in jss) {
        props = jss[rule];
        for (const prop in props) {
            value = props[prop];
            // prop is not a prop
            if (typeof value === 'object') {
                // prop is a media query
                if (/^@media|@supports|@container/.test(prop)) {
                    if (!newJss[prop]) {
                        newJss[prop] = {};
                    }
                    newJss[prop][parent ? `${parent} ${rule}` : rule] = value;
                } else {
                    JSS.flattenSelectors(newJss, props, parent ? `${parent} ${rule}` : rule);
                }
            } /*if (typeof value === 'string' || typeof value === 'number')*/
            // prop is prop
            else {
                selector = parent ? `${parent} ${rule}` : rule;
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
JSS.extractProperties = function (extracted /*:Extracted*/, jss /*:JssFlat*/, block /*:string*/) /*:Extracted*/ {
    let props;
    let prop;

    block = block || 'main';

    for (const selector in jss) {
        props = jss[selector];
        // if selector is a media query
        if (/^@media|@supports|@container/.test(selector)) {
            JSS.extractProperties(extracted, props, selector);
        } else {
            for (prop in props) {
                if (!extracted[block]) {
                    extracted[block] = [];
                }
                extracted[block].push({
                    selector: selector,
                    prop: prop,
                    value: props[prop],
                });
            }
        }
    }

    return extracted;
};

// combine selectors in an extracted object
JSS.combineSelectors = function (extracted /*:Extracted*/) /*:Extracted*/ {
    let extracts;
    for (const block in extracted) {
        extracts = extracted[block];
        for (let i = 0, l = extracts.length; i < l; i += 1) {
            for (let j = i + 1; j < l; j += 1) {
                // combine if prop and value match
                if (extracts[i].prop === extracts[j].prop && extracts[i].value === extracts[j].value) {
                    if (extracts[j].selector) {
                        extracts[i].selector += `, ${extracts[j].selector}`;
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

JSS.extractedToStylesheet = function (extracted /*:Extracted*/) /*:Stylesheet*/ {
    const stylesheet = {};

    for (const block in extracted) {
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
JSS.jssToCss = function (jss /*:Jss*/, options /*:Options*/) {
    let css = [];
    let extracted /*:Extracted*/;
    const tab =
        (options && options.tabWidth && utils.repeatString(' ', parseInt(options.tabWidth, 10))) ||
        utils.repeatString(' ', 2);

    // flatten nested selectors
    jss = JSS.flattenSelectors({}, jss);

    // extract properties
    extracted = JSS.extractProperties({}, jss);

    // combine the selectors in the stylesheet
    extracted = JSS.combineSelectors(extracted);

    // build stylesheet object from extract
    const stylesheet = JSS.extractedToStylesheet(extracted); /*:Stylesheet*/

    // finally, write css
    // First write the main block
    JSS.writeBlockToCSS(css, stylesheet.main, tab);
    // Next write any media query blocks
    if (options && typeof options.breakPoints === 'object') {
        for (const label in options.breakPoints) {
            const block = options.breakPoints[label];
            if (block && stylesheet[block]) {
                css.push(`${block} {`);
                JSS.writeBlockToCSS(css, stylesheet[block], tab, tab);
                css.push('}');
            }
        }
    }

    css = css.length > 0 ? `${css.join('\n')}\n` : '';

    return css;
};

JSS.writeBlockToCSS = function (css, block, tab, indent) {
    indent = indent || '';
    for (const selector in block) {
        css.push(`${indent + selector} {`);
        for (const prop in block[selector]) {
            css.push(`${indent + tab + prop}: ${block[selector][prop]};`);
        }
        css.push(`${indent}}`);
    }
};

module.exports = JSS;
