export const objectContract = o => {
  if (typeof o != 'object') {
    throw new TypeError('not an object');
  } else {
    return o;
  }
};

export const numberContract = n => {
  if (typeof n != 'number' || n == NaN) {
    throw new TypeError('not a number');
  } else {
    return n;
  }
};
