var JSS = {};
var utils = require('./utils');

// returns a new CSSO with flattened selectors
JSS.flattenSelectors = function (newCsso/*:Csso*/, csso/*:Csso*/, parent/*:string*/) {
    var props;
    var value;
    var selector;

    parent = parent || '';
    selector = parent;

    for (var rule in csso) {
        props = csso[rule];
        for (var prop in props) {
            value = props[prop];
            // prop is not a prop
            if (typeof value === 'object') {
                // prop is a media query
                if (/^@media/.test(prop)) {
                    if (!newCsso[prop]) {
                        newCsso[prop] = {};
                    }
                    newCsso[prop][parent ? parent + ' ' + rule : rule] = value;
                } else {
                    JSS.flattenSelectors(newCsso, props, parent ? parent + ' ' + rule : rule);
                }
            }
            // prop is prop
            else /*if (typeof value === 'string' || typeof value === 'number')*/ {
                selector = parent ? parent + ' ' + rule : rule;
                if (!newCsso[selector]) {
                    newCsso[selector] = {};
                }
                newCsso[selector][prop] = value;
            }
        }
    }
    return newCsso;
};

// read CSSO and build Extracted object
JSS.extractProperties = function (extracted/*:Extracted*/, csso/*:CssoFlat*/, block/*:string*/)/*:Extracted*/ {
    var props;
    var prop;
    var extract;

    block = block || 'main';

    for (var selector in csso) {
        props = csso[selector];
        // if selector is a media query
        if (/^@media/.test(selector)) {
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
JSS.combineSelectors = function (extracted/*:Extracted*/)/*:Extracted*/ {
    var extracts;
    for (var block in extracted) {
        extracts = extracted[block];
        for (var i = 0, l = extracts.length; i < l; i += 1) {
            for(var j = i + 1; j < l; j += 1) {
                // combine if prop and value match
                if(extracts[i].prop === extracts[j].prop && extracts[i].value === extracts[j].value) {
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

// transforms csso to css
JSS.cssoToCss = function (csso/*:Csso*/, options/*:Options*/) {
    var css = [];
    var extracted/*:Extracted*/;
    var stylesheet/*:Stylesheet*/;
    var tab = options && options.tabWidth && utils.repeatString(' ', parseInt(options.tabWidth, 10)) || utils.repeatString(' ', 2);
    var ruleTab = '';

    // flatten nested selectors
    csso = JSS.flattenSelectors({}, csso);

    // extract properties
    extracted = JSS.extractProperties({}, csso);

    // combine the selectors in the stylesheet
    extracted = JSS.combineSelectors(extracted);

    // build stylesheet object from extract
    stylesheet = JSS.extractedToStylesheet(extracted);

    // finally, write css
    for (var block in stylesheet) {
        if (block !== 'main') {
            ruleTab = tab;
            css.push(block + ' {');
        }
        for (var selector in stylesheet[block]) {
            css.push(ruleTab + selector + ' {');
            for (var prop in stylesheet[block][selector]) {
                css.push(ruleTab + tab + prop + ': ' + stylesheet[block][selector][prop] + ';');
            }
            css.push(ruleTab + '}');
        }
        if (block !== 'main') {
            css.push('}');
        }
    }

    css = css.length > 0 ? css.join('\n') + '\n' : '';

    return css;
};

module.exports = JSS;