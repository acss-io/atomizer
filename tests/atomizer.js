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
            var result = atomizer.findClassNames('<div class="P-55px H-100% test:h>Op-1:h test:test>Op-1"></div>');
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
            var result = atomizer.getSyntax();

            expect(atomizer.syntax).to.equal(result);
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
            var classNames = ['P-55px', 'H-100%', 'M-a', 'test:h>Op-1:h', 'Op-1'];
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
                '.P-55px {',
                '  padding: 55px;',
                '}\n'
            ].join('\n');
            var result = atomizer.getCss(classNames);
            expect(result).to.equal(expected);
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
            var atomizer = new Atomizer();
            var config = {
                breakPoints: {
                    sm: '@media(min-width:400px)'
                }
            };
            var expected = [
                '@media(min-width:400px) {',
                '  .D-n--sm {',
                '    display: none;',
                '  }',
                '}\n'
            ].join('\n');
            var result = atomizer.getCss(['D-n--sm'], config);
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
});
