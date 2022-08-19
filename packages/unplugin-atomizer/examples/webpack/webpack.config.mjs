import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { webpack } from 'unplugin-atomizer';
import atomizerConfig from './atomizer.config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
    entry: './index.js',
    mode: 'development',
    output: {
        path: __dirname,
        filename: 'dist/main.js',
        libraryTarget: 'umd',
    },
    plugins: [
        webpack({
            config: atomizerConfig,
            outputFile: 'dist/atomizer.css',
        }),
    ],
};
