const supertest = require('supertest');
const assert    = require('assert');
const server    = require('../../server');
const dbFiller  = require('../../libs/database-filler.js');

describe('Integration: GET /friendlist/:id', () => {
  describe('logic', () => {
    it('accepts GET with :id being a possitive Number', (done) => {
      supertest(server)
      .get('/friendlist/123')
      .expect(200)
      .end(done);
    });

    it('accepts GET with :id being zero', (done) => {
      supertest(server)
      .get('/friendlist/0')
      .expect(200)
      .end(done);
    });

    it('rejects GET without :id', (done) => {
      supertest(server)
      .get('/friendlist/')
      .expect(404)
      .end(done);
    });

    it('rejects GET with :id being not an Integer - Float with coma', (done) => {
      supertest(server)
      .get('/friendlist/1,23')
      .expect(422)
      .end(done);
    });

    it('rejects GET with :id being not an Integer - Float with dot', (done) => {
      supertest(server)
      .get('/friendlist/1.23')
      .expect(422)
      .end(done);
    });

    it('rejects GET with :id being a negative Number', (done) => {
      supertest(server)
      .get('/friendlist/-5')
      .expect(422)
      .end(done);
    });

    it('rejects GET with :id being NaN -"string"', (done) => {
      supertest(server)
      .get('/friendlist/string')
      .expect(422)
      .end(done);
    });

    it('rejects GET with :id being NaN - "true"', (done) => {
      supertest(server)
      .get('/friendlist/true')
      .expect(422)
      .end(done);
    });

    it('rejects GET with :id being NaN - "[]"', (done) => {
      supertest(server)
      .get('/friendlist/[]')
      .expect(422)
      .end(done);
    });

    it('rejects GET with :id being NaN - "{}"', (done) => {
      supertest(server)
      .get('/friendlist/{}')
      .expect(422)
      .end(done);
    });
  });

  describe('expected responses', () => {
    before((done) => {
      dbFiller.sampleData(() => {
        done();
      });
    });

    after(() => {
      dbFiller.clearCollection();
    });

    it('GET: returns an Array', (done) => {
      supertest(server)
      .get('/friendlist/1')
      .expect(200)
      .end(function(err, response){
        if(err) 
          throw err;

        assert.ok(Array.isArray(response.body));

        return done();
      });
    });

    it('GET: returns proper Array for sampleData', (done) => {
      supertest(server)
      .get('/friendlist/1')
      .expect(200)
      .end(function(err, response){
        if(err) 
          throw err;

        assert.deepEqual(response.body, [2, 3]);

        return done();
      });
    });

    it('GET: returns empty Array for non-existing UID', (done) => {
      supertest(server)
      .get('/friendlist/1111')
      .expect(200)
      .end(function(err, response){
        if(err) 
          throw err;

        assert.deepEqual(response.body, []);

        return done();
      });
    });
  });
});