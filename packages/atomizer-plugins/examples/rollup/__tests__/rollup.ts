import { rollup } from 'rollup';
import { readFileSync } from 'fs';
import { join } from 'path';
import rollupConfig from '../rollup.config.mjs';
import { getDirname } from '../../../../../tests/utils.mjs';

const __dirname = getDirname(import.meta.url);
const atomizerCssPath = join(__dirname, '..', 'dist', 'atomizer.css');

describe('rollup', () => {
    it('should create atomizer css', async () => {
        const bundle = await rollup(rollupConfig);
        await bundle.write({
            file: join(__dirname, '..', 'dist', 'main.js'),
            format: 'esm',
        });
        await bundle.close();

        // assert that the css file was created
        const css = readFileSync(atomizerCssPath, 'utf8');
        expect(css).toMatchSnapshot();
    });
});
