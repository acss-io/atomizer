/* global gtag */

import lunr from 'lunr';

(async function () {
    /*
     * string_score.js: String Scoring Algorithm 0.1.22
     *
     * http://joshaven.com/string_score
     * https://github.com/joshaven/string_score
     *
     * Copyright (C) 2009-2014 Joshaven Potter <yourtech@gmail.com>
     * Special thanks to all of the contributors listed here https://github.com/joshaven/string_score
     * MIT License: http://opensource.org/licenses/MIT
     *
     * Scores a string against another string.
     *    'Hello World'.score('he');         //=> 0.5931818181818181
     *    'Hello World'.score('Hello');    //=> 0.7318181818181818
     */
    function stringScore(string, word, fuzziness) {
        // If the string is equal to the word, perfect match.
        if (string === word) {
            return 1;
        }

        // if it's not a perfect match and is empty return 0
        if (word === '') {
            return 0;
        }

        const lString = string.toLowerCase();
        const strLength = string.length;
        const lWord = word.toLowerCase();
        const wordLength = word.length;

        let charScore;
        let finalScore;
        let fuzzies = 1;
        let fuzzyFactor;
        let idxOf;
        let runningScore = 0;
        let startAt = 0;

        // Cache fuzzyFactor for speed increase
        if (fuzziness) {
            fuzzyFactor = 1 - fuzziness;
        }

        // Walk through word and add up scores.
        // Code duplication occurs to prevent checking fuzziness inside for loop
        if (fuzziness) {
            for (let i = 0; i < wordLength; i += 1) {
                // Find next first case-insensitive match of a character.
                idxOf = lString.indexOf(lWord[i], startAt);

                if (idxOf === -1) {
                    fuzzies += fuzzyFactor;
                } else {
                    if (startAt === idxOf) {
                        // Consecutive letter & start-of-string Bonus
                        charScore = 0.7;
                    } else {
                        charScore = 0.1;

                        // Acronym Bonus
                        // Weighing Logic: Typing the first character of an acronym is as if you
                        // preceded it with two perfect character matches.
                        if (string[idxOf - 1] === ' ') {
                            charScore += 0.8;
                        }
                    }

                    // Same case bonus.
                    if (string[idxOf] === word[i]) {
                        charScore += 0.1;
                    }

                    // Update scores and startAt position for next round of indexOf
                    runningScore += charScore;
                    startAt = idxOf + 1;
                }
            }
        } else {
            for (let i = 0; i < wordLength; i += 1) {
                idxOf = lString.indexOf(lWord[i], startAt);
                if (-1 === idxOf) {
                    return 0;
                }

                if (startAt === idxOf) {
                    charScore = 0.7;
                } else {
                    charScore = 0.1;
                    if (string[idxOf - 1] === ' ') {
                        charScore += 0.8;
                    }
                }
                if (string[idxOf] === word[i]) {
                    charScore += 0.1;
                }
                runningScore += charScore;
                startAt = idxOf + 1;
            }
        }

        // Reduce penalty for longer strings.
        finalScore = (0.5 * (runningScore / strLength + runningScore / wordLength)) / fuzzies;

        if (lWord[0] === lString[0] && finalScore < 0.85) {
            finalScore += 0.15;
        }

        return finalScore;
    }

    /**
     * Generates a list of snippets based on a query
     * @param {String} query Search query
     * @param {Array} tokens
     * @returns {Array} List of snippets
     */
    function getSearchSnippet(query, tokens) {
        // generate a score for each token
        const items = tokens
            .map(({ text }) => ({ score: stringScore(text, query), text }))
            // only use paragraphs with query in it
            .filter(({ score }) => score > 0)
            // sort so highest paragraph is first
            .sort((a, b) => (a.score < b.score ? 1 : -1));

        // snippet so it does not overflow the UI
        return items.length ? items[0].text.slice(0, 150) : '';
    }

    /**
     * Display search results based on a query
     * @param {String} query Search query
     * @param {Array} results
     */
    function displaySearchResults(query, results = []) {
        const resultsCont = document.getElementById('resultsCont');
        const resultsEl = document.getElementById('results');

        // clear previous results
        if (!query || query === '' || !results.length) {
            resultsCont.style.display = 'none';
            resultsCont.innerHTML = '';
        }

        if (results.length) {
            const listClass = 'M(0) List(dc) Lisp(i)';
            const html = [];
            results.forEach((doc) => {
                let snippet = '';
                if (doc.snippet) {
                    // make sure query is highlighted
                    snippet = doc.snippet.replace(query, `<mark class="Fw(b)">${query}</mark>`);
                    snippet = `<p class="M(0) Mstart(18px) Fz(.85rem)">${snippet}</p>`;
                }
                html.push(`<li class="P(10px)"><a href="${doc.permalink}">${doc.title}</a>${snippet}</li>`);
            });
            resultsEl.innerHTML = `<ol class="${listClass}">${html.join('')}</ol>`;
            resultsCont.style.display = 'block';

            // beacon the query
            if (typeof gtag !== 'undefined') {
                gtag?.('event', 'search', { search_term: query }); // eslint-disable-line camelcase
            }
        }
    }

    function debounce(func, timeout = 500){
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }

    /**
     * Search leverages the lunr database created in the `docs/index.js` script.
     * It uses the `fetchr` API to load index on demand. Simple event binding is
     * used to query the index as the input is keyed.
     */
    const search = document.getElementById('search');
    if (search) {
        let index;
        let docs;
        const searchInput = document.getElementById('q');

        const doSearch = function(e) {
            if (e) {
                e.preventDefault();
            }
            const query = searchInput.value;
            if (index && query !== '') {
                const results = index
                    .search(query)
                    .map(function (result) {
                        const doc = docs[result.ref];
                        if (doc.tokens) {
                            doc.snippet = getSearchSnippet(query, doc.tokens);
                        }
                        return doc;
                    })
                    .slice(0, 20);
                return displaySearchResults(query, results);
            }
            displaySearchResults();
        };

        // add event listener to search form
        search.addEventListener('submit', doSearch, false);
        searchInput.addEventListener('keyup', debounce(doSearch), false);
        // hide search results on click outside of search form
        document.addEventListener('click', (e) => {
            if (!search.contains(e.target)) {
                displaySearchResults();
            }
        });
        // if "cmd+k" is pressed, focus on search input
        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.altKey) && e.code === 'KeyK') {
                searchInput.focus();
            }
        });

        // load lunr db
        const LUNR_DB = '/assets/lunr.json';
        const resp = await fetch(LUNR_DB, {
            method: 'GET',
            credentials: 'same-origin',
        });
        const data = await resp.json();
        if (data?.index) {
            index = lunr.Index.load(data.index);
            docs = data.docs; // eslint-disable-line prefer-destructuring
        }
    }
})();
