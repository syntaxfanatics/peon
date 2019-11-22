import { $TS_FIX_ME } from './helper-types';
import { objectFromEntries } from './object-from-entries';
import { objectEntries } from './object-entries';

export const undefinedIfNull = <T>(
  v: T
): NonNullable<T> | undefined => {
  if (v === null) return undefined;
  return v as NonNullable<T>;
}


/**
 * @description
 * Resolve the promise to undefined if it were to be null
 *
 * @param v
 */
export const asyncUndefinedIfNull = async <T>(
  v: Promise<T>
): Promise<NonNullable<T> | undefined> => {
  const innerValue = await v;
  if (innerValue === null) return undefined;
  return innerValue as NonNullable<T>;
}


/**
 * @description
 * Return an object where any unll values are converted to undefined
 *
 * @param input
 */
export function objectUndefinedIfNull<
  T,
  K extends keyof T,
  R = {
    [P in K]: T[P] extends NonNullable<T[P]>
      ? T[P]
      : NonNullable<T[P]> | undefined
  }
>(
  input: { [P in K]: T[P] }
): R {
  const entries = objectEntries(input);
  const mappedEntries = entries.map(([k, v]) => [k, v === null ? undefined : v ]);
  const result = objectFromEntries(mappedEntries as $TS_FIX_ME<any>);
  return result as $TS_FIX_ME<any>;
}
