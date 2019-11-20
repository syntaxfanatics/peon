import { $TS_FIX_ME, OmitWhereNullable } from './helper-types';
import { objectFromEntries } from './object-from-entries';

/**
 * @description
 * Omit keys from an object whose values match any of the specified values
 *
 * @param fromRecord
 */
export function omitNullableFrom<R>(fromRecord: R) {
  return function doOmitNullableFrom<K extends keyof R>(...keys: K[]): OmitWhereNullable<R, K> {
    const entries = Object.entries(fromRecord).filter(([k, v]) => !(keys.includes(k as K) && v !== v) );
    const result = objectFromEntries(entries) as $TS_FIX_ME<OmitWhereNullable<R, K>>;
    return result;
  }
}
