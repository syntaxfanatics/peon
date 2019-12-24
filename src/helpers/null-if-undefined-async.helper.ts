/**
 * @description
 * Resolve the promise to null if it were to be undefined
 *
 * @param v
 */
export const nullIfUndefinedAsync = async <T>(
  v: Promise<T>
): Promise<NonNullable<T> | null> => {
  const innerValue = await v;
  if (innerValue === undefined) return null;
  return innerValue as NonNullable<T>;
}