/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

// external packages
import React from 'react';

// other dependencies
import Reference from './Reference';

class PageReference extends React.Component {
    render() {
        return (
            <div id="reference" role="main" className="reference-page innerwrapper Mb(50px) Mx(10px) Maw(1000px)--sm Mx(a)--sm W(90%)--sm">
                <h1>Reference</h1>
                <Reference />
            </div>
        );
    }
}

export default PageReference;
