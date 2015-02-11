/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var Doc = require('./Doc');
var NavLink = require('flux-router-component').NavLink;

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
            <div className="home">
                <div id='splash' className='D-tb W-100% Bdb-1'>
                    <div className='D-tbc Ta-c Va-m'>
                        <h1 className='Mx-a W-50% Pos-r Ov-h'>
                            <img className='Start-0 Pos-a Pos-r--sm' alt='atomic css' src='/public/images/atomic-css-logo.svg' />
                        </h1>
                        <p className='My-20'>Build whatever you want</p>
                        <p>
                            <NavLink className='D-ib Mb-10 P-20 C-fff Bgc-logo Bdrs-100 Td-n:h OptLegibility' routeName='docs' navParams={{key: 'quick-start'}}>Get Started</NavLink>
                        </p>
                    </div>
                </div>
                <div role='main' className='innerwrapper Bxz-bb Pt-20 Mb-50 Px-10 Mx-a--sm W-80%--sm W-a'>
                    <Doc content={this.props.content} />
                </div>
            </div>
        );
    }
});

module.exports = PageHome;