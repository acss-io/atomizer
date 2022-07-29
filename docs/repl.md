---
section: repl
layout: default
title: REPL
---

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.7/codemirror.min.css">
<link rel="stylesheet" href="{{'/assets/css/repl.css' | relative_url }}">

<div class="D(f) W(100%) H(45vh) Fz(14px)">
    <div class="Fxb(0%) Fxg(1) Fxs(1) Pos(r) Ovx(s)">
        <h2 class="Pos(a) T(5px) End(10px) Z(2) M(0px) Px(10px) Py(0px) Fz(16px) Bgc(#383838) C(#ccc)">html</h2>
        <textarea id="markup">
&lt;!-- Edit the HTML markup here. --&gt;
<div class="D(f) Jc(c) Ai(c) H(100%) Ff(arial)">
    <div class="W(30%) P(20px) Bg(#0280ae) C(#fff) Bdrs(15px)">
        <h1 class="Ta(c)">Welcome to the Atomizer REPL!</h1>
        <p class="My(10px) Lh(1.3)">Modify the markup by changing the code in the "html" box. As you add and remove <a href="./guides/atomizer-classes.html">Atomizer classes</a>, this preview will update live and the CSS will be auto generated in the "css" box above.</p>
        <p class="Lh(1.3)">You can further customize Atomizer by adding your own breakpoints or custom values. Take a look at the <a href="./configuration.html">Configuration guide</a> for more information.</p>
        <p class="Lh(1.3)">You can further customize Atomizer by adding your own breakpoints or custom values. Take a look at the <a href="./configuration.html">Configuration guide</a> for more information.</p>
        <p class="Lh(1.3)">You can further customize Atomizer by adding your own breakpoints or custom values. Take a look at the <a href="./configuration.html">Configuration guide</a> for more information.</p>
        <p class="Lh(1.3)">You can further customize Atomizer by adding your own breakpoints or custom values. Take a look at the <a href="./configuration.html">Configuration guide</a> for more information.</p>
    </div>
</div>
        </textarea>
    </div>

    <div class="Fxb(0%) Fxg(1) Fxs(1) Pos(r) Bdstart(replBorder) Bdend(replBorder)">
        <h2 class="Pos(a) T(5px) End(10px) Z(2) M(0px) Px(10px) Py(0px) Fz(16px) Bgc(#383838) C(#ccc)">
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
        <h2 class="Pos(a) T(5px) End(10px) Z(2) M(0px) Px(10px) Py(0px) Fz(16px) Bgc(#383838) C(#ccc)">css</h2>
        <textarea id="css"></textarea>
    </div>
</div>

<div>
    <iframe id="preview" class="Bd(n) W(100%) H(40vh) Ovx(s)"></iframe>
</div>

<script src="{{'/assets/js/repl.js' | relative_url }}"></script>
