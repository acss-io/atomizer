/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */ 
export default function (context, payload) {
    var config = (typeof payload === 'string') ? payload : '';

    context.dispatch('CHANGE_CUSTOM_CONFIG', {
        config: config
    });
}