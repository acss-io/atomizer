/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Rules from 'atomizer/src/rules';
import escapeStringRegexp from 'escape-string-regexp';
import { connectToStores } from 'fluxible-addons-react';
import ReferenceStore from '../stores/ReferenceStore';
import stripChars from '../libs/stripChars.mjs';

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

        // automatically add link to MDN
        let moreLink;
        for (const property in recipe.styles) {
            const mdnLink = `https://developer.mozilla.org/en-US/docs/Web/CSS/${property}`;
            moreLink = (
                <a href={mdnLink} className="D(n) logo:h_D(ib) Mstart(10px)" target="_blank" rel="noreferrer">
                    <b className="Hidden">Read {property} docs from mdn</b>
                    <svg width="48" height="14" viewBox="0 0 48 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <title>MDN logo</title>
                        <path d="M20.04 16.512H15.504V10.416C15.504 9.488 15.344 8.824 15.024 8.424C14.72 8.024 14.264 7.824 13.656 7.824C12.92 7.824 12.384 8.064 12.048 8.544C11.728 9.024 11.568 9.64 11.568 10.392V14.184H13.008V16.512H8.472V10.416C8.472 9.488 8.312 8.824 7.992 8.424C7.688 8.024 7.232 7.824 6.624 7.824C5.872 7.824 5.336 8.064 5.016 8.544C4.696 9.024 4.536 9.64 4.536 10.392V14.184H6.6V16.512H0V14.184H1.44V8.04H0.024V5.688H4.536V7.32C5.224 6.088 6.32 5.472 7.824 5.472C8.608 5.472 9.328 5.664 9.984 6.048C10.64 6.432 11.096 7.016 11.352 7.8C11.992 6.248 13.168 5.472 14.88 5.472C15.856 5.472 16.72 5.776 17.472 6.384C18.224 6.992 18.6 7.936 18.6 9.216V14.184H20.04V16.512Z" fill="currentColor"></path>
                        <path d="M33.6714 16.512H29.1354V14.496C28.8314 15.12 28.3834 15.656 27.7914 16.104C27.1994 16.536 26.4154 16.752 25.4394 16.752C24.0154 16.752 22.8954 16.264 22.0794 15.288C21.2634 14.312 20.8554 12.984 20.8554 11.304C20.8554 9.688 21.2554 8.312 22.0554 7.176C22.8554 6.04 24.0634 5.472 25.6794 5.472C26.5594 5.472 27.2794 5.648 27.8394 6C28.3994 6.352 28.8314 6.8 29.1354 7.344V2.352H26.9754V0H32.2314V14.184H33.6714V16.512ZM29.1354 11.04V10.776C29.1354 9.88 28.8954 9.184 28.4154 8.688C27.9514 8.176 27.3674 7.92 26.6634 7.92C25.9754 7.92 25.3674 8.176 24.8394 8.688C24.3274 9.2 24.0714 10.008 24.0714 11.112C24.0714 12.152 24.3114 12.944 24.7914 13.488C25.2714 14.032 25.8394 14.304 26.4954 14.304C27.3114 14.304 27.9514 13.96 28.4154 13.272C28.8954 12.584 29.1354 11.84 29.1354 11.04Z" fill="currentColor"></path>
                        <path d="M47.9589 16.512H41.9829V14.184H43.4229V10.416C43.4229 9.488 43.2629 8.824 42.9429 8.424C42.6389 8.024 42.1829 7.824 41.5749 7.824C40.8389 7.824 40.2709 8.056 39.8709 8.52C39.4709 8.968 39.2629 9.56 39.2469 10.296V14.184H40.6869V16.512H34.7109V14.184H36.1509V8.04H34.5909V5.688H39.2469V7.344C39.9669 6.096 41.1269 5.472 42.7269 5.472C43.7509 5.472 44.6389 5.776 45.3909 6.384C46.1429 6.992 46.5189 7.936 46.5189 9.216V14.184H47.9589V16.512Z" fill="currentColor"></path>
                    </svg>
                </a>
            );
        }

        return (
            <div key={`id-${recipe.matcher}`} className={displayclassDefinitions}>
                <header className="Mt(15px) P(10px) logo">
                    <h3 className="D(ib) M(0)" id={stripChars(recipe.name)}>{recipe.name}</h3>
                    {moreLink}
                </header>
                <dl className="M(0) Mstart(20px) P(10px) Pt(0) Ff(m)">{classDefinitions}</dl>
            </div>
        );
    }, this);

    return <div>{items}</div>;
};

export default connectToStores(ReferenceRules, [ReferenceStore], (context) => ({
    store: context.getStore(ReferenceStore).getState(),
}));
