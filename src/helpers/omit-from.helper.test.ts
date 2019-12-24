import { omitFrom } from './omit-from.helper';

describe('The "omitFrom" helper function', () => {
  it ('Should not mutate the object', () => {
    function helloFn() { return 5 }
    const initial = { a: 'a', b: 'b', c: helloFn};
    const actedOn = { ...initial };
    const result = omitFrom(actedOn)('a', 'b', 'c');

    expect(actedOn).toMatchObject(initial);
    expect(result).toMatchObject({});
  });

  it('Should omit a single property from an object', () => {
    function helloFn() { return 5 }
    const result = omitFrom({ a: 'a', b: 'b', c: helloFn})('a');
    expect(result).toMatchObject({ b: 'b', c: helloFn });
    expect('a' in result).toBeFalsy();
  });

  it('Should omit a multiple properties from an object', () => {
    function helloFn() { return 5 }
    const result = omitFrom({ a: 'a', b: 'b', c: helloFn})('a', 'b');
    expect(result).toMatchObject({ c: helloFn });
    expect('a' in result).toBeFalsy();
    expect('b' in result).toBeFalsy();
  });
});
