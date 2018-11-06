const objectContract = o => {
  if (typeof o != 'object') {
    throw new TypeError('not an object');
  } else {
    return o;
  }
};