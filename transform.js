var fs = require('fs');
var rules = require('./src/rules');

rules.forEach(function(rule) {
    if (rule.rules) {
        rule.arguments = {};
        rule.rules.forEach(function (subrule) {
            rule.arguments[subrule.suffix] = subrule.values ? subrule.values.join(' ') : '';
        });
        delete rule.rules;
    }
});

fs.writeFileSync('./src/rules.js', JSON.stringify(rules, null, 4));
// console.log(require('util').inspect(rules, false, null));
