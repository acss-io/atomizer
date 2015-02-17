/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var createStore = require('fluxible/utils/createStore');

var ReferenceStore = createStore({
    storeName: 'ReferenceStore',
    handlers: {
        'CHANGE_SEARCH_TERM': 'handleSearch',
        'CHANGE_CUSTOM_CONFIG': 'handleCustomConfig'
    },
    initialize: function () {
        this.currentQuery = '';
        this.customConfig = undefined;
        this.customConfigObj = undefined;
    },
    handleSearch: function (payload) {
        var query = payload.query;
        // Don't update if query hasn't changed, or 
        // there's a query but the query is nothing but spaces
        if (query === this.getCurrentQuery() || (query && query.trim() === '')) {
            return;
        }
        this.currentQuery = query;
        this.emitChange();
    },
    handleCustomConfig: function (payload) {
        var config = payload.config,
            configObj;

        if (config === this.customConfig) { 
            return;
        }

        try {
            configObj = JSON.parse(config);
        } catch (ex) {}

        this.customConfig = config;
        this.customConfigObj = configObj;
        this.emitChange();
    },
    getCurrentQuery: function () {
        return this.currentQuery;
    },
    getState: function () {
        return {
            currentQuery: this.currentQuery,
            customConfig: this.customConfig,
            customConfigObj: this.customConfigObj
        };
    },
    dehydrate: function () {
        return this.getState();
    },
    rehydrate: function (state) {
        this.currentQuery = state.currentQuery;
        this.customConfig = state.customConfig;
        this.customConfigObj = state.customConfigObj;
    }
});


module.exports = ReferenceStore;