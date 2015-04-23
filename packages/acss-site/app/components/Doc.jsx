/* global CodePenEmbed */
/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

// external packages
import React from 'react';
import {navigateAction} from 'flux-router-component';

// constants
const DOCS_URL = 'https://github.com/yahoo/acss-site/tree/master/app';

function isLeftClickEvent (e) {
    return e.button === 0;
}
function isModifiedEvent (e) {
    return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}

class Doc extends React.Component {
    onClick(e) {
        let target = e.target;

        if ('A' === target.nodeName && '/' === target.getAttribute('href').substr(0, 1)) {
            if (isModifiedEvent(e) || !isLeftClickEvent(e)) {
                return;
            }

            this.context.executeAction(navigateAction, {
                url: target.getAttribute('href')
            });

            e.preventDefault();
        }
    }

    componentDidUpdate() {
        if (typeof CodePenEmbed !== 'undefined') {
            CodePenEmbed.showCodePenEmbeds();
        }
    }

    render() {
        let editEl = '';
        let title = this.props.title ? (<div className="SpaceBetween"><h1 className="D(ib) Va(m) Fz(30px)">{this.props.title}</h1> {editEl}</div>) : '';

        if (this.props.currentRoute && this.props.currentRoute.config.githubPath !== -1) {
            editEl = (
                <a href={DOCS_URL + this.props.currentRoute.config.githubPath} className="D(ib) Va(m) Mt(30px)" target='_blank'>
                    Edit on Github
                </a>
            )
        }

        return (
            <div id="main" role="main" className="D(tbc)--sm home-page_D(b)! Px(10px)">
                {title}
                <div onClick={this.onClick} dangerouslySetInnerHTML={{__html: this.props.content}}></div>
            </div>
        );
    }
}

Doc.defaultProps = {
    content: ''
};

Doc.contextTypes = {
    executeAction: React.PropTypes.func
};

export default Doc;
