const supertest = require('supertest');
const assert    = require('assert');
const server    = require('../../server');
const dbFiller  = require('../../libs/database-filler.js');
const User      = require('../../models/user.js');

describe('Integration: POST /friendship', () => {
  beforeEach((done) => {
    dbFiller.clearCollection(() => {
      done();
    });
  });

  describe('logic', () => {
    it('accepts POST with data: {uid1, uid2} - different positive Integers', (done) => {
      supertest(server)
      .post('/friendship')
      .send({ uid1: 1, uid2: 2 })
      .expect(204)
      .end(done);
    });

    it('rejects POST with data: {uid1, uid2} - identical positive Integers', (done) => {
      supertest(server)
      .post('/friendship')
      .send({ uid1: 1, uid2: 1 })
      .expect(422)
      .end(done);
    });

    it('rejects POST with data: {uid1} - missing uid2', (done) => {
      supertest(server)
      .post('/friendship')
      .send({ uid1: 1 })
      .expect(422)
      .end(done);
    });

    it('rejects POST with data: {uid2} - missing uid1', (done) => {
      supertest(server)
      .post('/friendship')
      .send({ uid2: 1 })
      .expect(422)
      .end(done);
    });
  });

  describe('expected results', () => {
    beforeEach((done) => {
      dbFiller.clearCollection(() => {
        dbFiller.sampleData(() => {
          done();
        });
      });
    });

    after(() => {
      dbFiller.clearCollection();
    });

    it('POST: after success, friendlist in database is updated for UID1 & UID2', (done) => {
      supertest(server)
      .post('/friendship')
      .send({ uid1: 1, uid2: 5})
      .expect(204)
      .end(function(err, response){
        if(err) 
          throw err;

        User.findById(1, (r) => {
          assert.deepEqual(r.user.friendlist, [2, 3, 5]);

          User.findById(5, (r) => {
            assert.deepEqual(r.user.friendlist, [1, 4]);

            return done();
          });
        });
      });
    });

    it('POST: creates new User in DB when UID1 or UID2 is new', (done) => {
      supertest(server)
      .post('/friendship')
      .send({ uid1: 1, uid2: 20000})
      .expect(204)
      .end(function(err, response){
        if(err) 
          throw err;

        User.findById(1, (r) => {
          assert.deepEqual(r.user.friendlist, [2, 3, 20000]);

          User.findById(20000, (r) => {
            assert.ok(r.user !== null);
            assert.deepEqual(r.user.friendlist, [1]);

            return done();
          });
        });
      });
    });
  });
});

describe('Integration: DELETE /friendship/:id', () => {
  describe('logic', () => {
    it('accepts DELETE with proper :id being: UID1 + "-" + UID2', (done) => {
      supertest(server)
      .delete('/friendship/1-2')
      .expect(204)
      .end(done);
    });
    it('accepts DELETE with for not existing friendship', (done) => {
      supertest(server)
      .delete('/friendship/123-321')
      .expect(204)
      .end(done);
    });

    it('rejects DELETE with :id with more then one "-"', (done) => {
      supertest(server)
      .delete('/friendship/1-1-2')
      .expect(422)
      .end(done);
    });

    it('rejects DELETE with :id without "-"', (done) => {
      supertest(server)
      .delete('/friendship/2')
      .expect(422)
      .end(done);
    });

    it('rejects DELETE with :id wrongly formated UID1', (done) => {
      supertest(server)
      .delete('/friendship/1.1-2')
      .expect(422)
      .end(done);
    });

    it('rejects DELETE with :id wrongly formated UID2', (done) => {
      supertest(server)
      .delete('/friendship/1-2.2')
      .expect(422)
      .end(done);
    });
  });

  describe('expected results', () => {
    beforeEach((done) => {
      dbFiller.clearCollection(() => {
        dbFiller.sampleData(() => {
          done();
        });
      });
    });

    after(() => {
      dbFiller.clearCollection();
    });
    
    it('DELETE: after success, friendlist in database is updated for UID1 & UID2', (done) => {
      supertest(server)
      .delete('/friendship/1-2')
      .expect(204)
      .end(function(err, response){
        if(err) 
          throw err;

        User.findById(1, (r) => {
          assert.deepEqual(r.user.friendlist, [3]);

          User.findById(2, (r) => {
            assert.deepEqual(r.user.friendlist, [3]);

            return done();
          });
        });
      });
    });
    
    it('DELETE: after success, User with empty friendlist is removed from database', (done) => {
      supertest(server)
      .delete('/friendship/4-5')
      .expect(204)
      .end(function(err, response){
        if(err) 
          throw err;

        User.findById(4, (r) => {
          assert.ok(r.user === null);

          User.findById(5, (r) => {
            assert.ok(r.user === null);

            return done();
          });
        });
      });
    });

  });
});