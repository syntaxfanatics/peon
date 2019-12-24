/**
 * @description
 * Flatten a 2 dimensional array (for environments that don't support Array.prototype.flatten)
 *
 * @example
 * ```ts
 * flatten([[1, 2], [3, 4]]) === [1, 2, 3, 4]
 * ```
 *
 * @param twoDArray
 */
export function flatten<T>(twoDArray: T[][]): T[] {
  const result: T[] = [];
  twoDArray.forEach(arrayElement => result.push(...arrayElement));
  return result;
}
