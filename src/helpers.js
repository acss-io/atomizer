/**
 * ----------------------------------------------------
 * Copyright (c) 2015, Yahoo Inc. All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 * ----------------------------------------------------
 *
 * These are helper classes in Atomic.
 * These classes are tailored to help with common styling patterns in CSS.
 * You can either use the helpers offered by Atomic or create your own
 * set of helper classes.
 *
 * Read more about helper classes here:
 * http://acss.io/guides/helper-classes.html
 **/

module.exports = [
    /**
    ==================================================================
    Borders
    1px solid borders
    ==================================================================
    */
    // all edges
    {
        "type": "helper",
        "name": "Border",
        "matcher": "Bd",
        "noParams": true,
        "styles": {
            "border-width": "1px",
            "border-style": "solid"
        }
    },
    // X axis
    {
        "type": "helper",
        "name": "Border X 1px solid",
        "matcher": "BdX",
        "noParams": true,
        "styles": {
            "border-top-width": 0,
            "border-right-width": "1px",
            "border-bottom-width": 0,
            "border-left-width": "1px",
            "border-style": "solid"
        }
    },
    // Y axis
    {
        "type": "helper",
        "name": "Border Y 1px solid",
        "matcher": "BdY",
        "noParams": true,
        "styles": {
            "border-top-width": "1px",
            "border-right-width": 0,
            "border-bottom-width": "1px",
            "border-left-width": 0,
            "border-style": "solid"

        }
    },
    // top
    {
        "type": "helper",
        "name": "Border Top 1px solid",
        "matcher": "BdT",
        "noParams": true,
        "styles": {
            "border-top-width": "1px",
            "border-right-width": 0,
            "border-bottom-width": 0,
            "border-left-width": 0,
            "border-style": "solid"
        }
    },
    // end
    {
        "type": "helper",
        "name": "Border End 1px solid",
        "matcher": "BdEnd",
        "noParams": true,
        "styles": {
            "border-top-width": 0,
            "border-__END__-width": "1px",
            "border-bottom-width": 0,
            "border-__START__-width": 0,
            "border-style": "solid"
        }
    },
    // bottom
    {
        "type": "helper",
        "name": "Border Bottom 1px solid",
        "matcher": "BdB",
        "noParams": true,
        "styles": {
            "border-top-width": 0,
            "border-right-width": 0,
            "border-bottom-width": "1px",
            "border-left-width": 0,
            "border-style": "solid"
        }
    },
    // start
    {
        "type": "helper",
        "name": "Border Start 1px solid",
        "matcher": "BdStart",
        "noParams": true,
        "styles": {
            "border-top-width": 0,
            "border-__END__-width": 0,
            "border-bottom-width": 0,
            "border-__START__-width": "1px",
            "border-style": "solid"
        }
    },
    /**
    ==================================================================
    BfcHack
    1. this is a hack, it does not make the box grow up to 1600px, just enough
       to fill the container.
    ==================================================================
    */
    {
        "type": "helper",
        "name": "BfcHack",
        "matcher": "BfcHack",
        "noParams": true,
        "styles": {
            "display": "table-cell",
            "width": "1600px", /* 1 */
            "*width": "auto",
            "zoom": 1
        }
    },
    /**
    ==================================================================
    Clearfix
    ==================================================================
    */
    {
        "type": "helper",
        "name": "Clearfix",
        "matcher": "Cf",
        "noParams": true,
        "styles": {
            "zoom": 1
        },
        "rules": {
            ".Cf:before, .Cf:after": {
                "content": "\" \"",
                "display": "table"
            },
            ".Cf:after": {
                "clear": "both"
            }
        }
    },
    /**
    ==================================================================
    Ellipsis
    Single line with ellipsis (see also LineClamp below)
    ==================================================================
    */
    {
        "type": "helper",
        "name": "Ellipsis",
        "matcher": "Ell",
        "noParams": true,
        "styles": {
            "max-width": "100%",
            "white-space": "nowrap",
            "overflow": "hidden",
            "text-overflow": "ellipsis",
            "hyphens": "none"
        },
        "rules": {
            ".Ell:after": {
                "content": "\".\"",
                "font-size": 0,
                "visibility": "hidden",
                "display": "inline-block",
                "overflow": "hidden",
                "height": 0,
                "width": 0
            }
        }
    },
    /**
    ==================================================================
    Hidden
    Hides content from sighted users (accessible to SR users)
    ==================================================================
    */
    {
        "type": "helper",
        "name": "Hidden",
        "matcher": "Hidden",
        "noParams": true,
        "styles": {
            "position": "absolute !important",
            "*clip": "rect(1px 1px 1px 1px)",
            "clip": "rect(1px,1px,1px,1px)",
            "padding": "0 !important",
            "border": "0 !important",
            "height": "1px !important",
            "width": "1px !important",
            "overflow": "hidden"
        }
    },
    /**
    ==================================================================
    IbBox
    'shortcut' for inline-block construct
    ==================================================================
    */
    {
        "type": "helper",
        "name": "IbBox",
        "matcher": "IbBox",
        "noParams": true,
        "styles": {
            "display": "inline-block",
            "*display": "inline",
            "zoom": 1,
            "vertical-align": "top"
        }
    },
    /**
    ==================================================================
    LineClamp
    Truncates multiple line of text across browsers.
    Arguments:
       1. the number of lines you want to display
       2. the max-height to use for the box
    ==================================================================
    */
    {
        "type": "helper",
        "name": "Line clamp",
        "matcher": "LineClamp",
        "styles": {
            "-webkit-line-clamp": "$0",
            "max-height": "$1"
        },
        "rules": {
            "[class*=LineClamp]": {
                "display": "-webkit-box",
                "-webkit-box-orient": "vertical",
                "overflow": "hidden"
            },
            "a[class*=LineClamp]": {
                "display": "inline-block",
                "display ": "-webkit-box",
                "*display": "inline",
                "zoom": 1
            },
            /**
            * Fix WebKit bug that displays ellipsis in middle of text inside *LINKS*
            * see: https://twitter.com/thierrykoblentz/status/443899465842176000
            * 1. removes that hack out of the flow (bug reported by Fonda)
            */
            "a[class*=LineClamp]:after": {
                "content": "\".\"",
                "font-size": 0,
                "visibility": "hidden",
                "display": "inline-block", /* 1 */
                "overflow": "hidden", /* 1 */
                "height": 0, /* 1 */
                "width": 0 /* 1 */
            }
        }
    },
    /**
    ==================================================================
    Row
    Meant to contain boxes on a row (from left to right of containing box)
    See: http://cssmojo.com/row_for_grids/
    ==================================================================
    */
    {
        "type": "helper",
        "name": "Row",
        "matcher": "Row",
        "noParams": true,
        "styles": {
            "clear": "both",
            "display": "inline-block",
            "vertical-align": "top",
            "width": "100%",
            "box-sizing": "border-box",
            "*display": "block",
            "*width": "auto",
            "zoom": 1
        }
    },
    /**
    ==================================================================
    StretchedBox
    Stretches a box inside its 'containing block'
    ==================================================================
    */
    {
        "type": "helper",
        "name": "StretchedBox",
        "matcher": "StretchedBox",
        "noParams": true,
        "styles": {
            "position": "absolute",
            "top": 0,
            "right": 0,
            "bottom": 0,
            "left": 0
        }
    },
    /**
    ==================================================================
    Zoom
    hack for oldIE to create a "block-formatting context"
    ==================================================================
    */
    {
        "type": "helper",
        "name": "Zoom",
        "matcher": "Zoom",
        "noParams": true,
        "styles": {
            "zoom": "1"
        }
    },
];
