/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

// external packages
import React from 'react';
import cx from 'classnames';
import {NavLink} from 'flux-router-component';

// other dependencies
import assets from '../utils/assets';

class Nav extends React.Component {
    render() {
        let selected = this.props.selected;

        return (
            <ul role="navigation" className="Va(m) M(0) P(0)">
                <li className={cx({'selected': selected !== 'reference' && selected !== 'support' && selected !== 'home', 'D(ib) Va(m) Pos(r)': true})}>
                    <NavLink routeName="quickStart" className="D(b) C(#fff) Td(n):h">Docs</NavLink>
                </li>
                <li className={cx({'selected': selected === 'reference', 'D(ib) Va(m) Pos(r) Mstart(15px)': true})}>
                    <NavLink routeName="reference" className="D(b) C(#fff) Td(n):h">Reference</NavLink>
                </li>
                <li className={cx({'selected': selected === 'support', 'D(ib) Va(m) Pos(r) Mstart(15px)': true})}>
                    <NavLink routeName="support" className="D(b) C(#fff) Td(n):h">Support</NavLink>
                </li>
                <li className="D(ib) Mstart(15px) Pos(r)">
                    <a className="D(b) C(#fff) Td(n):h" href="https://github.com/yahoo/atomizer">
                        <img className="Va(m) Pos(r)" alt="GitHub" width="30" src={assets['images/github-logo.png']} />
                    </a>
                </li>
            </ul>
        );
    }
}

export default Nav;
