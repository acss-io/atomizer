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
        type: 'custom-pattern',
        id: 'border-custom',
        name: 'Border',
        prefix: '.Bd-',
        suffixType: 'alphabet',
        format: [
            utils.isLength,
            utils.indexOf(['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset']),
            utils.isColor
        ],
        rules: [
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
        type: 'custom-pattern',
        id: 'background-color',
        name: 'Background color',
        prefix: '.Bgc-',
        properties: ['background-color'],
        suffixType: 'alphabet',
        format: [
            utils.isColor
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