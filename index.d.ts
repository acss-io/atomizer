declare module 'atomizer' {
    export interface AtomizerConfig {
        custom?: Record<string, string | Record<string, string>>;
        breakPoints?: Record<string, string>;
        classNames?: string[];
    }

    export interface AtomizerOptions {
        verbose?: boolean;
    }

    export interface AtomizerRule {
        [key: string]: any;
    }

    export interface CSSOptions {
        banner?: string;
        helpersNamespace?: string;
        ie?: boolean;
        namespace?: string;
        rtl?: boolean;
    }

    export default class {
        public static escapeSelector: (str: string) => string;
        public static replaceConstants: (str: string, rtl: boolean) => string;

        constructor(options?: AtomizerOptions, rules?: AtomizerRule[]);

        public addRules(rules: AtomizerRule[]): void;
        public findClassNames(src: string): string[];
        public getConfig: (
            classNames: string[],
            config: AtomizerConfig
        ) => AtomizerConfig;
        public getCss(config: AtomizerConfig, options?: CSSOptions): string;
        public getSyntax(isSimple?: boolean): RegExp;
        public parseConfig(config: AtomizerConfig, options?: CSSOptions): any;
        public sortCSS(classNames: string[]): string[];

    }
}
