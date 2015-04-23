/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import {BaseStore} from 'fluxible/addons';

class DocStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.docs = {};
        this.current = {};
    }

    _receiveDoc(doc) {
        if (!doc || !doc.hasOwnProperty('key')) {
            return;
        }

        this.docs[doc.key] = doc;
        this.current = doc;
        this.emitChange();
    }

    get(key) {
        return this.docs[key];
    }

    getAll() {
        return this.docs;
    }

    getCurrent() {
        return this.current;
    }

    dehydrate() {
        return {
            docs: this.docs,
            current: this.current
        };
    }

    rehydrate(state) {
        this.docs = state.docs;
        this.current = state.current;
    }
}

DocStore.storeName = 'DocsStore';
DocStore.handlers = {
    'RECEIVE_DOC_SUCCESS': '_receiveDoc'
};

export default DocStore;
