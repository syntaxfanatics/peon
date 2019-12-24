import { pick } from './pick.helper';

describe('The "pick" helper function', () => {
  it ('Should not mutate the object', () => {
    function helloFn() { return 5 }
    const initial = { a: 'a', b: 'b', c: helloFn};
    const actedOn = { ...initial };
    pick('a')(actedOn);

    expect(actedOn).toMatchObject(initial);
  });

  it('Should pick a single property from an object', () => {
    function helloFn() { return 5 }
    const result = pick('c')({ a: 'a', b: 'b', c: helloFn});
    expect(result).toMatchObject({ c: helloFn });
    expect('a' in result).toBeFalsy();
    expect('b' in result).toBeFalsy();
  });

  it('Should pick a multiple properties from an object', () => {
    function helloFn() { return 5 }
    const result = pick('b', 'c')({ a: 'a', b: 'b', c: helloFn});
    expect(result).toMatchObject({ b: 'b', c: helloFn });
    expect('a' in result).toBeFalsy();
  });
});
