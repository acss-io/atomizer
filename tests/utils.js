/*globals describe,it,afterEach */
'use strict';

var expect = require('chai').expect;
var utils = require('../src/utils');

describe('utils', function () {
    describe('hexToRgb()', function () {
        it('should return null given an invalid hex', function () {
            var result = utils.hexToRgb('ghk');
            expect(result).to.be.null;
        });
        it('should return expected rgb object given a hex in full form', function () {
            var result = utils.hexToRgb('#000000');
            var expected = {r: 0, g: 0, b: 0};
            expect(result).to.deep.equal(expected);
        });
        it('should return expected rgb object given a hex in shorthand form', function () {
            var result = utils.hexToRgb('#000');
            var expected = {r: 0, g: 0, b: 0};
            expect(result).to.deep.equal(expected);
        });
    });
});
