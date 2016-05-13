/*  Name: friensdhip.js
 *  Function: handling API route /friensdhip
 */

// Get User model
const User = require('../models/user.js');

/*  Request: POST /friendship
 *  Function: saves new friendship between users
 *  Requires: request.body being a JSON object with format as below:
 *            { "uid1": x, "uid2": y }
 *            where "x" and "y" are proper user IDs (non-negative Integers)
 */
module.exports.create = function (req, res) {
  // Add validation rules
  req.checkBody('uid1', 'uid1 param required: non-negative Integer').notEmpty().isUID();
  req.checkBody('uid2', 'uid2 param required: non-negative Integer').notEmpty().isUID();
  req.checkBody('uid1', 'uid1 cannot be equal to uid2').notEqual(req.body.uid2);
  
  // Validate and get errors
  const errors = req.validationErrors();

  // Prepare response and respond
  if(errors){
    // Send "422: Unprocessable Entity" with errors
    res.status(422).json(errors);
  }else{
    // Add new friendship
    User.addFriendship(req.body.uid1, req.body.uid2, (r) => {
      // If no internal errors
      if(r.result){
        // Send "204: No Content"
        res.status(204).send();
      }else{
        // Send "500: Internal Server Error"
        res.status(500).send();
      }
    });
  }
}

/*  Request: DELETE /friendship/:id
 *  Function: deletes a friendship maching :id value
 *  Requires: :id in request URL must be a string with format as below:
 *            UID1 + "-" + UID2
 *            where "UID1" and "UID2" are proper user IDs (non-negative Integers)
 *  Example: "DELETE /friendship/1-2" deletes friendship between users 1 and 2 
 */
module.exports.delete = function (req, res) {
  // Add validation rules
  req.checkParams('id', 'Id must be formated as: UID1 + "-" + UID2').isProperDeleteId();
  
  // Validate and get errors
  const errors = req.validationErrors();

  // Prepare response and respond
  if(errors){
    // Send "422: Unprocessable Entity" with errors
    res.status(422).json(errors);
  }else{
    // Get user id's from :id param
    const UIDs = req.params.id.split('-');

    // Delete friendship between users
    User.deleteFriendship(UIDs[0], UIDs[1], (r) => {
      // If no internal errors
      if(r.result){
        // Send "204: No Content"
        res.status(204).send();
      }else{
        // Send "500: Internal Server Error"
        res.status(500).send();
      }
    });
  }
}