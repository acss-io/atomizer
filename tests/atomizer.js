/*globals describe,it,afterEach */
'use strict';

var expect = require('chai').expect;
var objectAssign = require('object-assign');

var atomizer = require('../src/atomizer');

// default config
var defaultConfig;

describe('atomizer', function () {
    beforeEach(function () {
        defaultConfig = {
            'config': {
                'namespace': '#atomic',
                'start': 'left',
                'end': 'right',
                'breakPoints': {
                    'sm': '767px',
                    'md': '992px',
                    'lg': '1200px'
                }
            }
        };
    });
    it ('throws if no configuration is provided', function () {
        expect(function () {
            atomizer();
        }).to.throw(Error);
    });
    it ('throws if a config has been passed but with not enough info', function () {
        expect(function () {
            atomizer({
                'config': {}
            });
        }).to.throw(Error);
    });
    it ('imports different absurdjs objects if passed as an option', function () {
        var result = atomizer(defaultConfig, {
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
    it ('should execute even when config is an array', function () {
        var result;
        var config;
        var config1 = {
            'padding': {
                'inh': true
            }
        };
        var config2 = {
            'padding-end': {
                'inh': true
            }
        };
        var expected = [
            '#atomic .P-inh {',
            '  padding: inherit;',
            '}',
            '#atomic .Pend-inh {',
            '  padding-right: inherit;',
            '}',
            ''
        ].join('\n');

        config1 = objectAssign(defaultConfig, config1);
        config2 = objectAssign(defaultConfig, config2);

        config = [config1, config2];

        result = atomizer(config);
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

        result = atomizer(config);

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

        result = atomizer(config);

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

        result = atomizer(config);

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

        result = atomizer(config);

        expect(result).to.equal(expected);
    });
});