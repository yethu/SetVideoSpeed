export const objectContract = o => {
  if (typeof o != 'object' || ({}).toString.call(o) != '[object Object]') {
    throw new TypeError('not an object');
  } else {
    return o;
  }
};

export const numberContract = n => {
  if (typeof n != 'number' || Number.isNaN(n)) {
    throw new TypeError('not a number');
  } else {
    return n;
  }
};
