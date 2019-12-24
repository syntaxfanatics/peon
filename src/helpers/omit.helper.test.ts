import { omit } from './omit.helper';

describe('The "omit" helper function', () => {
  it ('Should not mutate the object', () => {
    function helloFn() { return 5 }
    const initial = { a: 'a', b: 'b', c: helloFn};
    const actedOn = { ...initial };
    const result = omit('a', 'b', 'c')(actedOn);

    expect(actedOn).toMatchObject(initial);
    expect(result).toMatchObject({});
  });

  it('Should omit a single property from an object', () => {
    function helloFn() { return 5 }
    const result = omit('a')({ a: 'a', b: 'b', c: helloFn});
    expect(result).toMatchObject({ b: 'b', c: helloFn });
    expect('a' in result).toBeFalsy();
  });

  it('Should omit a multiple properties from an object', () => {
    function helloFn() { return 5 }
    const result = omit('a', 'b')({ a: 'a', b: 'b', c: helloFn});
    expect(result).toMatchObject({ c: helloFn });
    expect('a' in result).toBeFalsy();
    expect('b' in result).toBeFalsy();
  });
});
