/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */ 
export default function (context, route, done) {
    let routeConfig = route.config || {};
    let pageTitle = routeConfig.pageTitle || (routeConfig.pageTitlePrefix + ' | Atomic CSS');

    context.dispatch('UPDATE_PAGE_TITLE', {
        pageTitle: pageTitle
    });
    done();
}
