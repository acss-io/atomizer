'use strict';

const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');
const util = require('util');

const atomizer = path.resolve(__dirname, '..', '..', 'bin', 'atomizer');
const execFileAsync = util.promisify(childProcess.execFile);
const fixtureDir = path.resolve(__dirname, '..', 'fixtures');
const htmlFixture = path.resolve(fixtureDir, 'test.html');

describe('atomizer', () => {
    it('should return the help menu', async () => {
        const { stdout } = await execFileAsync('node', [atomizer]);
        expect(stdout).toContain('Usage: atomizer [options] [path]');
    });

    it('should parse html files for classes', async () => {
        const { stdout } = await execFileAsync('node', [atomizer, htmlFixture]);
        expect(stdout).toMatchSnapshot();
    });

    describe('options', () => {
        it('--bump-mq', async () => {
            const configFile = path.resolve(fixtureDir, 'mq', 'atomizer.config.js');
            const mqFixture = path.resolve(fixtureDir, 'mq', 'mq.html');

            // without --bump-mq
            let result = await execFileAsync('node', [atomizer, mqFixture, '--config', configFile]);
            expect(result.stdout).toMatchSnapshot();

            // with --bump-mq to compare against
            result = await execFileAsync('node', [atomizer, mqFixture, '--bump-mq', '--config', configFile]);
            expect(result.stdout).toMatchSnapshot();
        });

        it('--config', async () => {
            const configFile = path.resolve(fixtureDir, 'config', 'atomizer.config.js');
            const configFixture = path.resolve(fixtureDir, 'config', 'config.html');
            const { stdout } = await execFileAsync('node', [atomizer, configFixture, '--config', configFile]);
            expect(stdout).toMatchSnapshot();
        });

        it('--exclude', async () => {
            const { stdout } = await execFileAsync('node', [atomizer, htmlFixture, '--exclude', 'test.html']);
            expect(stdout).toEqual(''); // exluding the default file should result in an empty output
        });

        it('--helpersNamespace', async () => {
            const helpersFixture = path.resolve(fixtureDir, 'helpersNamespace.html');
            const { stdout } = await execFileAsync('node', [atomizer, helpersFixture, '--helpersNamespace', 'foo']);
            expect(stdout).toMatchSnapshot();
        });

        it('--namespace', async () => {
            const { stdout } = await execFileAsync('node', [atomizer, htmlFixture, '--namespace', 'foo']);
            expect(stdout).toMatchSnapshot();
        });

        it('--outfile', async () => {
            const outFile = path.resolve(fixtureDir, 'outfile.css');
            await execFileAsync('node', [atomizer, htmlFixture, '--outfile', outFile]);
            const content = fs.readFileSync(outFile, 'utf-8');
            expect(content).toMatchSnapshot();
            fs.unlinkSync(outFile); // remove temp file
        });

        it('--quiet', async () => {
            const { stderr } = await execFileAsync('node', [atomizer, htmlFixture, '--quiet']);
            expect(stderr).toEqual('');
        });

        it('--recursive', async () => {
            const rescursiveDir = path.resolve(fixtureDir, 'recursive');
            const { stdout } = await execFileAsync('node', [atomizer, rescursiveDir, '--recursive']);
            expect(stdout).toMatchSnapshot();
        });

        it('--rtl', async () => {
            const rtlDir = path.resolve(fixtureDir, 'rtl');
            const { stdout } = await execFileAsync('node', [atomizer, rtlDir, '--rtl']);
            expect(stdout).toMatchSnapshot();
        });

        it('--rules', async () => {
            const rulesFile = path.resolve(fixtureDir, 'rules', 'rules.js');
            const rulesFixture = path.resolve(fixtureDir, 'rules', 'rules.html');
            const { stdout } = await execFileAsync('node', [atomizer, rulesFixture, '--rules', rulesFile]);
            expect(stdout).toMatchSnapshot();
        });

        it('--verbose', async () => {
            const configFile = path.resolve(fixtureDir, 'verbose', 'atomizer.config.js');
            const verboseFixture = path.resolve(fixtureDir, 'verbose', 'verbose.html');

            // should not output anything if --verbose is not set
            const { stderr: noWarning } = await execFileAsync('node', [
                atomizer,
                verboseFixture,
                '--config',
                configFile,
            ]);
            expect(noWarning).not.toContain('Warning: Class');

            // should output warnings if --verbose is set
            const { stderr } = await execFileAsync('node', [
                atomizer,
                verboseFixture,
                '--verbose',
                '--config',
                configFile,
            ]);
            expect(stderr).toContain('Warning: Class `D(MissingValue)` is ambiguous');
        });

        it('--watch', async () => {
            const configFile = path.resolve(fixtureDir, 'watch', 'atomizer.config.js');
            const watchFixture = path.resolve(fixtureDir, 'watch', 'watch.html');
            const { stdout } = await execFileAsync(
                'node',
                [atomizer, htmlFixture, '-c', configFile, '--watch', watchFixture],
                { env: { ...process.env, TEST: true } }
            );
            expect(stdout).toContain('Watching');
            expect(stdout).toContain('/fixtures/test.html'); // watch file from arg "atomizer test.html"
            expect(stdout).toContain('/watch/foo.html'); // watch file from "config.content"
            expect(stdout).toContain('/watch/watch.html'); // watch file from "--watch watch.html" opton
        });
    });
});
