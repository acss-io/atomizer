'use strict';

module.exports = function (grunt) {
    var Atomizer = require('../src/atomizer.js');

    grunt.registerMultiTask('atomizer', 'Grunt plugin to execute atomizer', function () {
        var done = this.async();
        var options = this.options();

        if (options.require && options.require.length > 0) {
            options.require = grunt.file.expand(options.require);
        }

        this.files.forEach(function (f) {
            Atomizer(f.src, f.rules, options, f.dest, done);
        });

    });
};
