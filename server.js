// Load library and start our application
const express = require('express');
const app     = express();

// Configure app to read JSON data
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Configure app to use our validation system with custom rules
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

// Export app for integration tests
module.exports = app