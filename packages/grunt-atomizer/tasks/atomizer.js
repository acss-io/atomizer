'use strict';

var Atomizer = require('atomizer').atomizer;

module.exports = function (grunt) {

    grunt.registerMultiTask('atomizer', 'Grunt plugin to execute Atomizer', function () {
        var done = this.async();
        var options = this.options();

        if (options.require && options.require.length > 0) {
            options.require = grunt.file.expand(options.require);
        }

        this.files.forEach(function (f) {
            Atomizer(f.src, options, f.dest, done);
        });

    });
};
