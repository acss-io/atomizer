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

    render: function () {
        return (
            <div>
                <h2 className="Mb(0)"><label htmlFor="searchbox">Search:</label></h2>
                <input id="searchbox" type="search" role="search" className="W(100%) P(10px)" size="50" placeholder="Type classname or CSS declaration here..." title="Type classname or CSS declaration here..." autoFocus onChange={this.onQueryChange} value={this.state.currentQuery}></input>
            </div>
        );
    }
});

export default SearchBox;
