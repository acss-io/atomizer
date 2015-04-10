/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var escapeStringRegexp = require('escape-string-regexp');

var React = require('react');
var Rules = require('atomizer/src/rules');

// stores
var ReferenceStore = require('../stores/ReferenceStore');

// mixins
var FluxibleMixin = require('fluxible').Mixin;


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

    hasClassUsingPrefix: function (prefix, classnames) {
        var value;
        for (var i=0, iLen=classnames.length; iLen; i++) {
            value = classnames[i];
            if (value.indexOf(prefix) === 0) { return true; }
        }
        return false;
    },

    /**
     * Refer to React documentation render
     *
     * @method render
     * @return {Object} HTML head section
     */
    render: function () {
        var searchRE = false;
        if (this.state.currentQuery) {
            var escapedString = escapeStringRegexp(this.state.currentQuery);
            searchRE = new RegExp(escapedString, 'i');
        } 
        var customConfig = this.state.customConfigObj;
        var hasConfig = !!customConfig;

        if (!hasConfig) {
            customConfig = {};
        }

        var items = Rules.map(function (recipe) {
            var usingClass = false,
                values = [],
                classDefinitions = [],
                declarationBlock,
                searching = !!this.state.currentQuery,
                searchTitleMatches = null,
                showRecipeBlock = false,
                custom,
                value,
                suffix,
                recipeConfig;

            if (customConfig.classNames && customConfig.classNames.length) {
                usingClass = this.hasClassUsingPrefix(recipe.prefix, customConfig.classNames);
            }

            // If config is provided, filter any rules not used in config
            if (hasConfig && !usingClass) {
                return;
            }

            if (searching) {
                searchTitleMatches = (recipe.name.search(searchRE) > -1);
            }

            if (recipe.type === 'pattern') {
                // Some entries allow custom values to be provided in configuration
                if (recipe.allowCustom) {
                    if (!hasConfig) {
                        // No config provided, show generic info
                        if (recipe.allowSuffixToValue) {
                            custom = [{ 
                                suffix: "[custom suffix|value]",
                                values: ['custom value|value']
                            }];
                        } else {
                            custom = [{ 
                                suffix: "[custom suffix]",
                                values: ['custom value']
                            }]; 
                        }
                    } else if (customConfig.custom) {
                        // Config provided, show custom values
                        // custom = ???; filter the customConfig.custom array
                        // by prefix

                    } else {
                        custom = [];
                    }
                    for (var i = 0; i < custom.length; i++) {
                        suffix = custom[i].suffix;
                        selector = recipe.prefix + '(' + suffix + ')';
                        value = custom[i].values.join(' ');
                        values.push({
                            rawSelector: selector,
                            rawValue: value,
                            selector: <b>{recipe.prefix}({ hasConfig ? suffix : <em>{suffix}</em>})</b>,
                            value: hasConfig ? value : <em className="C(#07f)">{value}</em>
                        });
                        if (custom[i].breakPoints) {
                            var bp = custom[i].breakPoints;
                            if (bp && bp.length) {
                                for (var j = 0; j < bp.length; j++) {
                                    var bpSelector = selector + '--' + bp[j];
                                    values.push({
                                        rawSelector: bpSelector, 
                                        rawValue: value,
                                        selector: <b>{bpSelector}</b>, 
                                        value: value
                                    });
                                }
                            }
                        }
                    }
                }
                // Some have pre-defined classes/values
                if (recipe.rules) {
                    for (var i = 0; i < recipe.rules.length; i++) {
                        var rule = recipe.rules[i];
                        if (!recipeConfig || recipeConfig[rule.suffix]) {
                            var selector = recipe.prefix + '(' + rule.suffix + ')';
                            var value = rule.values.join(' ').replace('__START__', 'left').replace('__END__', 'right');
                            values.push({
                                rawSelector: selector, 
                                rawValue: value,
                                selector: <b>{selector}</b>, 
                                value: value
                            });
                            if (recipeConfig && typeof recipeConfig[rule.suffix] === 'object') {
                                var bp = recipeConfig[rule.suffix].breakPoints;
                                if (bp && bp.length) {
                                    for (var j = 0; j < bp.length; j++) {
                                        var bpSelector = selector + '--' + bp[j];
                                        values.push({
                                            rawSelector: bpSelector, 
                                            rawValue: value,
                                            selector: <b>{bpSelector}</b>, 
                                            value: value
                                        });
                                    }
                                }
                            }
                        }
                    }
                }

                // Loop through the selectors and generate the actual styles for each
                for (var x=0; x < values.length; x++) {
                    var v = values[x];
                    var showRuleset = false;
                    if (recipe.properties && recipe.properties.length) {
                        var rawDeclarationBlock = [];
                        var styledDeclarationBlock = [];

                        for (var i=0; i < recipe.properties.length; i++) {
                            var property = recipe.properties[i].replace('__START__', 'left').replace('__END__', 'right');
                            rawDeclarationBlock.push(property + ": " + v.rawValue + ";");
                            styledDeclarationBlock.push(<div>{property}: {v.value};</div>);
                        }

                        // Filter with search
                        if (!searching || 
                                searchTitleMatches || 
                                v.rawSelector.search(searchRE) > -1 || 
                                rawDeclarationBlock.join('\n').search(searchRE) > -1) {
                            showRuleset = true;
                            showRecipeBlock = true;
                        } 
                        classDefinitions.push([<dt className={showRuleset ? 'Pend(10px) Fl(start) Cl(start)' : 'D(n)'}>{v.selector}</dt>, <dd className={showRuleset ? 'Ov(h) M(0) P(0) C(#f2438c)' : 'D(n)'}>{styledDeclarationBlock}</dd>]);
                    }
                };
            }

            var displayclassDefinitions = "Va(t) W(50%)--sm " + (showRecipeBlock ? "D(ib)--sm" : "D(n)");
            return (
                <div key={'id-' + recipe.prefix} className={displayclassDefinitions}>
                    <h3 className="M(0) Mt(10px) P(10px)">{recipe.name}</h3>
                    <dl className="M(0) P(10px) Pt(0) Pend(50px)--sm Ff(m)">{classDefinitions}</dl>
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

module.exports = ReferenceRules;
