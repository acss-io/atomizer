/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Rules from 'atomizer/src/helpers';
import escapeStringRegexp from 'escape-string-regexp';
import { connectToStores } from 'fluxible-addons-react';
import ReferenceStore from '../stores/ReferenceStore';

function hasClassUsingMatcher(matcher, classnames) {
    let value;
    for (let i = 0, iLen = classnames.length; iLen; i++) {
        value = classnames[i];
        if (value.indexOf(matcher) === 0) {
            return true;
        }
    }
    return false;
}

const ReferenceHelpers = ({ store }) => {
    let searchRE = false;
    if (store.currentQuery) {
        const escapedString = escapeStringRegexp(store.currentQuery);
        searchRE = new RegExp(escapedString, 'i');
    }
    let customConfig = store.customConfigObj;
    const hasConfig = !!customConfig;

    if (!hasConfig) {
        customConfig = {};
    }

    const items = Rules.map(function (recipe) {
        const searching = !!store.currentQuery;
        let usingClass = false;
        let searchMatches = null;

        if (customConfig.classNames && customConfig.classNames.length) {
            usingClass = hasClassUsingMatcher(recipe.matcher, customConfig.classNames);
        }

        // If config is provided, filter any rules not used in config
        if (hasConfig && !usingClass) {
            return;
        }

        if (searching) {
            searchMatches = recipe.name.search(searchRE) > -1 || recipe.matcher.search(searchRE) > -1;
        }

        const showHelper = !searching || searchMatches;
        const displayclassDefinitions = `Ov(h) ${showHelper ? 'D(b)' : 'D(n)'}`;

        return (
            <div key={`id-${recipe.matcher}`} className={displayclassDefinitions}>
                <h3 className="Cl(b) M(0) Mend(20px) Mt(15px) P(10px)">
                    {recipe.matcher} <span className="C(#ccc)">({recipe.name})</span>
                </h3>
                <p className="M(0) Mstart(20px) P(10px) Pt(0) Ff(m)">
                    {recipe.description} [
                    <a href={recipe.link}>
                        More<b className="Hidden"> about {recipe.matcher}</b>
                    </a>
                    ]
                </p>
            </div>
        );
    }, this);

    return <div>{items}</div>;
};

export default connectToStores(ReferenceHelpers, [ReferenceStore], (context) => ({
    store: context.getStore(ReferenceStore).getState(),
}));
