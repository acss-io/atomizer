/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import {BaseStore} from 'fluxible/addons';
import routes from '../configs/routes';

class ApplicationStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.currentPageName = null;
        this.currentRoute = null;
        this.pageTitle = '';
    }

    changeRoute(route) {
        this.currentRoute = route;
        this.emitChange();
    }

    handleNavigate(route) {
        this.currentPageName = route.config.page;
        this.emitChange();
    }

    updatePageTitle(title) {
        this.pageTitle = title.pageTitle;
        this.emitChange();
    }

    status500() {
        this.currentPageName = '500';
        this.emitChange();
    }

    status404() {
        this.currentPageName = '404';
        this.emitChange();
    }

    getCurrentPageName() {
        return this.currentPageName;
    }

    getPageTitle() {
        return this.pageTitle;
    }

    getCurrentRoute() {
        return this.currentRoute;
    }

    dehydrate() {
        if (this.currentRoute) {
            delete this.currentRoute.config;
        }

        return {
            currentPageName: this.currentPageName,
            route: this.currentRoute,
            pageTitle: this.pageTitle
        };
    }

    rehydrate(state) {
        this.currentPageName = state.currentPageName;
        this.currentRoute = state.route;

        if (state.route) {
            this.currentRoute.config = routes[this.currentRoute.name];
        }

        this.pageTitle = state.pageTitle;
    }
}

ApplicationStore.storeName = 'ApplicationStore';
ApplicationStore.handlers = {
    'CHANGE_ROUTE_START': 'changeRoute',
    'CHANGE_ROUTE_SUCCESS': 'handleNavigate',
    'UPDATE_PAGE_TITLE': 'updatePageTitle',
    'STATUS_500': 'status500',
    'STATUS_404': 'status404'
};

export default ApplicationStore;
