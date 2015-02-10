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
        var liveReload = this.props.dev ? (<script src={"//localhost:35729/livereload.js"}></script>) : '';
        return (
            <html id="atomic">
                <head>
                    <meta charSet="utf-8" />
                    <title>{this.getStore(ApplicationStore).getPageTitle()}</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="stylesheet" href="/public/css/atomic.css" />
                    <link rel="stylesheet" href="/public/css/bundle.css" />
                </head>
                <body>
                    <div id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
                    {liveReload}
                </body>
                <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
                <script src="/public/js/client.js" defer></script>
            </html>
        );
    }
});

module.exports = Html;