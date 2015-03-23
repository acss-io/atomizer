/*globals describe,it,afterEach */
'use strict';

var expect = require('chai').expect;
var Atomizer = require('../src/atomizer');

describe('Atomizer()', function () {
    describe('constructor()', function () {
        it('instantiate without any params', function () {
            var atomizer = new Atomizer();
            expect(atomizer).to.be.an.Object;
        });
        it('instantiate with the assigned params', function () {
            var options = {
                verbose: true
            };
            var rules = [{
                type: 'pattern',
                id: 'border',
                name: 'Border',
                prefix: 'Bd-',
                properties: ['border']
            }];
            var atomizer = new Atomizer(options, rules);
            expect(atomizer.rules).to.deep.equal(rules);
            expect(atomizer.verbose).to.equal(true);
        });
    });
    describe('findClassNames()', function () {
        it('returns an array of valid atomic class names', function () {
            var atomizer = new Atomizer();
            // duplicate P-55px to make sure we get only one
            var result = atomizer.findClassNames('<div class="P-55px P-55px H-100% test:h>Op-1:h test:test>Op-1"></div>');
            var expected = ['P-55px', 'H-100%', 'test:h>Op-1:h'];
            expect(result).to.deep.equal(expected);
        });
    });
    describe('addRules()', function () {
        it('throws if a rule with the same prefix already exists', function () {
            var rules = [{
                type: 'pattern',
                id: 'border',
                name: 'Border',
                prefix: 'Bd-',
                properties: ['border']
            }];
            var atomizer = new Atomizer(null, rules);
            expect(function() {
                atomizer.addRules([{prefix: 'Bd-'}]);
            }).to.throw();
        });
        it('adds a new rule to the atomizer instance and resets the syntax', function () {
            var atomizer = new Atomizer();
            var myRules = [{
                type: 'pattern',
                id: 'foo',
                name: 'foo',
                prefix: 'Foo-',
                properties: ['foo']
            }];
            atomizer.addRules(myRules);

            expect(atomizer.rules[atomizer.rules.length - 1]).to.deep.equal(myRules[0]);
            expect(atomizer.rulesMap).to.have.ownProperty('Foo-');
            expect(atomizer.syntax).to.be.null;
        });
    });
    describe('getSyntax()', function () {
        it('returns the same syntax if syntax has not changed', function () {
            var rules = [{
                type: 'pattern',
                id: 'border',
                name: 'Border',
                prefix: 'Bd-',
                properties: ['border']
            }];
            var atomizer = new Atomizer(null, rules);
            var syntax = atomizer.getSyntax();
            var result = atomizer.getSyntax();

            expect(syntax).to.equal(result);
        });
        it('returns a new syntax if syntax has changed', function () {
            var rules = [{
                type: 'pattern',
                id: 'border',
                name: 'Border',
                prefix: 'Bd-',
                properties: ['border']
            }];
            var atomizer = new Atomizer(null, rules);
            var syntax = atomizer.getSyntax();
            atomizer.addRules([{
                type: 'pattern',
                id: 'foo',
                name: 'Foo',
                prefix: 'Foo-',
                properties: ['foo']
            }]);
            var result = atomizer.getSyntax();
            expect(syntax).to.not.equal(result);
        });
    });
    describe('getCss()', function () {
        it ('returns css by reading an array of class names', function () {
            var atomizer = new Atomizer();
            var classNames = ['P-55px', 'H-100%', 'M-a', 'test:h>Op-1:h', 'test:h_Op-1:h', 'Op-1', 'C-333', 'Mt-neg10px'];
            var expected = [
                '.C-333 {',
                '  color: #333;',
                '}',
                '.H-100\\% {',
                '  height: 100%;',
                '}',
                '.M-a {',
                '  margin: auto;',
                '}',
                '.Mt-neg10px {',
                '  margin-top: -10px;',
                '}',
                '.test:hover>.test\\:h\\>Op-1\\:h:hover, .test:hover .test\\:h_Op-1\\:h:hover, .Op-1 {',
                '  opacity: 1;',
                '}',
                '.P-55px {',
                '  padding: 55px;',
                '}\n'
            ].join('\n');
            var result = atomizer.getCss(classNames);
            expect(result).to.equal(expected);
        });
        it ('returns expected css of a helper class', function () {
            // set rules here so if helper change, we don't fail the test
            var atomizer = new Atomizer(null, [
                // params
                {
                    type: 'helper',
                    name: 'Foo',
                    prefix: 'Foo',
                    declaration: {
                        'param0': '$0',
                        'param1': '$1'
                    },
                    rules: {
                        'rule': {
                           'foo': 'bar'
                        }
                    }
                },
                // empty
                {
                    type: 'helper',
                    name: 'Bar',
                    prefix: 'Bar',
                    declaration: {
                        'bar': 'foo'
                    }
                }
            ]);
            var classNames = ['Foo(1,10px)', 'Bar()'];
            var expected = [
                'rule {',
                '  foo: bar;',
                '}',
                '.Foo\\(1\\,10px\\) {',
                '  param0: 1;',
                '  param1: 10px;',
                '}',
                '.Bar\\(\\) {',
                '  bar: foo;',
                '}\n'
            ].join('\n');
            var result = atomizer.getCss(classNames);
            expect(result).to.equal(expected);
        });
        it ('throws if helper class doesn\'t have a declaration', function () {
            expect(function() {
                // set rules here so if helper change, we don't fail the test
                var atomizer = new Atomizer(null, [
                    // empty
                    {
                        type: 'helper',
                        name: 'Bar',
                        prefix: 'Bar'
                    }
                ]);
                var classNames = ['Bar()'];
                atomizer.getCss(classNames);
            }).to.throw();
        });
        it ('returns expected css by reading an array of class names in config only', function () {
            var atomizer = new Atomizer();
            var config = {
                classNames: ['P-55px', 'H-100%', 'M-a', 'test:h>Op-1:h', 'Op-1', 'W-1/3', 'Op-1!']
            };
            var expected = [
                '.H-100\\% {',
                '  height: 100%;',
                '}',
                '.M-a {',
                '  margin: auto;',
                '}',
                '.test:hover>.test\\:h\\>Op-1\\:h:hover, .Op-1 {',
                '  opacity: 1;',
                '}',
                '.Op-1\\! {',
                '  opacity: 1 !important;',
                '}',
                '.P-55px {',
                '  padding: 55px;',
                '}',
                '.W-1\\/3 {',
                '  width: 33.3333%;',
                '}\n'
            ].join('\n');
            var result = atomizer.getCss(null, config);
            expect(result).to.equal(expected);
        });
        it ('returns expected css value declared in custom', function () {
            var atomizer = new Atomizer();
            var config = {
                custom: {
                    'brand-color': '#400090'
                }
            };
            var expected = [
                '.C-brand-color {',
                '  color: #400090;',
                '}\n'
            ].join('\n');
            var result = atomizer.getCss(['C-brand-color', 'C-custom'], config);
            expect(result).to.equal(expected);
        });
        it ('returns expected css value with breakpoints', function () {
            var atomizer = new Atomizer(null, [
                {
                    type: 'pattern',
                    name: 'Display',
                    prefix: 'D-',
                    properties: ['display'],
                    rules: [
                        {suffix: 'n', values: ['none']}
                    ]
                },
                {
                    type: 'pattern',
                    name: 'Padding (all edges)',
                    prefix: 'P-',
                    properties: ['padding']
                },
                {
                    type: 'helper',
                    name: 'Foo',
                    prefix: 'Foo',
                    declaration: {
                        foo: 'bar'
                    }
                },
                {
                    type: 'helper',
                    name: 'Bar',
                    prefix: 'Bar',
                    declaration: {
                        bar: '$0'
                    }
                }
            ]);
            var config = {
                custom: {
                    "foo": "10px"
                },
                breakPoints: {
                    sm: '@media(min-width:400px)'
                }
            };
            var expected = [
                '@media(min-width:400px) {',
                '  .D-n--sm {',
                '    display: none;',
                '  }',
                '  .P-foo--sm {',
                '    padding: 10px;',
                '  }',
                '  .Foo\\(\\)--sm {',
                '    foo: bar;',
                '  }',
                '  .Bar\\(10px\\)--sm {',
                '    bar: 10px;',
                '  }',
                '}\n'
            ].join('\n');
            var result = atomizer.getCss(['D-n--sm', 'P-foo--sm', 'Foo()--sm', 'Bar(10px)--sm'], config);
            expect(result).to.equal(expected);
        });
        it ('throws if breakpoints aren\'t valid', function () {
            var atomizer = new Atomizer();
            var config = {
                breakPoints: {
                    sm: '400px'
                }
            };
            expect(function() {
                atomizer.getCss(['D-n--sm'], config);
            }).to.throw();
        });
        it ('throws if breakpoints aren\'t passed as an object', function () {
            var atomizer = new Atomizer();
            var config = {
                breakPoints: '400px'
            };
            expect(function() {
                atomizer.getCss(['D-n--sm'], config);
            }).to.throw();
        });
        it ('returns namespaced css when a namespace is specified in options', function () {
            var atomizer = new Atomizer(null, [
                {
                    type: 'pattern',
                    name: 'color',
                    prefix: 'C-',
                    properties: ['color']
                },
                {
                    type: 'helper',
                    name: 'foo',
                    prefix: 'Foo',
                    declaration: {
                        'font-weight': 'bold'
                    }
                }
            ]);
            var config = {
                custom: {
                    'brand-color': '#400090'
                }
            };
            var expected = [
                '#atomic .C-brand-color {',
                '  color: #400090;',
                '}',
                '.atomic .Foo\\(\\) {',
                '  font-weight: bold;',
                '}\n'
            ].join('\n');
            var result = atomizer.getCss(['C-brand-color', 'Foo()'], config, {namespace: '#atomic', helpersNS: '.atomic'});
            expect(result).to.equal(expected);
        });
        it ('ignores invalid classnames', function () {
            var atomizer = new Atomizer();
            var config = {};
            var expected = '';
            var result = atomizer.getCss(['XXXXX-1'], config);
            expect(result).to.equal(expected);
        });
        it ('warns the user if an ambiguous class is provided and verbose flag is true', function (done) {
            var atomizer = new Atomizer({verbose: true});
            var config = {};
            var expected = '';
            // mock console.warn
            console.temp = console.warn;
            console.warn = function (text) {
                var expected = "Class `C-foo` is ambiguous";
                expect(text).to.contain(expected);
                done();
            };
            var result = atomizer.getCss(['C-foo'], config);
            console.warn = console.temp;
            expect(result).to.equal(expected);
        });
    });
    // -------------------------------------------------------
    // getPseudo()
    // -------------------------------------------------------
    describe('getPseudo()', function () {
        it('returns undefined if undefined has been passed', function () {
            // execute and assert
            expect(Atomizer.getPseudo()).to.be.undefined;
        });
        it('returns non abbreviated form if abbreviated form has been passed', function () {
            // execute and assert
            expect(Atomizer.getPseudo(':h')).to.equal(':hover');
        });
        it('returns non abbreviated form if non abbreviated form has been passed', function () {
            // execute and assert
            expect(Atomizer.getPseudo(':hover')).to.equal(':hover');
        });
    });
    // -------------------------------------------------------
    // escapeSelector()
    // -------------------------------------------------------
    describe('escapeSelector()', function () {
        it('throws if str has not been passed', function () {
            // execute and assert
            expect(function () {
                Atomizer.escapeSelector();
            }).to.throw(TypeError);
        });
        it('returns the original string if the param is not a string', function () {
            // execute and assert
            expect(Atomizer.escapeSelector(123)).to.equal(123);
        });
        it('returns the processed string if passed', function () {
            // execute and assert
            expect(Atomizer.escapeSelector('#atomic .selector-50%')).to.equal('#atomic .selector-50\\%');
            expect(Atomizer.escapeSelector('#atomic .selector-50%/50%')).to.equal('#atomic .selector-50\\%\\/50\\%');
            expect(Atomizer.escapeSelector('#atomic .selector-50%::something')).to.equal('#atomic .selector-50\\%\\:\\:something');
            expect(Atomizer.escapeSelector('#atomic .selector-.50%:.:something')).to.equal('#atomic .selector-\\.50\\%\\:\\.\\:something');
        });
    });
    // -------------------------------------------------------
    // replaceConstants()
    // -------------------------------------------------------
    describe('replaceConstants()', function () {
        it('returns the original string if the param is not a string', function () {
            var obj = {};
            var arr = [];
            // execute and assert
            expect(Atomizer.replaceConstants(123)).to.equal(123);
            expect(Atomizer.replaceConstants(obj)).to.equal(obj);
            expect(Atomizer.replaceConstants(arr)).to.equal(arr);
            expect(Atomizer.replaceConstants(null)).to.equal(null);
            expect(Atomizer.replaceConstants(undefined)).to.equal(undefined);

        });
        it('returns the processed string if passed, in ltr mode', function () {
            // assert
            expect(Atomizer.replaceConstants('test-$START', false)).equal('test-left');
            expect(Atomizer.replaceConstants('test-$END', false)).equal('test-right');
            expect(Atomizer.replaceConstants('test-$START-$END', false)).equal('test-left-right');
        });
        it('returns the processed string if passed, in rtl mode', function () {
            // assert
            expect(Atomizer.replaceConstants('test-$START', true)).equal('test-right');
            expect(Atomizer.replaceConstants('test-$END', true)).equal('test-left');
            expect(Atomizer.replaceConstants('test-$START-$END', true)).equal('test-right-left');
        });
    });
});
