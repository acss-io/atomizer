declare module 'atomizer' {
    export interface Options {
        /** Increases specificity of media queries a small amount */
        bumpMQ?: boolean;
        /** Source config file, defaults to "atomizer.config.js" */
        config?: string;
        /** Excluded file pattern */
        exclude?: string;
        /** Adds the given namespace to all helper selectors */
        helpersNamespace?: string;
        /** Adds the given namespace to all generated Atomic CSS selectors */
        namespace?: string;
        /** Destination of CSS output file */
        outfile?: string;
        /** Hide processing info */
        quiet?: boolean;
        /** Process all files recursively in the path */
        recursive?: boolean;
        /** Swaps `start` and `end` keyword replacements with `right` and `left` */
        rtl?: boolean;
        /** Path to custom rules file */
        rules?: string;
        /** Bail if missing declarations such as break points */
        strict?: boolean;
        /** Show additional log info (warnings) */
        verbose?: boolean;
    }

    export interface AtomizerConfig {
        /** Custom media queries */
        breakPoints?: Record<string, string>;
        /** List of allow listed Atomizer class names */
        classNames?: string[];
        /** List of glob patterns paths to find parseable content */
        content?: string[];
        /** Custom CSS variables */
        custom?: Record<string, string | Record<string, string>>;
    }

    export interface AtomizerOptions {
        /** Show additional log info (warnings) */
        verbose?: boolean;
    }

    export interface AtomizerRule {
        [key: string]: any;
    }

    export type CSSOptions = Partial<Pick<Options, 'bumpMQ' | 'helpersNamespace' | 'namespace' | 'rtl'>> & {
        /** Adds a comment to the top of the generated Atomizer style sheet */
        banner?: string;
    };

    export default class {
        public static escapeSelector: (str: string) => string;
        public static replaceConstants: (str: string, rtl: boolean) => string;

        constructor(options?: AtomizerOptions, rules?: AtomizerRule[]);

        public addRules(rules: AtomizerRule[]): void;
        public findClassNames(src: string): string[];
        public getConfig: (classNames: string[], config: AtomizerConfig) => AtomizerConfig;
        public getCss(config: AtomizerConfig, options?: CSSOptions): string;
        public getSyntax(isSimple?: boolean): RegExp;
        public parseConfig(config: AtomizerConfig, options?: CSSOptions): any;
        public sortCSS(classNames: string[]): string[];
    }
}
