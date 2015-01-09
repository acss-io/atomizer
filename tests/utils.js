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
        it('should return true if hex is valid', function () {
            expect(utils.isHex('#000')).to.be.true;
            expect(utils.isHex('#000000')).to.be.true;
        });
        it('should return false if hex is invalid', function () {
            expect(utils.isHex('#0000')).to.be.false;
            expect(utils.isHex('red')).to.be.false;
            expect(utils.isHex('99')).to.be.false;
        });
    });
    describe('isRgb()', function() {
        it('should return true if rgb is valid', function () {
            expect(utils.isRgb('rgb(0, 255, 1)')).to.be.true;
            expect(utils.isRgb('rgb(0,255,1)')).to.be.true;
            expect(utils.isRgb('rgb( 0, 255, 1 )')).to.be.true;
        });
        it('should return false if rgb is invalid', function () {
            expect(utils.isRgb('rgb(0, 256, 1)')).to.be.false;
            expect(utils.isRgb('rgb(0, 255 1)')).to.be.false;
            expect(utils.isRgb('rgb(1)')).to.be.false;
        });
    });
    describe('isRgba()', function() {
        it('should return true if rgba is valid', function () {
            expect(utils.isRgba('rgba(0, 255, 1, .74)')).to.be.true;
            expect(utils.isRgba('rgba(0,255,1, 1)')).to.be.true;
            expect(utils.isRgba('rgba( 0, 255, 1 , 0.04)')).to.be.true;
            expect(utils.isRgba('rgba( 0, 255, 1 , 1.0)')).to.be.true;
            expect(utils.isRgba('rgba( 0, 255, 1 , 0.0)')).to.be.true;
            expect(utils.isRgba('rgba( 0, 255, 1 , 0.0000004)')).to.be.true;
            expect(utils.isRgba('rgba( 0, 255, 1 , .0)')).to.be.true;
        });
        it('should return false if rgba is invalid', function () {
            expect(utils.isRgba('rgba(0, 256, 1, 0.4)')).to.be.false;
            expect(utils.isRgba('rgba(0, 255, 1)')).to.be.false;
            expect(utils.isRgba('rgba(0, 255 1, .2)')).to.be.false;
            expect(utils.isRgba('rgba(0, 255, 1, 1.1)')).to.be.false;
            expect(utils.isRgba('rgba(0, 255, 1, -1.0)')).to.be.false;
        });
    });
    describe('isHsl()', function() {
        it('should return true if hsl is valid', function () {
            expect(utils.isHsl('hsl(0, 57%, 1%)')).to.be.true;
            expect(utils.isHsl('hsl(0, 57%, 100%)')).to.be.true;
            expect(utils.isHsl('hsl(50,100%,57%)')).to.be.true;
            expect(utils.isHsl('hsl(120,100%,57%)')).to.be.true;
            expect(utils.isHsl('hsl( 359, 57%, 30% )')).to.be.true;
        });
        it('should return false if hsl is invalid', function () {
            expect(utils.isHsl('hsl(360, 100%, 56%)')).to.be.false;
            expect(utils.isHsl('hsl(0, 100%, 56)')).to.be.false;
            expect(utils.isHsl('hsl(-1, 101%, 100%)')).to.be.false;
            expect(utils.isHsl('hsl(0, 50, 100%)')).to.be.false;
            expect(utils.isHsl('hsl(1)')).to.be.false;
        });
    });
    describe('isHsla()', function() {
        it('should return true if hsla is valid', function () {
            expect(utils.isHsla('hsla(0, 100%, 1%, .74)')).to.be.true;
            expect(utils.isHsla('hsla(0, 100%, 57%, .74)')).to.be.true;
            expect(utils.isHsla('hsla(50,100%,57%, 1)')).to.be.true;
            expect(utils.isHsla('hsla(120,100%,57%, 1)')).to.be.true;
            expect(utils.isHsla('hsla(359,100%,57%, 1)')).to.be.true;
            expect(utils.isHsla('hsla( 0, 100%, 57% , 0.04)')).to.be.true;
            expect(utils.isHsla('hsla( 0, 100%, 57% , 1.0)')).to.be.true;
            expect(utils.isHsla('hsla( 0, 100%, 57% , 0.0)')).to.be.true;
            expect(utils.isHsla('hsla( 0, 100%, 57% , 0.0000004)')).to.be.true;
            expect(utils.isHsla('hsla( 0, 100%, 57% , .0)')).to.be.true;
        });
        it('should return false if hsla is invalid', function () {
            expect(utils.isHsla('hsla(360, 100%, 57%, .74)')).to.be.false;
            expect(utils.isHsla('hsla(-1, 100%, 57%, .74)')).to.be.false;
            expect(utils.isHsla('hsla(0, 101%, 57%, .74)')).to.be.false;
            expect(utils.isHsla('hsla(0, 57%, 101%, .74)')).to.be.false;
            expect(utils.isHsla('hsla(0, 100%, 1, 0.4)')).to.be.false;
            expect(utils.isHsla('hsla(0, 100%, 100%)')).to.be.false;
            expect(utils.isHsla('hsla(0, 100% 100%, .2)')).to.be.false;
            expect(utils.isHsla('hsla(0, 100%, 100%, 1.1)')).to.be.false;
            expect(utils.isHsla('hsla(0, 100%, 100%, -1.0)')).to.be.false;
        });
    });
    describe('isColorKeyword()', function() {
        it('should return true if color keyword is valid', function () {
            
            var validKeywords = [
                'transparent',
                'currentColor',

                'aliceblue',
                'antiquewhite',
                'aqua',
                'aquamarine',
                'azure',
                'beige',
                'bisque',
                'black',
                'blanchedalmond',
                'blue',
                'blueviolet',
                'brown',
                'burlywood',
                'cadetblue',
                'chartreuse',
                'chocolate',
                'coral',
                'cornflowerblue',
                'cornsilk',
                'crimson',
                'cyan',
                'darkblue',
                'darkcyan',
                'darkgoldenrod',
                'darkgray',
                'darkgreen',
                'darkgrey',
                'darkkhaki',
                'darkmagenta',
                'darkolivegreen',
                'darkorange',
                'darkorchid',
                'darkred',
                'darksalmon',
                'darkseagreen',
                'darkslateblue',
                'darkslategray',
                'darkslategrey',
                'darkturquoise',
                'darkviolet',
                'deeppink',
                'deepskyblue',
                'dimgray',
                'dimgrey',
                'dodgerblue',
                'firebrick',
                'floralwhite',
                'forestgreen',
                'fuchsia',
                'gainsboro',
                'ghostwhite',
                'gold',
                'goldenrod',
                'gray',
                'green',
                'greenyellow',
                'grey',
                'honeydew',
                'hotpink',
                'indianred',
                'indigo',
                'ivory',
                'khaki',
                'lavender',
                'lavenderblush',
                'lawngreen',
                'lemonchiffon',
                'lightblue',
                'lightcoral',
                'lightcyan',
                'lightgoldenrodyellow',
                'lightgray',
                'lightgreen',
                'lightgrey',
                'lightpink',
                'lightsalmon',
                'lightseagreen',
                'lightskyblue',
                'lightslategray',
                'lightslategrey',
                'lightsteelblue',
                'lightyellow',
                'lime',
                'limegreen',
                'linen',
                'magenta',
                'maroon',
                'mediumaquamarine',
                'mediumblue',
                'mediumorchid',
                'mediumpurple',
                'mediumseagreen',
                'mediumslateblue',
                'mediumspringgreen',
                'mediumturquoise',
                'mediumvioletred',
                'midnightblue',
                'mintcream',
                'mistyrose',
                'moccasin',
                'navajowhite',
                'navy',
                'oldlace',
                'olive',
                'olivedrab',
                'orange',
                'orangered',
                'orchid',
                'palegoldenrod',
                'palegreen',
                'paleturquoise',
                'palevioletred',
                'papayawhip',
                'peachpuff',
                'peru',
                'pink',
                'plum',
                'powderblue',
                'purple',
                'red',
                'rosybrown',
                'royalblue',
                'saddlebrown',
                'salmon',
                'sandybrown',
                'seagreen',
                'seashell',
                'sienna',
                'silver',
                'skyblue',
                'slateblue',
                'slategray',
                'slategrey',
                'snow',
                'springgreen',
                'steelblue',
                'tan',
                'teal',
                'thistle',
                'tomato',
                'turquoise',
                'violet',
                'wheat',
                'white',
                'whitesmoke',
                'yellow',
                'yellowgreen'
            ];

            validKeywords.forEach(function (keyword) {
                expect(utils.isColorKeyword(keyword)).to.be.true;
            });
        });
        it('should return false if color keyword is invalid', function () {
            expect(utils.isColorKeyword('superRandomBrightColor')).to.be.false;
        });
    });
    describe('isColor()', function() {
        it('should return true if color is valid', function () {
            expect(utils.isColor('transparent')).to.be.true;
            expect(utils.isColor('blue')).to.be.true;
            expect(utils.isColor('#000')).to.be.true;
            expect(utils.isColor('#000000')).to.be.true;
            expect(utils.isColor('rgb(244,255,2)')).to.be.true;
            expect(utils.isColor('rgba(244,255,2,.5)')).to.be.true;
            expect(utils.isColor('hsl(120,100%,50%)')).to.be.true;
            expect(utils.isColor('hsla(120,100%,50%,.5)')).to.be.true;
        });
        it('should return false if color is invalid', function () {
            expect(utils.isColor('superRandomBrightColor')).to.be.false;
            expect(utils.isColor('#0000')).to.be.false;
            expect(utils.isColor('rgb(244,256,0)')).to.be.false;
            expect(utils.isColor('rgba(244,255,2,1.5)')).to.be.false;
            expect(utils.isColor('hsl(360,100%,50%)')).to.be.false;
            expect(utils.isColor('hsla(120,101%,50%,.5)')).to.be.false;
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