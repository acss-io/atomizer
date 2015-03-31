/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react/addons');
var cx = React.addons.classSet;
var NavLink = require('flux-router-component').NavLink;

var Component = React.createClass({
    render: function () {
        var self = this;
        var menu = [];
        this.props.config.forEach(function (menuitem) {
            if (menuitem.category) {
                menu.push(<h3 className="Fz-14px Bdt-1 Fw-n Pt-20px" key={menuitem.category}>{menuitem.category}</h3>);
            }

            var submenu = [];
            menuitem.children.forEach(function (link) {
                var selected = '/' + link.routeName + '/' +
                    (link.navParams.type ? link.navParams.type + '/' : '') +
                    link.navParams.key + '.md';
               submenu.push(<li key={link.label} className={cx({'selected': self.props.selected === selected})}><NavLink className="D-b Td-n:h Py-5px Pos-r" routeName={link.routeName} navParams={link.navParams}>{link.label}</NavLink></li>);
            });

            if (submenu.length) {
                menu.push(<ul className="M-0 P-0" key={menuitem.category + 'sub'}>{submenu}</ul>);
            }
        });
        return (
            <div id="aside" className="D-tbc Bgc-#fff Mt-neg20px--xs Pos-a--xs Va-t W-150px--sm End-0 Pt-20px Pb-40px Pstart-10px Pend-50px--sm Z-5 End-a--sm Start-0 Pos-a Pos-r--sm" role="aside">
                {menu}
            </div>
        );
    }
});

module.exports = Component;
