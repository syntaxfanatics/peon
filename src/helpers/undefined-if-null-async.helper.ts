/**
 * @description
 * Resolve the promise to undefined if it were to be null
 *
 * @param v
 */
export const undefinedIfNullAsync = async <T>(
  v: Promise<T>
): Promise<NonNullable<T> | undefined> => {
  const innerValue = await v;
  if (innerValue === null) return undefined;
  return innerValue as NonNullable<T>;
}
