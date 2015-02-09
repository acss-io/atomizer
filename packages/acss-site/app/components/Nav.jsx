/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var NavLink = require('flux-router-component').NavLink;

/**
 * Main navigation component
 *
 * @class Nav
 * @constructor
 */
var Nav = React.createClass({
    getInitialState: function() {
        return {
            selected: 'home',
            links: {}
        };
    },
    /**
     * Refer to React documentation render
     *
     * @method render
     * @return {Object} HTML head section
     */
    render: function() {
        var selected = this.props.selected || this.state.selected,
            links = this.props.links || this.state.links,
            context = this.props.context,
            linkHTML = Object.keys(links).map(function (name) {
                var className = '',
                    link = links[name];

                if (selected === name) {
                    className = 'selected';
                }
                return (
                    <li className={className} key={link.path}>
                        <NavLink routeName={link.page} context={context}>{link.label}</NavLink>
                    </li>
                );
            });
        return (
            <ul role="navigation">
                {linkHTML}
            </ul>
        );
    }
});

module.exports = Nav;