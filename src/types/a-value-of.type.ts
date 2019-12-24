
/**
 * @description
 * Get values from an object
 *
 * @example
 * const movieBusinessSummary = {
 *  name: 'Lucas Arts',
 *  owner: 'George Lucas',
 *  movies: ['Star Wars II', 'Indiana Jones', ] as const,
 *  [Symbol.iterator]: function* () {
 *    yield {year: 1995, revenue: 100};
 *    yield {year: 1996, revenue: 200};
 *    yield {year: 1997, revenue: 50};
 *  }
 *  0: 'arrayIndexZero',
 *  1: 'arrayIndexOne',
 * } as const;
 * type A_VALUE = AValueOf<typeof movieBusinessSummary>; // 'Lucas Arts' | 'George Lucas' | readonly ['Star Wars II', 'Indiana Jones'] | 'arrayIndexZero' | 'arrayIndexOne'
 */
export type AValueOf<T extends {}> = T[keyof T];
