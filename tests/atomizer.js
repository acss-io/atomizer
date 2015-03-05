/*globals describe,it,afterEach */
'use strict';

var expect = require('chai').expect;
var objectAssign = require('object-assign');

var atomizer = require('../src/atomizer');

// default config
var defaultConfig;

describe('createCss()', function () {
    beforeEach(function () {
        defaultConfig = {};
    });
    it ('throws if no configuration is provided', function () {
        expect(function () {
            atomizer.createCSS();
        }).to.throw(Error);
    });
    it ('imports different absurdjs objects if passed as an option', function () {
        var result = atomizer.createCSS(defaultConfig, {
            require: [__dirname + '/fixtures/fz.js']
        });
        var expected = [
            'body {',
            '  margin: 20px;',
            '}',
            ''
        ].join('\n');
        expect(result).to.equal(expected);
    });
    it ('should escape illegal characters', function () {
        var result;
        var config = {
            'height': {
                custom: [
                    {suffix: '55%', values: ['55%']}
                ]
            }
        };
        var expected = [
            '#atomic .H-55\\% {',
            '  height: 55%;',
            '}',
            ''
        ].join('\n');

        config = objectAssign(defaultConfig, config);

        result = atomizer.createCSS(config);

        expect(result).to.equal(expected);
    });
    it ('should return rules within media queries if breakPoints is specified', function () {
        var result;
        var config = {
            display: {
                b: {
                    breakPoints: ['sm', 'md']
                }
            },
            'padding-end': {
                custom: [
                    {suffix: 'foo', values: ['10px'], breakPoints: ['sm', 'md', 'lg']}
                ]
            }
        };
        var expected = [
            '#atomic .D-b {',
            '  display: block;',
            '}',
            '#atomic .Pend-foo {',
            '  padding-right: 10px;',
            '}',
            '@media(min-width:767px) {',
            '  #atomic .D-b--sm {',
            '    display: block;',
            '  }',
            '  #atomic .Pend-foo--sm {',
            '    padding-right: 10px;',
            '  }',
            '}',
            '@media(min-width:992px) {',
            '  #atomic .D-b--md {',
            '    display: block;',
            '  }',
            '  #atomic .Pend-foo--md {',
            '    padding-right: 10px;',
            '  }',
            '}',
            '@media(min-width:1200px) {',
            '  #atomic .Pend-foo--lg {',
            '    padding-right: 10px;',
            '  }',
            '}',
            ''
        ].join('\n');

        config = objectAssign(defaultConfig, config);

        result = atomizer.createCSS(config);

        expect(result).to.equal(expected);
    });
    it ('should return rules in the same order they were declared in rules.js even if config was declared in a different order', function () {
        var result;
        var config = {
            'padding-end': {
                custom: [
                    {suffix: 'foo', values: ['10px']}
                ]
            },
            display: {
                b: true
            }
        };
        var expected = [
            '#atomic .D-b {',
            '  display: block;',
            '}',
            '#atomic .Pend-foo {',
            '  padding-right: 10px;',
            '}',
            ''
        ].join('\n');

        config = objectAssign(defaultConfig, config);

        result = atomizer.createCSS(config);

        expect(result).to.equal(expected);
    });
    it ('should not return a rule if it was set to false in the config', function () {
        var result;
        var config = {
            display: {
                b: false,
                ib: true
            }
        };
        var expected = [
            '#atomic .D-ib {',
            '  display: inline-block;',
            '}',
            ''
        ].join('\n');

        config = objectAssign(defaultConfig, config);

        result = atomizer.createCSS(config);

        expect(result).to.equal(expected);
    });
    // it ('should throw if there\'s nothing to transform into CSS', function () {
    //     var result;
    //     var config = {
    //         display: {
    //             b: false
    //         }
    //     };

    //     expect(function () {
    //         atomizer.createCSS(config, { namespace: '' });
    //     }).to.throw(Error);
    // });
});

describe('parse()', function () {
    it('Properly identifies Atomic classes found in text', function () {
        var result;
        var markup = '<div class="Fake-t Ovs-t Bgo-bb"><span class="Bgo-bb">Foobar</span></div>';
        var classnameObj = {};
        var classnames = atomizer.parse(markup, classnameObj);
        expect(classnames.sort()).to.deep.equal(['Ovs-t', 'Bgo-bb'].sort());
        expect(classnameObj).to.deep.equal({'Bgo-bb': 2, 'Ovs-t': 1});
    });

    it('Properly identifies custom value classes found in text', function () {
        var result;
        var markup = '<div class="Fake-xs Fz-3em Lh-1.2 Z-3 C-07f Bgc-1 M-100%"><span class="P-10px">Foobar</span></div>';
        var classnameObj = {};
        var classnames = atomizer.parse(markup, classnameObj);
        expect(classnames.sort()).to.deep.equal(['Fz-3em','Bgc-1', 'C-07f', "P-10px", "M-100%", 'Lh-1.2', 'Z-3'].sort());
        expect(classnameObj).to.deep.equal({'Fz-3em': 1, 'Bgc-1': 1, 'C-07f': 1, "P-10px": 1, "M-100%": 1, 'Lh-1.2': 1, 'Z-3': 1});
    });
});

describe('getConfig()', function () {
    beforeEach(function () {
        defaultConfig = {
            'border': {
                custom: [
                    {
                        "suffix": "happyblue",
                        "values": [ '#F00' ]
                    },
                    {
                        "suffix": "2",
                        "values": [ '#444' ]
                    }
                ]
            }
        };
    });

    it('should return valid configuration when provided Atomic classnames', function () {
        var config;
        var classNames = ['Bd-1', 'Bd-2', 'Fz-3em', 'Fz-4em', 'Lh-1.2', 'Z-3', 'Bgcp-bb', 'C-07f', "P-10px", "M-100%"];
        var expectedConfig = {
            'background-clip': { bb: true },
            color: {
                custom: [
                    {
                        "suffix": "07f",
                        "values": [ "#07f" ]
                    }
                ]
            },
            padding: {
                custom: [
                    {
                        "suffix": "10px",
                        "values": [ "10px" ]
                    }
                ]
            },
            margin: {
                custom: [
                    {
                        "suffix": "100%",
                        "values": [ "100%" ]
                    }
                ]
            },
            "line-height": {
                custom: [
                    {
                        "suffix": "1.2",
                        "values": [ "1.2" ]
                    }
                ]
            },
            "z-index": {
                custom: [
                    {
                        "suffix": "3",
                        "values": [ "3" ]
                    }
                ]
            },
            "font-size": {
                custom: [
                    {
                        "suffix": "4em",
                        "values": [ "4em" ]
                    },
                    {
                        "suffix": "3em",
                        "values": [ "3em" ]
                    }
                ]
            }
        };

        config = atomizer.getConfig(classNames, {}, true); // To cover a particular use case
        expect(config).to.deep.equal(expectedConfig);

    });

    it('should ignore illegal units of measure', function () {
        var expectedConfig = defaultConfig;
        var config;

        config = atomizer.getConfig(['Bdrs-1foo'], defaultConfig);
        expect(config).to.deep.equal(expectedConfig);

        config = atomizer.getConfig(['Bdrs-foo'], defaultConfig);
        expect(config).to.deep.equal(expectedConfig);
    });

    it('should merge the default config with the newly created config', function () {
        var config;
        var classNames = ['Bd-1', 'Bd-2', 'C-07f', 'Bgcp-bb', 'Fz-3em'];
        var expectedConfig = {
            'background-clip': {
                bb: true
            },
            color: {
                custom: [
                    {
                        "suffix": "07f",
                        "values": [ "#07f" ]
                    }
                ]
            },
            "font-size": {
                custom: [
                    {
                        "suffix": "3em",
                        "values": [ "3em" ]
                    }
                ]
            }
        };

        config = atomizer.getConfig(classNames, defaultConfig);
        expect(config).to.deep.equal(atomizer.mergeConfigs([defaultConfig, expectedConfig]));
    });
});

describe('mergeConfigs()', function () {
    it('should deep merge two config objects', function () {
        var primaryConfig = {
            'background-clip': {
                bb: true
            },
            color: {
                custom: [
                    {
                        "suffix": "07f",
                        "values": [ "#07f" ]
                    }
                ]
            }
        };

        var secondaryConfig = {
            'background-clip': {
                pb: true,
                cb: true
            },
            "padding-top": {
                custom: [
                    {
                        "suffix": "foo",
                        "values": [ "231px" ]
                    }
                ]
            }
        };

        var expectedConfig = {
            'background-clip': {
                bb: true,
                pb: true,
                cb: true
            },
            color: {
                custom: [
                    {
                        "suffix": "07f",
                        "values": [ "#07f" ]
                    }
                ]
            },
            "padding-top": {
                custom: [
                    {
                        "suffix": "foo",
                        "values": [ "231px" ]
                    }
                ]
            }
        };

        var config = atomizer.mergeConfigs([primaryConfig, secondaryConfig]);

        expect(config).to.deep.equal(expectedConfig);
    });
});
