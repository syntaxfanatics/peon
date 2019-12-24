import { randomElementOf } from './random-element-of.helper';
import { log } from '../internal/log.internal';

describe('The "randomElementOf" helper function', () => {
  function firstFn() { return 5; }
  function secondFn() { return 'hi'; }
  function thirdFn() { return false; }
  const MAX_ATTEMPTS = 500000;
  const testArrays: any[][] = [
    [],
    [firstFn, secondFn, thirdFn],
    [firstFn],
    [1, 2, 3, 4, 5, 6, 7, 8],
    ['hello', 1, 2, 'world', firstFn, secondFn],
  ];

  it('Should eventually pick every element from the array', () => {
    for (const targetArray of testArrays) {
      for (const targetElement of targetArray) {
        let next;
        let attempts = 0;
        // eslint-disable-next-line no-cond-assign
        while((next = randomElementOf(targetArray)) !== targetElement) {
          if ((attempts += 1) > MAX_ATTEMPTS) throw new Error('Exceeded maximum number of attempts');
        }

        expect(next).toBe(targetElement);
      }
    }
  });
});