---
description: Interactive environment to test the Atomizer sytnax.
layout: default
section: repl
title: Hello world - REPL
---

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.7/codemirror.min.css">

<div class="Bgc(#383838)">
    <div class="D(f) Ai(c) Jc(sb) Mx(a)--sm Maw(1280px)--sm W(90%)--sm W(a)--sm Pstart(10px) Pstart(0)--lg">
        <h1 class="D(n)--xs M(0) Mb(-3px) Lh(0) Fz(16px) C(#eee)">Hello world</h1>
        {% include search.html %}
        <ul class="D(f) M(0)">
            <li class="Mend(20px)--sm">
                <button id="fullscreen" class="D(f) Ai(c) Jc(sb) Pt(10px) Pb(10px) Bg(n) Bd(n) C(#ccc) C(#fff):h Cur(p) Fz(14px)" title="Toggle fullscreen mode">
                    <svg class="D(b) fs-on_D(n)" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z"></path>
                    </svg>
                    <svg class="D(n) fs-on_D(b)" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />
                    </svg>
                    <span class="D(n)--xs Pstart(5px)">Fullscreen</span>
                </button>
            </li>
            <li>
                <button id="save" class="D(f) Ai(c) Pt(10px) Pb(10px) Bg(n) Bd(n) C(#ccc) C(#fff):h Cur(p) Fz(14px)" title="Download zip file">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M2 12H4V17H20V12H22V17C22 18.11 21.11 19 20 19H4C2.9 19 2 18.11 2 17V12M12 15L17.55 9.54L16.13 8.13L13 11.25V2H11V11.25L7.88 8.13L6.46 9.55L12 15Z"></path>
                    </svg>
                    <span class="D(n)--xs Pstart(5px)">Download</span>
                </button>
            </li>
        </ul>
    </div>
</div>

<div class="D(f) Fxf(c) W(100%) H(90vh) Fz(14px)">
    <div class="D(f) H(39vh)">
        <div class="Fxb(0%) Fxg(1) Fxs(1) Pos(r) Ovx(s)">
            <h2 class="Pos(a) T(5px) End(10px) Z(2) M(0px) Px(10px) Py(0px) Fz(14px) Bgc(#383838) C(#ccc)">html</h2>
            <textarea id="markup">
&lt;!-- Edit the HTML markup here. --&gt;
<div class="W(30%)--sm Mx(a) Mt(3rem) P(20px) Bg(#0280ae) C(#fff) Bdrs(15px) Ff(arial)">
    <h1 class="Ta(c)">Hello world!</h1>
    <p class="My(10px) Lh(1.3)">Modify the markup by changing the code in the "html" box. As you add and remove <a href="./guides/atomizer-classes.html">Atomizer classes</a>, this preview will update live and the CSS will be auto generated in the "css" box above.</p>
    <p class="Lh(1.3)">You can further customize Atomizer by adding your own breakpoints or custom values. Take a look at the <a href="./configuration.html">Configuration guide</a> for more information.</p>
    <p>Like what you see? Use the Download button to save it locally and build your next project!</p>
</div>
            </textarea>
        </div>

        <div class="D(n)--xs Fxb(0%) Fxg(1) Fxs(1) Pos(r) Bdstart(replBorder) Bdend(replBorder)">
            <h2 class="Pos(a) T(5px) End(10px) Z(2) M(0px) Px(10px) Py(0px) Fz(14px) Bgc(#383838) C(#ccc)">
                <a href="./configuration.html">config</a>
            </h2>
            <textarea id="config">
{
    "breakPoints": {
        "sm": "@media(min-width:750px)",
        "md": "@media(min-width:1000px)",
        "lg": "@media(min-width:1200px)"
    },
    "custom": {
        "arial": "Arial, sans-serif"
    },
    "classNames": []
}
            </textarea>
        </div>
        <div class="D(n)--xs Fxb(0%) Fxg(1) Fxs(1) Pos(r)">
            <h2 class="Pos(a) T(5px) End(10px) Z(2) M(0px) Px(10px) Py(0px) Fz(14px) Bgc(#383838) C(#ccc)">css</h2>
            <textarea id="css"></textarea>
        </div>
    </div>
    <div style="flex: 1 1 auto">
        <div id="message" class="D(n) Pos(a) W(100%) Bxz(bb) Px(5px) Py(10px) Bgc(#da101b) C(#fff)"></div>
        <iframe id="preview" class="Bd(n) W(100%) H(100%) Ovx(s)"></iframe>
    </div>
</div>

<script src="{{'/assets/js/repl.js' | relative_url }}"></script>
