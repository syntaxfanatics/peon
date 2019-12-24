import { pickIntoArray } from './pick-into-array.helper';

describe('The "pickIntoArray" helper function', () => {
  it ('Should not mutate the object', () => {
    function helloFn() { return 5 }
    const initial = { a: 'a', b: 'b', c: helloFn};
    const actedOn = { ...initial };
    const result = pickIntoArray('a')(actedOn);

    expect(actedOn).toMatchObject(initial);
  });

  it('Should pick a single property from an object', () => {
    function helloFn() { return 5 }
    const result = pickIntoArray('c')({ a: 'a', b: 'b', c: helloFn});
    expect(result).toMatchObject([helloFn]);
    expect(result.length).toBe(1);
  });

  it('Should pick a multiple properties from an object', () => {
    function helloFn() { return 5 }
    const result = pickIntoArray('c', 'b')({ a: 'a', b: 'b', c: helloFn});
    expect(result).toMatchObject([helloFn, 'b']);
    expect(result.length).toBe(2);
  });

  it('Should retrieve in items in the same order they\'re picked', () => {
    function helloFn() { return 5 }
    const result = pickIntoArray('c', 'a', 'b')({ a: 'a', b: 'b', c: helloFn});
    expect(result).toMatchObject([helloFn, 'a', 'b']);
    expect(result.length).toBe(3);
  });
});
