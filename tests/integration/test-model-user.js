const assert   = require('assert');
const dbFiller = require('../../libs/database-filler.js');
const User     = require('../../models/user.js');

describe('Integration: model User', () => {
  beforeEach((done) => {
    dbFiller.clearCollection(() => {
      dbFiller.sampleData(() => {
        return done();
      });
    });
  });

  after(() => {
    dbFiller.clearCollection();
  });

  it('findById: finds User from sampleData with correct friendlist', (done) => {
    User.findById(2, (r) => {
      assert.ok(r.result);
      assert.ok(r.user !== null);
      assert.deepEqual(r.user.friendlist, [1, 3]);
      
      return done();
    });
  });

  it('findById: returns result=true, user=null when User doesnt exist', (done) => {
    User.findById(132, (r) => {
      assert.ok(r.result);
      assert.ok(r.user === null);
      
      return done();
    });
  });

  it('add: saves new user in DB (findById after add)', (done) => {
    User.add({ _id: 999, friendlist: [] }, (r) => {
      assert.ok(r.result);
      User.findById(999, (r) => {
        assert.ok(r.result);
        assert.ok(r.user !== null);
        assert.deepEqual(r.user.friendlist, []);
        
        return done();
      });
    });
  });

  it('add: cannot override existing user', (done) => {
    User.add({ _id: 999, friendlist: [] }, (r) => {
      assert.ok(r.result);
      User.add({ _id: 999, friendlist: [] }, (r) => {
        assert.ok(!r.result);
        
        return done();
      });
    });
  });

  it('addFriendship: creates friendship between 2 existing users', (done) => {
    User.addFriendship(1, 4, (r) => {
      assert.ok(r.result);
      
      return done();
    });
  });

  it('addFriendship: creates friendship between 2 new users', (done) => {
    User.addFriendship(500, 5000, (r) => {
      assert.ok(r.result);
      
      return done();
    });
  });

  it('deleteFriendship: deletes friendship between 2 existing users', (done) => {
    User.addFriendship(1, 2, (r) => {
      assert.ok(r.result);
      
      return done();
    });
  });

  it('deleteFriendship: deletes friendship between 2 not existing users', (done) => {
    User.addFriendship(100, 1000, (r) => {
      assert.ok(r.result);
      
      return done();
    });
  });
});