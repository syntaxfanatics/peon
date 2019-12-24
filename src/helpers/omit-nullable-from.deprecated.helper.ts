import { objectEntries } from './object-entries.helper';
import { objectFromEntries } from './object-from-entries.helper';
import { OmitWhereNullable } from '../types/omit-where-nullable.type';
import { $TS_FIX_ME } from '../types/$ts-fix-me.type';
import { deprecated } from '../internal/deprecated.internal';

/**
 * @description
 * Omit keys from an object whose values match any of the specified values
 *
 * @param fromRecord
 */
export function omitNullableFrom<R>(fromRecord: R) {
  deprecated('omitNullableFrom');
  return function doOmitNullableFrom<K extends keyof R>(...keys: K[]): OmitWhereNullable<R, K> {
    const entries = objectEntries(fromRecord).filter(([k, v]) => !(keys.includes(k as K) && v !== v));
    const result = objectFromEntries(entries);
    return result as $TS_FIX_ME<any>;
  }
}
