var atomicConfig = require('./atomicConfig');
var utils = require('./lib/utils.js');
var START = atomicConfig.config.start;
var END = atomicConfig.config.end;

module.exports = [
    {
        type: 'custom-properties',
        id: 'border',
        name: 'Border',
        prefix: '.Bd-',
        suffixType: 'alphabet',
        format: [
            utils.isLength,
            utils.indexOf(['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset']),
            utils.isHex
        ],
        rules: [
            {suffix: 'x', values: ['border-left', 'border-right']},
            {suffix: 'y', values: ['border-top', 'border-bottom']},
            {suffix: 't', values: ['border-top']},
            {suffix: 'end', values: ['border-' + END]},
            {suffix: 'start', values: ['border-' + START]}
        ]
    },
    {
        type: 'pattern',
        id: 'font-weight',
        name: 'Font weight',
        prefix: '.Fw-',
        properties: ['font-weight'],
        rules: [
            {suffix: 'n', values: ['normal']},
            {suffix: 'b', values: ['bold']},
            {suffix: 'br', values: ['bolder']},
            {suffix: 'lr', values: ['lighter']},
            {suffix: '100', values: ['100']},
            {suffix: '200', values: ['200']},
            {suffix: '300', values: ['300']},
            {suffix: '400', values: ['400']},
            {suffix: '500', values: ['500']},
            {suffix: '600', values: ['600']},
            {suffix: '700', values: ['700']},
            {suffix: '800', values: ['800']},
            {suffix: '900', values: ['900']}
        ]
    },
    {
        type: 'pattern',
        id: 'padding-x',
        name: 'Horizontal padding',
        prefix: '.Px-',
        allowCustom: true,
        properties: ['padding-left', 'padding-right']
    },
    {
        type: 'pattern',
        id: 'text-align',
        name: 'Text align',
        prefix: '.Ta-',
        properties: ['text-align'],
        rules: [
            {suffix: 'start', values: [START]},
            {suffix: 'end', values: [END]},
            {suffix: 'c', values: ['center']},
            {suffix: 'j', values: ['justify']},
            {suffix: 'm', values: ['match-parent']}
        ]
    },
    {
        type: 'pattern',
        id: 'height',
        name: 'Height',
        prefix: '.H-',
        properties: ['height'],
        allowCustom: true
    },
    {
        type: 'rule',
        id: 'bfc',
        name: 'Block formatting context',
        rule: {
            '.Bfc': {
                'overflow': 'hidden',
                '*zoom': 1
            }
        }
    }
];