/* global describe, before, it */
var fs = require('fs');
var expect = require('chai').expect;
var atomicLoader = require('../dist/atomicLoader');

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
});
