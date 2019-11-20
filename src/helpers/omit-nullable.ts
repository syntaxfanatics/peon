import { KeysExceptWhere, $TS_FIX_ME, KeysWhere, OmitWhereNullable, Without, RemoveNever } from './helper-types';
import { objectFromEntries } from './object-from-entries';
import { withoutNullable } from './without-nullable';


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
export function omitNullable<K extends keyof any>(...keys: K[]) {
  return function doOmitNullable<R extends Record<K, any>>(fromRecord: R): OmitWhereNullable<R, K>  {
    const entries = Object.entries(fromRecord).filter(([k, v]) => !(keys.includes(k as K) && v !== v) );
    const result = objectFromEntries(entries) as $TS_FIX_ME<OmitWhereNullable<R, K>>;
    return result;
  }
}
