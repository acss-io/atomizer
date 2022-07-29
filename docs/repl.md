---
section: repl
layout: default
title: Hello world - REPL
---

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.7/codemirror.min.css">

<div class="Bgc(#383838)">
    <ul class="D(f) Ac(c) Jc(fe) Mx(a)--sm Maw(1280px)--sm W(90%)--sm W(a)--sm M(0)">
        <li>
            <button id="save" class="D(f) Ai(c) Pt(10px) Pb(10px) Bg(n) Bd(n) C(#ccc) C(#fff):h Cur(p) Fz(14px)" title="Download zip file">
                <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M2 12H4V17H20V12H22V17C22 18.11 21.11 19 20 19H4C2.9 19 2 18.11 2 17V12M12 15L17.55 9.54L16.13 8.13L13 11.25V2H11V11.25L7.88 8.13L6.46 9.55L12 15Z"></path>
                </svg>
                <span class="Pstart(5px)">Download</span>
            </button>
        </li>
    </ul>
</div>

<div class="D(f) Fxf(c) W(100%) H(90vh) Fz(14px)">
    <div class="D(f) H(39vh)">
        <div class="Fxb(0%) Fxg(1) Fxs(1) Pos(r) Ovx(s)">
            <h2 class="Pos(a) T(5px) End(10px) Z(2) M(0px) Px(10px) Py(0px) Fz(14px) Bgc(#383838) C(#ccc)">html</h2>
            <textarea id="markup">
&lt;!-- Edit the HTML markup here. --&gt;
<div class="W(30%) Mx(a) Mt(3rem) P(20px) Bg(#0280ae) C(#fff) Bdrs(15px) Ff(arial)">
    <h1 class="Ta(c)">Hello world!</h1>
    <p class="My(10px) Lh(1.3)">Modify the markup by changing the code in the "html" box. As you add and remove <a href="./guides/atomizer-classes.html">Atomizer classes</a>, this preview will update live and the CSS will be auto generated in the "css" box above.</p>
    <p class="Lh(1.3)">You can further customize Atomizer by adding your own breakpoints or custom values. Take a look at the <a href="./configuration.html">Configuration guide</a> for more information.</p>
</div>
            </textarea>
        </div>

        <div class="Fxb(0%) Fxg(1) Fxs(1) Pos(r) Bdstart(replBorder) Bdend(replBorder)">
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
        <div class="Fxb(0%) Fxg(1) Fxs(1) Pos(r)">
            <h2 class="Pos(a) T(5px) End(10px) Z(2) M(0px) Px(10px) Py(0px) Fz(14px) Bgc(#383838) C(#ccc)">css</h2>
            <textarea id="css"></textarea>
        </div>
    </div>
    <div style="flex: 1 1 auto">
        <iframe id="preview" class="Bd(n) W(100%) H(100%) Ovx(s)"></iframe>
    </div>
</div>

<script src="{{'/assets/js/repl.js' | relative_url }}"></script>
