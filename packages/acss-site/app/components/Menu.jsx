/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

// external packages
import React from 'react';
import cx from 'classnames';
import {NavLink} from 'flux-router-component';
import docsConfig from './../configs/menu';

class Menu extends React.Component {
    render() {
        let menu = [];

        docsConfig.forEach((menuitem) => {
            let submenu = [];

            if (menuitem.category) {
                menu.push(<h3 className="Fz(14px) BdT Fw(n) Pt(20px)" key={menuitem.category}>{menuitem.category}</h3>);
            }

            menuitem.children.forEach((link) => {
                let classList = cx({
                    'selected': this.props.selected === link.routeName
                });

                submenu.push(
                    <li key={link.label} className={classList}>
                        <NavLink className="D(b) Td(n):h Py(5px) Pos(r)" routeName={link.routeName}>{link.label}</NavLink>
                    </li>
                );
            });

            if (submenu.length) {
                menu.push(<ul className="M(0) P(0)" key={menuitem.category + 'sub'}>{submenu}</ul>);
            }
        });

        return (
            <div id="aside" className="D(tbc) Bgc(#fff) Mt(-20px)--xs Pos(a)--xs Va(t) W(150px)--sm End(0) Pt(20px) Pb(40px) Pstart(10px) Pend(50px)--sm Z(5) End(a)--sm Start(0) Pos(a) Pos(r)--sm" role="aside">
                {menu}
            </div>
        );
    }
}

export default Menu;

