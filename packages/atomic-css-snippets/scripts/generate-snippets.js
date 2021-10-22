var rules = require('atomizer/src/rules');

function replacePlaceholders(str) {
    if (typeof str !== 'string') {
        return str;
    }
    return str.replace('__START__', 'left').replace('__END__', 'right');
}

var snippets = {};
rules.forEach(rule => {
    var styles = Object.keys(rule.styles);
    var style = styles.map(style => {
        return replacePlaceholders(style);
    }).join('');

    var suffix = '<custom-param>';
    if (rule.allowParamToValue) {
        suffix = '<value>';
    }

    snippets[`${rule.matcher}(${suffix})`] = {
        prefix: style,
        body: [
            `${rule.matcher}(\$\{1:${suffix}\})`
        ],
        description: `${rule.matcher}(${suffix})`
    };

    if (rule.arguments && rule.arguments.length) {
        var [args1, args2] = rule.arguments;
        var shortnames = Object.keys(args1);
        shortnames.forEach(shortname => {
            snippets[`${rule.matcher}(${shortname})`] = {
                prefix: `${style}: ` + replacePlaceholders(args1[shortname]),
                body: [
                    `${rule.matcher}(${shortname})`
                ],
                description: `${rule.matcher}(${shortname})`
            };
            if (args2) {
                var shortnames2 = Object.keys(args2);
                shortnames2.forEach(shortname2 => {
                    snippets[`${rule.matcher}(${shortname},${shortname2})`] = {
                        prefix: `${style}: ` + replacePlaceholders(args1[shortname]) + ' ' + replacePlaceholders(args2[shortname2]),
                        body: [
                            `${rule.matcher}(${shortname},${shortname2})`
                        ],
                        description: `${rule.matcher}(${shortname},${shortname2})`
                    };
                });
            }
        });
    }
});
console.log(JSON.stringify(snippets, null, 4));