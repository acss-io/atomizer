/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import SearchBox from './SearchBox';
import ReferenceRules from './ReferenceRules';
import ReferenceHelpers from './ReferenceHelpers';

const Reference = () => {
    return (
        <div>
            <SearchBox />

            <h2 id="acss-classes">ACSS Classes</h2>
            <ReferenceRules />

            <h2 id="helper-classes">Helper Classes</h2>
            <ReferenceHelpers />
        </div>
    );
};

export default Reference;
