'use strict';

const Grammar = require('../../src/lib/grammar');

describe('Grammar()', () => {
    // -------------------------------------------------------
    // getPseudo()
    // -------------------------------------------------------
    describe('getPseudo()', () => {
        it('returns undefined if undefined has been passed', () => {
            // execute and assert
            expect(Grammar.getPseudo()).toBeUndefined();
        });
        it('returns non abbreviated form if abbreviated form has been passed', () => {
            // execute and assert
            expect(Grammar.getPseudo(':h')).toBe(':hover');
            expect(Grammar.getPseudo('::b')).toBe('::before');
        });
        it('returns non abbreviated form if non abbreviated form has been passed', () => {
            // execute and assert
            expect(Grammar.getPseudo(':hover')).toBe(':hover');
            expect(Grammar.getPseudo('::before')).toBe('::before');
        });
    });
    describe('matchValue()', () => {
        it('parses uppercase and lowercase hex', () => {
            expect(Grammar.matchValue('#abc123').groups.hex).toBe('#abc123');
            expect(Grammar.matchValue('#ABC123').groups.hex).toBe('#ABC123');
        });
    });
});
