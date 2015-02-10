module.exports = {
    'config': {
        'namespace': '#atomic',
        'start': 'left',
        'end': 'right',
        'defaults': {
            'font-size': '16px',
            'border-color': '#ccc',
            'bleed-value': '-10px'
        },
        'breakPoints': {
            'sm': '700px',
            'md': '992px',
            'lg': '1200px'
        }
    },

    // pattern
    'border-x': {
        'custom': [{
            suffix: '1',
            values: ['1px solid #ccc']
        },]
    },

    // pattern
    'border': {
        'custom': [{
            suffix: '1',
            values: ['1px solid #ccc']
        },]
    },

    // pattern
    'border-top': {
        'custom': [{
            suffix: '1',
            values: ['1px solid #ccc']
        },]
    },

//    // pattern
//    'border-end': {
//        'custom': [{
//            suffix: '0',
//            values: [0]
//        }, ]
//    },
//
    // pattern
    'border-bottom': {
        'custom': [{
            suffix: '1',
            values: ['1px solid #ccc']
        }, ]
    },

//    'border-start': {
//        'custom': [{
//            suffix: '0',
//            values: [0]
//        }, ]
//    },
//
    // pattern
    'border-radius': {
        'custom': [{
            suffix: '100',
            values: ['100px']
//        }, {
//            suffix: '3px',
//            values: ['3px']
//        }, {
//            suffix: '5px',
//            values: ['5px']
//        }, {
//            suffix: '500px',
//            values: ['500px']
//        }, {
//            suffix: '50%',
//            values: ['50%']
        }, ]
    },

//    // pattern
//    'font-family': {
//        s: true,
//        ss: {
//            values: ['Arial, sans-serif'],
//            breakPoints: ['sm', 'md', 'lg']
//        },
//        c: true,
//        f: true,
//        m: true
//    },
//
//    // rule
//    'background-none': true,
//    'background-color-transparent': true,
//    'background-image-none': true,
//
//    // pattern
    'background-color': {
        'custom': [{
            suffix: 'logo',
            values: ['#0280AE']
        }]

//        'custom-auto-suffix': [
//        // a
//        {
//            values: ['#000'],
//            breakPoints: ['sm', 'md', 'lg']
//        },
//
//        // b
//        {
//            values: ['#fff']
//        }],
    },

//    // pattern
//    'background-clip': {
//        'bb': true,
//        'pb': true,
//        'cb': true
//    },
//
//    // pattern
//    'background-origin': {
//        'bb': true,
//        'pb': true,
//        'cb': true
//    },
//
//    // pattern
//    'background-size': {
//        'a': true,
//        'ct': true,
//        'cv': true,
//        'custom': [{
//            suffix: '50%-auto',
//            values: ['50% auto']
//        }]
//    },
//
//    // pattern
//    'background-attachment': {
//        'f': true,
//        'l': true,
//        's': true
//    },
//
//    // pattern
//    'background-position': {
//        'ts': true,
//        'te': true,
//        'bs': true,
//        'be': true
//    },
//
//    // pattern
//    'background-repeat': {
//        'n': true,
//        'x': true,
//        'y': true,
//        'r': true,
//        's': true,
//        'ro': true
//    },
//
//    // pattern
//    'border-collapse': {
//        'c': true,
//        's': true,
//        'inh': true
//    },
//

    // pattern
    'box-sizing': {
//        'cb': true,
//        'pb': true,
        'bb': true
//        'inh': true,
    },

    // pattern
    'color': {
        'custom': [{
            suffix: 'fff',
            values: ['#fff !important']
        }]
    },

//    // pattern
//    'box-shadow': {
//        'n': true,
//        'custom-auto-suffix': [
//        // a
//        {
//            values: ['1px 1px 4px #555']
//        },
//        // b
//        {
//            values: ['0 0 5px #333']
//        }]
//    },
//
//    // pattern
//    'clear': {
//        n: true,
//        b: true,
//        start: true,
//        end: true,
//        inh: true
//    },
//
//    // pattern
//    'cursor': {
//        'a': true,
//        'c': true,
//        'd': true,
//        'p': true,
//        'm': true,
//        'er': true,
//        'ner': true,
//        'nwr': true,
//        'nr': true,
//        'ser': true,
//        'swr': true,
//        'sr': true,
//        'wr': true,
//        't': true,
//        'w': true,
//        'h': true,
//        'pr': true,
//        'inh': true
//    },
//


    //        'n': {
    //            breakPoints: ['sm', 'md', 'lg']
    //        },

    // pattern
    'display': {
        'n': {
            breakPoints: ['sm']
        },
        'b': {
            breakPoints: ['sm']
        },
//        'f': true,
//        'i': true,
        'ib': true,
//        'inh': true,
        'tb': true,
//        'tbr': true,
        'tbc': true
//        'li': true,
//        'ri': true,
//        'cp': true,
//        'itb': true,
//        'tbcl': true,
//        'tbclg': true,
//        'tbhg': true,
//        'tbfg': true,
//        'tbrg': true,
    },

//    // pattern
//    'flex': {
//        'a': true,
//        'n': true,
//        'custom': [{
//            suffix: '1',
//            values: [1]
//        }]
//    },
//
//    // pattern
//    'align-self': {
//        'a': true,
//        'fs': true,
//        'fe': true,
//        'c': true,
//        'b': true,
//        'st': true
//    },
//
//    // pattern
//    'flex-direction': {
//        'r': true,
//        'rr': true,
//        'c': true,
//        'cr': true
//    },
//
//    // pattern
//    'flex-flow': {
//        'r': true,
//        'rr': true,
//        'c': true,
//        'cr': true,
//        'nw': true,
//        'w': true,
//        'wr': true
//    },
//
//    // pattern
//    'align-items': {
//        'fs': true,
//        'fe': true,
//        'c': true,
//        'b': true,
//        'st': true
//    },
//
//    // pattern
//    'align-content': {
//        'fs': true,
//        'fe': true,
//        'c': true,
//        'sb': true,
//        'sa': true,
//        'st': true
//    },
//
//    // pattern
//    'order': {
//        custom: [{
//            suffix: '1',
//            values: [1]
//        }, {
//            suffix: '2',
//            values: [2]
//        }, {
//            suffix: '3',
//            values: [3]
//        }, ]
//    },
//
//    // pattern
//    'justify-content': {
//        'fs': true,
//        'fe': true,
//        'c': true,
//        'sb': true,
//        'sa': true
//    },
//
//    // pattern
//    'flex-wrap': {
//        'nw': true,
//        'w': true,
//        'wr': true
//    },
//
//    // pattern
//    'float': {
//        'n': true,
//        'start': true,
//        'end': true,
//        'inh': true
//    },
//
//    // pattern
    'font-weight': {
//        'n': {
//            breakPoints: ['sm', 'md', 'lg']
//        },
        'b': true
    },

    // pattern
    'font-size': {
        'custom': [{
            suffix: '14',
            values: ['14px']
        }, {
            suffix: '20',
            values: ['20px']
        }]
//        '0': true,
//        'inh': true,
//        'xxs': true,
//        'xs': true,
//        's': true,
//        'sr': true,
//        'm': true,
//        'l': true,
//        'lr': true,
//        'xl': true,
//        'xxl': true,
//        'custom-auto-suffix': [{
//            values: ['11px']
//        }, {
//            values: ['12px']
//        }, {
//            values: ['13px']
//        }, {
//            values: ['14px']
//        }, {
//            values: ['15px']
//        }, {
//            values: ['16px']
//        }, {
//            values: ['17px']
//        }, {
//            values: ['18px']
//        }, {
//            values: ['19px']
//        }, {
//            values: ['20px']
//        }, {
//            values: ['21px']
//        }, {
//            values: ['22px']
//        }, ]
    },

//    // pattern
//    'font-style': {
//        'n': true,
//        'i': true,
//        'o': true
//    },
//
//    // pattern
//    'font-variant': {
//        'n': true,
//        'sc': true
//    },
//
    // pattern
    'height': {
        'custom': [{
            suffix: '100%',
            values: ['100%']
        }]
    },

    // pattern
    'min-height': {
        'custom': [{
            suffix: '100%',
            values: ['100%']
        }]
    },

//    // pattern
//    'hyphens': {
//        'a': true,
//        'inh': true,
//        'n': true,
//        'm': true
//    },
//
//    // pattern
//    'list-style-type': {
//        'n': true,
//        'inh': true,
//        'd': true,
//        'c': true,
//        's': true,
//        'dc': true,
//        'dclz': true,
//        'lr': true,
//        'lg': true,
//        'll': true,
//        'ur': true,
//        'ul': true,
//        'a': true,
//        'g': true,
//        'la': true,
//        'ua': true
//    },
//
//    // pattern
//    'list-style-image': {
//        'n': true,
//        'inh': true
//    },
//
    // pattern
    'line-height': {
//        'n': true,
//        'inh': true,
        'custom': [{
            suffix: '12',
            values: ['1.2']
        }]
    },

    // pattern
    'margin-x': {
        a: {
            breakPoints: ['sm']
        }
    },

    // pattern
    'margin-y': {
        'custom': [{
            suffix: '0',
            values: ['0']
        }, {
            suffix: '20',
            values: ['20px']
        }]
    },

    // pattern
    'margin-top': {
        'custom': [{
            suffix: '24',
            values: ['24px']
        }]
    },

    // pattern
    'margin-end': {
        'custom': [{
            suffix: '10',
            values: ['10px']
        }, {
            suffix: '20',
            values: ['20px']
        }]
    },

    // pattern
    'margin-bottom': {
        'custom': [{
            suffix: '10',
            values: ['10px']
        }, {
            suffix: '50',
            values: ['50px']
        }]
    },

    // pattern
    'margin-start': {
        'custom': [{
            suffix: '10',
            values: ['10px']
        }]
    },

    // pattern
    'margin': {
        'custom': [{
            suffix: '0',
            values: ['0']
        }]
    },


    // OFFSETS
    // pattern
    'end': {
        'custom': [{
            suffix: '0',
            values: ['0']
        }, {
            suffix: 'a',
            values: ['auto'],
            breakPoints: ['sm']
        }]
    },

    // pattern
    'start': {
        'custom': [{
            suffix: '0',
            values: ['0']
        }]
    },

    // pattern
    'top': {
        'custom': [{
            suffix: '0',
            values: ['0']
        }]
    },

    // pattern
    'overflow': {
        h: true
    },

    // pattern
    'padding-x': {
        'custom': [{
            suffix: '10',
            values: ['10px']
        }, {
            suffix: '20',
            values: ['20px']
        }]
    },

    // pattern
    'padding-y': {
        'custom': [{
            suffix: '5',
            values: ['5px'],
            breakPoints: ['sm']
        }]
    },

    // pattern
    'padding-top': {
        'custom': [{
            suffix: '20',
            values: ['20px']
        }]
    },

    // pattern
    'padding-end': {
        'custom': [{
            suffix: '50',
            values: ['50px']
        }, {
            suffix: '10',
            values: ['10px'],
            breakPoints: ['sm']
        }]
    },

    // pattern
    'padding-bottom': {
        'custom': [{
            suffix: '5',
            values: ['5px']
        }, {
            suffix: '40',
            values: ['40px']
        }]
    },

    // pattern
    'padding-start': {
        'custom': [{
            suffix: '10',
            values: ['10px']
        }]
    },

    // pattern
    'padding': {
        'custom': [{
            suffix: '0',
            values: ['0'],
        }, {
            suffix: '10',
            values: ['10px'],
        //            breakPoints: ['sm', 'md', 'lg']
        }, {
            suffix: '20',
            values: ['20px']
        }]
    },


    // pattern
    'position': {
        a: true,
        f: true,
        r: {
            breakPoints: ['sm']
        }
    },

    // pattern
    'table-layout': {
        f: true
    },

    // pattern
    'text-align': {
        start: true,
//        end: true,
            c: true,
//          j: true,
//          m: true
    },

    // TODO: inclure this in the customs (i.e. output -> Tbl-f)
//    // pattern
//    'table-layout': {
//        auto: true,
//        fixed: true,
//        inherit: true,
//        initial: true
//    },

// pattern
    'vertical-align': {
        m: true,
        t: true
    },

//    // pattern
    'width': {
        a: true,
//        inh: true,
//        fraction: {
//            denominator: 12,
//            breakPoints: ['sm', 'md', 'lg']
//        },
        'custom': [{
            suffix: '0',
            values: ['0']
        },{
            suffix: '50%',
            values: ['50%']
        },{
            suffix: '80%',
            values: ['80%'],
            breakPoints: ['sm']
        }, {
            suffix: '100%',
            values: ['100%']
        }, {
            suffix: '150px',
            values: ['150px'],
            breakPoints: ['sm']
        }]
    },

    // pattern
    'z-index': {
        'custom': [{
            suffix: '0',
            values: ['0']
        },{
            suffix: '3',
            values: ['3']
        }, {
            suffix: '5',
            values: ['5']
        }, {
            suffix: '7',
            values: ['7']
        }]
    },

    // rule
    'bfc': true
};
