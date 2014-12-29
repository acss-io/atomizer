module.exports = {
    'config': {
        'namespace': '#atomic',
        'start': 'left',
        'end': 'right',
        'defaults': {
            'font-size': '16px',
            'border-color': '#555',
            'bleed-value': '-10px'
        }
    },
    'border': ['1px solid #000', '2px solid #fff'],
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
    'padding-x': {
        'custom': [
            {suffix: '10', values: ['10px']},
            {suffix: '20', values: ['20px']}
        ]
    },
    'text-align': {
        start: true,
        end: true,
        c: true,
        j: true,
        m: true
    },
    'bfc': true,
    'height': {
        a: true,
        'custom': [
            { suffix: '100px', values: ['100px'] },
            { suffix: '100\\%', values: ['100%'] },
        ]
    }
};