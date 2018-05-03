/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

// external packages
import React from 'react';
import FluxibleApp from 'fluxible';

// components
import Reference from './components/Reference';

// actions
// import show500 from './actions/show500';

const app = new FluxibleApp({
    component: Reference,
    componentActionHandler: function (context, payload, done) {
        // if (payload.err) {
        //     console.log(payload.err.stack || payload.err);
        //     context.executeAction(show500, payload, done);
        //     return;
        // }
        done();
    }
});

app.registerStore(require('./stores/ReferenceStore'));

export default app;
