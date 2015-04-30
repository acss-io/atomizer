/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

// external packages
import React from 'react';
import cx from 'classnames';
import {FluxibleMixin} from 'fluxible/addons';

// components
import Menu from './Menu';
import Doc from './Doc';

// stores
import ApplicationStore from '../stores/ApplicationStore';

var PageDocs = React.createClass({
    mixins: [FluxibleMixin],
    statics: {
        storeListeners: [ApplicationStore]
    },
    onChange: function () {
        this.setState({
            isMenuVisible: false
        });
    },
    getInitialState: function () {
        return {
            isMenuVisible: false
        }
    },
    handleMenuToggle: function () {
        this.setState({
            isMenuVisible: !this.state.isMenuVisible
        });
    },
    handleKeyUp: function (e) {
        if (e.keyCode === 27 && this.state.isMenuVisible) {
            this.handleMenuToggle();
        }
    },
    componentDidMount: function () {
        document.addEventListener('keyup', this.handleKeyUp);
    },
    componentWillUnmount: function () {
        document.removeEventListener('keyup', this.handleKeyUp);
    },
    render: function () {
        let wrapperClasses = cx({
            'menu-on': this.state.isMenuVisible,
            'docs-page innerwrapper D(tb)--sm Tbl(f) Pt(20px) Mb(50px) Maw(1000px)--sm Miw(1000px)--lg Mx(a)--sm W(96%)--sm': true
        });

        return (
            <div className={wrapperClasses}>
                <button onClick={this.handleMenuToggle} id="toggleMenuButton" className="menu-button Bgi(hamburger) W(32px) H(32px) D(n)--sm Pos(a) Bdw(0) Bgc(t) P(0) T(0) Start(0) Z(7) M(10px) menu-on_Bgp(end_t)">
                    <b className="Hidden">Toggle the menu</b>
                </button>
                <Menu onClickHandler={this.handleMenuToggle} selected={this.props.currentRoute.name} />
                <Doc content={this.props.doc.content} title={this.props.doc.title} currentRoute={this.props.currentRoute} />
                <div onClick={this.handleMenuToggle} id="overlay" className="D(n) D(n)!--sm menu-on_D(b) Bgc(#000.6) Z(3) Pos(f) T(0) Start(0) W(100%) H(100%)"></div>
            </div>
        );
    }
});

export default PageDocs;
