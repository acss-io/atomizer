/* eslint-disable no-useless-escape*/
'use strict';

const JSS = require('../../src/lib/jss');

describe('JSS', () => {
    describe('flattenSelectors()', () => {
        it('should flatten selectors given a css object', () => {
            const result = JSS.flattenSelectors(
                {},
                {
                    body: {
                        background: 'white',
                    },
                    foo: {
                        bar: 'baz',
                    },
                    '.test4': {
                        '.test5': {
                            background: 'black',
                        },
                    },
                    '.test6': {
                        '.test7': {
                            '.test8': {
                                '.test9': {
                                    background: 'red',
                                },
                            },
                        },
                    },
                    '#atomic': {
                        '.test10': {
                            display: 'block',
                            '@media screen and (min-width:400px)': {
                                background: 'black',
                            },
                        },
                        '.test11': {
                            display: 'none',
                            '@media screen and (min-width:400px)': {
                                color: 'white',
                            },
                        },
                    },
                }
            );
            const expected = {
                body: {
                    background: 'white',
                },
                foo: {
                    bar: 'baz',
                },
                '.test4 .test5': {
                    background: 'black',
                },
                '.test6 .test7 .test8 .test9': {
                    background: 'red',
                },
                '#atomic .test10': {
                    display: 'block',
                },
                '@media screen and (min-width:400px)': {
                    '#atomic .test10': {
                        background: 'black',
                    },
                    '#atomic .test11': {
                        color: 'white',
                    },
                },
                '#atomic .test11': {
                    display: 'none',
                },
            };
            expect(result).toEqual(expected);
        });
    });
    describe('extractProperties()', () => {
        it('should extract CSS properties given a flat CSS object', () => {
            const result = JSS.extractProperties(
                {},
                {
                    body: {
                        background: 'white',
                    },
                    foo: {
                        bar: 'baz',
                    },
                    '.test4 .test5': {
                        background: 'black',
                    },
                    '.test6 .test7 .test8 .test9': {
                        background: 'red',
                    },
                    '#atomic .test10': {
                        display: 'block',
                    },
                    '@media screen and (min-width:400px)': {
                        '#atomic .test10': {
                            background: 'black',
                        },
                        '#atomic .test11': {
                            color: 'white',
                        },
                    },
                    '#atomic .test11': {
                        display: 'none',
                    },
                }
            );
            const expected = {
                main: [
                    {
                        selector: 'body',
                        prop: 'background',
                        value: 'white',
                    },
                    {
                        selector: 'foo',
                        prop: 'bar',
                        value: 'baz',
                    },
                    {
                        selector: '.test4 .test5',
                        prop: 'background',
                        value: 'black',
                    },
                    {
                        selector: '.test6 .test7 .test8 .test9',
                        prop: 'background',
                        value: 'red',
                    },
                    {
                        selector: '#atomic .test10',
                        prop: 'display',
                        value: 'block',
                    },
                    {
                        selector: '#atomic .test11',
                        prop: 'display',
                        value: 'none',
                    },
                ],
                '@media screen and (min-width:400px)': [
                    {
                        selector: '#atomic .test10',
                        prop: 'background',
                        value: 'black',
                    },
                    {
                        selector: '#atomic .test11',
                        prop: 'color',
                        value: 'white',
                    },
                ],
            };
            expect(result).toEqual(expected);
        });
    });
    describe('combineSelectors()', () => {
        it('should combine selectors given an extracted object', () => {
            const result = JSS.combineSelectors({
                main: [
                    {
                        selector: 'body',
                        prop: 'background',
                        value: 'white',
                    },
                    {
                        selector: 'foo',
                        prop: 'background',
                        value: 'white',
                    },
                ],
                '@media screen and (min-width:400px)': [
                    {
                        selector: '.test1',
                        prop: 'background',
                        value: 'black',
                    },
                    {
                        selector: '#atomic .test11',
                        prop: 'background',
                        value: 'black',
                    },
                ],
            });
            const expected = {
                '@media screen and (min-width:400px)': [
                    {
                        selector: '.test1, #atomic .test11',
                        prop: 'background',
                        value: 'black',
                    },
                    {
                        selector: false,
                        prop: 'background',
                        value: 'black',
                    },
                ],
                main: [
                    {
                        selector: 'body, foo',
                        prop: 'background',
                        value: 'white',
                    },
                    {
                        selector: false,
                        prop: 'background',
                        value: 'white',
                    },
                ],
            };
            expect(result).toEqual(expected);
        });
    });
    describe('extractedToStylesheet()', () => {
        it('should return a stylesheet object given an extracted object', () => {
            const result = JSS.extractedToStylesheet({
                '@media screen and (min-width:400px)': [
                    {
                        selector: '.test1, #atomic .test11',
                        prop: 'background',
                        value: 'black',
                    },
                    {
                        selector: false,
                        prop: 'background',
                        value: 'black',
                    },
                ],
                main: [
                    {
                        selector: 'body, foo',
                        prop: 'background',
                        value: 'white',
                    },
                    {
                        selector: false,
                        prop: 'background',
                        value: 'white',
                    },
                ],
            });
            const expected = {
                '@media screen and (min-width:400px)': {
                    '.test1, #atomic .test11': {
                        background: 'black',
                    },
                },
                main: {
                    'body, foo': {
                        background: 'white',
                    },
                },
            };
            expect(result).toEqual(expected);
        });
    });
    describe('jssToCss()', () => {
        it('should return CSS with the specified tab width', () => {
            const result = JSS.jssToCss(
                {
                    '.foo': {
                        background: 'black',
                        color: 'red',
                        'font-size': '10px',
                    },
                    '.bar--sm': {
                        '@media screen and (min-width:400px)': {
                            background: 'white',
                        },
                    },
                },
                {
                    tabWidth: 4,
                    breakPoints: {
                        sm: '@media screen and (min-width:400px)',
                    },
                }
            );
            const expected = [
                '.foo {',
                '    background: black;',
                '    color: red;',
                '    font-size: 10px;',
                '}',
                '@media screen and (min-width:400px) {',
                '    .bar--sm {',
                '        background: white;',
                '    }',
                '}\n',
            ].join('\n');
            expect(result).toBe(expected);
        });

        it('should return CSS with combined selectors given a CSS Object', () => {
            const result = JSS.jssToCss(
                {
                    body: {
                        background: 'black',
                        color: 'red',
                        'font-size': '10px',
                    },
                    '.test': {
                        background: 'black',
                    },
                    '.test2': {
                        background: 'white',
                    },
                    '.test3': {
                        '@media screen and (min-width:400px)': {
                            background: 'white',
                        },
                    },
                    '.test4': {
                        '.test5': {
                            background: 'black',
                        },
                    },
                    '#atomic': {
                        '.test6': {
                            '@media screen and (min-width:400px)': {
                                background: 'black',
                            },
                        },
                    },
                },
                {
                    breakPoints: {
                        sm: '@media screen and (min-width:400px)',
                    },
                }
            );
            const expected = [
                'body, .test, .test4 .test5 {',
                '  background: black;',
                '}',
                'body {',
                '  color: red;',
                '  font-size: 10px;',
                '}',
                '.test2 {',
                '  background: white;',
                '}',
                '@media screen and (min-width:400px) {',
                '  .test3 {',
                '    background: white;',
                '  }',
                '  #atomic .test6 {',
                '    background: black;',
                '  }',
                '}\n',
            ].join('\n');
            expect(result).toBe(expected);
        });

        it('should return CSS with media query blocks placed after the main block', () => {
            const result = JSS.jssToCss(
                {
                    '.W(100%)--sm': {
                        '@media screen and (max-width: 900px)': {
                            width: '100%',
                        },
                    },
                    '.W(1/3)': {
                        width: '33.3333%',
                    },
                },
                {
                    breakPoints: {
                        sm: '@media screen and (max-width: 900px)',
                    },
                }
            );
            const expected = [
                '.W(1/3) {',
                '  width: 33.3333%;',
                '}',
                '@media screen and (max-width: 900px) {',
                '  .W(100%)--sm {',
                '    width: 100%;',
                '  }',
                '}\n',
            ].join('\n');
            expect(result).toBe(expected);
        });

        it('should return CSS with media query blocks ordered by media query not by property name', () => {
            const result = JSS.jssToCss(
                {
                    '.C(#000)--md': {
                        '@media screen and (min-width: 1000px)': {
                            color: '#000',
                        },
                    },
                    '.W(100px)--sm': {
                        '@media screen and (min-width: 600px)': {
                            width: '100px',
                        },
                    },
                    '.W(200px)--md': {
                        '@media screen and (min-width: 1000px)': {
                            width: '200px',
                        },
                    },
                },
                {
                    breakPoints: {
                        sm: '@media screen and (min-width: 600px)',
                        md: '@media screen and (min-width: 1000px)',
                    },
                }
            );
            const expected = [
                '@media screen and (min-width: 600px) {',
                '  .W(100px)--sm {',
                '    width: 100px;',
                '  }',
                '}',
                '@media screen and (min-width: 1000px) {',
                '  .C(#000)--md {',
                '    color: #000;',
                '  }',
                '  .W(200px)--md {',
                '    width: 200px;',
                '  }',
                '}\n',
            ].join('\n');
            expect(result).toBe(expected);
        });
        it('should generate media query CSS only if matches found', () => {
            const result = JSS.jssToCss(
                {
                    '.C(#000)--md': {
                        '@media screen and (min-width: 1000px)': {
                            color: '#000',
                        },
                    },
                },
                {
                    breakPoints: {
                        sm: '@media screen and (min-width: 600px)',
                        md: '@media screen and (min-width: 1000px)',
                    },
                }
            );
            const expected = [
                '@media screen and (min-width: 1000px) {',
                '  .C(#000)--md {',
                '    color: #000;',
                '  }',
                '}\n',
            ].join('\n');
            expect(result).toBe(expected);
        });
    });
});
