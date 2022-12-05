import { join } from 'path';
import { rollup } from 'atomizer-plugins';
import atomizerConfig from '../atomizer.config.mjs';
import { getDirname } from '../../../../tests/utils.mjs';

const __dirname = getDirname(import.meta.url);

const atomizer = rollup({
    config: atomizerConfig,
    outfile: join(__dirname, 'dist', 'atomizer.css'),
});

export default {
    input: join(__dirname, 'index.js'),
    plugins: [atomizer],
    output: {
        file: join(__dirname, 'dist', 'main.js'),
        format: 'umd',
    },
};
