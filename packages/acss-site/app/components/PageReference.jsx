/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react'),
    Reference = require('./Reference');

/**
 * PageCustomize
 *
 * @class Nav
 * @constructor
 */
var PageReference = React.createClass({
    getInitialState: function () {
        return {};
    },
    /**
     * Refer to React documentation render
     *
     * @method render
     * @return {Object} HTML head section
     */
    render: function () {
        return (
            <div id="reference" role="main" className="reference-page innerwrapper Mb-50px Mx-10px Mx-a--sm W-90%--sm">
                <h1>Reference</h1>
                <Reference />
            </div>
        );
    }
});

module.exports = PageReference;