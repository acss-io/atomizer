/**
 *   .--.  .---.  .----. .-.   .-..-. .---.  .---.  .----. .----.
 *  / {} \{_   _}/  {}  \|  `.'  || |/  ___}/  ___}{ {__  { {__  
 * /  /\  \ | |  \      /| |\ /| || |\     }\     }.-._} }.-._} }
 * `-'  `-' `-'   `----' `-' ` `-'`-' `---'  `---' `----' `----' 
 * 
 * For more information, read "README.md" or go to:
 * http://acss.io/
 *
 * ----------------------------
 * Quick css glossary:
 *
 * ↓‾‾‾‾‾‾‾‾‾‾‾rule‾‾‾‾‾‾‾‾‾‾‾↓
 * selector { property: value }
 *          ↑̲̲̲declaration̲̲̲↑
 *
 * ----------------------------
 * 
 */

var _ = require('lodash');

var AtomicBuilder = require('./lib/AtomicBuilder.js');
var atomicConfig = require('./atomicConfig.js');
var atomicObjs = require('./atomicObjects.js');

module.exports = function(api) {

    var atomicBuilder = new AtomicBuilder(atomicObjs, atomicConfig);
    var build = atomicBuilder && atomicBuilder.getBuild() || {};

    if (!_.size(build)) {
        throw new Error('Failed to generate CSS. The `build` object is empty.');
    }
    api.add(build);
}