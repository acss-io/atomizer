/*globals describe,it,beforeEach,afterEach */
'use strict';

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.use(sinonChai);

var AtomicBuilder = require('../src/lib/AtomicBuilder');
var atomicBuilder;

describe('AtomicBuilder', function () {
    beforeEach(function () {
        
    });
    afterEach(function () {
        // restore original methods
        var methodName, method;
        for(methodName in AtomicBuilder.prototype) {
            method = AtomicBuilder.prototype[methodName];
            if (method.restore) {
                method.restore();
            }
        }
    });
    describe('constructor()', function () {
        it('should set build object, load atomic objects and config and run', function () {
            var mock = sinon.mock(AtomicBuilder.prototype);

            mock.expects('loadObjects').once();
            mock.expects('loadConfig').once();
            mock.expects('run').once();

            atomicBuilder = new AtomicBuilder([], {});

            // assert
            expect(atomicBuilder.build).to.deep.equal({});
            mock.verify();
        });
    });
    describe('loadObjects()', function () {
        it('throws if atomicConfig is not an object', function () {
            expect(function () {
                AtomicBuilder.prototype.loadObjects('foo');
            }).to.throw(TypeError);
        });
        it('should store atomic objects', function () {
            sinon.stub(AtomicBuilder.prototype, 'loadConfig');
            sinon.stub(AtomicBuilder.prototype, 'run');

            atomicBuilder = new AtomicBuilder();
            atomicBuilder.loadObjects();
            // console.log(atomicBuilder.atomicObjs);
        });
    });
    describe('loadConfig()', function () {
        it('throws if atomicConfig is not an object', function () {
            expect(function () {
                new AtomicBuilder([], 'foo');
            }).to.throw(TypeError);
        });
    });
    describe('flush()', function () {
        it('should clean build object', function () {
            var atomicBuilder = new AtomicBuilder([], {});
            // set something in the build
            atomicBuilder.build = {
                '.foo': {
                    'font-weight': 'bold'
                }
            };
            // flush it
            atomicBuilder.flush();

            // check if it was flushed
            expect(Object.keys(atomicBuilder.build).length).to.equal(0);
        });
    });
    describe('addPatternRules()', function () {
    });
    describe('addRule()', function () {

    });
    describe('getBuild()', function () {

    });
});