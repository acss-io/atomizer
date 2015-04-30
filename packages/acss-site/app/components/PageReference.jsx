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
                <p>Use this page to search for Atomic classes. Visit <a href="/guides/syntax.html" aria-label="about the syntax">this one</a> to understand the syntax, <a href="/guides/syntax.html#examples-" aria-label="examples">this one</a> to look at examples, <a href="/guides/atomic-classes.html" aria-label="about custom classes">this one</a> to learn about custom classes, and check <a href="/guides/helper-classes.html" aria-label="about the helpers">this one</a> for helper/utility classes.</p>
                <Reference />
            </div>
        );
    }
}

export default PageReference;
