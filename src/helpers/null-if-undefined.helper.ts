/**
 * @description
 * Convert the value to null if it's undefined
 *
 * @param v
 */
export const nullIfUndefined = <T>(
  v: T
): NonNullable<T> | null => {
  if (v === undefined) return null;
  return v as NonNullable<T>;
}
