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
                <div id='splash' className='D(tb) W(100%) BdB Bdc(#0280ae.3) Bgc($brandColor)'>
                    <div className='D(tbc) Ta(c) Va(m)'>
                        <h1 className='Mx(a) W(50%) Pos(r) Ov(h)'>
                            <img id="logo" alt='atomic css' src={assets['images/atomic-css-logo.png']} />
                        </h1>
                        <p>
                            <NavLink className='M(20px) D(ib) Py(10px) Px(20px) Fz(20px) C(#fff) Bgc(#fff.3) Bdrs(2px) Bxsh(light) Tsh(1) Fw(b) Td(n):h' routeName='docs' navParams={{key: 'quick-start'}}>Get Started</NavLink>
                        </p>
                        <p className="Tt(u) C(#fff) M(0) Fz(12px) Py(5px) BdT Bdc(#fff.2) Lts(2px) Fw(400)"><b className="Fw(400)">TL;DR:</b> the style sheet of this web site is about 4KB (Gzipped).</p>
                    </div>
                </div>
                <div className='innerwrapper Bxz(bb) Pt(20px) Px(10px) Mb(50px) Mx(a)--sm Maw(1000px)--sm W(90%)--sm W(a)'>
                    <Doc content={this.props.content} />
                </div>
            </div>
        );
    }
});

module.exports = PageHome;