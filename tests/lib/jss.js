/*globals describe,it,afterEach */
'use strict';

var expect = require('chai').expect;
var JSS = require('../../src/lib/jss');

describe('JSS', function () {
    describe('flattenSelectors()', function () {
        it('should flatten selectors given a css object', function () {
            var result = JSS.flattenSelectors({}, {
                'body': {
                    'background': 'white'
                },
                'foo': {
                    'bar': 'baz'
                },
                '.test4': {
                    '.test5': {
                        'background': 'black'
                    }
                },
                '.test6': {
                    '.test7': {
                        '.test8': {
                            '.test9': {
                                'background': 'red'
                            }
                        }
                    }
                },
                '#atomic': {
                    '.test10': {
                        'display': 'block',
                        '@media(min-width:400px)': {
                            'background': 'black'
                        }
                    },
                    '.test11': {
                        'display': 'none',
                        '@media(min-width:400px)': {
                            'color': 'white'
                        }
                    }
                }
            });
            var expected = {
                'body': {
                    background: 'white'
                },
                'foo': {
                    'bar': 'baz'
                },
                '.test4 .test5': {
                    'background': 'black'
                },
                '.test6 .test7 .test8 .test9': {
                    'background': 'red'
                },
                '#atomic .test10': {
                    'display': 'block'
                },
                '@media(min-width:400px)': {
                    '#atomic .test10': {
                        background: 'black'
                    },
                    '#atomic .test11': {
                        'color': 'white'
                    }
                },
                '#atomic .test11': {
                    'display': 'none'
                }
            };
            expect(result).to.deep.equal(expected);
        });
    });
    describe('extractProperties()', function () {
        it('should extract CSS properties given a flat CSS object', function () {
            var result = JSS.extractProperties({}, {
                'body': {
                    background: 'white'
                },
                'foo': {
                    'bar': 'baz'
                },
                '.test4 .test5': {
                    'background': 'black'
                },
                '.test6 .test7 .test8 .test9': {
                    'background': 'red'
                },
                '#atomic .test10': {
                    'display': 'block'
                },
                '@media(min-width:400px)': {
                    '#atomic .test10': {
                        background: 'black'
                    },
                    '#atomic .test11': {
                        'color': 'white'
                    }
                },
                '#atomic .test11': {
                    'display': 'none'
                }
            });
            var expected = {
                main: [
                    {
                        selector: 'body',
                        prop: 'background',
                        value: 'white'
                    },
                    {
                        selector: 'foo',
                        prop: 'bar',
                        value: 'baz'
                    },
                    {
                        selector: '.test4 .test5',
                        prop: 'background',
                        value: 'black'
                    },
                    {
                        selector: '.test6 .test7 .test8 .test9',
                        prop: 'background',
                        value: 'red'
                    },
                    {
                        selector: '#atomic .test10',
                        prop: 'display',
                        value: 'block'
                    },
                    {
                        selector: '#atomic .test11',
                        prop: 'display',
                        value: 'none'
                    }
                ],
                '@media(min-width:400px)': [
                    {
                        selector: '#atomic .test10',
                        prop: 'background',
                        value: 'black'
                    },
                    {
                        selector: '#atomic .test11',
                        prop: 'color',
                        value: 'white'
                    }
                ]
            };
            expect(result).to.deep.equal(expected);
        });
    });
    describe('combineSelectors()', function () {
        it('should combine selectors given an extracted object', function () {
            var result = JSS.combineSelectors({
                main: [
                    {
                        selector: 'body',
                        prop: 'background',
                        value: 'white'
                    },
                    {
                        selector: 'foo',
                        prop: 'background',
                        value: 'white'
                    }
                ],
                '@media(min-width:400px)': [
                    {
                        selector: '.test1',
                        prop: 'background',
                        value: 'black'
                    },
                    {
                        selector: '#atomic .test11',
                        prop: 'background',
                        value: 'black'
                    }
                ]
            });
            var expected = {
                '@media(min-width:400px)': [
                    {
                        selector: '.test1, #atomic .test11',
                        prop: 'background',
                        value: 'black'
                    },
                    {
                        selector: false,
                        prop: 'background',
                        value: 'black'
                    }
                ],
                main: [
                    {
                        selector: 'body, foo',
                        prop: 'background',
                        value: 'white'
                    },
                    {
                        selector: false,
                        prop: 'background',
                        value: 'white'
                    }
                ]
            };
            expect(result).to.deep.equal(expected);
        });
    });
    describe('extractedToStylesheet()', function () {
        it('should return a stylesheet object given an extracted object', function () {
            var result = JSS.extractedToStylesheet({
                '@media(min-width:400px)': [
                    {
                        selector: '.test1, #atomic .test11',
                        prop: 'background',
                        value: 'black'
                    },
                    {
                        selector: false,
                        prop: 'background',
                        value: 'black'
                    }
                ],
                main: [
                    {
                        selector: 'body, foo',
                        prop: 'background',
                        value: 'white'
                    },
                    {
                        selector: false,
                        prop: 'background',
                        value: 'white'
                    }
                ]
            });
            var expected = {
                '@media(min-width:400px)': {
                    '.test1, #atomic .test11': {
                        background: 'black'
                    }
                },
                main: {
                    'body, foo': {
                        background: 'white'
                    }
                }
            };
            expect(result).to.deep.equal(expected);
        });
    });
    describe('jssToCss()', function () {
        it('should return CSS with the specified tab width', function () {
            var result = JSS.jssToCss({
                '.foo': {
                    'background': 'black',
                    'color': 'red',
                    'font-size': '10px'
                },
                '.bar': {
                    '@media(min-width:400px)': {
                        'background': 'white'
                    }
                }
            }, {tabWidth: 4});
            var expected = [
                '.foo {',
                '    background: black;',
                '    color: red;',
                '    font-size: 10px;',
                '}',
                '@media(min-width:400px) {',
                '    .bar {',
                '        background: white;',
                '    }',
                '}\n'
            ].join('\n');
            expect(result).to.equal(expected);
        });
        it('should return CSS with combined selectors given a CSS Object', function () {
            var result = JSS.jssToCss({
                'body': {
                    'background': 'black',
                    'color': 'red',
                    'font-size': '10px'
                },
                '.test': {
                    'background': 'black'
                },
                '.test2': {
                    'background': 'white'
                },
                '.test3': {
                    '@media(min-width:400px)': {
                        'background': 'white'
                    }
                },
                '.test4': {
                    '.test5': {
                        'background': 'black'
                    }
                },
                '#atomic': {
                    '.test6': {
                        '@media(min-width:400px)': {
                            'background': 'black'
                        }
                    },
                }
            });
            var expected = [
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
                '@media(min-width:400px) {',
                '  .test3 {',
                '    background: white;',
                '  }',
                '  #atomic .test6 {',
                '    background: black;',
                '  }',
                '}\n'
            ].join('\n');
            expect(result).to.equal(expected);
        });
    });
});
