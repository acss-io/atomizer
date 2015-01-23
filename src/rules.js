var atomicConfig = require('../examples/example-config');
var utils = require('./lib/utils.js');
var START = atomicConfig.config.start;
var END = atomicConfig.config.end;

// Inconsistent prefixes/suffixes, is this a problem?
// 
// e.g. (there are more)
// 
// Prefixes:
// .Fl- (float)
// .Flx- (flex)
// .Fld- (flex-direction)
// 
// Suffixes:
// .Cur-a (auto)
// .List-a (armenian)
// .Fw-n (normal)
// .List-n (none)

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

    /**
     ==================================================================
     CLEAR
     ==================================================================
     */
    {
        type: 'pattern',
        id: 'clear',
        name: 'Clear',
        prefix: '.Cl-',
        properties: ['clear'],
        rules: [
            {suffix: 'n', values: ['none']},
            {suffix: 'b', values: ['both']},
            {suffix: 'start', values: ['$START']},
            {suffix: 'end', values: ['$END']},
            {suffix: 'inh', values: ['inherit']},
        ]
    },

    /**
     ==================================================================
     CURSOR
     TODO: how to deal with URIs? (allowCustom?)
     ==================================================================
     */
     {
        type: 'pattern',
        id: 'cursor',
        name: 'Cursor',
        prefix: '.Cur-',
        properties: ['cursor'],
        rules: [
            {suffix: 'a', values: ['auto']},
            {suffix: 'c', values: ['crosshair']},
            {suffix: 'd', values: ['default']},
            {suffix: 'p', values: ['pointer']},
            {suffix: 'm', values: ['move']},
            {suffix: 'er', values: ['e-resize']},
            {suffix: 'ner', values: ['ne-resize']},
            {suffix: 'nwr', values: ['nw-resize']},
            {suffix: 'nr', values: ['n-resize']},
            {suffix: 'ser', values: ['se-resize']},
            {suffix: 'swr', values: ['sw-resize']},
            {suffix: 'sr', values: ['s-resize']},
            {suffix: 'wr', values: ['w-resize']},
            {suffix: 't', values: ['text']},
            {suffix: 'w', values: ['wait']},
            {suffix: 'h', values: ['help']},
            {suffix: 'pr', values: ['progress']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },

    /**
     ==================================================================
     DISPLAY (checked)
     ==================================================================
     */
    {
        type: 'pattern',
        id: 'display',
        name: 'Display',
        prefix: '.D-',
        properties: ['display'],
        rules: [
            {suffix: 'n', values: ['none']},
            {suffix: 'b', values: ['block']},
            {suffix: 'f', values: ['flex']},
            {suffix: 'i', values: ['inline']},
            {suffix: 'ib', values: ['inline-block']},
            {suffix: 'inh', values: ['inherit']},
            {suffix: 'tb', values: ['table']},
            {suffix: 'tbr', values: ['table-row']},
            {suffix: 'tbc', values: ['table-cell']},
            {suffix: 'li', values: ['list-item']},
            {suffix: 'ri', values: ['run-in']},
            {suffix: 'cp', values: ['compact']},
            {suffix: 'itb', values: ['inline-table']},
            {suffix: 'tbcl', values: ['table-column']},
            {suffix: 'tbclg', values: ['table-column-group']},
            {suffix: 'tbhg', values: ['table-header-group']},
            {suffix: 'tbfg', values: ['table-footer-group']},
            {suffix: 'tbrg', values: ['table-row-group']}
        ]
    },

    /**
     ==================================================================
     FLEX
     ==================================================================
     */
     /* FLEX (checked)
     * width values (i.e. 350px) cannot really be set here (as a generic value)
     */
    {
        type: 'pattern',
        id: 'flex',
        name: 'Flex',
        prefix: '.Flx-',
        properties: ['flex'],
        allowCustom: true,
        format: [utils.isInteger],
        rules: [
            {suffix: 'a', values: ['auto']},
            {suffix: 'n', values: ['none']}
        ]
    },

    /* FLEX-ALIGN (checked) */
    //
    // TODO: Seems like 'flex-align' is not a valid property anymore, it was replaced by 'align-self'.
    // Previous version: http://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-align
    //   Latest version: http://www.w3.org/TR/css3-flexbox/#align-items-property
    // 
    // {
    //     type: 'pattern',
    //     id: 'flex-align',
    //     name: 'Flex align',
    //     prefix: '.Fla-',
    //     properties: ['flex-align'],
    //     rules: [
    //         {suffix: 's', values: ['start']},
    //         {suffix: 'e', values: ['end']},
    //         {suffix: 'c', values: ['center']},
    //         {suffix: 'b', values: ['baseline']},
    //         {suffix: 'st', values: ['stretch']}
    //     ]
    // },
    {
        type: 'pattern',
        id: 'align-self',
        name: 'Align self',
        prefix: '.As-',
        properties: ['align-self'],
        rules: [
            {suffix: 'a', values: ['auto']},
            {suffix: 'fs', values: ['flex-start']},
            {suffix: 'fe', values: ['flex-end']},
            {suffix: 'c', values: ['center']},
            {suffix: 'b', values: ['baseline']},
            {suffix: 'st', values: ['stretch']}
        ]
    },

    /* FLEX-DIRECTION (checked)  */
    {
        type: 'pattern',
        id: 'flex-direction',
        name: 'Flex direction',
        prefix: '.Fld-',
        properties: ['flex-direction'],
        rules: [
            {suffix: 'r', values: ['row']},
            {suffix: 'rr', values: ['row-reverse']},
            {suffix: 'c', values: ['column']},
            {suffix: 'cr', values: ['column-reverse']}
        ]
    },

    /* FLEX-FLOW (checked)  */
    {
        type: 'pattern',
        id: 'flex-flow',
        name: 'Flex flow',
        prefix: '.Flf-',
        properties: ['flex-flow'],
        rules: [
            {suffix: 'r', values: ['row']},
            {suffix: 'rr', values: ['row-reverse']},
            {suffix: 'c', values: ['column']},
            {suffix: 'cr', values: ['column-reverse']},
            {suffix: 'nw', values: ['nowrap']},
            {suffix: 'w', values: ['wrap']},
            {suffix: 'wr', values: ['wrap-reverse']},
        ]
    },

    /* FLEX-ITEM-ALIGN */
    //
    // TODO: 'flex-align' has been replaced by 'align-items'.
    // Previous version: http://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-align
    //   Latest version: http://www.w3.org/TR/css3-flexbox/#align-items-property
    //
    // {
    //     type: 'pattern',
    //     id: 'flex-item-align',
    //     name: 'Flex item align',
    //     prefix: '.Flia-',
    //     properties: ['flex-item-align'],
    //     rules: [
    //         {suffix: 'a', values: ['auto']},
    //         {suffix: 's', values: ['start']},
    //         {suffix: 'e', values: ['end']},
    //         {suffix: 'c', values: ['center']},
    //         {suffix: 'b', values: ['baseline']},
    //         {suffix: 'st', values: ['stretch']},
    //     ]
    // },
    {
        type: 'pattern',
        id: 'align-items',
        name: 'Align items',
        prefix: '.Ai-',
        properties: ['align-items'],
        rules: [
            // flex-start | flex-end | center | baseline | stretch
            {suffix: 'fs', values: ['flex-start']},
            {suffix: 'fe', values: ['flex-end']},
            {suffix: 'c', values: ['center']},
            {suffix: 'b', values: ['baseline']},
            {suffix: 'st', values: ['stretch']}
        ]
    },

    /* FLEX-LINE-PACK */
    //
    // TODO: 'flex-line-pack' has been replaced by 'align-content'.
    //          Source: http://msdn.microsoft.com/en-us/library/ie/jj127302%28v=vs.85%29.aspx
    // Previous version: http://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-line-pack
    //   Latest version: http://www.w3.org/TR/css3-flexbox/#align-content-property
    // 
    // {
    //     type: 'pattern',
    //     id: 'flex-line-pack',
    //     name: 'Flex line pack',
    //     prefix: '.Fllp-',
    //     properties: ['flex-line-pack'],
    //     rules: [
    //         {suffix: 's', values: ['start']},
    //         {suffix: 'e', values: ['end']},
    //         {suffix: 'c', values: ['center']},
    //         {suffix: 'j', values: ['justify']},
    //         {suffix: 'd', values: ['distribute']},
    //         {suffix: 'st', values: ['stretch']},
    //     ]
    // },
    {
        type: 'pattern',
        id: 'align-content',
        name: 'Align content',
        prefix: '.Ac-',
        properties: ['align-content'],
        rules: [
            {suffix: 'fs', values: ['flex-start']},
            {suffix: 'fe', values: ['flex-end']},
            {suffix: 'c', values: ['center']},
            {suffix: 'sb', values: ['space-between']},
            {suffix: 'sa', values: ['space-around']},
            {suffix: 'st', values: ['stretch']}
        ]
    },

    /* FLEX-ORDER (checked)  */
    //
    // TODO: 'flex-order' has been replaced by 'order'.
    // Previous version: http://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-order
    //   Latest version: http://www.w3.org/TR/css3-flexbox/#order-property
    // 
    // {
    //     type: 'pattern',
    //     id: 'flex-order',
    //     name: 'Flex order',
    //     prefix: '.Flo-',
    //     properties: ['flex-order']
    // },
    {
        type: 'pattern',
        id: 'order',
        name: 'Order',
        prefix: '.Or-',
        properties: ['order'],
        allowCustom: true,
        format: [utils.isInteger]
    },

    /* FLEX-PACK (checked)  */
    //
    // TODO: 'flex-pack' has been replaced by 'justify-content'.
    // Previous version: http://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-pack
    //   Latest version: http://www.w3.org/TR/css3-flexbox/#justify-content-property
    // 
    // {
    //     type: 'pattern',
    //     id: 'flex-pack',
    //     name: 'Flex pack',
    //     prefix: '.Flp-',
    //     properties: ['flex-pack'],
    //     rules: [
    //         {suffix: 's', values: ['start']},
    //         {suffix: 'e', values: ['end']},
    //         {suffix: 'c', values: ['center']},
    //         {suffix: 'j', values: ['justify']},
    //         {suffix: 'd', values: ['distribute']}
    //     ]
    // },
    {
        type: 'pattern',
        id: 'justify-content',
        name: 'Justify content',
        prefix: '.Jc-',
        properties: ['justify-content'],
        rules: [
            {suffix: 'fs', values: ['flex-start']},
            {suffix: 'fe', values: ['flex-end']},
            {suffix: 'c', values: ['center']},
            {suffix: 'sb', values: ['space-between']},
            {suffix: 'sa', values: ['space-around']}
        ]
    },

    /* FLEX-WRAP (checked)  */
    {
        type: 'pattern',
        id: 'flex-wrap',
        name: 'Flex-wrap',
        prefix: '.Flw-',
        properties: ['flex-wrap'],
        rules: [
            {suffix: 'nw', values: ['nowrap']},
            {suffix: 'w', values: ['wrap']},
            {suffix: 'wr', values: ['wrap-reverse']}
        ]
    },

    /**
     ==================================================================
     FLOAT (checked)
     ==================================================================
     */
    {
        type: 'pattern',
        id: 'float',
        name: 'Float',
        prefix: '.Fl-',
        properties: ['float'],
        rules: [
            {suffix: 'n', values: ['none']},
            {suffix: 'start', values: ['$START']},
            {suffix: 'end', values: ['$END']},
            {suffix: 'inh', values: ['inherit']}
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
     ==================================================================
     FONT-SIZE (checked)
     ==================================================================
     */
    // TODO: Fz should follow a sequenced suffix.
    // Since we're using --a, --b (alphabetical), shouldn't we do the same?
    // Confirm with Thierry if this approach is acceptable
    {
        type: 'pattern',
        id: 'font-size',
        name: 'Font size',
        prefix: '.Fz-',
        properties: ['font-size'],
        allowCustomSequencedSuffix: true,
        format: [utils.isLength],
        rules: [
            {suffix: '0', values: ['0']},
            {suffix: 'inh', values: ['inherit']},
            {suffix: 'xxs', values: ['xx-small']},
            {suffix: 'xs', values: ['x-small']},
            {suffix: 's', values: ['small']},
            {suffix: 'sr', values: ['smaller']},
            {suffix: 'm', values: ['medium']},
            {suffix: 'l', values: ['large']},
            {suffix: 'lr', values: ['larger']},
            {suffix: 'xl', values: ['x-large']},
            {suffix: 'xxl', values: ['xx-large']}
        ]
    },

    /**
     ==================================================================
     FONT-STYLE (checked)
     ==================================================================
     */
    {
        type: 'pattern',
        id: 'font-style',
        name: 'Font style',
        prefix: '.Fs-',
        properties: ['font-style'],
        rules: [
            {suffix: 'n', values: ['normal']},
            {suffix: 'i', values: ['italic']},
            {suffix: 'o', values: ['oblique']}
        ]
    },

    /**
     ==================================================================
     FONT-VARIANT
     ==================================================================
     */
    // TODO: This rule has a lot more acceptable values.
    // http://dev.w3.org/csswg/css-fonts/#propdef-font-variant
    // https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant
    {
        type: 'pattern',
        id: 'font-variant',
        name: 'Font variant',
        prefix: '.Fv-',
        properties: ['font-variant'],
        rules: [
            {suffix: 'n', values: ['normal']},
            {suffix: 'sc', values: ['small-caps']},
        ]
    },

    /**
     ==================================================================
     HEIGHT (Checked)
     ==================================================================
     */
    {
        type: 'pattern',
        id: 'height',
        name: 'Height',
        prefix: '.H-',
        properties: ['height'],
        allowCustom: true,
        allowFraction: true,
        format: [function (value) {
            return utils.isLength(value) || utils.isPercentage(value);
        }],
        rules: [
            {suffix: 'auto', values: ['auto']},
            {suffix: 'inh', values: ['inherit']},
        ]
    },

    /**
     ==================================================================
     HYPHENS (checked)
     ==================================================================
     */
    {
        type: 'pattern',
        id: 'hyphens',
        name: 'Hyphens',
        prefix: '.Hy-',
        properties: ['hyphens'],
        rules: [
            {suffix: 'a', values: ['auto']},
            {suffix: 'inh', values: ['inherit']},
            {suffix: 'n', values: ['normal']},
            {suffix: 'm', values: ['manual']},
        ]
    },

    /**
     ==================================================================
     LIST-STYLE-TYPE (checked)
     ==================================================================
     */
     {
        type: 'pattern',
        id: 'list-style-type',
        name: 'List style type',
        prefix: '.List-',
        properties: ['list-style-type'],
        rules: [
            {suffix: 'n', values: ['none']},
            {suffix: 'inh', values: ['inherit']},
            {suffix: 'd', values: ['disc']},
            {suffix: 'c', values: ['circle']},
            {suffix: 's', values: ['square']},
            {suffix: 'dc', values: ['decimal']},
            {suffix: 'dclz', values: ['decimal-leading-zero']},
            {suffix: 'lr', values: ['lower-roman']},
            {suffix: 'lg', values: ['lower-greek']},
            {suffix: 'll', values: ['lower-latin']},
            {suffix: 'ur', values: ['upper-roman']},
            {suffix: 'ul', values: ['upper-latin']},
            {suffix: 'a', values: ['armenian']},
            {suffix: 'g', values: ['georgian']},
            {suffix: 'la', values: ['lower-alpha']},
            {suffix: 'ua', values: ['upper-alpha']},
        ]
    },

    /**
     ==================================================================
     LIST-STYLE-IMAGE (checked)
     ==================================================================
     */
    // TODO: Validate URI
    {
        type: 'pattern',
        id: 'list-style-image',
        name: 'List style image',
        prefix: '.Lisi-',
        properties: ['list-style-image'],
        allowCustom: true,
        rules: [
            {suffix: 'n', values: ['none']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },

    /**
     ==================================================================
     LINE-HEIGHT (checked)
     ==================================================================
     */
    {
        type: 'pattern',
        id: 'line-height',
        name: 'Line height',
        prefix: '.Lh-',
        properties: ['line-height'],
        format: [function (value) {
            return utils.isPercentage(value) || utils.isInteger(value) || utils.isFloat(value) || utils.isLength(value);
        }],
        rules: [
            {suffix: 'inh', values: ['inherit']},
            {suffix: 'n', values: ['normal']}
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