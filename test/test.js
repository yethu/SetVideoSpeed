import { assert, expect } from 'chai';

import ACTIONS from '../app/constants';
import { buildMessage } from '../app/helpers';
import { objectContract, numberContract } from '../app/contracts';

describe('Contracts', () => {
  describe('objectContract/1', () => {
    it('should throw TypeError', () => {
      expect(objectContract).to.throw(TypeError);
    });

    it('should throw TypeError when `undefined` is passed', () => {
      expect(() => objectContract(undefined)).to.throw(TypeError);
    });

    it('should throw TypeError when `null` is passed', () => {
      expect(() => objectContract(null).to.throw(TypeError));
    });

    it('should return the object passed', () => {
      let object = { foo: 'bar' };
      assert.deepEqual(objectContract(object), object);
    });
  });

  describe('numberContract/1', () => {
    it('should throw TypeError', () => {
      expect(numberContract).to.throw(TypeError);
    });

    it('should throw TypeError when `undefined` is passed', () => {
      expect(() => numberContract(undefined)).to.throw(TypeError);
    });

    it('should throw TypeError when `null` is passed', () => {
      expect(() => numberContract(null).to.throw(TypeError));
    });

    it('should throw TypeError when `NaN` is passed', () => {
      expect(() => numberContract(NaN).to.throw(TypeError));
    });

    it('should throw TypeError when `string` representation of a `number` is passed', () => {
      expect(() => numberContract('1.1').to.throw(TypeError));
    });

    it('should throw TypeError when invalid `string` representation of a `number` is passed', () => {
      expect(() => numberContract('foo').to.throw(TypeError));
    });

    it('should return the number passed', () => {
      let number = 1.1;
      assert.equal(numberContract(number), number);
    });
  });
});

describe('Helpers', () => {
  describe('buildMessage/3', () => {
    it('should create object with required keys', () => {
      expect(() =>
        buildMessage(ACTIONS.FULFILLED_QUERY, true, {}).to.have.keys([
          'action',
          'success',
          'data',
        ])
      );
    });
  });
});
