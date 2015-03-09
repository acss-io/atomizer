module.exports = {
    // pattern
    'display': {
        'b:f': true
    },

    // pattern
    'border-top': {
        custom: [
            {suffix: '1', values: ['1px solid #ccc']},
            {suffix: '1--sm', values: ['1px solid #ccc']},
            {suffix: '2--lg', values: ['2px solid #ccc']},
            {suffix: 'foo:f', values: ['2px solid #ccc']},
            {suffix: 'foo:f--sm', values: ['2px solid #ccc']}
        ]
    }
};