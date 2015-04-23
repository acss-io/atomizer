/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

// external packages
import path from 'path';
import fs from 'fs';
import walk from 'walk';
import marked from 'marked';
import highlight from 'highlight.js';

// constants
const WALKER = walk.walk(path.join(__dirname, '..', 'docs'));

// global
let content = {};

marked.setOptions({
    highlight: (code) => highlight.highlightAuto(code).value
});

WALKER.on('file', (root, fstats, next) => {
    let key = root + '/' + fstats.name;

    fs.readFile(key, function (err, data) {
        if (err) {
            throw new Error('[read file] ' + err);
        }

        let heading = data.toString().split('\n')[0].replace('#', '').trim();

        // strip heading as its outputted via the title property
        let text = data.toString().split('\n').splice(1).join('\n');

        // need to strip folder path to match URL key
        key = key.replace(path.join(__dirname, '..', '..', 'app'), '');


        content[key] = {
            key: key,
            title: heading,
            content: marked(text)
        };

        next();
    });
});

export default {
    name: 'docs',
    read: (req, resource, params, config, callback) => {
        callback(null, content[params.path]);
    }
};
