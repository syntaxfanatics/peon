import { objectEntries } from './object-entries.helper';
import { objectFromEntries } from './object-from-entries.helper';
import { $TS_FIX_ME } from '../types/$ts-fix-me.type';

/**
 * @description
 * Return an object where any null values are converted to undefined
 *
 * @param input
 */
export function undefinedIfNullObject<
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