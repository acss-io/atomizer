/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react'),
    BuilderData = require('../build/js/reference.js');

/**
 * Generates atomic.css sass variables
 *
 * @class Builder
 * @constructor
 */
var Builder = React.createClass({
    getInitialState: function() {
        return {
            builder: BuilderData
        };
    },
    /**
     * Refer to React documentation render
     *
     * @method render
     * @return {Object} HTML head section
     */
    render: function() {
        var items = this.state.builder.items.map(function (item) {
            var values = item.values.map(function (value) {
                value = value.trim();
                return (
                    <label key={value} className="Py-2px D-b">
                        <input type="checkbox" value={value} name={item.key} />
                        <b className="Mstart-4">{value}</b>
                    </label>
                );
            });

            return (
                <div className="D-ib Va-t P-10 Bxz-bb W-md-3/12">
                    <h3>{item.key}</h3>
                    {values}
                </div>
            );
        });

        return (
            <div id="builder">{items}</div>
        );
    }
});

module.exports = Builder;