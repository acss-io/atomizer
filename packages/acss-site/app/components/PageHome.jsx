/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

// external packages
import React from 'react';
import {NavLink} from 'flux-router-component';

// other dependencies
import assets from '../utils/assets';

// components
import Doc from './Doc';

class PageHome extends React.Component {
    render() {
        return (
            <div>
                <div id='splash' className='D(tb) W(100%) BdB Bdc(#0280ae.3) Bgc(brandColor)'>
                    <div className='D(tbc) Ta(c) Va(m)'>
                        <h1 className='Mx(a) W(50%) Pos(r) C(#fff)'>
                            <img className='Pos(r) Z(7) Mt(-40px)--sm' id="logo" alt='atomic css' height="130" src={assets['images/atomic-css-logo.png']} />
                            <div className='My(10px) Fz(48px)'>Atomic CSS</div>
                        </h1>
                        <p>
                            <NavLink className='Mt(10px) Mb(20px) D(ib) Py(10px) Px(20px) Fz(20px) C(#fff) Bgc(#fff.3) Bdrs(2px) Bxsh(light) Tsh(1) Fw(b) Td(n):h' routeName='quickStart'>Get Started</NavLink>
                        </p>
                        <p className="Tt(u) C(#fff) M(0) Fz(12px) Py(5px) BdT Bdc(#fff.2) Lts(2px) Fw(400)">CSS for component-based frameworks</p>
                    </div>
                </div>
                <div className='innerwrapper Bxz(bb) Pt(40px) Px(10px) Mb(50px) Mx(a)--sm Maw(1000px)--sm W(90%)--sm W(a)'>
                    <Doc content={this.props.doc.content} />
                </div>
            </div>
        );
    }
}

export default PageHome;
