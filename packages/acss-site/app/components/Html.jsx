/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

// external packages
import React from 'react';

// other dependencies
import assets from '../utils/assets';

// stores
import ApplicationStore from '../stores/ApplicationStore';

// mixins
import {FluxibleMixin} from 'fluxible/addons';
import {RouterMixin} from 'flux-router-component';

var Html = React.createClass({
    mixins: [RouterMixin, FluxibleMixin],

    getInitialState: function () {
        return this.getState();
    },

    getState: function () {
        var appStore = this.getStore(ApplicationStore);

        return {
            currentPageName: appStore.getCurrentPageName(),
            pageTitle: appStore.getPageTitle(),
            route: appStore.getCurrentRoute() || {}
        };
    },

    render: function() {
        let liveReload = this.props.dev ? (<script src={"//localhost:35729/livereload.js"}></script>) : '';
        let ieStylesheet;
        let className = ['atomic', this.state.currentPageName].join(' ');

        // yes, browser sniffing isn't a good idea, but we're taking the pragmatic approach
        // for old IE for server-side rendering.
        if (this.props.ua.browser.name === 'IE' && this.props.ua.browser.major < 9) {
            ieStylesheet = (<link rel="stylesheet" href={assets['css/ie.css']} />);
        }

        return (
            <html className={className} lang="en-US">
                <head>
                    <meta charSet="UTF-8" />
                    <title>{this.props.context.getStore(ApplicationStore).getPageTitle()}</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="stylesheet" href={assets['css/bundle.css']} />
                    <link href="http://fonts.googleapis.com/css?family=Nobile" rel="stylesheet" />
                    <link rel="author" href="humans.txt" />
                    {ieStylesheet}
                </head>
                <body>
                    <div id="app" className="H(100%)" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
                    {liveReload}
                </body>
                <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
                <script src={assets['js/common.js']}></script>
                <script src={assets['js/main.js']}></script>
                <script src="https://assets.codepen.io/assets/embed/ei.js" async></script>
            </html>
        );
    }
});

export default Html;
