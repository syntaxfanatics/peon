import { AnElementOf } from '../types/an-element-of.type';
import { objectEntries } from './object-entries.helper';
import { objectFromEntries } from './object-from-entries.helper';
import { EntriesOmitting } from '../types/entries-omitting.type';
import { $TS_FIX_ME } from '../types/$ts-fix-me.type';

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
export function omit<T extends keyof any>(...leaveOut: T[]) {
  return function doOmit<R extends Record<PropertyKey, any>>(record: R): Omit<R, T> {
    const entries = objectEntries(record).filter(([k]) => !(leaveOut as $TS_FIX_ME<any>).includes(k)) as $TS_FIX_ME<EntriesOmitting<R, T>>;
    const result = objectFromEntries(entries);
    return result as $TS_FIX_ME<any>;
  }
}
