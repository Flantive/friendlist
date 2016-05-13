/*  Name: testing.js
 *  Function: handling API route /testing
 *  Warning: only for development purposes
 */

// Get our lib for clearing/filling DB
const dbFiller = require('../libs/database-filler.js');

/*  Request: GET /testing/fillDB/sample
 *  Function: Fills DB with very little specified documents
 */
module.exports.fillDBsample = function (req, res) {
  // Clear DB
  dbFiller.clearCollection(() => {
    // Fill DB with new data
    dbFiller.sampleData(() => {
      // Send response to request
      res.status(200).json({
        users: 5,
        connections: 2,
      });
    });
  });
}

/*  Request: GET /testing/fillDB/small
 *  Function: Fills DB with 100 users (uid 1-100) witch most have 20 friends
 */
module.exports.fillDBsmall = function (req, res) {
  // Clear DB
  dbFiller.clearCollection(() => {
    // Fill DB with new data
    dbFiller.fixedAmount(100, 20, 1, () => {
      // Send response to request
      res.status(200).json({
        users: 100,
        connections: 20,
      });
    });
  });
}

/*  Request: GET /testing/fillDB/medium
 *  Function: Fills DB with 10000 users (uid 1-10000) witch most have 100 friends
 */
module.exports.fillDBmedium = function (req, res) {
  // Clear DB
  dbFiller.clearCollection(() => {
    // Fill DB with new data
    dbFiller.fixedAmount(10000, 100, 1, () => {
      // Send response to request
      res.status(200).json({
        users: 10000,
        connections: 100,
      });
    });
  });
}

/*  Request: GET /testing/fillDB/big
 *  Function: Fills DB with 100000 users (uid 1-100000) witch most have 250 friends
 *  Warning: using this function will take some time to execute (up to 60sec) 
 *           and cause higher RAM memory demand (temporary, during execution)
 */
module.exports.fillDBbig = function (req, res) {
  // Clear DB
  dbFiller.clearCollection(() => {
    // Fill DB with new data
    dbFiller.fixedAmount(100000, 250, 1, () => {
      // Send response to request
      res.status(200).json({
        users: 100000,
        connections: 250,
      });
    });
  });
}