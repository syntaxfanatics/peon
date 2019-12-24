/**
 * @description
 * Extract the keys that are strings from a type
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
 * type A_STRING_KEY_OF = AStringKeyOf<typeof movieBusinessSummary> // 'name' | 'owner' | 'movies'
 */
export type AStringKeyOf<T> = Extract<keyof T, string>;