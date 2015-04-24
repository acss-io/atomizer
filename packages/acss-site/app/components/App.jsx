/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

// external packages
import React from 'react';

// other dependencies
import assets from '../utils/assets';

// components
import Nav from './Nav';
import PageHome from './PageHome';
import PageDocs from './PageDocs';
import PageReference from './PageReference';
import Status500 from './Status500.jsx';
import Status404 from './Status404.jsx';

// stores
import ApplicationStore from '../stores/ApplicationStore';
import DocStore from '../stores/DocStore';

// mixins
import {RouterMixin} from 'flux-router-component';
import {NavLink} from 'flux-router-component';
import {FluxibleMixin} from 'fluxible/addons';

var App = React.createClass({
    mixins: [RouterMixin, FluxibleMixin],

    statics: {
        storeListeners: [ApplicationStore]
    },

    getInitialState: function () {
        return this.getState();
    },

    getState: function () {
        var appStore = this.getStore(ApplicationStore);
        var docStore = this.getStore(DocStore);
        return {
            currentDoc: docStore.getCurrent() || {},
            currentPageName: appStore.getCurrentPageName(),
            pageTitle: appStore.getPageTitle(),
            route: appStore.getCurrentRoute() || {}
        };
    },

    onChange: function () {
        this.setState(this.getState());
    },

    render: function () {
        var Component = this.state.route && this.state.route.config && this.state.route.config.component;

        if ('500' === this.state.currentPageName) {
            Component = Status500;
        } else if ('404' === this.state.currentPageName) {
            Component = Status404;
        }

        // Keep <a> and <Nav> in the same line to enforce white-space between them
        return (
            <div className="H(100%)">
                <div className="wrapper Bxz(bb) Mih(100%)">
                    <div id="header" role="header" className="P(10px) Ov(h) home_Ov(v) Z(7) Pos(r) Bgc($brandColor) optLegibility">
                        <div className="innerwrapper SpaceBetween Mx(a)--sm Maw(1000px)--sm W(90%)--sm W(a)--sm">
                            <NavLink className="Va(m) Fz(20px) Lh(1.2) C(#fff) Td(n):h" routeName="home">
                                <b className="D(n)--xs home_D(b) home_Cur(d)">Atomic CSS</b>
                                <img id="logo" className="H(30px) Mt(1px) D(n)--sm home_D(n) docs_Mstart(40px)" alt='atomic css' src={assets['images/atomic-css-logo.png']} />

                            </NavLink> <Nav selected={this.state.route.name} />
                        </div>
                    </div>
                    <Component doc={this.state.currentDoc} currentRoute={this.state.route} />
                </div>
                <div id="footer" className="Py(16px) Px(20px) BdT Bdc(#0280ae.3)" role="footer">
                    <div className="innerwrapper SpaceBetween Mx(a)--sm Maw(1000px)--sm W(90%)--sm W(a)--sm">
                        <small>All code on this site is licensed under the <a href="https://github.com/yahoo/acss-site/blob/master/LICENSE.md">Yahoo BSD License</a>, unless otherwise stated.</small> <small>© 2015 Yahoo! Inc. All rights reserved.</small>
                    </div>
                </div>
            </div>
        );
    },
    componentDidUpdate: function (prevProps, prevState) {
        var newState = this.state;

        // update class in html
        document.documentElement.className = document.documentElement.className.replace(prevState.currentPageName, newState.currentPageName);

        if (newState.pageTitle === prevState.pageTitle) {
            return;
        }

        // update page title
        document.title = newState.pageTitle;
     }
});

export default App;
