/*  
 *  Name: testing.js
 *  Function: handling API route /testing
 *  Warning: only for development purposes
 */

// Get our lib for clearing/filling DB
const dbFiller = require('../libs/database-filler.js');

/*  
 *  Request: GET /testing/clearDB
 *  Function: Clears our DB
 */
module.exports.clearDB = function (req, res) {
  dbFiller.clearCollection(() => {
    res.status(200).json({
      result: 'ok',
    });
  });
}

/*  
 *  Request: GET /testing/fillDB/sample
 *  Function: Fills DB with very little specified documents
 */
module.exports.fillDBsample = function (req, res) {
  dbFiller.clearCollection(() => {
    dbFiller.sampleData(() => {
      res.status(200).json({
        users: 5,
        connections: 2,
      });
    });
  });
}

/*  
 *  Request: GET /testing/fillDB/small
 *  Function: Fills DB with 100 users (uid 1-100) witch most have 20 friends
 */
module.exports.fillDBsmall = function (req, res) {
  dbFiller.clearCollection(() => {
    dbFiller.fixedAmount(100, 20, 1, () => {
      res.status(200).json({
        users: 100,
        connections: 20,
      });
    });
  });
}

/*  
 *  Request: GET /testing/fillDB/medium
 *  Function: Fills DB with 10000 users (uid 1-10000) witch most have 100 friends
 */
module.exports.fillDBmedium = function (req, res) {
  dbFiller.clearCollection(() => {
    dbFiller.fixedAmount(10000, 100, 1, () => {
      res.status(200).json({
        users: 10000,
        connections: 100,
      });
    });
  });
}

/*  
 *  Request: GET /testing/fillDB/big
 *  Function: Fills DB with 100000 users (uid 1-100000) witch most have 250 friends
 *  Warning: using this request will take some time to execute (up to 60sec) 
 *           and cause higher memory (RAM) demand (temporary, during execution).
 *           Before using this request try using "GET /testing/fillDB/medium"
 */
module.exports.fillDBbig = function (req, res) {
  dbFiller.clearCollection(() => {
    dbFiller.fixedAmount(100000, 250, 1, () => {
      res.status(200).json({
        users: 100000,
        connections: 250,
      });
    });
  });
}