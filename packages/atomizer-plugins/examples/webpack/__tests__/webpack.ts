import webpack from 'webpack';
import { readFileSync } from 'fs';
import { join } from 'path';
import webpackConfig from '../webpack.config.mjs';
import { getDirname } from '../../../../../tests/utils.mjs';

const __dirname = getDirname(import.meta.url);
const atomizerCssPath = join(__dirname, '..', 'dist', 'atomizer.css');

describe('webpack', () => {
    it('should create atomizer css', async () => {
        return new Promise((resolve) => {
            const test = async () => {
                // due to debounce method, give time for file to be written
                // await new Promise((resolve) => setTimeout(resolve, 2000));
                const css = readFileSync(atomizerCssPath, 'utf8');
                expect(css).toMatchSnapshot();
                resolve(true);
            };
            const compiler = webpack(webpackConfig);
            compiler.run(() => compiler.close(test));
        });
    });
});
