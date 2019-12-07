import { $TS_FIX_ME, OmitEntries } from '../../types/helper-types';
import { objectFromEntries } from '../object-from-entries/object-from-entries';
import { objectEntries } from '../object-entries/object-entries';

/**
 * @description
 * Clone an object, omitting the undesired properties
 *
 * @param data
 */
export function omitFrom<R extends Record<PropertyKey, any>>(data: R) {
  return function doOmit<K extends keyof R>(...toOmit: K[]): Omit<R, K> {
    const entries = objectEntries(data).filter(([k]) => !toOmit.includes(k as $TS_FIX_ME<K>)) as $TS_FIX_ME<OmitEntries<R, K>>;
    const result = objectFromEntries(entries);
    return result as $TS_FIX_ME<Omit<R, K>>;
  }
}
