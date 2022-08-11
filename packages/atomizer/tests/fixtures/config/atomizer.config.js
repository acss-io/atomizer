const { resolve } = require('path');
module.exports = {
    custom: {
        uh: '79px'
    },
    classNames: [
        'H(uh)'
    ],
    content: [
        resolve(__dirname, '*.html')
    ]
};
