/* global describe,before,it */
var expect = require('chai').expect;
var atomicLoader = require('../lib/atomicLoader');
var fs = require('fs');

describe('atomic loader', function () {
    before(function () {

    });

    it('can generate correct css', function (done) {
        new atomicLoader('<div class="Bgc(yellow)"></div>');
        expect(1).to.equal(1);
        fs.readFile('./build/css/atomic.css', 'utf-8', function (err, data) {
            var cssReg = new RegExp(/\.Bgc\\\(yellow\\\)/);
            expect(cssReg.test(data)).to.equal(true);
            done();
            fs.unlink('./build/css/atomic.css');
        });
    });
});