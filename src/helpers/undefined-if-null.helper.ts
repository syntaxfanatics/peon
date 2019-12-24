/**
 * @description
 * If the value is null, convert it to undefined
 *
 * @param v
 */
export const undefinedIfNull = <T>(
  v: T
): NonNullable<T> | undefined => {
  if (v === null) return undefined;
  return v as NonNullable<T>;
}