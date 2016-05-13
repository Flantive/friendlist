/*
 * Created for test-only purposes
 */
const mongoose = require('mongoose');
const config   = require('../config.js');
const User     = require('../models/user.js');

// To not run our test methods on production environment
const environment = process.env.NODE_ENV || 'development';

module.exports = {
  clearCollection: function (callback) {
    if(environment === 'development'){
      User.Model.collection.drop(() => {
        if(callback){
          callback();
        }
      });
    }
  },

  sampleData: function (callback) {
    if(environment === 'development'){
      User.add({ _id: 1, friendlist: [2, 3] });
      User.add({ _id: 2, friendlist: [1, 3] });
      User.add({ _id: 3, friendlist: [1, 2] });
      User.add({ _id: 4, friendlist: [5] });
      User.add({ _id: 5, friendlist: [4] }, () => {
        if(callback){
          callback();
        }
      });
    }
  },

  fixedAmount: function (users, conn, start, callback) {
    if(environment === 'development'){
      let friendIdLowest;
      let friendIdHighest;
      let friendlist;
      let i;
      let j;

      for(i = start; i <= users+start-1; i++){
        friendIdLowest  = i - (conn/2) < 1 ? 1 : i - (conn/2);
        friendIdHighest = i + (conn/2) > users ? users : i + (conn/2);
        friendlist      = [];

        for(j = friendIdLowest; j <= friendIdHighest; j++){
          if(i != j){
            friendlist.push(j);
          }
        }

        User.Model.collection.insert({ _id: i, friendlist: friendlist });
      }
      if(callback){
        callback();
      }
    }
  }
}