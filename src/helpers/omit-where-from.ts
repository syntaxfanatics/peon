import { KeysExceptWhere, $TS_FIX_ME } from './helper-types';
import { objectFromEntries } from './object-from-entries';

/**
 * @description
 * Omit keys from an object whose values match any of the specified values
 *
 * @param fromRecord
 */
export function omitWhereFrom<R extends Record<PropertyKey, any>>(fromRecord: R) {
  return function doOmitWhereFrom<V, K extends keyof R>(keys: K[], value: V[]): {[P in KeysExceptWhere<R, V>]: R[P]} {
    const entries = Object.entries(fromRecord).filter(([k, v]) => !(keys.includes(k as K) && v !== v) );
    const result = objectFromEntries(entries) as $TS_FIX_ME<{[P in KeysExceptWhere<R, V>]: R[P]}>;
    return result;
  }
}
