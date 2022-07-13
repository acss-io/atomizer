'use strict';

const {expect} = require('chai');
const Grammar = require('../../src/lib/grammar');

describe('Grammar()', function () {
    // -------------------------------------------------------
    // getPseudo()
    // -------------------------------------------------------
    describe('getPseudo()', function () {
        it('returns undefined if undefined has been passed', function () {
            // execute and assert
            expect(Grammar.getPseudo()).to.be.undefined;
        });
        it('returns non abbreviated form if abbreviated form has been passed', function () {
            // execute and assert
            expect(Grammar.getPseudo(':h')).to.equal(':hover');
            expect(Grammar.getPseudo('::b')).to.equal('::before');
        });
        it('returns non abbreviated form if non abbreviated form has been passed', function () {
            // execute and assert
            expect(Grammar.getPseudo(':hover')).to.equal(':hover');
            expect(Grammar.getPseudo('::before')).to.equal('::before');
        });
    });
    describe('matchValue()', function () {
        it('parses uppercase and lowercase hex', function () {
            expect(Grammar.matchValue('#abc123').groups.hex).to.equal('#abc123');
            expect(Grammar.matchValue('#ABC123').groups.hex).to.equal('#ABC123');
        });
    });
});
