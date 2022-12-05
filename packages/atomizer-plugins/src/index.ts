import Atomizer from 'atomizer';
import { createUnplugin } from 'unplugin';
import type { Options } from './types';
import fs from 'fs';
import { debounce } from 'lodash-es';

export const unplugin = createUnplugin<Options>((options) => {
    const atomizer = new Atomizer({
        verbose: options.verbose,
    });
    const lookup = new Map<string, Array<string>>();
    let lastComputedCss = null;

    const writeToFile = debounce(
        () => {
            const classes = Array.from(lookup.values()).flat();
            const config = atomizer.getConfig(classes, options.config);
            const css = atomizer.getCss(config, options.cssOptions);

            // don't try to write if contents are gonna be same
            console.log('lastComputedCss', typeof lastComputedCss, lastComputedCss);
            console.log('new css', typeof css, css);
            if (lastComputedCss === css) {
                return;
            }
            lastComputedCss = css;

            const source = css;
            const fileName = options.outfile || 'atomizer.css';
            console.log('write css', css);

            fs.writeFile(fileName, source, (_err) => {});
        },
        1000,
        { leading: true }
    );

    return {
        name: 'unplugin-atomizer',

        /* Extract atomic css classes from each file that has changed */
        transform(code, id) {
            if (id.includes('.css') || id.includes('.scss')) {
                return null;
            }
            // Find atomic classes and add them to our cache
            lookup.set(id, atomizer.findClassNames(code));
            writeToFile();
            return null;
        },

        transformIndexHtml(html) {
            console.log('transformIndexHtml');
            lookup.set('html-entry-point', atomizer.findClassNames(html));
            writeToFile();
            return html;
        },
    };
});

export const esbuild = unplugin.esbuild;
export const rollup = unplugin.rollup;
export const vite = unplugin.vite;
export const webpack = unplugin.webpack;
