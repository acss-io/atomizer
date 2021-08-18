/* global describe, before, it */
var fs = require('fs');
var expect = require('chai').expect;
var atomicLoader = require('../dist/atomicLoader');
var path = require('path');

describe('atomic loader', () => {
    it('can generate correct css', (done) => {
        this.async = () => (err, source) => {
            var cssReg = new RegExp(/\.Bgc\\\(yellow\\\)/);
            const cssFile = fs.readFileSync('./build/css/atomic.css');
            expect(cssReg.test(cssFile)).to.equal(true);
            done();
        };
        atomicLoader.call(this, '<div class="Bgc(yellow)"></div>');
    });
    it('rules path', (done) => {
        this.async = () => (err, source) => {
            var cssReg = new RegExp(/\.Foo/);
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
        this.async = () => (err, source) => {
            var cssReg = new RegExp(/\.Foo/);
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
        this.async = () => (err, source) => {
            var cssReg = new RegExp(/\.Bgc\\\(foo\\\)/);
            const cssFile = fs.readFileSync('./build/css/atomic.css', 'utf8');
            expect(cssReg.test(cssFile)).to.equal(true);
            done();
        };
        this.query = {
            configPath: path.resolve(__dirname, 'fixtures', 'simple.config.js'),
        };
        atomicLoader.call(this, '<div class="Bgc(foo)"></div>');
    });

    it('multiple config paths', (done) => {
        this.async = () => (err, source) => {
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
        this.async = () => (err, source) => {
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
