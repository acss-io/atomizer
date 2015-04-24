/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import React from 'react';
import {NavLink} from 'flux-router-component';

class Status404 extends React.Component {
    render() {
        return (
            <div className="innerwrapper Bxz(bb) Pt(40px) Px(10px) Mb(50px) Mx(a)--sm Maw(1000px)--sm W(90%)--sm W(a)">
                <h1>Not found</h1>
                <p>Sorry we could not find that resource.</p>
                <p><NavLink routeName="home">Back to the home page.</NavLink></p>
            </div>
        );
    }
}

export default Status404;
