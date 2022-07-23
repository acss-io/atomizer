/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { useEffect } from 'react';
import SearchBox from './SearchBox';
import ReferenceRules from './ReferenceRules';
import ReferenceHelpers from './ReferenceHelpers';

const Reference = () => {
    useEffect(() => {
        // if #foo anchor is in the url, scroll to element (used by quick search)
        if (document.location.hash) {
            const hash = document.location.hash.substring(1);
            const element = document.getElementById(hash);
            element?.scrollIntoView();
        }
    });

    return (
        <div>
            <SearchBox />

            <h2 id="acss-classes">Atomizer Classes</h2>
            <ReferenceRules />

            <h2 id="helper-classes">Helper Classes</h2>
            <ReferenceHelpers />
        </div>
    );
};

export default Reference;
