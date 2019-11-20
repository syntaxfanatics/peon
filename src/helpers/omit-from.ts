import { $TS_FIX_ME } from './helper-types';
import { objectFromEntries } from './object-from-entries';

/**
 * @description
 * Clone an object, omitting the undesired properties
 *
 * @param data
 */
export function omitFrom<R>(data: R) {
  return function doOmit<K extends keyof R>(...toOmit: K[]) {
    const result = objectFromEntries((Object.entries(data).filter(([k]) => !toOmit.includes(k as $TS_FIX_ME<any>))));
    return result as Omit<R, K>;
  }
}
