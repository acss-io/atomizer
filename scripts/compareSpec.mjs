import allProperties from './allProperties.mjs';
import rules from '../packages/atomizer/src/rules.js';

// filter out rules unrecommended
// const crProperties = allProperties.filter(({ status }) => status === 'CR' || status === 'REC');
// console.log(crProperties);

// collect css properties supported by atomizer
const atomizerClasses = rules.reduce((acc, { styles }) => {
    Object.keys(styles).forEach((styleName) => {
        acc[styleName] = true;
    });

    return acc;
}, {});

const missingClasses = new Map();
for (const { property } of allProperties) {
    if (
        !atomizerClasses[property] &&
        !property.includes('border') &&
        !property.includes('padding') &&
        !property.includes('margin')
    ) {
        missingClasses.set(property, true);
    }
}

for (const property of missingClasses.keys()) {
    console.log(property);
}
console.log(missingClasses.size);
