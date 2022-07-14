/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createElementWithContext } from 'fluxible-addons-react';
import app from './app-reference';

// for chrome dev tool support
window.React = React;

const context = app.createContext();
window.context = context;

const root = createRoot(document.getElementById('reference-app'));
root.render(createElementWithContext(context));
