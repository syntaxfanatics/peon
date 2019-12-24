import { LazyPromise } from '../types/lazy-promise.type';

/**
 * @description
 * Map over an array of functions that return promises until there's none left, projecting their results
 *
 * @param lazyPromise
 */
export function promiseMap<A>(lazyPromise: LazyPromise<A>[]) {
  return async function run(): Promise<A[]> {
    const results: A[] = [];
    for (let i = 0; i < lazyPromise.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const nextResult = await lazyPromise[i]();
      results.push(nextResult);
    }
    return results;
  };
}
