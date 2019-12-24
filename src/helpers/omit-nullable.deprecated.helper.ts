import { objectEntries } from './object-entries.helper';
import { objectFromEntries } from './object-from-entries.helper';
import { $TS_FIX_ME } from '../types/$ts-fix-me.type';
import { OmitWhereNullable } from '../types/omit-where-nullable.type';
import { deprecated } from '../internal/deprecated.internal';

/**
 * @description
 * Omit keys from an object whose values are nullable
 *
 * Place put the properties and values to omit as the first argument
 *
 * Composes with unary functions
 *
 * @param checkKeys
 * @param value
 */
export function omitNullable<K extends keyof any>(...checkKeys: K[]) {
  deprecated('omitNullable');
  return function doOmitNullable<R extends Record<K, any>>(fromRecord: R): OmitWhereNullable<R, K>  {
    const entries = objectEntries(fromRecord).filter(([k, v]) => !(checkKeys.includes(k as $TS_FIX_ME<K>) && (v === null || v === undefined)));
    const result = objectFromEntries(entries);
    return result as $TS_FIX_ME<any>;
  }
}
