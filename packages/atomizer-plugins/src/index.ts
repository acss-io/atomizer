import Atomizer from 'atomizer';
import { createUnplugin } from 'unplugin';
import type { Options } from './types';
import { outputFile } from 'fs-extra';
import { debounce } from 'lodash-es';

// Binary and non-text file extensions to skip (#609)
const BINARY_EXTENSIONS = [
    '.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico', '.bmp', '.tiff', '.tif',
    '.svg', '.woff', '.woff2', '.ttf', '.otf', '.eot',
    '.mp3', '.mp4', '.wav', '.ogg', '.webm', '.avi', '.mov',
    '.pdf', '.zip', '.tar', '.gz', '.rar', '.7z',
    '.exe', '.dll', '.so', '.dylib',
    '.map', '.lock'
];

// Check if file is binary based on extension
function isBinaryFile(id: string): boolean {
    const ext = id.substring(id.lastIndexOf('.')).toLowerCase();
    return BINARY_EXTENSIONS.includes(ext);
}

export const unplugin = createUnplugin<Options>((options) => {
    const atomizer = new Atomizer({
        verbose: options.verbose,
    });
    const lookup = new Map<string, Array<string>>();
    let lastComputedCss = null;
    const isDev = process.env.NODE_ENV === 'development';

    const writeToFile = debounce(
        () => {
            const classes = Array.from(lookup.values()).flat();
            const config = atomizer.getConfig(classes, options.config);
            const css = atomizer.getCss(config, options.cssOptions);

            // don't try to write if contents are gonna be same
            if (lastComputedCss === css) {
                return;
            }
            lastComputedCss = css;

            const source = css;
            const fileName = options.outfile || 'atomizer.css';

            outputFile(fileName, source, (e) => {});
        },
        1000,
        { leading: true }
    );

    return {
        name: 'unplugin-atomizer',

        /* Extract atomic css classes from each file that has changed */
        transform(code, id) {
            // Skip css files as atomizer classes do not exist there
            if (id.includes('.css') || id.includes('.scss')) {
                return null;
            }

            // Skip binary files to prevent corruption (#609)
            if (isBinaryFile(id)) {
                return null;
            }

            // Find atomic classes and add them to our cache
            lookup.set(id, atomizer.findClassNames(code));

            // only execute in dev mode to avoid writing to disk for production builds
            // buildEnd will handle production builds
            if (isDev) {
                writeToFile();
            }

            return null;
        },

        /* Vite only hook to parse entry point files */
        transformIndexHtml(html) {
            lookup.set('html-entry-point', atomizer.findClassNames(html));
            writeToFile();
            return html;
        },

        /* Hook used to at the end of the build lifecycle */
        buildEnd() {
            writeToFile();
        },
    };
});

export const esbuild = unplugin.esbuild;
export const rollup = unplugin.rollup;
export const vite = unplugin.vite;
export const webpack = unplugin.webpack;
