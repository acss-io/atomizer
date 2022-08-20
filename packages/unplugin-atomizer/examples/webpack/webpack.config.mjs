import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { webpack } from 'unplugin-atomizer';
import atomizerConfig from '../atomizer.config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const atomizer = webpack({
    config: atomizerConfig,
    outputFile: 'dist/atomizer.css',
});

export default {
    entry: './index.js',
    mode: 'development',
    output: {
        filename: 'dist/main.js',
        libraryTarget: 'umd',
        path: __dirname,
    },
    plugins: [atomizer],
};
