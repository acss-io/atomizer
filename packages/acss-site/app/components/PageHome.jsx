/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var Doc = require('./Doc');
var NavLink = require('flux-router-component').NavLink;
var assets = require('../utils/assets');

/**
 * PageHome
 *
 * @class PageHome
 * @constructor
 */
var PageHome = React.createClass({
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
            <div className="home-page">
                <div id='splash' className='D-tb W-100% Bdb-1'>
                    <div className='D-tbc Ta-c Va-m'>
                        <h1 className='Mx-a W-50% Pos-r Ov-h'>
                            <img id="logo" className='Start-0 Pos-a Pos-r--sm' alt='atomic css' src={assets['images/atomic-css-logo.svg']} />
                        </h1>
                        <p className='My-20px'>Build whatever you want, the way you want it.</p>
                        <p>
                            <NavLink className='D-ib Mb-10px P-20px C-fff Bgc-logo Bdrs-100px Td-n:h' routeName='docs' navParams={{key: 'quick-start'}}>Get Started</NavLink>
                        </p>
                    </div>
                </div>
                <div className='innerwrapper Bxz-bb Pt-20px Px-10px Mb-50px Mx-a--sm W-90%--sm W-a'>
                    <Doc content={this.props.content} />
                </div>
            </div>
        );
    }
});

module.exports = PageHome;