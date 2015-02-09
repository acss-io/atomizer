'use strict';

var chalk = require('chalk'),
    maxmin = require('maxmin');

module.exports = function(grunt) {

    grunt.registerMultiTask('getsassvars', 'Parses a Sass file and transforms it to JSON.', function() {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({}),
            createdFiles = 0;

        this.files.forEach(function(f) {
            var src = f.src.filter(function(filepath) {
                    // Warn on and remove invalid source files (if nonull was set).
                    if (!grunt.file.exists(filepath)) {
                        grunt.log.warn('Source file ' + chalk.cyan(filepath) + ' not found.');
                        return false;
                    } else {
                        return true;
                    }
                })
                .map(grunt.file.read)
                .join(grunt.util.normalizelf(grunt.util.linefeed));

            if (src.length === 0) {
                grunt.log.warn('Destination ' + chalk.cyan(f.dest) + ' not written because src files were empty.');
                return;
            }

            var output = 'module.exports={items:' + JSON.stringify(getSassVars(src)) + '}';

            grunt.file.write(f.dest, output);
            grunt.verbose.writeln('File ' + chalk.cyan(f.dest) + ' created: ' + maxmin(output, output, true));
            createdFiles++;
        });

        if (createdFiles > 0) {
            grunt.log.ok(createdFiles + ' ' + grunt.util.pluralize(this.files.length, 'file/files') + ' created.');
        } else {
            grunt.log.warn('No files created.');
        }

        function getSassVars(src) {
            var match,
                regex = /\$([-_a-zA-Z]+):\s+?(.+);/g,
                out = [];

            src = src.toString();

            while (match = regex.exec(src)) {
                out.push({key: match[1], values: match[2].split(',')});
            }

            return out;
        }

    });
};
