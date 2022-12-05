import { join } from 'path';
import { webpack } from 'atomizer-plugins';
import atomizerConfig from '../atomizer.config.mjs';
import { getDirname } from '../../../../tests/utils.mjs';

const __dirname = getDirname(import.meta.url);

const atomizer = webpack({
    config: atomizerConfig,
    outfile: join(__dirname, 'dist', 'atomizer.css'),
});

export default {
    context: join(__dirname, 'dist'),
    entry: join(__dirname, 'index.js'),
    mode: 'development',
    output: {
        filename: './dist/main.js',
        libraryTarget: 'umd',
        path: __dirname,
    },
    plugins: [atomizer],
};
