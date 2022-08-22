import { defineConfig } from 'vite';
import { vite } from 'atomizer-plugins';
import atomizerConfig from '../atomizer.config.mjs';

const atomizerPlugin = vite({
    config: atomizerConfig,
    outputFile: 'atomizer.css',
});

export default defineConfig(() => {
    return {
        plugins: [atomizerPlugin],
    };
});
