import Atomizer from 'atomizer';
import { createUnplugin } from 'unplugin';
import type { Options } from './types';

export const unplugin = createUnplugin<Options>((options) => {
    const atomizer = new Atomizer({
        verbose: options.verbose,
    });
    const lookup = new Map<string, Array<string>>();

    return {
        name: 'unplugin-atomizer',
        // transformInclude(id) {},

        /* Extract atomic css classes from each file that has changed */
        transform(code, id) {
            // Find atomic classes and add them to our cache
            lookup.set(id, atomizer.findClassNames(code));
            return null;
        },

        /* Build final atomizer css file */
        buildEnd() {
            const classes = Array.from(lookup.values()).flat();
            const config = atomizer.getConfig(classes, options.config);
            const css = atomizer.getCss(config, options.cssOptions);

            this.emitFile({
                type: 'asset',
                source: css,
                fileName: options.outfile || 'atomizer.css',
            });
        },
    };
});

export const esbuild = unplugin.esbuild;
export const rollup = unplugin.rollup;
export const vite = unplugin.vite;
export const webpack = unplugin.webpack;
