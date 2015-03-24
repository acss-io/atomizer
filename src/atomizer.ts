/**
 * Future refactor with Atomizer with type declarations.
 * Not using TypeScript until 1.5 officially comes out,
 * so we can write as close to ES6 as possible (including modules).
 * For now, we just declare the interfance and class to serve as
 * our implementation contract.
 */

interface Config {
    globals?: {[index:string]:string};
    breakPoints?: {[index:string]:string};
    classNames: string[];
}
// ParseTree: Object 
interface ParseTree {
    [index:string]:ParseTreeArray;
}
interface ParseTreeArray {
    [index:number]:ParseTreeObject;
}
interface ParseTreeObject {
    breakPoint?:string;
    className:string;
    context?:ParseTreeContext;
    pseudo?:string;
    value:ParseTreeValue;
}
interface ParseTreeContext {
    directParent:boolean;
    parent:string;
}
interface ParseTreeValue {
    percentage?:number;
    fraction:string;
    color:string;
    value:string;
}
interface CssOptions {
    rtl:boolean;
}
interface AtomizerOptions {
    verbose:boolean;
}
interface AtomizerRules {
    [index:number]:AtomizerRule
}
interface AtomizerRule {
    allowCustom:boolean;
    allowSuffixToValue:boolean;
    id:string;
    name:string;
    prefix:string;
    properties:string;
    type:string;
}

class Atomizer {

    verbose: boolean;
    rules: AtomizerRules;

    static grammar = {
        'DESC'   : '[^\\s]+_',
        'DIRECT' : '[^\\s]+>',
        'PROP'   : '(W-|H-|...)',
        'SIGN'   : '(?:neg)?',
        'NUMBER' : '[0-9]+(?:\\.[0-9]+)?',
        'UNIT'   : '(?:[a-zA-Z%]+)?',
        'HEX'    : '[0-9a-f]{3}(?:[0-9a-f]{3})?',
        'CUSTOM' : '[a-zA-Z0-9%\\.]+\\b',
        'MOD'    : '--[a-z]+'
    };

    static regex = new RegExp([
        '\\b(',
            // descendant or direct
            '(?:',
                Atomizer.grammar['DESC'],
                '|',
                Atomizer.grammar['DIRECT'],
            ')?',
            // property
            Atomizer.grammar['PROP'],
            // value
            '(?:',
                // 
                Atomizer.grammar['SIGN'],
                Atomizer.grammar['NUMBER'],
                Atomizer.grammar['UNIT'],
                '|',
                Atomizer.grammar['HEX'],
                '|',
                Atomizer.grammar['CUSTOM'],
            ')',
            // modifier
            '(?:',
                Atomizer.grammar['MOD'],
            ')?',
        ')'
    ].join(''));

    constructor(rules:AtomizerRules , options:AtomizerOptions) {
        this.rules = rules;
        this.verbose = options && options.verbose || false;
    }

    findClassNames(src:string) : string[] {
        return [];
    }

    getCss(classNames:string[], config:Config, options:CssOptions):string {
        return 
    }

    private parseClassNames(classNames:string[], config:Config):ParseTree {
        return {};
    }

    private getCssFromParseTree(parseTree:ParseTree):string {
        return '';
    }
}

// 1.5
// export Atomizer;
