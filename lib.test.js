const lib = require('./lib');


describe('checkKeyword', () => {
    it('return true if any keyword is found in given string', () => {
        expect(lib.checkKeywords(['/copy'], 'body of issue_comment. /copy')).toBe(true);
    });
    it('return false if any keyword is not found', ()=> {
        expect(lib.checkKeywords(['/copy'], 'body of issue_comment.')).toBe(false);
    });
    it('multiple keyword', () => {
        expect(lib.checkKeywords(['/copy', 'COPY'], 'body of issue_comment. copy')).toBe(true);
    });
});