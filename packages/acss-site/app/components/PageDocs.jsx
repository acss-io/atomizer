/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

// external packages
import React from 'react';
import cx from 'classnames';

// components
import Menu from './Menu';
import Doc from './Doc';

class PageDocs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuVisible: false
        };
    }

    handleMenuToggle() {
        this.setState({
            isMenuVisible: !this.state.isMenuVisible
        });
    }

    render() {
        let wrapperClasses = cx({
            'menu-on': this.state.isMenuVisible,
            'docs-page innerwrapper D(tb)--sm Tbl(f) Pt(20px) Mb(50px) Maw(1000px)--sm Miw(1000px)--lg Mx(a)--sm W(96%)--sm': true
        });

        return (
            <div className={wrapperClasses}>
                <button onClick={this.handleMenuToggle} id="toggleMenuButton" className="menu-button Bgi(hamburger) W(32px) H(32px) D(n)--sm Pos(a) Bdw(0) Bgc(t) P(0) T(0) Start(0) Z(7) M(10px) menu-on_Bgpx(end) menu-on_Bgpy(t)">
                    <b className="Hidden">Toggle the menu</b>
                </button>
                <Menu selected={this.props.currentRoute.name} />
                <Doc content={this.props.doc.content} title={this.props.doc.title} slug={this.props.doc.key} />
                <div id="overlay" className="D(n) D(n)!--sm menu-on_D(b) Bgc(#000.6) Z(3) Pos(f) T(0) Start(0) W(100%) H(100%)"></div>
            </div>
        );
    }
}

export default PageDocs;
