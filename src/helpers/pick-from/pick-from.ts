import { $TS_FIX_ME } from '../../types/helper-types';

/**
 * @description
 * Clone picked properties from an object onto another object
 *
 * @param data
 */
export function pickFrom<R>(data: R) {
  return function doPick<K extends keyof R>(...toPick: K[]) {
    const result: $TS_FIX_ME<any> = {};
    toPick.forEach(key => result[key] = data[key]);
    return result as Pick<R, K>;
  }
}
