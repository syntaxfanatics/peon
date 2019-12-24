import { flatten } from './flatten.helper';

/**
 * @description
 * Map and flatten a 2 dimensional array (for environments that don't support Array.prototype.flatMap)
 *
 * @example
 * ```ts
 * const arr: number[] =[1, 2, 3, 4];
 * function proj(i: number): [number, number] { return [i, i + 1] };
 * // Regular map
 * arr.map(proj) === [[1, 2], [2, 3], [3, 4], [4, 5]]
 * // Flat map
 * flatMap(arr)(proj) === [1, 2, 2, 3, 3, 4, 4, 5]
 * ```
 *
 * @param initArr
 */
export function flatMap<T>(initArr: T[]) {
  return function doFlatMap<U>(projFn: (elem: T) => U[] ): U[] {
    const projArr = initArr.map(projFn);
    const flatProj = flatten(projArr);
    return flatProj;
  }
}
