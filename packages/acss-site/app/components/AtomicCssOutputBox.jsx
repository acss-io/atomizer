/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
// Webpack script loader - Absurd build for client side only
if (typeof window !== 'undefined') {
    require("script!atomizer/node_modules/absurd/client-side/build/absurd.min.js");
}
var React = require('react');
var atomizer = require('atomizer');

// stores
var ReferenceStore = require('../stores/ReferenceStore');

// mixins
var FluxibleMixin = require('fluxible').Mixin;


/**
 * Outputs Atomic CSS when configuration is supplied
 *
 * @class AtomicCssOutputBox
 * @constructor
 */
var AtomicCssOutputBox = React.createClass({
    mixins: [FluxibleMixin],
    statics: {
        storeListeners: [ReferenceStore]
    },

    getInitialState: function () {
        this.store = this.getStore(ReferenceStore);
        return this.store.getState();
    },

    onChange: function () {
        var state = this.store.getState();
        this.setState(state);
    },

    /**
     * Refer to React documentation render
     *
     * @method render
     * @return {Object} HTML head section
     */
    render: function () {
        var config,
            css;

        if (this.state.customConfig) {
            try {
                css = atomizer.createCSS(this.state.customConfigObj, {});
            } catch (ex) {
                css = 'Invalid configuration.';
                console.log(ex);
            }
        }

        return (
            <section className={this.props.className}>
                <h3>CSS:</h3>
                <pre className="W-100% Ovy-s textarea" style={{height: "300px"}}>
                {css}
                </pre>
            </section>
        );
    }
});

module.exports = AtomicCssOutputBox;