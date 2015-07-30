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
                matcher: 'Bd',
                styles: {
                    'border': '$0'
                }
            }];
            var atomizer = new Atomizer(options, rules);
            expect(atomizer.rules).to.deep.equal(rules);
            expect(atomizer.verbose).to.equal(true);
        });
    });
    describe('findClassNames()', function () {
        it('returns an array of valid atomic class names', function () {
            var atomizer = new Atomizer();
            // duplicate Pos(r) to make sure we get only one
            var result = atomizer.findClassNames("<div className={classNames('sibling:c+D(n) Pos(r) Pos(r) Ov(h) H(0) test:h>Op(1):h test:test>Op(1)', 'test-open_Ov(v) test-open_H(a)')}>");
            var expected = ['sibling:c+D(n)', 'Pos(r)', 'Ov(h)', 'H(0)', 'test:h>Op(1):h', 'test-open_Ov(v)', 'test-open_H(a)'];
            expect(result).to.deep.equal(expected);
        });
        it('returns an array of valid atomic class names even if there\'s no boundary character for the first found classname', function () {
            var atomizer = new Atomizer();
            var result = atomizer.findClassNames("Pos(r) Ov(h) H(0)");
            var expected = ['Pos(r)', 'Ov(h)', 'H(0)'];
            expect(result).to.deep.equal(expected);
        });
        it('properly finds Atomic classnames inside Dust template conditionals', function () {
            var atomizer = new Atomizer();
            var result = atomizer.findClassNames('<div class="Pos(r) Ov(h) H(0) {?foo}D(n){/foo}"></div>');
            var expected = ['Pos(r)', 'Ov(h)', 'H(0)', 'D(n)'];
            expect(result).to.deep.equal(expected);
        });
    });
    describe('addRules()', function () {
        it('throws if a rule with a different definition already exists', function () {
            var rules = [{
                type: 'pattern',
                name: 'Border',
                matcher: 'Bd',
                styles: {
                    'border': '$0'
                }
            }];
            var atomizer = new Atomizer(null, rules);
            expect(function() {
                atomizer.addRules([{
                    type: 'pattern',
                    name: 'Border',
                    matcher: 'Bd',
                    styles: {
                        'background-color': '$0'
                    }
                }]);
            }).to.throw();
        });
        it('doesn\'t throw if a rule with the same definition already exists', function () {
            var rules = [{
                type: 'pattern',
                name: 'Border',
                matcher: 'Bd',
                styles: {
                    'border': '$0'
                }
            }];
            var atomizer = new Atomizer(null, rules);
            expect(function() {
                atomizer.addRules([{
                    type: 'pattern',
                    name: 'Border',
                    matcher: 'Bd',
                    styles: {
                        'border': '$0'
                    }
                }]);
            }).to.not.throw();
        });
        it('adds a new rule to the atomizer instance and resets the syntax', function () {
            var atomizer = new Atomizer();
            var myRules = [{
                type: 'pattern',
                name: 'foo',
                matcher: 'Foo',
                styles: {
                    'foo': '$0'
                }
            }];
            atomizer.addRules(myRules);

            expect(atomizer.rules[atomizer.rules.length - 1]).to.deep.equal(myRules[0]);
            expect(atomizer.rulesMap).to.have.ownProperty('Foo');
            expect(atomizer.syntax).to.be.null;
        });
    });
    describe('getSyntax()', function () {
        it('returns the same syntax if syntax has not changed', function () {
            var rules = [{
                type: 'pattern',
                name: 'Border',
                matcher: 'Bd',
                styles: {
                    'border': '$0'
                }
            }];
            var atomizer = new Atomizer(null, rules);
            var syntax = atomizer.getSyntax();
            var result = atomizer.getSyntax();

            expect(syntax).to.equal(result);
        });
        it('returns a new syntax if syntax has changed', function () {
            var rules = [{
                type: 'pattern',
                name: 'Border',
                matcher: 'Bd',
                styles: {
                    'border': '$0'
                }
            }];
            var atomizer = new Atomizer(null, rules);
            var syntax = atomizer.getSyntax();
            atomizer.addRules([{
                type: 'pattern',
                id: 'foo',
                name: 'Foo',
                matcher: 'Foo',
                styles: {
                    'foo': '$0'
                }
            }]);
            var result = atomizer.getSyntax();
            expect(syntax).to.not.equal(result);
        });
    });
    describe('parseConfig()', function () {
        it('returns the expected parsed tree given a config with no options', function () {
            var atomizer = new Atomizer();
            var expected = {
                C: [{
                    className: 'C($FOO)',
                    declarations: {
                        color: 'bar'
                    }
                }]
            };
            var result = atomizer.parseConfig({
                custom: {
                    '$FOO': 'bar'
                },
                classNames: [
                    'C($FOO)'
                ]
            });
            expect(result).to.deep.equal(expected);
        });
        it('returns the expected parsed tree given a config with the exclude key', function () {
            var atomizer = new Atomizer();
            var expected = {
                Fl: [{
                    className: 'Fl(start)',
                    declarations: {
                        float: '__START__'
                    }
                }]
            };
            var result = atomizer.parseConfig({
                classNames: [
                    'Fl(end)',
                    'Fl(start)'
                ],
                exclude: [
                    'Fl(end)'
                ]
            });
            expect(result).to.deep.equal(expected);
        });
        it('returns empty object if invalid class names have been passed', function () {
            var atomizer = new Atomizer();
            var expected = {};
            var result = atomizer.parseConfig({
                classNames: [
                    'RandomInvalidClass'
                ]
            });
            expect(result).to.deep.equal(expected);
        });
    });
    describe('getConfig()', function () {
        it ('returns a valid config object when given classes and no config', function () {
            var atomizer = new Atomizer();
            var classNames = ['P(55px)'];
            var expected = {
                classNames: ['P(55px)']
            };
            var result = atomizer.getConfig(classNames);
            expect(result).to.deep.equal(expected);

            result = atomizer.getConfig(classNames, {});
            expect(result).to.deep.equal(expected);
        });
        it ('returns a valid config object when given classes and existing config', function () {
            var atomizer = new Atomizer();
            var classNames = ['P(55px)', 'D(b)'];
            var existingConfig = {
                custom: {
                    heading: '80px'
                },
                classNames: ['M(10px)', 'D(ib)']
            };
            var expected = {
                custom: {
                    heading: '80px'
                },
                classNames: ['P(55px)', 'D(b)', 'M(10px)', 'D(ib)']
            };
            var result = atomizer.getConfig(classNames, existingConfig);
            expect(result).to.deep.equal(expected);
        });
        it ('returns a valid config object when given no arguments', function () {
            var atomizer = new Atomizer();
            var expected = {
                classNames: []
            };
            var result = atomizer.getConfig();
            expect(result).to.deep.equal(expected);
        });
    });
    describe('getCss()', function () {
        it ('returns expected css for custom classes with break points', function () {
            // set rules here so if helper change, we don't fail the test
            var atomizer = new Atomizer();
            var config = {
                breakPoints: {
                    sm: '@media screen and (min-width:700px)',
                    md: '@media screen and (min-width:999px)',
                    lg: '@media screen and (min-width:1200px)'
                },
                custom: {
                    'P($gutter)': {
                        default: '10px',
                        sm: '16px',
                        md: '20px',
                        lg: '24px'
                    }
                },
                classNames: ['P($gutter)']
            };
            var expected = [
                '.P\\(\\$gutter\\) {',
                '  padding: 10px;',
                '}',
                '@media screen and (min-width:700px) {',
                '  .P\\(\\$gutter\\) {',
                '    padding: 16px;',
                '  }',
                '}',
                '@media screen and (min-width:999px) {',
                '  .P\\(\\$gutter\\) {',
                '    padding: 20px;',
                '  }',
                '}',
                '@media screen and (min-width:1200px) {',
                '  .P\\(\\$gutter\\) {',
                '    padding: 24px;',
                '  }',
                '}\n'
            ].join('\n');
            var result = atomizer.getCss(config);
            expect(result).to.equal(expected);
        });
        it ('returns expected css for custom classes with break points with missing breakPoints', function () {
            // set rules here so if helper change, we don't fail the test
            var atomizer = new Atomizer();
            var config = {
                breakPoints: {
                    sm: '@media screen and (min-width:700px)'
                },
                custom: {
                    'P($gutter)': {
                        sm: '16px',
                        md: '20px',
                        lg: '24px'
                    }
                },
                classNames: ['P($gutter)']
            };
            var expected = [
                '@media screen and (min-width:700px) {',
                '  .P\\(\\$gutter\\) {',
                '    padding: 16px;',
                '  }',
                '}\n'
            ].join('\n');
            var result = atomizer.getCss(config);
            expect(result).to.equal(expected);
        });
        it ('returns css if coliding helper and atomic rule is used at the same time', function () {
            var atomizer = new Atomizer();
            var config = {
                custom: {
                    '$custom': '1px solid #000'
                },
                classNames: ['Bd($custom)', 'Bd', 'BdT']
            };
            var expected = [
                '.Bd\\(\\$custom\\) {',
                '  border: 1px solid #000;',
                '}',
                '.Bd {',
                '  border-width: 1px;',
                '}',
                '.Bd, .BdT {',
                '  border-style: solid;',
                '}',
                '.BdT {',
                '  border-top-width: 1px;',
                '  border-right-width: 0;',
                '  border-bottom-width: 0;',
                '  border-left-width: 0;',
                '}\n'
            ].join('\n');
            var result = atomizer.getCss(config);
            expect(result).to.equal(expected);
        });
        it ('returns css by reading an array of class names', function () {
            var atomizer = new Atomizer();
            var config = {
                classNames: ['Bd(0)', 'Bd(n)', 'C(red)', 'Px(inh)', 'Trsdu(.3s)', 'sibling:c+D(n)', 'End(0)', 'Ta(start)', 'Ta(end)', 'Bgc(#fff.4)', 'Bgc(#fff)', 'P(55px)', 'H(100%)', 'M(a)', 'test:h>Op(1):h', 'test:h_Op(1):h', 'Op(1)', 'Op(1)!', 'D(n)!', 'C(#333)', 'C(#333):li', 'Mt(-10px)', 'W(1/3)', 'Bgz(45px)']
            };
            var expected = [
                '.Bd\\(0\\) {',
                '  border: 0;',
                '}',
                '.Bd\\(n\\) {',
                '  border: none;',
                '}',
                '.Bgc\\(\\#fff\\.4\\) {',
                '  background-color: rgba(255,255,255,.4);',
                '}',
                '.Bgc\\(\\#fff\\) {',
                '  background-color: #fff;',
                '}',
                '.Bgz\\(45px\\) {',
                '  background-size: 45px;',
                '}',
                '.C\\(red\\) {',
                '  color: red;',
                '}',
                '.C\\(\\#333\\) {',
                '  color: #333;',
                '}',
                '.C\\(\\#333\\)\\:li:link {',
                '  color: #333;',
                '}',
                '.sibling:checked + .sibling\\:c\\+D\\(n\\) {',
                '  display: none;',
                '}',
                '.D\\(n\\)\\! {',
                '  display: none !important;',
                '}',
                '.H\\(100\\%\\) {',
                '  height: 100%;',
                '}',
                '.M\\(a\\) {',
                '  margin: auto;',
                '}',
                '.Mt\\(-10px\\) {',
                '  margin-top: -10px;',
                '}',
                '.End\\(0\\) {',
                '  right: 0;',
                '}',
                '.test:hover > .test\\:h\\>Op\\(1\\)\\:h:hover {',
                '  opacity: 1;',
                '}',
                '.test:hover .test\\:h_Op\\(1\\)\\:h:hover {',
                '  opacity: 1;',
                '}',
                '.Op\\(1\\) {',
                '  opacity: 1;',
                '}',
                '.Op\\(1\\)\\! {',
                '  opacity: 1 !important;',
                '}',
                '.P\\(55px\\) {',
                '  padding: 55px;',
                '}',
                '.Px\\(inh\\) {',
                '  padding-left: inherit;',
                '  padding-right: inherit;',
                '}',
                '.Ta\\(start\\) {',
                '  text-align: left;',
                '}',
                '.Ta\\(end\\) {',
                '  text-align: right;',
                '}',
                '.Trsdu\\(\\.3s\\) {',
                '  transition-duration: .3s;',
                '}',
                '.W\\(1\\/3\\) {',
                '  width: 33.3333%;',
                '}\n'
            ].join('\n');
            var result = atomizer.getCss(config);
            expect(result).to.equal(expected);
        });
        it ('returns expected css if IE option has been passed', function () {
            // set rules here so if helper change, we don't fail the test
            var atomizer = new Atomizer();
            var config = {
                classNames: ['Op(.33)', 'D(ib)', 'Ov(h)', 'Ov(s)', 'Ov(a)']
            };
            var expected = [
                '.D\\(ib\\) {',
                '  display: inline-block;',
                '  *display: inline;',
                '}',
                '.D\\(ib\\), .Ov\\(h\\), .Ov\\(s\\), .Ov\\(a\\) {',
                '  zoom: 1;',
                '}',
                '.Op\\(\\.33\\) {',
                '  opacity: .33;',
                '  filter: alpha(opacity=33);',
                '}',
                '.Ov\\(h\\) {',
                '  overflow: hidden;',
                '}',
                '.Ov\\(s\\) {',
                '  overflow: scroll;',
                '}',
                '.Ov\\(a\\) {',
                '  overflow: auto;',
                '}\n'
            ].join('\n');
            var result = atomizer.getCss(config, {ie: true});
            expect(result).to.equal(expected);
        });
        it ('returns expected css of a helper class', function () {
            // set rules here so if helper change, we don't fail the test
            var atomizer = new Atomizer(null, [
                // params
                {
                    type: 'helper',
                    name: 'Foo',
                    matcher: 'Foo',
                    styles: {
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
                    matcher: 'Bar',
                    noParams: true,
                    styles: {
                        'bar': 'foo'
                    }
                },
                // empty
                {
                    type: 'helper',
                    name: 'Baz',
                    matcher: 'Baz',
                    noParams: true,
                    styles: {
                        'baz': 'foo'
                    }
                }
            ]);
            var config = {
                classNames: ['Foo(1,10px)', 'Foo(2,30px)', 'Foo(2,30px)!', 'Bar', 'Bar!', 'Baz']
            };
            var expected = [
                'rule {',
                '  foo: bar;',
                '}',
                '.Foo\\(1\\,10px\\) {',
                '  param0: 1;',
                '  param1: 10px;',
                '}',
                '.Foo\\(2\\,30px\\) {',
                '  param0: 2;',
                '  param1: 30px;',
                '}',
                '.Foo\\(2\\,30px\\)\\! {',
                '  param0: 2 !important;',
                '  param1: 30px !important;',
                '}',
                '.Bar {',
                '  bar: foo;',
                '}',
                '.Bar\\! {',
                '  bar: foo !important;',
                '}',
                '.Baz {',
                '  baz: foo;',
                '}\n'
            ].join('\n');
            var result = atomizer.getCss(config);
            expect(result).to.equal(expected);
        });
        it ('returns expected css value declared in custom', function () {
            var atomizer = new Atomizer();
            var config = {
                custom: {
                    '$some-color': '#000000',
                    'brand-color': '#400090',
                    'End(test)': '300px'
                },
                classNames: ['C($some-color)', 'C(brand-color)', 'C(custom)', 'End(test)']
            };
            var expected = [
                '.C\\(\\$some-color\\) {',
                '  color: #000000;',
                '}',
                '.C\\(brand-color\\) {',
                '  color: #400090;',
                '}',
                '.End\\(test\\) {',
                '  right: 300px;',
                '}\n'
            ].join('\n');
            var result = atomizer.getCss(config);
            expect(result).to.equal(expected);
        });
        it ('returns expected css value declared in custom as prop + value', function () {
            var atomizer = new Atomizer();
            var config = {
                custom: {
                    'C(brand-color)': '#400090',
                    'Bgc(brand-color)': '#000000'
                },
                classNames: ['C(brand-color)', 'Bgc(brand-color)']
            };
            var expected = [
                '.Bgc\\(brand-color\\) {',
                '  background-color: #000000;',
                '}',
                '.C\\(brand-color\\) {',
                '  color: #400090;',
                '}\n'
            ].join('\n');
            var result = atomizer.getCss(config);
            expect(result).to.equal(expected);
        });
        it ('returns expected css value declared in custom when using numeric keys', function () {
            var atomizer = new Atomizer();
            var config = {
                custom: {
                    '1': '10px solid #ccc'
                },
                classNames: ['Bdt(1)']
            };
            var expected = [
                '.Bdt\\(1\\) {',
                '  border-top: 10px solid #ccc;',
                '}\n'
            ].join('\n');
            var result = atomizer.getCss(config);
            expect(result).to.equal(expected);
        });
        it ('returns expected css value with breakpoints', function () {
            var atomizer = new Atomizer(null, [
                {
                    type: 'pattern',
                    name: 'Display',
                    matcher: 'D',
                    styles: {
                         'display': '$0'
                    },
                    arguments: [{
                        'n': 'none'
                    }]
                },
                {
                    type: 'pattern',
                    name: 'Padding (all edges)',
                    matcher: 'P',
                    styles: {
                        'padding': '$0'
                    }
                },
                {
                    type: 'helper',
                    name: 'Foo',
                    matcher: 'Foo',
                    noParams: true,
                    styles: {
                        foo: 'bar'
                    }
                },
                {
                    type: 'helper',
                    name: 'Bar',
                    matcher: 'Bar',
                    styles: {
                        bar: '$0'
                    }
                }
            ]);
            var config = {
                custom: {
                    "foo": "10px"
                },
                breakPoints: {
                    '2xs': '@media(min-width:300px)',
                    sm: '@media(min-width:400px)'
                },
                classNames: ['D(n)--sm', 'P(foo)--sm', 'Foo--2xs', 'Bar(10px)--sm']
            };
            var expected = [
                '@media(min-width:400px) {',
                '  .D\\(n\\)--sm {',
                '    display: none;',
                '  }',
                '  .P\\(foo\\)--sm {',
                '    padding: 10px;',
                '  }',
                '  .Bar\\(10px\\)--sm {',
                '    bar: 10px;',
                '  }',
                '}',
                '@media(min-width:300px) {',
                '  .Foo--2xs {',
                '    foo: bar;',
                '  }',
                '}\n'
            ].join('\n');
            var result = atomizer.getCss(config);
            expect(result).to.equal(expected);
        });
        it ('throws if breakpoints aren\'t valid', function () {
            var atomizer = new Atomizer();
            var config = {
                breakPoints: {
                    sm: '400px'
                },
                classNames: ['D(n)--sm']
            };
            expect(function() {
                atomizer.getCss(config);
            }).to.throw();
        });
        it ('throws if breakpoints aren\'t passed as an object', function () {
            var atomizer = new Atomizer();
            var config = {
                breakPoints: '400px',
                classNames: ['D(n)--sm']
            };
            expect(function() {
                atomizer.getCss(config);
            }).to.throw();
        });
        it ('returns namespaced css when a namespace is specified in options', function () {
            var atomizer = new Atomizer(null, [
                {
                    type: 'pattern',
                    name: 'color',
                    matcher: 'C',
                    noParams: true,
                    styles: {
                        'color': '$0'
                    }
                },
                {
                    type: 'pattern',
                    name: 'display',
                    matcher: 'D',
                    noParams: true,
                    styles: {
                        'display': '$0'
                    },
                    arguments: [{
                        'n': 'none'
                    }]
                },
                {
                    type: 'helper',
                    name: 'foo',
                    matcher: 'Foo',
                    noParams: true,
                    styles: {
                        'font-weight': 'bold'
                    }
                }
            ]);
            var config = {
                custom: {
                    'brand-color': '#400090'
                },
                classNames: ['parent_D(n)', 'D(n)', 'parent_C(brand-color)', 'C(brand-color)', 'parent_Foo', 'Foo']
            };
            // make sure parent selectors and helpers don't have the namespace
            // helpers should have their own namespace and parent should not have any
            var expected = [
                '.parent .parent_C\\(brand-color\\) {',
                '  color: #400090 !important;',
                '}',
                '#atomic .C\\(brand-color\\) {',
                '  color: #400090;',
                '}',
                '.parent .parent_D\\(n\\) {',
                '  display: none !important;',
                '}',
                '#atomic .D\\(n\\) {',
                '  display: none;',
                '}',
                '.parent .parent_Foo, .atomic .Foo {',
                '  font-weight: bold;',
                '}\n'
            ].join('\n');
            var result = atomizer.getCss(config, {namespace: '#atomic', helpersNamespace: '.atomic'});
            expect(result).to.equal(expected);
        });
        it ('ignores invalid classnames', function () {
            var atomizer = new Atomizer();
            var config = {
                classNames: ['XXXXX(1)']
            };
            var expected = '';
            var result = atomizer.getCss(config);
            expect(result).to.equal(expected);
        });
        it ('warns the user if an ambiguous class is provided and verbose flag is true', function (done) {
            var atomizer = new Atomizer({verbose: true});
            var config = {
                classNames: ['C(foo)']
            };
            var expected = '';
            // mock console.warn
            console.temp = console.warn;
            console.warn = function (text) {
                var expected = "Class `C(foo)` is ambiguous";
                expect(text).to.contain(expected);
                done();
            };
            var result = atomizer.getCss(config);
            console.warn = console.temp;
            expect(result).to.equal(expected);
        });
        it ('does not fail if no classnames are passed', function () {
            var atomizer = new Atomizer();
            var config = {
            };
            var expected = '';
            var result = atomizer.getCss(config);
            expect(result).to.equal(expected);
        });
        it ('properly handles classnames with optional arguments', function () {
            var atomizer = new Atomizer();
            var config = {
                classNames: ['Skew(90deg)', 'Skew(90deg,45deg)', 'Bdsp(1em)', 'Bdsp(2em,33%)']
            };
            var expected = [
                '.Bdsp\\(1em\\) {',
                '  border-spacing: 1em;',
                '}',
                '.Bdsp\\(2em\\,33\\%\\) {',
                '  border-spacing: 2em 33%;',
                '}',
                '.Skew\\(90deg\\) {',
                '  transform: skew(90deg);',
                '}',
                '.Skew\\(90deg\\,45deg\\) {',
                '  transform: skew(90deg,45deg);',
                '}\n'
            ].join('\n');
            var result = atomizer.getCss(config);
            expect(result).to.equal(expected);
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
            expect(Atomizer.escapeSelector('#atomic .selector(50%)')).to.equal('#atomic .selector\\(50\\%\\)');
            expect(Atomizer.escapeSelector('#atomic .selector(50%/50%)')).to.equal('#atomic .selector\\(50\\%\\/50\\%\\)');
            expect(Atomizer.escapeSelector('#atomic .selector(50%)::something')).to.equal('#atomic .selector\\(50\\%\\)\\:\\:something');
            expect(Atomizer.escapeSelector('#atomic .selector(.50%):.:something')).to.equal('#atomic .selector\\(\\.50\\%\\)\\:\\.\\:something');
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
            expect(Atomizer.replaceConstants('test-__START__', false)).equal('test-left');
            expect(Atomizer.replaceConstants('test-__END__', false)).equal('test-right');
            expect(Atomizer.replaceConstants('test-__START__-__END__', false)).equal('test-left-right');
        });
        it('returns the processed string if passed, in rtl mode', function () {
            // assert
            expect(Atomizer.replaceConstants('test-__START__', true)).equal('test-right');
            expect(Atomizer.replaceConstants('test-__END__', true)).equal('test-left');
            expect(Atomizer.replaceConstants('test-__START__-__END__', true)).equal('test-right-left');
        });
    });
});
