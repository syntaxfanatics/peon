import { pickFrom } from './pick-from.helper';

describe('The "pickFrom" helper function', () => {
  it ('Should not mutate the object', () => {
    function helloFn() { return 5 }
    const initial = { a: 'a', b: 'b', c: helloFn};
    const actedOn = { ...initial };
    pickFrom(actedOn)('a');

    expect(actedOn).toMatchObject(initial);
  });

  it('Should pick a single property from an object', () => {
    function helloFn() { return 5 }
    const result = pickFrom({ a: 'a', b: 'b', c: helloFn})('c');
    expect(result).toMatchObject({ c: helloFn });
    expect('a' in result).toBeFalsy();
    expect('b' in result).toBeFalsy();
  });

  it('Should pick a multiple properties from an object', () => {
    function helloFn() { return 5 }
    const result = pickFrom({ a: 'a', b: 'b', c: helloFn})('b', 'c');
    expect(result).toMatchObject({ b: 'b', c: helloFn });
    expect('a' in result).toBeFalsy();
  });
});
