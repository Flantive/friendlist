const assert     = require('assert');
const frArrayAdd = require('../../libs/friendlist-array.js');

describe('Unit: lib/friendlist-array', () => {
  describe('addToArray', () => {
    it('returns sorted array with new element', (done) => {
      assert.deepEqual(frArrayAdd.addToArray(-1, [0, 1, 2]), [-1, 0, 1, 2]);
      assert.deepEqual(frArrayAdd.addToArray(0.5, [0, 1, 2]), [0, 0.5, 1, 2]);
      assert.deepEqual(frArrayAdd.addToArray(3, [0, 1, 2]), [0, 1, 2, 3]);
      return done();
    });

    it('returns unchanged array if element already existed', (done) => {
      assert.deepEqual(frArrayAdd.addToArray(0, [0, 1, 2]), [0, 1, 2]);
      assert.deepEqual(frArrayAdd.addToArray(1, [0, 1, 2]), [0, 1, 2]);
      assert.deepEqual(frArrayAdd.addToArray(2, [0, 1, 2]), [0, 1, 2]);
      return done();
    });
  });

  describe('removeFromArray', () => {
    it('returns sorted array without specified element', (done) => {
      assert.deepEqual(frArrayAdd.removeFromArray(0, [0, 1, 2]), [1, 2]);
      assert.deepEqual(frArrayAdd.removeFromArray(1, [0, 1]), [0]);
      assert.deepEqual(frArrayAdd.removeFromArray(2, [2]), []);
      return done();
    });

    it('returns unchanged array if element did not exist', (done) => {
      assert.deepEqual(frArrayAdd.removeFromArray(0.5, [0, 1, 2]), [0, 1, 2]);
      assert.deepEqual(frArrayAdd.removeFromArray( -1, [0, 1, 2]), [0, 1, 2]);
      assert.deepEqual(frArrayAdd.removeFromArray(  3, [0, 1, 2]), [0, 1, 2]);
      return done();
    });
  });

  describe('locationOf', () => {
    it('returns proper location of element in array', (done) => {
      assert.equal(frArrayAdd.locationOf(0, [0, 1, 2]), 0);
      assert.equal(frArrayAdd.locationOf(1, [0, 1, 2]), 1);
      assert.equal(frArrayAdd.locationOf(2, [0, 1, 2]), 2);
      return done();
    });

    it('element doesnt exist: returns location of closest, bigger number', (done) => {
      assert.equal(frArrayAdd.locationOf(1.12, [0, 1, 2]), 2);
      assert.equal(frArrayAdd.locationOf(0.11, [0, 1, 2]), 1);
      assert.equal(frArrayAdd.locationOf(-1, [0, 1, 2]), 0);
      assert.equal(frArrayAdd.locationOf(3, [0, 1, 2]), 3);
      return done();
    });
  });

  describe('friendOnList', () => {
    it('returns {isPresent: true, position: [pos]} if is', (done) => {
      assert.deepEqual(frArrayAdd.friendOnList(0, [0]), { isPresent: true, position: 0 });
      assert.deepEqual(frArrayAdd.friendOnList(0, [0, 1]), { isPresent: true, position: 0 });
      assert.deepEqual(frArrayAdd.friendOnList(1, [0, 1]), { isPresent: true, position: 1 });
      assert.deepEqual(frArrayAdd.friendOnList(0, [0, 1, 2]), { isPresent: true, position: 0 });
      assert.deepEqual(frArrayAdd.friendOnList(1, [0, 1, 2]), { isPresent: true, position: 1 });
      assert.deepEqual(frArrayAdd.friendOnList(2, [0, 1, 2]), { isPresent: true, position: 2 });
      return done();
    });

    it('returns {isPresent: false, position: [pos]} if not', (done) => {
      assert.deepEqual(frArrayAdd.friendOnList( 1, [0]), { isPresent: false, position: 1 });
      assert.deepEqual(frArrayAdd.friendOnList(-1, [0]), { isPresent: false, position: 0 });
      assert.deepEqual(frArrayAdd.friendOnList(-1, [0, 1]), { isPresent: false, position: 0 });
      assert.deepEqual(frArrayAdd.friendOnList( 2, [0, 1]), { isPresent: false, position: 2 });
      assert.deepEqual(frArrayAdd.friendOnList(0.5, [0, 1, 2]), { isPresent: false, position: 1 });
      assert.deepEqual(frArrayAdd.friendOnList( -1, [0, 1, 2]), { isPresent: false, position: 0 });
      assert.deepEqual(frArrayAdd.friendOnList(555, [0, 1, 2]), { isPresent: false, position: 3 });
      return done();
    });
  });
});