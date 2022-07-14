/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import FluxibleApp from 'fluxible';
import App from './components/App';
import ReferenceStore from './stores/ReferenceStore';

const app = new FluxibleApp({
    component: App,
    componentActionErrorHandler: function (context, payload, done) {
        done();
    },
});

app.registerStore(ReferenceStore);

export default app;
