/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var Rules = require('atomic-css').rules;
var SearchBox = require('./SearchBox');

// stores
var ReferenceStore = require('../stores/ReferenceStore');

// mixins
var FluxibleMixin = require('fluxible').Mixin;


/**
 * Generates atomic.css sass variables
 *
 * @class Reference
 * @constructor
 */
var Reference = React.createClass({
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

    /**
     * Refer to React documentation render
     *
     * @method render
     * @return {Object} HTML head section
     */
    render: function () {
        var searchRE = this.state.currentQuery ? new RegExp(this.state.currentQuery, 'i') : false;

        var items = Rules.map(function (item) {
            var values = [],
                classes = [],
                properties,
                searching = !!this.state.currentQuery,
                searchTitleMatches = null,
                custom;

            if (searching) {
                searchTitleMatches = (item.name.search(searchRE) > -1);
            }

            if (item.type === 'pattern') {
                if (item.allowCustom) {
                    custom = "[value" + (item.allowCustomAutoSuffix ? '|suffix' : '') + "]";

                    values.push({
                        selector: item.prefix + custom, 
                        styledSelector: <b>{item.prefix}<i>{custom}</i></b>, 
                        value: <i>value</i>
                    });
                }

                if (item.rules) {
                    values = values.concat(item.rules.map(function (rule) {
                        var selector = item.prefix + rule.suffix;
                        return {
                            selector: selector, 
                            styledSelector: <b>{selector}</b>, 
                            value: rule.values.join(' ').replace('$START', 'left').replace('$END', 'right')
                        };
                    }));
                }

                for (var x=0; x < values.length; x++) {
                    var v = values[x];
                    properties = [];
                    if (item.properties && item.properties.length) {
                        for (var i=0; i < item.properties.length; i++) {
                            var p = item.properties[i].replace('$START', 'left').replace('$END', 'right');
                            if (!searching || searchTitleMatches || 
                                    v.selector.search(searchRE) > -1 || 
                                    p.search(searchRE) > -1 || 
                                    (typeof v.value === 'string' && v.value.search(searchRE) > -1)) {
                                properties.push(<div>{p}: {v.value};</div>);
                            } 
                        };
                    }
                    if (properties.length) {
                        classes.push([<dt>{v.styledSelector}</dt>, <dd>{properties}</dd>]);
                    }
                };
            } else if (item.type === 'rule') {
                properties = [];
                for (var selector in item.rule) {
                    for (var declaration in item.rule[selector]) {
                        var v = item.rule[selector][declaration];
                        if (!searching || searchTitleMatches || 
                                selector.search(searchRE) > -1 || 
                                declaration.search(searchRE) > -1 || 
                                (typeof v === 'string' && v.search(searchRE) > -1)) {
                            properties.push(<div>{declaration}: {v};</div>);
                        }
                    }
                }

                if (properties.length) {
                    classes.push([<dt><b>{selector}</b></dt>, <dd>{properties}</dd>]);
                }
            }

            var displayClasses = "Va-t P-10 Bxz-bb W-md-3/12 " + (classes.length ? "D-ib" : "D-n");
            return (
                <div className={displayClasses}>
                    <h3>{item.name}</h3>
                    <dl className="M-10">{classes}</dl>
                </div>
            );

        }, this);

        return (
            <div>
                <SearchBox />
                {items}
            </div>
        );
    }
});

module.exports = Reference;