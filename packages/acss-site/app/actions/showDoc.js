/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var DocStore = require('../stores/DocStore');

module.exports = function (context, payload, done) {
    var docFromCache = context.getStore(DocStore).get(payload.key);

    // is the content already in the store?
    if (docFromCache) {
        context.dispatch('RECEIVE_DOC_SUCCESS', docFromCache);
        context.dispatch('UPDATE_PAGE_TITLE', {
            pageTitle: (payload.pageTitle || docFromCache.title) + ' | Fluxible'
        });
        return done();
    }

    // get content from service
    context.service.read(payload.resource, payload, {}, function (err, data) {
        if (err || !data) {
            context.dispatch('RECEIVE_DOC_FAILURE', payload);
            return done(err);
        }

        context.dispatch('RECEIVE_DOC_SUCCESS', data);
        context.dispatch('UPDATE_PAGE_TITLE', {
            pageTitle: (payload.pageTitle || data.title) + ' | Fluxible'
        });
        done();
    });
};
