/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');

/**
 * PageHome
 *
 * @class PageHome
 * @constructor
 */
var PageOverview = React.createClass({
    getInitialState: function() {
        return {};
    },
    /**
     * Refer to React documentation render
     *
     * @method render
     * @return {Object} HTML head section
     */
    render: function() {
        return (
            <h2>Overview</h2>
        );
    }
});

module.exports = PageOverview;