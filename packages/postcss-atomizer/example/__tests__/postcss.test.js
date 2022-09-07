const postcss = require('postcss');
const atomizerPlugin = require('postcss-atomizer');
const { join } = require('path');

describe('postcss', () => {
    it('should create post css', async () => {
        const input = '/* dummy test */';
        const output = '';
        const atomizer = atomizerPlugin({
            config: join(__dirname, '..', 'atomizer.config.js'),
        });
        const result = await postcss([atomizer]).process(input, { from: undefined });

        expect(result.css).toMatchSnapshot(output);
        expect(result.warnings()).toHaveLength(0);
    });
});
