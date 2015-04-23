/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

// external packages
import React from 'react';
import FluxibleApp from 'fluxible';
import fetchrPlugin from 'fluxible-plugin-fetchr';
import routrPlugin from 'fluxible-plugin-routr';

// configs
import routes from './configs/routes';

// components
import App from './components/App';

// actions
import show500 from './actions/show500';
import show404 from './actions/show404';

const app = new FluxibleApp({
    component: App,
    componentActionHandler: function (context, payload, done) {
        if (payload.err) {
            if (payload.err.statusCode && payload.err.statusCode === 404) {
                context.executeAction(show404, payload, done);
            }
            else {
                console.log(payload.err.stack || payload.err);
                context.executeAction(show500, payload, done);
            }
            return;
        }
        done();
    }
});

app.plug(fetchrPlugin({ xhrPath: '/_api' }));
app.plug(routrPlugin({ routes: routes }));

app.registerStore(require('./stores/ApplicationStore'));
app.registerStore(require('./stores/DocStore'));
app.registerStore(require('./stores/ReferenceStore'));

export default app;
