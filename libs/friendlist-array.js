module.exports = {
  addToArray: function (uid, friendlistArray) {
    const friendOnList = this.friendOnList(uid, friendlistArray);

    if(!friendOnList.isPresent){
      friendlistArray.splice(friendOnList.position, 0, uid)
    }

    return friendlistArray;
  },

  removeFromArray: function (uid, friendlistArray) {
    const friendOnList = this.friendOnList(uid, friendlistArray);
    
    if(friendOnList.isPresent){
      friendlistArray.splice(friendOnList.position, 1)
    }

    return friendlistArray;
  },

  locationOf: function (element, arr, start, end) {
    start       = start || 0;
    end         = end || arr.length;
    let pivot   = parseInt(start + (end - start) / 2, 10);

    if(parseFloat(arr[pivot]) === parseFloat(element)){
      return pivot;
    }
    if(end-start <= 1){
      if(arr[pivot] > element){
        return pivot;
      }else{
        return pivot+1;
      }
    }

    if(arr[pivot] < element){
      return this.locationOf(element, arr, pivot, end);
    }else{
      return this.locationOf(element, arr, start, pivot);
    }
  },

  friendOnList: function (uid, friendlistArray) {
    const position = this.locationOf(uid, friendlistArray);

    const response = {
      isPresent: parseFloat(friendlistArray[position]) === parseFloat(uid),
      position: position
    }

    return response;
  }
};