'use strict';

const random = {

  element: (collection) => {
    let arr;
    if (Array.isArray(collection)) {
      arr = collection;
    } else if (typeof collection === 'object' && collection !== null) {
      arr = Object.values(collection);
    }  else {
      arr = [];
    }
    const randomIndex = Math.floor(Math.random() * Math.floor(arr.length));
    return arr[randomIndex];
  }
}

module.exports = random;