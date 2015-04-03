/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react/addons');
var Menu = require('./Menu.jsx');
var Doc = require('./Doc.jsx');

/**
 * PageDocs
 *
 * @className PageDocs
 * @constructor
 */
var PageDocs = React.createClass({
    getInitialState: function() {
        return {
            isMenuVisible: false
        };
    },
    handleMenuToggle: function () {
        this.setState({
            isMenuVisible: !this.state.isMenuVisible
        });
    },
    /**
     * Refer to React documentation render
     *
     * @method render
     * @return {Object} HTML head section
     */
    render: function() {
        var cx = React.addons.classSet,
            wrapperClasses;

        wrapperClasses = cx({
            'menu-on': this.state.isMenuVisible,
            'docs-page innerwrapper D-tb--sm Tbl-f Pt-20px Mb-50px Maw-1000px--sm Miw-1000px--lg Mx-a--sm W-96%--sm': true
        });

        return (
            <div className={wrapperClasses}>
                <button onClick={this.handleMenuToggle} id="toggleMenuButton" className="menu-button Bgi-hamburger W-32px H-32px D-n--sm Pos-a Bdw-0 Bgc-t P-0 T-0 Start-0 Z-7 M-10px menu-on_Bgp-e_t">
                    <b className="Hidden">Toggle the menu</b>
                </button>
                <Menu config={this.props.menu} selected={this.props.doc.key} />
                <Doc content={this.props.doc.content} title={this.props.doc.title} slug={this.props.doc.key} />
                <div id="overlay" className="D-n D-n!--sm menu-on_D-b Bgc-#000.6 Z-3 Pos-f T-0 Start-0 W-100% H-100%"></div>
            </div>
        );
    }
});

module.exports = PageDocs;