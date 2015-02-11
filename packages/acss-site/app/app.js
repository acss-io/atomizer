/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var React = require('react');
var FluxibleApp = require('fluxible');
var fetchrPlugin = require('fluxible-plugin-fetchr');
var routrPlugin = require('fluxible-plugin-routr');

var app = new FluxibleApp({
    appComponent: React.createFactory(require('./components/App'))
});

app.plug(fetchrPlugin({
    xhrPath: '/_api'
}));

app.plug(routrPlugin({
    routes: require('./configs/routes')
}));

app.registerStore(require('./stores/ApplicationStore'));
app.registerStore(require('./stores/DocStore'));
app.registerStore(require('./stores/ReferenceStore'));

module.exports = app;