const chalk = require('chalk');
const fs = require('fs');
const glob = require('glob');
const { minimatch } = require('minimatch');
const path = require('path');
const some = require('lodash/some');
const union = require('lodash/union');

const cwd = process.cwd();
const defaultConfigPath = path.resolve(cwd, 'atomizer.config.js');
const Atomizer = require('./atomizer');

// stub for now and let buildAtomicCss implement based on passed in options
let warn = function () {};

/**
 * Parses and expands an array of file glob patterns
 * @param {string[]} content Array of glob patterns to parse
 * @returns {string[]} Array of file paths
 */
module.exports.findFiles = function (content) {
    if (content && Array.isArray(content)) {
        return content.reduce(function (files, pattern) {
            const found = glob.sync(pattern, { matchBase: true });
            return files.concat(found);
        }, []);
    }
    return [];
};

/**
 * Returns the config object for a given config file path. If not found,
 * returns the default config from cwd() + 'atomizer.config.js'
 * @param {string} configFile
 * @returns {import('atomizer').AtomizerConfig} The resolved atomizer config object
 */
module.exports.getConfig = function (configFile) {
    let config = {};
    if (configFile) {
        if (!fs.existsSync(configFile)) {
            console.error(`Configuration file ${chalk.cyan(configFile)} not found.`);
            return config;
        }
        config = require(path.resolve(configFile));
    } else if (fs.existsSync(defaultConfigPath)) {
        config = require(defaultConfigPath);
    }
    return config;
};

/**
 * Executes Atomizer on a given set of files, creating an atomic CSS file (if provided) or returning the atomic CSS as a string
 * @param {string[]} files List of files to parse
 * @param {import('atomizer').AtomizerConfig} config Atomizer config object
 * @param {import('atomizer').Options} [options] Additional options
 * @param {function} [done] Optional callback function
 * @return {string} Atomic CSS if no output file is provided
 */
module.exports.buildAtomicCss = function (files, config = {}, options = {}, done) {
    const cssOptions = {
        rtl: options.rtl,
        bumpMQ: options.bumpMq,
    };

    // Options: Namespace
    if (typeof options.namespace !== 'undefined') {
        cssOptions.namespace = options.namespace;
    }

    // Options: Helpers Namespace
    if (typeof options.helpersNamespace !== 'undefined') {
        cssOptions.helpersNamespace = options.helpersNamespace;
    }

    // By default, warn users unless quite is set to true
    if (!options.quiet) {
        warn = function (...args) {
            console.warn.apply(console, args);
        };
    }

    // Instantiate Atomizer
    const atomizer = new Atomizer({ strict: !!options.strict, verbose: !!options.verbose });

    // Custom rulesets
    const rulesFiles = options.rules;
    if (rulesFiles) {
        rulesFiles.forEach(function (rulesFile) {
            if (!fs.existsSync(rulesFile)) {
                console.log(`Rule file ${chalk.cyan(rulesFile)} not found.`);
                return false;
            }
            warn(`Adding rules from ${chalk.cyan(rulesFile)}.`);
            atomizer.addRules(require(path.resolve(rulesFile)));
        });
    }

    // Add additional files, if any, from the watcher
    const classnames = parseFiles({ files, recursive: !!options.recursive, exclude: options.exclude, atomizer });

    // Finalize the config
    config = atomizer.getConfig(classnames, config);

    // Create the CSS
    const content = atomizer.getCss(config, cssOptions);

    // Output the CSS to a file, otherwise return CSS content
    const { outfile } = options;
    if (outfile) {
        fs.readFile(outfile, { encoding: 'utf-8' }, function (err, data) {
            if (data === content) {
                console.log(`Content of ${chalk.cyan(outfile)} has not changed.`);
                done && done();
            } else {
                fs.mkdir(path.dirname(outfile), function () {
                    // Fail silently
                    fs.writeFile(path.resolve(outfile), content, function (err) {
                        if (!err) {
                            console.log(`File ${chalk.cyan(outfile)} updated.`);
                        }
                        done && done(err);
                    });
                });
            }
        });
    } else {
        if (done) {
            return done(null, content);
        }
        return content;
    }
};

/**
 * Give an array of files, parse atomizer classes
 * @param {object} params Options object
 * @param {string[]} params.files List of files paths to parse
 * @param {boolean} [params.recursive] Whether to parse files recursively
 * @param {string} [params.dir] The directory to parse files from
 * @param {string[]} [params.exclude] List of files to exclude
 * @param {import('atomizer').default} params.atomizer The atomizer instance
 * @returns {Array} List of atomizer classes
 */
function parseFiles({ files, recursive, dir, exclude, atomizer }) {
    let classNames = [];

    for (let i = 0, iLen = files.length; i < iLen; i++) {
        classNames = union(classNames, parseFile({ file: files[i], recursive, dir, exclude, atomizer }));
    }

    return classNames;
}

/**
 * Give an array of files, parse atomizer classes
 * @param {object} params Options object
 * @param {string} params.file The file path to parse
 * @param {boolean} [params.recursive] Whether to parse files recursively
 * @param {string} [params.dir] The directory to parse files from
 * @param {string[]} [params.exclude] List of files to exclude
 * @param {import('atomizer').default} params.atomizer The atomizer instance
 * @returns {Array} List of atomizer classes
 */
function parseFile({ file, recursive, dir, exclude, atomizer }) {
    let classNames = [],
        fileContents,
        filepath,
        relative,
        stat;

    if (file) {
        filepath = dir ? path.resolve(dir, file) : path.resolve(file);
        relative = path.relative(cwd, filepath);
        stat = fs.statSync(filepath);

        if (stat.isFile()) {
            let isExcluded = false;
            if (exclude && exclude.length) {
                isExcluded = some(exclude, function excludeFile(value) {
                    return minimatch(filepath, value, { matchBase: true });
                });
            }
            if (!isExcluded) {
                warn(`Parsing file ${chalk.cyan(relative)} for Atomic CSS classes`);
                fileContents = fs.readFileSync(filepath, { encoding: 'utf-8' });
                classNames = atomizer.findClassNames(fileContents);
            } else {
                warn(`Excluding file ${chalk.cyan(relative)} for Atomic CSS classes`);
            }
        } else if (stat.isDirectory()) {
            if (!dir || (dir && recursive)) {
                warn(`Inspecting directory ${chalk.cyan(path.relative(cwd, filepath))}`);
                classNames = parseFiles({
                    files: fs.readdirSync(filepath),
                    recursive,
                    dir: filepath,
                    exclude,
                    atomizer,
                });
            }
        }
    }
    return classNames;
}
