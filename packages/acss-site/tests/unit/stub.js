/*jslint node:true */
/*global describe:true,it:true */

'use strict';

var expect = require('chai').expect,
    lib = require('../../app/stub.js');

describe('stub', function () {
    describe('#foo', function () {
        it('should be true', function () {
            expect(lib()).to.equal(true);
        });
    });
});