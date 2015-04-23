/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

export default function (context, payload, done) {
    context.dispatch('STATUS_404', payload);
    done();
}
