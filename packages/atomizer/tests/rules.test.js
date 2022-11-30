'use strict';

const rules = require('../src/rules');
const Atomizer = require('../src/atomizer');
const atomizer = new Atomizer();

describe('Rules', () => {
    for (const { allowParamToValue, arguments: args, matcher, styles } of rules) {
        const styleNames = Object.keys(styles);

        // loop through each style to build a list of all the possible styles
        for (let s = 0; s < styleNames.length; s++) {
            const classNames = [];

            // parse optional arguments; e.g: [ { k: v }, { k: v }, ... ]
            if (args) {
                const numberOfArguments = args.length;
                // parse classes for the first argument object
                const firstArgumentProps = Object.keys(args[0]);
                for (let x = 0; x < firstArgumentProps.length; x++) {
                    classNames.push(`${matcher}(${firstArgumentProps[x]})`);
                }

                // parse classes for the second argument object
                // we just take the first argument and append each property from second argument object
                if (numberOfArguments > 1) {
                    const secondArgumentProps = Object.keys(args[1]);
                    for (let x = 0; x < secondArgumentProps.length; x++) {
                        classNames.push(`${matcher}(${firstArgumentProps[0]},${secondArgumentProps[x]})`);
                    }
                }
            }

            // if this flag is set, then add an arbitrary unit to the class name
            if (allowParamToValue) {
                classNames.push(`${matcher}(1px)`);
            }

            // handles shorthand classes with no arguments or "param to value" (e.g. Bdy)
            if (!classNames.length) {
                classNames.push(matcher);
            }

            // replace style name if __START__ or __END__ exists
            const styleName = styleNames[s].replace('__START__', 'left').replace('__END__', 'right');

            it(styleName, () => {
                const css = atomizer.getCss({
                    classNames,
                });
                expect(css).toMatchSnapshot();
            });
        }
    }
});
