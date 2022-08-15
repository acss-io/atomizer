'use strict';

const utils = require('../../src/lib/utils');

describe('utils', () => {
    describe('hexToRgb()', () => {
        it('should return null given an invalid hex', () => {
            const result = utils.hexToRgb('ghk');
            expect(result).toBeNull();
        });
        it('should return expected rgb object given a hex in full form', () => {
            const result = utils.hexToRgb('#000000');
            const expected = { r: 0, g: 0, b: 0 };
            expect(result).toEqual(expected);
        });
        it('should return expected rgb object given a hex in shorthand form', () => {
            const result = utils.hexToRgb('#000');
            const expected = { r: 0, g: 0, b: 0 };
            expect(result).toEqual(expected);
        });
    });

    describe('mergeConfigs()', () => {
        it('should merge non-conflicting breakpoints correctly', () => {
            const config1 = {
                breakPoints: {
                    sm: '@media(min-width: 600px)',
                },
            };
            const config2 = {
                breakPoints: {
                    md: '@media(min-width: 800px)',
                },
            };
            const expected = {
                breakPoints: {
                    sm: '@media(min-width: 600px)',
                    md: '@media(min-width: 800px)',
                },
            };
            const result = utils.mergeConfigs([config1, config2]);
            expect(result).toEqual(expected);
        });
        it('should merge conflicting breakpoints where the latter config is kept', () => {
            const config1 = {
                breakPoints: {
                    sm: '@media(min-width: 600px)',
                },
            };
            const config2 = {
                breakPoints: {
                    sm: '@media(min-width: 550px)',
                },
            };
            const expected = {
                breakPoints: {
                    sm: '@media(min-width: 550px)',
                },
            };
            const result = utils.mergeConfigs([config1, config2]);
            expect(result).toEqual(expected);
        });
        it('should merge classNames correctly', () => {
            const config1 = {
                classNames: ['D-ib', 'Bd-foo'],
            };
            const config2 = {
                classNames: ['D-n!', 'D-ib'],
            };
            const config3 = {
                classNames: ['C-#333', 'D-ib'],
            };
            const expected = {
                classNames: ['Bd-foo', 'C-#333', 'D-ib', 'D-n!'],
            };
            const result = utils.mergeConfigs([config1, config2, config3]);

            expect(result).toEqual(expected);
        });
        it('should merge customs correctly', () => {
            const config1 = {
                custom: {
                    foo: '1px solid red',
                },
            };
            const config2 = {
                custom: {
                    bar: '2px dashed blue',
                },
            };
            const expected = {
                custom: {
                    foo: '1px solid red',
                    bar: '2px dashed blue',
                },
            };
            const result = utils.mergeConfigs([config1, config2]);
            expect(result).toEqual(expected);
        });
        it('should merge conflicting customs where the latter config is kept', () => {
            const config1 = {
                custom: {
                    foo: '1px solid red',
                },
            };
            const config2 = {
                custom: {
                    foo: '2px dashed blue',
                },
            };
            const expected = {
                custom: {
                    foo: '2px dashed blue',
                },
            };
            const result = utils.mergeConfigs([config1, config2]);
            expect(result).toEqual(expected);
        });
    });

    describe('repeatString()', () => {
        it('should not repeat string if count < 0', () => {
            const result = utils.repeatString('test', 0);
            expect(Object.keys(result)).toHaveLength(0);
        });
        it('should output string once if count is 1', () => {
            const result = utils.repeatString('test', 1);
            expect(result).toBe('test');
        });
        it('should output string twice if count is 2', () => {
            const result = utils.repeatString('test', 2);
            expect(result).toBe('testtest');
        });
        it('should output string twice if count is 3', () => {
            const result = utils.repeatString('test', 3);
            expect(result).toBe('testtesttest');
        });
    });
});
