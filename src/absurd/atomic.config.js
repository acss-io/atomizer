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
    'font-weight': {
        'b': true,
        'br': true,
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
        'a': true,
        'custom': [
            {suffix: '10', values: ['10px']},
            {suffix: '20', values: ['20px']}
        ]
    },
    'bfc': true
};