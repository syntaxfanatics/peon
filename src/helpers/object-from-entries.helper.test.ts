import { objectFromEntries } from './object-from-entries.helper';

describe('The "objectFromTupleEntries" helper function', () => {
  // test no properties
  it('Should function as expected on the unit entries', () => {
    const entries: readonly (readonly ((() => any) | boolean | string)[])[] = [];
    const obj = objectFromEntries(entries);
    expect(obj).toMatchObject({});
  });

  // test enumerable properties
  it('Should create an object from the entries', () => {
    function helloFn(): any { return 5; }
    const entries = [
      ['first', 'abc'],
      ['snd', 'def'],
      ['snd1', 'ghi'],
      ['snd2', 'jkl'],
      ['snd3', 'lmn'],
      ['third', 1],
      ['fourth', 2],
      ['fifth', 3],
      ['sixth', helloFn],
      ['seventh', false],
    ] as const;

    const obj = objectFromEntries(entries);
    expect(obj).toMatchObject({
      first: 'abc',
      snd: 'def',
      snd1: 'ghi',
      snd2: 'jkl',
      snd3: 'lmn',
      third: 1,
      fourth: 2,
      fifth: 3,
      sixth: helloFn,
      seventh: false,
    });
  });
});
