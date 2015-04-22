/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var escapeStringRegexp = require('escape-string-regexp');

var React = require('react');
var Rules = require('atomizer/src/helpers');
var Atomizer = require('atomizer');

// stores
var ReferenceStore = require('../stores/ReferenceStore');

// mixins
var FluxibleMixin = require('fluxible').Mixin;

var atomizer = new Atomizer();

/**
 * Reference docs for the helper ruleset
 *
 * @class ReferenceHelpers
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
                suffix;

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

            if (recipe.type === 'helper') {
                declarationBlock = [];
                for (var selector in recipe.rules) {
                    var showRuleset = false;
                    var declarationObj = recipe.rules[selector];
                    var rawDeclarationBlock = [];
                    var styledDeclarationBlock = [];

                    for (var property in declarationObj) {
                        rawDeclarationBlock.push(property + ": " + declarationObj[property] + ";");
                        styledDeclarationBlock.push(<div>{property}: {declarationObj[property]};</div>);
                    }

                    // Filter with search
                    if (!searching || 
                            searchTitleMatches || 
                            selector.search(searchRE) > -1 || 
                            rawDeclarationBlock.join('\n').search(searchRE) > -1) {
                        showRuleset = true;
                        showRecipeBlock = true;
                    }
                    classDefinitions.push([<dt className={showRuleset ? 'Pend(10px) Fl(start) Cl(start)' : 'D(n)'}>{selector}</dt>, <dd className={showRuleset ? 'Fl(start) M(0) P(0) C(#f2438c)' : 'D(n)'}>{styledDeclarationBlock}</dd>]);
                }
            }

            var displayclassDefinitions = "Ov(h) " + (showRecipeBlock ? "D(b)" : "D(n)");
            return (
                <div key={'id-' + recipe.prefix} className={displayclassDefinitions}>
                    <h3 className="Cl(b) M(0) Mend(20px) Mt(15px) P(10px) Ta(end)">{recipe.name}</h3>
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

module.exports = ReferenceRules;
