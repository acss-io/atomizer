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

    // custom-properties
    'border': [
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
    ],

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