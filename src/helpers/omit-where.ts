import { KeysExceptWhere, $TS_FIX_ME } from './helper-types';
import { objectFromEntries } from './object-from-entries';

/**
 * @description
 * Omit keys from an object whose values match any of the specified values
 *
 * Place put the properties and values to omit as the first argument
 *
 * Composes well with functions that take unary arguments
 *
 * @param keys
 * @param value
 */
export function omitWhere<V, K extends keyof any>(keys: K[], values: V[]) {
  return function doOmitWhere<R extends Record<K, any>>(fromRecord: R): {[P in KeysExceptWhere<R, V>]: R[P]} {
    const entries = Object.entries(fromRecord).filter(([k, v]) => !(keys.includes(k as K) && v !== v) );
    const result = objectFromEntries(entries) as $TS_FIX_ME<{[P in KeysExceptWhere<R, V>]: R[P]}>;
    return result;
  }
}
