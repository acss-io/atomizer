/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

// external packages
import React from 'react';

// actions
import SearchAction from '../actions/searchReference';

// stores
import ReferenceStore from '../stores/ReferenceStore';

// mixins
import {FluxibleMixin} from 'fluxible/addons';

var throttle = false;

var SearchBox = React.createClass({
    mixins: [FluxibleMixin],

    statics: {
        storeListeners: [ReferenceStore]
    },

    getInitialState: function () {
        this.store = this.getStore(ReferenceStore);
        return this.store.getState();
    },

    onKeyDown: function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            if (throttle) { 
                clearTimeout(throttle); 
                throttle = false; 
            }
            this.executeAction(SearchAction, e.target.value);
        }
    },

    onChange: function () {
        var state = this.store.getState();
        this.setState(state);
    },

    onQueryChange: function (e) {
        if (throttle) {
            clearTimeout(throttle);
        }
        throttle = setTimeout((function (value) {
            this.executeAction(SearchAction, value);
            throttle = false; 
        }).bind(this, e.target.value), 500);
    },

    componentDidMount: function () {
        React.findDOMNode(this.refs.searchbox).value = this.state.currentQuery;
    },

    render: function () {
        return (
            <div id="search-section">
                <h2 className="Mb(0)"><label htmlFor="searchbox">Search:</label></h2>
                <input id="searchbox" ref="searchbox" type="search" role="search" className="W(100%) P(10px) Fz(30px) C($brandColor) Fw(b)" size="50" placeholder="Type classname or CSS declaration here..." title="Type classname or CSS declaration here..." autoFocus onChange={this.onQueryChange} onKeyDown={this.onKeyDown}></input>
            </div>
        );
    }
});

export default SearchBox;
