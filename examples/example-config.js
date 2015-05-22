module.exports = {
    // 'custom' maps custom suffixes to values and it is specially useful for theming
    // or things that you need to change globally in many different atomic classes.
    // these key/value pairs map to the custom suffixes in 'classNames'.
    // i.e. H-uh will get height: 79px and C-primary will get color: #f6a1e1
    'custom': {
        uh: '79px',             // custom 1 (see classNames below)
        primary: '#f6a1e1'      // custom 2 (see classNames below)
    },
    // breakpoints define media queries and is used to contain the style of a class
    // only when that media query is active.
    // i.e. given the breakpoint below, `D-b--sm` will be inside of the media query
    // `@media(min-width:500px)`, meaning that it will only apply `display:block`
    // once the viewport has at least 500px.
    breakPoints: {
        'sm': '@media(min-width:500px)', // breakpoint 1 (see classNames below)
        'md': '@media(min-width:900px)', // breakpoint 2
        'lg': '@media(min-width:1200px)' // breakpoint 3
    },
    // this is the list of atomic class names your project uses.
    // you don't have to explictly declare them like this since atomizer can parse
    // any file and create this list automatically for you.  However, you always 
    // have the option to explicitly declare classnames if you find it helpful for your
    // project.
    'classNames': [
        'H(uh)',            // custom 1 (maps to 'custom' key above)
        'C(primary)',       // custom 2 (maps to 'custom' key above)
        'Td(u)',            // normal
        'Td(u):h',          // pseudo classs
        'D(b)--sm',         // breakpoint 1
        'foo>W(uh)',        // descendent
        'D(n)!',            // important
        'Op(1)!',           // important
        'Fl(start)',        // normal (rtl support)
        'Fl(end)',          // normal (rtl support)
        'W(1/12)',          // fraction
        'W(2/12)',          // fraction
        'W(3/12)',          // fraction
        'W(4/12)',          // fraction
        'W(5/12)',          // fraction
        'W(6/12)',          // fraction
        'W(7/12)',          // fraction
        'W(8/12)',          // fraction
        'W(9/12)',          // fraction
        'W(10/12)',         // fraction
        'W(11/12)',         // fraction
        'W(12/12)',         // fraction
        'W(1/12)--sm',      // fraction with breakpoint
        'Bgc(#333)',        // hex value
        'Bgc(#fff.8)'       // hex value + alpha
    ],
    // this is the opposite of the above. There are cases that you may want to tell
    // atomizer to ignore class names already defined in `classNames`.
    // This is useful when classes are automatically added by the parser or when 
    // you want to create different atomic css files from the same set of classNames.
    'exclude': [
        'Fl(end)'
    ]
};
