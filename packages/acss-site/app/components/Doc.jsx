/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var navigateAction = require('flux-router-component').navigateAction;
var DOCS_URL = 'https://github.com/yahoo/acss-site/tree/master';

function isLeftClickEvent (e) {
    return e.button === 0;
}
function isModifiedEvent (e) {
    return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}

var Component = React.createClass({
    onClick: function (e) {
        var target = e.target;
        if ('A' === target.nodeName && '/' === target.getAttribute('href').substr(0, 1)) {
            if (isModifiedEvent(e) || !isLeftClickEvent(e)) {
                return;
            }
            this.executeAction(navigateAction, {
                url: target.getAttribute('href')
            });
            e.preventDefault();
        }
    },
    render: function () {
        var editEl = '';

        // only output on docs pages
        if (this.props.slug && this.props.slug.indexOf('docs') !== -1) {
            editEl = (<a href={DOCS_URL + this.props.slug} className="D-ib Va-m" target='_blank'>Edit on Github</a>)
        }

        return (
            <div id="main" role="main" className="D-tbc D-b--sm Px-10 D-ib Va-t">
                <div className="OppositeBoxes">
                    <h1 className="D-ib Va-m Fz-30">
                        {this.props.title}
                    </h1> {editEl}
                </div>
                <div onClick={this.onClick} dangerouslySetInnerHTML={{__html: this.props.content}}></div>
            </div>
        );
    }
});

module.exports = Component;
