'use strict';

module.exports = function (grunt) {
    var Atomize = require('../src/atomize.js');

    grunt.registerMultiTask('acss', 'Grunt plugin to compile atomic.css.', function () {
        var done = this.async();
        var options = this.options();

        if (options.require && options.require.length > 0) {
            options.require = grunt.file.expand(options.require);
        }

        this.files.forEach(function (f) {
            Atomize(f.src, f.rules, options, f.dest, done);
        });

    });
};
