/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var ApplicationStore = require('../stores/ApplicationStore');
var FluxibleMixin = require('fluxible').Mixin;

/**
 * React class to handle the rendering of the HTML head section
 *
 * @class Html
 * @constructor
 */
var Html = React.createClass({
    mixins: [ FluxibleMixin ],

    getDefaultProps: function () {
        return {
            ua: {},
            dev: false
        };
    },

    /**
     * Refer to React documentation render
     *
     * @method render
     * @return {Object} HTML head section
     */
    render: function() {
        var liveReload = this.props.dev ? (<script src={"//localhost:35729/livereload.js"}></script>) : '',
            ieStylesheet;

        // yes, browser sniffing isn't a good idea, but we're taking the pragmatic approach
        // for old IE for server-side rendering.
        if (this.props.ua.browser.name === 'IE' && this.props.ua.browser.major < 9) {
            ieStylesheet = (<link rel="stylesheet" href="/public/css/ie.css" />);
        }

        return (
            <html id="atomic" className="atomic">
                <head>
                    <meta charSet="utf-8" />
                    <title>{this.getStore(ApplicationStore).getPageTitle()}</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="stylesheet" href="/public/css/atomic.css" />
                    <link rel="stylesheet" href="/public/css/bundle.css" />
                    {ieStylesheet}
                </head>
                <body className="Mih-100%">
                    <div id="app" className="H-100%" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
                    {liveReload}
                </body>
                <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
                <script src="/public/js/client.js" defer></script>
                <script src="https://assets.codepen.io/assets/embed/ei.js" async></script>
            </html>
        );
    }
});

module.exports = Html;