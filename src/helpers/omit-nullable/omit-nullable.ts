import { KeysExceptWhere, $TS_FIX_ME, KeysWhere, OmitWhereNullable, Without, RemoveNever, OmitEntries } from '../../types/helper-types';
import { objectFromEntries } from '../object-from-entries/object-from-entries';
import { withoutNullable } from '../without-nullable/without-nullable';
import { objectEntries } from '../object-entries/object-entries';


/**
 * @description
 * Omit keys from an object whose values match any of the specified values
 *
 * Place put the properties and values to omit as the first argument
 *
 * Composes with unary functions
 *
 * @param checkKeys
 * @param value
 */
export function omitNullable<K extends keyof any>(...checkKeys: K[]) {
  return function doOmitNullable<R extends Record<K, any>>(fromRecord: R): OmitWhereNullable<R, K>  {
    const entries = objectEntries(fromRecord).filter(([k, v]) => !(checkKeys.includes(k as $TS_FIX_ME<K>) && (v === null || v === undefined)));
    const result = objectFromEntries(entries);
    return result as $TS_FIX_ME<any>;
  }
}
