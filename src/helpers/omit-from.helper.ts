import { objectEntries } from './object-entries.helper';
import { objectFromEntries } from './object-from-entries.helper';
import { $TS_FIX_ME } from '../types/$ts-fix-me.type';
import { EntriesOmitting } from '../types/entries-omitting.type';

/**
 * @description
 * Clone an object, omitting the undesired properties
 *
 * @param data
 */
export function omitFrom<R extends Record<PropertyKey, any>>(data: R) {
  return function doOmit<K extends keyof R>(...toOmit: K[]): Omit<R, K> {
    const entries = objectEntries(data).filter(([k]) => !toOmit.includes(k as $TS_FIX_ME<K>)) as $TS_FIX_ME<EntriesOmitting<R, K>>;
    const result = objectFromEntries(entries);
    return result as $TS_FIX_ME<Omit<R, K>>;
  }
}
