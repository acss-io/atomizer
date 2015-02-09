/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var createStore = require('fluxible/utils/createStore');

var ReferenceStore = createStore({
    storeName: 'ReferenceStore',
    handlers: {
        'CHANGE_SEARCH_TERM': 'handleSearch'
    },
    initialize: function () {
        this.currentQuery = '';
    },
    handleSearch: function (payload) {
        var query = payload.query;
        // Don't update if query hasn't changed, or 
        // there's a query but the query is nothing but spaces
        if (query === this.getCurrentQuery() || (query && query.trim() === '')) {
            return;
        }
        this.currentQuery = query;
        this.emit('change');
    },
    getCurrentQuery: function () {
        return this.currentQuery;
    },
    getState: function () {
        return {
            currentQuery: this.currentQuery
        };
    },
    dehydrate: function () {
        return this.getState();
    },
    rehydrate: function (state) {
        this.currentQuery = state.currentQuery;
    }
});


module.exports = ReferenceStore;