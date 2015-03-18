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
            var rules = [{
                type: 'pattern',
                id: 'border',
                name: 'Border',
                prefix: '.Bd-',
                properties: ['border']
            }];
            var options = {
                verbose: true
            };
            var atomizer = new Atomizer(rules, options);
            expect(atomizer.rules).to.equal(rules);
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
            var atomizer = new Atomizer(null);
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
            var atomizer = new Atomizer(null);
            var config = {
                breakPoints: {
                    sm: '@media(min-width:400px)'
                }
            };
            var expected = [
                '.D-n--sm {',
                '  display: none;',
                '}\n'
            ].join('\n');
            var result = atomizer.getCss(['D-n--sm'], config);
            // console.log(result);
            // expect(result).to.equal(expected);
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
