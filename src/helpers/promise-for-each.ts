import { LazyPromise } from "./helper-types";

/**
 * @description
 * Map over an array of functions that return promises until there's none left, projecting their results
 *
 * @param lazyPromises
 */
export function promiseForEach<A>(lazyPromises: LazyPromise<A>[]) {
  return async function run(): Promise<void> {
    for (let i = 0; i < lazyPromises.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await lazyPromises[i]();
    }
  };
}
