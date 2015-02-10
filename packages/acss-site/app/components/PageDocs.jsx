/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');

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
                <div id="aside" className="D-tbc Va-t W-150px--sm End-0 Pt-20 Pb-40 Pstart-10 Pend-50 Z-5 Pend-10--sm End-a--sm Z-0 Start-0" role="aside">
                    <h1 className="Fz-14">
                        <a className="Td-n:h" href="#0">Quick Start</a>
                    </h1>
                    <h2 className="Fz-14 Bd-t Pt-20">GUIDES</h2>
                    <ul className="Reset NoLinkColor">
                        <li><a className="D-b Td-n:h C-logo:h Py-5" href="">Dispatcher</a></li>
                        <li><a className="D-b Td-n:h C-logo:h Py-5" href="">Stores</a></li>
                        <li><a className="D-b Td-n:h C-logo:h Py-5" href="">Actions</a></li>
                        <li><a className="D-b Td-n:h C-logo:h Py-5" href="">Controller Views</a></li>
                        <li><a className="D-b Td-n:h C-logo:h Py-5" href="">Data Services</a></li>
                        <li><a className="D-b Td-n:h C-logo:h Py-5" href="">Plugins</a></li>
                    </ul>
                    <h2 className="Fz-14 Bd-t Pt-20">TUTORIALS</h2>
                    <ul className="Reset NoLinkColor">
                        <li><a className="D-b Td-n:h C-logo:h Py-5" href="">Chat</a></li>
                        <li><a className="D-b Td-n:h C-logo:h Py-5" href="">Routing</a></li>
                        <li><a className="D-b Td-n:h C-logo:h Py-5" href="">Todo MVC</a></li>
                    </ul>
                </div>
                <div id="main" role="main" className="D-tbc D-b--sm Px-10 D-ib Va-t">
                    <h1 id="features">Features</h1>
                    <p>Content goes here</p>
                </div>
            </div>
        );
    }
});

module.exports = PageDocs;