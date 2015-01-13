module.exports = {
    'config': {
        'namespace': '#atomic',
        'start': 'left',
        'end': 'right',
        'defaults': {
            'font-size': '16px',
            'border-color': '#555',
            'bleed-value': '-10px'
        },
        'breakPoints': {
            'sm': '767px',
            'md': '992px',
            'lg': '1200px'
        }
    },

    // pattern
    'border-custom': {
        'custom-sequenced-suffix': [
            // a
            [
                {suffix: 't', values: ['1px solid #000'], breakPoints: ['sm', 'md', 'lg']},
                {suffix: 'b', values: ['3px solid #f00']},
                {suffix: 'x', values: ['1px solid #f00', '3px solid #000']}
            ],
            // b
            [
                {suffix: 't', values: ['1px solid #fff']},
                {suffix: 'b', values: ['3px solid transparent']}
            ]
        ]
    },

    // rule
    'border-reset-top': true,
    'border-reset-end': true,
    'border-reset-bottom': true,
    'border-reset-start': true,

    // pattern
    'border-radius': {
        'custom': [
            {suffix: '0', values: ['0']},
            {suffix: '3px', values: ['3px']},
            {suffix: '5px', values: ['5px']},
            {suffix: '500px', values: ['500px']},
            {suffix: '50\\%', values: ['50%']},
        ]
    },

    // pattern
    'font-family': {
        s: true,
        ss: {values: ['Arial, sans-serif'], breakPoints: ['sm', 'md', 'lg']},
        c: true,
        f: true,
        m: true
    },

    // rule
    'background-none': true,
    'background-color-transparent': true,
    'background-image-none': true,

    // pattern
    'background-color': {
        'custom-sequenced-suffix': [
            // a
            {values: ['#000'], breakPoints: ['sm', 'md', 'lg']},

            // b
            {values: ['#fff']}
        ],
    },

    // pattern
    'background-clip': {
        'bb': true,
        'pb': true,
        'cb': true
    },

    // pattern
    'background-origin': {
        'bb': true,
        'pb': true,
        'cb': true
    },

    // pattern
    'background-size': {
        'a': true,
        'ct': true,
        'cv': true,
        'custom': [
            {suffix: '50\\%-auto', values: ['50% auto']}
        ]
    },

    // pattern
    'background-attachment': {
        'f': true,
        'l': true,
        's': true
    },

    // pattern
    'background-position': {
        'ts': true,
        'te': true,
        'bs': true,
        'be': true
    },

    // pattern
    'background-repeat': {
        'n': true,
        'x': true,
        'y': true,
        'r': true,
        's': true,
        'ro': true
    },

    // pattern
    'border-collapse': {
        'c': true,
        's': true,
        'inh': true
    },

    // pattern
    'box-sizing': {
        'cb': true,
        'pb': true,
        'bb': true,
        'inh': true,
    },

    // pattern
    'box-shadow': {
        'n': true,
        'custom-sequenced-suffix': [
            // a
            {values: ['1px 1px 4px #555']},
            // b
            {values: ['0 0 5px #333']}
        ]
    },

    // pattern
    'font-weight': {
        'n': {
            breakPoints: ['sm', 'md', 'lg']
        },
        'b': true,
        'br': true,
        'lr': true,
        'lh': true,
        'inh': true,
        '100': true,
        '200': true,
        '300': true,
        '400': true,
        '500': true,
        '600': true,
        '700': true,
        '800': true,
        '900': true
    },

    // pattern
    'padding-x': {
        'custom': [
            {suffix: '10', values: ['10px'], breakPoints: ['sm', 'md', 'lg']},
            {suffix: '20', values: ['20px']}
        ]
    },

    // pattern
    'width': {
        a: true,
        inh: true,
        fraction: {
            denominator: 12,
            breakPoints: ['sm', 'md', 'lg']
        }
    },

    // pattern
    'text-align': {
        start: true,
        end: true,
        c: true,
        j: true,
        m: true
    },

    // rule
    'bfc': true,

    // rule
    'dn': {
        breakPoints: ['sm', 'md', 'lg']
    },

    // pattern
    'height': {
        a: true,
        'custom': [
            {suffix: '100px', values: ['100px']},
            {suffix: '100\\%', values: ['100%']},
        ]
    }
};