'use strict';

const childProcess = require('child_process');
const path = require('path');
const util = require('util');

const atomizer = path.resolve(__dirname, '..', '..', 'bin', 'atomizer');
const execFileAsync = util.promisify(childProcess.execFile);
const htmlFixture = path.resolve(__dirname, '..', 'fixtures', 'test.html');

describe('atomizer', () => {
    it('should return the help menu', async () => {
        const { stdout } = await execFileAsync('node', [atomizer]);
        expect(stdout).toContain('Usage: atomizer [options] [path]');
    });

    it('should parse html files for classes', async () => {
        const { stdout } = await execFileAsync('node', [atomizer, htmlFixture]);
        expect(stdout).toContain('\n.D\\(b\\) {\n  display: block;\n}\n');
    });
});