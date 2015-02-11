/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react/addons');
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
        var cx = React.addons.classSet;
        var selected = this.props.selected || this.state.selected;
        var links = this.props.links || this.state.links;
        var context = this.props.context;
        var linkHTML = Object.keys(links).map(function (name, index) {
            var link = links[name];
            var className = cx({
                'selected': selected === name,
                'Mstart-10': index !== 1,
                'D-ib Va-m Pos-r': true
            });
            var navParams = {};

            if (name === 'docs') {
                navParams = {key: 'quick-start'};
            }

            // skip home since we don't want it to render
            return name !== 'home' ? (
                <li className={className} key={link.path}>
                    <NavLink routeName={link.page} context={context} className="D-b C-fff Td-n:h" navParams={navParams}>
                        <b className="Pos-r">
                            {link.label}
                        </b>
                    </NavLink>
                </li>
            ) : '';
        });

        return (
            <ul role="navigation" className="D-ib Va-m Reset">
                {linkHTML}
                <li className="D-ib Mstart-10 Pos-r">
                    <a className="D-b C-fff Td-n:h" href="https://github.com/yahoo/atomizer">
                        <img className="Va-m Pos-r" alt="GitHub" width="30" src="/public/images/github-logo.png" />
                    </a>
                </li>
            </ul>
        );
    }
});

module.exports = Nav;