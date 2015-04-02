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
 *  - Rules is written as an array because ORDER is important for the CSS generation
 *
 **/

module.exports = [
/**
 ==================================================================
 ANIMATION
 ==================================================================
 */
    {
        type: 'pattern',
        id: 'animation',
        name: 'Animation',
        prefix: '.Anim-',
        properties: ['animation'],
        allowCustom: true,
        allowCustomAutoSuffix: false,
        allowSuffixToValue: true
    },
    {
        type: 'pattern',
        id: 'animation-delay',
        name: 'Animation delay',
        prefix: '.Animdel-',
        properties: ['animation-delay'],
        allowCustom: true,
        allowCustomAutoSuffix: false,
        allowSuffixToValue: true
    },
    {
        type: 'pattern',
        id: 'animation-direction',
        name: 'Animation direction',
        prefix: '.Animdir-',
        properties: ['animation-direction'],
        allowCustom: true,
        allowCustomAutoSuffix: false,
        allowSuffixToValue: false,
        rules: [
            {suffix: 'a', values: ['alternate']},
            {suffix: 'ar', values: ['alternate-reverse']},
            {suffix: 'n', values: ['normal']},
            {suffix: 'r', values: ['reverse']}
        ]
    },
    {
        type: 'pattern',
        id: 'animation-duration',
        name: 'Animation duration',
        prefix: '.Animdur-',
        properties: ['animation-duration'],
        allowCustom: true,
        allowCustomAutoSuffix: false,
        allowSuffixToValue: true
    },
    {
        type: 'pattern',
        id: 'animation-fill-mode',
        name: 'Animation fill mode',
        prefix: '.Animfm-',
        properties: ['animation-fill-mode'],
        allowCustom: true,
        allowCustomAutoSuffix: false,
        allowSuffixToValue: false,
        rules: [
            {suffix: 'b', values: ['backwards']},
            {suffix: 'bo', values: ['both']},
            {suffix: 'f', values: ['forwards']},
            {suffix: 'n', values: ['none']}
        ]
    },
    {
        type: 'pattern',
        id: 'animation-iteration-count',
        name: 'Animation iteration count',
        prefix: '.Animic-',
        properties: ['animation-iteration-count'],
        allowCustom: true,
        allowCustomAutoSuffix: false,
        allowSuffixToValue: true,
        rules: [
            {suffix: 'i', values: ['infinite']}
        ]
    },
    {
        type: 'pattern',
        id: 'animation-name',
        name: 'Animation name',
        prefix: '.Animn-',
        properties: ['animation-name'],
        allowCustom: true,
        allowCustomAutoSuffix: false,
        allowSuffixToValue: true,
        rules: [
            {suffix: 'n', values: ['none']}
        ]
    },
    {
        type: 'pattern',
        id: 'animation-play-state',
        name: 'Animation play state',
        prefix: '.Animps-',
        properties: ['animation-play-state'],
        allowCustom: false,
        allowCustomAutoSuffix: false,
        allowSuffixToValue: false,
        rules: [
            {suffix: 'p', values: ['paused']},
            {suffix: 'r', values: ['running']}
        ]
    },
    {
        type: 'pattern',
        id: 'animation-timing-function',
        name: 'Animation timing function',
        prefix: '.Animtf-',
        properties: ['animation-timing-function'],
        allowCustom: true,
        allowCustomAutoSuffix: false,
        allowSuffixToValue: false,
        rules: [
            {suffix: 'e', values: ['ease']},
            {suffix: 'ei', values: ['ease-in']},
            {suffix: 'eo', values: ['ease-out']},
            {suffix: 'eio', values: ['ease-in-out']},
            {suffix: 'l', values: ['linear']},
            {suffix: 'se', values: ['step-send']},
            {suffix: 'ss', values: ['step-start']}
        ]
    },
    /**
     ==================================================================
     BORDERS
     ==================================================================
     */
    // all edges
    {
        type: 'pattern',
        name: 'Border',
        prefix: 'Bd-',
        properties: ['border'],
        allowCustom: true,
        allowCustomAutoSuffix: true,
        allowSuffixToValue: false
    },
    // top
    {
        type: 'pattern',
        name: 'Border top',
        prefix: 'Bdt-',
        properties: ['border-top'],
        allowCustom: true,
        allowCustomAutoSuffix: true,
        allowSuffixToValue: false
    },
    // end
    {
        type: 'pattern',
        name: 'Border end',
        prefix: 'Bdend-',
        properties: ['border-__END__'],
        allowCustom: true,
        allowCustomAutoSuffix: true,
        allowSuffixToValue: false
    },
    // bottom
    {
        type: 'pattern',
        name: 'Border bottom',
        prefix: 'Bdb-',
        properties: ['border-bottom'],
        allowCustom: true,
        allowCustomAutoSuffix: true,
        allowSuffixToValue: false
    },
    // start
    {
        type: 'pattern',
        name: 'Border start',
        prefix: 'Bdstart-',
        properties: ['border-__START__'],
        allowCustom: true,
        allowCustomAutoSuffix: true,
        allowSuffixToValue: false
    },
    // X axis
    {
        type: 'pattern',
        name: 'Border X',
        prefix: 'Bdx-',
        properties: ['border-__START__', 'border-__END__'],
        allowCustom: true,
        allowCustomAutoSuffix: true,
        allowSuffixToValue: false
    },
    // Y axis
    {
        type: 'pattern',
        name: 'Border Y',
        prefix: 'Bdy-',
        properties: ['border-top', 'border-bottom'],
        allowCustom: true,
        allowCustomAutoSuffix: true,
        allowSuffixToValue: false,
    },

    /**
     ==================================================================
     BORDER COLOR
     ==================================================================
     */
    // all edges
    {
        type: 'pattern',
        name: 'Border color',
        prefix: 'Bdc-',
        properties: ['border-color'],
        allowCustom: true,
        allowCustomAutoSuffix: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: 't', values: ['transparent']},
            {suffix: 'cc', values: ['currentColor']}
        ]
    },
    // top
    {
        type: 'pattern',
        name: 'Border top color',
        prefix: 'Bdtc-',
        properties: ['border-top-color'],
        allowCustom: true,
        allowCustomAutoSuffix: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: 't', values: ['transparent']},
            {suffix: 'cc', values: ['currentColor']}
        ]
    },
    // end
    {
        type: 'pattern',
        name: 'Border end color',
        prefix: 'Bdendc-',
        properties: ['border-__END__-color'],
        allowCustom: true,
        allowCustomAutoSuffix: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: 't', values: ['transparent']},
            {suffix: 'cc', values: ['currentColor']}
        ]
    },
    // bottom
    {
        type: 'pattern',
        name: 'Border bottom color',
        prefix: 'Bdbc-',
        properties: ['border-bottom-color'],
        allowCustom: true,
        allowCustomAutoSuffix: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: 't', values: ['transparent']},
            {suffix: 'cc', values: ['currentColor']}
        ]
    },
    // start
    {
        type: 'pattern',
        name: 'Border start color',
        prefix: 'Bdstartc-',
        properties: ['border-__START__-color'],
        allowCustom: true,
        allowCustomAutoSuffix: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: 't', values: ['transparent']},
            {suffix: 'cc', values: ['currentColor']}
        ]
    },

    /**
     ==================================================================
     BORDER STYLE
     ==================================================================
     */
    // all edges
    {
        type: 'pattern',
        name: 'Border style',
        prefix: 'Bds-',
        properties: ['border-style'],
        allowCustom: true,
        allowCustomAutoSuffix: false,
        allowSuffixToValue: false,
        rules: [
            {suffix: 'd', values: ['dotted']},
            {suffix: 'da', values: ['dashed']},
            {suffix: 'do', values: ['double']},
            {suffix: 'g', values: ['groove']},
            {suffix: 'h', values: ['hidden']},
            {suffix: 'i', values: ['inset']},
            {suffix: 'n', values: ['none']},
            {suffix: 'o', values: ['outset']},
            {suffix: 'r', values: ['ridge']},
            {suffix: 's', values: ['solid']}
        ]
    },
    // top
    {
        type: 'pattern',
        name: 'Border top style',
        prefix: 'Bdts-',
        properties: ['border-top-style'],
        allowCustom: true,
        allowCustomAutoSuffix: true,
        allowSuffixToValue: false,
        rules: [
            {suffix: 'd', values: ['dotted']},
            {suffix: 'da', values: ['dashed']},
            {suffix: 'do', values: ['double']},
            {suffix: 'g', values: ['groove']},
            {suffix: 'h', values: ['hidden']},
            {suffix: 'i', values: ['inset']},
            {suffix: 'n', values: ['none']},
            {suffix: 'o', values: ['outset']},
            {suffix: 'r', values: ['ridge']},
            {suffix: 's', values: ['solid']}
        ]
    },
    // end
    {
        type: 'pattern',
        name: 'Border end style',
        prefix: 'Bdends-',
        properties: ['border-__END__-style'],
        allowCustom: true,
        allowCustomAutoSuffix: true,
        allowSuffixToValue: false,
        rules: [
            {suffix: 'd', values: ['dotted']},
            {suffix: 'da', values: ['dashed']},
            {suffix: 'do', values: ['double']},
            {suffix: 'g', values: ['groove']},
            {suffix: 'h', values: ['hidden']},
            {suffix: 'i', values: ['inset']},
            {suffix: 'n', values: ['none']},
            {suffix: 'o', values: ['outset']},
            {suffix: 'r', values: ['ridge']},
            {suffix: 's', values: ['solid']}
        ]
    },
    // bottom
    {
        type: 'pattern',
        name: 'Border bottom style',
        prefix: 'Bdbs-',
        properties: ['border-bottom-style'],
        allowCustom: true,
        allowCustomAutoSuffix: true,
        allowSuffixToValue: false,
        rules: [
            {suffix: 'd', values: ['dotted']},
            {suffix: 'da', values: ['dashed']},
            {suffix: 'do', values: ['double']},
            {suffix: 'g', values: ['groove']},
            {suffix: 'h', values: ['hidden']},
            {suffix: 'i', values: ['inset']},
            {suffix: 'n', values: ['none']},
            {suffix: 'o', values: ['outset']},
            {suffix: 'r', values: ['ridge']},
            {suffix: 's', values: ['solid']}
        ]
    },
    // start
    {
        type: 'pattern',
        name: 'Border start style',
        prefix: 'Bdstarts-',
        properties: ['border-__START__-style'],
        allowCustom: true,
        allowCustomAutoSuffix: true,
        allowSuffixToValue: false,
        rules: [
            {suffix: 'd', values: ['dotted']},
            {suffix: 'da', values: ['dashed']},
            {suffix: 'do', values: ['double']},
            {suffix: 'g', values: ['groove']},
            {suffix: 'h', values: ['hidden']},
            {suffix: 'i', values: ['inset']},
            {suffix: 'n', values: ['none']},
            {suffix: 'o', values: ['outset']},
            {suffix: 'r', values: ['ridge']},
            {suffix: 's', values: ['solid']}
        ]
    },

    /**
     ==================================================================
     BORDER WIDTH
     ==================================================================
     */
    // all edges
    {
        type: 'pattern',
        name: 'Border width',
        prefix: 'Bdw-',
        properties: ['border-width'],
        allowCustom: true,
        allowCustomAutoSuffix: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: 'm', values: ['medium']},
            {suffix: 't', values: ['thin']},
            {suffix: 'th', values: ['thick']}
        ]
    },
    // top
    {
        type: 'pattern',
        name: 'Border top width',
        prefix: 'Bdtw-',
        properties: ['border-top-width'],
        allowCustom: true,
        allowCustomAutoSuffix: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: 'm', values: ['medium']},
            {suffix: 't', values: ['thin']},
            {suffix: 'th', values: ['thick']}
        ]
    },
    // end
    {
        type: 'pattern',
        name: 'Border end width',
        prefix: 'Bdendw-',
        properties: ['border-__END__-width'],
        allowCustom: true,
        allowCustomAutoSuffix: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: 'm', values: ['medium']},
            {suffix: 't', values: ['thin']},
            {suffix: 'th', values: ['thick']}
        ]
    },
    // bottom
    {
        type: 'pattern',
        name: 'Border bottom width',
        prefix: 'Bdbw-',
        properties: ['border-bottom-width'],
        allowCustom: true,
        allowCustomAutoSuffix: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: 'm', values: ['medium']},
            {suffix: 't', values: ['thin']},
            {suffix: 'th', values: ['thick']}
        ]
    },
    // start
    {
        type: 'pattern',
        name: 'Border start width',
        prefix: 'Bdsw-',
        properties: ['border-__START__-width'],
        allowCustom: true,
        allowCustomAutoSuffix: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: 'm', values: ['medium']},
            {suffix: 't', values: ['thin']},
            {suffix: 'th', values: ['thick']}
        ]
    },

    /**
     ==================================================================
     BORDER RADIUS
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Border radius',
        prefix: 'Bdrs-',
        properties: ['border-radius'],
        allowCustom: true,
        allowSuffixToValue: true
    },
    // top-right
    {
        type: 'pattern',
        name: 'Border radius top right',
        prefix: 'Bdrstend-',
        properties: ['border-top-__END__-radius'],
        allowCustom: true,
        allowSuffixToValue: true
    },
    // bottom-right
    {
        type: 'pattern',
        name: 'Border radius bottom right',
        prefix: 'Bdrsbend-',
        properties: ['border-bottom-__END__-radius'],
        allowCustom: true,
        allowSuffixToValue: true
    },
    // bottom-left
    {
        type: 'pattern',
        name: 'Border radius bottom left',
        prefix: 'Bdrsbstart-',
        properties: ['border-bottom-__START__-radius'],
        allowCustom: true,
        allowSuffixToValue: true
    },
    // top-left
    {
        type: 'pattern',
        name: 'Border radius top left',
        prefix: 'Bdrststart-',
        properties: ['border-top-__START__-radius'],
        allowCustom: true,
        allowSuffixToValue: true
    },

     /**
     ==================================================================
     BACKGROUNDS
     ==================================================================
     */

    /* background */
    {
        type: 'pattern',
        name: 'Background',
        prefix: 'Bg-',
        properties: ['background'],
        allowCustom: true,
        allowCustomAutoSuffix: true,
        allowSuffixToValue: false,
        rules: [
            {suffix: 'n', values: ['none']},
            {suffix: 't', values: ['transparent']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    /* background-image */
    {
        type: 'pattern',
        name: 'Background image',
        prefix: 'Bgi-',
        properties: ['background-image'],
        allowCustom: true,
        allowCustomAutoSuffix: true,
        allowSuffixToValue: false,
        rules: [
            {suffix: 'n', values: ['none']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    /* background-color */
    {
        type: 'pattern',
        name: 'Background color',
        prefix: 'Bgc-',
        properties: ['background-color'],
        allowCustom: true,
        allowCustomAutoSuffix: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: 't', values: ['transparent']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },

    /* background-clip */
    {
        type: 'pattern',
        name: 'Background clip',
        prefix: 'Bgcp-',
        properties: ['background-clip'],
        rules: [
            {suffix: 'bb', values: ['border-box']},
            {suffix: 'cb', values: ['content-box']},
            {suffix: 'pb', values: ['padding-box']}
        ]
    },
    /* background-origin */
    {
        type: 'pattern',
        name: 'Background origin',
        prefix: 'Bgo-',
        properties: ['background-origin'],
        rules: [
            {suffix: 'bb', values: ['border-box']},
            {suffix: 'cb', values: ['content-box']},
            {suffix: 'pb', values: ['padding-box']}
        ]
    },
    /* background-size (length would be customized) */
    {
        type: 'pattern',
        name: 'Background size',
        prefix: 'Bgz-',
        properties: ['background-size'],
        allowCustom: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: 'a', values: ['auto']},
            {suffix: 'ct', values: ['contain']},
            {suffix: 'cv', values: ['cover']}
        ]
    },
    /* background-attachment */
    {
        type: 'pattern',
        name: 'Background attachment',
        prefix: 'Bga-',
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
        name: 'Background position',
        prefix: 'Bgp-',
        properties: ['background-position'],
        rules: [
            {suffix: 's_t', values: ['__START__ 0']},
            {suffix: 'e_t', values: ['__END__ 0']},
            {suffix: 's_b', values: ['__START__ 100%']},
            {suffix: 'e_b', values: ['__END__ 100%']}
        ]
    },
    /* background-repeat */
    {
        type: 'pattern',
        name: 'Background repeat',
        prefix: 'Bgr-',
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
        name: 'Border collapse',
        prefix: 'Bdcl-',
        properties: ['border-collapse'],
        rules: [
            {suffix: 'c', values: ['collapse']},
            {suffix: 's', values: ['separate']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },

    /**
     ==================================================================
     BOX-SIZING
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Box sizing',
        prefix: 'Bxz-',
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
        name: 'Box shadow',
        properties: ['box-shadow'],
        prefix: 'Bxsh-',
        allowCustom: true,
        allowCustomAutoSuffix: true,
        allowSuffixToValue: false,
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
        name: 'Clear',
        prefix: 'Cl-',
        properties: ['clear'],
        rules: [
            {suffix: 'n', values: ['none']},
            {suffix: 'b', values: ['both']},
            {suffix: 'start', values: ['__START__']},
            {suffix: 'end', values: ['__END__']},
            {suffix: 'inh', values: ['inherit']},
        ]
    },

    /**
     ==================================================================
     COLOR
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'color',
        prefix: 'C-',
        properties: ['color'],
        allowCustom: true,
        allowCustomAutoSuffix: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: 't', values: ['transparent']},
            {suffix: 'cc', values: ['currentColor']}
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
        name: 'Cursor',
        prefix: 'Cur-',
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
     DISPLAY
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Display',
        prefix: 'D-',
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
     /* FLEX
     * width values (i.e. 350px) cannot really be set here (as a generic value)
     */
    {
        type: 'pattern',
        name: 'Flex',
        prefix: 'Flx-',
        properties: ['flex'],
        allowCustom: true,
        allowSuffixToValue: false,
        rules: [
            {suffix: 'a', values: ['auto']},
            {suffix: 'n', values: ['none']}
        ]
    },

    /* FLEX-ALIGN */
    //
    // TODO: Seems like 'flex-align' is not a valid property anymore, it was replaced by 'align-self'.
    // Previous version: http://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-align
    //   Latest version: http://www.w3.org/TR/css3-flexbox/#align-items-property
    //
    // {
    //     type: 'pattern',
    //     //     name: 'Flex align',
    //     prefix: 'Fla-',
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
        name: 'Align self',
        prefix: 'As-',
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

    /* FLEX-DIRECTION  */
    {
        type: 'pattern',
        name: 'Flex direction',
        prefix: 'Fld-',
        properties: ['flex-direction'],
        rules: [
            {suffix: 'r', values: ['row']},
            {suffix: 'rr', values: ['row-reverse']},
            {suffix: 'c', values: ['column']},
            {suffix: 'cr', values: ['column-reverse']}
        ]
    },

    /* FLEX-FLOW  */
    {
        type: 'pattern',
        name: 'Flex flow',
        prefix: 'Flf-',
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
    //     //     name: 'Flex item align',
    //     prefix: 'Flia-',
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
        name: 'Align items',
        prefix: 'Ai-',
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
    //     //     name: 'Flex line pack',
    //     prefix: 'Fllp-',
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
        name: 'Align content',
        prefix: 'Ac-',
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

    /* FLEX-ORDER  */
    //
    // TODO: 'flex-order' has been replaced by 'order'.
    // Previous version: http://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-order
    //   Latest version: http://www.w3.org/TR/css3-flexbox/#order-property
    //
    // {
    //     type: 'pattern',
    //     //     name: 'Flex order',
    //     prefix: 'Flo-',
    //     properties: ['flex-order']
    // },
    {
        type: 'pattern',
        name: 'Order',
        prefix: 'Or-',
        properties: ['order'],
        allowCustom: true,
        allowSuffixToValue: true
    },

    /* FLEX-PACK  */
    //
    // TODO: 'flex-pack' has been replaced by 'justify-content'.
    // Previous version: http://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-pack
    //   Latest version: http://www.w3.org/TR/css3-flexbox/#justify-content-property
    //
    // {
    //     type: 'pattern',
    //     //     name: 'Flex pack',
    //     prefix: 'Flp-',
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
        name: 'Justify content',
        prefix: 'Jc-',
        properties: ['justify-content'],
        rules: [
            {suffix: 'fs', values: ['flex-start']},
            {suffix: 'fe', values: ['flex-end']},
            {suffix: 'c', values: ['center']},
            {suffix: 'sb', values: ['space-between']},
            {suffix: 'sa', values: ['space-around']}
        ]
    },

    /* FLEX-WRAP  */
    {
        type: 'pattern',
        name: 'Flex-wrap',
        prefix: 'Flw-',
        properties: ['flex-wrap'],
        rules: [
            {suffix: 'nw', values: ['nowrap']},
            {suffix: 'w', values: ['wrap']},
            {suffix: 'wr', values: ['wrap-reverse']}
        ]
    },

    /**
     ==================================================================
     FLOAT
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Float',
        prefix: 'Fl-',
        properties: ['float'],
        rules: [
            {suffix: 'n', values: ['none']},
            {suffix: 'start', values: ['__START__']},
            {suffix: 'end', values: ['__END__']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },

    /**
     ==================================================================
     FONT FAMILY suffix matches generic font-family
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Font family',
        prefix: 'Ff-',
        properties: ['font-family'],
        rules: [
            {suffix: 'c', values: ['"Monotype Corsiva", "Comic Sans MS", cursive']},
            {suffix: 'f', values: ['Capitals, Impact, fantasy']},
            {suffix: 'm', values: ['Monaco, "Courier New", monospace']},
            {suffix: 's', values: ['Georgia, "Times New Roman", serif']},
            {suffix: 'ss', values: ['Helvetica, Arial, sans-serif']}
        ]
    },

    /**
     ==================================================================
     FONT-WEIGHT
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Font weight',
        prefix: 'Fw-',
        properties: ['font-weight'],
        rules: [
            {suffix: '100', values: ['100']},
            {suffix: '200', values: ['200']},
            {suffix: '300', values: ['300']},
            {suffix: '400', values: ['400']},
            {suffix: '500', values: ['500']},
            {suffix: '600', values: ['600']},
            {suffix: '700', values: ['700']},
            {suffix: '800', values: ['800']},
            {suffix: '900', values: ['900']},
            {suffix: 'b', values: ['bold']},
            {suffix: 'br', values: ['bolder']},
            {suffix: 'lr', values: ['lighter']},
            {suffix: 'n', values: ['normal']}
        ]
    },

    /**
     ==================================================================
     FONT-SIZE
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Font size',
        prefix: 'Fz-',
        properties: ['font-size'],
        allowCustom: true,
        allowCustomAutoSuffix: true,
        allowSuffixToValue: true
    },

    /**
     ==================================================================
     FONT-STYLE
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Font style',
        prefix: 'Fs-',
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
        name: 'Font variant',
        prefix: 'Fv-',
        properties: ['font-variant'],
        rules: [
            {suffix: 'n', values: ['normal']},
            {suffix: 'sc', values: ['small-caps']}
        ]
    },

    /**
     ==================================================================
     HEIGHT
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Height',
        prefix: 'H-',
        properties: ['height'],
        allowCustom: true,
        allowSuffixToValue: true,
        allowFraction: true,
        rules: [
            {suffix: '0', values: [0]},
            {suffix: 'a', values: ['auto']},
            {suffix: 'av', values: ['available']},
            {suffix: 'bb', values: ['border-box']},
            {suffix: 'cb', values: ['content-box']},
            {suffix: 'fc', values: ['fit-content']},
            {suffix: 'maxc', values: ['max-content']},
            {suffix: 'minc', values: ['min-content']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },

    /**
     ==================================================================
     HYPHENS
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Hyphens',
        prefix: 'Hy-',
        properties: ['hyphens'],
        rules: [
            {suffix: 'a', values: ['auto']},
            {suffix: 'inh', values: ['inherit']},
            {suffix: 'n', values: ['normal']},
            {suffix: 'm', values: ['manual']}
        ]
    },

    /**
     ==================================================================
     LIST-STYLE-TYPE
     ==================================================================
     */
     {
        type: 'pattern',
        name: 'List style type',
        prefix: 'List-',
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
            {suffix: 'ua', values: ['upper-alpha']}
        ]
    },

    /**
     ==================================================================
     LIST-STYLE-IMAGE
     ==================================================================
     */
    // TODO: Validate URI
    {
        type: 'pattern',
        name: 'List style image',
        prefix: 'Lisi-',
        properties: ['list-style-image'],
        allowCustom: true,
        allowSuffixToValue: false,
        rules: [
            {suffix: 'n', values: ['none']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },

    /**
     ==================================================================
     LINE-HEIGHT
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Line height',
        prefix: 'Lh-',
        properties: ['line-height'],
        allowCustom: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: 'inh', values: ['inherit']},
            {suffix: 'n', values: ['normal']}
        ]
    },

    /**
     ==================================================================
     MARGINS
     ==================================================================
     */
    // all edges
    {
        type: 'pattern',
        name: 'Margin (all edges)',
        prefix: 'M-',
        properties: ['margin'],
        allowCustom: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: 'a', values: ['auto']},
            {suffix: 'inh', values: ['inherit']},
            {suffix: '0', values: [0]}
        ]
    },
    // top
    {
        type: 'pattern',
        name: 'Margin top',
        prefix: 'Mt-',
        properties: ['margin-top'],
        allowCustom: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: 'a', values: ['auto']},
            {suffix: 'inh', values: ['inherit']},
            {suffix: '0', values: [0]}
        ]
    },
    // end
    {
        type: 'pattern',
        name: 'Margin end',
        prefix: 'Mend-',
        properties: ['margin-__END__'],
        allowCustom: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: 'a', values: ['auto']},
            {suffix: 'inh', values: ['inherit']},
            {suffix: '0', values: [0]}
        ]
    },
    // bottom
    {
        type: 'pattern',
        name: 'Margin bottom',
        prefix: 'Mb-',
        properties: ['margin-bottom'],
        allowCustom: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: 'a', values: ['auto']},
            {suffix: 'inh', values: ['inherit']},
            {suffix: '0', values: [0]}
        ]
    },
    // start
    {
        type: 'pattern',
        name: 'Margin start',
        prefix: 'Mstart-',
        properties: ['margin-__START__'],
        allowCustom: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: 'a', values: ['auto']},
            {suffix: 'inh', values: ['inherit']},
            {suffix: '0', values: [0]}
        ]
    },
    // X axis
    {
        type: 'pattern',
        name: 'Margin (X axis)',
        prefix: 'Mx-',
        properties: ['margin-__START__', 'margin-__END__'],
        allowCustom: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: 'a', values: ['auto', 'auto']},
            {suffix: 'inh', values: ['inherit', 'inherit']},
            {suffix: '0', values: [0, 0]}
        ]
    },
    // Y axis
    {
        type: 'pattern',
        name: 'Margin (Y axis)',
        prefix: 'My-',
        properties: ['margin-top', 'margin-bottom'],
        allowCustom: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: 'a', values: ['auto', 'auto']},
            {suffix: 'inh', values: ['inherit', 'inherit']},
            {suffix: '0', values: [0, 0]}
        ]
    },
    /**
     ==================================================================
     MAX-HEIGHT
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Max height',
        prefix: 'Mah-',
        properties: ['max-height'],
        allowCustom: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: 'a', values: ['auto']},
            {suffix: 'inh', values: ['inherit']},
            {suffix: 'maxc', values: ['max-content']},
            {suffix: 'minc', values: ['min-content']},
            {suffix: 'fa', values: ['fill-available']},
            {suffix: 'fc', values: ['fit-content']}
        ]
    },
    /**
     ==================================================================
     MAX-WIDTH
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Max width',
        prefix: 'Maw-',
        properties: ['max-width'],
        allowCustom: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: 'a', values: ['auto']},
            {suffix: 'fa', values: ['fill-available']},
            {suffix: 'fc', values: ['fit-content']},
            {suffix: 'maxc', values: ['max-content']},
            {suffix: 'minc', values: ['min-content']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    /**
     ==================================================================
     MIN-HEIGHT
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Min height',
        prefix: 'Mih-',
        properties: ['min-height'],
        allowCustom: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: 'a', values: ['auto']},
            {suffix: 'fa', values: ['fill-available']},
            {suffix: 'fc', values: ['fit-content']},
            {suffix: 'maxc', values: ['max-content']},
            {suffix: 'minc', values: ['min-content']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    /**
     ==================================================================
     MIN-WIDTH
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Min width',
        prefix: 'Miw-',
        properties: ['min-width'],
        allowCustom: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: 'a', values: ['auto']},
            {suffix: 'fa', values: ['fill-available']},
            {suffix: 'fc', values: ['fit-content']},
            {suffix: 'maxc', values: ['max-content']},
            {suffix: 'minc', values: ['min-content']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    /**
     ==================================================================
     OUTLINE
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Outline',
        prefix: 'O-',
        properties: ['outline'],
        allowCustom: true,
        allowSuffixToValue: false,
        rules: [
            {suffix: '0', values: [0]},
            {suffix: 'n', values: ['none']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    /**
     ==================================================================
     OFFSETS
     ==================================================================
     */
    // top
    {
        type: 'pattern',
        name: 'Top',
        prefix: 'T-',
        properties: ['top'],
        allowCustom: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: 'a', values: ['auto']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    // end
    {
        type: 'pattern',
        name: 'End',
        prefix: 'End-',
        properties: ['__END__'],
        allowCustom: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: 'a', values: ['auto']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    // bottom
    {
        type: 'pattern',
        name: 'Bottom',
        prefix: 'B-',
        properties: ['bottom'],
        allowCustom: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: 'a', values: ['auto']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    // start
    {
        type: 'pattern',
        name: 'Start',
        prefix: 'Start-',
        properties: ['__START__'],
        allowCustom: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: 'a', values: ['auto']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    /**
     ==================================================================
     OPACITY
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Opacity',
        prefix: 'Op-',
        properties: ['opacity'],
        allowCustom: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: '0', values: [0]},
            {suffix: '1', values: [1]},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    /**
     ==================================================================
     OVERFLOW
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Overflow',
        prefix: 'Ov-',
        properties: ['overflow'],
        rules: [
            {suffix: 'a', values: ['auto']},
            {suffix: 'h', values: ['hidden']},
            {suffix: 's', values: ['scroll']},
            {suffix: 'v', values: ['visible']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    /**
     ==================================================================
     OVERFLOW-X
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Overflow (X axis)',
        prefix: 'Ovx-',
        properties: ['overflow-x'],
        rules: [
            {suffix: 'a', values: ['auto']},
            {suffix: 'h', values: ['hidden']},
            {suffix: 's', values: ['scroll']},
            {suffix: 'v', values: ['visible']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    /**
     ==================================================================
     OVERFLOW-Y
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Overflow (Y axis)',
        prefix: 'Ovy-',
        properties: ['overflow-y'],
        rules: [
            {suffix: 'a', values: ['auto']},
            {suffix: 'h', values: ['hidden']},
            {suffix: 's', values: ['scroll']},
            {suffix: 'v', values: ['visible']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    /**
     ==================================================================
     OVERFLOW-SCROLLING (-webkit-)
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Overflow scrolling',
        prefix: 'Ovs-',
        properties: ['-webkit-overflow-scrolling'],
        rules: [
            {suffix: 'a', values: ['auto']},
            {suffix: 'touch', values: ['touch']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    /**
     ==================================================================
     PADDING
     ==================================================================
     */
    // all edges
    {
        type: 'pattern',
        name: 'Padding (all edges)',
        prefix: 'P-',
        properties: ['padding'],
        allowCustom: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: '0', values: [0]},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    // top
    {
        type: 'pattern',
        name: 'Padding top',
        prefix: 'Pt-',
        properties: ['padding-top'],
        allowCustom: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: '0', values: [0]},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    // end
    {
        type: 'pattern',
        name: 'Padding end',
        prefix: 'Pend-',
        properties: ['padding-__END__'],
        allowCustom: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: '0', values: [0]},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    // bottom
    {
        type: 'pattern',
        name: 'Padding bottom',
        prefix: 'Pb-',
        properties: ['padding-bottom'],
        allowCustom: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: '0', values: [0]},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    // start
    {
        type: 'pattern',
        name: 'Padding start',
        prefix: 'Pstart-',
        properties: ['padding-__START__'],
        allowCustom: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: '0', values: [0]},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    // X axis
    {
        type: 'pattern',
        name: 'Padding (X axis)',
        prefix: 'Px-',
        properties: ['padding-__START__', 'padding-__END__'],
        allowCustom: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: '0', values: [0, 0]},
            {suffix: 'inh', values: ['inherit', 'inherit']}
        ]
    },
    // Y axis
    {
        type: 'pattern',
        name: 'Padding (Y axis)',
        prefix: 'Py-',
        properties: ['padding-top', 'padding-bottom'],
        allowCustom: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: '0', values: [0, 0]},
            {suffix: 'inh', values: ['inherit', 'inherit']}
        ]
    },
    /**
     ==================================================================
     POINTER-EVENTS
     ==================================================================
     */
     {
        type: 'pattern',
        name: 'Pointer events',
        prefix: 'Pe-',
        properties: ['pointer-events'],
        rules: [
            {suffix: 'a', values: ['auto']},
            {suffix: 'all', values: ['all']},
            {suffix: 'f', values: ['fill']},
            {suffix: 'n', values: ['none']},
            {suffix: 'p', values: ['painted']},
            {suffix: 's', values: ['stroke']},
            {suffix: 'v', values: ['visible']},
            {suffix: 'vf', values: ['visibleFill']},
            {suffix: 'vp', values: ['visiblePainted']},
            {suffix: 'vs', values: ['visibleStroke']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    /**
     ==================================================================
     POSITION
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Position',
        prefix: 'Pos-',
        properties: ['position'],
        rules: [
            {suffix: 'a', values: ['absolute']},
            {suffix: 'f', values: ['fixed']},
            {suffix: 'r', values: ['relative']},
            {suffix: 's', values: ['static']},
            {suffix: 'st', values: ['sticky']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    /**
     ==================================================================
     TABLE-LAYOUT (checked)
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Table layout',
        prefix: 'Tbl-',
        properties: ['table-layout'],
        rules: [
            {suffix: 'a', values: ['auto']},
            {suffix: 'f', values: ['fixed']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    /**
     ==================================================================
     TEXT-ALIGN
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Text align',
        prefix: 'Ta-',
        properties: ['text-align'],
        rules: [
            {suffix: 'c', values: ['center']},
            {suffix: 'e', values: ['end']},
            {suffix: 'end', values: ['__END__']},
            {suffix: 'j', values: ['justify']},
            {suffix: 'mp', values: ['match-parent']},
            {suffix: 's', values: ['start']},
            {suffix: 'start', values: ['__START__']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    /**
     ==================================================================
     TEXT-ALIGN-LAST
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Text align last',
        prefix: 'Tal-',
        properties: ['text-align-last'],
        rules: [
            {suffix: 'a', values: ['auto']},
            {suffix: 'c', values: ['center']},
            {suffix: 'e', values: ['end']},
            {suffix: 'end', values: ['__END__']},
            {suffix: 'j', values: ['justify']},
            {suffix: 's', values: ['start']},
            {suffix: 'start', values: ['__START__']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    /**
     ==================================================================
     TEXT-DECORATION
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Text decoration',
        prefix: 'Td-',
        properties: ['text-decoration'],
        rules: [
            {suffix: 'l', values: ['line-through']},
            {suffix: 'n', values: ['none']},
            {suffix: 'o', values: ['overline']},
            {suffix: 'u', values: ['underline']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    /**
     ==================================================================
     TEXT-INDENT
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Text indent',
        prefix: 'Ti-',
        properties: ['text-indent'],
        allowCustom: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    /**
     ==================================================================
     TEXT-OVERFLOW
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Text overflow',
        prefix: 'Tov-',
        properties: ['text-overflow'],
        allowCustom: true,
        allowSuffixToValue: false,
        rules: [
            {suffix: 'c', values: ['clip']},
            {suffix: 'e', values: ['ellipsis']}
        ]
    },
    /**
     ==================================================================
     TEXT-RENDERING
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Text rendering',
        prefix: 'Tren-',
        properties: ['text-rendering'],
        rules: [
            {suffix: 'a', values: ['auto']},
            {suffix: 'os', values: ['optimizeSpeed']},
            {suffix: 'ol', values: ['optimizeLegibility']},
            {suffix: 'gp', values: ['geometricPrecision']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    /**
     ==================================================================
     TEXT-REPLACE
     http://www.w3.org/TR/2007/WD-css3-gcpm-20070504/
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Text replace',
        prefix: 'Tr-',
        properties: ['text-replace'],
        allowCustom: true,
        allowSuffixToValue: false,
        rules: [
            {suffix: 'n', values: ['none']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    /**
     ==================================================================
     TEXT-TRANSFORM
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Text transform',
        prefix: 'Tt-',
        properties: ['text-transform'],
        rules: [
            {suffix: 'n', values: ['none']},
            {suffix: 'c', values: ['capitalize']},
            {suffix: 'u', values: ['uppercase']},
            {suffix: 'l', values: ['lowercase']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    /**
     ==================================================================
     TEXT-SHADOW
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Text shadow',
        prefix: 'Tsh-',
        properties: ['text-shadow'],
        allowCustom: true,
        allowCustomAutoSuffix: true,
        allowSuffixToValue: false,
        rules: [
            {suffix: 'n', values: ['none']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    /**
     ==================================================================
     TRANSFORM
     ==================================================================
     */
    {
        type: 'pattern',
        id: 'transform',
        name: 'Transform',
        prefix: '.Trf-',
        properties: ['transform'],
        allowCustom: true,
        allowCustomAutoSuffix: false,
        allowSuffixToValue: false
    },
    // We also need to be able to manage values within value?
    // For example "Trfr-90deg" -> "transform: rotate(90deg)"
    // And we need aliases for those as well (i.e. Rot-90deg)
    /**
     ==================================================================
     TRANSITION
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Transition',
        prefix: 'Trs-',
        properties: ['transition'],
        allowCustom: true,
        allowCustomAutoSuffix: false,
        allowSuffixToValue: false
    },
    {
        type: 'pattern',
        name: 'Transition delay',
        prefix: 'Trsde-',
        properties: ['transition-delay'],
        allowCustom: true,
        allowCustomAutoSuffix: false,
        allowSuffixToValue: true,
        rules: [
            {suffix: 'i', values: ['initial']}
        ]
    },
    {
        type: 'pattern',
        name: 'Transition duration',
        prefix: 'Trsdu-',
        properties: ['transition-duration'],
        allowCustom: true,
        allowCustomAutoSuffix: false,
        allowSuffixToValue: true,
        rules: [
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    {
        type: 'pattern',
        name: 'Transition property',
        prefix: 'Trsp-',
        properties: ['transition-property'],
        allowCustom: true,
        allowCustomAutoSuffix: false,
        allowSuffixToValue: false,
        rules: [
            {suffix: 'a', values: ['all']}
        ]
    },
    {
        type: 'pattern',
        name: 'Transition timing function',
        prefix: 'Trstf-',
        properties: ['transition-timing-function'],
        // for cubic-bezier
        allowCustom: true,
        allowCustomAutoSuffix: false,
        allowSuffixToValue: false,
        rules: [
            {suffix: 'e', values: ['ease']},
            {suffix: 'ei', values: ['ease-in']},
            {suffix: 'eo', values: ['ease-out']},
            {suffix: 'eio', values: ['ease-in-out']},
            {suffix: 'l', values: ['linear']},
            {suffix: 'ss', values: ['step-start']},
            {suffix: 'se', values: ['step-end']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    /**
     ==================================================================
     USER-SELECT
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'User select',
        prefix: 'Us-',
        properties: ['user-select'],
        rules: [
            {suffix: 'a', values: ['all']},
            {suffix: 'el', values: ['element']},
            {suffix: 'els', values: ['elements']},
            {suffix: 'n', values: ['none']},
            {suffix: 't', values: ['text']},
            {suffix: 'to', values: ['toggle']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    /**
     ==================================================================
     VERTICAL-ALIGN
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Vertical align',
        prefix: 'Va-',
        properties: ['vertical-align'],
        allowCustom: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: 'b', values: ['bottom']},
            {suffix: 'bl', values: ['baseline']},
            {suffix: 'm', values: ['middle']},
            {suffix: 'sub', values: ['sub']},
            {suffix: 'sup', values: ['super']},
            {suffix: 't', values: ['top']},
            {suffix: 'tb', values: ['text-bottom']},
            {suffix: 'tt', values: ['text-top']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    /**
     ==================================================================
     VISIBILITY
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Visibility',
        prefix: 'V-',
        properties: ['visibility'],
        rules: [
            {suffix: 'v', values: ['visible']},
            {suffix: 'h', values: ['hidden']},
            {suffix: 'c', values: ['collapse']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    /**
     ==================================================================
     WHITE-SPACE
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'White space',
        prefix: 'Whs-',
        properties: ['white-space'],
        rules: [
            {suffix: 'n', values: ['normal']},
            {suffix: 'p', values: ['pre']},
            {suffix: 'nw', values: ['nowrap']},
            {suffix: 'pw', values: ['pre-wrap']},
            {suffix: 'pl', values: ['pre-line']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    /**
     ==================================================================
     WHITE-SPACE-COLLAPSE
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'White space collapse',
        prefix: 'Whsc-',
        properties: ['white-space-collapse'],
        rules: [
            {suffix: 'n', values: ['normal']},
            {suffix: 'k', values: ['keep-all']},
            {suffix: 'l', values: ['loose']},
            {suffix: 'bs', values: ['break-strict']},
            {suffix: 'ba', values: ['break-all']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    /**
     ==================================================================
     WIDTH
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Width',
        prefix: 'W-',
        properties: ['width'],
        allowCustom: true,
        allowCustomAutoSuffix: true,
        allowFraction: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: '0', values: [0]},
            {suffix: 'a', values: ['auto']},
            {suffix: 'bb', values: ['border-box']},
            {suffix: 'cb', values: ['content-box']},
            {suffix: 'av', values: ['available']},
            {suffix: 'minc', values: ['min-content']},
            {suffix: 'maxc', values: ['max-content']},
            {suffix: 'fc', values: ['fit-content']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    /**
     ==================================================================
     WORD-BREAK
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Word break',
        prefix: 'Wob-',
        properties: ['word-break'],
        rules: [
            {suffix: 'ba', values: ['break-all']},
            {suffix: 'k', values: ['keep-all']},
            {suffix: 'n', values: ['normal']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    /**
     ==================================================================
     WORD-WRAP (not part of the spec)
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Word wrap',
        prefix: 'Wow-',
        properties: ['word-wrap'],
        rules: [
            {suffix: 'bw', values: ['break-word']},
            {suffix: 'n', values: ['normal']},
            {suffix: 'inh', values: ['inherit']}
        ]
    },
    /**
     ==================================================================
     Z-INDEX
     ==================================================================
     */
    {
        type: 'pattern',
        name: 'Z index',
        prefix: 'Z-',
        properties: ['z-index'],
        allowCustom: true,
        allowCustomAutoSuffix: true,
        allowSuffixToValue: true,
        rules: [
            {suffix: 'a', values: ['auto']},
            {suffix: 'inh', values: ['inherit']}
        ]
    }
];
