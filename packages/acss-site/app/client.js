/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
/*global document, window */

// external packages
import React from 'react';

// other dependencies
import app from './app';

const dehydratedState = window.App; // sent from the server

// for chrome dev tool support
window.React = React;

app.rehydrate(dehydratedState, (err, context) => {
    if (err) {
        throw err;
    }

    window.context = context;

    React.render(context.createElement(),
        document.getElementById('app')
    );
});
