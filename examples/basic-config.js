module.exports = {
    'config': {
        'namespace': '#atomic',
        'start': 'left',
        'end': 'right',
        'breakPoints': {
            'sm': '767px',
            'md': '992px',
            'lg': '1200px'
        }
    },

    // pattern
    'display': {
        'b': true
    },

    // pattern
    'border-top': {
        custom: [
            {suffix: '1', values: ['1px solid #ccc']}
        ]
    }
};