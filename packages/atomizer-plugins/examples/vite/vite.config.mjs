import { join } from 'path';
import { defineConfig } from 'vite';
import { vite } from 'atomizer-plugins';
import atomizerConfig from '../atomizer.config.mjs';
import { getDirname } from '../../../../tests/utils.mjs';

const __dirname = getDirname(import.meta.url);

const atomizerPlugin = vite({
    config: atomizerConfig,
    outfile: join(__dirname, 'dist', 'atomizer.css'),
});

export default defineConfig(() => {
    return {
        plugins: [atomizerPlugin],
    };
});
