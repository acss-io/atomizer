const fs = require('fs');
const { expect } = require('chai');
const path = require('path');
const stealthyRequire = require('stealthy-require');

describe('atomic loader', () => {
    it('can generate correct css', (done) => {
        const atomicLoader = stealthyRequire(require.cache, () => require('../dist/atomicLoader'));
        this.async = () => () => {
            const cssReg = new RegExp(/\.Bgc\\\(yellow\\\)/);
            const cssFile = fs.readFileSync('./build/css/atomic.css');
            expect(cssReg.test(cssFile)).to.equal(true);
            done();
        };
        atomicLoader.call(this, '<div class="Bgc(yellow)"></div>');
    });
    it('keeps already-generated css', (done) => {
        const atomicLoader = stealthyRequire(require.cache, () => require('../dist/atomicLoader'));
        let iteration = 0;
        this.async = () => () => {
            if (iteration >= 1) {
                const cssReg = new RegExp(/\.Bgc\\\(yellow\\\)/);
                const cssFile = fs.readFileSync('./build/css/atomic.css');
                expect(cssReg.test(cssFile)).to.equal(true);
                done();
            }
            iteration += 1;
        };
        atomicLoader.call(this, '<div class="Bgc(yellow)"></div>');
        atomicLoader.call(this, '');
    });
    it('rules path', (done) => {
        const atomicLoader = stealthyRequire(require.cache, () => require('../dist/atomicLoader'));
        this.async = () => () => {
            const cssReg = new RegExp(/\.Foo/);
            const cssFile = fs.readFileSync('./build/css/atomic.css', 'utf8');
            expect(cssReg.test(cssFile)).to.equal(true);
            done();
        };
        this.query = {
            configPath: path.resolve(__dirname, 'fixtures', 'rules-path.config.js'),
        };
        atomicLoader.call(this, '<div class="Foo"></div>');
    });
    it('rules object', (done) => {
        const atomicLoader = stealthyRequire(require.cache, () => require('../dist/atomicLoader'));
        this.async = () => () => {
            const cssReg = new RegExp(/\.Foo/);
            const cssFile = fs.readFileSync('./build/css/atomic.css', 'utf8');
            expect(cssReg.test(cssFile)).to.equal(true);
            done();
        };
        this.query = {
            configPath: path.resolve(__dirname, 'fixtures', 'rules-object.config.js'),
        };
        atomicLoader.call(this, '<div class="Foo"></div>');
    });
    it('config path', (done) => {
        const atomicLoader = stealthyRequire(require.cache, () => require('../dist/atomicLoader'));
        this.async = () => () => {
            const cssReg = new RegExp(/\.Bgc\\\(foo\\\)/);
            const cssFile = fs.readFileSync('./build/css/atomic.css', 'utf8');
            console.log(cssFile);
            expect(cssReg.test(cssFile)).to.equal(true);
            done();
        };
        this.query = {
            configPath: path.resolve(__dirname, 'fixtures', 'simple.config.js'),
        };
        atomicLoader.call(this, '<div class="Bgc(foo)"></div>');
    });

    it('multiple config paths', (done) => {
        const atomicLoader = stealthyRequire(require.cache, () => require('../dist/atomicLoader'));
        this.async = () => () => {
            const cssFile = fs.readFileSync('./build/css/atomic.css', 'utf8');
            expect(/\.Bgc\\\(foo\\\)/.test(cssFile)).to.equal(false);
            expect(/\.C\\\(bar\\\)/.test(cssFile)).to.equal(true);
            done();
        };
        this.query = {
            configPath: [
                path.resolve(__dirname, 'fixtures', 'simple.config.js'),
                path.resolve(__dirname, 'fixtures', 'simple2.config.js'),
            ],
        };
        atomicLoader.call(this, '<div class="Bgc(foo) C(bar)"></div>');
    });

    it('config', (done) => {
        const atomicLoader = stealthyRequire(require.cache, () => require('../dist/atomicLoader'));
        this.async = () => () => {
            const cssFile = fs.readFileSync('./build/css/atomic.css', 'utf8');
            expect(/\.Bgc\\\(foo\\\)/.test(cssFile)).to.equal(true);
            done();
        };
        this.query = {
            config: {
                configs: {
                    classNames: [],
                    custom: {
                        foo: 'red',
                    },
                },
            },
        };
        atomicLoader.call(this, '<div class="Bgc(foo)"></div>');
    });
});
