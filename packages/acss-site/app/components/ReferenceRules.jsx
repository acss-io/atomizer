/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

// external packages
import React from 'react';
import Rules from 'atomizer/src/rules';
import Atomizer from 'atomizer';
import escapeStringRegexp from 'escape-string-regexp';

// instantiate
var atomizer = new Atomizer();

// stores
import ReferenceStore from '../stores/ReferenceStore';

// mixins
import {FluxibleMixin} from 'fluxible/addons';

// constants
const styleRegex = new RegExp(/\$(\d+?)/g);

function replaceRTLTokens(str) {
    return str.replace(/__START__/g, 'left').replace(/__END__/g, 'right');
}

function replacePlaceholders(str, values) {
    if (!Array.isArray(values)) {
        values = [values];
    }
    // Map each value to a placeholder
    for (var i = 0; i < values.length; i++) {
        str = str.replace('$'+i, values[i]);
    }
    // Use regex to clean up any leftover placeholders
    return str.replace(styleRegex, '');
}

function getValueCount(str) {
    return str.match(styleRegex).length;
}

/**
 * Reference docs for the ruleset
 *
 * @class ReferenceRules
 * @constructor
 */
var ReferenceRules = React.createClass({
    mixins: [FluxibleMixin],
    statics: {
        storeListeners: [ReferenceStore]
    },

    getInitialState: function () {
        this.store = this.getStore(ReferenceStore);
        return this.store.getState();
    },

    onChange: function () {
        var state = this.store.getState();
        this.setState(state);
    },

    render: function () {
        var searchRE = false,
            customConfig = this.state.customConfigObj || {},
            hasConfig = !!this.state.customConfigObj,
            parsedConfig = atomizer.parseConfig(customConfig);

        if (this.state.currentQuery) {
            searchRE = new RegExp(escapeStringRegexp(this.state.currentQuery), 'i');
        }

        var items = Rules.map(function (recipe) {
            var values = [],
                classDefinitions = [],
                declaration,
                rawDeclarationBlock = [],
                styledDeclarationBlock = [],
                searching = !!this.state.currentQuery,
                searchTitleMatches = null,
                showRecipeBlock = false,
                value,
                suffix,
                prefix = recipe.matcher,
                usesClass = parsedConfig[prefix];

            // If config is provided, filter any rules not used in config
            if (hasConfig && !usesClass) {
                return;
            }

            if (searching) {
                searchTitleMatches = (recipe.name.search(searchRE) > -1);
            }

            if (recipe.type === 'pattern') {

                if (!hasConfig) {
                    var hasMultiValues = false;
                    for (var property in recipe.styles) {
                        var propertyStyle = recipe.styles[property];
                        var valueCount = getValueCount(propertyStyle);
                        if (valueCount > 1) {
                            hasMultiValues = true;
                            value = [];
                            for (var vc = 1; vc <= valueCount; vc++) {
                                value.push('value' + vc);
                            }
                        } else {
                            value = 'value';
                        }
                        propertyStyle = replaceRTLTokens(replacePlaceholders(propertyStyle, value));
                        property = replaceRTLTokens(property);
                        rawDeclarationBlock.push(property + ": " + propertyStyle);
                        styledDeclarationBlock.push(<div>{property}: <span className="C(#07f)">{propertyStyle}</span></div>);
                    }

                    suffix = "<custom-param>";
                    if (recipe.allowParamToValue) {
                        suffix = "<value>" + (hasMultiValues ? "+" : "") + " or " + suffix;
                    }

                    values.push({
                        rawSelector: prefix + "([" + suffix + "])",
                        rawDeclaration: rawDeclarationBlock,
                        selector: <b>{prefix}(<b className="C(#000)">{suffix}</b>)</b>,
                        declaration: styledDeclarationBlock
                    });

                    if (recipe.arguments) {
                        
                        // Reduce the arguments array down to a single object
                        // containing all possible permutations
                        var args = recipe.arguments.reduce(function (prevValue, currentValue, currentIndex) {
                            var obj = {};
                            for (var p in prevValue) {
                                obj[p] = prevValue[p];
                                for (var c in currentValue) {
                                    var key = p + ',' + c;
                                    obj[key] = [prevValue[p], currentValue[c]]
                                        .reduce(function(a, b) {
                                      return a.concat(b);
                                    }, []);
                                }
                            }
                            return obj;
                        });

                        for (var paramKey in args) {
                            var selector = prefix + '(' + paramKey + ')';
                            var value = args[paramKey];
                            rawDeclarationBlock = [];
                            styledDeclarationBlock = [];
                            for (var property in recipe.styles) {
                                declaration = replaceRTLTokens(property + ": " + replacePlaceholders(recipe.styles[property], value));
                                rawDeclarationBlock.push(declaration);
                                styledDeclarationBlock.push(<div>{declaration}</div>);
                            }
                            values.push({
                                rawSelector: selector, 
                                rawDeclaration: rawDeclarationBlock,
                                selector: <b>{selector}</b>, 
                                declaration: styledDeclarationBlock
                            });
                        }
                    }
                } else if (usesClass) {
                    for (var x=0; x < parsedConfig[prefix].length; x++) {
                        var prefixConfig = parsedConfig[prefix][x];
                        for (var i=0; i < prefixConfig.values.length; i++) {
                            var valueObj = prefixConfig.values[i];
                            rawDeclarationBlock = [];
                            styledDeclarationBlock = [];

                            if (valueObj && valueObj.declaration) {
                                for (var property in valueObj.declaration) {
                                    declaration = replaceRTLTokens(property + ": " + valueObj.declaration[property]);
                                    rawDeclarationBlock.push(declaration);
                                    styledDeclarationBlock.push(<div>{declaration}</div>);
                                }

                                values.push({
                                    rawSelector: prefixConfig.className,
                                    rawDeclaration: rawDeclarationBlock,
                                    selector: <b>{prefixConfig.className}</b>,
                                    declaration: styledDeclarationBlock
                                });
                            }
                        }
                    }
                }

                // Loop through the selectors and generate the actual styles for each
                for (var x=0; x < values.length; x++) {
                    var v = values[x];
                    var showRuleset = false;
                    if (v.declaration) {
                        // Filter with search
                        if (!searching || 
                                searchTitleMatches || 
                                v.rawSelector.search(searchRE) > -1 || 
                                v.rawDeclaration.join('\n').search(searchRE) > -1) {
                            showRuleset = true;
                            showRecipeBlock = true;
                        }
                        var termClasses = 'Pend(10px) Fl(start) Cl(start)';
                        var defClasses = 'Fl(start) M(0) P(0) C(#f2438c)';
                        if (!showRuleset) {
                            termClasses += ' D(n)';
                            defClasses += ' D(n)';
                        }
                        classDefinitions.push([
                            <dt className={termClasses}>{v.selector}</dt>,
                            <dd className={defClasses}>{v.declaration}</dd>
                        ]);
                    }
                };
            }

            var displayclassDefinitions = "Ov(h) " + (showRecipeBlock ? "D(b)" : "D(n)");
            return (
                <div key={'id-' + recipe.matcher} className={displayclassDefinitions}>
                    <h3 className="Cl(b) M(0) Mend(20px) Mt(15px) P(10px)">{recipe.name}</h3>
                    <dl className="M(0) Mstart(20px) P(10px) Pt(0) Ff(m)">{classDefinitions}</dl>
                </div>
            );

        }, this);

        return (
            <div>
                {items}
            </div>
        );
    }
});

export default ReferenceRules;
