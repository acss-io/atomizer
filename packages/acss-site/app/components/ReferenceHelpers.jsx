/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

// external packages
import React from 'react';
import Rules from 'atomizer/src/helpers';
import Atomizer from 'atomizer';
import escapeStringRegexp from 'escape-string-regexp';

// stores
import ReferenceStore from '../stores/ReferenceStore';

// mixins
import {FluxibleMixin} from 'fluxible/addons';

// instantiate
var atomizer = new Atomizer();

var ReferenceRules = React.createClass({
    mixins: [FluxibleMixin],
    statics: {
        storeListeners: [ReferenceStore]
    },

    getInitialState: function () {
        this.store = this.getStore(ReferenceStore);
        return this.store.getState();
    },

    onChange: function () {
        var state = this.store.getState();
        this.setState(state);
    },

    hasClassUsingMatcher: function (matcher, classnames) {
        var value;
        for (var i=0, iLen=classnames.length; iLen; i++) {
            value = classnames[i];
            if (value.indexOf(matcher) === 0) { return true; }
        }
        return false;
    },

    render: function () {
        var searchRE = false;
        if (this.state.currentQuery) {
            var escapedString = escapeStringRegexp(this.state.currentQuery);
            searchRE = new RegExp(escapedString, 'i');
        } 
        var customConfig = this.state.customConfigObj;
        var hasConfig = !!customConfig;

        if (!hasConfig) {
            customConfig = {};
        }

        var items = Rules.map(function (recipe) {
            var usingClass = false,
                searching = !!this.state.currentQuery,
                searchMatches = null;

            if (customConfig.classNames && customConfig.classNames.length) {
                usingClass = this.hasClassUsingMatcher(recipe.matcher, customConfig.classNames);
            }

            // If config is provided, filter any rules not used in config
            if (hasConfig && !usingClass) {
                return;
            }

            if (searching) {
                searchMatches = (recipe.name.search(searchRE) > -1 || recipe.matcher.search(searchRE) > -1);
            }

            var showHelper = (!searching || searchMatches);

            var displayclassDefinitions = "Ov(h) " + (showHelper ? "D(b)" : "D(n)");
            return (
                <div key={'id-' + recipe.matcher} className={displayclassDefinitions}>
                    <h3 className="Cl(b) M(0) Mend(20px) Mt(15px) P(10px)">{recipe.matcher} <span className="C(#ccc)">({recipe.name})</span></h3>
                    <p className="M(0) Mstart(20px) P(10px) Pt(0) Ff(m)">{recipe.description} [<a href={recipe.link}>More<b className="Hidden"> about {recipe.matcher}</b></a>]</p>
                </div>
            );

        }, this);

        return (
            <div>
                {items}
            </div>
        );
    }
});

export default ReferenceRules;
