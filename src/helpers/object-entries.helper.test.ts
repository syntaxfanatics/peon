import { objectEntries } from './object-entries.helper';

describe('The "objectEntries" helper function', () => {
  // test no properties
  it('Should function as expected on the unit object', () => {
    const obj = {};
    const objEntries= objectEntries(obj);
    expect(objEntries).toMatchObject([]);
  });

  // test enumerable properties
  it('Should extract enumerable properties', () => {
    function helloFn() { return 5; }
    const obj = {
      first: 'abc',
      second: helloFn,
      third: 1,
      forth: false,
    };
    const objEntries = objectEntries(obj);
    expect(objEntries).toMatchObject([
      ['first', 'abc'],
      ['second', helloFn],
      ['third', 1],
      ['forth', false],
    ]);
  });

  // test non-enumerable properties
  it('Should not extract non-enumerable properties', () => {
    function helloFn() { return 5; }
    const obj = Object.defineProperties({
      p1y: 'firstEnum',
      p2y: 2,
      p3y: true,
    }, {
      p4y: {
        configurable: false,
        enumerable: true,
        value: 'fourthEnum',
        writable: false,
      },
      p5n: {
        configurable: false,
        enumerable: false,
        value: 'fourthEnum',
        writable: false,
      },
      p6n: {
        configurable: false,
        enumerable: false,
        value: 'fourthEnum',
        writable: false,
      },
      p7y: {
        configurable: true,
        enumerable: true,
        value: helloFn,
        writable: true,
      },
    });

    const objEntries = objectEntries(obj);
    expect(objEntries).toMatchObject([
      ['p1y', 'firstEnum'],
      ['p2y', 2],
      ['p3y', true],
      ['p4y', 'fourthEnum'],
      ['p7y', helloFn],
    ]);
    // can't find enumerable properties
    expect(objEntries.find(([k]) => k === 'p5n')).toBeFalsy();
    expect(objEntries.find(([k]) => k === 'p6n')).toBeFalsy();
  });
});