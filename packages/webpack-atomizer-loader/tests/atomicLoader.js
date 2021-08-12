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
});
