/*  Name: router.js
 *  Function: binds functions to requests in our API
 */

// Get functions for specific routes
const friendlist = require('../routes/friendlist.js');
const friendship = require('../routes/friendship.js');
const testing    = require('../routes/testing.js');

// Export 
module.exports = function (app) {
  return {
    // Calls functions defining our routes, each core route has separate function
    init: function () {
      this.configFriendshipRoutes();
      this.configFriendlistRoutes();
      this.configTestingRoutes();
    },

    // Binds functions to /friendship route
    configFriendshipRoutes: function () {
      app.post('/friendship', friendship.create);

      app.delete('/friendship/:id', friendship.delete);
    },

    // Binds functions to /friendlist route
    configFriendlistRoutes: function () {
      app.get('/friendlist/:id', friendlist.findByUserId);
    },

    // Test only purposes
    // Binds functions to /testing route
    configTestingRoutes: function () {
      // Get current environment: production/development
      const environment = process.env.NODE_ENV || 'development';

      // Bind only on development environment
      if(environment === 'development'){
        app.get('/testing/clearDB', testing.clearDB);
        app.get('/testing/fillDB/sample', testing.fillDBsample);
        app.get('/testing/fillDB/small', testing.fillDBsmall);
        app.get('/testing/fillDB/medium', testing.fillDBmedium);
        app.get('/testing/fillDB/big', testing.fillDBbig);
      }
    }
  }
}