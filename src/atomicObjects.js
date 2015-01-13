var atomicConfig = require('./atomicConfig');
var utils = require('./lib/utils.js');
var START = atomicConfig.config.start;
var END = atomicConfig.config.end;

module.exports = [
    /**
     ==================================================================
     CUSTOM BORDERS
     ==================================================================
     */
    {
        type: 'pattern',
        id: 'border-custom',
        name: 'Border',
        prefix: '.Bd-',
        format: [
            utils.isLength,
            utils.indexOf(['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset']),
            utils.isColor
        ],
        allowCustomSequencedSuffix: true,
        properties: [
            {suffix: 'x', properties: ['border-left', 'border-right']},
            {suffix: 'y', properties: ['border-top', 'border-bottom']},
            {suffix: 't', properties: ['border-top']},
            {suffix: 'b', properties: ['border-bottom']},
            {suffix: 'end', properties: ['border-' + END]},
            {suffix: 'start', properties: ['border-' + START]}
        ]
    },
    /**
     ==================================================================
     BORDER RESETS
     ==================================================================
     */
    {
        type: 'rule',
        id: 'border-reset',
        name: 'Border reset',
        rule: {
            '.Bd-0': {
                border: 0
            }
        }
    },
    {
        type: 'rule',
        id: 'border-top-reset',
        name: 'Border top reset',
        rule: {
            '.Bd-t-0': {
                'border-top': 0
            }
        }
    },
    {
        type: 'rule',
        id: 'border-end-reset',
        name: 'Border end reset',
        rule: {
            '.Bd-end-0': {
                'border-$END': 0
            }
        }
    },
    {
        type: 'rule',
        id: 'border-bottom-reset',
        name: 'Border bottom reset',
        rule: {
            '.Bd-bottom-0': {
                'border-bottom': 0
            }
        }
    },
    {
        type: 'rule',
        id: 'border-start-reset',
        name: 'Border start reset',
        rule: {
            '.Bd-start-0': {
                'border-$START': 0
            }
        }
    },
    /**
     ==================================================================
     BORDER RADIUS
     ==================================================================
     */
    {
        type: 'pattern',
        id: 'border-radius',
        name: 'Border radius',
        prefix: '.Bdrs-',
        properties: ['border-radius'],
        allowCustom: true
    },
    /**
     ==================================================================
     FONT FAMILY suffix matches generic font-family
     ==================================================================
     */
    {
        type: 'pattern',
        id: 'font-family',
        name: 'Font family',
        prefix: '.Ff-',
        properties: ['font-family'],
        rules: [
            {suffix: 's', values: ['Georgia, "Times New Roman", serif']},
            {suffix: 'ss', values: ['Helvetica, Arial, sans-serif']},
            {suffix: 'c', values: ['"Monotype Corsiva", "Comic Sans MS", cursive']},
            {suffix: 'f', values: ['Capitals, Impact, fantasy']},
            {suffix: 'm', values: ['Monaco, "Courier New", monospace']}
        ]
    },
    /**
     ==================================================================
     FONT-WEIGHT
     ==================================================================
     */
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
    /**
     * ============================================================================
     * SOT: https://code.google.com/p/zen-coding/wiki/ZenCSSPropertiesEn
     *      http://docs.emmet.io/cheat-sheet/
     * ============================================================================
     *
     *  NOTES:
     *
     *  Depending on the selector you use to namespace these rules (id versus class), their style weight will be either 0,1,0,0 or 0,0,1,0. We suggest using an id for the extra specificity.
     *  - look for top/right/bottom/left rules in the "offset" section
     *  - we do *not* use left and right as keywords for class names, instead we use "start" and "end"
     *  - T-Shirt sizes follow http://www.americanapparel.net/sizing/default.asp?chart=mu.shirts
     *  
     **/

     /**
     ==================================================================
     BACKGROUNDS
     ==================================================================
     */

    /* background-color/image "resets" */
    {
        type: 'rule',
        id: 'background-none',
        name: 'Background none',
        rule: {
            '.Bg-n': {
                'background': 'none'
            }
        }
    },
    {
        type: 'rule',
        id: 'background-color-transparent',
        name: 'Background color transparent',
        rule: {
            '.Bgc-t': {
                'background-color': 'transparent'
            }
        }
    },
    {
        type: 'rule',
        id: 'background-image-none',
        name: 'Background image none',
        rule: {
            '.Bgi-n': {
                'background-image': 'none'
            }
        }
    },

    /* background-color */
    {
        type: 'pattern',
        id: 'background-color',
        name: 'Background color',
        prefix: '.Bgc-',
        properties: ['background-color'],
        allowCustomSequencedSuffix: true,
        format: [
            utils.isColor
        ]
    },

    /* background-clip */
    {
        type: 'pattern',
        id: 'background-clip',
        name: 'Background clip',
        prefix: '.Bgclip-',
        properties: ['background-clip'],
        rules: [
            {suffix: 'bb', values: ['border-box']},
            {suffix: 'pb', values: ['padding-box']},
            {suffix: 'cb', values: ['content-box']}
        ]
    },
    /* background-origin */
    {
        type: 'pattern',
        id: 'background-origin',
        name: 'Background origin',
        prefix: '.Bgo-',
        properties: ['background-origin'],
        rules: [
            {suffix: 'bb', values: ['border-box']},
            {suffix: 'pb', values: ['padding-box']},
            {suffix: 'cb', values: ['content-box']}
        ]
    },
    /* background-size (length would be customized) */
    {
        type: 'pattern',
        id: 'background-size',
        name: 'Background size',
        prefix: '.Bgz-',
        properties: ['background-size'],
        allowCustom: true,
        rules: [
            {suffix: 'a', values: ['auto']},
            {suffix: 'ct', values: ['contain']},
            {suffix: 'cv', values: ['cover']}
        ]
    },
    /* background-attachment */
    {
        type: 'pattern',
        id: 'background-attachment',
        name: 'Background attachment',
        prefix: '.Bga-',
        properties: ['background-attachment'],
        rules: [
            {suffix: 'f', values: ['fixed']},
            {suffix: 'l', values: ['local']},
            {suffix: 's', values: ['scroll']}
        ]
    },
    /* background-position *4 corners only* (s=start and e=end) */
    {
        type: 'pattern',
        id: 'background-position',
        name: 'Background position',
        prefix: '.Bgp-',
        properties: ['background-position'],
        rules: [
            {suffix: 'ts', values: ['$START 0']},
            {suffix: 'te', values: ['$END 0']},
            {suffix: 'bs', values: ['$START 100%']},
            {suffix: 'be', values: ['$END 100%']}
        ]
    },
    /* background-repeat */
    {
        type: 'pattern',
        id: 'background-repeat',
        name: 'Background repeat',
        prefix: '.Bgr-',
        properties: ['background-repeat'],
        rules: [
            {suffix: 'n', values: ['no-repeat']},
            {suffix: 'x', values: ['repeat-x']},
            {suffix: 'y', values: ['repeat-y']},
            {suffix: 'r', values: ['repeat']},
            {suffix: 's', values: ['space']},
            {suffix: 'ro', values: ['round']}
        ]
    },
    /**
     ==================================================================
     BORDER-COLLAPSE
     ==================================================================
     */
    {
        type: 'pattern',
        id: 'border-collapse',
        name: 'Border collapse',
        prefix: '.Bdcl-',
        properties: ['border-collapse'],
        rules: [
            {suffix: 'c', values: ['collapse']},
            {suffix: 's', values: ['separate']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },

    /**
     ==================================================================
     BOX-SIZING (checked)
     ==================================================================
     */
    {
        type: 'pattern',
        id: 'boz-sizing',
        name: 'Box sizing',
        prefix: '.Bxz-',
        properties: ['box-sizing'],
        rules: [
            {suffix: 'cb', values: ['content-box']},
            {suffix: 'pb', values: ['padding-box']},
            {suffix: 'bb', values: ['border-box']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },

    /**
     ==================================================================
     BOX-SHADOW
     TODO: should we edit the function to accept 'none' with a 'n' suffix?
     or should we group all reset rules together and use boolean? (border and what not)
     ==================================================================
     */
    {
        type: 'pattern',
        id: 'box-shadow',
        name: 'Box shadow',
        properties: ['box-shadow'],
        prefix: '.Bxsh-',
        allowCustomSequencedSuffix: true,
        format: [
            utils.isLength,
            utils.isLength,
            utils.isLength,
            utils.isColor
        ],
        rules: [
            {suffix: 'n', values: ['none']}
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
        id: 'width',
        name: 'Width',
        prefix: '.W-',
        properties: ['width'],
        allowCustom: true,
        allowFraction: true
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
    },
    {
        type: 'rule',
        id: 'dn',
        name: 'Display None Helper',
        rule: {
            '.Dn': {
                'display': 'none'
            }
        }
    }
];