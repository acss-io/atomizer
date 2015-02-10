'use strict';

var atomizer = require('atomizer');
var path = require('path');

module.exports = function (grunt) {

    grunt.registerMultiTask('atomizer', 'Grunt plugin to execute Atomizer', function () {
        var done = this.async();
        var options = this.options();

        if (options.require && options.require.length > 0) {
            options.require = grunt.file.expand(options.require);
        }

        this.files.forEach(function (f) {
            var content = '';
            f.src.forEach(function (configFile) {
                content += atomizer(require(path.resolve(configFile)), options);
            });
            grunt.file.write(f.dest, content);
        });

        done();
    });
};
