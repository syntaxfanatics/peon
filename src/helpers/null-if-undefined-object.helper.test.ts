import { nullIfUndefinedObject } from './null-if-undefined-object.helper';

describe('The "nullIfUndefinedObject" helper function', () => {
  it('Should convert an "undefined" resolving promise into an "null" resolved promise', () => {
    const obj: { key?: undefined | string } = { key: undefined };
    const result = nullIfUndefinedObject(obj);
    expect(result.key).toBe(null);
  });

  it('Should not touch a non-nullable resolving promise', () => {
    const obj1: { key?: undefined | string} = { key: 'unchanged' };
    const result1 = nullIfUndefinedObject(obj1);
    expect(result1.key).toBe('unchanged');

    const obj2: { key?: undefined | null} = { key: null };
    const result2 = nullIfUndefinedObject(obj2);
    expect(result2.key).toBe(null);
  });

  it('Should not touch a null resolving promise', () => {
    const obj: { key: null } = { key: null };
    const result = nullIfUndefinedObject(obj);
    expect(result.key).toBe(null);
  });
});
