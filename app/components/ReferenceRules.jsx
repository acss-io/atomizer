/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Rules from 'atomizer/src/rules';
import escapeStringRegexp from 'escape-string-regexp';
import { connectToStores } from 'fluxible-addons-react';
import ReferenceStore from '../stores/ReferenceStore';

const styleRegex = new RegExp(/\$(\d+?)/g);

function replaceRTLTokens(str) {
    return str.replace(/__START__/g, 'left').replace(/__END__/g, 'right');
}

function replacePlaceholders(str, values) {
    if (!Array.isArray(values)) {
        values = [values];
    }
    // Map each value to a placeholder
    for (let i = 0; i < values.length; i++) {
        str = str.replace(`$${i}`, values[i]);
    }
    // Use regex to clean up any leftover placeholders
    return str.replace(styleRegex, '');
}

function getValueCount(str) {
    return str.match(styleRegex).length;
}

/**
 * Reference docs for the ruleset
 *
 * @class ReferenceRules
 * @constructor
 */
const ReferenceRules = ({ store }) => {
    let searchRE = false;
    const hasConfig = !!store.customConfigObj;

    if (store.currentQuery) {
        searchRE = new RegExp(escapeStringRegexp(store.currentQuery), 'i');
    }

    const items = Rules.map(function (recipe) {
        const values = [];
        const classDefinitions = [];
        const searching = !!store.currentQuery;
        const prefix = recipe.matcher;
        const usesClass = false;
        let declaration;
        let rawDeclarationBlock = [];
        let styledDeclarationBlock = [];
        let searchTitleMatches = null;
        let showRecipeBlock = false;
        let value;
        let suffix;

        // If config is provided, filter any rules not used in config
        if (hasConfig && !usesClass) {
            return;
        }

        if (searching) {
            searchTitleMatches = recipe.name.search(searchRE) > -1;
        }

        if (recipe.type === 'pattern') {
            if (!hasConfig) {
                let hasMultiValues = false;
                for (let property in recipe.styles) {
                    let propertyStyle = recipe.styles[property];
                    const valueCount = getValueCount(propertyStyle);
                    if (valueCount > 1) {
                        hasMultiValues = true;
                        value = [];
                        for (let vc = 1; vc <= valueCount; vc++) {
                            value.push(`value${vc}`);
                        }
                    } else {
                        value = 'value';
                    }
                    propertyStyle = replaceRTLTokens(replacePlaceholders(propertyStyle, value));
                    property = replaceRTLTokens(property);
                    rawDeclarationBlock.push(`${property}: ${propertyStyle}`);
                    styledDeclarationBlock.push(
                        <div key={propertyStyle}>
                            {property}: <span className="C(#07f)">{propertyStyle}</span>
                        </div>
                    );
                }

                suffix = '<custom-param>';
                if (recipe.allowParamToValue) {
                    suffix = `<value>${hasMultiValues ? '+' : ''} or ${suffix}`;
                }

                values.push({
                    rawSelector: `${prefix}([${suffix}])`,
                    rawDeclaration: rawDeclarationBlock,
                    selector: (
                        <b>
                            {prefix}(<b className="C(#000)">{suffix}</b>)
                        </b>
                    ),
                    declaration: styledDeclarationBlock,
                });

                if (recipe.arguments) {
                    // Reduce the arguments array down to a single object
                    // containing all possible permutations
                    const args = recipe.arguments.reduce(function (prevValue, currentValue) {
                        const obj = {};
                        for (const p in prevValue) {
                            obj[p] = prevValue[p];
                            for (const c in currentValue) {
                                const key = `${p},${c}`;
                                obj[key] = [prevValue[p], currentValue[c]].reduce(function (a, b) {
                                    return a.concat(b);
                                }, []);
                            }
                        }
                        return obj;
                    });

                    for (const paramKey in args) {
                        const selector = `${prefix}(${paramKey})`;
                        const value = args[paramKey];
                        rawDeclarationBlock = [];
                        styledDeclarationBlock = [];
                        for (const property in recipe.styles) {
                            declaration = replaceRTLTokens(
                                `${property}: ${replacePlaceholders(recipe.styles[property], value)}`
                            );
                            rawDeclarationBlock.push(declaration);
                            styledDeclarationBlock.push(<div>{declaration}</div>);
                        }
                        values.push({
                            rawSelector: selector,
                            rawDeclaration: rawDeclarationBlock,
                            selector: <b>{selector}</b>,
                            declaration: styledDeclarationBlock,
                        });
                    }
                }
            } else if (usesClass) {
                // for (let x=0; x < parsedConfig[prefix].length; x++) {
                //     const prefixConfig = parsedConfig[prefix][x];
                //     for (let i=0; i < prefixConfig.values.length; i++) {
                //         const valueObj = prefixConfig.values[i];
                //         rawDeclarationBlock = [];
                //         styledDeclarationBlock = [];
                //         if (valueObj && valueObj.declaration) {
                //             for (let property in valueObj.declaration) {
                //                 declaration = replaceRTLTokens(property + ": " + valueObj.declaration[property]);
                //                 rawDeclarationBlock.push(declaration);
                //                 styledDeclarationBlock.push(<div>{declaration}</div>);
                //             }
                //             values.push({
                //                 rawSelector: prefixConfig.className,
                //                 rawDeclaration: rawDeclarationBlock,
                //                 selector: <b>{prefixConfig.className}</b>,
                //                 declaration: styledDeclarationBlock
                //             });
                //         }
                //     }
                // }
            }

            // Loop through the selectors and generate the actual styles for each
            for (let x = 0; x < values.length; x++) {
                const v = values[x];
                let showRuleset = false;
                if (v.declaration) {
                    // Filter with search
                    if (
                        !searching ||
                        searchTitleMatches ||
                        v.rawSelector.search(searchRE) > -1 ||
                        v.rawDeclaration.join('\n').search(searchRE) > -1
                    ) {
                        showRuleset = true;
                        showRecipeBlock = true;
                    }
                    let termClasses = 'Pend(10px) Fl(start) Cl(start)';
                    let defClasses = 'Fl(start) M(0) P(0) C(#f2438c)';
                    if (!showRuleset) {
                        termClasses += ' D(n)';
                        defClasses += ' D(n)';
                    }
                    classDefinitions.push([
                        <dt key={v.rawSelector} className={termClasses}>
                            {v.selector}
                        </dt>,
                        <dd key={v.rawDeclaration.toString()} className={defClasses}>
                            {v.declaration}
                        </dd>,
                    ]);
                }
            }
        }

        const displayclassDefinitions = `Ov(h) ${showRecipeBlock ? 'D(b)' : 'D(n)'}`;
        return (
            <div key={`id-${recipe.matcher}`} className={displayclassDefinitions}>
                <h3 className="Cl(b) M(0) Mend(20px) Mt(15px) P(10px)">{recipe.name}</h3>
                <dl className="M(0) Mstart(20px) P(10px) Pt(0) Ff(m)">{classDefinitions}</dl>
            </div>
        );
    }, this);

    return <div>{items}</div>;
};

export default connectToStores(ReferenceRules, [ReferenceStore], (context) => ({
    store: context.getStore(ReferenceStore).getState(),
}));
