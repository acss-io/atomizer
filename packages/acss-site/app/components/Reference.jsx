/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var Rules = require('atomizer/src/rules');
var SearchBox = require('./SearchBox');
var ConfigBox = require('./ConfigBox');
var ReferenceRules = require('./ReferenceRules');
var AtomicCssOutputBox = require('./AtomicCssOutputBox');

// stores
var ReferenceStore = require('../stores/ReferenceStore');

// mixins
var FluxibleMixin = require('fluxible').Mixin;


/**
 * Searchable reference docs
 *
 * @class Reference
 * @constructor
 */
var Reference = React.createClass({
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
        var hasConfig = !!this.state.customConfig;
        return (
            <div>
                <SearchBox />
                <ConfigBox />
                <ReferenceRules />
                <AtomicCssOutputBox className={hasConfig ? '' : 'D-n'} />
            </div>
        );
    }
});

module.exports = Reference;