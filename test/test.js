import { objectContract, numberContract } from '../app/contracts';
import { assert, expect } from 'chai';

describe('Contracts', () => {
  describe('Object Contract', () => {
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

  describe('Number Contract', () => {
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
