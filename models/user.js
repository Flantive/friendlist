/*  Name: User.js
 *  Function: handling API route /friensdhip
 */

const mongoose   = require('mongoose');
const frArrayAdd = require('../libs/friendlist-array.js');

const User = function (mongoose) {
  return {
    init: function () {
      this.Schema = new mongoose.Schema({
        _id: Number,
        friendlist: Array
      });

      this.Model = mongoose.model('User', this.Schema);
    },

    add: function (data, callback) {
      const user = new this.Model(data);
      const response = { result: false };

      user.save((err) => {
        if(!err){
          response.result = true;
          response.user = user;
        }else{
          response.err = err;
        }

        if(callback){
          callback(response);
        }
      });
    },

    addFriendship: function (uid1, uid2, callback) {
      const response = { result: false };

      this.addFriend(uid1, uid2, (r) => {
        if(!r.result){
          response.err = r.err;
          return callback(response);
        }

        this.addFriend(uid2, uid1, (r) => {
          if(!r.result){
            response.err = r.err;
          }
          response.result = true;

          return callback(response);
        });
      });
    },

    addFriend: function (uid, friendId, callback) {
      const response = { result: false };

      this.findById(uid, (r) => {
        if(!r.result){
          response.err = r.err;
          return callback(response);
        }

        if(r.user !== null){
          const newFriendlist = frArrayAdd.addToArray(friendId, r.user.friendlist);

          this.Model.update({ _id: r.user._id }, { friendlist: newFriendlist}, (err) => {
            if(err){
              response.err = err;
            }else{
              response.result = true;
            }

            return callback(response);
          });
        }else{
          this.add({ _id: uid, friendlist: [friendId] }, (r) => {
            if(!r.result){
              response.err = r.err;
            }else{
              response.result = true;
            }

            return callback(response);
          });
        }
      });
    },

    deleteFriendship: function (uid1, uid2, callback) {
      const response = { result: false };

      this.removeFriend(uid1, uid2, (r) => {
        if(!r.result){
          response.err = r.err;
          return callback(response);
        }

        this.removeFriend(uid2, uid1, (r) => {
          if(!r.result){
            response.err = r.err;
          }
          response.result = true;

          return callback(response);
        });
      });
    },

    removeFriend: function (uid, friendId, callback) {
      const response = { result: false };

      this.findById(uid, (r) => {
        if(!r.result){
          response.err = r.err;
          return callback(response);
        }

        if(r.user === null){
          response.result = true;
          return callback(response);
        }

        const newFriendlist = frArrayAdd.removeFromArray(friendId, r.user.friendlist);

        if(newFriendlist.length === 0){
          this.Model.remove({ _id: r.user._id }, (err) => {
            if(err){
              response.err = err;
            }else{
              response.result = true;
            }

            return callback(response);
          });
        }else{
          this.Model.update({ _id: r.user._id }, { friendlist: newFriendlist}, (err) => {
            if(err){
              response.err = err;
            }else{
              response.result = true;
            }

            return callback(response);
          });
        }
      });
    },

    findById: function (userId, callback) {
      const response = { result: false };

      this.Model.findOne( {_id: userId}, (err, result) => {
          if(!err){
            response.result = true;
            response.user = result;
          }else{
            response.err = err;
          }

          if(callback){
            callback(response);
          }
      });
    }
  }
}

var usr = new User(mongoose);
usr.init();

module.exports = usr;