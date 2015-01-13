var utils = exports;

utils.getNumber = function(value) {
    var out = parseFloat(value, 10);
    if (isNaN(out)) {
        throw new TypeError('Argument `length` is not a valid number.');
    }
    return out;
};

utils.getUnit = function(value) {
    if (isNaN(parseFloat(value, 10))) {
        throw new TypeError('Argument `number` is not a number.');
    }
    return value.replace(/^[\d\.\s]+/, '');
};

utils.isLength = function(value) {
    return parseInt(value, 10) === 0 || (/^-?(?:\d+)?\.?\b\d+[a-z]+$/.test(value) && ['em', 'ex', 'ch', 'rem', 'vh', 'vw', 'vmin', 'vmax', 'px', 'mm', 'cm', 'in', 'pt', 'pc'].indexOf(utils.getUnit(value)) >= 0);
};

utils.isPercentage = function(value) {
    return /^-?(?:\d+)?\.?\b\d+%$/.test(value);
};

utils.isInteger = function(value) {
    return typeof value === 'number' && (value % 1) === 0;
};

utils.isFloat = function(value) {
    return (!isNaN(value) && value.toString().indexOf('.') !== -1);
};

utils.isHex = function(value) {
    return /^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(value);
};

utils.isRgb = function(value) {
    return /^rgb\(\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])\s*,\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])\s*,\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])\s*\)$/.test(value);
};

utils.isRgba = function(value) {
    return /^rgba\(\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])\s*,\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])\s*,\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])\s*,\s*(0?\.[0-9]*|[01]|1\.0+)\s*\)$/.test(value);
};

utils.isHsl = function(value) {
    return /^hsl\(\s*(0|[1-9]\d?|[12]\d\d|3[0-5]\d)\s*,\s*((0|[1-9]\d?|100)%)\s*,\s*((0|[1-9]\d?|100)%)\s*\)$/.test(value);
};

utils.isHsla = function(value) {
    return /^hsla\(\s*(0|[1-9]\d?|[12]\d\d|3[0-5]\d)\s*,\s*((0|[1-9]\d?|100)%)\s*,\s*((0|[1-9]\d?|100)%)\s*,\s*(0?\.[0-9]*|[01]|1\.0+)\s*\)$/.test(value);
};

utils.isColorKeyword = function(value) {
    var keywords = [
        'transparent',
        'currentColor',

        'aliceblue',
        'antiquewhite',
        'aqua',
        'aquamarine',
        'azure',
        'beige',
        'bisque',
        'black',
        'blanchedalmond',
        'blue',
        'blueviolet',
        'brown',
        'burlywood',
        'cadetblue',
        'chartreuse',
        'chocolate',
        'coral',
        'cornflowerblue',
        'cornsilk',
        'crimson',
        'cyan',
        'darkblue',
        'darkcyan',
        'darkgoldenrod',
        'darkgray',
        'darkgreen',
        'darkgrey',
        'darkkhaki',
        'darkmagenta',
        'darkolivegreen',
        'darkorange',
        'darkorchid',
        'darkred',
        'darksalmon',
        'darkseagreen',
        'darkslateblue',
        'darkslategray',
        'darkslategrey',
        'darkturquoise',
        'darkviolet',
        'deeppink',
        'deepskyblue',
        'dimgray',
        'dimgrey',
        'dodgerblue',
        'firebrick',
        'floralwhite',
        'forestgreen',
        'fuchsia',
        'gainsboro',
        'ghostwhite',
        'gold',
        'goldenrod',
        'gray',
        'green',
        'greenyellow',
        'grey',
        'honeydew',
        'hotpink',
        'indianred',
        'indigo',
        'ivory',
        'khaki',
        'lavender',
        'lavenderblush',
        'lawngreen',
        'lemonchiffon',
        'lightblue',
        'lightcoral',
        'lightcyan',
        'lightgoldenrodyellow',
        'lightgray',
        'lightgreen',
        'lightgrey',
        'lightpink',
        'lightsalmon',
        'lightseagreen',
        'lightskyblue',
        'lightslategray',
        'lightslategrey',
        'lightsteelblue',
        'lightyellow',
        'lime',
        'limegreen',
        'linen',
        'magenta',
        'maroon',
        'mediumaquamarine',
        'mediumblue',
        'mediumorchid',
        'mediumpurple',
        'mediumseagreen',
        'mediumslateblue',
        'mediumspringgreen',
        'mediumturquoise',
        'mediumvioletred',
        'midnightblue',
        'mintcream',
        'mistyrose',
        'moccasin',
        'navajowhite',
        'navy',
        'oldlace',
        'olive',
        'olivedrab',
        'orange',
        'orangered',
        'orchid',
        'palegoldenrod',
        'palegreen',
        'paleturquoise',
        'palevioletred',
        'papayawhip',
        'peachpuff',
        'peru',
        'pink',
        'plum',
        'powderblue',
        'purple',
        'red',
        'rosybrown',
        'royalblue',
        'saddlebrown',
        'salmon',
        'sandybrown',
        'seagreen',
        'seashell',
        'sienna',
        'silver',
        'skyblue',
        'slateblue',
        'slategray',
        'slategrey',
        'snow',
        'springgreen',
        'steelblue',
        'tan',
        'teal',
        'thistle',
        'tomato',
        'turquoise',
        'violet',
        'wheat',
        'white',
        'whitesmoke',
        'yellow',
        'yellowgreen'
    ];
    return keywords.indexOf(value) >= 0 ? true : false;
};

utils.isColor = function(value) {
    return utils.isHex(value) || utils.isColorKeyword(value) || utils.isRgb(value) || utils.isRgba(value) || utils.isHsl(value) || this.isHsla(value);
};

utils.indexOf = function(listOfValidItems) {
    if (listOfValidItems.constructor === Array) {
        return function(value) {
            return listOfValidItems.indexOf(value) >= 0 ? true : false;
        };
    }
};
