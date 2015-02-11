/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
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
        return {};
    },
    /**
     * Refer to React documentation render
     *
     * @method render
     * @return {Object} HTML head section
     */
    render: function() {
        // TODO DOCS INTEGRATION WITH GITHUB
        return (
            <div className="innerwrapper D-tb Tbl-f Pt-20 Mb-50 Mx-a--sm W-80%--sm W-a--sm">
                <button id="toggleMenuButton" className="menu-button D-n--sm Pos-a ButtonNaked End-0 Z-7 Mend-10">
                    <b className="Hidden">Toggle the menu</b>
                </button>
                <Menu config={this.props.menu} selected={this.props.doc.key} />
                <Doc content={this.props.doc.content} title={this.props.doc.title} slug={this.props.doc.key} />
            </div>
        );
    }
});

module.exports = PageDocs;