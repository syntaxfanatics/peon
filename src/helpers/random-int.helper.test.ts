import { randomInt } from './random-int.helper';

describe('The "randomInt" helper function', () => {
  const MAX_RUNS = 500;
  const min = -50;
  const max = 100;

  it('Should pick a random integer between min and max integers', () => {
    let current = 0;

    while((current += 1) < MAX_RUNS) {
      const next = randomInt(min, max);
      expect(next).toBeLessThanOrEqual(max);
      expect(min).toBeLessThanOrEqual(next);
    }
  });
});
