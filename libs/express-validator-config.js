const assert   = require('assert');

module.exports = {
  customValidators: {
    isUID: function(value) {
      return (typeof value !== 'object')
        && !isNaN(value) 
        && (function(x) { return (x | 0) === x; })(parseFloat(value)) 
        && (value >= 0);
    },

    properDeleteId: function(value) {
      if(typeof value !== 'string'){
        return false;
      }

      const UIDs = value.split('-');

      return UIDs.length === 2
        && this.isUID(UIDs[0])
        && this.isUID(UIDs[1])
        && UIDs[0] != UIDs[1];
    },

    notEqual: function(value, notEqual) {
      return value !== notEqual;
    }
  }
};