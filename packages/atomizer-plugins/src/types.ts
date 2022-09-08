import type { AtomizerConfig, AtomizerOptions, CSSOptions } from 'atomizer';

export interface Options extends AtomizerOptions {
    /* Options passed into Atomizer.getCSS method */
    cssOptions?: CSSOptions;
    /* Atomizer config options */
    config: AtomizerConfig;
    /* Output file name, relative to cwd. Defaults to atomizer.css */
    outfile?: string;
}
