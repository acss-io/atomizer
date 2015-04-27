/*globals describe,it,afterEach */
'use strict';

var expect = require('chai').expect;
var utils = require('../../src/lib/utils');

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

    describe('mergeConfigs()', function () {
        it('should merge non-conflicting breakpoints correctly', function () {
            var config1 = {
                breakPoints: {
                    'sm': '@media(min-width: 600px)'
                }
            };
            var config2 = {
                breakPoints: {
                    'md': '@media(min-width: 800px)'
                }
            };
            var expected = {
                breakPoints: {
                    'sm': '@media(min-width: 600px)',
                    'md': '@media(min-width: 800px)'
                }
            };
            var result = utils.mergeConfigs([config1, config2]);
            expect(result).to.deep.equal(expected);
        });
        it('should merge conflicting breakpoints where the latter config is kept', function () {
            var config1 = {
                breakPoints: {
                    'sm': '@media(min-width: 600px)'
                }
            };
            var config2 = {
                breakPoints: {
                    'sm': '@media(min-width: 550px)'
                }
            };
            var expected = {
                breakPoints: {
                    'sm': '@media(min-width: 550px)'
                }
            };
            var result = utils.mergeConfigs([config1, config2]);
            expect(result).to.deep.equal(expected);
        });
        it('should merge classNames correctly', function () {
            var config1 = {
                classNames: ['D-ib', 'Bd-foo']
            };
            var config2 = {
                classNames: ['D-n!', 'D-ib']
            };
            var config3 = {
                classNames: ['C-#333', 'D-ib']
            };
            var expected = {
                classNames: ['D-ib', 'Bd-foo', 'D-n!', 'C-#333']
            };
            var result = utils.mergeConfigs([config1, config2, config3]);

            expect(result).to.deep.equal(expected);
        });
        it('should merge customs correctly', function () {
            var config1 = {
                custom: {
                    'foo': '1px solid red'
                }
            };
            var config2 = {
                custom: {
                    'bar': '2px dashed blue'
                }
            };
            var expected = {
                custom: {
                    'foo': '1px solid red',
                    'bar': '2px dashed blue'
                }
            };
            var result = utils.mergeConfigs([config1, config2]);
            expect(result).to.deep.equal(expected);
        });
        it('should merge conflicting customs where the latter config is kept', function () {
            var config1 = {
                custom: {
                    'foo': '1px solid red'
                }
            };
            var config2 = {
                custom: {
                    'foo': '2px dashed blue'
                }
            };
            var expected = {
                custom: {
                    'foo': '2px dashed blue'
                }
            };
            var result = utils.mergeConfigs([config1, config2]);
            expect(result).to.deep.equal(expected);
        });
    });

    describe('repeatString()', function () {
        it('should not repeat string if count < 0', function () {
            var result = utils.repeatString('test', 0);
            expect(result).to.be.empty;
        });
        it('should output string once if count is 1', function () {
            var result = utils.repeatString('test', 1);
            expect(result).to.equal('test');
        });
        it('should output string twice if count is 2', function () {
            var result = utils.repeatString('test', 2);
            expect(result).to.equal('testtest');
        });
        it('should output string twice if count is 3', function () {
            var result = utils.repeatString('test', 3);
            expect(result).to.equal('testtesttest');
        });
    });
});
