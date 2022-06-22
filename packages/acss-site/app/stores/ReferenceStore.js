/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { BaseStore } from 'fluxible/addons';

class ReferenceStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.currentQuery = '';
        this.customConfig = undefined;
        this.customConfigObj = undefined;
    }

    handleSearch(payload) {
        const query = payload.query;
        // Don't update if query hasn't changed, or
        // there's a query but the query is nothing but spaces
        if (query === this.getCurrentQuery() || (query && query.trim() === '')) {
            return;
        }
        this.currentQuery = query;
        this.emitChange();
    }

    handleCustomConfig(payload) {
        const config = payload.config;
        let configObj;

        if (config === this.customConfig) {
            return;
        }

        try {
            configObj = JSON.parse(config);
        } catch (ex) {
            console.error(ex);
        }

        this.customConfig = config;
        this.customConfigObj = configObj;
        this.emitChange();
    }

    getCurrentQuery() {
        return this.currentQuery;
    }

    getState() {
        return {
            currentQuery: this.currentQuery,
            customConfig: this.customConfig,
            customConfigObj: this.customConfigObj,
        };
    }

    dehydrate() {
        return this.getState();
    }

    rehydrate(state) {
        this.currentQuery = state.currentQuery;
        this.customConfig = state.customConfig;
        this.customConfigObj = state.customConfigObj;
    }
}

ReferenceStore.storeName = 'ReferenceStore';
ReferenceStore.handlers = {
    CHANGE_SEARCH_TERM: 'handleSearch',
    CHANGE_CUSTOM_CONFIG: 'handleCustomConfig',
};

export default ReferenceStore;
