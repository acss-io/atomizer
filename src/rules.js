/**
 * ----------------------------------------------------
 * Copyright (c) 2015, Yahoo Inc. All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 * ----------------------------------------------------
 *
 * These are the main Atomic CSS rules.
 * By default, all rules accept "inh" ("inherit").
 *
 * Please submit a PR if you find any missing rule.
 *
 * Most abbreviations are based on Emmet:
 * http://docs.emmet.io/cheat-sheet/
 *
 * Read more about abbreviations here:
 * http://acss.io/guides/syntax.html
 *
 * NOTES:
 *
 * Depending on the selector you use to namespace these rules (id versus class),
 * their style weight will be either 0,1,1,0 or 0,0,2,0. We suggest using an id
 * for the extra specificity.
 *
 * - look for top/right/bottom/left rules in the "offset" section.
 * - we do *not* use left and right as keywords for class names, instead we use
 *   "start" and "end".
 * - Rules is written as an array because ORDER is important for the CSS generation.
 **/

var colors = require('./colors');

module.exports = [
    /**
    ==================================================================
    ANIMATION
    ==================================================================
    */
    {
        "type": "pattern",
        "id": "animation",
        "name": "Animation",
        "matcher": "Anim",
        "allowParamToValue": true,
        "styles": {
            "animation": "$0"
        }
    },
    {
        "type": "pattern",
        "id": "animation-delay",
        "name": "Animation delay",
        "matcher": "Animdel",
        "allowParamToValue": true,
        "styles": {
            "animation-delay": "$0"
        }
    },
    {
        "type": "pattern",
        "id": "animation-direction",
        "name": "Animation direction",
        "matcher": "Animdir",
        "allowParamToValue": false,
        "styles": {
            "animation-direction": "$0"
        },
        "arguments": [
            {
                "a": "alternate",
                "ar": "alternate-reverse",
                "n": "normal",
                "r": "reverse"
            }
        ]
    },
    {
        "type": "pattern",
        "id": "animation-duration",
        "name": "Animation duration",
        "matcher": "Animdur",
        "allowParamToValue": true,
        "styles": {
            "animation-duration": "$0"
        }
    },
    {
        "type": "pattern",
        "id": "animation-fill-mode",
        "name": "Animation fill mode",
        "matcher": "Animfm",
        "allowParamToValue": false,
        "styles": {
            "animation-fill-mode": "$0"
        },
        "arguments": [
            {
                "b": "backwards",
                "bo": "both",
                "f": "forwards",
                "n": "none"
            }
        ]
    },
    {
        "type": "pattern",
        "id": "animation-iteration-count",
        "name": "Animation iteration count",
        "matcher": "Animic",
        "allowParamToValue": true,
        "styles": {
            "animation-iteration-count": "$0"
        },
        "arguments": [
            {
                "i": "infinite"
            }
        ]
    },
    {
        "type": "pattern",
        "id": "animation-name",
        "name": "Animation name",
        "matcher": "Animn",
        "allowParamToValue": true,
        "styles": {
            "animation-name": "$0"
        },
        "arguments": [
            {
                "n": "none"
            }
        ]
    },
    {
        "type": "pattern",
        "id": "animation-play-state",
        "name": "Animation play state",
        "matcher": "Animps",
        "allowParamToValue": false,
        "styles": {
            "animation-play-state": "$0"
        },
        "arguments": [
            {
                "p": "paused",
                "r": "running"
            }
        ]
    },
    {
        "type": "pattern",
        "id": "animation-timing-function",
        "name": "Animation timing function",
        "matcher": "Animtf",
        "allowParamToValue": false,
        "styles": {
            "animation-timing-function": "$0"
        },
        "arguments": [
            {
                "e": "ease",
                "ei": "ease-in",
                "eo": "ease-out",
                "eio": "ease-in-out",
                "l": "linear",
                "se": "step-end",
                "ss": "step-start"
            }
        ]
    },
    /**
    ==================================================================
    BORDERS
    ==================================================================
    */
    // all edges
    {
        "type": "pattern",
        "name": "Border",
        "matcher": "Bd",
        "allowParamToValue": false,
        "styles": {
            "border": "$0"
        },
        "arguments": [
            {
                "0": 0,
                "n": "none"
            }
        ]
    },
    // X axis
    {
        "type": "pattern",
        "name": "Border X",
        "matcher": "Bdx",
        "allowParamToValue": false,
        "styles": {
            "border-__START__": "$0",
            "border-__END__": "$0"
        }
    },
    // Y axis
    {
        "type": "pattern",
        "name": "Border Y",
        "matcher": "Bdy",
        "allowParamToValue": false,
        "styles": {
            "border-top": "$0",
            "border-bottom": "$0"
        }
    },
    // top
    {
        "type": "pattern",
        "name": "Border top",
        "matcher": "Bdt",
        "allowParamToValue": false,
        "styles": {
            "border-top": "$0"
        }
    },
    // end
    {
        "type": "pattern",
        "name": "Border end",
        "matcher": "Bdend",
        "allowParamToValue": false,
        "styles": {
            "border-__END__": "$0"
        }
    },
    // bottom
    {
        "type": "pattern",
        "name": "Border bottom",
        "matcher": "Bdb",
        "allowParamToValue": false,
        "styles": {
            "border-bottom": "$0"
        }
    },
    // start
    {
        "type": "pattern",
        "name": "Border start",
        "matcher": "Bdstart",
        "allowParamToValue": false,
        "styles": {
            "border-__START__": "$0"
        }
    },
    /**
    ==================================================================
    BORDER COLOR
    ==================================================================
    */
    // all edges
    {
        "type": "pattern",
        "name": "Border color",
        "matcher": "Bdc",
        "allowParamToValue": true,
        "styles": {
            "border-color": "$0"
        },
        "arguments": [colors]
    },
    // top
    {
        "type": "pattern",
        "name": "Border top color",
        "matcher": "Bdtc",
        "allowParamToValue": true,
        "styles": {
            "border-top-color": "$0"
        },
        "arguments": [colors]
    },
    // end
    {
        "type": "pattern",
        "name": "Border end color",
        "matcher": "Bdendc",
        "allowParamToValue": true,
        "styles": {
            "border-__END__-color": "$0"
        },
        "arguments": [colors]
    },
    // bottom
    {
        "type": "pattern",
        "name": "Border bottom color",
        "matcher": "Bdbc",
        "allowParamToValue": true,
        "styles": {
            "border-bottom-color": "$0"
        },
        "arguments": [colors]
    },
    // start
    {
        "type": "pattern",
        "name": "Border start color",
        "matcher": "Bdstartc",
        "allowParamToValue": true,
        "styles": {
            "border-__START__-color": "$0"
        },
        "arguments": [colors]
    },
    /**
    ==================================================================
    BORDER SPACING
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Border spacing",
        "matcher": "Bdsp",
        "allowParamToValue": true,
        "styles": {
            "border-spacing": "$0 $1"
        },
        "arguments": [{
            "i": "inherit"
        }]
    },
    /**
    ==================================================================
    BORDER STYLE
    ==================================================================
    */
    // all edges
    {
        "type": "pattern",
        "name": "Border style",
        "matcher": "Bds",
        "allowParamToValue": false,
        "styles": {
            "border-style": "$0"
        },
        "arguments": [{
            "d": "dotted",
            "da": "dashed",
            "do": "double",
            "g": "groove",
            "h": "hidden",
            "i": "inset",
            "n": "none",
            "o": "outset",
            "r": "ridge",
            "s": "solid"
        }]
    },
    // top
    {
        "type": "pattern",
        "name": "Border top style",
        "matcher": "Bdts",
        "allowParamToValue": false,
        "styles": {
            "border-top-style": "$0"
        },
        "arguments": [{
            "d": "dotted",
            "da": "dashed",
            "do": "double",
            "g": "groove",
            "h": "hidden",
            "i": "inset",
            "n": "none",
            "o": "outset",
            "r": "ridge",
            "s": "solid"
        }]
    },
    // end
    {
        "type": "pattern",
        "name": "Border end style",
        "matcher": "Bdends",
        "allowParamToValue": false,
        "styles": {
            "border-__END__-style": "$0"
        },
        "arguments": [{
            "d": "dotted",
            "da": "dashed",
            "do": "double",
            "g": "groove",
            "h": "hidden",
            "i": "inset",
            "n": "none",
            "o": "outset",
            "r": "ridge",
            "s": "solid"
        }]
    },
    // bottom
    {
        "type": "pattern",
        "name": "Border bottom style",
        "matcher": "Bdbs",
        "allowParamToValue": false,
        "styles": {
            "border-bottom-style": "$0"
        },
        "arguments": [{
            "d": "dotted",
            "da": "dashed",
            "do": "double",
            "g": "groove",
            "h": "hidden",
            "i": "inset",
            "n": "none",
            "o": "outset",
            "r": "ridge",
            "s": "solid"
        }]
    },
    // start
    {
        "type": "pattern",
        "name": "Border start style",
        "matcher": "Bdstarts",
        "allowParamToValue": false,
        "styles": {
            "border-__START__-style": "$0"
        },
        "arguments": [{
            "d": "dotted",
            "da": "dashed",
            "do": "double",
            "g": "groove",
            "h": "hidden",
            "i": "inset",
            "n": "none",
            "o": "outset",
            "r": "ridge",
            "s": "solid"
        }]
    },
    /**
    ==================================================================
    BORDER WIDTH
    ==================================================================
    */
    // all edges
    {
        "type": "pattern",
        "name": "Border width",
        "matcher": "Bdw",
        "allowParamToValue": true,
        "styles": {
            "border-width": "$0"
        },
        "arguments": [{
            "m": "medium",
            "t": "thin",
            "th": "thick"
        }]
    },
    // top
    {
        "type": "pattern",
        "name": "Border top width",
        "matcher": "Bdtw",
        "allowParamToValue": true,
        "styles": {
            "border-top-width": "$0"
        },
        "arguments": [{
            "m": "medium",
            "t": "thin",
            "th": "thick"
        }]
    },
    // end
    {
        "type": "pattern",
        "name": "Border end width",
        "matcher": "Bdendw",
        "allowParamToValue": true,
        "styles": {
            "border-__END__-width": "$0"
        },
        "arguments": [{
            "m": "medium",
            "t": "thin",
            "th": "thick"
        }]
    },
    // bottom
    {
        "type": "pattern",
        "name": "Border bottom width",
        "matcher": "Bdbw",
        "allowParamToValue": true,
        "styles": {
            "border-bottom-width": "$0"
        },
        "arguments": [{
            "m": "medium",
            "t": "thin",
            "th": "thick"
        }]
    },
    // start
    {
        "type": "pattern",
        "name": "Border start width",
        "matcher": "Bdstartw",
        "allowParamToValue": true,
        "styles": {
            "border-__START__-width": "$0"
        },
        "arguments": [{
            "m": "medium",
            "t": "thin",
            "th": "thick"
        }]
    },
    /**
    ==================================================================
    BORDER RADIUS
    ==================================================================
    */
    // all corners
    {
        "type": "pattern",
        "name": "Border radius",
        "matcher": "Bdrs",
        "allowParamToValue": true,
        "styles": {
            "border-radius": "$0"
        }
    },
    // top-right
    {
        "type": "pattern",
        "name": "Border radius top right",
        "matcher": "Bdrstend",
        "allowParamToValue": true,
        "styles": {
            "border-top-__END__-radius": "$0"
        }
    },
    // bottom-right
    {
        "type": "pattern",
        "name": "Border radius bottom right",
        "matcher": "Bdrsbend",
        "allowParamToValue": true,
        "styles": {
            "border-bottom-__END__-radius": "$0"
        }
    },
    // bottom-left
    {
        "type": "pattern",
        "name": "Border radius bottom left",
        "matcher": "Bdrsbstart",
        "allowParamToValue": true,
        "styles": {
            "border-bottom-__START__-radius": "$0"
        }
    },
    // top-left
    {
        "type": "pattern",
        "name": "Border radius top left",
        "matcher": "Bdrststart",
        "allowParamToValue": true,
        "styles": {
            "border-top-__START__-radius": "$0"
        }
    },
    /**
    ==================================================================
    BACKGROUNDS
    ==================================================================
    */
    // background
    {
        "type": "pattern",
        "name": "Background",
        "matcher": "Bg",
        "allowParamToValue": false,
        "styles": {
            "background": "$0"
        },
        "arguments": [{
            "n": "none",
            "t": "transparent"
        }]
    },
    // background-image
    {
        "type": "pattern",
        "name": "Background image",
        "matcher": "Bgi",
        "allowParamToValue": false,
        "styles": {
            "background-image": "$0"
        },
        "arguments": [{
            "n": "none"
        }]
    },
    // background-color
    {
        "type": "pattern",
        "name": "Background color",
        "matcher": "Bgc",
        "allowParamToValue": true,
        "styles": {
            "background-color": "$0"
        },
        "arguments": [colors]
    },
    // background-clip
    {
        "type": "pattern",
        "name": "Background clip",
        "matcher": "Bgcp",
        "allowParamToValue": false,
        "styles": {
            "background-clip": "$0"
        },
        "arguments": [{
            "bb": "border-box",
            "cb": "content-box",
            "pb": "padding-box"
        }]
    },
    // background-origin
    {
        "type": "pattern",
        "name": "Background origin",
        "matcher": "Bgo",
        "allowParamToValue": false,
        "styles": {
            "background-origin": "$0"
        },
        "arguments": [{
            "bb": "border-box",
            "cb": "content-box",
            "pb": "padding-box"
        }]
    },
    // background-size
    {
        "type": "pattern",
        "name": "Background size",
        "matcher": "Bgz",
        "allowParamToValue": true,
        "styles": {
            "background-size": "$0"
        },
        "arguments": [{
            "a": "auto",
            "ct": "contain",
            "cv": "cover"
        }]
    },
    // background-attachment
    {
        "type": "pattern",
        "name": "Background attachment",
        "matcher": "Bga",
        "allowParamToValue": false,
        "styles": {
            "background-attachment": "$0"
        },
        "arguments": [{
            "f": "fixed",
            "l": "local",
            "s": "scroll"
        }]
    },
    // background-position
    {
        "type": "pattern",
        "name": "Background position",
        "matcher": "Bgp",
        "allowParamToValue": true,
        "styles": {
            "background-position": "$0 $1"
        },
        "arguments": [{
            "start_t": "__START__ 0",
            "end_t": "__END__ 0",
            "start_b": "__START__ 100%",
            "end_b": "__END__ 100%",
            "start_c": "__START__ center",
            "c_t": "center 0",
            "c": "center"
        }]
    },
    // background-position-x
    {
        "type": "pattern",
        "name": "Background position (X axis)",
        "matcher": "Bgpx",
        "allowParamToValue": true,
        "styles": {
            "background-position-x": "$0"
        },
        "arguments": [{
            "start": "__START__",
            "end": "__END__",
            "c": "50%"
        }]
    },
    // background-position-y
    {
        "type": "pattern",
        "name": "Background position (Y axis)",
        "matcher": "Bgpy",
        "allowParamToValue": true,
        "styles": {
            "background-position-y": "$0"
        },
        "arguments": [{
            "t": "0",
            "b": "100%",
            "c": "50%"
        }]
    },
    // background-repeat
    {
        "type": "pattern",
        "name": "Background repeat",
        "matcher": "Bgr",
        "allowParamToValue": false,
        "styles": {
            "background-repeat": "$0"
        },
        "arguments": [{
            "nr": "no-repeat",
            "rx": "repeat-x",
            "ry": "repeat-y",
            "r": "repeat",
            "s": "space",
            "ro": "round"
        }]
    },
    /**
    ==================================================================
    BORDER-COLLAPSE
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Border collapse",
        "matcher": "Bdcl",
        "allowParamToValue": false,
        "styles": {
            "border-collapse": "$0"
        },
        "arguments": [{
            "c": "collapse",
            "s": "separate"
        }]
    },
    /**
    ==================================================================
    BOX-SIZING
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Box sizing",
        "matcher": "Bxz",
        "allowParamToValue": false,
        "styles": {
            "box-sizing": "$0"
        },
        "arguments": [{
            "cb": "content-box",
            "pb": "padding-box",
            "bb": "border-box"
        }]
    },
    /**
    ==================================================================
    BOX-SHADOW
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Box shadow",
        "matcher": "Bxsh",
        "allowParamToValue": false,
        "styles": {
            "box-shadow": "$0"
        },
        "arguments": [{
            "n": "none"
        }]
    },
    /**
    ==================================================================
    CLEAR
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Clear",
        "matcher": "Cl",
        "allowParamToValue": false,
        "styles": {
            "clear": "$0"
        },
        "arguments": [{
            "n": "none",
            "b": "both",
            "start": "__START__",
            "end": "__END__"
        }]
    },
    /**
    ==================================================================
    COLOR
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Color",
        "matcher": "C",
        "allowParamToValue": true,
        "styles": {
            "color": "$0"
        },
        "arguments": [colors]
    },
    /**
    ==================================================================
    CURSOR
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Cursor",
        "matcher": "Cur",
        "allowParamToValue": false,
        "styles": {
            "cursor": "$0"
        },
        "arguments": [{
            "a": "auto",
            "as": "all-scroll",
            "c": "cell",
            "cr": "col-resize",
            "co": "copy",
            "cro": "crosshair",
            "d": "default",
            "er": "e-resize",
            "ewr": "ew-resize",
            "g": "grab",
            "gr": "grabbing",
            "h": "help",
            "m": "move",
            "n": "none",
            "nd": "no-drop",
            "na": "not-allowed",
            "nr": "n-resize",
            "ner": "ne-resize",
            "neswr": "nesw-resize",
            "nwser": "nwse-resize",
            "nsr": "ns-resize",
            "nwr": "nw-resize",
            "p": "pointer",
            "pr": "progress",
            "rr": "row-resize",
            "sr": "s-resize",
            "ser": "se-resize",
            "swr": "sw-resize",
            "t": "text",
            "vt": "vertical-text",
            "w": "wait",
            "wr": "w-resize",
            "zi": "zoom-in",
            "zo": "zoom-out"
        }]
    },
    /**
    ==================================================================
    DISPLAY
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Display",
        "matcher": "D",
        "allowParamToValue": false,
        "styles": {
            "display": "$0"
        },
        "arguments": [{
            "n": "none",
            "b": "block",
            "f": "flex",
            "i": "inline",
            "ib": "inline-block",
            "tb": "table",
            "tbr": "table-row",
            "tbc": "table-cell",
            "li": "list-item",
            "ri": "run-in",
            "cp": "compact",
            "itb": "inline-table",
            "tbcl": "table-column",
            "tbclg": "table-column-group",
            "tbhg": "table-header-group",
            "tbfg": "table-footer-group",
            "tbrg": "table-row-group"
        }]
    },
    /**
    ==================================================================
    FILTER FUNCTIONS
    http://www.w3.org/TR/filter-effects-1/#FilterProperty
    ==================================================================
    */
    // filter for custom
    {
        "type": "pattern",
        "name": "Filter",
        "matcher": "Fil",
        "allowParamToValue": false,
        "styles": {
            "filter": "$0"
        },
        "arguments": [{
            "n": "none"
        }]
    },
    // blur
    {
        "type": "pattern",
        "name": "Blur (filter)",
        "matcher": "Blur",
        "allowParamToValue": true,
        "styles": {
            "filter": "blur($0)"
        }
    },
    // brightness
    {
        "type": "pattern",
        "name": "Brightness (filter)",
        "matcher": "Brightness",
        "allowParamToValue": true,
        "styles": {
            "filter": "brightness($0)"
        }
    },
    // contrast
    {
        "type": "pattern",
        "name": "Contrast (filter)",
        "matcher": "Contrast",
        "allowParamToValue": true,
        "styles": {
            "filter": "contrast($0)"
        }
    },
    // contrast (only custom)
    {
        "type": "pattern",
        "name": "Drop shadow (filter)",
        "matcher": "Dropshadow",
        "allowParamToValue": false,
        "styles": {
            "filter": "drop-shadow($0)"
        }
    },
    // grayscale
    {
        "type": "pattern",
        "name": "Grayscale (filter)",
        "matcher": "Grayscale",
        "allowParamToValue": true,
        "styles": {
            "filter": "grayscale($0)"
        }
    },
    // hue-rotate
    {
        "type": "pattern",
        "name": "Hue Rotate (filter)",
        "matcher": "HueRotate",
        "allowParamToValue": true,
        "styles": {
            "filter": "hue-rotate($0)"
        }
    },
    // invert
    {
        "type": "pattern",
        "name": "Invert (filter)",
        "matcher": "Invert",
        "allowParamToValue": true,
        "styles": {
            "filter": "invert($0)"
        }
    },
    // opacity
    {
        "type": "pattern",
        "name": "Opacity (filter)",
        "matcher": "Opacity",
        "allowParamToValue": true,
        "styles": {
            "filter": "opacity($0)"
        }
    },
    // saturate
    {
        "type": "pattern",
        "name": "Saturate (filter)",
        "matcher": "Saturate",
        "allowParamToValue": true,
        "styles": {
            "filter": "saturate($0)"
        }
    },
    // sepia
    {
        "type": "pattern",
        "name": "Sepia (filter)",
        "matcher": "Sepia",
        "allowParamToValue": true,
        "styles": {
            "filter": "sepia($0)"
        }
    },
    /**
    ==================================================================
    FLEX RELATED PROPS
    ==================================================================
    */
    // flex shorthand
    {
        "type": "pattern",
        "name": "Flex",
        "matcher": "Flx",
        "allowParamToValue": false,
        "styles": {
            "flex": "$0"
        },
        "arguments": [{
            "a": "auto",
            "n": "none"
        }]
    },
    // flex-grow
    {
        "type": "pattern",
        "name": "Flex grow",
        "matcher": "Flxg",
        "allowParamToValue": true,
        "styles": {
            "flex-grow": "$0"
        }
    },
    // flex-shrink
    {
        "type": "pattern",
        "name": "Flex",
        "matcher": "Flxs",
        "allowParamToValue": true,
        "styles": {
            "flex-shrink": "$0"
        }
    },
    // flex-basis
    {
        "type": "pattern",
        "name": "Flex",
        "matcher": "Flxb",
        "allowParamToValue": true,
        "styles": {
            "flex-basis": "$0"
        },
        "arguments": [{
            "a": "auto",
            "n": "none"
        }]
    },
    // align-self (previously flex-align)
    // Previous version: http://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-align
    // Latest version: http://www.w3.org/TR/css3-flexbox/#align-items-property
    {
        "type": "pattern",
        "name": "Align self",
        "matcher": "As",
        "allowParamToValue": false,
        "styles": {
            "align-self": "$0"
        },
        "arguments": [{
            "a": "auto",
            "fs": "flex-start",
            "fe": "flex-end",
            "c": "center",
            "b": "baseline",
            "st": "stretch"
        }]
    },
    // flex-direction
    {
        "type": "pattern",
        "name": "Flex direction",
        "matcher": "Fld",
        "allowParamToValue": false,
        "styles": {
            "flex-direction": "$0"
        },
        "arguments": [{
            "r": "row",
            "rr": "row-reverse",
            "c": "column",
            "cr": "column-reverse"
        }]
    },
    // flex-flow
    {
        "type": "pattern",
        "name": "Flex flow",
        "matcher": "Flf",
        "allowParamToValue": false,
        "styles": {
            "flex-flow": "$0"
        },
        "arguments": [{
            "r": "row",
            "rr": "row-reverse",
            "c": "column",
            "cr": "column-reverse",
            "nw": "nowrap",
            "w": "wrap",
            "wr": "wrap-reverse"
        }]
    },
    // align-items (previously flex-item-align)
    // Previous version: http://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-align
    // Latest version: http://www.w3.org/TR/css3-flexbox/#align-items-property
    {
        "type": "pattern",
        "name": "Align items",
        "matcher": "Ai",
        "allowParamToValue": false,
        "styles": {
            "align-items": "$0"
        },
        "arguments": [{
            "fs": "flex-start",
            "fe": "flex-end",
            "c": "center",
            "b": "baseline",
            "st": "stretch"
        }]
    },
    // align-content (previously flex-line-pack)
    // Source: http://msdn.microsoft.com/en-us/library/ie/jj127302%28v=vs.85%29.aspx
    // Previous version: http://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-line-pack
    // Latest version: http://www.w3.org/TR/css3-flexbox/#align-content-property
    {
        "type": "pattern",
        "name": "Align content",
        "matcher": "Ac",
        "allowParamToValue": false,
        "styles": {
            "align-content": "$0"
        },
        "arguments": [{
            "fs": "flex-start",
            "fe": "flex-end",
            "c": "center",
            "sb": "space-between",
            "sa": "space-around",
            "st": "stretch"
        }]
    },
    // order (previously flex-order)
    // Previous version: http://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-order
    // Latest version: http://www.w3.org/TR/css3-flexbox/#order-property
    {
        "type": "pattern",
        "name": "Order",
        "matcher": "Or",
        "allowParamToValue": true,
        "styles": {
            "order": "$0"
        }
    },
    // justify-content (previously flex-pack)
    // Previous version: http://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-pack
    // Latest version: http://www.w3.org/TR/css3-flexbox/#justify-content-property
    {
        "type": "pattern",
        "name": "Justify content",
        "matcher": "Jc",
        "allowParamToValue": false,
        "styles": {
            "justify-content": "$0"
        },
        "arguments": [{
            "fs": "flex-start",
            "fe": "flex-end",
            "c": "center",
            "sb": "space-between",
            "sa": "space-around"
        }]
    },
    // flex-wrap
    {
        "type": "pattern",
        "name": "Flex-wrap",
        "matcher": "Flw",
        "allowParamToValue": false,
        "styles": {
            "flex-wrap": "$0"
        },
        "arguments": [{
            "nw": "nowrap",
            "w": "wrap",
            "wr": "wrap-reverse"
        }]
    },
    /**
    ==================================================================
    FLOAT
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Float",
        "allowParamToValue": false,
        "matcher": "Fl",
        "styles": {
            "float": "$0"
        },
        "arguments": [{
            "n": "none",
            "start": "__START__",
            "end": "__END__"
        }]
    },
    /**
    ==================================================================
    FONT FAMILY param matches generic font-family
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Font family",
        "matcher": "Ff",
        "allowParamToValue": false,
        "styles": {
            "font-family": "$0"
        },
        "arguments": [{
            "c": "\"Monotype Corsiva\", \"Comic Sans MS\", cursive",
            "f": "Capitals, Impact, fantasy",
            "m": "Monaco, \"Courier New\", monospace",
            "s": "Georgia, \"Times New Roman\", serif",
            "ss": "Helvetica, Arial, sans-serif"
        }]
    },
    /**
    ==================================================================
    FONT-WEIGHT
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Font weight",
        "matcher": "Fw",
        "allowParamToValue": false,
        "styles": {
            "font-weight": "$0"
        },
        "arguments": [{
            "100": "100",
            "200": "200",
            "300": "300",
            "400": "400",
            "500": "500",
            "600": "600",
            "700": "700",
            "800": "800",
            "900": "900",
            "b": "bold",
            "br": "bolder",
            "lr": "lighter",
            "n": "normal"
        }]
    },
    /**
    ==================================================================
    FONT-SIZE
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Font size",
        "matcher": "Fz",
        "allowParamToValue": true,
        "styles": {
            "font-size": "$0"
        }
    },
    /**
     ==================================================================
     FONT-STYLE
     ==================================================================
     */
    {
        "type": "pattern",
        "name": "Font style",
        "matcher": "Fs",
        "allowParamToValue": false,
        "styles": {
            "font-style": "$0"
        },
        "arguments": [{
            "n": "normal",
            "i": "italic",
            "o": "oblique"
        }]
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
        "type": "pattern",
        "name": "Font variant",
        "matcher": "Fv",
        "allowParamToValue": false,
        "styles": {
            "font-variant": "$0"
        },
        "arguments": [{
            "n": "normal",
            "sc": "small-caps"
        }]
    },
    /**
    ==================================================================
    HEIGHT
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Height",
        "matcher": "H",
        "allowParamToValue": true,
        "styles": {
            "height": "$0"
        },
        "arguments": [{
            "0": "0",
            "a": "auto",
            "av": "available",
            "bb": "border-box",
            "cb": "content-box",
            "fc": "fit-content",
            "maxc": "max-content",
            "minc": "min-content"
        }]
    },
    /**
    ==================================================================
    HYPHENS
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Hyphens",
        "matcher": "Hy",
        "allowParamToValue": false,
        "styles": {
            "hyphens": "$0"
        },
        "arguments": [{
            "a": "auto",
            "n": "normal",
            "m": "manual"
        }]
    },
    /**
    ==================================================================
    LETTER-SPACING
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Letter spacing",
        "matcher": "Lts",
        "allowParamToValue": true,
        "styles": {
            "letter-spacing": "$0"
        },
        "arguments": [{
            "n": "normal"
        }]
    },
    /**
    ==================================================================
    LIST-STYLE-TYPE
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "List style type",
        "matcher": "List",
        "allowParamToValue": false,
        "styles": {
            "list-style-type": "$0"
        },
        "arguments": [{
            "n": "none",
            "d": "disc",
            "c": "circle",
            "s": "square",
            "dc": "decimal",
            "dclz": "decimal-leading-zero",
            "lr": "lower-roman",
            "lg": "lower-greek",
            "ll": "lower-latin",
            "ur": "upper-roman",
            "ul": "upper-latin",
            "a": "armenian",
            "g": "georgian",
            "la": "lower-alpha",
            "ua": "upper-alpha"
        }]
    },
    /**
    ==================================================================
    LIST-STYLE-POSITION
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "List style position",
        "matcher": "Lisp",
        "allowParamToValue": false,
        "styles": {
            "list-style-position": "$0"
        },
        "arguments": [{
            "i": "inside",
            "o": "outside"
        }]
    },
    /**
    ==================================================================
    LIST-STYLE-IMAGE
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "List style image",
        "matcher": "Lisi",
        "allowParamToValue": false,
        "styles": {
            "list-style-image": "$0"
        },
        "arguments": [{
            "n": "none"
        }]
    },
    /**
    ==================================================================
    LINE-HEIGHT
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Line height",
        "matcher": "Lh",
        "allowParamToValue": true,
        "styles": {
            "line-height": "$0"
        },
        "arguments": [{
            "n": "normal"
        }]
    },
    /**
    ==================================================================
    MARGINS
    ==================================================================
    */
    // all edges
    {
        "type": "pattern",
        "name": "Margin (all edges)",
        "matcher": "M",
        "allowParamToValue": true,
        "styles": {
            "margin": "$0"
        },
        "arguments": [{
            "0": "0",
            "a": "auto"
        }]
    },
    // X axis
    {
        "type": "pattern",
        "name": "Margin (X axis)",
        "matcher": "Mx",
        "allowParamToValue": true,
        "styles": {
            "margin-__START__": "$0",
            "margin-__END__": "$0"
        },
        "arguments": [{
            "0": "0",
            "a": "auto",
        }]
    },
    // Y axis
    {
        "type": "pattern",
        "name": "Margin (Y axis)",
        "matcher": "My",
        "allowParamToValue": true,
        "styles": {
            "margin-top": "$0",
            "margin-bottom": "$0"
        },
        "arguments": [{
            "0": "0",
            "a": "auto"
        }]
    },
    // top
    {
        "type": "pattern",
        "name": "Margin top",
        "matcher": "Mt",
        "allowParamToValue": true,
        "styles": {
            "margin-top": "$0"
        },
        "arguments": [{
            "0": "0",
            "a": "auto"
        }]
    },
    // end
    {
        "type": "pattern",
        "name": "Margin end",
        "matcher": "Mend",
        "allowParamToValue": true,
        "styles": {
            "margin-__END__": "$0"
        },
        "arguments": [{
            "0": "0",
            "a": "auto"
        }]
    },
    // bottom
    {
        "type": "pattern",
        "name": "Margin bottom",
        "matcher": "Mb",
        "allowParamToValue": true,
        "styles": {
            "margin-bottom": "$0"
        },
        "arguments": [{
            "0": "0",
            "a": "auto"
        }]
    },
    // start
    {
        "type": "pattern",
        "name": "Margin start",
        "matcher": "Mstart",
        "allowParamToValue": true,
        "styles": {
            "margin-__START__": "$0"
        },
        "arguments": [{
            "0": "0",
            "a": "auto"
        }]
    },
    /**
    ==================================================================
    MAX-HEIGHT
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Max height",
        "matcher": "Mah",
        "allowParamToValue": true,
        "styles": {
            "max-height": "$0"
        },
        "arguments": [{
            "a": "auto",
            "maxc": "max-content",
            "minc": "min-content",
            "fa": "fill-available",
            "fc": "fit-content"
        }]
    },
    /**
    ==================================================================
    MAX-WIDTH
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Max width",
        "matcher": "Maw",
        "allowParamToValue": true,
        "styles": {
            "max-width": "$0"
        },
        "arguments": [{
            "a": "auto",
            "fa": "fill-available",
            "fc": "fit-content",
            "maxc": "max-content",
            "minc": "min-content"
        }]
    },
    /**
    ==================================================================
    MIN-HEIGHT
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Min height",
        "matcher": "Mih",
        "allowParamToValue": true,
        "styles": {
            "min-height": "$0"
        },
        "arguments": [{
            "a": "auto",
            "fa": "fill-available",
            "fc": "fit-content",
            "maxc": "max-content",
            "minc": "min-content"
        }]
    },
    /**
    ==================================================================
    MIN-WIDTH
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Min width",
        "matcher": "Miw",
        "allowParamToValue": true,
        "styles": {
            "min-width": "$0"
        },
        "arguments": [{
            "a": "auto",
            "fa": "fill-available",
            "fc": "fit-content",
            "maxc": "max-content",
            "minc": "min-content"
        }]
    },
    /**
    ==================================================================
    OUTLINE
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Outline",
        "matcher": "O",
        "allowParamToValue": false,
        "styles": {
            "outline": "$0"
        },
        "arguments": [{
            "0": "0",
            "n": "none"
        }]
    },
    /**
    ==================================================================
    OFFSETS
    ==================================================================
    */
    // top
    {
        "type": "pattern",
        "name": "Top",
        "matcher": "T",
        "allowParamToValue": true,
        "styles": {
            "top": "$0"
        },
        "arguments": [{
            "a": "auto"
        }]
    },
    // end
    {
        "type": "pattern",
        "name": "End",
        "matcher": "End",
        "allowParamToValue": true,
        "styles": {
            "__END__": "$0"
        },
        "arguments": [{
            "a": "auto"
        }]
    },
    // bottom
    {
        "type": "pattern",
        "name": "Bottom",
        "matcher": "B",
        "allowParamToValue": true,
        "styles": {
            "bottom": "$0"
        },
        "arguments": [{
            "a": "auto"
        }]
    },
    // start
    {
        "type": "pattern",
        "name": "Start",
        "matcher": "Start",
        "allowParamToValue": true,
        "styles": {
            "__START__": "$0"
        },
        "arguments": [{
            "a": "auto"
        }]
    },
    /**
    ==================================================================
    OPACITY
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Opacity",
        "matcher": "Op",
        "allowParamToValue": true,
        "styles": {
            "opacity": "$0"
        },
        "arguments": [{
            "0": "0",
            "1": "1"
        }]
    },
    /**
    ==================================================================
    OVERFLOW
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Overflow",
        "matcher": "Ov",
        "allowParamToValue": false,
        "styles": {
            "overflow": "$0"
        },
        "arguments": [{
            "a": "auto",
            "h": "hidden",
            "s": "scroll",
            "v": "visible"
        }]
    },
    /**
    ==================================================================
    OVERFLOW-X
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Overflow (X axis)",
        "matcher": "Ovx",
        "allowParamToValue": false,
        "styles": {
            "overflow-x": "$0"
        },
        "arguments": [{
            "a": "auto",
            "h": "hidden",
            "s": "scroll",
            "v": "visible"
        }]
    },
    /**
    ==================================================================
    OVERFLOW-Y
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Overflow (Y axis)",
        "matcher": "Ovy",
        "allowParamToValue": false,
        "styles": {
            "overflow-y": "$0"
        },
        "arguments": [{
            "a": "auto",
            "h": "hidden",
            "s": "scroll",
            "v": "visible"
        }]
    },
    /**
    ==================================================================
    OVERFLOW-SCROLLING (-webkit-)
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Overflow scrolling",
        "matcher": "Ovs",
        "allowParamToValue": false,
        "styles": {
            "-webkit-overflow-scrolling": "$0"
        },
        "arguments": [{
            "a": "auto",
            "touch": "touch"
        }]
    },
    /**
    ==================================================================
    PADDING
    ==================================================================
    */
    // all edges
    {
        "type": "pattern",
        "name": "Padding (all edges)",
        "matcher": "P",
        "allowParamToValue": true,
        "styles": {
            "padding": "$0"
        }
    },
    // X axis
    {
        "type": "pattern",
        "name": "Padding (X axis)",
        "matcher": "Px",
        "allowParamToValue": true,
        "styles": {
            "padding-__START__": "$0",
            "padding-__END__": "$0"
        }
    },
    // Y axis
    {
        "type": "pattern",
        "name": "Padding (Y axis)",
        "matcher": "Py",
        "allowParamToValue": true,
        "styles": {
            "padding-top": "$0",
            "padding-bottom": "$0"
        }
    },
    // top
    {
        "type": "pattern",
        "name": "Padding top",
        "matcher": "Pt",
        "allowParamToValue": true,
        "styles": {
            "padding-top": "$0"
        }
    },
    // end
    {
        "type": "pattern",
        "name": "Padding end",
        "matcher": "Pend",
        "allowParamToValue": true,
        "styles": {
            "padding-__END__": "$0"
        }
    },
    // bottom
    {
        "type": "pattern",
        "name": "Padding bottom",
        "matcher": "Pb",
        "allowParamToValue": true,
        "styles": {
            "padding-bottom": "$0"
        }
    },
    // start
    {
        "type": "pattern",
        "name": "Padding start",
        "matcher": "Pstart",
        "allowParamToValue": true,
        "styles": {
            "padding-__START__": "$0"
        }
    },
    /**
    ==================================================================
    POINTER-EVENTS
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Pointer events",
        "matcher": "Pe",
        "allowParamToValue": false,
        "styles": {
            "pointer-events": "$0"
        },
        "arguments": [{
            "a": "auto",
            "all": "all",
            "f": "fill",
            "n": "none",
            "p": "painted",
            "s": "stroke",
            "v": "visible",
            "vf": "visibleFill",
            "vp": "visiblePainted",
            "vs": "visibleStroke"
        }]
    },
    /**
    ==================================================================
    POSITION
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Position",
        "matcher": "Pos",
        "allowParamToValue": false,
        "styles": {
            "position": "$0"
        },
        "arguments": [{
            "a": "absolute",
            "f": "fixed",
            "r": "relative",
            "s": "static",
            "st": "sticky"
        }]
    },
    /**
    ==================================================================
    TABLE-LAYOUT (checked)
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Table layout",
        "matcher": "Tbl",
        "allowParamToValue": false,
        "styles": {
            "table-layout": "$0"
        },
        "arguments": [{
            "a": "auto",
            "f": "fixed"
        }]
    },
    /**
    ==================================================================
    TEXT-ALIGN
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Text align",
        "matcher": "Ta",
        "allowParamToValue": false,
        "styles": {
            "text-align": "$0"
        },
        "arguments": [{
            "c": "center",
            "e": "end",
            "end": "__END__",
            "j": "justify",
            "mp": "match-parent",
            "s": "start",
            "start": "__START__"
        }]
    },
    /**
    ==================================================================
    TEXT-ALIGN-LAST
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Text align last",
        "matcher": "Tal",
        "allowParamToValue": false,
        "styles": {
            "text-align-last": "$0"
        },
        "arguments": [{
            "a": "auto",
            "c": "center",
            "e": "end",
            "end": "__END__",
            "j": "justify",
            "s": "start",
            "start": "__START__"
        }]
    },
    /**
    ==================================================================
    TEXT-DECORATION
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Text decoration",
        "matcher": "Td",
        "allowParamToValue": false,
        "styles": {
            "text-decoration": "$0"
        },
        "arguments": [{
            "lt": "line-through",
            "n": "none",
            "o": "overline",
            "u": "underline"
        }]
    },
    /**
    ==================================================================
    TEXT-INDENT
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Text indent",
        "matcher": "Ti",
        "allowParamToValue": true,
        "styles": {
            "text-indent": "$0"
        }
    },
    /**
    ==================================================================
    TEXT-OVERFLOW
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Text overflow",
        "matcher": "Tov",
        "allowParamToValue": false,
        "styles": {
            "text-overflow": "$0"
        },
        "arguments": [{
            "c": "clip",
            "e": "ellipsis"
        }]
    },
    /**
    ==================================================================
    TEXT-RENDERING
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Text rendering",
        "matcher": "Tren",
        "allowParamToValue": false,
        "styles": {
            "text-rendering": "$0"
        },
        "arguments": [{
            "a": "auto",
            "os": "optimizeSpeed",
            "ol": "optimizeLegibility",
            "gp": "geometricPrecision"
        }]
    },
    /**
    ==================================================================
    TEXT-REPLACE
    http://www.w3.org/TR/2007/WD-css3-gcpm-20070504/
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Text replace",
        "matcher": "Tr",
        "allowParamToValue": false,
        "styles": {
            "text-replace": "$0"
        },
        "arguments": [{
            "n": "none"
        }]
    },
    /**
    ==================================================================
    TEXT-TRANSFORM
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Text transform",
        "matcher": "Tt",
        "allowParamToValue": false,
        "styles": {
            "text-transform": "$0"
        },
        "arguments": [{
            "n": "none",
            "c": "capitalize",
            "u": "uppercase",
            "l": "lowercase"
        }]
    },
    /**
    ==================================================================
    TEXT-SHADOW
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Text shadow",
        "matcher": "Tsh",
        "allowParamToValue": false,
        "styles": {
            "text-shadow": "$0"
        },
        "arguments": [{
            "n": "none"
        }]
    },
    /**
    ==================================================================
    TRANSFORM
    http://www.w3.org/TR/css3-3d-transforms/
    ==================================================================
    */
    // transform for custom
    {
        "type": "pattern",
        "name": "Transform",
        "matcher": "Trf",
        "allowParamToValue": false,
        "styles": {
            "transform": "$0"
        }
    },
    // transform-origin
    {
        "type": "pattern",
        "name": "Transform origin",
        "matcher": "Trfo",
        "allowParamToValue": true,
        "styles": {
            "transform-origin": "$0 $1"
        },
        "arguments": [{
            "t": "top",
            "end": "__END__",
            "bottom": "bottom",
            "start": "__START__",
            "c": "center"
        },{
            "t": "top",
            "end": "__END__",
            "bottom": "bottom",
            "start": "__START__",
            "c": "center"
        }]
    },
    // transform-style
    {
        "type": "pattern",
        "name": "Transform style",
        "matcher": "Trfs",
        "allowParamToValue": false,
        "styles": {
            "transform-style": "$0"
        },
        "arguments": [{
            "f": "flat",
            "p": "preserve-3d"
        }]
    },
    // perspective
    {
        "type": "pattern",
        "name": "Perspective",
        "matcher": "Prs",
        "allowParamToValue": true,
        "styles": {
            "perspective": "$0"
        },
        "arguments": [{
            "n": "none"
        }]
    },
    // perspective-origin
    {
        "type": "pattern",
        "name": "Perspective origin",
        "matcher": "Prso",
        "allowParamToValue": true,
        "styles": {
            "perspective-origin": "$0 $1"
        },
        "arguments": [{
            "t": "top",
            "end": "__END__",
            "bottom": "bottom",
            "start": "__START__",
            "c": "center"
        },{
            "t": "top",
            "end": "__END__",
            "bottom": "bottom",
            "start": "__START__",
            "c": "center"
        }]
    },
    // backface-visibility
    {
        "type": "pattern",
        "name": "Backface visibility",
        "matcher": "Bfv",
        "allowParamToValue": false,
        "styles": {
            "backface-visibility": "$0"
        },
        "arguments": [{
            "h": "hidden",
            "v": "visible"
        }]
    },
    // matrix
    {
        "type": "pattern",
        "name": "Matrix (transform)",
        "matcher": "Matrix",
        "allowParamToValue": false,
        "styles": {
            "transform": "matrix($0)"
        }
    },
    // matrix3d
    {
        "type": "pattern",
        "name": "Matrix 3d (transform)",
        "matcher": "Matrix3d",
        "allowParamToValue": false,
        "styles": {
            "transform": "matrix($0)"
        }
    },
    // rotate
    {
        "type": "pattern",
        "name": "Rotate (transform)",
        "matcher": "Rotate",
        "allowParamToValue": true,
        "styles": {
            "transform": "rotate($0)"
        }
    },
    // rotate3d
    {
        "type": "pattern",
        "name": "Rotate 3d (transform)",
        "matcher": "Rotate3d",
        "allowParamToValue": true,
        "styles": {
            "transform": "rotate3d($0,$1,$2,$3)"
        }
    },
    // rotateX
    {
        "type": "pattern",
        "name": "RotateX (transform)",
        "matcher": "RotateX",
        "allowParamToValue": true,
        "styles": {
            "transform": "rotateX($0)"
        }
    },
    // rotateY
    {
        "type": "pattern",
        "name": "RotateY (transform)",
        "matcher": "RotateY",
        "allowParamToValue": true,
        "styles": {
            "transform": "rotateY($0)"
        }
    },
    // rotateZ
    {
        "type": "pattern",
        "name": "RotateZ (transform)",
        "matcher": "RotateZ",
        "allowParamToValue": true,
        "styles": {
            "transform": "rotateZ($0)"
        }
    },
    // scale
    {
        "type": "pattern",
        "name": "Scale (transform)",
        "matcher": "Scale",
        "allowParamToValue": true,
        "styles": {
            "transform": "scale($0,$1)"
        }
    },
    // scale3d
    {
        "type": "pattern",
        "name": "Scale 3d (transform)",
        "matcher": "Scale3d",
        "allowParamToValue": true,
        "styles": {
            "transform": "scale3d($0,$1,$2)"
        }
    },
    // scaleX
    {
        "type": "pattern",
        "name": "ScaleX (transform)",
        "matcher": "ScaleX",
        "allowParamToValue": true,
        "styles": {
            "transform": "scaleX($0)"
        }
    },
    // scaleY
    {
        "type": "pattern",
        "name": "ScaleY (transform)",
        "matcher": "ScaleY",
        "allowParamToValue": true,
        "styles": {
            "transform": "scaleY($0)"
        }
    },
    // skew
    {
        "type": "pattern",
        "name": "Skew (transform)",
        "matcher": "Skew",
        "allowParamToValue": true,
        "styles": {
            "transform": "skew($0,$1)"
        }
    },
    // skewX
    {
        "type": "pattern",
        "name": "SkewX (transform)",
        "matcher": "SkewX",
        "allowParamToValue": true,
        "styles": {
            "transform": "skewX($0)"
        }
    },
    // skewY
    {
        "type": "pattern",
        "name": "SkewY (transform)",
        "matcher": "SkewY",
        "allowParamToValue": true,
        "styles": {
            "transform": "skewY($0)"
        }
    },
    // translate
    {
        "type": "pattern",
        "name": "Translate (transform)",
        "matcher": "Translate",
        "allowParamToValue": true,
        "styles": {
            "transform": "translate($0,$1)"
        }
    },
    // translate3d
    {
        "type": "pattern",
        "name": "Translate 3d (transform)",
        "matcher": "Translate3d",
        "allowParamToValue": true,
        "styles": {
            "transform": "translate3d($0,$1,$2)"
        }
    },
    // translateX
    {
        "type": "pattern",
        "name": "Translate X (transform)",
        "matcher": "TranslateX",
        "allowParamToValue": true,
        "styles": {
            "transform": "translateX($0)"
        }
    },
    // translateY
    {
        "type": "pattern",
        "name": "Translate Y (transform)",
        "matcher": "TranslateY",
        "allowParamToValue": true,
        "styles": {
            "transform": "translateY($0)"
        }
    },
    // translateZ
    {
        "type": "pattern",
        "name": "Translate Z (transform)",
        "matcher": "TranslateZ",
        "allowParamToValue": true,
        "styles": {
            "transform": "translateZ($0)"
        }
    },
    /**
    ==================================================================
    TRANSITION
    ==================================================================
    */
    // transition shorthand
    {
        "type": "pattern",
        "name": "Transition",
        "matcher": "Trs",
        "allowParamToValue": false,
        "styles": {
            "transition": "$0"
        }
    },
    // transition-delay
    {
        "type": "pattern",
        "name": "Transition delay",
        "matcher": "Trsde",
        "allowParamToValue": true,
        "styles": {
            "transition-delay": "$0"
        },
        "arguments": [{
            "i": "initial"
        }]
    },
    // transition-duration
    {
        "type": "pattern",
        "name": "Transition duration",
        "matcher": "Trsdu",
        "allowParamToValue": true,
        "styles": {
            "transition-duration": "$0"
        }
    },
    // transition-property
    {
        "type": "pattern",
        "name": "Transition property",
        "matcher": "Trsp",
        "allowParamToValue": true,
        "styles": {
            "transition-property": "$0"
        },
        "arguments": [{
            "a": "all"
        }]
    },
    // transition-timing-function
    {
        "type": "pattern",
        "name": "Transition timing function",
        "matcher": "Trstf",
        "allowParamToValue": false,
        "styles": {
            "transition-timing-function": "$0"
        },
        "arguments": [{
            "e": "ease",
            "ei": "ease-in",
            "eo": "ease-out",
            "eio": "ease-in-out",
            "l": "linear",
            "ss": "step-start",
            "se": "step-end"
        }]
    },
    /**
    ==================================================================
    USER-SELECT
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "User select",
        "matcher": "Us",
        "allowParamToValue": false,
        "styles": {
            "user-select": "$0"
        },
        "arguments": [{
            "a": "all",
            "el": "element",
            "els": "elements",
            "n": "none",
            "t": "text",
            "to": "toggle"
        }]
    },
    /**
    ==================================================================
    VERTICAL-ALIGN
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Vertical align",
        "matcher": "Va",
        "allowParamToValue": false,
        "styles": {
            "vertical-align": "$0"
        },
        "arguments": [{
            "b": "bottom",
            "bl": "baseline",
            "m": "middle",
            "sub": "sub",
            "sup": "super",
            "t": "top",
            "tb": "text-bottom",
            "tt": "text-top"
        }]
    },
    /**
    ==================================================================
    VISIBILITY
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Visibility",
        "matcher": "V",
        "allowParamToValue": false,
        "styles": {
            "visibility": "$0"
        },
        "arguments": [{
            "v": "visible",
            "h": "hidden",
            "c": "collapse"
        }]
    },
    /**
    ==================================================================
    WHITE-SPACE
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "White space",
        "matcher": "Whs",
        "allowParamToValue": false,
        "styles": {
            "white-space": "$0"
        },
        "arguments": [{
            "n": "normal",
            "p": "pre",
            "nw": "nowrap",
            "pw": "pre-wrap",
            "pl": "pre-line"
        }]
    },
    /**
    ==================================================================
    WHITE-SPACE-COLLAPSE
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "White space collapse",
        "matcher": "Whsc",
        "allowParamToValue": false,
        "styles": {
            "white-space-collapse": "$0"
        },
        "arguments": [{
            "n": "normal",
            "ka": "keep-all",
            "l": "loose",
            "bs": "break-strict",
            "ba": "break-all"
        }]
    },
    /**
    ==================================================================
    WIDTH
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Width",
        "matcher": "W",
        "allowParamToValue": true,
        "styles": {
            "width": "$0"
        },
        "arguments": [{
            "0": "0",
            "a": "auto",
            "bb": "border-box",
            "cb": "content-box",
            "av": "available",
            "minc": "min-content",
            "maxc": "max-content",
            "fc": "fit-content"
        }]
    },
    /**
    ==================================================================
    WORD-BREAK
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Word break",
        "matcher": "Wob",
        "allowParamToValue": false,
        "styles": {
            "word-break": "$0"
        },
        "arguments": [{
            "ba": "break-all",
            "ka": "keep-all",
            "n": "normal"
        }]
    },
    /**
    ==================================================================
    WORD-WRAP (not part of the spec)
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Word wrap",
        "matcher": "Wow",
        "allowParamToValue": false,
        "styles": {
            "word-wrap": "$0"
        },
        "arguments": [{
            "bw": "break-word",
            "n": "normal"
        }]
    },
    /**
    ==================================================================
    Z-INDEX
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Z index",
        "matcher": "Z",
        "allowParamToValue": true,
        "styles": {
            "z-index": "$0"
        },
        "arguments": [{
            "a": "auto"
        }]
    },
    /**
    ==================================================================
    SVG
    ==================================================================
    */
    {
        "type": "pattern",
        "name": "Fill (SVG)",
        "matcher": "Fill",
        "allowParamToValue": false,
        "styles": {
            "fill": "$0"
        },
        "arguments": [colors]
    },
    {
        "type": "pattern",
        "name": "Stroke (SVG)",
        "matcher": "Stk",
        "allowParamToValue": false,
        "styles": {
            "stroke": "$0"
        },
        "arguments": [colors]
    },
    {
        "type": "pattern",
        "name": "Stroke width (SVG)",
        "matcher": "Stkw",
        "allowParamToValue": true,
        "styles": {
            "stroke-width": "$0"
        },
        "arguments": [{
            "i": "inherit"
        }]
    },
    {
        "type": "pattern",
        "name": "Stroke linecap (SVG)",
        "matcher": "Stklc",
        "allowParamToValue": false,
        "styles": {
            "stroke-linecap": "$0"
        },
        "arguments": [{
            "i": "inherit",
            "b": "butt",
            "r": "round",
            "s": "square"
        }]
    },
    {
        "type": "pattern",
        "name": "Stroke linejoin (SVG)",
        "matcher": "Stklj",
        "allowParamToValue": false,
        "styles": {
            "stroke-linejoin": "$0"
        },
        "arguments": [{
            "i": "inherit",
            "b": "bevel",
            "r": "round",
            "m": "miter"
        }]
    }
];
