module.exports = {
    // Breakpoints, for media queries
    breakPoints: {
        'sm': '@media(min-width:500px)',
        'md': '@media(min-width:900px)',
        'lg': '@media(min-width:1200px)'
    },

    // Custom suffixes, which allow you to reuse common style values 
    // in multiple CSS classes
    'custom': {
        uh: '79px',
        primary: '#f6a1e1'
    },

    // Classnames.  This list may be augmented by any classes
    // found during the optional parsing of content. 
    'classNames': [
        // normal
        'Td-u',
        // pseudos
        'Td-u:h',
        // breakpoints
        'Td-u--sm',
        // custom suffixes - maps to 'custom' object properties above
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