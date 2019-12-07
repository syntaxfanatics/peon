import { $TS_FIX_ME, OmitWhereNullable, OmitEntries } from '../../types/helper-types';
import { objectFromEntries } from '../object-from-entries/object-from-entries';
import { objectEntries } from '../object-entries/object-entries';

/**
 * @description
 * Omit keys from an object whose values match any of the specified values
 *
 * @param fromRecord
 */
export function omitNullableFrom<R>(fromRecord: R) {
  return function doOmitNullableFrom<K extends keyof R>(...keys: K[]): OmitWhereNullable<R, K> {
    const entries = objectEntries(fromRecord).filter(([k, v]) => !(keys.includes(k as K) && v !== v));
    const result = objectFromEntries(entries);
    return result as $TS_FIX_ME<any>;
  }
}
