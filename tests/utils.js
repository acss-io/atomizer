'use strict';

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.use(sinonChai);

var utils = require('../src/lib/utils');

describe('utils', function () {

    afterEach(function () {
        // restore original methods
        var methodName, method;
        for(methodName in utils) {
            method = utils[methodName];
            if (method.restore) {
                console.log('restoring');
                method.restore();
            }
        }
    });

    describe('getNumber()', function() {
        it('throws if invalid length', function () {
            expect(function () {
                utils.getNumber('a100em')
            }).to.throw(TypeError);
        });
        it('should return number from a valid length', function () {
            var expected = 100;
            var lengths = ['100em', '100ex', '100ch', '100rem', '100vh', '100vw', '100vmin', '100vmax', '100px', '100mm', '100cm', '100in', '100pt', '100pc'];
            lengths.forEach(function (length){
                expect(utils.getNumber(length)).to.equal(expected);
            });
        });
    });
    describe('getUnit()', function() {
        it('throws if invalid length', function () {
            expect(function () {
                utils.getNumber('a100em')
            }).to.throw(TypeError);
        });
        it('should return unit from a valid length', function () {
            var expected = ['em', 'ex', 'ch', 'rem', 'vh', 'vw', 'vmin', 'vmax', 'px', 'mm', 'cm', 'in', 'pt', 'pc'];
            var lengths = ['100em', '100ex', '100ch', '100rem', '100vh', '100vw', '100vmin', '100vmax', '100px', '100mm', '100cm', '100in', '100pt', '100pc'];
            lengths.forEach(function (length){
                expect(expected.indexOf(utils.getUnit(length))).to.be.above(-1);
            });
        });
    });
    describe('isLength()', function() {
        it('should return true if length is valid', function () {
            // stub getUnit
            sinon.stub(utils, 'getUnit').returns('em');
            expect(utils.isLength('100em')).to.be.true;
        });
        it('should return false if length is invalid', function () {
            // stub getUnit
            sinon.stub(utils, 'getUnit').returns('em');
            expect(utils.isLength('abc100em')).to.be.false;
        });
    });
    describe('isPercentage()', function() {
        it('should return true if percentage is valid', function () {
            expect(utils.isPercentage('100%')).to.be.true;
            expect(utils.isPercentage('99.5%')).to.be.true;
        });
        it('should return false if percentage is invalid', function () {
            expect(utils.isPercentage('10%0%')).to.be.false;
            expect(utils.isPercentage('a100%')).to.be.false;
            expect(utils.isPercentage('10a0%')).to.be.false;
        });
    });
    describe('isInteger()', function() {
        it('should return true if integer is valid', function () {
            expect(utils.isInteger(100)).to.be.true;
            expect(utils.isInteger(1)).to.be.true;
        });
        it('should return false if integer is invalid', function () {
            expect(utils.isInteger(99.5)).to.be.false;
            expect(utils.isInteger('a99')).to.be.false;
            expect(utils.isInteger('99a')).to.be.false;
        });
    });
    describe('isFloat()', function() {
        it('should return true if integer is valid', function () {
            expect(utils.isFloat(100.5)).to.be.true;
            expect(utils.isFloat(.5)).to.be.true;
        });
        it('should return false if integer is invalid', function () {
            expect(utils.isFloat(99)).to.be.false;
            expect(utils.isFloat('a.99')).to.be.false;
            expect(utils.isFloat('99.a')).to.be.false;
        });
    });
    describe('isHex()', function() {
        it('should return true if integer is valid', function () {
            expect(utils.isHex('#000')).to.be.true;
            expect(utils.isHex('#000000')).to.be.true;
        });
        it('should return false if integer is invalid', function () {
            expect(utils.isHex('#0000')).to.be.false;
            expect(utils.isHex('red')).to.be.false;
            expect(utils.isHex('99')).to.be.false;
        });
    });
    describe('indexOf()', function() {
        it('should return a function', function () {
            expect(utils.indexOf([1, 2, 3]).constructor).to.be.instanceOf(Function);
        });
        it('should return a function that performs an indexOf of the passed array', function () {
            expect(utils.indexOf([1, 2, 3]).call('undefined', 1)).to.be.true;
        });
    });
});