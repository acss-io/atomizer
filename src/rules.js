/**
 * These are the main atomic css rules.
 * By default, all rules accept "inh" ("inherit").
 * Please submit a PR if you find any missing rule.
 * Most abbreviations are based on Emmet:
 * http://docs.emmet.io/cheat-sheet/
 *
 * Read more about abbreviations here:
 * http://acss.io/guides/syntax.html
 */

module.exports = [
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
    {
        "type": "pattern",
        "name": "Border",
        "matcher": "Bd",
        "allowParamToValue": false,
        "styles": {
            "border": "$0"
        }
    },
    {
        "type": "pattern",
        "name": "Border top",
        "matcher": "Bdt",
        "allowParamToValue": false,
        "styles": {
            "border-top": "$0"
        }
    },
    {
        "type": "pattern",
        "name": "Border end",
        "matcher": "Bdend",
        "allowParamToValue": false,
        "styles": {
            "border-__END__": "$0"
        }
    },
    {
        "type": "pattern",
        "name": "Border bottom",
        "matcher": "Bdb",
        "allowParamToValue": false,
        "styles": {
            "border-bottom": "$0"
        }
    },
    {
        "type": "pattern",
        "name": "Border start",
        "matcher": "Bdstart",
        "allowParamToValue": false,
        "styles": {
            "border-__START__": "$0"
        }
    },
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
    {
        "type": "pattern",
        "name": "Border color",
        "matcher": "Bdc",
        "allowParamToValue": true,
        "styles": {
            "border-color": "$0"
        },
        "arguments": [{
            "t": "transparent",
            "cc": "currentColor"
        }]
    },
    {
        "type": "pattern",
        "name": "Border top color",
        "matcher": "Bdtc",
        "allowParamToValue": true,
        "styles": {
            "border-top-color": "$0"
        },
        "arguments": [{
            "t": "transparent",
            "cc": "currentColor"
        }]
    },
    {
        "type": "pattern",
        "name": "Border end color",
        "matcher": "Bdendc",
        "allowParamToValue": true,
        "styles": {
            "border-__END__-color": "$0"
        },
        "arguments": [{
            "t": "transparent",
            "cc": "currentColor"
        }]
    },
    {
        "type": "pattern",
        "name": "Border bottom color",
        "matcher": "Bdbc",
        "allowParamToValue": true,
        "styles": {
            "border-bottom-color": "$0"
        },
        "arguments": [{
            "t": "transparent",
            "cc": "currentColor"
        }]
    },
    {
        "type": "pattern",
        "name": "Border start color",
        "matcher": "Bdstartc",
        "allowParamToValue": true,
        "styles": {
            "border-__START__-color": "$0"
        },
        "arguments": [{
            "t": "transparent",
            "cc": "currentColor"
        }]
    },
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
    {
        "type": "pattern",
        "name": "Border radius",
        "matcher": "Bdrs",
        "allowParamToValue": true,
        "styles": {
            "border-radius": "$0"
        }
    },
    {
        "type": "pattern",
        "name": "Border radius top right",
        "matcher": "Bdrstend",
        "allowParamToValue": true,
        "styles": {
            "border-top-__END__-radius": "$0"
        }
    },
    {
        "type": "pattern",
        "name": "Border radius bottom right",
        "matcher": "Bdrsbend",
        "allowParamToValue": true,
        "styles": {
            "border-bottom-__END__-radius": "$0"
        }
    },
    {
        "type": "pattern",
        "name": "Border radius bottom left",
        "matcher": "Bdrsbstart",
        "allowParamToValue": true,
        "styles": {
            "border-bottom-__START__-radius": "$0"
        }
    },
    {
        "type": "pattern",
        "name": "Border radius top left",
        "matcher": "Bdrststart",
        "allowParamToValue": true,
        "styles": {
            "border-top-__START__-radius": "$0"
        }
    },
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
    {
        "type": "pattern",
        "name": "Background color",
        "matcher": "Bgc",
        "allowParamToValue": true,
        "styles": {
            "background-color": "$0"
        },
        "arguments": [{
            "t": "transparent"
        }]
    },
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
    {
        "type": "pattern",
        "name": "Background size",
        "matcher": "Bgz",
        "allowParamToValue": false,
        "styles": {
            "background-size": "$0"
        },
        "arguments": [{
            "a": "auto",
            "ct": "contain",
            "cv": "cover"
        }]
    },
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
    {
        "type": "pattern",
        "name": "Background position",
        "matcher": "Bgp",
        "allowParamToValue": false,
        "styles": {
            "background-position": "$0"
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
    {
        "type": "pattern",
        "name": "Color",
        "matcher": "C",
        "allowParamToValue": true,
        "styles": {
            "color": "$0"
        },
        "arguments": [{
            "t": "transparent",
            "cc": "currentColor"
        }]
    },
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
    {
        "type": "pattern",
        "name": "Flex grow",
        "matcher": "Flxg",
        "allowParamToValue": true,
        "styles": {
            "flex-grow": "$0"
        }
    },
    {
        "type": "pattern",
        "name": "Flex",
        "matcher": "Flxs",
        "allowParamToValue": true,
        "styles": {
            "flex-shrink": "$0"
        }
    },
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
    {
        "type": "pattern",
        "name": "Order",
        "matcher": "Or",
        "allowParamToValue": true,
        "styles": {
            "order": "$0"
        }
    },
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
    {
        "type": "pattern",
        "name": "Padding (all edges)",
        "matcher": "P",
        "allowParamToValue": true,
        "styles": {
            "padding": "$0"
        }
    },
    {
        "type": "pattern",
        "name": "Padding top",
        "matcher": "Pt",
        "allowParamToValue": true,
        "styles": {
            "padding-top": "$0"
        }
    },
    {
        "type": "pattern",
        "name": "Padding end",
        "matcher": "Pend",
        "allowParamToValue": true,
        "styles": {
            "padding-__END__": "$0"
        }
    },
    {
        "type": "pattern",
        "name": "Padding bottom",
        "matcher": "Pb",
        "allowParamToValue": true,
        "styles": {
            "padding-bottom": "$0"
        }
    },
    {
        "type": "pattern",
        "name": "Padding start",
        "matcher": "Pstart",
        "allowParamToValue": true,
        "styles": {
            "padding-__START__": "$0"
        }
    },
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
    {
        "type": "pattern",
        "name": "Text indent",
        "matcher": "Ti",
        "allowParamToValue": true,
        "styles": {
            "text-indent": "$0"
        }
    },
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
    {
        "type": "pattern",
        "id": "transform",
        "name": "Transform",
        "matcher": "Trf",
        "allowParamToValue": false,
        "styles": {
            "transform": "$0"
        }
    },
    {
        "type": "pattern",
        "name": "Transition",
        "matcher": "Trs",
        "allowParamToValue": false,
        "styles": {
            "transition": "$0"
        }
    },
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
    {
        "type": "pattern",
        "name": "Transition duration",
        "matcher": "Trsdu",
        "allowParamToValue": true,
        "styles": {
            "transition-duration": "$0"
        }
    },
    {
        "type": "pattern",
        "name": "Transition property",
        "matcher": "Trsp",
        "allowParamToValue": false,
        "styles": {
            "transition-property": "$0"
        },
        "arguments": [{
            "a": "all"
        }]
    },
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
    }
];
