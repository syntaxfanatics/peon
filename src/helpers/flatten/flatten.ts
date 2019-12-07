/**
 * @description
 * Flatten a 2 dimensional array (for environments that don't support Array.prototype.flatten)
 *
 * @param twoDArray
 */
export function flatten<T>(twoDArray: T[][]): T[] {
  const result: T[] = [];
  twoDArray.forEach(arrayElement => result.push(...arrayElement));
  return result;
}
