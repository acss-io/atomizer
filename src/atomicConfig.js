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
        {
            t: ['1px solid #000'],
            b: ['3px solid #f00'],
            x: ['1px solid #f00', '3px solid #000']
        },
        // b
        {
            t: ['1px solid #fff'],
            b: ['3px solid transparent']
        }
    ],

    // pattern
    'font-weight': {
        'n': true,
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
            {suffix: '10', values: ['10px']},
            {suffix: '20', values: ['20px']}
        ]
    },

    // pattern
    'width': {
        a: true,
        inh: true
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

    // pattern
    'height': {
        a: true,
        'custom': [
            { suffix: '100px', values: ['100px'] },
            { suffix: '100\\%', values: ['100%'] },
        ]
    }
};