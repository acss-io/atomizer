import { rollup } from 'atomizer-plugins';
import atomizerConfig from '../atomizer.config.mjs';

const atomizer = rollup({
    config: atomizerConfig,
    outputFile: 'atomizer.css',
});

export default {
    input: 'index.js',
    plugins: [atomizer],
    output: {
        file: 'dist/main.js',
        format: 'umd',
    },
};
