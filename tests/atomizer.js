'use strict';

const { expect } = require('chai');
const Atomizer = require('../src/atomizer');

describe('Atomizer()', function () {
    describe('constructor()', function () {
        it('instantiate without any params', function () {
            const atomizer = new Atomizer();
            expect(atomizer).to.be.an('object');
        });
        it('instantiate with the assigned params', function () {
            const options = {
                verbose: true
            };
            const rules = [{
                type: 'pattern',
                id: 'border',
                name: 'Border',
                matcher: 'Bd',
                styles: {
                    'border': '$0'
                }
            }];
            const atomizer = new Atomizer(options, rules);
            expect(atomizer.rules).to.deep.equal(rules);
            expect(atomizer.verbose).to.equal(true);
        });
    });
    describe('findClassNames()', function () {
        it('returns an array of valid atomic class names', function () {
            const atomizer = new Atomizer();
            // duplicate Pos(r) to make sure we get only one
            const result = atomizer.findClassNames("<div className={classNames('sibling:c+D(n) sibling:c~D(i) Pos(r) Pos(r) Ov(h) H(0) test:h>Op(1):h test:test>Op(1)', 'test-open_Ov(v) test-open_H(a) Cnt(hello)::b Cnt(goodbye)::a}>");
            const expected = ['sibling:c+D(n)', 'sibling:c~D(i)', 'Pos(r)', 'Ov(h)', 'H(0)', 'test:h>Op(1):h', 'test-open_Ov(v)', 'test-open_H(a)', 'Cnt(hello)::b', 'Cnt(goodbye)::a'];
            expect(result).to.deep.equal(expected);
        });
        it('returns an array of valid atomic class names even if there\'s no boundary character for the first found classname', function () {
            const atomizer = new Atomizer();
            const result = atomizer.findClassNames('Pos(r) Ov(h) H(0)');
            const expected = ['Pos(r)', 'Ov(h)', 'H(0)'];
            expect(result).to.deep.equal(expected);
        });
        it('properly resolves custom classnames with hyphen, in custom rules.js', function () {
            const rules = [{
                type: 'pattern',
                name: 'Font Size',
                matcher: 'f-z',
                styles: {
                    'font-size': '$0'
                }
            }];
            const atomizer = new Atomizer();
            atomizer.addRules(rules);
            const result = atomizer.findClassNames('<div class="Fz(RWD-fontSize) f-z(RWD-fontSize)"></div>');
            const expected = ['Fz(RWD-fontSize)', 'f-z(RWD-fontSize)'];
            expect(result).to.deep.equal(expected);
        });
        it('properly finds Atomic classnames inside Dust template conditionals', function () {
            const atomizer = new Atomizer();
            const result = atomizer.findClassNames('<div class="Pos(r) Ov(h) H(0) {?foo}D(n){/foo}"></div>');
            const expected = ['Pos(r)', 'Ov(h)', 'H(0)', 'D(n)'];
            expect(result).to.deep.equal(expected);
        });
        it('able to finds classnames in template literals', function () {
          const atomizer = new Atomizer();
          const result = atomizer.findClassNames('<div class=`Pos(r) Ov(h) H(0) ${foo}`></div>');
          const expected = ['Pos(r)', 'Ov(h)', 'H(0)'];
          expect(result).to.deep.equal(expected);
        });
        it('able to find classnames when unquoted', function () {
            const atomizer = new Atomizer();
            const result = atomizer.findClassNames('<div class=D(n)/>');
            const expected = ['D(n)'];
            expect(result).to.deep.equal(expected);
        });
        it('able not match = unless preceded by class', function () {
            const atomizer = new Atomizer();
            const result = atomizer.findClassNames('foo=D(b);class=D(n)');
            const expected = ['D(n)'];
            expect(result).to.deep.equal(expected);
        });
    });
    describe('addRules()', function () {
        it('throws if a rule with a different definition already exists', function () {
            const rules = [{
                type: 'pattern',
                name: 'Border',
                matcher: 'Bd',
                styles: {
                    'border': '$0'
                }
            }];
            const atomizer = new Atomizer(null, rules);
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
            const rules = [{
                type: 'pattern',
                name: 'Border',
                matcher: 'Bd',
                styles: {
                    'border': '$0'
                }
            }];
            const atomizer = new Atomizer(null, rules);
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
            const atomizer = new Atomizer();
            const myRules = [{
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
            const rules = [{
                type: 'pattern',
                name: 'Border',
                matcher: 'Bd',
                styles: {
                    'border': '$0'
                }
            }];
            const atomizer = new Atomizer(null, rules);
            const syntax = atomizer.getSyntax();
            const result = atomizer.getSyntax();

            expect(syntax).to.equal(result);
        });
        it('returns a new syntax if syntax has changed', function () {
            const rules = [{
                type: 'pattern',
                name: 'Border',
                matcher: 'Bd',
                styles: {
                    'border': '$0'
                }
            }];
            const atomizer = new Atomizer(null, rules);
            const syntax = atomizer.getSyntax();
            atomizer.addRules([{
                type: 'pattern',
                id: 'foo',
                name: 'Foo',
                matcher: 'Foo',
                styles: {
                    'foo': '$0'
                }
            }]);
            const result = atomizer.getSyntax();
            expect(syntax).to.not.equal(result);
        });
    });
    describe('parseConfig()', function () {
        it('returns the expected parsed tree given a config with no options', function () {
            const atomizer = new Atomizer();
            const expected = {
                C: [{
                    className: 'C($FOO)',
                    declarations: {
                        color: 'bar'
                    }
                }]
            };
            const result = atomizer.parseConfig({
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
            const atomizer = new Atomizer();
            const expected = {
                Fl: [{
                    className: 'Fl(start)',
                    declarations: {
                        float: '__START__'
                    }
                }]
            };
            const result = atomizer.parseConfig({
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
            const atomizer = new Atomizer();
            const expected = {};
            const result = atomizer.parseConfig({
                classNames: [
                    'RandomInvalidClass'
                ]
            });
            expect(result).to.deep.equal(expected);
        });

        it('replaces all instances of a given argument', function () {
            const atomizer = new Atomizer({}, [
                {
                    type: 'pattern',
                    name: 'Foo',
                    matcher: 'Foo',
                    allowParamToValue: true,
                    styles: {
                        'foo': '$0 $0 $1 $1'
                    }
                }
            ]);
            const result = atomizer.parseConfig({
                classNames: [
                    'Foo(1px,2px)'
                ]
            });
            expect(result).to.deep.equal({
                Foo: [{
                    className: 'Foo(1px,2px)',
                    declarations: {
                        'foo': '1px 1px 2px 2px'
                    }
                }]
            });
        });

        it('returns proper object with null declarations if invalid class value have been passed', function () {
            const atomizer = new Atomizer();
            const expected = {
                'End': [{
                    'className': 'End(-)',
                    'declarations': null
                }]
            };
            const result = atomizer.parseConfig({
                classNames: [
                    'End(-)'
                ]
            });
            expect(result).to.deep.equal(expected);
        });
    });
    describe('getConfig()', function () {
        it ('returns a valid config object when given classes and no config', function () {
            const atomizer = new Atomizer();
            const classNames = ['P(55px)'];
            const expected = {
                classNames: ['P(55px)']
            };
            let result = atomizer.getConfig(classNames);
            expect(result).to.deep.equal(expected);

            result = atomizer.getConfig(classNames, {});
            expect(result).to.deep.equal(expected);
        });
        it ('returns a valid config object when given classes and existing config', function () {
            const atomizer = new Atomizer();
            const classNames = ['P(55px)', 'D(b)'];
            const existingConfig = {
                custom: {
                    heading: '80px'
                },
                classNames: ['M(10px)', 'D(ib)']
            };
            const expected = {
                custom: {
                    heading: '80px'
                },
                classNames: ['D(b)', 'D(ib)', 'M(10px)', 'P(55px)']
            };
            const result = atomizer.getConfig(classNames, existingConfig);
            expect(result).to.deep.equal(expected);
        });
        it ('returns a valid config object when given no arguments', function () {
            const atomizer = new Atomizer();
            const expected = {
                classNames: []
            };
            const result = atomizer.getConfig();
            expect(result).to.deep.equal(expected);
        });
        it ('should not mutate the argument passed into getConfig', function () {
            const atomizer = new Atomizer();
            const classNames = ['P(55px)', 'D(b)'];
            const existingConfig = {
                custom: {
                    heading: '80px'
                },
                classNames: ['M(10px)', 'D(ib)']
            };
            atomizer.getConfig(classNames, existingConfig);
            expect(existingConfig).to.deep.equal({
                custom: {
                    heading: '80px'
                },
                classNames: ['M(10px)', 'D(ib)']
            });
        });
    });
    describe('getCss()', function () {
        it ('returns expected css for custom classes with break points', function () {
            // set rules here so if helper change, we don't fail the test
            const atomizer = new Atomizer();
            const config = {
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
            const expected = [
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
            const result = atomizer.getCss(config);
            expect(result).to.equal(expected);
        });
        it ('returns expected css for custom classes with break points (Py)', function () {
            // set rules here so if helper change, we don't fail the test
            const atomizer = new Atomizer();
            const config = {
                breakPoints: {
                    sm: '@media screen and (min-width:700px)',
                    md: '@media screen and (min-width:999px)',
                    lg: '@media screen and (min-width:1200px)'
                },
                custom: {
                    'Py($gutter)': {
                        default: '10px',
                        sm: '16px',
                        md: '20px',
                        lg: '24px'
                    }
                },
                classNames: ['Py($gutter)']
            };
            const expected = [
                '.Py\\(\\$gutter\\) {',
                '  padding-top: 10px;',
                '  padding-bottom: 10px;',
                '}',
                '@media screen and (min-width:700px) {',
                '  .Py\\(\\$gutter\\) {',
                '    padding-top: 16px;',
                '    padding-bottom: 16px;',
                '  }',
                '}',
                '@media screen and (min-width:999px) {',
                '  .Py\\(\\$gutter\\) {',
                '    padding-top: 20px;',
                '    padding-bottom: 20px;',
                '  }',
                '}',
                '@media screen and (min-width:1200px) {',
                '  .Py\\(\\$gutter\\) {',
                '    padding-top: 24px;',
                '    padding-bottom: 24px;',
                '  }',
                '}\n'
            ].join('\n');
            const result = atomizer.getCss(config);
            expect(result).to.equal(expected);
        });
        it ('returns expected css for custom classes with break points (Px)', function () {
            // set rules here so if helper change, we don't fail the test
            const atomizer = new Atomizer();
            const config = {
                breakPoints: {
                    sm: '@media screen and (min-width:700px)',
                    md: '@media screen and (min-width:999px)',
                    lg: '@media screen and (min-width:1200px)'
                },
                custom: {
                    'Px($gutter)': {
                        default: '10px',
                        sm: '16px',
                        md: '20px',
                        lg: '24px'
                    }
                },
                classNames: ['Px($gutter)']
            };
            const expected = [
                '.Px\\(\\$gutter\\) {',
                '  padding-left: 10px;',
                '  padding-right: 10px;',
                '}',
                '@media screen and (min-width:700px) {',
                '  .Px\\(\\$gutter\\) {',
                '    padding-left: 16px;',
                '    padding-right: 16px;',
                '  }',
                '}',
                '@media screen and (min-width:999px) {',
                '  .Px\\(\\$gutter\\) {',
                '    padding-left: 20px;',
                '    padding-right: 20px;',
                '  }',
                '}',
                '@media screen and (min-width:1200px) {',
                '  .Px\\(\\$gutter\\) {',
                '    padding-left: 24px;',
                '    padding-right: 24px;',
                '  }',
                '}\n'
            ].join('\n');
            const result = atomizer.getCss(config);
            expect(result).to.equal(expected);
        });
        it ('returns expected css for custom classes with break points with missing breakPoints', function () {
            // set rules here so if helper change, we don't fail the test
            const atomizer = new Atomizer();
            const config = {
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
            const expected = [
                '@media screen and (min-width:700px) {',
                '  .P\\(\\$gutter\\) {',
                '    padding: 16px;',
                '  }',
                '}\n'
            ].join('\n');
            const result = atomizer.getCss(config);
            expect(result).to.equal(expected);
        });
        it ('returns css if colliding helper and atomic rule is used at the same time', function () {
            const atomizer = new Atomizer();
            const config = {
                custom: {
                    '$custom': '1px solid #000'
                },
                classNames: ['Bd($custom)', 'Bd', 'BdT']
            };
            const expected = [
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
            const result = atomizer.getCss(config);
            expect(result).to.equal(expected);
        });
        it ('returns css by reading an array of class names', function () {
            const atomizer = new Atomizer();
            const config = {
                classNames: ['Translate3d(0,0,0)', 'Bd(0)', 'Bd(n)', 'C(red)', 'Cnt(cq):h::b', 'Cnt(oq)::b', 'Px(inh)', 'Trsdu(.3s)', 'sibling:c+D(n)', 'sibling:c~D(i)', 'End(0)', 'Ta(start)', 'Ta(end)', 'Bgc(#fff.4)', 'Bgc(#fff)', 'P(55px)', 'H(100%)', 'M(a)', 'test:h>Op(1):h', 'test:h_Op(1):h', 'Op(1)', 'Op(1)!', 'D(n)!', 'C(#333)', 'C(#333):li', 'Mt(-10px)', 'W(1/3)', 'Bgz(45px)', 'C(#FFF)']
            };
            const expected = [
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
                '.Cnt\\(cq\\)\\:h\\:\\:b:hover::before {',
                '  content: close-quote;',
                '}',
                '.Cnt\\(oq\\)\\:\\:b::before {',
                '  content: open-quote;',
                '}',
                '.sibling:checked + .sibling\\:c\\+D\\(n\\) {',
                '  display: none;',
                '}',
                '.sibling:checked ~ .sibling\\:c\\~D\\(i\\) {',
                '  display: inline;',
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
                '.Translate3d\\(0\\,0\\,0\\) {',
                '  transform: translate3d(0,0,0);',
                '}',
                '.Trsdu\\(\\.3s\\) {',
                '  transition-duration: .3s;',
                '}',
                '.W\\(1\\/3\\) {',
                '  width: 33.3333%;',
                '}\n'
            ].join('\n');
            const result = atomizer.getCss(config);
            expect(result).to.equal(expected);
        });

        it ('returns expected css if media query specificity bump option has been passed', function () {
            const atomizer = new Atomizer();
            const config = {
                breakPoints: {
                    sm: '@media(min-width:400px)'
                },
                classNames: ['C(red)', 'C(red)--sm']
            };
            const expected = [
                '.C\\(red\\) {',
                '  color: red;',
                '}',
                '@media(min-width:400px) {',
                '  .C\\(red\\)--sm[class] {',
                '    color: red;',
                '  }',
                '}\n'
            ].join('\n');
            const result = atomizer.getCss(config, {bumpMQ: true});
            expect(result).to.equal(expected);
        });

        it ('returns expected css if IE option has been passed', function () {
            // set rules here so if helper change, we don't fail the test
            const atomizer = new Atomizer();
            const config = {
                classNames: ['Op(.33)', 'D(ib)', 'Ov(h)', 'Ov(s)', 'Ov(a)']
            };
            const expected = [
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
            const result = atomizer.getCss(config, {ie: true});
            expect(result).to.equal(expected);
        });
        it ('returns expected css of a helper class', function () {
            // set rules here so if helper change, we don't fail the test
            const atomizer = new Atomizer(null, [
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
            const config = {
                classNames: ['Foo(1,10px)', 'Foo(2,30px)', 'Foo(2,30px)!', 'Bar', 'Bar!', 'Baz']
            };
            const expected = [
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
            const result = atomizer.getCss(config);
            expect(result).to.equal(expected);
        });
        it ('returns expected css value declared in custom', function () {
            const atomizer = new Atomizer();
            const config = {
                custom: {
                    '$some-color': '#000000',
                    'brand-color': '#400090',
                    'End(test)': '300px'
                },
                classNames: ['C($some-color)', 'C(brand-color)', 'C(custom)', 'End(test)']
            };
            const expected = [
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
            const result = atomizer.getCss(config);
            expect(result).to.equal(expected);
        });
        it ('returns expected css value declared in custom as prop + value', function () {
            const atomizer = new Atomizer();
            const config = {
                custom: {
                    'C(brand-color)': '#400090',
                    'Bgc(brand-color)': '#000000'
                },
                classNames: ['C(brand-color)', 'Bgc(brand-color)']
            };
            const expected = [
                '.Bgc\\(brand-color\\) {',
                '  background-color: #000000;',
                '}',
                '.C\\(brand-color\\) {',
                '  color: #400090;',
                '}\n'
            ].join('\n');
            const result = atomizer.getCss(config);
            expect(result).to.equal(expected);
        });
        it ('returns expected css value declared in custom when using numeric keys', function () {
            const atomizer = new Atomizer();
            const config = {
                custom: {
                    '1': '10px solid #ccc'
                },
                classNames: ['Bdt(1)']
            };
            const expected = [
                '.Bdt\\(1\\) {',
                '  border-top: 10px solid #ccc;',
                '}\n'
            ].join('\n');
            const result = atomizer.getCss(config);
            expect(result).to.equal(expected);
        });
        it('returns expected css value declared in custom with variable substitution', function () {
            const atomizer = new Atomizer();
            const config = {
                custom: {
                    '$main-color': '#000000',
                    'brand-color': '#400090',
                    'my-gradient': 'linear-gradient(to bottom, #{$main-color}, #{brand-color})'
                },
                classNames: ['Bg(my-gradient)']
            };
            const expected = [
                '.Bg\\(my-gradient\\) {',
                '  background: linear-gradient(to bottom, #000000, #400090);',
                '}\n'
            ].join('\n');
            const result = atomizer.getCss(config);
            expect(result).to.equal(expected);
        });
        it('returns expected css value declared in custom with nested variable substitution', function () {
            const atomizer = new Atomizer();
            const config = {
                custom: {
                    'black': '#000000',
                    '$main-color': '#{black}',
                    'brand-color': '#400090',
                    'my-gradient': 'linear-gradient(to bottom, #{$main-color}, #{brand-color})'
                },
                classNames: ['Bg(my-gradient)']
            };
            const expected = [
                '.Bg\\(my-gradient\\) {',
                '  background: linear-gradient(to bottom, #000000, #400090);',
                '}\n'
            ].join('\n');
            const result = atomizer.getCss(config);
            expect(result).to.equal(expected);
        });
        it('avoids infinite loops in custom with nested variable substitution', function () {
            const atomizer = new Atomizer();
            const config = {
                custom: {
                    'black': '#{$main-color}',
                    '$main-color': '#{black}',
                    'brand-color': '#400090',
                    'my-gradient': 'linear-gradient(to bottom, #{$main-color}, #{brand-color})'
                },
                classNames: ['Bg(my-gradient)']
            };
            expect(function () { atomizer.getCss(config); }).to.throw();
        });
        it ('returns expected css value with breakpoints', function () {
            const atomizer = new Atomizer(null, [
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
            const config = {
                custom: {
                    'foo': '10px'
                },
                breakPoints: {
                    '2xs': '@media(min-width:300px)',
                    sm: '@media(min-width:400px)'
                },
                classNames: ['D(n)--sm', 'P(foo)--sm', 'Foo--2xs', 'Bar(10px)--sm']
            };
            const expected = [
                '@media(min-width:300px) {',
                '  .Foo--2xs {',
                '    foo: bar;',
                '  }',
                '}',
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
                '}\n'
            ].join('\n');
            const result = atomizer.getCss(config);
            expect(result).to.equal(expected);
        });
        it ('throws if breakpoints aren\'t valid', function () {
            const atomizer = new Atomizer();
            const config = {
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
            const atomizer = new Atomizer();
            const config = {
                breakPoints: '400px',
                classNames: ['D(n)--sm']
            };
            expect(function() {
                atomizer.getCss(config);
            }).to.throw();
        });
        it ('returns namespaced css when a namespace is specified in options', function () {
            const atomizer = new Atomizer(null, [
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
            const config = {
                custom: {
                    'brand-color': '#400090'
                },
                classNames: ['parent_D(n)', 'D(n)', 'parent_C(brand-color)', 'C(brand-color)', 'parent_Foo', 'Foo']
            };
            // make sure parent selectors and helpers don't have the namespace
            // helpers should have their own namespace and parent should not have any
            const expected = [
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
            const result = atomizer.getCss(config, {namespace: '#atomic', helpersNamespace: '.atomic'});
            expect(result).to.equal(expected);
        });
        it ('ignores invalid classnames', function () {
            const atomizer = new Atomizer();
            const config = {
                classNames: ['XXXXX(1)']
            };
            const expected = '';
            const result = atomizer.getCss(config);
            expect(result).to.equal(expected);
        });
        it ('ignores classnames with invalid arguments', function () {
            const atomizer = new Atomizer();
            const config = {
                classNames: ['P(F,0,V)']
            };
            const expected = '';
            const result = atomizer.getCss(config);
            expect(result).to.equal(expected);
        });
        it ('warns the user if an ambiguous class is provided and verbose flag is true', function (done) {
            const atomizer = new Atomizer({verbose: true});
            const config = {
                classNames: ['C(foo)']
            };
            const expected = '';
            // mock console.warn
            console.temp = console.warn;
            console.warn = function (text) {
                const expected = 'Class `C(foo)` is ambiguous';
                expect(text).to.contain(expected);
                done();
            };
            const result = atomizer.getCss(config);
            console.warn = console.temp;
            expect(result).to.equal(expected);
        });
        it ('does not fail if no classnames are passed', function () {
            const atomizer = new Atomizer();
            const config = {
            };
            const expected = '';
            const result = atomizer.getCss(config);
            expect(result).to.equal(expected);
        });
        it ('properly handles classnames with optional arguments', function () {
            const atomizer = new Atomizer();
            const config = {
                classNames: ['Skew(90deg)', 'Skew(90deg,45deg)', 'Bdsp(1em)', 'Bdsp(2em,33%)']
            };
            const expected = [
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
            const result = atomizer.getCss(config);
            expect(result).to.equal(expected);
        });
        it ('has basic suppport for css variables', function () {
            const atomizer = new Atomizer();
            const config = {
                classNames: [
                    'C(--brand-color)'
                ]
            };
            const expected = [
                '.C\\(--brand-color\\) {',
                '  color: var(--brand-color);',
                '}\n'
            ].join('\n');
            const result = atomizer.getCss(config);
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
            const obj = {};
            const arr = [];
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
    // -------------------------------------------------------
    // sortCSS()
    // -------------------------------------------------------
    describe('sortCSS', function () {
        it('should return correct pseudo class name order', function () {
            const atomizer = new Atomizer();
            const classNames = [
                'D(b)',
                'C(#fff):li',
                'Op(1):h',
                'C(#000):a',
                'C(#123):vi',
                'P(20px)',
                'Mb(10px)',
                'T(0)',
                'Scale(200%):f'
            ];

            expect(atomizer.sortCSS(classNames)).to.deep.equal([
                'C(#fff):li',
                'C(#123):vi',
                'C(#000):a',
                'D(b)',
                'Mb(10px)',
                'Op(1):h',
                'P(20px)',
                'Scale(200%):f',
                'T(0)'
            ]);
        });

        it('if two same pseudo class name found, sort by alphabetical order', function () {
            const atomizer = new Atomizer();
            const classNames = [
                'T(0):f',
                'C(#fff):f'
            ];
            expect(atomizer.sortCSS(classNames)).to.deep.equal([
                'C(#fff):f',
                'T(0):f'
            ]);
        });

        it('class without pseduo class should sort by by alphabetical order', function () {
            const atomizer = new Atomizer();
            const classNames = [
                'active_D(f)',
                'active_D(n)',
                'active_Op(0)',
                'active_Op(1)',
                'active_Ta(start)',
                'foo:h_Fill(#fff)',
                'c_Bgi(n)!',
                'h_TranslateY(-100%)--s',
                'l:h_Fill($c-disabled)',
                'm:h_Op(1)',
                'm:f_Op(1)',
                'o_Pe(a)',
                'p:h_Fill(#fff)',
                'p:h_Fill(#000)',
                'pc:h_Fill(#fff)',
                'p_Bdbc(t)',
                'p:h>Bdbc(pink)',
                'p:h>C(pink)',
                'r_Z(0)',
                's:h_Fill(#fff)'
            ];
            expect(atomizer.sortCSS(classNames)).to.deep.equal([
                'active_D(f)',
                'active_D(n)',
                'active_Op(0)',
                'active_Op(1)',
                'active_Ta(start)',
                'c_Bgi(n)!',
                'foo:h_Fill(#fff)',
                'h_TranslateY(-100%)--s',
                'l:h_Fill($c-disabled)',
                'm:f_Op(1)',
                'm:h_Op(1)',
                'o_Pe(a)',
                'p_Bdbc(t)',
                'p:h>Bdbc(pink)',
                'p:h>C(pink)',
                'p:h_Fill(#000)',
                'p:h_Fill(#fff)',
                'pc:h_Fill(#fff)',
                'r_Z(0)',
                's:h_Fill(#fff)'
            ]);
        });
    });
});
