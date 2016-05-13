/*  Name: friendlist.js
 *  Function: handling API route /friendlist
 */

// Get User model
const User = require('../models/user.js');

/*  Request: GET /friendlist/:id
 *  Function: Returns friendlist of user with ID = :id (non-negative Integer)
 */
module.exports.findByUserId = function (req, res) {
  // Add validation rules
  req.checkParams('id', 'Id must be a non-negative Integer').isUID();

  // Validate and get errors
  const errors = req.validationErrors();

  // Prepare response and respond
  if(errors){
    // Send "422: Unprocessable Entity" with errors
    res.status(422).json(errors);
  }else{
    // Find user in DB
    User.findById(req.params.id, (response) => {
      // Define friendlist array
      let friendlist = [];

      // If user exist in DB, replace empty array with his friendlist
      if(response.user !== null){
        friendlist = response.user.friendlist;
      }

      // Send "200: OK" with friendlist in JSON format
      res.status(200).json(friendlist);
    });
  }
}