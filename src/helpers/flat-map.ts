import { flatten } from './flatten';

/**
 * @description
 * Map and flatten a 2 dimensional array (for environments that don't support Array.prototype.flatMap)
 *
 * @param twoDArray
 */
export function flatMap<T>(twoDArray: T[]) {
  return function doFlatMap<U>(projectionFn: (elem: T) => U[] ): U[] {
    const mapped = twoDArray.map(projectionFn);
    const result = flatten(mapped);
    return result;
  }
}
