/*  
 *  Name: friendlist.js
 *  Function: handling API route /friendlist
 */

// Get User model
const User = require('../models/user.js');

/*  
 *  Request: GET /friendlist/:id
 *  Function: Returns friendlist of user with ID = :id (non-negative Integer)
 */
module.exports.findByUserId = function (req, res) {
  // Validation rules
  req.checkParams('id', 'Id must be a non-negative Integer').isUID();

  // Validate
  const errors = req.validationErrors();

  if(errors){
    // Send "422: Unprocessable Entity" with errors
    res.status(422).json(errors);
  }else{
    // Find user in DB
    User.findById(req.params.id, (response) => {
      let friendlist = [];

      if(response.user !== null){
        friendlist = response.user.friendlist;
      }

      // Send "200: OK" with friendlist in JSON format
      res.status(200).json(friendlist);
    });
  }
}