var utils = exports;

utils.getNumber = function (value) {
    var out = parseFloat(value, 10);
    if (isNaN(out)) {
        throw new TypeError('Argument `length` is not a valid number.')
    }
    return out;
};

utils.getUnit = function (value) {
    if (isNaN(parseFloat(value, 10))) {
        throw new TypeError('Argument `number` is not a number.')
    }
    return value.replace(/^[\d\.\s]+/,'');
};

utils.isLength = function (value) {
    return /^-?(?:\d+)?\.?\b\d+[a-z]+$/.test(value);
};

utils.isPercentage = function (value) {
    return /^-?(?:\d+)?\.?\b\d+%$/.test(value);
};

utils.isInteger = function (value) {
    return typeof value ==='number' && (value % 1) === 0;
};

utils.isFloat = function (value) {
    return (!isNaN(value) && value.toString().indexOf('.') != -1);
};

utils.isHex = function (value) {
    return /^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(value);
};

utils.indexOf = function (listOfValidItems) {
    if (listOfValidItems.constructor === Array) {
        return function (value) {
            return listOfValidItems.indexOf(value) >= 0 ? true : false;
        }
    }
};