/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

'use strict';

var path = require('path');
var fs = require('fs');
var marked = require('marked');
var highlight = require('highlight.js');

marked.setOptions({
    highlight: (code) => highlight.highlightAuto(code).value
});

module.exports = function (grunt) {

    /**
     * TASKS
     */
    grunt.registerMultiTask('mark', 'Grunt plugin to process markdown files', function () {
        var done = this.async();
        var options = this.options();
        var filterPath = options.filterPath || '';

        this.files.forEach(function (f) {
            if (f.src) {
                f.src.forEach(function (filePath) {
                    var file = grunt.file.exists(filePath) && grunt.file.read(filePath);
                    if (file) {
                        var frontMatterStartIndex = file.indexOf('---');
                        var frontMatterEndIndex = file.indexOf('---', frontMatterStartIndex + 3) + 3;
                        var frontMatter = file.slice(frontMatterStartIndex, frontMatterEndIndex);
                        var outFilePath = f.dest + filePath.replace(filterPath, '');

                        grunt.file.write(outFilePath, frontMatter + "\n\n" + marked(file.slice(frontMatterEndIndex)));
                    }
                });
            }
        }, this);

        done();
    });
};
