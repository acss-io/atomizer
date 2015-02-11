/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var showDoc = require('../actions/showDoc');

module.exports = {
    home: {
        path: '/',
        method: 'get',
        page: 'home',
        label: 'Home',
        action: function (context, payload, done) {
            var params = {
                resource: 'docs',
                key: '/docs/home.md',
                pageTitle: 'Atomic.css | A collection of single purpose styling units for maximum reuse'
            };
            context.executeAction(showDoc, params, done);
        }
    },
    docs: {
        path: '/:type(tutorials|guides)?/:key.html',
        method: 'get',
        page: 'docs',
        label: 'Docs',
        action: function (context, payload, done) {
            var params = {
                resource: 'docs',
                key: '/docs/' +
                    (payload.params.type ? payload.params.type + '/' : '') +
                    payload.params.key + '.md'
            };
            context.executeAction(showDoc, params, done);
        }
    },
    reference: {
        path: '/reference',
        method: 'get',
        page: 'reference',
        label: 'Reference'
    }
};
