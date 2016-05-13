const assert   = require('assert');
const evConfig = require('../../libs/express-validator-config.js');

describe('Unit: lib/express-validator-config', () => {
  describe('customValidators', () => {
    describe('isUID', () => {
      it('returns true for positive Number', (done) => {
        assert.ok(evConfig.customValidators.isUID(1));
        return done();
      });

      it('returns true for 0 (Number)', (done) => {
        assert.ok(evConfig.customValidators.isUID(0));
        return done();
      });

      it('returns false for positive Float (not Integer)', (done) => {
        assert.ok(!evConfig.customValidators.isUID(1.2));
        return done();
      });
      
      it('returns false for negative Number', (done) => {
        assert.ok(!evConfig.customValidators.isUID(-1));
        return done();
      });
      
      it('returns false for String "qwerty"', (done) => {
        assert.ok(!evConfig.customValidators.isUID('qwerty'));
        return done();
      });
      
      it('returns false for empty String ""', (done) => {
        assert.ok(!evConfig.customValidators.isUID(''));
        return done();
      });
      
      it('returns false for Array with single Number [123]', (done) => {
        assert.ok(!evConfig.customValidators.isUID([123]));
        return done();
      });
      
      it('returns false for Array with String representing a Number ["123"]', (done) => {
        assert.ok(!evConfig.customValidators.isUID(["123"]));
        return done();
      });
      
      it('returns false for empty Array []', (done) => {
        assert.ok(!evConfig.customValidators.isUID([]));
        return done();
      });
      
      it('returns false for empty Object {}', (done) => {
        assert.ok(!evConfig.customValidators.isUID({}));
        return done();
      });

      it('returns false for true', (done) => {
        assert.ok(!evConfig.customValidators.isUID(true));
        return done();
      });

      it('returns false for false', (done) => {
        assert.ok(!evConfig.customValidators.isUID(false));
        return done();
      });
    });

    describe('isProperDeleteId', () => {
      it('returns true for String: :UID+"-"+:UID', (done) => {
        assert.ok(evConfig.customValidators.isProperDeleteId('1-2'));
        return done();
      });
      
      it('returns false for a String with 2 identical UIDs', (done) => {
        assert.ok(!evConfig.customValidators.isProperDeleteId('1-1'));
        return done();
      });

      it('returns false for a String with incorrect UIDs', (done) => {
        assert.ok(!evConfig.customValidators.isProperDeleteId('-1-1'));
        assert.ok(!evConfig.customValidators.isProperDeleteId('1,12-1'));
        assert.ok(!evConfig.customValidators.isProperDeleteId('1.12-1'));
        assert.ok(!evConfig.customValidators.isProperDeleteId('1-1,12'));
        assert.ok(!evConfig.customValidators.isProperDeleteId('1-1.12'));
        assert.ok(!evConfig.customValidators.isProperDeleteId('1-a'));
        assert.ok(!evConfig.customValidators.isProperDeleteId('a-1'));
        return done();
      });

      it('returns false for a String with incorrect number of UIDs', (done) => {
        assert.ok(!evConfig.customValidators.isProperDeleteId('1'));
        assert.ok(!evConfig.customValidators.isProperDeleteId('2-1-3'));
        return done();
      });
      
      it('returns false for not a String', (done) => {
        assert.ok(!evConfig.customValidators.isProperDeleteId(123));
        assert.ok(!evConfig.customValidators.isProperDeleteId([]));
        assert.ok(!evConfig.customValidators.isProperDeleteId(["123-123"]));
        assert.ok(!evConfig.customValidators.isProperDeleteId({}));
        assert.ok(!evConfig.customValidators.isProperDeleteId(true));
        assert.ok(!evConfig.customValidators.isProperDeleteId(false));
        return done();
      });
    });

    describe('notEqual', () => {
      it('returns true for not equal params', (done) => {
        assert.ok(evConfig.customValidators.notEqual(1, 2));
        assert.ok(evConfig.customValidators.notEqual(1, '1'));
        assert.ok(evConfig.customValidators.notEqual(1, [1]));
        assert.ok(evConfig.customValidators.notEqual(1, true));
        assert.ok(evConfig.customValidators.notEqual(1, ''));
        assert.ok(evConfig.customValidators.notEqual(1, []));
        assert.ok(evConfig.customValidators.notEqual(1, {}));
        return done();
      });

      it('returns false for equal params', (done) => {
        assert.ok(!evConfig.customValidators.notEqual(1, 1));
        assert.ok(!evConfig.customValidators.notEqual('1', '1'));
        assert.ok(!evConfig.customValidators.notEqual(true, true));
        assert.ok(!evConfig.customValidators.notEqual(false, false));
        assert.ok(!evConfig.customValidators.notEqual('', ''));
        return done();
      });
    });
  });
});