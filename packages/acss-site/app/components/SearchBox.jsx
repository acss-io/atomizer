/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');

// actions
var SearchAction = require('../actions/searchReference');

// stores
var ReferenceStore = require('../stores/ReferenceStore');

// mixins
var FluxibleMixin = require('fluxible').Mixin;

/**
 * SearchBox
 *
 * @class SearchBox
 * @constructor
 */
var SearchBox = React.createClass({

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

    onQueryChange: function (e) {
        this.executeAction(SearchAction, e.target.value);
    },

    /**
     * Refer to React documentation render
     *
     * @method render
     * @return {Object} HTML head section
     */
    render: function () {
        return (
            <div>
                <h2 className="Mb(0)"><label htmlFor="searchbox">Search:</label></h2>
                <input id="searchbox" type="search" role="search" className="W(100%) P(10px)" size="50" placeholder="Type classname or CSS declaration here..." title="Type classname or CSS declaration here..." autoFocus onChange={this.onQueryChange} value={this.state.currentQuery}></input>
            </div>
        );
    }
});

module.exports = SearchBox;