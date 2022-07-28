/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { useEffect, useRef } from 'react';
import { connectToStores } from 'fluxible-addons-react';
import SearchAction from '../actions/searchReference';
import ReferenceStore from '../stores/ReferenceStore';

let throttle = false;

const SearchBox = ({ executeAction, store }) => {
    const textInput = useRef(null);
    const onKeyDown = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            if (throttle) {
                clearTimeout(throttle);
                throttle = false;
            }
            executeAction(SearchAction, e.target.value);
        }
    };

    const onQueryChange = () => {
        if (throttle) {
            clearTimeout(throttle);
        }
        throttle = setTimeout(() => {
            executeAction(SearchAction, textInput.current.value);
            throttle = false;
        }, 500);
    };

    useEffect(() => {
        textInput.current.value = store.currentQuery;
    }, [store.currentQuery]);

    return (
        <div id="search-section">
            <h2 className="Mb(0)">
                <label htmlFor="searchbox">Search:</label>
            </h2>
            <input
                id="searchbox"
                ref={textInput}
                type="search"
                role="search"
                className="W(100%) P(10px) Fz(20px) C(brandColor)"
                size="50"
                placeholder="Type classname or CSS declaration here..."
                title="Type classname or CSS declaration here..."
                autoFocus
                onChange={onQueryChange}
                onKeyDown={onKeyDown}
            ></input>
        </div>
    );
};

export default connectToStores(SearchBox, [ReferenceStore], (context) => ({
    executeAction: context.executeAction,
    store: context.getStore(ReferenceStore).getState(),
}));
