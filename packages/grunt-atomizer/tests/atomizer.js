var expect = require('chai').expect;
var grunt = require('grunt');

describe('atomizer', function() {
    it('should generate atomic.css with the default config', function(done) {

        grunt.util.spawn({
            cmd: 'grunt',
            args: ['--gruntfile', __dirname + '/fixtures/default-gruntfile.js', '--base', './']
        }, function() {
            var actual = grunt.file.read('tmp/default-options.css');
            var expected = grunt.file.read('tests/expected/default-options.css');

            expect(actual).to.equal(expected);
            done();
        });
    });
});
