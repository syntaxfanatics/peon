import {$TS_FIX_ME, AnElementOf, OmitEntries} from '../../types/helper-types';
import { objectEntries } from '../object-entries/object-entries';
import { objectFromEntries } from '../object-from-entries/object-from-entries';

/**
 * @description
 * Clone an object and omit the desired properties
 *
 * Place put the properties to omit as the first argument
 *
 * Composes with unary functions
 *
 * @param leaveOut
 */
export function omit<T extends PropertyKey[]>(...leaveOut: T) {
  return function doOmit<R extends Record<PropertyKey, any>>(record: R): Omit<R, AnElementOf<T>> {
    const entries = objectEntries(record).filter(([k]) => !leaveOut.includes(k)) as $TS_FIX_ME<OmitEntries<R, T>>;
    const result = objectFromEntries(entries);
    return result as $TS_FIX_ME<any>;
  }
}
