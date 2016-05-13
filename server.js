/*  Name: server.js
 *  Function: Main file, used to start the application
 *  Description: Application provides a simple RESTful API to store and edit user
 *               friendlists.
 *  Available requests (production env): GET /friendlist/:id
 *                                       POST /friendship
 *                                       DELETE /friendship/:id
 *  Available requests (development env): GET /testing/clearDB
 *                                        GET /testing/fillDB/sample
 *                                        GET /testing/fillDB/small
 *                                        GET /testing/fillDB/medium
 *                                        GET /testing/fillDB/big
 *  For proper documentation involving API requests go to /routes directory and
 *  check a file with a name corresponding to main route name. 
 *  For example "/routes/friendship.js" to find more about "/friendship" route.
 */

// Import library and start our application
const express = require('express');
const app     = express();

// Configure app to read JSON data
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Configure app to use validation system with our config (custom rules)
const expressValidator = require('express-validator');
const evConfig         = require('./libs/express-validator-config.js');
app.use(expressValidator(evConfig));

// Get config for DB connection
const config   = require('./config.js');
const mongoose = require('mongoose');

// Connect to DB
mongoose.connect(`mongodb://${config.db.ip}:${config.db.port}/${config.db.name}`, (err, res) => {
  if(err){
    console.log(`ERROR: connecting to Database. ${err}`);
  }
});

// Set up our router to handle requests
const Router = require('./routes/router.js');
const rtr    = new Router(app);
rtr.init();

// Define port and start the server
const appPort = process.env.PORT || 8080;
app.listen(appPort, () => {
  console.log(`Server listening on: http://localhost:${appPort}`);
});

// Export app (for integration tests)
module.exports = app