/**
 * Future refactor with Atomizer with type declarations.
 * Not using TypeScript until 1.5 officially comes out,
 * so we can write as close to ES6 as possible (including modules).
 * For now, we just declare the interfance and class to serve as
 * our implementation contract.
 */
var Atomizer = (function () {
    function Atomizer(rules, options) {
        this.rules = rules;
        this.verbose = options && options.verbose || false;
    }
    Atomizer.prototype.findClassNames = function (src) {
        return [];
    };
    Atomizer.prototype.getCss = function (classNames, config, options) {
        return;
    };
    Atomizer.prototype.parseClassNames = function (classNames, config) {
        return {};
    };
    Atomizer.prototype.getCssFromParseTree = function (parseTree) {
        return '';
    };
    Atomizer.grammar = {
        'DESC': '[^\\s]+_',
        'DIRECT': '[^\\s]+>',
        'PROP': '(W-|H-|...)',
        'SIGN': '(?:neg)?',
        'NUMBER': '[0-9]+(?:\\.[0-9]+)?',
        'UNIT': '(?:[a-zA-Z%]+)?',
        'HEX': '[0-9a-f]{3}(?:[0-9a-f]{3})?',
        'CUSTOM': '[a-zA-Z0-9%\\.]+\\b',
        'MOD': '--[a-z]+'
    };
    Atomizer.regex = new RegExp([
        '\\b(',
        '(?:',
        Atomizer.grammar['DESC'],
        '|',
        Atomizer.grammar['DIRECT'],
        ')?',
        Atomizer.grammar['PROP'],
        '(?:',
        Atomizer.grammar['SIGN'],
        Atomizer.grammar['NUMBER'],
        Atomizer.grammar['UNIT'],
        '|',
        Atomizer.grammar['HEX'],
        '|',
        Atomizer.grammar['CUSTOM'],
        ')',
        '(?:',
        Atomizer.grammar['MOD'],
        ')?',
        ')'
    ].join(''));
    return Atomizer;
})();
// 1.5
// export Atomizer;
