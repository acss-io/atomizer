'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit
  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.atomizer = {
    setUp: function(done) {
        // setup here if necessary
        done();
    },
    noConfigWithParsing: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/noConfigWithParsing.css');
        var expected = grunt.file.read('test/expected/noConfigWithParsing.css');

        test.equal(actual, expected, 'should generate the expected css by passing only the source.');

        test.done();
    },
    configFileOnly: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/configFileOnly.css');
        var expected = grunt.file.read('test/expected/configFileOnly.css');

        test.equal(actual, expected, 'should generate the expected css by passing a configFile only.');

        test.done();
    },
    configGruntOnly: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/configGruntOnly.css');
        var expected = grunt.file.read('test/expected/configGruntOnly.css');

        test.equal(actual, expected, 'should generate the expected css by passing a config directly to grunt only.');

        test.done();
    },
    configBoth: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/configBoth.css');
        var expected = grunt.file.read('test/expected/configBoth.css');

        test.equal(actual, expected, 'should generate the expected css by passing a configFile and a config directly to grunt.');

        test.done();
    },
    configBothWithParsing: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/configBothWithParsing.css');
        var expected = grunt.file.read('test/expected/configBothWithParsing.css');
        var actualConfigOutput = grunt.file.read('tmp/configOutput.json');
        var expectedConfigOutput = grunt.file.read('test/expected/configOutput.json');

        test.equal(actual, expected, 'should generate the expected css by passing a configFile and a config directly to grunt + parsing.');

        test.done();
    },
    configOutputBothWithParsing: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/configOutput.json');
        var expected = grunt.file.read('test/expected/configOutput.json');

        test.equal(actual, expected, 'should generate the expected config JSON output by passing a configFile and a config directly to grunt + parsing.');

        test.done();
    },
    customRules: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/customRuleset.css');
        var expected = grunt.file.read('test/expected/customRuleset.css');

        test.equal(actual, expected, 'should generate the expected css when using a custom ruleset.');

        test.done();
    },
    ie: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/ie.css');
        var expected = grunt.file.read('test/expected/ie.css');

        test.equal(actual, expected, 'should generate the expected css with ie hacks if options is set to true.');

        test.done();
    }
};
