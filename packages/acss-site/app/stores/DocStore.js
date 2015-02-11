/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var createStore = require('fluxible/utils/createStore');

module.exports = createStore({
    storeName: 'DocsStore',
    initialize: function () {
        this.docs = {};
        this.current = {};
    },
    handlers: {
        'RECEIVE_DOC_SUCCESS': '_receiveDoc'
    },
    _receiveDoc: function (doc) {
        if (!doc || !doc.hasOwnProperty('key')) {
            return;
        }

        this.docs[doc.key] = doc;
        this.current = doc;
        this.emitChange();
    },
    get: function (key) {
        return this.docs[key];
    },
    getAll: function () {
        return this.docs;
    },
    getCurrent: function () {
        return this.current;
    },
    dehydrate: function () {
        return {
            docs: this.docs,
            current: this.current
        };
    },
    rehydrate: function (state) {
        this.docs = state.docs;
        this.current = state.current;
    }
});
