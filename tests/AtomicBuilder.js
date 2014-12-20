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

    // -------------------------------------------------------
    // constructor()
    // -------------------------------------------------------
    describe('constructor()', function () {
        it('should set build object, load atomic objects and config and run', function () {
            var mock = sinon.mock(AtomicBuilder.prototype);

            // mock methods
            mock.expects('loadObjects').once();
            mock.expects('loadConfig').once();
            mock.expects('run').once();

            // execute
            atomicBuilder = new AtomicBuilder([], {});

            // assert
            expect(atomicBuilder.build).to.deep.equal({});
            mock.verify();
        });
    });

    // -------------------------------------------------------
    // loadObjects()
    // -------------------------------------------------------
    describe('loadObjects()', function () {
        it('throws if objs param is empty', function () {
            // execute and assert
            expect(function () {
                AtomicBuilder.prototype.loadObjects();
            }).to.throw(Error);
        });
        it('throws if objs param is not an array', function () {
            // execute and assert
            expect(function () {
                AtomicBuilder.prototype.loadObjects('foo');
            }).to.throw(TypeError);
        });
        it('should store atomic objects', function () {
            var atomicObjs = [{
                type: 'pattern',
                id: 'padding-x',
                name: 'Horizontal padding',
                prefix: '.Px-',
                allowCustom: true,
                properties: ['padding-left', 'padding-right']
            }];

            // stub methods
            sinon.stub(AtomicBuilder.prototype, 'loadConfig');
            sinon.stub(AtomicBuilder.prototype, 'run');

            // execute
            atomicBuilder = new AtomicBuilder(atomicObjs);

            // assert
            expect(atomicBuilder.atomicObjs).to.deep.equal(atomicObjs);
        });
    });

    // -------------------------------------------------------
    // loadConfig()
    // -------------------------------------------------------
    describe('loadConfig()', function () {
        it('throws if objs param is empty', function () {
            // execute and assert
            expect(function () {
                AtomicBuilder.prototype.loadConfig();
            }).to.throw(Error);
        });
        it('throws if objs param is not an array', function () {
            // execute and assert
            expect(function () {
                AtomicBuilder.prototype.loadConfig('foo');
            }).to.throw(TypeError);
        });
        it('should store the config', function () {
            var config = {
                'config': {
                    'namespace': '#atomic',
                    'start': 'left',
                    'end': 'right',
                    'defaults': {
                        'font-size': '16px',
                        'border-color': '#555',
                        'bleed-value': '-10px'
                    }
                },
                'font-weight': {
                    'n': true,
                    'b': true
                }
            };

            // stub methods
            sinon.stub(AtomicBuilder.prototype, 'loadObjects');
            sinon.stub(AtomicBuilder.prototype, 'run');

            // execute
            atomicBuilder = new AtomicBuilder({}, config);

            // assert
            expect(atomicBuilder.configObj).to.deep.equal(config);
        });
    });

    // -------------------------------------------------------
    // flush()
    // -------------------------------------------------------
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

    // -------------------------------------------------------
    // addPatternRules()
    // -------------------------------------------------------
    describe('addPatternRules()', function () {
        // default params to send in tests
        var rules = [
            { suffix: 'foo', values: ['bold'] }
        ];
        var id = 'foo';
        var properties = ['font-weight'];
        var prefix = '.Fw-';
        var isCustom = false;
        var expected = {
            '.Fw-foo': {
                'font-weight': 'bold'
            }
        };

        // tests
        it('throws if `rules` is not an array', function () {
            // execute and assert
            expect(function () {
                AtomicBuilder.prototype.addPatternRules('foo');
            }).to.throw(TypeError);
        });
        it('should return false if `rules` is an array but it is empty', function () {
            // execute and assert
            expect(AtomicBuilder.prototype.addPatternRules([])).to.be.false();
        });
        it('throws if `id` is not a string', function () {
            // execute and assert
            expect(function () {
                AtomicBuilder.prototype.addPatternRules(rules);
            }).to.throw(TypeError);
        });
        it('throws if `properties` is not an array', function () {
            // execute and assert
            expect(function () {
                AtomicBuilder.prototype.addPatternRules(rules, id);
            }).to.throw(TypeError);
        });
        it('throws if `prefix` is not a string', function () {
            // execute and assert
            expect(function () {
                AtomicBuilder.prototype.addPatternRules(rules, id, properties);
            }).to.throw(TypeError);
        });
        it('throws if `suffix` and `values` are not keys of `rules`', function () {
            // execute and assert
            expect(function () {
                var rules = [{}];
                AtomicBuilder.prototype.addPatternRules(rules, id, properties, prefix, isCustom);
            }).to.throw(Error);
        });
        it('throws if `rule.suffix` is not a string', function () {
            // execute and assert
            expect(function () {
                var rules = [{
                    suffix: [],
                    values: []
                }];
                AtomicBuilder.prototype.addPatternRules(rules, id, properties, prefix, isCustom);
            }).to.throw(TypeError);
        });
        it('throws if `rule.values` is not an array', function () {
            // execute and assert
            expect(function () {
                var rules = [{
                    suffix: 'foo',
                    values: 'foo'
                }];
                AtomicBuilder.prototype.addPatternRules(rules, id, properties, prefix, isCustom);
            }).to.throw(TypeError);
        });
        it('throws if configObj is not set in the instance', function () {
            // execute and assert
            expect(function () {
                // stub methods
                sinon.stub(AtomicBuilder.prototype, 'loadConfig');
                sinon.stub(AtomicBuilder.prototype, 'loadObjects');
                sinon.stub(AtomicBuilder.prototype, 'run');

                // execute
                var atomicBuilder = new AtomicBuilder();
                atomicBuilder.addPatternRules(rules, id, properties, prefix);
            }).to.throw(TypeError);
        });
        it('should return false if rule is not custom and it\'s not wanted by the config', function () {
            // stub methods
            sinon.stub(AtomicBuilder.prototype, 'loadConfig');
            sinon.stub(AtomicBuilder.prototype, 'loadObjects');
            sinon.stub(AtomicBuilder.prototype, 'run');

            // execute
            var atomicBuilder = new AtomicBuilder();
            atomicBuilder.configObj = {
                'foo': {
                    'foo': false
                }
            };
            var result = atomicBuilder.addPatternRules(rules, id, properties, prefix);

            // assert
            expect(result).to.be.false();
        });
        it('should add pattern rule to the build object', function () {
            // stub methods
            sinon.stub(AtomicBuilder.prototype, 'loadConfig');
            sinon.stub(AtomicBuilder.prototype, 'loadObjects');
            sinon.stub(AtomicBuilder.prototype, 'run');

            // execute
            var atomicBuilder = new AtomicBuilder();
            atomicBuilder.configObj = {
                'foo': {
                    'foo': true
                }
            };
            var result = atomicBuilder.addPatternRules(rules, id, properties, prefix, isCustom);

            // assert
            expect(atomicBuilder.build).to.deep.equal(expected);
            expect(result).to.be.true();
        });
    });

    // -------------------------------------------------------
    // addRule()
    // -------------------------------------------------------
    describe('addRule()', function () {
        var rule = {
            '.Foo': {
                'font-weight': 'bold'
            }
        };
        var id = 'foo';

        // tests
        it('throws if `rule` is not an object', function () {
            // execute and assert
            expect(function () {
                AtomicBuilder.prototype.addRule('foo');
            }).to.throw(TypeError);
        });
        it('throws if `id` is not a string', function () {
            // execute and assert
            expect(function () {
                AtomicBuilder.prototype.addRule({});
            }).to.throw(TypeError);
        });
        it('throws if configObj is not set in the instance', function () {
            // execute and assert
            expect(function () {
                // stub methods
                sinon.stub(AtomicBuilder.prototype, 'loadConfig');
                sinon.stub(AtomicBuilder.prototype, 'loadObjects');
                sinon.stub(AtomicBuilder.prototype, 'run');

                // execute
                var atomicBuilder = new AtomicBuilder();
                atomicBuilder.addRule(rule, id);
            }).to.throw(TypeError);
        });
        it('should return false rule is not wanted by the config', function () {
            // stub methods
            sinon.stub(AtomicBuilder.prototype, 'loadConfig');
            sinon.stub(AtomicBuilder.prototype, 'loadObjects');
            sinon.stub(AtomicBuilder.prototype, 'run');

            // execute
            var atomicBuilder = new AtomicBuilder();
            atomicBuilder.configObj = {
                'foo': false
            };
            var result = atomicBuilder.addRule(rule, id);

            // assert
            expect(result).to.be.false();
        });
        it('should add rule to the build object', function () {
            // stub methods
            sinon.stub(AtomicBuilder.prototype, 'loadConfig');
            sinon.stub(AtomicBuilder.prototype, 'loadObjects');
            sinon.stub(AtomicBuilder.prototype, 'run');

            // execute
            var atomicBuilder = new AtomicBuilder();
            atomicBuilder.configObj = {
                'foo': true
            };
            var result = atomicBuilder.addRule(rule, id);

            // assert
            expect(result).to.be.true();
        });
    });

    // -------------------------------------------------------
    // getBuild()
    // -------------------------------------------------------
    describe('getBuild()', function () {
        it('throws if configObj is not set in the instance', function () {
            // execute and assert
            expect(function () {
                // stub methods
                sinon.stub(AtomicBuilder.prototype, 'loadConfig');
                sinon.stub(AtomicBuilder.prototype, 'loadObjects');
                sinon.stub(AtomicBuilder.prototype, 'run');

                // execute
                var atomicBuilder = new AtomicBuilder();
                atomicBuilder.getBuild();
            }).to.throw(TypeError);
        });
        it('should return the build with no namespace if none is defined', function () {
            // stub methods
            sinon.stub(AtomicBuilder.prototype, 'loadConfig');
            sinon.stub(AtomicBuilder.prototype, 'loadObjects');
            sinon.stub(AtomicBuilder.prototype, 'run');

            // execute
            var atomicBuilder = new AtomicBuilder();
            atomicBuilder.build = {
                'foo': {
                    'font-weight': 'bold'
                }
            };
            atomicBuilder.configObj = {
                'foo': true
            };
            var result = atomicBuilder.getBuild();

            // assert
            expect(result).to.deep.equal(atomicBuilder.build);
        });
        it('should return the build with namespace if defined', function () {
            // stub methods
            sinon.stub(AtomicBuilder.prototype, 'loadConfig');
            sinon.stub(AtomicBuilder.prototype, 'loadObjects');
            sinon.stub(AtomicBuilder.prototype, 'run');

            // execute
            var atomicBuilder = new AtomicBuilder();
            atomicBuilder.build = {
                'foo': {
                    'font-weight': 'bold'
                }
            };
            atomicBuilder.configObj = {
                config: {
                    namespace: '.baz'
                },
                'foo': true
            };
            var result = atomicBuilder.getBuild();
            var expected = {};
            expected[atomicBuilder.configObj.config.namespace] = atomicBuilder.build;

            // assert
            expect(result).to.deep.equal(expected);
        });
    });

    // -------------------------------------------------------
    // run()
    // -------------------------------------------------------
    describe('run()', function () {
        it('throws if `id` in atomicObj is not a string', function () {
            // execute and assert
            expect(function () {
                // stub methods
                sinon.stub(AtomicBuilder.prototype, 'loadConfig');
                sinon.stub(AtomicBuilder.prototype, 'loadObjects');
                sinon.stub(AtomicBuilder.prototype, 'run');

                // instantiation & setup
                var atomicBuilder = new AtomicBuilder();
                atomicBuilder.atomicObjs = [{}];

                // restore the method we're testing
                AtomicBuilder.prototype.run.restore();

                // execute
                atomicBuilder.run();
            }).to.throw(TypeError);
        });
        it('throws if `type` in atomicObj is not a string', function () {
            // execute and assert
            expect(function () {
                // stub methods
                sinon.stub(AtomicBuilder.prototype, 'loadConfig');
                sinon.stub(AtomicBuilder.prototype, 'loadObjects');
                sinon.stub(AtomicBuilder.prototype, 'run');

                // instantiation & setup
                var atomicBuilder = new AtomicBuilder();
                atomicBuilder.atomicObjs = [{
                    id: 'foo'
                }];

                // restore the method we're testing
                AtomicBuilder.prototype.run.restore();

                // execute
                atomicBuilder.run();
            }).to.throw(TypeError);
        });

        // -------------------------------------------------------
        // type: pattern
        // -------------------------------------------------------
        describe('type: `pattern`', function () {
            it('throws if `properties` in atomicObj is not an array', function () {
                // execute and assert
                expect(function () {
                    // stub methods
                    sinon.stub(AtomicBuilder.prototype, 'loadConfig');
                    sinon.stub(AtomicBuilder.prototype, 'loadObjects');
                    sinon.stub(AtomicBuilder.prototype, 'run');

                    // instantiation & setup
                    var atomicBuilder = new AtomicBuilder();
                    atomicBuilder.atomicObjs = [{
                        id: 'foo',
                        type: 'pattern'
                    }];

                    // restore the method we're testing
                    AtomicBuilder.prototype.run.restore();

                    // execute
                    atomicBuilder.run();
                }).to.throw(TypeError);
            });
            it('throws if `prefix` in atomicObj is not a String', function () {
                // execute and assert
                expect(function () {
                    // stub methods
                    sinon.stub(AtomicBuilder.prototype, 'loadConfig');
                    sinon.stub(AtomicBuilder.prototype, 'loadObjects');
                    sinon.stub(AtomicBuilder.prototype, 'run');

                    // instantiation & setup
                    var atomicBuilder = new AtomicBuilder();
                    atomicBuilder.atomicObjs = [{
                        id: 'foo',
                        type: 'pattern',
                        properties: ['font-weight']
                    }];

                    // restore the method we're testing
                    AtomicBuilder.prototype.run.restore();

                    // execute
                    atomicBuilder.run();
                }).to.throw(TypeError);
            });
            it('should execute addPatternRules() once if atomicObj is a pattern', function () {
                // stub methods
                sinon.stub(AtomicBuilder.prototype, 'loadConfig');
                sinon.stub(AtomicBuilder.prototype, 'loadObjects');
                sinon.stub(AtomicBuilder.prototype, 'run');

                // instantiation & setup
                var atomicBuilder = new AtomicBuilder();
                var mock = sinon.mock(atomicBuilder);

                // set config and atomicObjs before running
                atomicBuilder.configObj = {
                    'font-weight': {
                        b: true
                    }
                };
                atomicBuilder.atomicObjs = [{
                    type: 'pattern',
                    id: 'font-weight',
                    name: 'Font weight',
                    prefix: '.Fw-',
                    properties: ['font-weight'],
                    rules: [
                        {suffix: 'n', values: ['normal']},
                        {suffix: 'b', values: ['bold']}
                    ]
                }];

                // restore the method we're testing
                AtomicBuilder.prototype.run.restore();

                // set expectations
                mock.expects('addPatternRules').once();

                // execute
                atomicBuilder.run();

                // assert
                mock.verify();
            });
            it('throws if custom has been passed in the config but atomic object does not allow it', function () {
                expect(function () {
                    // stub methods
                    sinon.stub(AtomicBuilder.prototype, 'loadConfig');
                    sinon.stub(AtomicBuilder.prototype, 'loadObjects');
                    sinon.stub(AtomicBuilder.prototype, 'run');

                    // instantiation & setup
                    var atomicBuilder = new AtomicBuilder();

                    // set config and atomicObjs before running
                    atomicBuilder.configObj = {
                        'font-weight': {
                            b: true,
                            custom: [
                                { suffix: '100', values: ['100'] }
                            ]
                        }
                    };
                    atomicBuilder.atomicObjs = [{
                        type: 'pattern',
                        id: 'font-weight',
                        name: 'Font weight',
                        prefix: '.Fw-',
                        properties: ['font-weight'],
                        rules: [
                            {suffix: 'n', values: ['normal']},
                            {suffix: 'b', values: ['bold']}
                        ]
                    }];

                    // restore the method we're testing
                    AtomicBuilder.prototype.run.restore();

                    // execute
                    atomicBuilder.run();
                }).to.throw(Error);
            });
            it('throws if custom has been passed in the config AND it is allowed, but it\'s not an array', function () {
                expect(function () {
                    // stub methods
                    sinon.stub(AtomicBuilder.prototype, 'loadConfig');
                    sinon.stub(AtomicBuilder.prototype, 'loadObjects');
                    sinon.stub(AtomicBuilder.prototype, 'run');

                    // instantiation & setup
                    var atomicBuilder = new AtomicBuilder();

                    // set config and atomicObjs before running
                    atomicBuilder.configObj = {
                        'font-weight': {
                            b: true,
                            custom: 'not an array'
                        }
                    };
                    atomicBuilder.atomicObjs = [{
                        type: 'pattern',
                        id: 'font-weight',
                        name: 'Font weight',
                        prefix: '.Fw-',
                        properties: ['font-weight'],
                        allowCustom: true,
                        rules: [
                            {suffix: 'n', values: ['normal']},
                            {suffix: 'b', values: ['bold']}
                        ]
                    }];

                    // restore the method we're testing
                    AtomicBuilder.prototype.run.restore();

                    // execute
                    atomicBuilder.run();
                }).to.throw(TypeError);
            });
            it('should execute addPatternRules() once if atomicObj is a pattern and has custom values on an atomic object that allows custom values', function () {
                // stub methods
                sinon.stub(AtomicBuilder.prototype, 'loadConfig');
                sinon.stub(AtomicBuilder.prototype, 'loadObjects');
                sinon.stub(AtomicBuilder.prototype, 'run');

                // instantiation & setup
                var atomicBuilder = new AtomicBuilder();
                var mock = sinon.mock(atomicBuilder);

                // set config and atomicObjs before running
                atomicBuilder.configObj = {
                    'font-weight': {
                        b: true,
                        custom: [
                            { suffix: '100', values: ['100'] }
                        ]
                    }
                };
                atomicBuilder.atomicObjs = [{
                    type: 'pattern',
                    id: 'font-weight',
                    name: 'Font weight',
                    prefix: '.Fw-',
                    properties: ['font-weight'],
                    allowCustom: true
                }];

                // restore the method we're testing
                AtomicBuilder.prototype.run.restore();

                // set expectations
                mock.expects('addPatternRules').once();

                // execute
                atomicBuilder.run();

                // assert
                mock.verify();
            });
        });

        // -------------------------------------------------------
        // type: rule
        // -------------------------------------------------------
        describe('type: `rule`', function () {
            it('throws if `rule` in atomicObj is not an object', function () {
                // execute and assert
                expect(function () {
                    // stub methods
                    sinon.stub(AtomicBuilder.prototype, 'loadConfig');
                    sinon.stub(AtomicBuilder.prototype, 'loadObjects');
                    sinon.stub(AtomicBuilder.prototype, 'run');

                    // instantiation & setup
                    var atomicBuilder = new AtomicBuilder();
                    atomicBuilder.atomicObjs = [{
                        id: 'foo',
                        type: 'rule'
                    }];

                    // restore the method we're testing
                    AtomicBuilder.prototype.run.restore();

                    // execute
                    atomicBuilder.run();
                }).to.throw(TypeError);
            });
            it('should execute addRule() once if atomicObj is a rule', function () {
                // stub methods
                sinon.stub(AtomicBuilder.prototype, 'loadConfig');
                sinon.stub(AtomicBuilder.prototype, 'loadObjects');
                sinon.stub(AtomicBuilder.prototype, 'run');

                // instantiation & setup
                var atomicBuilder = new AtomicBuilder();
                var mock = sinon.mock(atomicBuilder);

                // set config and atomicObjs before running
                atomicBuilder.configObj = {
                    'foo': true
                };
                atomicBuilder.atomicObjs = [{
                    type: 'rule',
                    id: 'foo',
                    rule: {
                        '.Foo': {
                            'font-weight': 'bold'
                        }
                    }
                }];

                // restore the method we're testing
                AtomicBuilder.prototype.run.restore();

                // set expectations
                mock.expects('addRule').once();

                // execute
                atomicBuilder.run();

                // assert
                mock.verify();
            });
        });
    });
});