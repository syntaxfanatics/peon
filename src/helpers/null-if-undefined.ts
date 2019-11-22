import { $TS_FIX_ME } from './helper-types';
import { objectFromEntries } from './object-from-entries';
import { objectEntries } from './object-entries';

export const nullIfUndefined = <T>(
  v: T
): NonNullable<T> | null => {
  if (v === undefined) return null;
  return v as NonNullable<T>;
}

/**
 * @description
 * Resolve the promise to null if it were to be undefined
 *
 * @param v
 */
export const asyncNullIfUndefined = async <T>(
  v: Promise<T>
): Promise<NonNullable<T> | null> => {
  const innerValue = await v;
  if (innerValue === undefined) return null;
  return innerValue as NonNullable<T>;
}


/**
 * @description
 * Return an object where any undefined values are converted to null
 *
 * @param input
 */
export function objectNullIfUndefined<
  T,
  K extends keyof T,
  R = {
    [P in K]: T[P] extends NonNullable<T[P]>
      ? T[P]
      : NonNullable<T[P]> | null
  }
>(
  input: { [P in K]: T[P] }
): R {
  const entries = objectEntries(input);
  const mappedEntries = entries.map(([k, v]) => [k, v === undefined ? null : v ]);
  const result = objectFromEntries(mappedEntries as $TS_FIX_ME<any>);
  return result as $TS_FIX_ME<any>;
}
