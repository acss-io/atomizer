module.exports = {
    'custom': {
        uh: '79px',
        primary: '#f6a1e1'
    },
    breakPoints: {
        'sm': '@media(min-width:500px)',
        'md': '@media(min-width:900px)',
        'lg': '@media(min-width:1200px)'
    },
    'classNames': [
        // normal
        'Td-u',
        // pseudos
        'Td-u:h',
        // breakpoints
        'Td-u--sm',
        // custom
        'H-uh',
        'C-primary',
        // descendent
        'foo>W-uh',
        // important
        'D-n!',
        'Op-1!',
        // rtl
        'Fl-start',
        'Fl-end',
        // percentages
        'W-1/12',
        'W-2/12',
        'W-3/12',
        'W-4/12',
        'W-5/12',
        'W-6/12',
        'W-7/12',
        'W-8/12',
        'W-9/12',
        'W-10/12',
        'W-11/12',
        'W-12/12',
        'W-1/12--sm'
    ]
};