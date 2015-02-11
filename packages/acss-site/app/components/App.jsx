/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');

// components
var Nav = require('./Nav');
var PageHome = require('./PageHome');
var PageDocs = require('./PageDocs');
var PageReference = require('./PageReference');
var NavLink = require('flux-router-component').NavLink;

// stores
var ApplicationStore = require('../stores/ApplicationStore');
var DocStore = require('../stores/DocStore');

// mixins
var RouterMixin = require('flux-router-component').RouterMixin;
var FluxibleMixin = require('fluxible').Mixin;

/**
 * The app
 *
 * @class App
 * @constructor
 */
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
            pages: appStore.getPages(),
            route: appStore.getCurrentRoute()
        };
    },
    onChange: function () {
        this.setState(this.getState());
    },
    /**
     * Refer to React documentation render
     *
     * @method render
     * @return {Object} HTML head section
     */
    render: function () {
        var page = '';

        switch (this.state.currentPageName) {
            case 'home':
                page = <PageHome content={this.state.currentDoc.content} />;
                break;
            case 'docs':
                var docsConfig = require('./../configs/docs');
                page = <PageDocs menu={docsConfig} doc={this.state.currentDoc} />;
                break;
            case 'reference':
                page = <PageReference />;
                break;
        }

        // Keep <a> and <Nav> in the same line to enforce white-space between them
        return (
            <div className="H-100%">
                <div className="wrapper Bxz-bb Mih-100%">
                    <div id="header" role="header" className="P-10 Ov-h Z-7 Pos-r Bgc-logo OptLegibility">
                        <div className="innerwrapper SpaceBetween Mx-a--sm W-80%--sm W-a--sm">
                            <NavLink className="D-ib Va-m Fz-20 Lh-12 C-fff Td-n:h" routeName="home">ACSS.io</NavLink> <Nav selected={this.state.currentPageName} links={this.state.pages} context={this.props.context}/>
                        </div>
                    </div>
                    {page}
                </div>
                <div id="footer" className="SpaceBetween P-20 Bdt-1" role="footer">
                    <small className="D-ib">All code on this site is licensed under the <a href="https://github.com/yahoo/acss-site/blob/master/LICENSE.md">Yahoo BSD License</a>, unless otherwise stated.</small> <small className="D-ib">© 2015 Yahoo! Inc. All rights reserved.</small>
                </div>
            </div>
        );
    },
    componentDidUpdate: function (prevProps, prevState) {
        var newState = this.state;

        if (newState.pageTitle === prevState.pageTitle) {
            return;
        }

        document.title = newState.pageTitle;
     }
});

module.exports = App;