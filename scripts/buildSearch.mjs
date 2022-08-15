#!/usr/bin/env node

/**
 * This library generates a Lunr full-text search index to be used on the
 * docs site. It finds all Markdown files in `/docs` folder and adds them
 * to the Lunr index. The index is then saved as a JSON file in the docs
 * site to be loaded on demand.
 */

import fs from 'fs';
import glob from 'glob';
import lodash from 'lodash';
import lunr from 'lunr';
import { marked } from 'marked';
import path from 'path';
import shell from 'shelljs';
import stripChars from '../app/libs/stripChars.mjs';

// atomizer rules
import atomizerRules from '../packages/atomizer/src/rules.js';

// consts
const DOCS_PATH = path.join(process.cwd(), 'docs');
const INDEX_DB_FILE = path.join(DOCS_PATH, 'assets', 'lunr.json');
const DESCRIPTION_REGEX = /^description:\s(.*)$/im;

// Find the description from jekyll frontmatter
const findDescription = (str) => {
    const matches = str && str.match(DESCRIPTION_REGEX);
    return matches && matches[1];
};

// docs like `i18n` end up as `I 18 N` after lodash
// formats it. this removes the space
const fixNumeronym = (file) => {
    if (/[A-Z]\s(\d+)\s[A-Z]/.test(file)) {
        file = file.replace(/\s+/g, '');
    }
    return file;
};

const formatTitle = (file) => {
    // remove extension
    file = file.replace('.md', '');

    // split file e.g. dev/ci.md
    const split = file.split('/');

    // some docs don't have categories
    let category = '';
    if (split[1]) {
        category = `${lodash.startCase(split[0])} - `;
    }
    const filename = fixNumeronym(lodash.startCase(split[1] || split[0]));
    return category + filename;
};

// set default options
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    smartLists: true,
    smartypants: false,
});

// used as a look up for doc information against a lunr search query
const docs = {};

// file docs to parse
const pattern = '**/*.md';
const globOpts = {
    cwd: DOCS_PATH,
    ignore: ['**/index.md', '404.md', 'README.md'],
};
const files = glob.sync(pattern, globOpts);

// setup index
const index = lunr(function () {
    console.log('Creating lunr index');
    this.ref('id');
    this.field('title', { boost: 10 });
    this.field('body', { boost: 5 });
    this.field('description', { boost: 3 });
    this.field('permalink');

    // add files to index
    if (files.length) {
        console.log('Generating index...');
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const filepath = path.join(DOCS_PATH, file);
            const markdown = fs.readFileSync(filepath, 'utf-8').split('---');
            const description = findDescription(markdown[1]);
            const body = markdown.slice(2, markdown.length).join('');
            const doc = {
                id: file,
                description,
                title: formatTitle(file),
                body,
                permalink: `/${file.replace('.md', '.html')}`,
            };

            // use marked to generate tokens for snippet generation later
            doc.tokens = marked
                .lexer(body)
                .filter((tokens) => tokens.type === 'html')
                .map((token) => {
                    // parse the markdown and strip tags
                    token.text = marked(token.text).replace(/(<([^>]+)>)/gi, '');
                    return token;
                });

            this.add(doc);
            docs[doc.id] = doc;
        }
    }

    // add rules to index
    for (const rule of atomizerRules) {
        // ignore rules which would confuse users
        if (rule.name.includes('deprecated')) {
            continue;
        }
        const id = stripChars(rule.name);
        const doc = {
            id,
            title: `${rule.matcher}() - ${Object.keys(rule.styles)[0]}: value`,
            body: `${rule.name} - ${rule.matcher}`,
            permalink: `/reference.html#${id}`,
        };
        this.add(doc);
        docs[id] = doc;
    }
});

// save index to file to load in jekyll docs
console.log('Saving index...');
fs.writeFileSync(INDEX_DB_FILE, JSON.stringify({ docs, index: index.toJSON() }));

// copy lunr library to docs site to use in browser
console.log('Copying "lunr.min.js" library to /docs/assets/js...');
shell.exec('cp node_modules/lunr/lunr.min.js docs/assets/js/');
